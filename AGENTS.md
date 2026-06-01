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
- Dependencies in `pyproject.toml`
- Astral tooling (`uv`, `ruff`)

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


## Build & Test

- Test coverage must be at least 80% for both backend and frontend.

### Backend
- Install: `cd backend && pip install -e .`
- Test: `cd backend && pytest`

### Frontend
- Install: `cd frontend && npm install`
- Unit test: `cd frontend && npm test -- --watchAll=false`
- E2E test: `cd frontend && npx cypress open`

### Full Dev
- `./scripts/dev.sh` (run from project root)


## Core Rules

- Never introduce deprecated or unused dependencies
- Do not duplicate logic between frontend and backend
- Follow existing architecture strictly
- Prefer minimal, explicit solutions over abstractions
- All code, comments, and documentation must be in English only
- When merging or modifying code, do not remove any part unless you have confirmed that all important functionality is retained. If removing a class or code block, you must explicitly check that all essential logic, data flow, and dependencies from the removed part exist in the remaining code. Preserving functionality is mandatory, even if the structure changes.
