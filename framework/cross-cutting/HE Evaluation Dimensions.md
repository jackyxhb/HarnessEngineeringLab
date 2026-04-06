# Evaluation Dimensions

> Cross-cutting concern: the multi-dimensional evaluation framework for assessing harness maturity. Each feature and improvement policy is assessed across these dimensions.

## Dimensions

| Dimension | Question | Scale |
| ----------- | ---------- | ------- |
| **Effectiveness** | Does the feature achieve its L2 targeted enhancement? | Gap signals eliminated |
| **Maturity** | What tier of implementation is in place? | Tier 1 (basic) → Tier 3 (advanced) |
| **Risk** | What failure modes does the feature prevent? | Prevention items addressed |
| **Scalability** | Does the feature scale from SAS to MAS without redesign? | SAS-only → MAS-ready |
| **Cost** | What is the token/compute/human cost of the feature? | Justified vs. wasteful |
| **Human Role** | What is the human's optimal role with this feature? | Oversight, approval, monitoring, none |

## Usage

During harness audits, each feature is assessed across all 6 dimensions. The assessment produces:

1. **Gap signals present** — which L5 gap signals are observed?
2. **Improvement tier** — what is the current implementation tier (1-3)?
3. **Priority actions** — which improvement policies should be applied next?
4. **Dimension scores** — per-dimension maturity ratings

## Assessment Protocol

1. For each feature, read its L5 Gap Signals
2. Check which gap signals are present in the target project
3. Map present gap signals to the feature's Improvement Policies
4. Prioritize by tier (Tier 1 first) and dimension (Risk and Maturity first)
5. Record findings in the assessment report

## Related

- [HE Execution Procedure](../HE%20Execution%20Procedure.md) — the procedural workflow for running assessments
- [HE Index](../HE%20Index.md) — the navigation index for all features
