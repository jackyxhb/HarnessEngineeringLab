#!/usr/bin/env bash
# scripts/harness/lint.sh
#
# Full quality gate: markdownlint + cspell + he-lint.js.
# Equivalent to what CI runs. Use before pushing or merging.
#
# Usage: bash scripts/harness/lint.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

echo "[LINT] Running Markdownlint..."
npx markdownlint "**/*.md" --ignore node_modules

echo "[LINT] Running spell check..."
npx cspell "**/*.md" --no-progress

echo "[LINT] Running HE consistency check..."
node scripts/he-lint.js

echo "[LINT] PASS — all checks clean"
