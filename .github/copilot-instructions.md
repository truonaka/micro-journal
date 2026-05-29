# Micro Journal — Copilot Instructions

## Purpose
This file defines detailed coding, architecture, and quality rules for GitHub Copilot.
For high-level navigation and agent routing, see `/AGENTS.md`.


## Code Style and Conventions

- Use Astral tooling in backend:
  - `uv` for package management and environments
  - `ruff` for linting and formatting
- Use function components and hooks in frontend.
- Keep code simple, readable, and explicit.
- Prefer small, focused functions.
- All code, comments, documentation and identifiers must be written in English.
- Use clear, descriptive names for all identifiers.
- Avoid unnecessary abstractions and dependencies.
- Minimum test coverage: **80% (backend and frontend)**


## Architecture

- Monorepo: backend and frontend in same repository
- Separation is strict:
  - Backend → `backend/`
  - Frontend → `frontend/`
- Never duplicate business logic between frontend and backend

### Backend

- Python + FastAPI
- SQLite database
- Dependencies via `pyproject.toml` (no requirements.txt)
- Responsibilities:
  - Enforce business rules
  - Validate inputs at **service layer**
- Use transactions for:
  - create
  - update
  - delete
- Include structured logging

### Frontend

- React SPA (JavaScript)
- Styling located in `frontend/src/styles`
- Must handle API errors in UI


## Logging and Monitoring

- **System Log:** configuration changes, warnings, errors
- **Activity Log:** user-triggered business operations (audit trail)
- **Change Log:** user changes (avoid storing sensitive values)
- **Transaction Log:** DB create/update/delete events (no raw data when possible)

## Build and Test

- Backend:
  - `cd backend && pip install -e .`
  - `pytest`
- Frontend:
  - `cd frontend && npm install`
  - `npm test -- --watchAll=false`

### Development Flow

- Run lint **only for modified areas**
- Run targeted tests for changed behavior
- Do NOT run full test suite unless explicitly requested
- Always verify behavior with meaningful tests

---

## Guardrails

- Do not allow editing of past entries
- Code review findings must be:
  - fixed, OR
  - explicitly justified
- Do not assume quality from passing tests alone
- Update or add tests when behavior changes
- Documentation must be:
  - clear
  - in English
  - evidence-based
- Do NOT duplicate README content
  → Link to root README for setup instructions


## Relationship to AGENTS.md

- `AGENTS.md` = lightweight routing + overview
- This file = detailed implementation rules for Copilot
- If rules conflict: **this file takes precedence for code generation**
