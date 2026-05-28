# AGENTS.md - Micro Journal


This file summarizes key conventions and architecture for AI coding agents working in this repository. For full onboarding and environment details, see [README.md](./README.md).


## Project Structure
- **Backend:** Python FastAPI app (in `backend/`), SQLite database, dependencies in `pyproject.toml`.
- **Frontend:** React SPA (in `frontend/`), JavaScript, CSS in `frontend/src/styles`.
- **Scripts:** Use `scripts/dev.sh` to start both backend (port 8801) and frontend (port 3301) in development mode.

## Build & Test
- **Backend:**
  - Install: `cd backend && pip install -e .`
  - Test: `cd backend && pytest`
- **Frontend:**
  - Install: `cd frontend && npm install`
  - Test: `cd frontend && npm test -- --watchAll=false`
- **Full dev:** `./scripts/dev.sh` (from project root)

## Coding Conventions
- **Backend:** PEP8, type annotations, validate at service level, use transactions for DB writes, no sensitive data in logs.
- **Frontend:** Function components, hooks, accessible UI, reuse shared components, handle API errors in UI.
- **General:**
  - Keep code simple and readable.
  - Use clear, descriptive English names for files, variables, and functions.
  - Avoid unnecessary abstractions and dependencies.
  - Minimum 80% test coverage.
  - Do not duplicate logic between frontend and backend.

## Guardrails
- Do not allow editing of past entries.
- Treat code review findings as mandatory follow-up.
- Run lint and targeted tests for changed areas.
- Documentation must be in English, clear, and evidence-based.

---

For backend- or frontend-specific rules, see:
- `.github/instructions/backend.instructions.md`
- `.github/instructions/frontend.instructions.md`

For onboarding, setup, and more details, see [README.md](./README.md).
