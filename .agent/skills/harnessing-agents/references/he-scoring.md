# Gap Scoring Framework

> **Source:** `framework/cross-cutting/HE Evaluation Dimensions.md`, `framework/cross-cutting/HE Cross Cutting Perspectives.md`, and `framework/HE Principle Practice Chain.md` (chain-level mappings)

The 6 Evaluation Dimensions below score individual features. They are distinct from the 4 Scoping Dimensions used to scope the overall audit. Each dimension maps to a level in the Principle-to-Practice Chain (see `framework/HE Index.md`), ensuring gap analysis is grounded in engineering principles.

## Evaluation Dimensions (0-5 Rubric)

For each feature (P0-1 to P0-11, P1-1 to P1-12, P2-1 to P2-5, P3-1 to P3-4), assign a score from 0-5 across the 6 canonical dimensions defined in `framework/cross-cutting/HE Evaluation Dimensions.md`:

```json
[
  { "dimension": "Maturity",      "chain_level": "L4 (Actions & Tools)",         "question": "What tier of implementation is in place?" },
  { "dimension": "Effectiveness", "chain_level": "L5 (Measurable Outcomes)",     "question": "Does the feature achieve its L2 targeted enhancement?" },
  { "dimension": "Risk",          "chain_level": "L2 inverse (Enhancement at risk)", "question": "What failure modes does the feature prevent?" },
  { "dimension": "Cost",          "chain_level": "L4 (Action proportionality)",  "question": "What is the token/compute/human cost?" },
  { "dimension": "Scalability",   "chain_level": "L3 (Design Decisions)",        "question": "Does the feature scale from SAS to MAS?" },
  { "dimension": "Human Role",    "chain_level": "L2 (Enhancement trajectory)",  "question": "What is the human's optimal role?" }
]
```

### Concrete Scoring Rubric

To ensure deterministic evaluation, score strictly against this rubric:
- **0 (Absent):** Feature does not exist in any form in the codebase.
- **1 (Ad-hoc):** Informal or entirely human-dependent enforcement.
- **2 (Basic):** Partially implemented. Works for simple, happy-path cases.
- **3 (Functional):** Reliable for standard workflows with complete automated enforcement.
- **4 (Optimized):** Measurably effective, actively monitored by metrics, dynamically scales.
- **5 (Leading):** Fully autonomous, self-improving, requires zero human intervention to heal.

## Priority Calculation

Once you have a composite (average) score across the 6 dimensions, calculate the Priority Score to rank the gap.

```text
Priority Score = (5 - Composite Score) × Impact Weight × Cascade Length
```

### Heuristics & Definitions

- **Composite Score:** The unweighted average of the 6 dimension scores (scale of 0-5).
- **Impact Weight:** How many other downstream features explicitly rely on this one. Look up the feature's `downstream` dependencies in `framework/HE Index.md` and count them. (Zero downstream dependencies = Weight of 1. Otherwise, Weight = Dependency Count).
- **Cascade Length:** The severity of failure propagation when this feature breaks. Heuristic: Trace the feature's failure. Does it cause complete systemic failure (> 3 downstream systems collapse simultaneously)? If yes, Cascade Length = 3. Does it break a moderate component pipeline (2-3 elements fail)? Length = 2. Is it a localized, isolated failure? Length = 1.

## Output Tiers

Sort your prioritized gaps into execution tiers:

```json
[
  { "tier": 1, "label": "Critical", "priority_score_rank": "Top 20%", "action_timeline": "Immediate (this sprint) \u2014 Blocks functionality" },
  { "tier": 2, "label": "Important", "priority_score_rank": "Middle 40%", "action_timeline": "Mid-term (this quarter) \u2014 Causes friction" },
  { "tier": 3, "label": "Enhance", "priority_score_rank": "Bottom 40%", "action_timeline": "Long-term (this half) \u2014 Nice to have" }
]
```

---

## Cross-Cutting Perspectives

After scoring individual features, apply the 4 canonical systemic perspectives to reveal gaps that span multiple features. Read them directly from the authoritative source:

> **Source:** `framework/cross-cutting/HE Cross Cutting Perspectives.md`

1. **Human Role Optimization** — Where is the human adding irreplaceable value vs. acting as a bottleneck?
2. **SAS→MAS Readiness** — See `framework/cross-cutting/HE SAS MAS Readiness.md` for the JSON scaling analysis.
3. **Agent Legibility** — How easily can an agent understand and work within this codebase?
4. **Entropy Trajectory** — Is the codebase getting cleaner or dirtier over time?

**Gap test:** For each perspective, apply the diagnostic patterns in the canonical JSON manifests and flag any feature gap that is amplified by a systemic weakness (e.g., a low P0-3 Verification score compounded by an "Agent Legibility — bad module boundaries" finding becomes a Tier 1 priority).
