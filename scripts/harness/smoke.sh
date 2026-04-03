#!/usr/bin/env bash
# scripts/harness/smoke.sh
#
# Quick smoke check: runs he-lint.js (HE consistency only, no spell/markdown overhead).
# Cheap enough to run before every commit. Target runtime: <2 seconds.
#
# Usage: bash scripts/harness/smoke.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

echo "[SMOKE] Running HE consistency check..."
node scripts/he-lint.js
echo "[SMOKE] PASS"
