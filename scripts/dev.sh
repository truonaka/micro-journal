#!/bin/bash

cd "$(dirname "$0")/.."

echo "Starting backend (8801) and frontend (3301)..."

(cd backend && uvicorn app.main:app --reload --port 8801) &
BACK_PID=$!

(cd frontend && PORT=3301 npm start) &
FRONT_PID=$!

trap "echo 'Stopping...'; kill $BACK_PID $FRONT_PID; exit" INT

wait
