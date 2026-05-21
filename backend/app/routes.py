from fastapi import APIRouter, HTTPException
from datetime import date
from .models import Entry
from .schemas import EntryCreate
from .db import SessionLocal

router = APIRouter()

VALID_MOODS = ["great", "good", "okay", "rough", "bad"]

@router.get("/entries")
def get_entries():
    db = SessionLocal()
    return db.query(Entry).order_by(Entry.date.desc()).all()

@router.get("/entries/{entry_date}")
def get_entry(entry_date: date):
    db = SessionLocal()
    entry = db.query(Entry).filter(Entry.date == entry_date).first()
    return entry

@router.post("/entries")
def create_or_update(entry: EntryCreate):
    db = SessionLocal()

    existing = db.query(Entry).filter(Entry.date == entry.date).first()


    if existing:
        if entry.date != date.today():
            raise HTTPException(400, "Cannot edit past entries")

        from datetime import datetime
        existing.content = entry.content
        existing.mood = entry.mood
        existing.updated_at = datetime.utcnow()
        db.commit()
        return existing

    new_entry = Entry(**entry.dict())
    db.add(new_entry)
    db.commit()
    return new_entry

@router.get("/stats")
def stats():
    db = SessionLocal()
    entries = db.query(Entry).all()

    mood_count = {}
    for e in entries:
        mood_count[e.mood] = mood_count.get(e.mood, 0) + 1

    return mood_count
