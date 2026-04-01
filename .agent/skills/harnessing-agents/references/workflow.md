# Full Audit Workflow

A step-by-step procedure for auditing an AI agent harness. Each phase is self-contained and produces specific artifacts. The audit uses the **3-Step Assessment Chain** (What to Do → Don't Do → Options) defined per-feature in `references/features-foundation.md`, `references/features-pillar1.md`, and `references/features-pillar2-3.md`.

## Phase 0: Pre-Flight

1. **Identify Project:** Scan the repository root. Identify project type, scale (SAS/MAS), and tech stack. Create `HE-SCOPE.md`.
2. **Quick Scan:** Run through the Quick-Start Evaluation (`references/quick-checklist.md`). Append results and current Harness Maturity Level to `HE-SCOPE.md`.

## Phase 1: Gap Analysis (3-Step Chain Assessment)

Systematically inspect the project for harness gaps using the 3-step chain per feature.

For each feature (P0-1 through P3-4):
1. **What to Do** — Does the project implement this feature as defined?
2. **Don't Do** — Is the prevention failure currently active in the project?
3. **Options** — Which actions and tools should be recommended?

Scan order:
1. Foundation gaps (P0-1 to P0-9, P0-MAS) — read `references/features-foundation.md`
2. Pillar 1 (Context) gaps (P1-1 to P1-10) — read `references/features-pillar1.md`
3. Pillar 2 (Constraints) gaps (P2-1 to P2-5) — read `references/features-pillar2-3.md`
4. Pillar 3 (Entropy) gaps (P3-1 to P3-4) — read `references/features-pillar2-3.md`

*For each feature, record: current state, active prevention failures, recommended options, severity, and remediation level.*

**Output:** Merge all findings into a master report.
> **Use template:** `templates/he-clues.md`

**Trajectory Reduction Checkpoint:** After generating `he-clues.md`, flush all raw file contents and terminal outputs from active memory. Carry forward ONLY the compiled template output.

## Phase 2: Gap Scoring (Evaluation)

Score the identified gaps using the multi-dimensional framework.

1. For each identified feature gap, score across the 6 dimensions (0-5) by referencing `references/gap-scoring.md`.
2. **Prioritize active prevention failures** — features where the "Don't Do" anti-pattern is present get a scoring boost.
3. Calculate the Priority Score using the formula: `(5 - Composite Score) × Impact Weight × Cascade Length`.
4. Tier the results: Tier 1 (Immediate), Tier 2 (Mid-term), Tier 3 (Long-term).

**Output:** `HE-PRIORITIES.md` with tier assignments.

**Trajectory Reduction Checkpoint:** Flush raw reference files (`gap-scoring.md` and `dependencies.md`). Retain only the priority tier list.

## Phase 3: Recommendation & Planning

Translate prioritized gaps into a concrete implementation plan using the "Options" from each feature's 3-step chain.

1. Map each gap to its **Options** (specific actions and tools) from `references/features-foundation.md`, `references/features-pillar1.md`, and `references/features-pillar2-3.md`.
2. Map each gap to its **Remediation Tier** from the same files.
3. Classify by Remediation Level: Light (meta-docs), Medium (features), Heavy (architecture).
4. Group into execution batches ordered by dependencies, then tiers.

**Output:** `HE-IMPLEMENTATION-PLAN.md`
> **Use template:** `templates/implementation-plan.md`

**Trajectory Reduction Checkpoint:** Flush all remediation policy references. Retain only the finalized implementation plan.

**STOP:** Present the plan for user review.

## Phase 4: Execution

Apply the remediation batches sequentially. Each action item should come directly from the "Options" section of the relevant feature.

- **Light:** Update `AGENTS.md`, `.cursorrules`, `.agents` workflows.
- **Medium:** Add pre-commit hooks, explicit structural linters, state tracking templates.
- **Heavy:** Perform structural project refactoring, build orchestration middleware, wire up explicit test pipelines.

**Output:** Modified codebase with per-agent modification summary.
> **Use template:** `templates/change-summary.md`

## Phase 5: Verification & Assessment

1. Re-run the Quick-Start checklist (`references/quick-checklist.md`). Compare unchecked → checked conversions.
2. Re-check each feature's "Don't Do" — verify that previously active prevention failures are now resolved.
3. Re-score modified features across the 6 dimensions to capture delta improvement.
4. Generate the final assessment comparing the initial state to the final milestone.

**Output:** `HE-ASSESSMENT-REPORT.md`
> **Use template:** `templates/assessment-report.md`

## Phase 6: Skill & Knowledge Sync (Optional)

If new features, prevention points, or patterns were discovered during the audit, propagate learnings back.

1. Update the harnessing-agents skill files (`.agent/skills/harnessing-agents/`) if new patterns warrant reference updates.
2. Follow the `/polish` workflow if adding new features to the canonical framework.
3. Propagate changes to `framework/` canonical documents and run `/revise-comments` to ensure `research/` consistency.

**Output:** Updated skill and/or framework files (if applicable).
