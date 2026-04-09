# Full Audit Workflow

A step-by-step procedure for auditing an AI agent harness. Each phase is self-contained and produces specific artifacts. Phases follow the Principle-to-Practice Chain (L1→L5→L1↩) per `framework/HE Harnessing Protocol.md`.

> **Output Directory:** All `HE-` output files MUST be written to `./.harness/` in the target project root. Create the directory if it does not exist. Never write HE- files to the project root. In HELab self-host mode, HELab itself is the target project, so these files still belong under the local `.harness/` directory.

The audit uses the **L1→L5 Principle-to-Practice Chain** defined per-feature in `framework/features/`.

> **Canonical path rule:** Resolve every feature file through the `file` field in `framework/HE Index.md`. Do not infer paths like `framework/features/P2-3.md`; the canonical file for `P2-3` is `framework/features/P2-03.md`. When requirement traceability is requested, use the root `REQUIREMENTS.md` ledger.

## Phase 0: Pre-Flight (Pre-chain: Scope)

> **Chain Position:** Pre-chain — establishes scope before principle analysis begins.

1. **Identify Project:** Scan the repository root. Identify project type, scale (SAS/MAS), and tech stack. Create `.harness/HE-SCOPE.md`.
2. **Quick Scan:** Walk `framework/HE Index.md` and check each of the 32 features' L2 targeted enhancement for presence in the target project. Append results and current Harness Maturity Level to `.harness/HE-SCOPE.md`.
3. **Classify injection context when live mutation is likely:** If the audit is expected to progress into repo edits, use `references/he-harness-injection-protocol-draft.md` to classify the target repo's planning, live operational, contract, verification, and volatile touch-points before Phase 3 or Phase 4 begins.

## Phase 1: Gap Analysis — 3-Step Chain Assessment (L1: Principles)

> **Chain Position:** L1 — discovers which engineering principles (EP-1 through EP-19) are unmet. See `framework/HE Index.md` for the canonical feature metadata.

Systematically inspect the project for harness gaps using the per-feature files in `framework/features/`.

For each feature (P0-1 through P3-4, 32 total), navigate via `framework/HE Index.md`:
1. **L3: Design Decisions** — Does the project implement this feature as defined?
2. **L4: Prevention** — Is the prevention failure currently active in the project?
3. **L4: Actions & Tools** — Which actions and tools should be recommended?
4. **L5: Gap Signals** — What measurable signs indicate failure?

Scan order:
Search `framework/HE Index.md` for features, then read the respective `framework/features/P*.md` files.

*For each feature, record: current state, active prevention failures, recommended options, severity, and remediation level.*

**Output:** Merge all findings into a master report.
> **Use template:** `templates/HE-CLUES.md` → **Output to:** `.harness/HE-CLUES.md`

**Trajectory Reduction Checkpoint:** After generating `.harness/HE-CLUES.md`, flush all raw file contents and terminal outputs from active memory. Carry forward ONLY the compiled template output.

## Phase 2: Gap Scoring — Evaluation (L2: Targeted Enhancements)

> **Chain Position:** L2 — quantifies the gap between current state and desired enhancement using chain-level-mapped dimensions.

Score the identified gaps using the multi-dimensional framework.

1. For each identified feature gap, score across the 6 dimensions (0-5) by referencing `references/he-scoring.md`.
2. **Prioritize active prevention failures** — features where the "Don't Do" anti-pattern is present get a scoring boost.
3. Calculate the Priority Score using the formula: `(5 - Composite Score) × Impact Weight × Cascade Length`.
4. Tier the results: Tier 1 (Immediate), Tier 2 (Mid-term), Tier 3 (Long-term).

**Output:** `.harness/HE-PRIORITIES.md` with tier assignments.

**Trajectory Reduction Checkpoint:** Flush raw reference files (`he-scoring.md`). Retain only the priority tier list.

## Phase 3: Recommendation & Planning (L3: Design Decisions)

> **Chain Position:** L3 — selects design patterns and strategies to close prioritized gaps.

Translate prioritized gaps into a concrete implementation plan using the "Options" from each feature's 3-step chain.

1. Map each gap to its **L4: Concrete Actions & Tools** from its respective `framework/features/P*.md` file.
2. If a feature-specific implementation guide exists under `references/`, treat that guide as the canonical execution layer for Phase 3 and Phase 4 instead of inventing target-project steps from the abstract feature text.
3. Map each gap to its **L5: Improvement Policies** tier from the same file.
4. Classify by Remediation Level: Light (meta-docs), Medium (features), Heavy (architecture).
5. Group into execution batches ordered by dependencies, then tiers.
6. When more than one plausible touch-point exists for a slot, prefer the one allowed by the harness-injection draft's lifecycle and safety rules rather than the most convenient file path.
7. When the harness-injection draft classifies the target under the **first-mount governance** Repo Profile, use `references/he-first-mount-governance-mount-pattern.md` to build the initial Feature Package batch instead of composing separate application-style remediations from scratch.

### Target Repositories With Active Delivery Plans

If the target project already has a live execution-plan surface (for example `.agent/task_plan.md`, an active deployment plan, or another branch-local delivery tracker), do not overwrite that plan during the audit itself.

Use this sequence instead:

1. Write the audit outputs under `.harness/` as usual.
2. Keep the target project's live plan surface intact while the audit is still in inspection/planning mode.
3. Retarget the target project's active plan surface only after the user approves a specific remediation batch from `.harness/HE-IMPLEMENTATION-PLAN.md`.

This preserves target-project delivery safety while still allowing the approved batch to become mechanically tracked once execution begins.

**Output:** `.harness/HE-IMPLEMENTATION-PLAN.md`
> **Use template:** `templates/HE-IMPLEMENTATION-PLAN.md` → **Output to:** `.harness/HE-IMPLEMENTATION-PLAN.md`

**Trajectory Reduction Checkpoint:** Flush all remediation policy references. Retain only the finalized implementation plan.

**STOP:** Present the plan for user review.

## Phase 4: Execution (L4: Concrete Actions)

> **Chain Position:** L4 — executes concrete actions, configs, and scripts from the implementation plan.

Apply the remediation batches sequentially. Each action item should come directly from the "L4: Concrete Actions & Tools" section of the relevant feature.

When a feature-specific implementation guide exists in `references/`, use that guide to determine the concrete files, commands, templates, and verification steps for the target project. Do not improvise those steps from the abstract feature file if the guide already exists.

When choosing between staging surfaces and live operational surfaces, apply `references/he-harness-injection-protocol-draft.md` so the skill mutates the target repo through an approved lifecycle instead of treating all touch-points as equally writable.

- **Light:** Update `AGENTS.md`, `.cursorrules`, `.agents` workflows.
- **Medium:** Add pre-commit hooks, explicit structural linters, state tracking templates.
- **Heavy:** Perform structural project refactoring, build orchestration middleware, wire up explicit test pipelines.

### P2-3 Target-Project Mount Pattern

When the implementation plan includes **P2-3 AI Auditors & Collaboration Channels**, do not stop at an abstract recommendation. Mount a concrete target-project review pattern using `references/he-p2-3-review-mount-pattern.md`:

1. Create a root `REVIEWS.md` from `templates/HE-REVIEWS.md` when the target project lacks a machine-readable review ledger.
2. Update the target project's `AGENTS.md` (or equivalent canonical agent contract) with generator/evaluator separation, review-required surfaces, and escalation behavior.
3. Add the narrowest repo-native gate that can fail review-required changes without an approving review record. Reuse an existing validation surface when possible; otherwise add the smallest maintainable hook or CI check that matches the target stack.
4. Record the mounted files and verification results in `.harness/HE-CHANGE-SUMMARY.md`.

### Additional Feature Guides

- For **P0-1 Bash Sandboxes**, use `references/he-p0-1-bash-sandbox-mount-pattern.md` when the target project lacks isolated, reproducible command execution for agent work.
- For **P0-3 Verification**, use `references/he-p0-3-verification-mount-pattern.md` when the target project lacks deterministic verification gates, pre-completion checks, or repo-native failure signals.
- For **P1-7 Planning, Task Lists & Blackboards**, use `references/he-p1-7-planning-mount-pattern.md` when multi-step work lacks a durable plan file, shared task surface, or resumable task state.
- For **P1-10 Requirements Ledger**, use `references/he-p1-10-requirements-ledger-mount-pattern.md` when the target project plans or executes work without a machine-readable requirements ledger and pre-planning intake hook.
- For **P2-5 Upstream Intake Gate**, use `references/he-p2-5-intake-gate-mount-pattern.md` when requirements may be recorded but planning/execution can still bypass intake validation.
- For the **first-mount governance** Repo Profile, use `references/he-first-mount-governance-mount-pattern.md` when the target is documentation-heavy, lacks a portable governance layer, and needs a narrow initial Feature Package centered on governance plus lightweight document-integrity verification.

**Output:** Modified codebase with per-agent modification summary.
> **Use template:** `templates/HE-CHANGE-SUMMARY.md` → **Output to:** `.harness/HE-CHANGE-SUMMARY.md`

## Phase 5: Verification & Assessment (L5: Measurable Outcomes)

> **Chain Position:** L5 — measures observable results to verify all changes produce concrete enhancement.

1. Re-run the Quick Scan checklist (evaluating L2 targets from `framework/HE Index.md`). Compare unchecked → checked conversions.
2. Re-check each feature's L4: Prevention — verify that previously active prevention failures are now resolved.
3. Re-score modified features across the 6 dimensions to capture delta improvement.
4. Generate the final assessment comparing the initial state to the final milestone.

**Output:** `.harness/HE-ASSESSMENT-REPORT.md`
> **Use template:** `templates/HE-ASSESSMENT-REPORT.md` → **Output to:** `.harness/HE-ASSESSMENT-REPORT.md`

## Phase 6: Skill & Knowledge Sync — Optional (L1 ↩: Principle Feedback)

> **Chain Position:** L1 ↩ — feeds proven patterns back into engineering principles and skill documentation.

If new features, prevention points, or patterns were discovered during the audit, propagate learnings back.

1. Update the harnessing-agents skill files (`.agent/skills/harnessing-agents/`) if new patterns warrant reference updates.
2. Follow the `/polish` workflow if adding new features to the canonical framework.
3. Propagate changes to `framework/` canonical documents and run `/revise-comments` only if the user explicitly wants support material under `docs/` reconciled.
4. When a real target-project run proves a better audit or remediation sequence than the current skill guidance, fold that result back into the skill references and release notes instead of leaving the learning trapped in target-repo branches.

**Output:** Updated skill and/or framework files (if applicable).
