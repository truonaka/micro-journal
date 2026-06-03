# Micro Journal

Quick daily entries with mood tracking.

Micro Journal is a project related to Siilihub's `Agentic Development with Github Copilot` course, which also combines elements from the `AI ​​Engineer Speedrun` course.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Development Setup](#development-setup)
- [Running the app](#running-the-app)
- [Testing](#testing)
- [Quality and Style](#quality-and-style)
- [Notes](#notes)

## Tech Stack
- Frontend:
	- [React 18](https://react.dev/), JavaScript, CSS
	- [React Router](https://reactrouter.com/)
	- [TanStack Query](https://tanstack.com/query/latest)
	- [Axios](https://axios-http.com/)
	- [Create React App / react-scripts](https://create-react-app.dev/)
- Backend:
	- [Python >=3.10](https://www.python.org)
	- [FastAPI](https://fastapi.tiangolo.com/)
	- [SQLAlchemy](https://www.sqlalchemy.org/)
	- [Pydantic](https://pydantic.dev/)
- Database: [SQLite](https://sqlite.org)
- Tooling & quality:
	- [uv](https://docs.astral.sh/uv/)
	- [Ruff](https://docs.astral.sh/ruff/)
	- [Ty](https://docs.astral.sh/ty/)
	- [Pytest](https://docs.pytest.org/)
	- [Cypress](https://www.cypress.io/)
	- [ESLint](https://eslint.org/)

## Development Setup

### 1. Clone the repository
Install [Git](https://git-scm.com/install/) and run the following commands in your terminal:

```sh
git clone <repo-url>
cd micro-journal
```

### 2. Install dependencies

#### Global tools

Save the following tech stacks to your computer:
- Python 
- Uv Astraltu
- Node.js + npm

#### Frontend

1. React and frontend dependencies are run in the frontend folder. Go to frontend folder:

```sh
cd frontend
```

2. Install dependencies:

```sh
npm install
```

#### Backend

1. Python and FastAPI are run in the backend folder. Go to backend folder:

```sh
cd backend
```

2. Create and activate a virtual environment

macOS/Linux:
```sh
uv venv
source .venv/bin/activate
```

windows (cmd):
```sh
uv venv
.venv\Scripts\activate
```

3. Install dependencies:

```sh
uv pip install -e .[dev]
```

### 3. Set up environment variables

Create a `.env` file in the `frontend` folder with the following content:

```
PORT=3301
REACT_APP_API_URL=http://127.0.0.1:8801
```

## Running and cleaning the app

### Option A: Start both services with helper script. Use only in macOs/Linux.

```sh
chmod +x scripts/dev.sh
./scripts/dev.sh
```
- Backend: `http://localhost:8801`
- Frontend: `http://localhost:3301`

### Option B: Start services separately

Backend:

```sh
cd backend
uvicorn app.main:app --reload --port 8801
```

Frontend:

```sh
cd frontend
npm start
```

### Cleaning up
 - Stop both servers (Ctrl+C in terminal)
 - Run cleaning script:
 ```sh
chmod +x scripts/clean.sh
./scripts/clean.sh
```


## Testing

- Backend tests:

```sh
cd backend
pytest
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

## Quality and Style

```sh
cd backend
uv run ruff check .
uv run ty check .
```

```sh
cd frontend
npm run lint
npm run lint:fix
```

## Notes
- See `.github/copilot/micro-journal.md` for full feature prompt and future ideas.
