from fastapi import FastAPI
from .db import Base, engine
from fastapi.middleware.cors import CORSMiddleware
from .routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3301", "http://127.0.0.1:3301"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API work!"}

app.include_router(router)
