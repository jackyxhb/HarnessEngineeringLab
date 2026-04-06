# Gap Scoring Framework

> **Source:** `framework/cross-cutting/HE Evaluation Dimensions.md`, `framework/cross-cutting/HE Cross Cutting Perspectives.md`, and `framework/HE Principle Practice Chain.md` (chain-level mappings)

The 6 Evaluation Dimensions below score individual features. They are distinct from the 4 Scoping Dimensions used to scope the overall audit. Each dimension maps to a level in the Principle-to-Practice Chain (see `framework/HE Index.md`), ensuring gap analysis is grounded in engineering principles.

## Evaluation Dimensions (0-5 Rubric)

For each feature (P0-1 to P0-11, P1-1 to P1-12, P2-1 to P2-5, P3-1 to P3-4), assign a score from 0-5 across the following dimensions:

```json
[
  { "dimension": "Implementation Maturity", "chain_level": "L4 (Actions & Tools)", "question": "How fully built is this feature?" },
  { "dimension": "Operational Effectiveness", "chain_level": "L5 (Measurable Outcomes)", "question": "Does the feature actually work in practice?" },
  { "dimension": "Risk Exposure", "chain_level": "L2 inverse (Enhancement at risk)", "question": "What breaks if this feature is absent or weak?" },
  { "dimension": "Cost-Efficiency", "chain_level": "L4 (Action proportionality)", "question": "Is the investment proportional to the value?" },
  { "dimension": "Scalability (SAS\u2192MAS)", "chain_level": "L3 (Design Decisions)", "question": "Will this feature survive the transition to Multi-Agent Systems?" },
  { "dimension": "Human Role Evolution", "chain_level": "L2 (Enhancement trajectory)", "question": "Does this feature shift humans from writing code to designing systems?" }
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

After scoring individual features, apply these 5 systemic perspectives to reveal gaps that span multiple features.

> **Source:** `framework/cross-cutting/HE Cross Cutting Perspectives.md`

### A. Feedback Loop Chain

Trace the harness feedback chain end-to-end:

```text
Agent writes code → Self-Verification catches errors → Linters enforce style →
Auditors review architecture → Cleanups fix what slipped through →
Observability reveals patterns → Humans improve the harness
```

**Gap test:** Remove one link. Does the system still converge on correct output? If not, that link is a critical dependency.

---

### B. Token Economics

Map each feature as a token saver or spender:

```json
{
  "token_savers": [
    "Context Compaction (P1-2)",
    "Tool Offloading (P1-3)",
    "Progressive Skills (P1-4)",
    "Automated Linters (P2-1)",
    "Planning & State Files (P1-7)",
    "Context Anchoring (P1-8)",
    "Branch Cognitive Memory (P1-9)"
  ],
  "token_spenders": [
    "AI Auditors (P2-3)",
    "Web Search & MCP (P1-6)",
    "Verification (P0-3)",
    "Inter-Agent Communication (P0-10)",
    "Scheduled Cleanups (P3-1)"
  ]
}
```

**Gap test:** Is the net token balance positive? Are token spenders delivering proportional value?

---

### C. Failure Cascade Map

Trace chain failures from missing features:

```text
No Repository as Truth → Agent hallucinates architecture
  → Linters can't catch semantic violations → AI Auditors give wrong feedback
    → Entropy accumulates faster → Cleanups can't keep up
```

```text
No Self-Verification → Agent ships broken code
  → Escalation overloads humans → Humans lose trust
    → Manual review replaces automation → Human role regresses
```

**Gap test:** For each feature scored 0-1, trace its cascade. Features with the longest cascade chains are the highest priority.

---

### D. SAS-to-MAS Readiness

Score key features on their MAS readiness stage:

```json
[
  { "feature": "Filesystem & Git (P0-2)", "sas_only": "Single workspace", "mas_ready": "Git worktrees", "mas_optimized": "File locking + task claiming" },
  { "feature": "Self-Verification (P0-3)", "sas_only": "Run tests locally", "mas_ready": "Gate on shared state", "mas_optimized": "Consensus voting" },
  { "feature": "Orchestration (P0-5)", "sas_only": "Sequential tasks", "mas_ready": "Supervisor pattern", "mas_optimized": "Dynamic topology switching" },
  { "feature": "Context Compaction (P1-2)", "sas_only": "Single window", "mas_ready": "Per-agent windows", "mas_optimized": "Distributed memory management" },
  { "feature": "AI Auditors (P2-3)", "sas_only": "Single reviewer", "mas_ready": "Cooperative review", "mas_optimized": "Competition + coopetition" },
  { "feature": "Context Anchoring (P1-8)", "sas_only": "Single-session memory", "mas_ready": "Persistent anchor files", "mas_optimized": "Shared anchor files" },
  { "feature": "Branch Memory (P1-9)", "sas_only": "Sequential execution", "mas_ready": "Sub-task branches", "mas_optimized": "Parallel agents + merge gates" },
  { "feature": "Escalation (P0-7)", "sas_only": "Alert human", "mas_ready": "Retry with different agent", "mas_optimized": "Tiered multi-agent escalation" }
]
```

**Gap test:** If planning MAS adoption, any feature stuck in "SAS-Only" is a blocker.

---

### E. Human Role Progression

Map the team's current stage and identify the features needed to advance:

```json
[
  { "stage": "Code Writer", "human_role": "Writes code, reviews manually", "enabling_features": [] },
  { "stage": "Harness Builder", "human_role": "Builds scaffolding, reviews agent PRs", "enabling_features": ["P1-1", "P2-1", "P0-3"] },
  { "stage": "System Architect", "human_role": "Designs environments, spot-checks", "enabling_features": ["P0-5", "P2-3", "P1-5"] },
  { "stage": "Strategic Overseer", "human_role": "Sets goals, harness evolves autonomously", "enabling_features": ["P0-8", "P3-4", "P3-3"] }
]
```

**Gap test:** At which stage is the team stuck? The features enabling the next stage are the improvement priority.
