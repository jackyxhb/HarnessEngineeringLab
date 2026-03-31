# Full Audit Workflow

A step-by-step procedure for auditing an AI agent harness. Each phase is self-contained and produces specific artifacts.

## Phase 0: Pre-Flight

1. **Identify Project:** Scan the repository root. Identify project type, scale (SAS/MAS), and tech stack. Create `HE-SCOPE.md`.
2. **Quick Scan:** Run through the Quick-Start Evaluation (`references/quick-checklist.md`). Append results and current Harness Maturity Level to `HE-SCOPE.md`.

## Phase 1: Gap Analysis (Clue Collection)

Systematically inspect the project for harness gaps using automated tooling (e.g. `Glob`, `Grep`, `Read`).

1. Scan for Foundation gaps.
2. Scan for Pillar 1 (Context) gaps.
3. Scan for Pillar 2 (Constraints) gaps.
4. Scan for Pillar 3 (Entropy) gaps.

*For each area, record what exists, what's missing, and the severity (Critical/Important/Enhancement).*

**Output:** Merge all findings into a master report.
> **Use template:** `templates/he-clues.md`

**Trajectory Reduction Checkpoint:** After generating `he-clues.md`, instruct the agent (or yourself) to flush all raw file contents and terminal outputs from active memory. Carry forward ONLY the compiled template output.

## Phase 2: Gap Scoring (Evaluation)

Score the identified gaps using the multi-dimensional framework.

1. For each identified feature gap, score across the 6 dimensions (0-5) by referencing `references/gap-scoring.md`.
2. Calculate the Priority Score using the provided formula in the gap-scoring guide.
3. Tier the results: Tier 1 (Immediate), Tier 2 (Mid-term), Tier 3 (Long-term).

**Output:** `HE-PRIORITIES.md` with tier assignments.

**Trajectory Reduction Checkpoint:** Flush the raw reference files (`gap-scoring.md` and `dependencies.md`) from your active context window. Retain only the priority tier list.

## Phase 3: Recommendation & Planning

Translate prioritized gaps into a concrete implementation plan.

1. Map each gap to its remediation policy (`references/features-foundation.md` and `references/features-pillars.md`).
2. Classify by Remediation Level: Light (meta-docs), Medium (features), Heavy (architecture).
3. Group into execution batches ordered by dependencies, then tiers.

**Output:** `HE-IMPLEMENTATION-PLAN.md`
> **Use template:** `templates/implementation-plan.md`

**Trajectory Reduction Checkpoint:** Flush all remediation policy references. Retain only the finalized implementation plan.

**STOP:** Present the plan for user review.

## Phase 4: Execution

Apply the remediation batches sequentially.

- **Light:** Update `AGENTS.md`, `.cursorrules`, `.agents` workflows.
- **Medium:** Add pre-commit hooks, explicit structural linters, state tracking templates.
- **Heavy:** Perform structural project refactoring, build orchestration middleware, wire up explicit test pipelines.

**Output:** Modified codebase with per-agent modification summary.
> **Use template:** `templates/change-summary.md`

## Phase 5: Verification & Assessment

1. Re-run the Quick-Start checklist (`references/quick-checklist.md`). Compare ❌ → ✅ conversions.
2. Re-score modified features across the 6 dimensions to capture delta improvement.
3. Generate the final assessment comparing the initial state to the final milestone.

**Output:** `HE-ASSESSMENT-REPORT.md`
> **Use template:** `templates/assessment-report.md`

## Phase 6: Skill & Knowledge Sync (Optional)

If new features, prevention points, or patterns were discovered during the audit, propagate learnings back.

1. Update the harnessing-agents skill files (`.agent/skills/harnessing-agents/`) if new patterns warrant reference updates.
2. Follow the `/polish` workflow if adding new features to the canonical framework.
3. Propagate changes to `framework/` canonical documents and run `/revise-comments` to ensure `research/` consistency.

**Output:** Updated skill and/or framework files (if applicable).
