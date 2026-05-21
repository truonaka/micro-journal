from pydantic import BaseModel
from datetime import date, datetime

class EntryBase(BaseModel):
    content: str
    mood: str

class EntryCreate(EntryBase):
    date: date

class EntryOut(EntryBase):
    id: int
    date: date
    created_at: datetime
    updated_at: datetime

    class Config:
        form_attributes = True

