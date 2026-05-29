from datetime import date
from typing import Dict, List

from fastapi import APIRouter

from .schemas import EntryCreate, EntryOut
from .services import EntryService

router = APIRouter()


@router.get("/entries", response_model=List[EntryOut])
def get_entries() -> List[EntryOut]:
    return EntryService.get_entries()


@router.get("/entries/{entry_date}", response_model=EntryOut | None)
def get_entry(entry_date: date) -> EntryOut | None:
    return EntryService.get_entry(entry_date)


@router.post("/entries", response_model=EntryOut)
def create_or_update(entry: EntryCreate) -> EntryOut:
    return EntryService.create_or_update(entry)


@router.get("/stats", response_model=Dict[str, int])
def stats() -> Dict[str, int]:
    return EntryService.get_stats()
