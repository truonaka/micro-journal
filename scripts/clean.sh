#!/bin/bash

cd "$(dirname "$0")/.."

echo "Cleaning project..."

# Backend
echo "Removing backend artifacts..."
rm -rf backend/.venv
rm -rf backend/__pycache__
rm -rf backend/**/*.pyc 2>/dev/null
rm -f backend/*.db

# Frontend
echo "Removing frontend artifacts..."
rm -rf frontend/node_modules
rm -rf frontend/build

# Root / misc
echo "Removing caches..."
rm -rf .pytest_cache
rm -rf .ruff_cache
rm -rf .mypy_cache

echo "Clean complete ✅"