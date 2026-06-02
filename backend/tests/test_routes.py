from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)

def test_get_entries(monkeypatch):
    dummy_entries = [
        {"id": 1, "date": "2024-05-29", "content": "Test note", "mood": "good", "created_at": "2024-05-29T12:00:00", "updated_at": "2024-05-29T12:00:00"}
    ]
    monkeypatch.setattr("app.services.EntryService.get_entries", lambda: dummy_entries)
    response = client.get("/entries")
    assert response.status_code == 200
    assert response.json() == dummy_entries

def test_get_entry(monkeypatch):
    dummy_entry = {"id": 1, "date": "2024-05-29", "content": "Test note", "mood": "good", "created_at": "2024-05-29T12:00:00", "updated_at": "2024-05-29T12:00:00"}
    monkeypatch.setattr("app.services.EntryService.get_entry", lambda d: dummy_entry)
    response = client.get("/entries/2024-05-29")
    assert response.status_code == 200
    assert response.json() == dummy_entry

def test_create_or_update(monkeypatch):
    dummy_entry = {"id": 1, "date": "2024-05-29", "content": "Test note", "mood": "good", "created_at": "2024-05-29T12:00:00", "updated_at": "2024-05-29T12:00:00"}
    monkeypatch.setattr("app.services.EntryService.create_or_update", lambda entry: dummy_entry)
    payload = {"date": "2024-05-29", "content": "Test note", "mood": "good"}
    response = client.post("/entries", json=payload)
    assert response.status_code == 200
    assert response.json() == dummy_entry

def test_stats(monkeypatch):
    dummy_stats = {"good": 5, "bad": 2}
    monkeypatch.setattr("app.services.EntryService.get_stats", lambda: dummy_stats)
    response = client.get("/stats")
    assert response.status_code == 200
    assert response.json() == dummy_stats
