from datetime import datetime
from typing import Any

from sqlalchemy import Column, Date, DateTime, Integer, String

from .db import Base

from datetime import datetime, timezone

class Entry(Base):
    __tablename__ = "entries"

    id: Any = Column(Integer, primary_key=True, index=True)
    date: Any = Column(Date, unique=True, index=True)
    content: Any = Column(String(280))
    mood: Any = Column(String)
    created_at: Any = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at: Any = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
