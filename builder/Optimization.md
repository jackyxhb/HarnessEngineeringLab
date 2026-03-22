# Plan: Optimize `harnessing-agents` Skill for Maximum Efficiency

## Context

The `harnessing-agents` skill (726 lines across 5 files) has a solid conceptual framework but underperforms because:
- The agent must read ~400+ lines minimum before it can take any action
- Output formats are buried in procedural text (not copy-paste ready)
- `features.md` exceeds the 200-line reference limit (236 lines)
- No decision tree — agent can't route to the right reference without reading everything
- The fastest path to value (Quick-Start Checklist) is buried at line 135 of the deepest file
- Missing frontmatter fields reduce discoverability and maintainability
- "4 Assessment Dimensions" vs "6 Evaluation Dimensions" naming causes confusion

**Goal:** Restructure so the agent reads ~180-270 lines per action path (down from ~400+), with copy-paste templates and clear routing.

---

## Phase 1: SKILL.md Restructure (do first — other changes reference this)

**File:** `SKILL.md` (96 → ~130 lines)

### 1a. Update frontmatter
Add `version`, `user-invocable`, `allowed-tools` fields — matching the pattern from `planning-with-files`:

```yaml
---
name: harnessing-agents
version: "1.1.0"
description: Evaluate and improve AI agent harness maturity for any project. Use when assessing existing agent infrastructure, designing new harness scaffolding, fixing repeated agent failures, scaling SAS to MAS, or running a full harness audit-and-improvement cycle (Inspect → Plan → Execute) to reach maximum maturity.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---
```

### 1b. Add decision tree after "When to Use"
Route the agent immediately to the right file:

| Goal | Start Here | Time |
| --- | --- | --- |
| Quick gap check | `references/quick-checklist.md` | 5 min |
| Full audit (Inspect → Plan → Execute) | `references/workflow.md` | 30-60 min |
| Score and prioritize specific gaps | `references/gap-scoring.md` | 15 min |
| Look up a feature's signals + policies | `references/features-foundation.md` or `references/features-pillars.md` | 2 min |
| Scope an audit before starting | `references/dimensions.md` | 5 min |

### 1c. Rename "4 Assessment Dimensions" → "4 Scoping Dimensions"
Disambiguate from the "6 Evaluation Dimensions" in gap-scoring.md.

---

## Phase 2: Split and Extract (independent, can be parallel)

### 2a. Split `features.md` (236 lines → 2 files)
- **Create** `references/features-foundation.md` (~100 lines) — Features F1–F8
- **Create** `references/features-pillars.md` (~140 lines) — Features P1-1 through P3-4
- **Delete** `references/features.md`
- Cross-reference header in each file pointing to its companion

### 2b. Extract Quick-Start Checklist from `gap-scoring.md`
- **Create** `references/quick-checklist.md` (~50 lines) — checklist + brief header + pointer to full scoring
- **Modify** `references/gap-scoring.md` — remove lines 135-165, replace with pointer (164 → ~120 lines)

### 2c. Extract output templates from `workflow.md`
- **Create** `templates/` directory with 4 files:
  - `templates/he-clues.md` (~40 lines) — clue collection format
  - `templates/implementation-plan.md` (~35 lines) — tiered plan format
  - `templates/change-summary.md` (~25 lines) — per-agent summary
  - `templates/assessment-report.md` (~35 lines) — before/after report
- **Modify** `references/workflow.md` — replace inline format blocks with `Use template: templates/X.md` (143 → ~90 lines)

### 2d. Add disambiguation to `gap-scoring.md`
Add note at top: "The 6 Evaluation Dimensions below score individual features. They are distinct from the 4 Scoping Dimensions (`references/dimensions.md`) used to scope the overall audit."

### 2e. Rename in `dimensions.md`
Change heading from "4 Assessment Dimensions" to "4 Scoping Dimensions" (line 1).

---

## Phase 3: New Content (depends on Phase 2 structure)

### 3a. Create `references/agent-prompts.md` (~120 lines)
Ready-to-use subagent dispatch prompts for the 4 parallel inspection agents + consolidation agent. Each prompt includes: role, scan scope, gap signals to look for, output format reference.

### 3b. Create `references/dependencies.md` (~40 lines)
Consolidated dependency table extracted from all 25 features' "Dependencies" lines:

```text
| Feature | Depends On | Depended On By |
```

Enables cascade analysis without scanning 200+ lines of feature descriptions.

---

## Phase 4: Cross-Reference Cleanup

- Update all internal references across all files to point to new filenames
- Verify compliance: reference files <200 lines, templates <150 lines, SKILL.md <200 lines
- Update the "References" section at bottom of SKILL.md to list all new files

---

## Final Structure

```text
harnessing-agents/
├── SKILL.md                            (~130 lines)
├── references/
│   ├── workflow.md                     (~90 lines)
│   ├── features-foundation.md          (~100 lines)
│   ├── features-pillars.md             (~140 lines)
│   ├── dimensions.md                   (~87 lines)
│   ├── gap-scoring.md                  (~120 lines)
│   ├── quick-checklist.md              (~50 lines)
│   ├── agent-prompts.md                (~120 lines)
│   └── dependencies.md                 (~40 lines)
├── templates/
│   ├── he-clues.md                     (~40 lines)
│   ├── implementation-plan.md          (~35 lines)
│   ├── change-summary.md               (~25 lines)
│   └── assessment-report.md            (~35 lines)
```text

**Total: ~1,012 lines across 13 files** (was 726 across 5)
**Per-action-path: ~180-270 lines** (was ~400+)

---

## Verification

1. Count lines in every file — all references <200, all templates <150, SKILL.md <200
2. Decision-tree test: read only SKILL.md, verify each row routes to a real file
3. Template-copy test: copy each template, confirm it's self-contained with clear placeholders
4. Quick-path test: SKILL.md + quick-checklist.md = <200 lines total for a fast gap check
5. Search for stale references: grep for "features.md" (should be gone, replaced by split names)
6. Terminology test: grep for "Assessment Dimensions" — should be zero occurrences (all renamed to "Scoping Dimensions")
