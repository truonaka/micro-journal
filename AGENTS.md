# AGENTS.md — Micro Journal

This file provides always-on guidance for AI agents working in this repository.

Keep this file minimal. Detailed implementation rules live in scoped instruction files.


## Project Overview

Monorepo with separate backend and frontend.

### Backend (`backend/`)
- Python
- FastAPI
- Pydantic
- SQLite
- Pytest
- Astral tooling (`uv`, `ruff`, `ty`)
- Dependencies in `pyproject.toml`

### Frontend (`frontend/`)
- React SPA (JavaScript)
- CSS in `frontend/src/styles`
- Cypress

## Instruction Routing

Agents must use the following files depending on context:

- General coding rules:
  → `.github/copilot-instructions.md`

- Backend-specific rules:
  → `.github/instructions/backend.instructions.md`

- Frontend-specific rules:
  → `.github/instructions/frontend.instructions.md`


## Commands


| Command                                          | Purpose                   |
| ------------------------------------------------ | ------------------------- |
| `cd backend && pip install -e .[dev]`            | Install backend dependencies |
| `cd backend && pytest`                           | Run backend tests |
| `cd backend && uv run ruff check .`             | Lint workspace            |
| `cd backend && uv run ty check .`               | Type check workspace      |
| `cd backend && uvicorn app.main:app --reload --port 8801` | Run backend server        |
| `cd frontend && npm install`                     | Install frontend dependencies |
| `cd frontend && npm test -- --watchAll=false`  | Run frontend unit tests   |
| `cd frontend && npx cypress open`              | Run frontend E2E tests    |
| `cd frontend && npm start`                                     | Run frontend server        |


## Core Rules

- Never introduce deprecated or unused dependencies
- Do not duplicate logic between frontend and backend
- Follow existing architecture strictly
- Prefer minimal, explicit solutions over abstractions
- All code, comments, and documentation must be in English only
- Don't leave unused imports and froms in code.
- When merging or modifying code, do not remove any part unless you have confirmed that all important functionality is retained. If removing a class or code block, you must explicitly check that all essential logic, data flow, and dependencies from the removed part exist in the remaining code. Preserving functionality is mandatory, even if the structure changes.
- Test coverage must be at least 80% for both backend and frontend.
