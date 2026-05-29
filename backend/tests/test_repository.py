import pytest
from datetime import date, datetime
from types import SimpleNamespace
from app.repository import EntryRepository
from app.schemas import EntryCreate

class DummySession:
    def __init__(self):
        self.entries = [
            SimpleNamespace(id=1, date=date(2024, 5, 29), content="Test", mood="good", created_at=datetime.now(), updated_at=datetime.now()),
            SimpleNamespace(id=2, date=date(2024, 5, 28), content="Old", mood="bad", created_at=datetime.now(), updated_at=datetime.now()),
        ]
        self.committed = False
        self.added = []

    def query(self, _model):
        class Query:
            def __init__(self, entries):
                self.entries = entries
                self._filter = None
            def order_by(self, *_args, **_kwargs):
                return self
            def all(self):
                return self.entries
            def filter(self, cond):
                self._filter = cond
                return self
            def first(self):
                if self._filter:
                    # crude filter for Entry.date == entry_date
                    for e in self.entries:
                        if e.date == self._filter.right.value:
                            return e
                    return None
                return self.entries[0] if self.entries else None
        return Query(self.entries)

    def commit(self):
        self.committed = True
    def refresh(self, obj):
        pass
    def add(self, obj):
        self.added.append(obj)

@pytest.fixture(autouse=True)
def patch_session(monkeypatch):
    monkeypatch.setattr("app.repository.SessionLocal", DummySession)


def test_get_entries():
    entries = EntryRepository.get_entries()
    assert len(entries) == 2
    assert entries[0].content == "Test"

def test_get_entry_found():
    entry = EntryRepository.get_entry(date(2024, 5, 29))
    assert entry is not None
    assert entry.content == "Test"

def test_get_entry_not_found():
    # Clear entries so nothing is found
    # Use patch_session fixture, DummySession is already in use
    # Empty DummySession.entries via patch_session
    dummy = DummySession()
    dummy.entries = []
    # Monkeypatch SessionLocal to return empty DummySession
    from app import repository
    repository.SessionLocal = lambda: dummy
    entry = EntryRepository.get_entry(date(2020, 1, 1))
    assert entry is None

def test_create_or_update_update():
    # Update existing entry
    entry = EntryCreate(date=date(2024, 5, 29), content="New", mood="good")
    result = EntryRepository.create_or_update(entry)
    assert result.content == "New"

def test_create_or_update_new():
    # Add new entry
    entry = EntryCreate(date=date(2024, 5, 27), content="Brand new", mood="good")
    result = EntryRepository.create_or_update(entry)
    assert hasattr(result, "date")
    assert hasattr(result, "content")

def test_get_stats():
    stats = EntryRepository.get_stats()
    assert stats == {"good": 1, "bad": 1}
