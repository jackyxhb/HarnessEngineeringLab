# Gap Scoring Framework

The 6 Evaluation Dimensions below score individual features. They are distinct from the 4 Scoping Dimensions (`references/dimensions.md`) used to scope the overall audit.

## Evaluation Dimensions (0-5 Rubric)

For each feature (F1-F8, P1-1 to P3-4), assign a score from 0-5 across the following dimensions:

| Dimension | Question It Answers |
| - | - |
| **Implementation Maturity** | How fully built is this feature? |
| **Operational Effectiveness** | Does the feature actually work in practice? |
| **Risk Exposure** | What breaks if this feature is absent or weak? |
| **Cost-Efficiency** | Is the investment proportional to the value? |
| **Scalability (SAS→MAS)** | Will this feature survive the transition to Multi-Agent Systems like AutoGen, CrewAI, or LangGraph? |
| **Human Role Evolution** | Does this feature shift humans from writing code to designing systems? |

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
- **Impact Weight:** How many other downstream features explicitly rely on this one. Look up the feature in `references/dependencies.md` and count the downstream dependencies. (Zero downstream dependencies = Weight of 1. Otherwise, Weight = Dependency Count).
- **Cascade Length:** The severity of failure propagation when this feature breaks. Heuristic: Trace the feature's failure. Does it cause complete systemic failure (> 3 downstream systems collapse simultaneously)? If yes, Cascade Length = 3. Does it break a moderate component pipeline (2-3 elements fail)? Length = 2. Is it a localized, isolated failure? Length = 1.

## Output Tiers

Sort your prioritized gaps into execution tiers:

| Tier | Priority Score Rank | Action Timeline |
| - | - | - |
| **Tier 1 (Critical)** | Top 20% | Immediate (this sprint) - Blocks functionality |
| **Tier 2 (Important)** | Middle 40% | Mid-term (this quarter) - Causes friction |
| **Tier 3 (Enhance)** | Bottom 40% | Long-term (this half) - Nice to have |
