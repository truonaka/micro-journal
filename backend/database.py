# --- Helper functions for API logic (optional, not yet used in main.py) ---
from typing import Optional, List
def get_entries_for_month(db, year: int, month: int) -> List[Entry]:
    from datetime import date
    first = date(year, month, 1)
    last = date(year, month, 28) if month == 2 else date(year, month, 31)
    return db.query(Entry).filter(Entry.date >= first, Entry.date <= last).all()

def get_entries_for_period(db, start, end) -> List[Entry]:
    return db.query(Entry).filter(Entry.date >= start, Entry.date <= end).all()
from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./journal.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Entry(Base):
    __tablename__ = "entries"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, nullable=False)
    content = Column(String(280), nullable=False)
    mood = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

Base.metadata.create_all(bind=engine)
