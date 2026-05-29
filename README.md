# Micro Journal

Quick daily entries with mood tracking.

Micro Journal is a project related to Siilihub's `Agentic Development with Github Copilot` course, which also combines elements from the `AI ​​Engineer Speedrun` course.

## Tech Stack
- Frontend: [React](https://reactjs.org/), [npm, JavaScript](https://www.npmjs.com), CSS
- Backend: [Python](https://www.python.org), [FastAPI](https://fastapi.tiangolo.com/), [Astral](https://astral.sh), [Pydantic](https://pydantic.dev/docs/), [Pytest](https://docs.pytest.org/)
- Database: [SQLite](https://sqlite.org)

## Development Setup

### 1. Clone the repository

```sh
git clone <repo-url>
cd micro-journal
```

### 2. Install dependencies

#### Backend

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
```

#### Frontend

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

- `npm run dev` — Starts both frontend and backend in development mode
- `cd frontend && npm start` — Starts only the frontend
- `cd backend && uvicorn main:app --reload` — Starts only the backend

## Testing

- Backend: `cd backend && pytest`
- Frontend: `cd frontend && npm test -- --watchAll=false`

## Notes
- See `.github/copilot/micro-journal.md` for full feature prompt and future ideas.
