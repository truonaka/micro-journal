import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db import Base
from app.main import app

# Use in-memory SQLite database for tests
TEST_DATABASE_URL = "sqlite:///:memory:"
test_engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=test_engine
)


@pytest.fixture(scope="module", autouse=True)
def setup_database():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


@pytest.fixture
def client():
    # Provide FastAPI TestClient for integration tests
    with TestClient(app) as c:
        yield c


@pytest.fixture(autouse=True)
def override_get_db(monkeypatch):
    monkeypatch.setattr("app.db.SessionLocal", TestingSessionLocal)
