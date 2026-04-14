# Review-All-Features Assessment Report

Use this exact template when `/review-all-features` produces a full or pillar-scoped aggregate assessment.

## Scope

- **Run Date:** YYYY-MM-DD
- **Scope Type:** full | pillar | subset
- **Scope Target:** all 32 features | P0 | P1 | P2 | P3 | comma-separated feature IDs
- **Canonical Sources:** `framework/HE Index.md`, `framework/features/`, `framework/principles/`
- **Execution Mode:** isolated subagent review per feature + parent-agent reconciliation

## Overall Assessment

- **Overall Verdict:** `healthy` | `needs-polish` | `needs-remediation`
- **Features Reviewed:** 0
- **Healthy:** 0
- **Needs Polish:** 0
- **Needs Remediation:** 0
- **Primary Risk Statement:** 1 to 2 sentences describing the dominant framework risk pattern.

## Status Summary

### Foundation

- `healthy:`
- `needs-polish:`
- `needs-remediation:`

### Pillar 1

- `healthy:`
- `needs-polish:`
- `needs-remediation:`

### Pillar 2

- `healthy:`
- `needs-polish:`
- `needs-remediation:`

### Pillar 3

- `healthy:`
- `needs-polish:`
- `needs-remediation:`

## Highest-Severity Confirmed Issues

List only confirmed issues that materially affect framework correctness, enforceability, or canonical consistency.

1. **Issue Title**
   - **Severity:** high | medium
   - **Affected Features:** `P0-1`, `P1-8`
   - **Why It Matters:** concise explanation
   - **Representative Evidence:** `absolute/path#Lx-Ly`
   - **Fix Direction:** concise remediation direction

## Systemic Patterns

Distill repeated defects that appeared across multiple feature reviews.

1. **Pattern Name**
   - **Description:** what repeated
   - **Affected Features:** comma-separated feature IDs
   - **Typical Fix Shape:** schema definition | enforcement hook | graph reconciliation | scope clarification | measurement rewrite

## Feature Notes

Use one bullet per reviewed feature. Keep each note brief.

- `P0-1` — verdict; one-sentence summary of the main issue or why it is healthy.
- `P0-2` — verdict; one-sentence summary.

## Recommended Remediation Order

Prioritize by leverage, not by file order.

1. **Tranche 1:** shared contracts and schemas
   - target features:
   - outcome:
2. **Tranche 2:** enforcement artifact binding
   - target features:
   - outcome:
3. **Tranche 3:** graph and dependency reconciliation
   - target features:
   - outcome:
4. **Tranche 4:** scope and mode clarification
   - target features:
   - outcome:

## Residual Risks

- Brief note on any uncertainty, missing instrumentation, or review limits.

## Method Notes

- One isolated subagent reviewed each feature.
- The parent agent reconciled subagent outputs against canonical index and principle metadata.
- No framework edits were applied during the assessment pass unless explicitly stated.
