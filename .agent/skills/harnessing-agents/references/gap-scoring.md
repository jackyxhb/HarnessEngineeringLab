# Gap Scoring Framework

The 6 Evaluation Dimensions below score individual features. They are distinct from the 4 Scoping Dimensions (`references/dimensions.md`) used to scope the overall audit. Each dimension maps to a level in the Principle-to-Practice Chain (see `framework/HE Principle Map.md`), ensuring gap analysis is grounded in engineering principles.

## Evaluation Dimensions (0-5 Rubric)

For each feature (P0-1 to P0-11, P1-1 to P1-12, P2-1 to P2-5, P3-1 to P3-4), assign a score from 0-5 across the following dimensions:

| Dimension | Chain Level | Question It Answers |
| - | - | - |
| **Implementation Maturity** | L4 (Actions & Tools) | How fully built is this feature? |
| **Operational Effectiveness** | L5 (Measurable Outcomes) | Does the feature actually work in practice? |
| **Risk Exposure** | L2 inverse (Enhancement at risk) | What breaks if this feature is absent or weak? |
| **Cost-Efficiency** | L4 (Action proportionality) | Is the investment proportional to the value? |
| **Scalability (SAS→MAS)** | L3 (Design Decisions) | Will this feature survive the transition to Multi-Agent Systems? |
| **Human Role Evolution** | L2 (Enhancement trajectory) | Does this feature shift humans from writing code to designing systems? |

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

---

## Cross-Cutting Perspectives

After scoring individual features, apply these 5 systemic perspectives to reveal gaps that span multiple features.

> **Source:** `framework/HE Inverse Outcomes.md` Part 3

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

| Token Savers | Token Spenders |
| - | - |
| Context Compaction (P1-2) | AI Auditors (P2-3) |
| Tool Offloading (P1-3) | Web Search & MCP (P1-6) |
| Progressive Skills (P1-4) | Verification (P0-3) |
| Automated Linters (P2-1) | Inter-Agent Communication (P0-10) |
| Planning & State Files (P1-7) | Scheduled Cleanups (P3-1) |
| Context Anchoring (P1-8) | |
| Branch Cognitive Memory (P1-9) | |

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

| Feature | SAS-Only | MAS-Ready | MAS-Optimized |
| - | - | - | - |
| Filesystem & Git (P0-2) | Single workspace | Git worktrees | File locking + task claiming |
| Self-Verification (P0-3) | Run tests locally | Gate on shared state | Consensus voting |
| Orchestration (P0-5) | Sequential tasks | Supervisor pattern | Dynamic topology switching |
| Context Compaction (P1-2) | Single window | Per-agent windows | Distributed memory management |
| AI Auditors (P2-3) | Single reviewer | Cooperative review | Competition + coopetition |
| Context Anchoring (P1-8) | Single-session memory | Persistent anchor files | Shared anchor files |
| Branch Memory (P1-9) | Sequential execution | Sub-task branches | Parallel agents + merge gates |
| Escalation (P0-7) | Alert human | Retry with different agent | Tiered multi-agent escalation |

**Gap test:** If planning MAS adoption, any feature stuck in "SAS-Only" is a blocker.

---

### E. Human Role Progression

Map the team's current stage and identify the features needed to advance:

| Stage | Human Role | Enabling Features |
| - | - | - |
| **Code Writer** | Writes code, reviews manually | (No harness features needed) |
| **Harness Builder** | Builds scaffolding, reviews agent PRs | P1-1, P2-1, P0-3 |
| **System Architect** | Designs environments, spot-checks | P0-5, P2-3, P1-5 |
| **Strategic Overseer** | Sets goals, harness evolves autonomously | P0-8, P3-4, P3-3 |

**Gap test:** At which stage is the team stuck? The features enabling the next stage are the improvement priority.
