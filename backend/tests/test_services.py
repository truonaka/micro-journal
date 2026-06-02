from datetime import date, datetime

import pytest
from fastapi import HTTPException

from app.schemas import EntryCreate, EntryOut
from app.services import EntryService


class DummyRepo:
    @staticmethod
    def get_entries():
        return [EntryOut(id=1, date=date.today(), content="Test", mood="good", created_at=datetime.now(), updated_at=datetime.now())]

    @staticmethod
    def get_entry(entry_date):
        if entry_date == date(2024, 5, 29):
            return EntryOut(id=1, date=entry_date, content="Test", mood="good", created_at=datetime.now(), updated_at=datetime.now())
        return None

    @staticmethod
    def create_or_update(entry):
        return EntryOut(id=2, date=entry.date, content=entry.content, mood=entry.mood, created_at=datetime.now(), updated_at=datetime.now())

    @staticmethod
    def get_stats():
        return {"good": 3, "bad": 1}

@pytest.fixture(autouse=True)
def patch_repo(monkeypatch):
    monkeypatch.setattr("app.services.EntryRepository", DummyRepo)


def test_get_entries():
    entries = EntryService.get_entries()
    assert len(entries) == 1
    assert entries[0].mood == "good"

def test_get_entry_found():
    entry = EntryService.get_entry(date(2024, 5, 29))
    assert entry is not None
    assert entry.mood == "good"

def test_get_entry_not_found():
    entry = EntryService.get_entry(date(2020, 1, 1))
    assert entry is None

def test_create_or_update_today():
    entry = EntryCreate(date=date.today(), content="New", mood="good")
    result = EntryService.create_or_update(entry)
    assert result.content == "New"
    assert result.mood == "good"

def test_create_or_update_past():
    from datetime import timedelta
    yesterday = date.today() - timedelta(days=1)
    entry = EntryCreate(date=yesterday, content="Old", mood="good")
    with pytest.raises(HTTPException) as exc:
        EntryService.create_or_update(entry)
    assert exc.value.status_code == 400
    assert "Cannot edit past entries" in str(exc.value.detail)

def test_get_stats():
    stats = EntryService.get_stats()
    assert stats == {"good": 3, "bad": 1}
