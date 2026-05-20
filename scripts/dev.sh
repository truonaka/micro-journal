#!/bin/bash
# Start backend and frontend concurrently
cd "$(dirname "$0")/.."


# Start backend on port 8801
(cd backend && uvicorn main:app --reload --port 8801 &)
# Start frontend on port 3301
(cd frontend && npm start &)

wait
