from datetime import date


def test_create_entry(client):
    today = date.today().isoformat()
    payload = {"date": today, "content": "Integration test", "mood": "good"}
    response = client.post("/entries", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["content"] == "Integration test"
    assert data["mood"] == "good"
    assert data["date"] == today


def test_get_entries(client):
    response = client.get("/entries")
    assert response.status_code == 200
    entries = response.json()
    assert isinstance(entries, list)
    assert any(e["content"] == "Integration test" for e in entries)


def test_get_entry(client):
    today = date.today().isoformat()
    response = client.get(f"/entries/{today}")
    assert response.status_code == 200
    entry = response.json()
    assert entry["content"] == "Integration test"
    assert entry["mood"] == "good"


def test_stats(client):
    response = client.get("/stats")
    assert response.status_code == 200
    stats = response.json()
    assert "good" in stats
