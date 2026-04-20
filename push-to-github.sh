#!/usr/bin/env bash
# Initializes git and pushes this project to your GitHub repo.
# Run this from inside the project directory AFTER `npm install`.

set -e

REPO_URL="https://github.com/sagarzaveri29/vachanamrutji.git"

if [ ! -d .git ]; then
  echo "→ Initializing git repository"
  git init -b main
fi

echo "→ Staging files"
git add .

if git diff --cached --quiet; then
  echo "  (no changes to commit)"
else
  echo "→ Creating commit"
  git commit -m "Initial commit: Vachanamrut Ji reader app"
fi

echo "→ Setting remote to $REPO_URL"
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "→ Pushing to origin/main"
echo "  (GitHub will prompt for your username + personal access token)"
git push -u origin main

echo ""
echo "✓ Done. Your repo is live at:"
echo "  https://github.com/sagarzaveri29/vachanamrutji"
