import logging
from datetime import date, datetime, timezone
from typing import Dict, List, Optional

from .db import SessionLocal
from .models import Entry
from .schemas import EntryCreate

logger = logging.getLogger("micro_journal.repository")


class EntryRepository:
    @staticmethod
    def get_entries() -> List[Entry]:
        logger.debug("DB: get all entries")
        db = SessionLocal()
        entries = db.query(Entry).order_by(Entry.date.desc()).all()
        return entries

    @staticmethod
    def get_entry(entry_date: date) -> Optional[Entry]:
        logger.debug("DB: get entry for date %s", entry_date)
        db = SessionLocal()
        entry = db.query(Entry).filter(Entry.date == entry_date).first()
        return entry

    @staticmethod
    def create_or_update(entry: EntryCreate) -> Entry:
        logger.debug("DB: create or update entry for date %s", entry.date)
        db = SessionLocal()
        existing = db.query(Entry).filter(Entry.date == entry.date).first()
        now = datetime.now(timezone.utc)
        if existing:
            logger.debug("DB: updating entry id %s", existing.id)
            existing.content = entry.content
            existing.mood = entry.mood
            existing.updated_at = now
            db.commit()
            db.refresh(existing)
            return existing
        new_entry = Entry(
            date=entry.date,
            content=entry.content,
            mood=entry.mood,
            created_at=now,
            updated_at=now,
        )
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)
        logger.debug("DB: created new entry id %s", new_entry.id)
        return new_entry

    @staticmethod
    def get_stats() -> Dict[str, int]:
        logger.debug("DB: get mood stats")
        db = SessionLocal()
        entries = db.query(Entry).all()
        mood_count: Dict[str, int] = {}
        for e in entries:
            mood_count[e.mood] = mood_count.get(e.mood, 0) + 1
        return mood_count
