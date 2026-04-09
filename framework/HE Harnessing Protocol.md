# HE Harnessing Protocol

A comprehensive, step-by-step procedure for executing Harness Engineering across all 32 core features. This protocol is the canonical procedure consumed by the released `harnessing-agents` skill when it audits and improves a target project, including when the target project is this repository itself in self-host mode. Each phase is designed as **a small, self-contained task** that fits reliably within a single agent context window — preventing hallucination, context rot, and premature exits.

For terminology boundaries between canonical framework concepts and current skill-side delivery terms, see [HE-Terms.md](HE-Terms.md).

> **Design Principle:** Every task produces a concrete, verifiable artifact. Tasks are sequenced so each one can be executed independently — an agent picking up Task 3.2 needs only the outputs of its predecessors, not the full conversation history of the entire procedure.
>
> **Chain Flow:** The phases follow the Principle-to-Practice Chain (L1→L5): Scope (pre-chain) → Principles (L1) → Enhancements (L2) → Design Decisions (L3) → Actions (L4) → Results (L5) → Principle Feedback (L1 ↩).

## Procedure Schema & Safeguards

Before executing any tasks, agents MUST load and anchor to the authoritative JSON schemas defined in the appendices:

- **Task Dependencies:** See [Appendix A: Task Dependency Graph](#appendix-a-task-dependency-graph)
- **Assessment Matrix:** See [Appendix C: Unified Assessment Matrix](#appendix-c-unified-assessment-matrix) (Data Schema)
- **Hallucination Safeguards:** See [Appendix D: Anti-Hallucination Safeguards](#appendix-d-anti-hallucination-safeguards)

---

## Phase 0: Scope — Target Assessment

> **Goal (Pre-chain):** Understand the target project and determine which parts of this procedure apply. In self-host mode, the target project is the HELab workspace itself; in external mode, it is the project where the `harnessing-agents` skill is being run.

### Task 0.1: Identify Target Project & Scale

**Input:** Target project path or repository URL
**Actions:**

1. Read the project's top-level directory structure.
2. Identify the project type: pure text/docs, scripted operations, simple app, complex system, or enterprise platform.
3. Identify the agent scale: single agent, small team (2–5 agents), or enterprise/swarm.
4. Record findings in a new file: `HE-SCOPE.md` in the target project root.

**Output:** `HE-SCOPE.md` containing:

- Project type classification
- Agent scale classification
- Technology stack summary
- List of existing harness artifacts found (e.g., `CLAUDE.md`, `.cursorrules`, `AGENTS.md`, pre-commit configs, CI files)

**Context needed:** Project filesystem only.
**Estimated tokens:** ~2,000

---

### Task 0.2: Quick-Start Checklist Scan

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**

1. Run through the **Quick Scan Checklist** (evaluating L2 targets from `HE Index.md`).
2. For each checkbox, mark it as ✅ (present) or ❌ (absent) with a one-line justification.
3. Identify the project's current **Maturity Level** (Basic / Team / Production) based on the `HE Landing Pathway`.

**Output:** Append to `HE-SCOPE.md`:

- Quick-Start checklist results (32 items)
- Current maturity level
- Target maturity level (user to confirm)

**Context needed:** `HE-SCOPE.md` + project filesystem + `HE Index.md`, `HE Landing Pathway`.
**Estimated tokens:** ~3,000

---

## Phase 1: Principles — Gap Discovery

> **Goal (L1 — Engineering Principles):** Discover which engineering principles are unmet across all 4 function areas. Each sub-task inspects one function area for principle gaps.

### Task 1.1: Foundation Principles — Infrastructure (Execute)

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**

1. Check for **Bash Sandboxes** (P0-1): Is there Docker/container config? Does the agent run locally?
2. Check for **Filesystem, Git & File Locking** (P0-2): Is Git initialized? Are there branching strategies? File locking?
3. Check for **Verification (Self & Collective)** (P0-3): Is there a test suite? Can tests be run from CI? Are error logs piped back?
4. Check for **Ralph Loops** (P0-4): Any exit interception hooks? State persistence across context windows?
5. Check for **Orchestration Logic** (P0-5): Subagent spawning? Task routing? Multi-agent topologies?
6. Check for **Rippable Middleware** (P0-6): Is the harness modular? Feature flags?
7. Check for **Escalation Policies & Audit Trails** (P0-7): Audit trails? Stuck-agent detection? Human notification?
8. Check for **Harness Versioning** (P0-8): Is the harness config version-controlled? A/B testing?
9. Check for **Smart Command Wrappers** (P0-9): Recommended CLI workflows (ccp, ccpr, reconcile) installed?
10. Check for **Inter-Agent Communication** (P0-10): Messaging bus? P2P messaging? Broadcast/idle notifications?
11. Check for **Portable Agent Surface** (P0-11): Is there an `AGENTS.md`? Are IDE-specific files (CLAUDE.md, .cursorrules, copilot-instructions.md) thin shims or full rule stores? Are project rules locked into one IDE's proprietary memory?

**Output:** `HE-CLUES-Foundation.md` with per-feature findings:

- Current state (what exists)
- Gap signals observed
- Severity: Critical / Important / Enhancement

**Context needed:** `HE-SCOPE.md` + project filesystem + `HE Index.md` & relevant `framework/features/P0-*.md`.
**Estimated tokens:** ~4,000

---

### Task 1.2: Pillar 1 Principles — Context Engineering (Inform)

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**

1. Check for **Repository as Truth** (P1-1): Does `CLAUDE.md` / `AGENTS.md` / `.cursorrules` exist? Are architectural decisions documented in-repo?
2. Check for **Context Compaction & Memory Management** (P1-2): Any summarization of conversation history? Token budgets?
3. Check for **Tool Offloading** (P1-3): Are tool outputs stripped? Full results stored to disk?
4. Check for **Progressive Skills** (P1-4): Are tools loaded on-demand or all at startup?
5. Check for **Observability / Dashboards** (P1-5): Can the agent see CI/CD status? Logs? Metrics?
6. Check for **Web Search & MCP** (P1-6): External data access? MCP servers configured?
7. Check for **Planning, Task Lists & Blackboards** (P1-7): Plan files? Task decomposition? Shared blackboards?
8. Check for **Context Anchoring** (P1-8): Persistent decision records (what, why, target, background)? Recall hooks at session start?
9. Check for **Branch-Based Cognitive Memory** (P1-9): Concurrent task branches? Structured commit boundaries acting as memory?
10. Check for **Requirements Ledger** (P1-10): A unified requirements file (e.g., `REQUIREMENTS.md`)? Are user stories and scenarios recorded before planning?
11. Check for **Socratic Questioning** (P1-11): Is there a documented pre-execution ambiguity interrogation pass? Are clarifications recorded in the ledger or anchors before planning?
12. Check for **Skill Engineering** (P1-12): Are agent skills modular, context-efficient, and tunable? Are there reusable pattern definitions and routing hubs?

**Output:** `HE-CLUES-P1-Context.md` with per-feature findings (same format as Task 1.1).

**Context needed:** `HE-SCOPE.md` + project filesystem + `HE Index.md` & relevant `framework/features/P1-*.md`.
**Estimated tokens:** ~3,500

---

### Task 1.3: Pillar 2 Principles — Architectural Constraints (Constrain)

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**

1. Check for **Automated Linters** (P2-1): Pre-commit hooks? Linting config? Formatting enforcement?
2. Check for **Dependency Enforcement** (P2-2): Structural tests? Import restrictions? ArchUnit or equivalent?
3. Check for **AI Auditors & Collaboration Channels** (P2-3): Is there a machine-readable review ledger, a generator/evaluator separation rule in the canonical agent contract, and a repo-native gate or workflow that blocks self-grading?
4. Check for **Bounded Autonomy & Access Control** (P2-4): Guardrails? Permission systems?
5. Check for **Upstream Intake Gate** (P2-5): Validation that requirements are recorded in the ledger before planning proceeds? Mid-task sync-back mechanism?

**Output:** `HE-CLUES-P2-Constraints.md` with per-feature findings.

**Context needed:** `HE-SCOPE.md` + project filesystem + `HE Index.md` & relevant `framework/features/P2-*.md`.
**Estimated tokens:** ~2,500

---

### Task 1.4: Pillar 3 Principles — Entropy Management (Maintain)

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**

1. Check for **Scheduled Cleanups** (P3-1): Automated sweeps? Dead code detection? Conflict resolution?
2. Check for **Documentation Sync** (P3-2): Docs validated against code? Staleness detection?
3. Check for **Pattern Auditing** (P3-3): Circular dependency detection? Pattern registry?
4. Check for **Consolidation Loop** (P3-4): Auto-updated counts? Changelogs? ADR prompts?

**Output:** `HE-CLUES-P3-Entropy.md` with per-feature findings.

**Context needed:** `HE-SCOPE.md` + project filesystem + `HE Index.md` & relevant `framework/features/P3-*.md`.
**Estimated tokens:** ~2,500

---

### Task 1.5: Consolidate Principle Gaps into Master Report

**Input:** `HE-CLUES-Foundation.md`, `HE-CLUES-P1-Context.md`, `HE-CLUES-P2-Constraints.md`, `HE-CLUES-P3-Entropy.md`
**Actions:**

1. Merge all 4 principle-gap files into a single `HE-CLUES.md`.
2. Sort all found gaps by severity (Critical → Important → Enhancement).
3. Cross-reference gaps against the **Prevention Checklist** (`framework/cross-cutting/HE Prevention Checklist.md`) — note any prevention failures.
4. Summarize: total gaps found, gaps per function area, distribution by severity.

**Output:** `HE-CLUES.md` — the master gap report.

**Context needed:** The 4 clue files + `framework/cross-cutting/HE Prevention Checklist.md`.
**Estimated tokens:** ~3,000

---

## Phase 2: Enhancements — Gap Scoring

> **Goal (L2 — Targeted Enhancements):** Score each identified gap to quantify the desired enhancement using the 6-dimension evaluation framework. This is split into sub-tasks by function area to stay within context limits.

### Task 2.1: Score Foundation Features (P0-1 to P0-11)

**Input:** `HE-CLUES.md` (Foundation section only), `framework/cross-cutting/HE Evaluation Dimensions.md`, relevant `framework/features/P0-*.md` (L5 sections)
**Actions:**

1. For each Foundation feature (P0-1 to P0-11), score across all 6 canonical dimensions (0–5) defined in `framework/cross-cutting/HE Evaluation Dimensions.md`:
   - Maturity
   - Effectiveness
   - Risk
   - Cost
   - Scalability
   - Human Role
2. Note gap signals that match the framework's documented signals.
3. Calculate composite score per feature.

**Output:** `HE-SCORES-Foundation.md` — a 11×6 scoring matrix with justifications.

**Context needed:** `HE-CLUES.md` Foundation section + `framework/features/P0-*.md` L5 sections.
**Estimated tokens:** ~4,500

---

### Task 2.2: Score Pillar 1 Features (P1-1 to P1-12)

**Input:** `HE-CLUES.md` (P1 section), relevant `framework/features/P1-*.md` (L5 sections)
**Actions:** Same as Task 2.1 but for Pillar 1 features.
**Output:** `HE-SCORES-P1.md` — a 12×6 scoring matrix.

**Context needed:** `HE-CLUES.md` P1 section + `framework/features/P1-*.md` L5 sections.
**Estimated tokens:** ~4,000

---

### Task 2.3: Score Pillar 2 Features (P2-1 to P2-5)

**Input:** `HE-CLUES.md` (P2 section), relevant `framework/features/P2-*.md` (L5 sections)
**Actions:** Same as Task 2.1 but for Pillar 2 features.
**Output:** `HE-SCORES-P2.md` — a 5×6 scoring matrix.

**Context needed:** `HE-CLUES.md` P2 section + `framework/features/P2-*.md` L5 sections.
**Estimated tokens:** ~3,000

---

### Task 2.4: Score Pillar 3 Features (P3-1 to P3-4)

**Input:** `HE-CLUES.md` (P3 section), relevant `framework/features/P3-*.md` (L5 sections)
**Actions:** Same as Task 2.1 but for Pillar 3 features.
**Output:** `HE-SCORES-P3.md` — a 4×6 scoring matrix.

**Context needed:** `HE-CLUES.md` P3 section + `framework/features/P3-*.md` L5 sections.
**Estimated tokens:** ~2,500

---

### Task 2.5: Cross-Cutting Analysis & Prioritization

**Input:** `HE-SCORES-Foundation.md`, `HE-SCORES-P1.md`, `HE-SCORES-P2.md`, `HE-SCORES-P3.md`, `framework/cross-cutting/HE Cross Cutting Perspectives.md`, `framework/cross-cutting/HE SAS MAS Readiness.md`
**Actions:**

1. Apply **Perspective 1: Human Role Optimization** — identify where humans are bottlenecks vs. irreplaceable reviewers.
2. Apply **Perspective 2: SAS→MAS Readiness** — identify scaling blockers using the canonical JSON matrix.
3. Apply **Perspective 3: Agent Legibility** — flag codebase characteristics that degrade agent comprehension.
4. Apply **Perspective 4: Entropy Trajectory** — detect whether the codebase is getting cleaner or dirtier over time.
5. Calculate **Priority Score** for each gap using the **Appendix C Assessment Matrix** logic:
   `Priority Score = (5 - Composite) × Impact Weight × Cascade Length`
6. Tier the results based on the score distribution: Tier 1 (Critical), Tier 2 (Important), Tier 3 (Enhancement).

**Output:** `HE-PRIORITIES.md` — prioritized gap list with tier assignments and cross-cutting analysis summary.

**Context needed:** 4 score files + `framework/cross-cutting/HE Cross Cutting Perspectives.md`.
**Estimated tokens:** ~4,000

---

## Phase 3: Design Decisions — Remediation Planning

> **Goal (L3 — Design Decisions):** Select design patterns and strategies to translate prioritized gaps into a concrete implementation plan with user-confirmed selections.

### Task 3.1: Generate Design Decisions

**Input:** `HE-PRIORITIES.md`, relevant `framework/features/*.md`
**Actions:**

1. For each Tier 1 gap, look up the corresponding feature's **L4: Concrete Actions & Tools** in its feature file in `framework/features/`.
2. For each Tier 2 gap, do the same.
3. For Tier 3 gaps, list but mark as "defer."
4. Classify each design decision by **remediation level**:
   - **Light** — Revise/create meta docs (CLAUDE.md, AGENTS.md, .cursorrules)
   - **Medium** — Add new features (pre-commit hooks, test suites, scripts)
   - **Heavy** — Reform project architecture (ci/cd pipelines, orchestration layer, middleware)

**Output:** `HE-RECOMMENDATIONS.md` — a structured list of design decisions per feature, actions/tools needed, and remediation level.

**Context needed:** `HE-PRIORITIES.md` + relevant `framework/features/*.md`.
**Estimated tokens:** ~4,000

---

### Task 3.2: Build Implementation Plan (User Review Required)

**Input:** `HE-RECOMMENDATIONS.md`, `HE-SCOPE.md`
**Actions:**

1. Group design decisions into **implementation batches** ordered by:
   - Dependencies (foundation first, then pillars)
   - Tier (Tier 1 → Tier 2 → Tier 3)
   - Remediation level (Light → Medium → Heavy)
2. For each batch, specify:
   - Files to create or modify
   - Exact changes to make
   - Verification criteria (how to confirm the change works)
   - Estimated effort
3. Present the plan to the user for review.

**Output:** `HE-IMPLEMENTATION-PLAN.md` — the actionable plan, confirmed by user.

**Context needed:** `HE-RECOMMENDATIONS.md` + `HE-SCOPE.md`.
**Estimated tokens:** ~3,500

> [!IMPORTANT]
> **Stop here and get user confirmation** before proceeding to Phase 4.
> The user may choose to skip, reorder, or modify recommendations.

---

## Phase 4: Actions — Implementation

> **Goal (L4 — Concrete Actions):** Execute actions, configurations, and operations from the implementation plan. Each task below is a **template** — instantiate one per batch from the plan. Each task should modify at most 3–5 files to stay within context limits.

### Task 4.L: Light Remediation — Meta-Doc Updates

**Input:** `HE-IMPLEMENTATION-PLAN.md` (Light batch), target project filesystem
**Actions:**

1. Create or update meta-documentation files (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`).
2. Encode project conventions, architectural decisions, and style guides.
3. Cross-link design documents.
4. Validate file exists and contains required sections.

**Output:** Updated meta-doc files in the target project.

**Verification:** File exists, contains expected section headers, is non-empty.
**Estimated tokens:** ~2,000 per file

---

### Task 4.M: Medium Remediation — Feature Additions

**Input:** `HE-IMPLEMENTATION-PLAN.md` (Medium batch), target project filesystem
**Actions:**

1. Add pre-commit hooks (`.pre-commit-config.yaml` or equivalent).
2. Add linting configuration files.
3. Create test scaffolding or CI pipeline configuration.
4. Add planning/state file templates.
5. Configure skill modules or tool definitions.

**Output:** New feature files added to the target project.

**Verification:** Files exist, configs parse cleanly, hooks install successfully.
**Estimated tokens:** ~3,000 per feature

---

### Task 4.H: Heavy Remediation — Architectural Changes

**Input:** `HE-IMPLEMENTATION-PLAN.md` (Heavy batch), target project filesystem
**Actions:**

1. Refactor project structure for modularity (if needed).
2. Add CI/CD pipeline configuration.
3. Implement orchestration logic or middleware layers.
4. Add dependency enforcement structural tests.
5. Configure sandbox environments.

**Output:** Architectural changes applied.

**Verification:** CI pipeline runs (or can be dry-run), structural tests pass, middleware is independently removable.
**Estimated tokens:** ~4,000 per change

> [!WARNING]
> Heavy remediations should be executed **one at a time** with user review between each.

---

## Phase 5: Results — Verification & Assessment

> **Goal (L5 — Concrete Enhancement):** Measure observable results to verify all changes are effective and produce a final assessment report.

### Task 5.1: Re-Run Quick-Start Checklist

**Input:** Updated target project filesystem, original checklist from Task 0.2
**Actions:**

1. Re-run the Quick-Start Evaluation Checklist against the updated project.
2. Compare ❌ → ✅ conversions against the original.
3. Note any items that remain ❌ and why.

**Output:** `HE-VERIFICATION-CHECKLIST.md` — before/after comparison.

**Context needed:** Updated project filesystem + original checklist results.
**Estimated tokens:** ~2,000

---

### Task 5.2: Re-Score Changed Features

**Input:** `HE-PRIORITIES.md` (features that were modified), updated project filesystem
**Actions:**

1. For each feature where changes were applied, re-score across the 6 dimensions.
2. Calculate delta (improvement) per feature and per dimension.

**Output:** `HE-VERIFICATION-SCORES.md` — before/after scoring delta table.

**Context needed:** Original scores + updated project state.
**Estimated tokens:** ~3,000

---

### Task 5.3: Generate Final Assessment Report

**Input:** `HE-VERIFICATION-CHECKLIST.md`, `HE-VERIFICATION-SCORES.md`, `HE-CLUES.md`, `HE-IMPLEMENTATION-PLAN.md`
**Actions:**

1. Summarize what was done:
   - Total features addressed
   - Files created/modified
   - Maturity level change
2. Highlight remaining gaps and recommended next steps.
3. Map the project on the **Human Role Progression** (Code Writer → Harness Builder → System Architect → Strategic Overseer).
4. Identify the **next maturity milestone** and what's needed to reach it.

**Output:** `HE-ASSESSMENT-REPORT.md` — the final deliverable.

**Context needed:** 4 verification/summary files.
**Estimated tokens:** ~3,000

---

## Phase 6: Principle Feedback — Framework Contribution (Optional)

> **Goal (L1 ↩):** Feed proven patterns back into engineering principles — propagate learnings to the framework based on repository permissions.

### Task 6.1: Generate or Apply Framework Feedback

**Input:** `HE-ASSESSMENT-REPORT.md`, any new patterns discovered
**Actions:**

- **Path A: Internal HELab Mode (Framework Developer)**
  1. If running within the `HarnessEngineeringLab` repository and authorized:
     - Update `.agent/skills/harnessing-agents/SKILL.md` with new features or prevention points.
     - Follow the `/polish` workflow to propagate changes to canonical definitions.
- **Path B: External Target Mode (Skill User)**
  1. If running on a target project via the released `harnessing-agents` skill:
     - Generate a `HE-FEEDBACK.md` report in the project's `.harness/` directory.
     - Document proposed improvements to the 32-feature DAG, gap signals, or prevention checklists.

**Output:** Updated skill/docs (Internal HELab mode) OR `HE-FEEDBACK.md` (External skill-run target mode).

---

### Task 6.2: Sync Canonical Repository (HELab Developer Only)

**Input:** Feedback results from Task 6.1
**Actions:**

1. **Internal Context Only:**
  Review and integrate `HE-FEEDBACK.md` recommendations from external audits, propagate changes to `framework/` canonical documents, and run `/revise-comments` only if the user explicitly wants support material under `docs/` reconciled against the updated framework.

**Output:** Updated HarnessEngineeringLab repository.

---

## Appendix A: Task Dependency Graph

```json
[
  { "id": "0.1", "name": "Identify Target Project & Scale", "dependencies": [] },
  { "id": "0.2", "name": "Quick-Start Checklist Scan", "dependencies": ["0.1"] },
  { "id": "1.1", "name": "Foundation Principles Inspection", "dependencies": ["0.2"] },
  { "id": "1.2", "name": "Pillar 1 Principles Inspection", "dependencies": ["0.2"] },
  { "id": "1.3", "name": "Pillar 2 Principles Inspection", "dependencies": ["0.2"] },
  { "id": "1.4", "name": "Pillar 3 Principles Inspection", "dependencies": ["0.2"] },
  { "id": "1.5", "name": "Consolidate Principle Gaps", "dependencies": ["1.1", "1.2", "1.3", "1.4"] },
  { "id": "2.1", "name": "Score Foundation Features", "dependencies": ["1.5"] },
  { "id": "2.2", "name": "Score Pillar 1 Features", "dependencies": ["1.5"] },
  { "id": "2.3", "name": "Score Pillar 2 Features", "dependencies": ["1.5"] },
  { "id": "2.4", "name": "Score Pillar 3 Features", "dependencies": ["1.5"] },
  { "id": "2.5", "name": "Cross-Cutting Analysis & Prioritization", "dependencies": ["2.1", "2.2", "2.3", "2.4"] },
  { "id": "3.1", "name": "Generate Design Decisions", "dependencies": ["2.5"] },
  { "id": "3.2", "name": "Build Implementation Plan (USER REVIEW)", "dependencies": ["3.1"] },
  { "id": "4.L", "name": "Light Remediation (Meta-Docs)", "dependencies": ["3.2"] },
  { "id": "4.M", "name": "Medium Remediation (Features)", "dependencies": ["3.2"] },
  { "id": "4.H", "name": "Heavy Remediation (Architecture)", "dependencies": ["3.2"] },
  { "id": "5.1", "name": "Re-Run Quick-Start Checklist", "dependencies": ["4.L", "4.M", "4.H"] },
  { "id": "5.2", "name": "Re-Score Changed Features", "dependencies": ["4.L", "4.M", "4.H"] },
  { "id": "5.3", "name": "Generate Final Assessment Report", "dependencies": ["5.1", "5.2"] },
  { "id": "6.1", "name": "Generate or Apply Framework Feedback", "dependencies": ["5.3"] },
  { "id": "6.2", "name": "Sync Canonical Repository", "dependencies": ["6.1"] }
]
```

**Key:** Tasks at the same indent level within a phase (e.g., 1.1–1.4, 2.1–2.4) can be executed **in parallel** by separate agents. Tasks connected by `→` must be **sequential**.

---

## Appendix B: Context Window Budget per Task

All tasks are designed to stay well within a 128K-token context window. Maximum context consumption per task:

```json
[
  { "task": "0.1", "max_source_files": "1 project", "max_lines_read": "~200", "est_tokens": "~2,000" },
  { "task": "0.2", "max_source_files": "2 reference docs", "max_lines_read": "~100", "est_tokens": "~3,000" },
  { "task": "1.x", "max_source_files": "1 reference doc + project", "max_lines_read": "~150", "est_tokens": "~4,000" },
  { "task": "1.5", "max_source_files": "4 clue files", "max_lines_read": "~200", "est_tokens": "~3,000" },
  { "task": "2.x", "max_source_files": "1 score input + ref doc", "max_lines_read": "~200", "est_tokens": "~4,000" },
  { "task": "2.5", "max_source_files": "4 score files + ref", "max_lines_read": "~300", "est_tokens": "~4,000" },
  { "task": "3.x", "max_source_files": "2 input files", "max_lines_read": "~200", "est_tokens": "~4,000" },
  { "task": "4.x", "max_source_files": "3–5 target files", "max_lines_read": "~150", "est_tokens": "~3,000" },
  { "task": "5.x", "max_source_files": "2–4 summary files", "max_lines_read": "~200", "est_tokens": "~3,000" },
  { "task": "6.x", "max_source_files": "1 assessment report", "max_lines_read": "~200", "est_tokens": "~3,000" }
]
```

---

## Appendix C: Unified Assessment Matrix

This matrix defines the measurables, sources of truth, and scoring methods used across the entire procedure. It serves as the authoritative data schema for the final assessment report.

```json
[
  {
    "phase": "0 Scope",
    "measurable": "Target Maturity",
    "source_of_truth": "HE Landing Pathway",
    "evaluation_method": "Checkbox Scan",
    "scoring_value": "Basic / Team / Prod",
    "primary_output": "HE-SCOPE.md"
  },
  {
    "phase": "1 Principles",
    "measurable": "Principle Gaps (L1)",
    "source_of_truth": "HE Index.md",
    "evaluation_method": "Feature Inspection",
    "scoring_value": "✅/❌ (Gap Signal)",
    "primary_output": "HE-CLUES.md"
  },
  {
    "phase": "2 Enhancements",
    "measurable": "Dimension Scores (L5)",
    "source_of_truth": "HE Eval Dimensions",
    "evaluation_method": "6-Dimension Rating",
    "scoring_value": "0–5 Maturity per Dim",
    "primary_output": "HE-SCORES.md"
  },
  {
    "phase": "2 Priorities",
    "measurable": "Priority Ranking",
    "source_of_truth": "Composite × Impact",
    "evaluation_method": "Priority Formula",
    "scoring_value": "Tier 1 / 2 / 3",
    "primary_output": "HE-PRIORITIES.md"
  },
  {
    "phase": "3 Decisions",
    "measurable": "Remediation Level",
    "source_of_truth": "L4 Actions/Tools",
    "evaluation_method": "Type Classification",
    "scoring_value": "Light / Medium / Heavy",
    "primary_output": "HE-RECOMMENDATIONS"
  },
  {
    "phase": "5 Results",
    "measurable": "Efficiency Delta",
    "source_of_truth": "L5 Metrics",
    "evaluation_method": "Before/After Compare",
    "scoring_value": "% Improvement",
    "primary_output": "HE-VERIFICATION"
  },
  {
    "phase": "6 Feedback",
    "measurable": "Framework Rec",
    "source_of_truth": "HE-ASSESSMENT-REPORT",
    "evaluation_method": "Strategic Evaluation",
    "scoring_value": "Feature / Bug / Prop",
    "primary_output": "HE-FEEDBACK.md"
  }
]
```

> **Note:** The `Priority Score` is calculated as: `(5 - Composite) × Impact Weight × Cascade Length`. `Impact Weight` is derived from the feature's role in the 3 Pillars, and `Cascade Length` is the count of downstream dependencies in the DAG.

---

## Appendix D: Anti-Hallucination Safeguards

Each task in this procedure includes safeguards against agent hallucination:

```json
[
  { "safeguard": "Small task scope", "how_applied": "Each task touches ≤5 files and produces exactly 1 output artifact" },
  { "safeguard": "Explicit inputs", "how_applied": "Every task declares exactly what files it needs to read" },
  { "safeguard": "Concrete outputs", "how_applied": "Every task declares the exact filename and content structure it must produce" },
  { "safeguard": "Reference grounding", "how_applied": "Gap signals come from `framework/features/`, not invented" },
  { "safeguard": "Verification criteria", "how_applied": "Phase 5 (Results) independently verifies Phase 4 (Actions) outputs" },
  { "safeguard": "User checkpoints", "how_applied": "Phase 3 requires explicit user approval of the `HE-IMPLEMENTATION-PLAN` before any execution occurs" },
  { "safeguard": "Parallel decomposition", "how_applied": "Phase 1 (Principles) and Phase 2 (Enhancements) tasks can run independently, reducing per-agent load" },
  { "safeguard": "Deterministic Gates", "how_applied": "Mandatory `npm run smoke` and `check` on all framework-impacting metadata/metadata updates" },
  { "safeguard": "Pillar Traceability", "how_applied": "Every remediation recommendation (L4) must trace back to a specific feature gap (P0–P3)" },
  { "safeguard": "Token budgets", "how_applied": "Each task has an estimated token budget to prevent context exhaustion" }
]
```
