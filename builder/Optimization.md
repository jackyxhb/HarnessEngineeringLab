# Project Plan: `harnessing-agents` Skill Optimization (v1.1.0)

## Mission Context

The `harnessing-agents` skill is a critical tool for performing autonomous audits of AI Agent Harnesses. Prior to this optimization (v1.0.0), the skill suffered from significant "context overhead."
### Identified Friction Points
- **Monolithic Reference:** `features.md` exceeded the 200-line safety limit (236 lines), causing model fatigue.
- **High Entry Cost:** Agents were required to read ~400+ lines of documentation before identifying the correct action path.
- **Mixed Dimensions:** "Assessment Dimensions" (scoping) and "Evaluation Dimensions" (scoring) shared similar names, leading to logic errors in subagent dispatches.
- **Invisible Utilities:** High-value templates and the Quick-Start Checklist were buried deep in procedural documentation.

**Objective:** Restructure the skill into a modular architecture to reduce the "mandatory-read" volume and improve the "time-to-first-action" metric.

---

## Phase 1: High-Level Architecture (SKILL.md)

**Goal:** Transform `SKILL.md` into a routing hub rather than a textbook.

- **Routing Logic:** Implement a decision tree that immediately directs the agent to specific files (e.g., `quick-checklist.md` for fast scans, `gap-scoring.md` for deep audits).
- **Metadata Update:** Align frontmatter with project standards (`version`, `user-invocable`, `allowed-tools`).
- **Terminology Alignment:** Standardize the "4 Assessment Dimensions" as **"4 Scoping Dimensions"** to clearly distinguish them from the 6 scoring criteria.

---

## Phase 2: Modularization Strategy (Split & Extract)

**Goal:** Break down monolithic references to stay below the 200-line threshold.

### 2a. The Feature Split
- **Modularized:** `features.md` (236 lines) →
  - `references/features-foundation.md` (F1–F8)
  - `references/features-pillars.md` (P1–P3)
- **Benefit:** Allows the agent to load only the relevant layer of the framework (Infrastructure vs. Pillars).

### 2b. Utility Extraction
- **The Fast Path:** Extract the Quick-Start Checklist from `gap-scoring.md` into `references/quick-checklist.md`.
- **The Templates:** Move 4 output formats (Clues, Plan, Summary, Report) from `workflow.md` into a dedicated `templates/` directory to facilitate copy-paste usage.

---

## Phase 3: New Capability Injection

- **Subagent Orchestration:** Create `references/agent-prompts.md` containing pre-configured dispatch prompts for parallel agents.
- **Dependency Analytics:** Build `references/dependencies.md` to map the 28-feature cascade without requiring a full framework scan.

---

## Post-Optimization Structure

```text
harnessing-agents/
├── SKILL.md                            (Routing Hub)
├── references/
│   ├── workflow.md                     (Operational Logic)
│   ├── features-foundation.md          (Core Infrastructure)
│   ├── features-pillars.md             (Functional Pillars)
│   ├── dimensions.md                   (Scoping Rules)
│   ├── gap-scoring.md                  (Scoring Logic)
│   ├── quick-checklist.md              (5-Min Audit)
│   ├── agent-prompts.md                (Orchestration)
│   └── dependencies.md                 (Impact Analysis)
└── templates/
    └── [he-clues | implementation-plan | change-summary | assessment-report].md
```

## Impact Assessment

| Metric | Status | Target |
| --- | --- | --- |
| **Max File Length** | ✅ Passed | All files < 200 lines |
| **Mandatory Read** | ✅ Reduced | ~400+ lines → ~220 lines |
| **Action Readiness** | ✅ Improved | 4 templates & 5 prompts added |

---

> _Archived as a technical reference for the **Harness Engineering Lab** reconciliation series._
