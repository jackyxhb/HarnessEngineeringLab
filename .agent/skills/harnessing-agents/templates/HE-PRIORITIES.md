# HE-PRIORITIES Template

**Phase 2: Gap Scoring & Prioritization**

This template aggregates scored gaps from `HE-CLUES.md` (Phase 1 output) into prioritized tiers. For each gap identified in Phase 1, score across 6 dimensions, calculate priority scores, and organize into execution tiers.

---

## Priority Score Formula

```text
Priority Score = (5 - Composite Score) × Impact Weight × Cascade Length
```

**Key Definitions:**
- **Composite Score:** Average of the 6 dimension scores (0–5 scale)
- **Impact Weight:** Count of downstream features that explicitly depend on this feature (per `framework/HE Index.md`). Weight = 1 if no downstream dependencies, else Weight = Dependency Count
- **Cascade Length:** Severity of failure propagation. Score: 1 (localized), 2 (moderate pipeline), 3 (systemic/> 3 systems fail simultaneously)

---

## Evaluation Dimensions (0-5 Rubric)

Reference: `references/he-scoring.md` and `framework/cross-cutting/HE Evaluation Dimensions.md`

```json
[
  {
    "dimension": "Maturity",
    "chain_level": "L4 (Actions & Tools)",
    "question": "What tier of implementation is in place?",
    "rubric": "0=Absent | 1=Ad-hoc | 2=Basic | 3=Functional | 4=Optimized | 5=Leading"
  },
  {
    "dimension": "Effectiveness",
    "chain_level": "L5 (Measurable Outcomes)",
    "question": "Does the feature achieve its L2 targeted enhancement?",
    "rubric": "0=Absent | 1=Ad-hoc | 2=Basic | 3=Functional | 4=Optimized | 5=Leading"
  },
  {
    "dimension": "Risk",
    "chain_level": "L2 inverse (Enhancement at risk)",
    "question": "What failure modes does the feature prevent?",
    "rubric": "0=No prevention | 1=Advisory only | 2=Partial | 3=Reliable | 4=Monitored | 5=Self-healing"
  },
  {
    "dimension": "Cost",
    "chain_level": "L4 (Action proportionality)",
    "question": "What is the token/compute/human cost? (Score HIGH cost LOW)",
    "rubric": "0=Prohibitive | 1=Very high | 2=High | 3=Moderate | 4=Low | 5=Minimal"
  },
  {
    "dimension": "Scalability",
    "chain_level": "L3 (Design Decisions)",
    "question": "Does the feature scale from SAS to MAS?",
    "rubric": "0=SAS only | 1=SAS-dominant | 2=Partial MAS | 3=MAS capable | 4=MAS optimized | 5=MAS native"
  },
  {
    "dimension": "Human Role",
    "chain_level": "L2 (Enhancement trajectory)",
    "question": "What is the human's optimal role?",
    "rubric": "0=All-manual | 1=Human-led | 2=Mostly human | 3=Balanced | 4=Mostly agent | 5=Fully autonomous"
  }
]
```

---

## Scoring Boosters

When a feature has an **active prevention failure** (i.e., the "Don't Do" anti-pattern is currently occurring in the project), apply a **+1 boost** to the Risk dimension score to prioritize containment.

---

## Tier Definitions

```json
[
  {
    "tier": 1,
    "label": "Immediate (Critical)",
    "priority_score_rank": "Top 20%",
    "action_timeline": "This sprint — Blocks functionality or enables critical prevention",
    "characteristics": "Active prevention failures, systemic bottlenecks, foundational blockers"
  },
  {
    "tier": 2,
    "label": "Mid-term (Important)",
    "priority_score_rank": "Middle 40%",
    "action_timeline": "This quarter — Reduces friction and improves scaling",
    "characteristics": "Partial implementations, moderate dependencies, quality improvements"
  },
  {
    "tier": 3,
    "label": "Long-term (Enhance)",
    "priority_score_rank": "Bottom 40%",
    "action_timeline": "This half-year — Nice-to-have improvements",
    "characteristics": "Isolated gaps, optimization opportunities, secondary features"
  }
]
```

---

## Priority Tier Summary

```text
Total Gaps Identified: [N]
Tier 1 (Immediate):  [N] gaps
Tier 2 (Mid-term):   [N] gaps
Tier 3 (Long-term):  [N] gaps
```

---

## Tier 1: Immediate (Critical)

**Action Timeline:** This sprint — blocks functionality or enables critical prevention.

### Example Entry

**Rank:** 1 (Highest Priority)
**Feature:** P0-3 Collective Verification
**Priority Score:** 4.2 (Composite: 2.5 → (5 - 2.5) = 2.5 × Impact Weight: 3 × Cascade: 1.4 ≈ 4.2)
**Composite Score:** 2.5 (Maturity: 2, Effectiveness: 2, Risk: 3 plus 1 boost, Scalability: 2, Cost: 3, Human Role: 3)
**Dimensions:**
- Maturity: 2 (Basic — test suite exists but no gate)
- Effectiveness: 2 (Basic — tests run but not enforced)
- Risk: 4 (Reliable — with boost from active "Cascading Hallucinations" failure)
- Cost: 3 (Moderate — task-completion hook implementation)
- Scalability: 2 (Partial — works for single agent, SAS-focused)
- Human Role: 3 (Balanced — human initiates, gate enforces)

**Impact Weight:** 3 (downstream: P0-4 Ralph Loops, P1-3 Task Lists, P2-3 AI Auditors)
**Cascade Length:** 1.4 (moderate pipeline — test failures block 2-3 downstream workflows)
**Prevention Active:** YES — "Prevent Cascading Hallucinations": task completion without verification allows agent errors to corrupt downstream decisions
**Severity:** Critical
**Remediation Level:** Medium
**Description:**
  Verification gates are missing at task-completion boundaries. Agents can finalize work without passing test suites, allowing undetected errors to propagate into downstream tasks. This directly enables the "Cascading Hallucinations" anti-pattern. Immediate fix: add a pre-commit verification hook that fails task finalization if tests do not pass.

**Recommended Next Steps:**
1. Implement `TaskCompleted` hook that returns non-zero exit code when verification fails
2. Gate task-state transitions to prevent completion when verification is unmet
3. Document the verification contract in P0-3 enforcement binding

---

### [Add subsequent Tier 1 gaps in this format, ranked by Priority Score descending]

---

## Tier 2: Mid-term (Important)

**Action Timeline:** This quarter — reduces friction and improves scaling.

### Example Entry

**Rank:** 5
**Feature:** P1-9 Branch-Based Cognitive Memory
**Priority Score:** 2.8 (Composite: 2.2 → (5 - 2.2) = 2.8 × Impact Weight: 2 × Cascade: 1.0 ≈ 2.8)
**Composite Score:** 2.2 (Maturity: 2, Effectiveness: 2, Risk: 2, Scalability: 3, Cost: 2, Human Role: 2)
**Dimensions:**
- Maturity: 2 (Basic — branching exists but no structured cognitive memory)
- Effectiveness: 2 (Basic — branches created ad-hoc, not systematically)
- Risk: 2 (Partial — no enforcement that complex tasks use branching)
- Cost: 2 (High — requires workflow discipline)
- Scalability: 3 (MAS capable — branch model scales to multi-agent)
- Human Role: 2 (Mostly human — human must decide when to branch)

**Impact Weight:** 2 (downstream: P1-10 Requirements Ledger, P3-3 Pattern Auditing)
**Cascade Length:** 1.0 (localized — mainly affects cognitive memory and traceability, not systemic)
**Prevention Active:** NO
**Severity:** Important
**Remediation Level:** Medium
**Description:**
  Complex tasks are not systematically partitioned into isolated sub-task branches. This prevents building cognitive memory through explicit commit history. While branching is available, there is no structural enforcement or templates to guide agents when to use the `/cognitive-branch` workflow. Mid-term fix: document branching criteria in AGENTS.md, create example templates for complexity classification.

**Recommended Next Steps:**
1. Define criteria in AGENTS.md for when `/cognitive-branch` is mandatory (3+ steps)
2. Add pre-branch checklist template to PLANS.md
3. Update scaffolding to suggest `/cognitive-branch` during task initiation

---

### [Add subsequent Tier 2 gaps in this format, ranked by Priority Score descending]

---

## Tier 3: Long-term (Enhance)

**Action Timeline:** This half-year — nice-to-have improvements.

### Example Entry

**Rank:** 12
**Feature:** P3-1 Scheduled Cleanups
**Priority Score:** 1.1 (Composite: 3.5 → (5 - 3.5) = 1.5 × Impact Weight: 1 × Cascade: 1.0 ≈ 1.1)
**Composite Score:** 3.5 (Maturity: 4, Effectiveness: 3, Risk: 3, Scalability: 4, Cost: 3, Human Role: 3)
**Dimensions:**
- Maturity: 4 (Optimized — cron-based cleanups run reliably)
- Effectiveness: 3 (Functional — scheduled cleanup executes as planned)
- Risk: 3 (Reliable — prevents manual cleanup bottleneck)
- Cost: 3 (Moderate — infrastructure/scheduler maintenance)
- Scalability: 4 (MAS optimized — cleanup logic is stateless)
- Human Role: 3 (Balanced — human defines policy, agent executes)

**Impact Weight:** 1 (no downstream dependencies — standalone feature)
**Cascade Length:** 1.0 (localized — cleanup failures do not cascade)
**Prevention Active:** NO
**Severity:** Enhancement
**Remediation Level:** Light
**Description:**
  Scheduled cleanup infrastructure is functional but not monitored for drift. Cleanup policies exist but are not automatically adapted based on accumulating entropy. Long-term improvement: add observability hooks to detect cleanup policy degradation and suggest refinements.

**Recommended Next Steps:**
1. Add entropy-trend analysis to cleanup reports
2. Create a simple monitoring dashboard for cleanup success rate
3. Document threshold for policy refresh (quarterly vs. annually)

---

### [Add subsequent Tier 3 gaps in this format, ranked by Priority Score descending]

---

## Summary & Distribution

### Priority Score Distribution

```text
Tier 1 (Immediate):  [N] gaps, total Priority Score: [S], avg: [A]
Tier 2 (Mid-term):   [N] gaps, total Priority Score: [S], avg: [A]
Tier 3 (Long-term):  [N] gaps, total Priority Score: [S], avg: [A]

Total Priority Effort: [S points]
Recommended allocation: Tier 1 [60%], Tier 2 [30%], Tier 3 [10%]
```

### Prevention Failure Amplification

```text
Active Prevention Failures: [N]
- By Feature: [Feature ID — Count]
- By Principle: [EP-N — Count]

Urgency Multiplier: [N failures × Risk boost → X% of Tier 1 assignments]
```

### Dependency Hotspots

Features with the highest Impact Weight (most downstream dependencies):

```text
Feature [ID]: [N] downstream dependencies → Weight = [N]
Feature [ID]: [N] downstream dependencies → Weight = [N]
...
```

These high-weight features should be prioritized even if individual scores are moderate, because their failure cascades widely.

---

## Instructions for Phase 2 Execution

**Input:** `HE-CLUES.md` (all identified gaps with severity and remediation level)

**For Each Gap:**

1. **Score the 6 dimensions** using the rubric above. Reference the feature's L4/L5 sections in `framework/features/P*.md` and the project's current state from Phase 1.

2. **Apply Prevention Boost:** If `Prevention Active: YES`, add +1 to the Risk dimension score.

3. **Calculate Composite Score:** Average all 6 dimension scores.

4. **Determine Impact Weight:** Look up the feature in `framework/HE Index.md`, count its downstream dependencies. If zero, Weight = 1; otherwise Weight = count.

5. **Estimate Cascade Length:** Trace the feature's failure. If > 3 downstream systems collapse simultaneously, Length = 3. If 2-3 elements fail, Length = 2. If localized, Length = 1. (Use 1.0–1.5 for intermediate cases.)

6. **Calculate Priority Score:** `(5 - Composite Score) × Impact Weight × Cascade Length`

7. **Assign Tier:** Sort all gaps by Priority Score descending. Top 20% → Tier 1, middle 40% → Tier 2, bottom 40% → Tier 3.

8. **Document Entry:** Use the template blocks above, filling in each field with scored values, dimension explanations, and recommended next steps.

---

## Example Filled Section (Full Tier 1 Entry)

This is a detailed example showing how a complete gap entry should be structured:

**Rank:** 1 (Highest Priority Score in Tier 1)

**Feature:** P0-4 Ralph Loops (Task Completion & Reinjection)

**Feature ID:** P0-4

**Governed By:** EP-14 — Task Completion Verification

**Priority Score:** 5.6 (Composite: 2.1 → (5 - 2.1) = 2.8 × Impact Weight: 4 × Cascade: 2.0 ≈ 5.6)

**Composite Score:** 2.1

**Dimensions:**
- Maturity: 1 (Ad-hoc — manual task-state tracking, no structured reinjection loop)
- Effectiveness: 2 (Basic — some tasks resubmitted on failure, but not mechanical)
- Risk: 4 (Reliable — with boost for active "Premature Task Completion" prevention failure) [3 + 1 boost]
- Cost: 1 (Very high — requires extensive orchestration infrastructure)
- Scalability: 2 (SAS dominant — reinjection logic is project-specific, not generalizable)
- Human Role: 2 (Mostly human — human detects stalled tasks and manually resubmits)

**Impact Weight:** 4 (downstream: P0-7 Escalation, P1-3 Task Lists, P1-9 Cognitive Memory, P2-3 AI Auditors)

**Cascade Length:** 2.0 (moderate pipeline — task failure blocks dependent work and escalation handling)

**Prevention Active:** YES — "Prevent Premature Task Completion": agents declare tasks done without verifying all steps are finished, leaving work incomplete and breaking task history.

**Severity:** Critical

**Remediation Level:** Heavy

**Description:**
  Task completion verification is missing mechanical enforcement. Agents can mark tasks as complete without checking all planned steps (from todo list, plan entry, or original objective). This directly enables the "Premature Task Completion" anti-pattern (EP-14 violation). Currently there is no `.harness/task-state.json` integration, no reinjection loop, and no escalation trigger. Heavy fix: implement the Ralph Loops infrastructure with mechanical phase gates, state persistence, and bounded reinjection.

**Recommended Next Steps (Immediate):**
1. Implement `.harness/task-state.json` schema and `npm run task-state` utility
2. Add `task-state.schema.json` to `.harness/` with canonical structure
3. Create pre-commit hook that blocks completion when task-state shows unfinished steps
4. Document reinjection budget (max 3 per task) and escalation thresholds in AGENTS.md
5. Implement `exit-interceptor.js` to detect and reject stale-heartbeat tasks

---

## Cross-Cutting Perspective Amplification (Optional)

If the audit included cross-cutting perspective analysis (from `framework/cross-cutting/HE Cross Cutting Perspectives.md`), note any features whose gaps are amplified by systemic weaknesses:

**Example:**
- **Human Role Optimization Weakness:** P0-4 Ralph Loops gap is amplified by the lack of P1-11 Socratic Questioning — agents cannot ask for clarification on ambiguous task objectives, leading to failed reinjections.
- **Agent Legibility Weakness:** P0-3 Verification gap is amplified by poor boundary definition in P2-1 Linters — agents cannot easily identify what to test.

---

## Notes for Reviewers

- **Tier 1 Priority Check:** Verify that all gaps with active prevention failures are in Tier 1. If not, revisit the scoring and cascade estimates.
- **Impact Weight Validation:** Cross-check Impact Weight assignments against `framework/HE Index.md`'s documented dependencies.
- **Composite Score Reasonableness:** Ensure scores are grounded in project evidence, not assumptions. If evidence is sparse, note it as a secondary gap ("Gap Documentation") in Phase 3.
- **Remediation Level Alignment:** Light remediation should have Priority Scores typically < 2.0. Heavy remediation should justify high scores with compelling Prevention or Impact evidence.

---

## Trajectory Reduction Checkpoint

After completing this template, flush raw scoring data and reference files from active memory. Retain only the final tier list and summary metrics for Phase 3.
