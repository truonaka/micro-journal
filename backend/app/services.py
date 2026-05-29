

import logging
from datetime import date
from typing import Dict, List, Optional
from fastapi import HTTPException
from .repository import EntryRepository
from .schemas import EntryCreate, EntryOut

logger = logging.getLogger("micro_journal.service")

VALID_MOODS: List[str] = ["great", "good", "okay", "rough", "bad"]

class EntryService:
    @staticmethod
    def get_entries() -> List[EntryOut]:
        logger.info("Fetching all entries")
        return EntryRepository.get_entries()

    @staticmethod
    def get_entry(entry_date: date) -> Optional[EntryOut]:
        logger.info("Fetching entry for date: %s", entry_date)
        return EntryRepository.get_entry(entry_date)

    @staticmethod
    def create_or_update(entry: EntryCreate) -> EntryOut:
        logger.info("Create or update entry for date: %s, mood: %s", entry.date, entry.mood)
        if entry.date != date.today():
            logger.warning("Attempt to create or edit past entry: %s", entry.date)
            raise HTTPException(400, "Cannot edit past entries")
        result = EntryRepository.create_or_update(entry)
        logger.info("Entry for %s saved (id: %s)", entry.date, getattr(result, 'id', None))
        return result

    @staticmethod
    def get_stats() -> Dict[str, int]:
        logger.info("Fetching mood stats")
        return EntryRepository.get_stats()
