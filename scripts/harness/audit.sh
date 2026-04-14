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

get_epoch_ms() {
  if command -v node &>/dev/null; then
    node -e 'process.stdout.write(String(Date.now()))'
  else
    date +%s000
  fi
}

AUDIT_START_TS=$(get_epoch_ms)

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
check_file "REVIEWS.md"                             "Independent review ledger"
check_file "RELEASES.md"                            "HELab release notes"
check_file "PLANS.md"                               "Active task state"
check_file ".agent/skills/harnessing-agents/SKILL.md" "Live-linked harnessing-agents skill"
check_file ".agent/skills/harnessing-agents/framework/HE Index.md" "Bundled skill runtime framework"
check_file "scripts/he-lint.js"                     "HE consistency checker"
check_file "scripts/harness/audit.sh"               "This audit script"
check_file ".github/workflows/he-lint.yml"          "CI lint gate"
check_file ".github/workflows/he-weekly-gc.yml"     "Weekly entropy scan"
check_file ".husky/pre-commit"                      "Pre-commit hook"
check_file "framework/HE Index.md"                    "DAG navigation index"
check_file "framework/HE Principle Practice Chain.md"  "Chain model meta-document"
check_file ".harness/task-state.schema.json"         "Ralph Loop task-state schema"
check_file ".harness/escalation-rules.json"          "Escalation rules manifest"
check_file ".harness/agent-permissions.json"         "Bounded autonomy permission manifest"
check_file ".harness/mcp-capabilities.json"          "MCP capability manifest"

# Validate DAG structure: 32 feature files, 16 principle files
FEAT_DIR="$REPO_ROOT/framework/features"
PRINC_DIR="$REPO_ROOT/framework/principles"
SKILL_FEAT_DIR="$REPO_ROOT/.agent/skills/harnessing-agents/framework/features"
SKILL_PRINC_DIR="$REPO_ROOT/.agent/skills/harnessing-agents/framework/principles"

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
  if [[ "$PRINC_COUNT" -eq 16 ]]; then
    ok "Principle files: $PRINC_COUNT (expected 16)"
    PASS=$((PASS + 1))
  else
    fail "Principle files: found $PRINC_COUNT, expected 16 in framework/principles/"
  fi
else
  fail "framework/principles/ directory missing"
fi

if [[ -d "$SKILL_FEAT_DIR" ]]; then
  SKILL_FEAT_COUNT=$(find "$SKILL_FEAT_DIR" -maxdepth 1 -name "*.md" | wc -l | tr -d ' ')
  if [[ "$SKILL_FEAT_COUNT" -eq 32 ]]; then
    ok "Bundled skill feature files: $SKILL_FEAT_COUNT (expected 32)"
    PASS=$((PASS + 1))
  else
    fail "Bundled skill feature files: found $SKILL_FEAT_COUNT, expected 32 in .agent/skills/harnessing-agents/framework/features/"
  fi
else
  fail ".agent/skills/harnessing-agents/framework/features/ directory missing"
fi

if [[ -d "$SKILL_PRINC_DIR" ]]; then
  SKILL_PRINC_COUNT=$(find "$SKILL_PRINC_DIR" -maxdepth 1 -name "*.md" | wc -l | tr -d ' ')
  if [[ "$SKILL_PRINC_COUNT" -eq 16 ]]; then
    ok "Bundled skill principle files: $SKILL_PRINC_COUNT (expected 16)"
    PASS=$((PASS + 1))
  else
    fail "Bundled skill principle files: found $SKILL_PRINC_COUNT, expected 16 in .agent/skills/harnessing-agents/framework/principles/"
  fi
else
  fail ".agent/skills/harnessing-agents/framework/principles/ directory missing"
fi

echo ""

# --- 1b. JSON manifest validation ---
echo "--- 1b. JSON manifest validation ---"

validate_json_file() {
  local f="$1"
  local label="$2"
  if command -v node &>/dev/null; then
    if node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'));" "$REPO_ROOT/$f" 2>/dev/null; then
      ok "$label parses as valid JSON"
      PASS=$((PASS + 1))
    else
      fail "$label is not valid JSON: $f"
    fi
  else
    warn "Node.js not available — skipping JSON validation for $f"
  fi
}

validate_json_file ".harness/task-state.schema.json" "Task-state schema"
validate_json_file ".harness/escalation-rules.json" "Escalation rules"
validate_json_file ".harness/agent-permissions.json" "Permission manifest"
validate_json_file ".harness/mcp-capabilities.json" "MCP capability manifest"

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

# --- 6. Exit interceptor check (P0-4 Ralph Loops) ---
echo "--- 6. Exit interceptor (P0-4) ---"

TASK_STATE="$REPO_ROOT/.harness/task-state.json"
if [[ -f "$TASK_STATE" ]]; then
  if command -v node &>/dev/null; then
    if node -e "const state = JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')); const required = ['task_id', 'status', 'expected_steps', 'completed_steps', 'reinjections_used', 'last_heartbeat_at']; const missing = required.filter(key => !(key in state)); if (missing.length > 0) { process.stderr.write(missing.join(',')); process.exit(1); }" "$TASK_STATE" 2>/dev/null; then
      ok "task-state.json includes required Ralph Loop fields"
      PASS=$((PASS + 1))
    else
      fail "task-state.json is missing required Ralph Loop fields"
    fi
    INTERCEPTOR_OUT=$(node "$REPO_ROOT/scripts/exit-interceptor.js" --mode=audit 2>&1) || true
    if echo "$INTERCEPTOR_OUT" | grep -q "Premature exit"; then
      warn "Incomplete task detected in .harness/task-state.json — $INTERCEPTOR_OUT"
    else
      ok "No incomplete tasks in task-state.json"
      PASS=$((PASS + 1))
    fi
  else
    warn "Node.js not available — skipping exit-interceptor check"
  fi
else
  ok "No task-state.json present (no pending tasks)"
  PASS=$((PASS + 1))
fi

echo ""

# --- 7. Emit structural audit log entry (P1-5 Observability) ---
AUDIT_LOG="$REPO_ROOT/.harness/agent-logs.jsonl"
mkdir -p "$REPO_ROOT/.harness"

AUDIT_RESULT="pass"
if [[ $FAIL -gt 0 ]]; then
  AUDIT_RESULT="fail"
elif [[ $WARN -gt 0 ]]; then
  AUDIT_RESULT="warn"
fi

START_TS="${AUDIT_START_TS:-$(date +%s)}"
END_TS=$(get_epoch_ms)
DURATION_MS=$(( END_TS - START_TS ))

printf '{"timestamp":"%s","agent_id":"harness-audit","action":"structural-audit","target":"HELab","result":"%s","duration_ms":%d,"pass":%d,"warn":%d,"fail":%d}\n' \
  "$(date -u '+%Y-%m-%dT%H:%M:%SZ')" \
  "$AUDIT_RESULT" \
  "$DURATION_MS" \
  "$PASS" "$WARN" "$FAIL" >> "$AUDIT_LOG"

echo "--- 7. Observation report ---"

if command -v node &>/dev/null && [[ -f "$REPO_ROOT/scripts/generate-observation-report.js" ]]; then
  node "$REPO_ROOT/scripts/generate-observation-report.js" 2>&1 || warn "Observation report generation failed"
  if [[ -f "$REPO_ROOT/.harness/observation-report.json" ]]; then
    ok "Observation report generated at .harness/observation-report.json"
    PASS=$((PASS + 1))
  fi
  if [[ -f "$REPO_ROOT/.harness/dashboard.md" ]]; then
    ok "Dashboard generated at .harness/dashboard.md"
    PASS=$((PASS + 1))
  else
    fail "Dashboard missing: .harness/dashboard.md"
  fi
else
  warn "Skipping observation report (node or script unavailable)"
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
