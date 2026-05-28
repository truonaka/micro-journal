---
description: 'Use when editing React/JavaScript frontend code and component styling. Covers alias imports, module boundaries, and thin-app architecture.'
name: 'Frontend'
applyTo: 'frontend/src/*.{js,jsx,scss}, frontend/src/**/*.{js,jsx,scss}'
---

# Frontend instructions

These instructions apply to all files under /frontend

## Guidelines
- The UI must be accessible on devices of different sizes.
- The layout must comply with accessibility guidelines.
- Use simple dynamic components that can be used on multiple pages.
- Prefer extending existing shared UI and utility libraries before creating new one-off patterns.
- Keep changes local and minimal. Match established patterns in nearby files before introducing new abstractions.
