git clone <repo-url>
# Micro Journal

Quick daily entries with mood tracking.

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Pages](#pages)
5. [Data Model](#data-model-sqlite)
6. [Moods](#moods)
7. [Development Setup](#development-setup)
8. [Scripts](#scripts)

## Tech Stack
- Frontend: React
- Backend: Python (FastAPI)
- Database: SQLite

## Architecture
- Backend serves a REST API and owns the SQLite database
- Frontend is a separate SPA that calls the API
- Dev script starts both frontend and backend

## Features
- Write short daily entries (limit 280 characters)
- Select mood for each entry (emoji or simple scale)
- One entry per day (edit today's entry, can't edit past days)
- Calendar view showing mood colors for each day
- List view of recent entries
- Simple mood stats (most common mood this week/month)

## Pages
- Today (write/edit today's entry)
- Calendar (visual overview of the month)
- Entries (scrollable list of past entries)

## Data Model (SQLite)
- entries: id, date, content, mood, created_at, updated_at

## Moods
- great, good, okay, rough, bad (or use emojis)

## Development Setup

### 1. Clone the repository

```sh
git clone <repo-url>
cd micro-journal
```

### 2. Install dependencies

#### Backend (Python, FastAPI)

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

#### Frontend (React)

```sh
cd frontend
npm install
cd ..
```

#### Project root (dev tools)

```sh
npm install
```

### 3. Start development servers

Start both frontend and backend with a single command in the project root:

```sh
npm run dev
```

This will start:
- Backend at: http://localhost:8000
- Frontend at: http://localhost:3000

## Scripts

- `npm run dev` — Starts both frontend and backend in development mode
- `cd frontend && npm start` — Starts only the frontend
- `cd backend && uvicorn main:app --reload` — Starts only the backend

## .gitignore

A comprehensive .gitignore is provided in the project root, covering both frontend and backend needs.

---

For more information, see backend/README.md and frontend/README.md
```

### 2. Backend setup

```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```


### 3. Frontend setup

```
cd ../frontend
npm install
npm install react-scripts --save
```

### 4. Start development servers


From the project root:

```
chmod +x scripts/dev.sh
./scripts/dev.sh
```

Backend: http://localhost:8801
Frontend: http://localhost:3301


## Notes
- See `.github/copilot/micro-journal.md` for full feature prompt and future ideas.
