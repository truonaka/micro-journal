from sqlalchemy import Column, Integer, String, DateTime, Date
from datetime import datetime
from .db import Base

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, unique=True, index=True)
    content = Column(String(280))
    mood = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
