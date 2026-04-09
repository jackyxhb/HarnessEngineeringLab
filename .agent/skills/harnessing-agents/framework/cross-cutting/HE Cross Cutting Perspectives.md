# Cross-Cutting Perspectives

> Cross-cutting evaluation lenses that apply across all 32 features. These perspectives reveal systemic weaknesses that single-feature analysis misses.

## L3: Design Decisions (P1-1 Alignment)

To ensure the Harness Engineering framework remains mechanically verifiable, all systemic evaluation perspectives are represented as structured JSON manifests. This prevents "narrative drift" during harness audits.

## Perspective 1: Human Role Optimization

**Question:** Where is the human adding irreplaceable value vs. acting as a bottleneck?

```json
[
  { "pattern": "Human reviews every agent output", "diagnosis": "Over-reliance on human review", "action": "Strengthen P0-3 Verification, P2-3 AI Auditors" },
  { "pattern": "Human only sees failures", "diagnosis": "Effective escalation", "action": "Maintain, refine thresholds" },
  { "pattern": "Human never intervenes", "diagnosis": "Either perfect system or invisible failures", "action": "Audit P1-5 Observability" },
  { "pattern": "Human re-does agent work", "diagnosis": "Agent output quality too low", "action": "Strengthen P1-1 Repo as Truth, P1-12 Skill Engineering" }
]
```

## Perspective 2: SAS→MAS Readiness

See [HE SAS MAS Readiness](HE%20SAS%20MAS%20Readiness.md) for the full JSON-standardized scaling analysis.

## Perspective 3: Agent Legibility

**Question:** How easily can an agent understand and work within this codebase?

```json
[
  { "criterion": "Framework choice",    "good": "Stable, well-documented (React, Express)", "bad": "Bleeding-edge, sparse docs" },
  { "criterion": "Module boundaries",   "good": "Clear, enforced",                          "bad": "Implicit, violated" },
  { "criterion": "Metaprogramming",     "good": "Minimal",                                  "bad": "Heavy (decorators, macros, reflection)" },
  { "criterion": "Naming",               "good": "Consistent, descriptive",                  "bad": "Abbreviated, inconsistent" },
  { "criterion": "Configuration",        "good": "Centralized, well-documented",             "bad": "Scattered, undocumented" }
]
```

## Perspective 4: Entropy Trajectory

**Question:** Is the codebase getting cleaner or dirtier over time?

```json
[
  { "signal": "Dead code ratio",               "improving": "Decreasing",       "degrading": "Increasing" },
  { "signal": "Pattern variants per operation", "improving": "Converging to 1", "degrading": "Diverging" },
  { "signal": "Doc-to-code divergence",        "improving": "Shrinking",        "degrading": "Growing" },
  { "signal": "Circular dependency count",     "improving": "Decreasing",       "degrading": "Increasing" },
  { "signal": "Orphan file count",             "improving": "Stable at 0",      "degrading": "Growing" }
]
```

## Related Features

All 32 features are evaluated through these lenses. See [HE Evaluation Dimensions](HE%20Evaluation%20Dimensions.md) for the per-feature assessment protocol.
