---
description: Review every canonical framework feature in isolated subagents, reconcile the results, and produce one aggregate assessment report.
---

# /review-all-features — Canonical Feature Assessment Workflow

Use this workflow when you need a repository-wide assessment of the **32 canonical Harness Engineering features** under `framework/features/`. The workflow runs one **fresh-context subagent review per feature**, reconciles each result against the canonical index and governing principle, and returns a consolidated report with prioritized remediation and polish guidance.

## Phase 1: Preflight & Scope Lock

1. Read `AGENTS.md`, `ANCHORS.md`, `REQUIREMENTS.md`, and `PLANS.md` before starting.
2. Append an active plan entry in `PLANS.md` for the assessment and cite the governing requirement IDs.
3. Treat `framework/` as the canonical source of truth. Do not use `docs/` as authority unless the user explicitly asks to include support material.
4. Read `framework/HE Index.md` first and use the `file` paths there as the only canonical feature-file paths.
5. Decide the exact report scope before dispatch:
   - Full 32-feature review
   - Single pillar review
   - Named feature subset

## Phase 2: Build The Review Queue

1. Create the feature queue directly from `framework/HE Index.md`.
2. For each feature, capture:
   - feature ID
   - feature name
   - canonical feature file path
   - governing principle file path
   - any directly needed canonical cross-reference only if required to verify a contradiction
3. Do not pre-read all feature files in the main agent. Keep the parent context limited to the index, planning state, and workflow contract.

## Phase 3: Dispatch Isolated Feature Reviews

1. Launch **one subagent per feature**. Each subagent must start in a clean context and review only the minimum canonical files needed for that feature.
2. Each subagent review must perform four passes:
    - review the feature file itself
    - moderate severity and separate confirmed findings from softer polish suggestions
    - reconcile the feature against `framework/HE Index.md` and its governing principle
    - propose recommendations or implementation-planning notes specific to that feature
3. Each subagent must return machine-readable output only. Use this JSON contract:

```json
{
  "feature_id": "P0-1",
  "feature_name": "Bash Sandboxes",
  "verdict": "healthy|needs-polish|needs-remediation",
  "confirmed_findings": [
    {
      "severity": "high|medium|low",
      "title": "...",
      "evidence": ["absolute/path#Lx-Ly"],
      "why": "...",
      "fix_direction": "..."
    }
  ],
  "polish_opportunities": [
    {
      "title": "...",
      "evidence": ["absolute/path#Lx-Ly"],
      "recommendation": "..."
    }
  ],
  "reconciliation_notes": ["..."],
  "implementation_notes": ["..."],
  "confidence": 0.0
}
```

1. Require each subagent to stay read-only. The workflow is an assessment pass, not a remediation pass.
2. If the orchestrator supports parallel subagents, dispatch in batches to control context and result handling.

## Phase 4: Reconcile & Distill In The Parent Agent

1. Collect all subagent JSON outputs.
2. Reconcile cross-feature inconsistencies centrally. Pay special attention to:
    - feature file vs. `HE Index.md` dependency mismatches
    - feature file vs. governing principle misalignment
    - prevention rules that lack enforcement artifacts
    - measurements that lack thresholds, schemas, or collection mechanics
    - SAS vs. MAS scope ambiguity
3. Group findings into two levels:
    - per-feature findings
    - systemic framework findings that repeat across multiple features
4. Do not repeat every low-signal polish note in the main report. Distill recurring patterns.

## Phase 5: Produce The Assessment Report

1. Deliver one aggregate report to the user with these sections:
    - overall assessment
    - feature status summary by pillar
    - highest-severity confirmed issues
    - recurring systemic patterns
    - recommended remediation order
2. Use the exact template at `.agent/workflows/templates/review-all-features-report.md` for the aggregate report shape.
3. Findings must come first. Summaries are secondary.
4. If no confirmed problems are found for a feature, say so explicitly and note any residual implementation risk.

## Operating Rules

- Use subagents only for individual feature reviews; keep reconciliation in the parent agent.
- Keep each feature review isolated from other feature-file contents unless a direct canonical cross-reference is required to verify a contradiction.
- Prefer canonical `framework/` files and root governance docs only.
- Do not modify `framework/` as part of this workflow unless the user explicitly pivots from assessment to remediation.
- If the review touches `.agent/workflows/` or `AGENTS.md`, record the required independent review in `REVIEWS.md` before merge.

## Output Template

The aggregate report must use `.agent/workflows/templates/review-all-features-report.md`.

For full 32-feature runs, populate all sections in that template.

For pillar-scoped or subset runs:

1. keep the same section order
2. limit `Status Summary` to the relevant pillars or features in scope
3. include only the affected features in `Feature Notes`
4. keep `Systemic Patterns` and `Recommended Remediation Order` scoped to the reviewed surface

This workflow is complete when every requested feature has exactly one isolated subagent review and the parent agent has produced one consolidated assessment.
