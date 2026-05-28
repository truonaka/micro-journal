
# Micro Journal — Copilot Instructions

## Code Style and Conventions

- Follow PEP8 in backend.
- Use function components and hooks in frontend.
- Keep code simple and readable.
- Use small and focused functions.
- Use clear, descriptive English names for files, variables, and functions.
- Avoid unnecessary abstractions and dependencies.
- Min test coverage is 80% for both backend and frontend.

## Architecture

- This repository contains both the backend and frontend.
- Keep frontend and backend separate. Backend under `backend` directory, frontend under `frontend` directory.

### Backend

- Use a Python FastAPI app with SQLite database. 
- Dependecies managed with `pyproject.toml`. This project does not use a requirements.txt file.
- Enforces all business rules and focuses on validation. 
- Validate inputs at service level.
- Use transactionals for save, update and delete database operations.
- Logging

### Frontend
- Use a React SPA with JavaScript
- CSS rules are located in `frontend/src/styles` folder.
- Handle API errors in the UI.

## Logging and monitoring conventions
- System log: Configuration changes, warnings, errors
- Activity log: User-triggered business operations (audit trail)
- Change Log: User change events without actual data values when possible
- Transaction Log: Database create/update/delete trail without actual data values

## Build and Test

- Backend: Use a virtual environment. Install dependencies with `pip install -e .` in the backend directory.
- Frontend: Install dependencies with `npm install` in the frontend directory.
- Backend unit and integration tests: `cd backend && pytest`
- Frontend unit and e2e tests: `cd frontend && npm test -- --watchAll=false`
- Always run tests after code changes.

## Guardrails

- Do not allow editing of past entries.
- Treat Code Reviewer findings as mandatory follow-up: fix issues, or explicitly explain why a finding is deferred.
- In normal development flow, run lint for touched areas as validation and run targeted tests for touched areas or behavior changes. Do not run the full test suite (for example, a root-level for all projects) unless explicitly requested.
- Do not assume test quality from a green test target alone; add or update meaningful tests for changed behavior.
- Documentation must be in English, clear, and evidence-based.
- Keep instructions concise and avoid duplicating README content; link to root README for onboarding and environment details.
- Do not duplicate logic between frontend and backend.
