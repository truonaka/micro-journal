# Micro Journal

Quick daily entries with mood tracking.

Micro Journal is a project related to Siilihub's `Agentic Development with Github Copilot` course, which also combines elements from the `AI ​​Engineer Speedrun` course.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Development Setup](#development-setup)
- [Running the app](#running-the-app)
- [Testing](#testing)
- [Notes](#notes)

## Tech Stack
- Frontend:
	- [React 18](https://react.dev/), JavaScript, CSS
	- [React Router](https://reactrouter.com/)
	- [TanStack Query](https://tanstack.com/query/latest)
	- [Axios](https://axios-http.com/)
	- [Create React App / react-scripts](https://create-react-app.dev/)
- Backend:
	- [Python 3.10+](https://www.python.org)
	- [FastAPI](https://fastapi.tiangolo.com/)
	- [SQLAlchemy](https://www.sqlalchemy.org/)
	- [Pydantic](https://pydantic.dev/)
- Database: [SQLite](https://sqlite.org)
- Tooling & quality:
	- [uv](https://docs.astral.sh/uv/)
	- [Ruff](https://docs.astral.sh/ruff/)
	- [Pyright](https://github.com/microsoft/pyright)
	- [Pytest](https://docs.pytest.org/)
	- [Cypress](https://www.cypress.io/)
	- [concurrently](https://www.npmjs.com/package/concurrently)

## Development Setup

### 1. Clone the repository

```sh
git clone <repo-url>
cd micro-journal
```

### 2. Install dependencies

Prerequisites:
- Node.js (LTS recommended)
- Python 3.10+
- `uv` installed for backend dependency management

#### Project root tools

```sh
npm install
```

#### Frontend

```sh
cd frontend
npm install
cd ..
```

#### Backend

```sh
cd backend
uv sync
cd ..
```

> Optional alternative for backend (without `uv`):

```sh
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
cd ..
```

## Running the app

### Option A: Start both services with one command (default ports)

```sh
npm run dev
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

### Option B: Start both services with custom ports

```sh
./scripts/dev.sh
```

- Backend: `http://localhost:8801`
- Frontend: `http://localhost:3301`

### Option C: Start services separately

Backend:

```sh
cd backend
uv run uvicorn app.main:app --reload
```

Frontend:

```sh
cd frontend
npm start
```

## Testing

- Backend tests:

```sh
cd backend
uv run pytest
```

- Frontend unit tests:

```sh
cd frontend
npm test -- --watchAll=false
```

- Frontend E2E tests (headless):

```sh
cd frontend
npm run e2e
```

- Frontend E2E tests (interactive):

```sh
cd frontend
npm run e2e:open
```

- Optional backend quality checks:

```sh
cd backend
uv run ruff check .
uv run pyright
```

## Notes
- See `.github/copilot/micro-journal.md` for full feature prompt and future ideas.
