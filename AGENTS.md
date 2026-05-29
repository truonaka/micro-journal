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


## Instruction Routing

Agents must use the following files depending on context:

- General coding rules:
  → `.github/copilot-instructions.md`

- Backend-specific rules:
  → `.github/instructions/backend.instructions.md`

- Frontend-specific rules:
  → `.github/instructions/frontend.instructions.md`

Priority order:
1. Task-specific instruction file
2. copilot-instructions.md
3. This file (AGENTS.md)


## Build & Test

### Backend
- Install: `cd backend && pip install -e .`
- Test: `cd backend && pytest`

### Frontend
- Install: `cd frontend && npm install`
- Test: `cd frontend && npm test -- --watchAll=false`

### Full Dev
- `./scripts/dev.sh` (run from project root)


## Core Rules

- Never introduce deprecated or unused dependencies
- Do not duplicate logic between frontend and backend
- Follow existing architecture strictly
- Prefer minimal, explicit solutions over abstractions
- All code, comments, and documentation must be in English only


## Notes for Agents

- This file does NOT duplicate detailed coding rules
- Always load `.github/copilot-instructions.md` for implementation guidance
- Treat linked instruction files as authoritative for their scope
