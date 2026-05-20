# Micro Journal

Quick daily entries with mood tracking.

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

## Setup Instructions

### 1. Clone the repository

```
git clone <repo-url>
cd micro-journal
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
