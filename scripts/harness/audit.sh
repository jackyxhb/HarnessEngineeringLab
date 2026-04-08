#!/usr/bin/env bash
# scripts/harness/audit.sh
#
# Structural integrity audit: verifies that all required harness artifacts exist,
# tmp/ has no stale files, and the workflow registry is consistent.
# Implements Practice 9 (Manage Entropy) for local execution.
#
# Exit code 0 = PASS, 1 = FAIL (blocking gaps), 2 = WARNING (non-blocking issues)
#
# Usage: bash scripts/harness/audit.sh

set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

PASS=0
WARN=0
FAIL=0

ok()   { echo "[OK]      $1"; }
warn() { echo "[WARNING] $1"; WARN=$((WARN + 1)); }
fail() { echo "[FAIL]    $1"; FAIL=$((FAIL + 1)); }

echo "========================================"
echo " HarnessEngineeringLab — Harness Audit"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================"
echo ""

# --- 1. Harness File Existence ---
echo "--- 1. Required harness files ---"

check_file() {
  local f="$1"
  local label="$2"
  if [[ -f "$REPO_ROOT/$f" ]]; then
    ok "$label ($f)"
    PASS=$((PASS + 1))
  else
    fail "$label missing: $f"
  fi
}

check_file "CLAUDE.md"                              "Agent interface contract"
check_file "AGENTS.md"                              "IDE-agnostic canonical rules"
check_file "ANCHORS.md"                             "Context anchor log"
check_file "REQUIREMENTS.md"                        "Requirements ledger"
check_file "PLANS.md"                               "Active task state"
check_file ".agent/skills/harnessing-agents/SKILL.md" "Released harnessing-agents skill"
check_file "scripts/he-lint.js"                     "HE consistency checker"
check_file "scripts/harness/audit.sh"               "This audit script"
check_file ".github/workflows/he-lint.yml"          "CI lint gate"
check_file ".github/workflows/he-weekly-gc.yml"     "Weekly entropy scan"
check_file ".husky/pre-commit"                      "Pre-commit hook"
check_file "framework/HE Index.md"                    "DAG navigation index"
check_file "framework/HE Principle Practice Chain.md"  "Chain model meta-document"

# Validate DAG structure: 32 feature files, 19 principle files
FEAT_DIR="$REPO_ROOT/framework/features"
PRINC_DIR="$REPO_ROOT/framework/principles"

if [[ -d "$FEAT_DIR" ]]; then
  FEAT_COUNT=$(find "$FEAT_DIR" -maxdepth 1 -name "*.md" | wc -l | tr -d ' ')
  if [[ "$FEAT_COUNT" -eq 32 ]]; then
    ok "Feature files: $FEAT_COUNT (expected 32)"
    PASS=$((PASS + 1))
  else
    fail "Feature files: found $FEAT_COUNT, expected 32 in framework/features/"
  fi
else
  fail "framework/features/ directory missing"
fi

if [[ -d "$PRINC_DIR" ]]; then
  PRINC_COUNT=$(find "$PRINC_DIR" -maxdepth 1 -name "*.md" | wc -l | tr -d ' ')
  if [[ "$PRINC_COUNT" -eq 19 ]]; then
    ok "Principle files: $PRINC_COUNT (expected 19)"
    PASS=$((PASS + 1))
  else
    fail "Principle files: found $PRINC_COUNT, expected 19 in framework/principles/"
  fi
else
  fail "framework/principles/ directory missing"
fi

echo ""

# --- 2. Workflow Registry Consistency ---
echo "--- 2. Workflow registry ---"

WORKFLOWS=("anchor" "ccp" "ccpr" "cognitive-branch" "mount" "polish" "reconcile" "revise-comments")
for wf in "${WORKFLOWS[@]}"; do
  if [[ -f ".agent/workflows/${wf}.md" ]]; then
    ok "Workflow: /${wf}"
    PASS=$((PASS + 1))
  else
    fail "Workflow /${wf} registered in CLAUDE.md but .agent/workflows/${wf}.md is missing"
  fi
done

echo ""

# --- 3. Stale tmp/ files ---
echo "--- 3. Stale tmp/ files (>30 days) ---"

if [[ -d "$REPO_ROOT/tmp" ]]; then
  STALE_COUNT=0
  while IFS= read -r f; do
    STALE_COUNT=$((STALE_COUNT + 1))
    warn "Stale draft: $f"
  done < <(find "$REPO_ROOT/tmp" -maxdepth 1 -type f -mtime +30 2>/dev/null)

  if [[ $STALE_COUNT -eq 0 ]]; then
    ok "No stale tmp/ files"
    PASS=$((PASS + 1))
  fi
else
  ok "tmp/ directory does not exist (nothing to check)"
  PASS=$((PASS + 1))
fi

echo ""

# --- 4. Anchor count ---
echo "--- 4. Anchor freshness ---"

ANCHOR_COUNT=0
if [[ -f "$REPO_ROOT/ANCHORS.md" ]]; then
  ANCHOR_COUNT=$(grep -c '^### A[0-9]*:' "$REPO_ROOT/ANCHORS.md" 2>/dev/null || true)
fi

if [[ $ANCHOR_COUNT -ge 5 ]]; then
  ok "ANCHORS.md has $ANCHOR_COUNT anchors (target: ≥5)"
  PASS=$((PASS + 1))
elif [[ $ANCHOR_COUNT -gt 0 ]]; then
  warn "ANCHORS.md has only $ANCHOR_COUNT anchors (target: ≥5)"
else
  fail "ANCHORS.md has no anchors or is missing"
fi

echo ""

# --- 5. Pre-commit hook liveness ---
echo "--- 5. Pre-commit hook ---"

if [[ -f ".husky/pre-commit" ]]; then
  if grep -q "npm run lint\|lint-staged\|he-lint" ".husky/pre-commit" 2>/dev/null; then
    ok "Pre-commit hook calls lint"
    PASS=$((PASS + 1))
  else
    warn "Pre-commit hook exists but may not be calling the lint suite"
  fi
fi

echo ""

# --- Summary ---
echo "========================================"
TOTAL=$((PASS + WARN + FAIL))
echo " Results: $PASS passed, $WARN warnings, $FAIL failures (of $TOTAL checks)"
echo ""

if [[ $FAIL -gt 0 ]]; then
  echo " RESULT: FAIL — $FAIL blocking gap(s) detected."
  echo " Resolve all [FAIL] items before running agents against this harness."
  echo "========================================"
  exit 1
elif [[ $WARN -gt 0 ]]; then
  echo " RESULT: WARN — harness is functional but $WARN issue(s) need attention."
  echo "========================================"
  exit 2
else
  echo " RESULT: PASS — harness structural integrity confirmed."
  echo "========================================"
  exit 0
fi
