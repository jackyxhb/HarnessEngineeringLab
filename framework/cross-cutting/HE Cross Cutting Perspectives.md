# Cross-Cutting Perspectives

> Cross-cutting evaluation lenses that apply across all 32 features. These perspectives reveal systemic weaknesses that single-feature analysis misses.

## Perspective 1: Human Role Optimization

**Question:** Where is the human adding irreplaceable value vs. acting as a bottleneck?

| Pattern | Diagnosis | Action |
| --------- | ----------- | -------- |
| Human reviews every agent output | Over-reliance on human review | Strengthen P0-3 Verification, P2-3 AI Auditors |
| Human only sees failures | Effective escalation | Maintain, refine thresholds |
| Human never intervenes | Either perfect system or invisible failures | Audit P1-5 Observability |
| Human re-does agent work | Agent output quality too low | Strengthen P1-1 Repo as Truth, P1-12 Skill Engineering |

## Perspective 2: SAS→MAS Readiness

See [HE SAS MAS Readiness](HE%20SAS%20MAS%20Readiness.md) for the full scaling analysis.

## Perspective 3: Agent Legibility

**Question:** How easily can an agent understand and work within this codebase?

| Criterion | Good | Bad |
| ----------- | ------ | ---- |
| Framework choice | Stable, well-documented (React, Express) | Bleeding-edge, sparse docs |
| Module boundaries | Clear, enforced | Implicit, violated |
| Metaprogramming | Minimal | Heavy (decorators, macros, reflection) |
| Naming | Consistent, descriptive | Abbreviated, inconsistent |
| Configuration | Centralized, well-documented | Scattered, undocumented |

## Perspective 4: Entropy Trajectory

**Question:** Is the codebase getting cleaner or dirtier over time?

| Signal | Improving | Degrading |
| -------- | ----------- | ----------- |
| Dead code ratio | Decreasing | Increasing |
| Pattern variants per operation | Converging to 1 | Diverging |
| Doc-to-code divergence | Shrinking | Growing |
| Circular dependency count | Decreasing | Increasing |
| Orphan file count | Stable at 0 | Growing |

## Related Features

All 32 features are evaluated through these lenses. See [HE Evaluation Dimensions](HE%20Evaluation%20Dimensions.md) for the per-feature assessment protocol.
