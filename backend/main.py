from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List
from datetime import date, datetime
from database import SessionLocal, Entry as DBEntry

app = FastAPI()

class EntryBase(BaseModel):
    date: date
    content: str
    mood: str

class EntryCreate(EntryBase):
    pass

class EntryOut(EntryBase):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/entries", response_model=List[EntryOut])
def list_entries(db: Session = Depends(get_db)):
    return db.query(DBEntry).order_by(DBEntry.date.desc()).all()

@app.get("/entries/{entry_date}", response_model=EntryOut)
def get_entry(entry_date: date, db: Session = Depends(get_db)):
    entry = db.query(DBEntry).filter(DBEntry.date == entry_date).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry

@app.post("/entries", response_model=EntryOut)
def create_entry(entry: EntryCreate, db: Session = Depends(get_db)):
    if db.query(DBEntry).filter(DBEntry.date == entry.date).first():
        raise HTTPException(status_code=400, detail="Entry for this day already exists")
    db_entry = DBEntry(
        date=entry.date,
        content=entry.content[:280],
        mood=entry.mood,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@app.put("/entries/{entry_date}", response_model=EntryOut)
def update_entry(entry_date: date, entry: EntryCreate, db: Session = Depends(get_db)):
    db_entry = db.query(DBEntry).filter(DBEntry.date == entry_date).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db_entry.content = entry.content[:280]
    db_entry.mood = entry.mood
    db_entry.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_entry)
    return db_entry


# --- Extra endpoints for calendar, stats, moods ---
from fastapi import Query
from typing import Optional

MOODS = ["great", "good", "okay", "rough", "bad"]

@app.get("/calendar")
def calendar_view(year: Optional[int] = Query(None), month: Optional[int] = Query(None), db: Session = Depends(get_db)):
    """Return moods for each day in a month."""
    from datetime import date
    today = date.today()
    y = year or today.year
    m = month or today.month
    # Get all entries for the month
    entries = db.query(DBEntry).filter(DBEntry.date >= date(y, m, 1), DBEntry.date <= date(y, m, 28) if m==2 else date(y, m, 31)).all()
    # Map date to mood
    return [{"date": e.date.isoformat(), "mood": e.mood} for e in entries]

@app.get("/stats")
def mood_stats(period: str = Query("week", enum=["week", "month"]), db: Session = Depends(get_db)):
    """Return mood stats for week/month."""
    from datetime import date, timedelta
    today = date.today()
    if period == "week":
        start = today - timedelta(days=today.weekday())
    else:
        start = today.replace(day=1)
    entries = db.query(DBEntry).filter(DBEntry.date >= start, DBEntry.date <= today).all()
    mood_counts = {m: 0 for m in MOODS}
    for e in entries:
        if e.mood in mood_counts:
            mood_counts[e.mood] += 1
    most_common = max(mood_counts, key=lambda k: mood_counts[k]) if entries else None
    return {"counts": mood_counts, "most_common": most_common}

@app.get("/moods")
def get_moods():
    """Return list of moods."""
    return MOODS
