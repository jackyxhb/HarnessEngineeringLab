# HE Execution Procedure

A comprehensive, step-by-step procedure for executing Harness Engineering across all 23 core features. Each phase is designed as **a small, self-contained task** that fits reliably within a single agent context window — preventing hallucination, context rot, and premature exits.

> **Design Principle:** Every task produces a concrete, verifiable artifact. Tasks are sequenced so each one can be executed independently — an agent picking up Task 3.2 needs only the outputs of its predecessors, not the full conversation history of the entire procedure.

---

## Phase 0: Pre-Flight — Scope & Target Assessment

> **Goal:** Understand the target project and determine which parts of this procedure apply.

### Task 0.1: Identify Target Project & Scale

**Input:** Target project path or repository URL
**Actions:**
1. Read the project's top-level directory structure.
2. Identify the project type: pure text/docs, scripted operations, simple app, complex system, or enterprise platform.
3. Identify the agent scale: single agent (SAS), small team (2–5 agents), or enterprise/swarm (MAS).
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
1. Run through the **Quick-Start Evaluation Checklist** (from `HE Gap Evaluation Framework.md` Part 5).
2. For each checkbox, mark it as ✅ (present) or ❌ (absent) with a one-line justification.
3. Identify the project's current **Maturity Level** (Basic / Team / Production) based on the `Harness Landing Pathway`.

**Output:** Append to `HE-SCOPE.md`:
- Quick-Start checklist results (17 items)
- Current maturity level
- Target maturity level (user to confirm)

**Context needed:** `HE-SCOPE.md` + project filesystem + `HE Gap Evaluation Framework.md` Part 5, `Harness Landing Pathway`.
**Estimated tokens:** ~3,000

---

## Phase 1: Gap Analysis — Clue Collection

> **Goal:** Systematically inspect the target project for harness gaps across all 4 function areas. Each sub-task covers one function area.

### Task 1.1: Foundation Gaps — Infrastructure & Execution

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**
1. Check for **Bash Sandboxes** (F1): Is there Docker/container config? Does the agent run locally?
2. Check for **Filesystem & Git** (F2): Is Git initialized? Are there branching strategies? File locking?
3. Check for **Self-Verification** (F3): Is there a test suite? Can tests be run from CI? Are error logs piped back?
4. Check for **Ralph Loops** (F4): Any exit interception hooks? State persistence across context windows?
5. Check for **Orchestration Logic** (F5): Subagent spawning? Task routing? Multi-agent topologies?
6. Check for **Rippable Middleware** (F6): Is the harness modular? Feature flags?
7. Check for **Escalation Policies** (F7): Audit trails? Stuck-agent detection? Human notification?
8. Check for **Harness Versioning** (F8): Is the harness config version-controlled? A/B testing?

**Output:** `HE-CLUES-Foundation.md` with per-feature findings:
- Current state (what exists)
- Gap signals observed
- Severity: Critical / Important / Enhancement

**Context needed:** `HE-SCOPE.md` + project filesystem + `Core Features for SAS.md` Foundation section.
**Estimated tokens:** ~4,000

---

### Task 1.2: Pillar 1 Gaps — Context Engineering

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**
1. Check for **Repository as Truth** (P1-1): Does `CLAUDE.md` / `AGENTS.md` / `.cursorrules` exist? Are architectural decisions documented in-repo?
2. Check for **Context Compaction** (P1-2): Any summarization of conversation history? Token budgets?
3. Check for **Tool Offloading** (P1-3): Are tool outputs stripped? Full results stored to disk?
4. Check for **Progressive Skills** (P1-4): Are tools loaded on-demand or all at startup?
5. Check for **Observability / Dashboards** (P1-5): Can the agent see CI/CD status? Logs? Metrics?
6. Check for **Web Search & MCP** (P1-6): External data access? MCP servers configured?
7. Check for **Planning & State Files** (P1-7): Plan files? Task decomposition? Shared blackboards?
8. Check for **Context Anchoring** (P1-8): Persistent decision records (what, why, target, background)? Recall hooks at session start?

**Output:** `HE-CLUES-P1-Context.md` with per-feature findings (same format as Task 1.1).

**Context needed:** `HE-SCOPE.md` + project filesystem + `Core Features for SAS.md` Pillar 1 section.
**Estimated tokens:** ~3,500

---

### Task 1.3: Pillar 2 Gaps — Architectural Constraints

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**
1. Check for **Automated Linters** (P2-1): Pre-commit hooks? Linting config? Formatting enforcement?
2. Check for **Dependency Enforcement** (P2-2): Structural tests? Import restrictions? ArchUnit or equivalent?
3. Check for **AI Auditors / Diverse Collaboration** (P2-3): Secondary LLM review? Debate channels?
4. (MAS only) Check for **Bounded Autonomy & Access Control** (P2-4): Guardrails? Permission systems?

**Output:** `HE-CLUES-P2-Constraints.md` with per-feature findings.

**Context needed:** `HE-SCOPE.md` + project filesystem + `Core Features for SAS.md` Pillar 2 section.
**Estimated tokens:** ~2,500

---

### Task 1.4: Pillar 3 Gaps — Entropy Management

**Input:** `HE-SCOPE.md`, target project filesystem
**Actions:**
1. Check for **Scheduled Cleanups** (P3-1): Automated sweeps? Dead code detection? Conflict resolution?
2. Check for **Documentation Sync** (P3-2): Docs validated against code? Staleness detection?
3. Check for **Pattern Auditing** (P3-3): Circular dependency detection? Pattern registry?
4. Check for **Consolidation Loop** (P3-4): Auto-updated counts? Changelogs? ADR prompts?

**Output:** `HE-CLUES-P3-Entropy.md` with per-feature findings.

**Context needed:** `HE-SCOPE.md` + project filesystem + `Core Features for SAS.md` Pillar 3 section.
**Estimated tokens:** ~2,500

---

### Task 1.5: Consolidate Clues into Master Report

**Input:** `HE-CLUES-Foundation.md`, `HE-CLUES-P1-Context.md`, `HE-CLUES-P2-Constraints.md`, `HE-CLUES-P3-Entropy.md`
**Actions:**
1. Merge all 4 clue files into a single `HE-CLUES.md`.
2. Sort all found gaps by severity (Critical → Important → Enhancement).
3. Cross-reference gaps against the **Prevention Checklist** (`HE Prevention Checklist.md`) — note any prevention failures.
4. Summarize: total gaps found, gaps per function area, distribution by severity.

**Output:** `HE-CLUES.md` — the master gap report.

**Context needed:** The 4 clue files + `HE Prevention Checklist.md` (37 lines).
**Estimated tokens:** ~3,000

---

## Phase 2: Gap Scoring — Multi-Dimensional Evaluation

> **Goal:** Score each identified gap using the 6-dimension evaluation framework. This is split into sub-tasks by function area to stay within context limits.

### Task 2.1: Score Foundation Features (F1–F8)

**Input:** `HE-CLUES.md` (Foundation section only), `HE Gap Evaluation Framework.md` Part 2 (Foundation section)
**Actions:**
1. For each Foundation feature (F1–F8), score across all 6 dimensions (0–5):
   - Implementation Maturity
   - Operational Effectiveness
   - Risk Exposure
   - Cost-Efficiency
   - Scalability (SAS→MAS)
   - Human Role Evolution
2. Note gap signals that match the framework's documented signals.
3. Calculate composite score per feature.

**Output:** `HE-SCORES-Foundation.md` — an 8×6 scoring matrix with justifications.

**Context needed:** `HE-CLUES.md` Foundation section + `HE Gap Evaluation Framework.md` F1–F8 sections (~200 lines).
**Estimated tokens:** ~4,000

---

### Task 2.2: Score Pillar 1 Features (P1-1 to P1-8)

**Input:** `HE-CLUES.md` (P1 section), `HE Gap Evaluation Framework.md` Part 2 (P1 section)
**Actions:** Same as Task 2.1 but for Pillar 1 features.
**Output:** `HE-SCORES-P1.md` — a 7×6 scoring matrix.

**Context needed:** `HE-CLUES.md` P1 section + `HE Gap Evaluation Framework.md` P1-1 to P1-8 (~160 lines).
**Estimated tokens:** ~3,500

---

### Task 2.3: Score Pillar 2 Features (P2-1 to P2-3/P2-4)

**Input:** `HE-CLUES.md` (P2 section), `HE Gap Evaluation Framework.md` Part 2 (P2 section)
**Actions:** Same as Task 2.1 but for Pillar 2 features.
**Output:** `HE-SCORES-P2.md` — a 3–4×6 scoring matrix.

**Context needed:** `HE-CLUES.md` P2 section + `HE Gap Evaluation Framework.md` P2-1 to P2-3 (~60 lines).
**Estimated tokens:** ~2,500

---

### Task 2.4: Score Pillar 3 Features (P3-1 to P3-4)

**Input:** `HE-CLUES.md` (P3 section), `HE Gap Evaluation Framework.md` Part 2 (P3 section)
**Actions:** Same as Task 2.1 but for Pillar 3 features.
**Output:** `HE-SCORES-P3.md` — a 4×6 scoring matrix.

**Context needed:** `HE-CLUES.md` P3 section + `HE Gap Evaluation Framework.md` P3-1 to P3-4 (~80 lines).
**Estimated tokens:** ~2,500

---

### Task 2.5: Cross-Cutting Analysis & Prioritisation

**Input:** `HE-SCORES-Foundation.md`, `HE-SCORES-P1.md`, `HE-SCORES-P2.md`, `HE-SCORES-P3.md`, `HE Gap Evaluation Framework.md` Parts 3–4
**Actions:**
1. Apply **Perspective A: Feedback Loop Chain** — identify broken links.
2. Apply **Perspective B: Token Economics** — map token savers vs. spenders.
3. Apply **Perspective C: Failure Cascade Map** — trace cascade chains for low-scored features.
4. (If MAS) Apply **Perspective D: SAS→MAS Readiness** — identify blockers.
5. Apply **Perspective E: Human Role Progression** — determine current stage.
6. Calculate **Priority Score** per feature: `(5 - Composite) × Impact Weight × Cascade Length`.
7. Tier the results: Tier 1 (Critical), Tier 2 (Important), Tier 3 (Enhancement).

**Output:** `HE-PRIORITIES.md` — prioritised gap list with tier assignments and cross-cutting analysis summary.

**Context needed:** 4 score files + `HE Gap Evaluation Framework.md` Parts 3–4 (~120 lines).
**Estimated tokens:** ~4,000

---

## Phase 3: Recommendation & Planning

> **Goal:** Translate prioritised gaps into a concrete implementation plan with user-confirmed selections.

### Task 3.1: Generate Recommendations

**Input:** `HE-PRIORITIES.md`, `HE Enhancement Options.md`
**Actions:**
1. For each Tier 1 gap, look up the corresponding feature's **Actions** and **Tools** in `HE Enhancement Options.md`.
2. For each Tier 2 gap, do the same.
3. For Tier 3 gaps, list but mark as "defer."
4. Classify each recommendation by **remediation level**:
   - **Light** — Revise/create meta docs (CLAUDE.md, AGENTS.md, .cursorrules)
   - **Medium** — Add new features (pre-commit hooks, test suites, scripts)
   - **Heavy** — Reform project architecture (ci/cd pipelines, orchestration layer, middleware)

**Output:** `HE-RECOMMENDATIONS.md` — a structured list of recommended changes per feature, actions/tools needed, and remediation level.

**Context needed:** `HE-PRIORITIES.md` + `HE Enhancement Options.md` (142 lines).
**Estimated tokens:** ~4,000

---

### Task 3.2: Build Implementation Plan (User Review Required)

**Input:** `HE-RECOMMENDATIONS.md`, `HE-SCOPE.md`
**Actions:**
1. Group recommendations into **implementation batches** ordered by:
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

## Phase 4: Execution — Implementing Harness Changes

> **Goal:** Execute the implementation plan. Each task below is a **template** — instantiate one per batch from the plan. Each task should modify at most 3–5 files to stay within context limits.

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

## Phase 5: Verification & Assessment

> **Goal:** Verify all changes are effective and produce a final assessment report.

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
1. Summarise what was done:
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

## Phase 6: Skill & Knowledge Sync (Optional)

> **Goal:** Propagate learnings back to the harnessing-agents skill and project documentation.

### Task 6.1: Update Harnessing-Agents Skill

**Input:** `HE-ASSESSMENT-REPORT.md`, any new patterns discovered
**Actions:**
1. If new features or prevention points were discovered during execution, update:
   - `~/.gemini/antigravity/skills/harnessing-agents/SKILL.md`
2. Follow the `/he-newfeature` workflow if adding new features.

**Output:** Updated skill files (if applicable).

---

### Task 6.2: Sync HarnessEngineeringLab Docs

**Input:** Any updates from Task 6.1
**Actions:**
1. Propagate changes to `HESkill/` canonical documents.
2. Run `/revise-comments` workflow to ensure `comments/` consistency.

**Output:** Updated HarnessEngineeringLab repository.

---

## Appendix A: Task Dependency Graph

```
Phase 0 ─── 0.1 → 0.2
                    │
Phase 1 ─── 1.1 ─┐
            1.2 ─┤
            1.3 ─┤
            1.4 ─┘→ 1.5
                      │
Phase 2 ─── 2.1 ─┐
            2.2 ─┤
            2.3 ─┤
            2.4 ─┘→ 2.5
                      │
Phase 3 ─── 3.1 → 3.2 (USER REVIEW)
                      │
Phase 4 ─── 4.L ─┐
            4.M ─┤  (parallel batches within each level,
            4.H ─┘   sequential across levels)
                      │
Phase 5 ─── 5.1 ─┐
            5.2 ─┘→ 5.3
                      │
Phase 6 ─── 6.1 → 6.2
```

**Key:** Tasks at the same indent level within a phase (e.g., 1.1–1.4, 2.1–2.4) can be executed **in parallel** by separate agents. Tasks connected by `→` must be **sequential**.

---

## Appendix B: Context Window Budget per Task

All tasks are designed to stay well within a 128K-token context window. Maximum context consumption per task:

| Task | Max Source Files | Max Lines Read | Est. Tokens |
|------|-----------------|----------------|-------------|
| 0.1  | 1 project       | ~200           | ~2,000      |
| 0.2  | 2 reference docs| ~100           | ~3,000      |
| 1.x  | 1 reference doc + project | ~150 | ~4,000     |
| 1.5  | 4 clue files    | ~200           | ~3,000      |
| 2.x  | 1 score input + ref doc | ~200   | ~4,000      |
| 2.5  | 4 score files + ref | ~300       | ~4,000      |
| 3.x  | 2 input files   | ~200           | ~4,000      |
| 4.x  | 3–5 target files| ~150           | ~3,000      |
| 5.x  | 2–4 summary files| ~200          | ~3,000      |

---

## Appendix C: Methodology Dimensions

This procedure supports all 4 dimensions of Harness Engineering methodology:

1. **Feature Tree:** Tasks 1.1–1.5 systematically walk the full 4 areas → 22 features → Actions/Tools tree.
2. **Agent Scale:** Task 0.1 classifies the scale. MAS-specific checks are flagged in Phase 1 tasks. Phase 2 uses the SAS→MAS readiness perspective.
3. **Project Complexity:** Task 0.1 classifies complexity. Phase 4 remediation levels (Light/Medium/Heavy) adapt to project complexity.
4. **Remediation Level:** Phase 3 explicitly classifies each change and Phase 4 templates are organized by remediation weight.

---

## Appendix D: Anti-Hallucination Safeguards

Each task in this procedure includes safeguards against agent hallucination:

| Safeguard | How It's Applied |
|-----------|-----------------|
| **Small task scope** | Each task touches ≤5 files and produces exactly 1 output artifact |
| **Explicit inputs** | Every task declares exactly what files it needs to read |
| **Concrete outputs** | Every task declares the exact filename and content structure it must produce |
| **Reference grounding** | Gap signals come from `HE Gap Evaluation Framework.md`, not invented |
| **Verification criteria** | Phase 5 independently verifies Phase 4 outputs |
| **User checkpoints** | Phase 3 requires explicit user confirmation before execution |
| **Parallel decomposition** | Phase 1 and Phase 2 tasks can run independently, reducing per-agent load |
| **Token budgets** | Each task has an estimated token budget to prevent context exhaustion |
