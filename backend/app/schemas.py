from datetime import date, datetime


from pydantic import BaseModel, field_validator


class EntryBase(BaseModel):
    content: str
    mood: str

    @field_validator("mood")
    @classmethod
    def validate_mood(cls, v):
        valid_moods = ["great", "good", "okay", "rough", "bad"]
        if v not in valid_moods:
            raise ValueError(f"Invalid mood: {v}")
        return v


class EntryCreate(EntryBase):
    date: date


class EntryOut(EntryBase):
    id: int
    date: date
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
