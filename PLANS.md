# PLANS.md

Active task planning file. Implements **Practice 5: Optimize For Agent Flow** — front-loads durable context (scope, constraints, checkpoints) so agent restarts stay cheap.

**Agents:** Read the active plan before starting any multi-step task. Append a new plan entry for any task requiring more than 3 sequential steps. Archive completed plans by moving them to the `## Completed Plans` section.

---

## Plan Format

```markdown
### Plan: <Title>

- **Goal:** What success looks like.
- **Requirement IDs:** IDs from `REQUIREMENTS.md` that authorize the work.
- **Scope:** Files/directories in play. What is explicitly OUT of scope.
- **Status:** `in-progress` | `blocked` | `awaiting-review` | `done`
- **Steps:**
  - [ ] Step description
- **Constraints:** Hard rules that must not be violated.
- **Checkpoints:** Commit-worthy states to lock progress at.
- **Blocking Issues:** Any blockers and their resolution path.
```

---

## Active Plans

### Plan: Feature Lookup Output Enforcement

- **Goal:** Make Mode 3 feature lookups produce a deterministic output shape that includes current-state checks and explicit next valid actions, so agents do not stop after only printing the L1→L5 chain.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: changing the P2-3 framework definition itself or adding a repository code gate.
- **Status:** `done`
- **Steps:**
  - [x] Replace the soft Mode 3 guidance with a required output structure that includes state check and next actions
  - [x] Update public docs so the expected feature-lookup behavior is explicit
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep Mode 3 lightweight, and avoid claiming mechanical enforcement that does not yet exist.
- **Checkpoints:** Required Mode 3 sections added; docs updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

---

## Completed Plans

### Plan: Feature Lookup State Awareness

- **Goal:** Make Mode 3 feature lookup suggestions state-aware so the skill does not propose duplicate HELab work, invent new requirement IDs unnecessarily, or guess a target project name that the user did not specify.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: changing the canonical framework definitions for P2-3 itself.
- **Status:** `done`
- **Steps:**
  - [x] Add a Mode 3 output contract that requires current-state checks before suggesting next actions
  - [x] Prevent guessed target-project names and duplicate HELab implementation suggestions when the feature is already mounted locally
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep feature lookup lightweight, and rely only on canonical state surfaces already present in the repo.
- **Checkpoints:** State-aware follow-up rules added; stale-option guardrails added; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Feature Lookup Path Hardening

- **Goal:** Prevent `harnessing-agents` feature lookups from guessing non-canonical paths like `framework/features/P2-3.md` or `docs/REQUIREMENTS.md` when the real sources are `framework/HE Index.md`, zero-padded feature files, and the root `REQUIREMENTS.md` ledger.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, relevant skill references, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: changes to support material under `docs/`.
- **Status:** `done`
- **Steps:**
  - [x] Update feature-mode instructions so agents resolve the feature path from `framework/HE Index.md` instead of inferring filenames
  - [x] Explicitly bind requirement traceability requests to the root `REQUIREMENTS.md` ledger
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep the instructions portable across IDEs, and avoid adding redundant navigation rules outside the canonical skill surfaces.
- **Checkpoints:** Feature lookup path rule updated; requirements-ledger rule updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Target-Project P2-3 Delivery

- **Goal:** Make the live-linked `harnessing-agents` skill capable of planning and mounting a reusable P2-3 independent-review pattern in target projects rather than only describing the feature abstractly.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/`, `framework/HE Harnessing Protocol.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` as needed for review. Out of scope: building a repo-specific validator for every possible target-project stack.
- **Status:** `done`
- **Steps:**
  - [x] Design the reusable target-project P2-3 mount pattern and encode it in the skill references/templates
  - [x] Update the skill and protocol so full audits can recommend and execute the target-project review gate concretely
  - [x] Run independent review, validate the repository, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep audit artifacts under `.harness/`, and distinguish reusable target-project assets from HELab-only self-hosted enforcement.
- **Checkpoints:** P2-3 mount reference exists; target-project review ledger template exists; skill/protocol wording explains how to apply the pattern; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Target-Project Delivery Primacy

- **Goal:** Codify that HELab's primary mission is to make the live-linked `harnessing-agents` skill capable of effectively applying the full Harness Engineering framework to target projects.
- **Requirement IDs:** `HE-R008`
- **Scope:** `AGENTS.md`, `ANCHORS.md`, `REQUIREMENTS.md`, `README.md`, `.agent/skills/harnessing-agents/SKILL.md`, and `RELEASES.md`. Out of scope: implementing any new target-project feature mounts in this step.
- **Status:** `done`
- **Steps:**
  - [x] Add a canonical requirement that target-project application effectiveness is the primary success criterion
  - [x] Add a strategic anchor and repository-purpose wording that self-hosting is validation, not the end state
  - [x] Update the live-linked skill overview so target-project delivery remains explicit during skill execution
  - [x] Re-run validation and archive the plan
- **Constraints:** Preserve the existing live-linked contract, avoid weakening the self-hosted proof role, and keep the new wording portable across IDEs and sessions.
- **Checkpoints:** Requirement added; anchor added; repo and skill wording aligned; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: P2-3 Independent Review Gate

- **Goal:** Mechanize P2-3 in the self-hosted harness by requiring a machine-readable independent review record for changes to core harness surfaces.
- **Requirement IDs:** `HE-R003`, `HE-R007`
- **Scope:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `PLANS.md`, `REVIEWS.md`, `scripts/he-lint.js`, `scripts/harness/audit.sh`. Out of scope: new CI workflows, release automation changes, and support material under `docs/`.
- **Status:** `done`
- **Steps:**
  - [x] Add a canonical root review ledger and document the review-required surfaces
  - [x] Extend `he-lint` and `audit.sh` so review-required changes fail without a valid independent review record
  - [x] Run an independent review pass for this change, record it in `REVIEWS.md`, and re-run validation
- **Constraints:** Preserve the live-linked skill contract, keep the review artifact machine-readable, and do not fake a separate release boundary or human-only process.
- **Checkpoints:** Review ledger exists; P2-3 gate fails closed; current change has a recorded independent review; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Release Baseline Migration

- **Goal:** Migrate the temporary `1.0.0` root-version state onto the existing published tag line by releasing the current live-linked HELab changes as `v3.3.2`.
- **Requirement IDs:** `HE-R005`, `HE-R006`
- **Scope:** `package.json`, `.agent/skills/harnessing-agents/SKILL.md`, `RELEASES.md`, `PLANS.md`, git tag state, and the GitHub release record.
- **Status:** `done`
- **Steps:**
  - [x] Move the root and mirrored skill version from `1.0.0` to `3.3.2`
  - [x] Rewrite `RELEASES.md` so the pending changes land under a real `3.3.2` release entry instead of an unreleased `1.0.0` placeholder
  - [x] Re-run validation and commit the release-baseline migration
  - [x] Create tag `v3.3.2` and publish the GitHub release
- **Constraints:** Preserve the live-linked version-sync rule, avoid creating a backward-facing release tag, and make the published release history match the existing `v3.3.1` lineage.
- **Checkpoints:** Root version advanced; release notes aligned; validation green; tag and GitHub release created.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Release Semantics Hardening

- **Goal:** Make the live-linked HELab release model operational by adding a release-notes surface, aligning `/ccpr` with the root version contract, and enforcing downstream-impact updates through the harness.
- **Requirement IDs:** `HE-R002`, `HE-R004`, `HE-R005`, `HE-R006`
- **Scope:** `.agent/workflows/ccpr.md`, `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `PLANS.md`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, and a new root release-notes file.
- **Status:** `done`
- **Steps:**
  - [x] Add a root HELab release-notes surface for versioned downstream change tracking
  - [x] Update `/ccpr` to use `package.json` as the canonical release version source
  - [x] Add a lint rule requiring release-notes updates when live-linked downstream surfaces change
  - [x] Re-run validation and archive the plan
- **Constraints:** Preserve the live-linked skill model, avoid introducing a fake independent skill release boundary, and keep release semantics grounded in the root HELab version.
- **Checkpoints:** Release-notes file exists; `/ccpr` aligned; downstream-impact gate active; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Live-Linked Skill Version Sync

- **Goal:** Align the repository contract with the real live-linked consumption model and add a mechanical method that syncs the `harnessing-agents` skill version from HELab's root version.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R004`, `HE-R005`
- **Scope:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `package.json`, `scripts/he-lint.js`, `scripts/`, `.agent/skills/harnessing-agents/SKILL.md`, and `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Reframe docs so the skill is described as a live-linked HELab component rather than an independently released artifact
  - [x] Add a deterministic sync command that copies the root version into the skill metadata
  - [x] Add a validation gate that fails when `package.json` and the skill version diverge
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve `framework/` as canonical truth, keep the skill metadata concise, and prefer a mechanical guardrail over a documentation-only rule.
- **Checkpoints:** Contract wording aligned; sync command available; lint gate catches version drift; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Framework-to-Skill Wording Alignment

- **Goal:** Align the remaining protocol and released skill wording with the clarified contract that target projects are harnessed by running the `harnessing-agents` skill, including HELab self-host mode.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R004`
- **Scope:** `framework/HE Harnessing Protocol.md`, `.agent/skills/harnessing-agents/`, `.agent/workflows/mount.md`, and `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Tighten framework protocol wording so it explicitly describes skill-driven target-project and self-host execution
  - [x] Align released skill references with the clarified contract and current support-material rules
  - [x] Fix stale workflow references to `CLAUDE.md` and incomplete skill paths where `AGENTS.md` and `.agent/skills/harnessing-agents/` are canonical
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve the framework as the canonical knowledge source, keep the released skill surface concise, and avoid changing templates unless the contract actually requires it.
- **Checkpoints:** Protocol aligned; skill references aligned; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Skill Boundary Contract Correction

- **Goal:** Correct the repository contract so it reflects the actual product boundary: framework definitions plus the released `harnessing-agents` skill that target projects run and this repository self-hosts.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R004`
- **Scope:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `package.json`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Reframe root governance docs around framework-plus-skill delivery
  - [x] Align the dual-mode contract with skill execution in target projects and self-hosted use here
  - [x] Expand active harness validation to include the released skill surface
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve `framework/` as the canonical knowledge source, keep `docs/` non-authoritative, and avoid changing the skill behavior itself unless the contract requires it.
- **Checkpoints:** Root contract corrected; skill surface added to validation; verification green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Dual-Mode Intake Enforcement

- **Goal:** Repair canonical content defects, add a real self-hosted requirements intake gate, and align the repository contract with the explicit dual self-hosted plus target-project intent.
- **Requirement IDs:** `HE-R002`, `HE-R003`, `HE-R004`
- **Scope:** `REQUIREMENTS.md`, `AGENTS.md`, `ANCHORS.md`, `PLANS.md`, `package.json`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, and affected framework feature files.
- **Status:** `done`
- **Steps:**
  - [x] Create a machine-readable root requirements ledger for the self-hosted repository contract
  - [x] Enforce active-plan requirement IDs through the live he-lint gate
  - [x] Update repository contract and anchors to the dual-mode self-hosted plus target-project model
  - [x] Repair malformed canonical feature content and re-run validation
- **Constraints:** Preserve the 32-feature framework structure, keep support material non-authoritative, and only claim local enforcement where the repo now has a real gate.
- **Checkpoints:** Ledger created; he-lint gate active; dual-mode contract recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Framework Surface Consistency Sweep

- **Goal:** Remove remaining active-surface references that still treat `docs/`, `research/`, or `references/` as canonical dependencies, then perform a framework-only critique.
- **Scope:** `framework/`, `.agent/workflows/`, `PLANS.md`, and active root harness files. Out of scope: editing support material under `docs/` unless required for path integrity.
- **Status:** `done`
- **Steps:**
  - [x] Inspect root shims and active-surface files for stale support-material coupling
  - [x] Patch canonical framework/workflow files to align with the framework-only scope rule
  - [x] Re-run mechanical validation on the active harness surface
  - [x] Produce a fresh framework-only critique
- **Constraints:** Preserve the framework's canonical structure and avoid promoting support material back into the active surface.
- **Checkpoints:** Active-surface references cleaned; validation green; critique completed.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Framework-Only Surface Cleanup

- **Goal:** Align the repository's active harness with the new scope rule that `framework/` is canonical and `docs/` is non-core support material.
- **Scope:** `AGENTS.md`, `README.md`, `docs/ARCHITECTURE.md`, `docs/OBSERVABILITY.md`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, `package.json`, `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Update root meta-docs to describe `framework/` as the only canonical product surface
  - [x] Remove `docs/` from active harness enforcement where it is currently treated as required/core
  - [x] Retune lint/audit behavior to focus on the active project surface instead of support material
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve the existing framework structure and feature counts; do not change canonical framework content unless required for path integrity.
- **Checkpoints:** Meta-docs aligned; enforcement scripts aligned; verification green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Repository Critique Audit

- **Goal:** Conduct a rigorous repository-wide critique to identify structural weaknesses, validation gaps, documentation drift, and improvement opportunities across the harness.
- **Scope:** Root meta-docs, `docs/`, `framework/`, `research/`, `scripts/`, and package-level validation commands. Out of scope: changing canonical framework definitions unless a critique requires a concrete reference.
- **Status:** `done`
- **Steps:**
  - [x] Run the existing mechanical checks (`npm run check`, `npm run audit`) and inspect failures or blind spots
  - [x] Review root governance docs and harness scripts for contradictions, missing enforcement, or weak signals
  - [x] Sample canonical `framework/` files and downstream `research/` files for drift and machine-readability issues
  - [x] Produce prioritized findings with exact file citations and concrete remediation directions
- **Constraints:** `framework/` remains canonical truth; do not “fix” issues during the review unless explicitly requested; findings must distinguish hard defects from tuning opportunities.
- **Checkpoints:** Mechanical validation captured; documentation layers sampled; final findings ranked by severity.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Principle-to-Practice Chain Restructuring

- **Goal:** Restructure the entire HE framework so every feature, prevention item, DO NOT rule, and enhancement option is organized through the 5-level Principle-to-Practice Chain defined in `HE Principle Practice Chain.md`. Success = every chain level (L1–L5) is explicitly populated for all 32 features, and all supporting documents (Prevention Checklist, Enhancement Options, Gap Evaluation, DO NOT rules) trace back to their chain position.
- **Scope:**
  - IN: `framework/HE Design Decisions.md`, `framework/HE Actions Tools.md`, `framework/HE Negative Actions.md`, `framework/HE Inverse Outcomes.md`, `framework/HE Principle Practice Chain.md`, `AGENTS.md` (DO NOT + Conventions sections), `ANCHORS.md`
  - OUT: `references/` (read-only), `research/` (will need consistency alignment AFTER framework changes, via `/revise-comments`), `framework/HE Harnessing Protocol.md` (wraps L4 execution — update references only)
- **Status:** `done`
- **Steps:**
  - [x] Phase 0: Deep Research — Read all framework documents and map current chain coverage
  - [x] Phase 0: Gap Analysis — Produce `tmp/Chain Restructuring Analysis.md` with per-feature chain gaps
  - [x] Phase 0: Extract implicit principles (L1) — Draft 23 Engineering Principles from implicit content
  - [x] Phase 1A: Define L1 (Engineering Principles) — Finalized 19 principles (EP-1 through EP-19); validated timeless, general, first-principles-derived; mapped to governed features
  - [x] Phase 2A: Create modular framework files — Defined 32 features and 19 principles in `framework/features/` and `framework/principles/`, indexed by `framework/HE Index.md`
  - [x] Phase 2B: Update framework documents — Principles, features, and cross-cutting concerns updated and verified
  - [x] Phase 3: Cross-Cutting Alignment — Integrated into `framework/cross-cutting/`: Prevention Checklist, Reward Engineering, Token Economics, SAS→MAS readiness
  - [x] Phase 4: Validation — `npm run check` passes clean (markdownlint + cspell + he-lint)
  - [x] Phase 5: Consistency Cascade — Run `/revise-comments` to align `research/` documents with updated `framework/` modular definitions
  - [x] Phase 6: Anchor — Write new ANCHORS.md entry (A9) recording the Chain Restructuring decision
- **Constraints:**
  - The 32-feature count (A6) must remain exactly 32 — no features added or removed
  - The 3-Pillar + 1-Foundation taxonomy (A1) is preserved — chain restructuring adds depth, not width
  - `framework/` remains the single source of truth (A3) — no principle definitions in `research/`
  - Unified feature definitions (A4) — no SAS/MAS splits introduced
  - All changes must pass `he-lint.js` pre-commit and CI checks
  - Each phase should be executable in a single agent context window
- **Checkpoints:**
  - CP1: Phase 0 complete (analysis + principle draft) → commit `tmp/Chain Restructuring Analysis.md`
  - CP2: Phase 1 complete (L1 + L2 + L5 defined for all 32 features) → commit updated Chain.md
  - CP3: Phase 2 complete (all framework docs updated) → commit batch
  - CP4: Phase 4 complete (validation green) → commit verification
  - CP5: Phase 5 complete (research/ aligned) → commit consistency
- **Blocking Issues:** All resolved.
  - ~~**Principle granularity:**~~ RESOLVED — Apply chain rigor: merge/split principles according to the chain. Refined from 23 draft to 19 final principles (EP-1 through EP-19). Each is timeless, first-principles-derived, and distinctly different. Merged: EP-2+EP-14→EP-2 (Persistence); EP-16+EP-20→EP-14 (Clarity before commitment); EP-21+EP-23→EP-18 (Entropy); EP-22+EP-3.4→EP-19 (Living documentation). Removed EP-15 (git-as-memory demoted to L3 design pattern under EP-2).
  - ~~**L5 measurability:**~~ RESOLVED — L5 framed as "what implementors should measure" not what this docs repo measures internally.
  - ~~**Chain.md role:**~~ RESOLVED — `HE Principle Practice Chain.md` stays as meta-document describing the chain model. New `HE Principle Map.md` created as the canonical principle-to-practice map for all 32 features.
- **Completed:** 2026-04-09

### Plan: Workspace Entropy Reconciliation

- **Goal:** Eliminate workspace entropy by standardizing terminology, aligning meta-documentation with the modular framework DAG, and remediating broken references.
- **Scope:** Root meta-docs (`README.md`, `AGENTS.md`, `ANCHORS.md`, `PLANS.md`), `framework/`, `research/`, and `docs/`.
- **Status:** `done`
- **Steps:**
  - [x] Phase 1: Terminology Standardization — Align pillar/verb strings across all files
  - [x] Phase 2: Meta-Doc Realignment — Update structure and feature counts in `README.md` and `AGENTS.md`
  - [x] Phase 3: Reference Remediation — Redirect 18+ broken research links to `framework/HE Index.md` and modular files
  - [x] Phase 4: Consistency Loop — Run `/revise-comments` and final `npm run audit`
- **Constraints:** `framework/` is canonical truth (A3). 32-feature count is check-sum (A6).
- **Checkpoints:** CP1: Root docs updated → CP2: Research links remediated → CP3: Final audit pass.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Build Workflow Reconciliation

- **Goal:** Reconcile `.agent/workflows/build.md` and all `harnessing-agents` skill files with the latest framework edition — specifically `HE Harnessing Protocol.md`, `HE Principle Practice Chain.md`, and `HE Principle Map.md`. Align scoring systems, feature counts (31→32), chain-level annotations, and EP principle backlinks across all files.
- **Scope:**
  - IN: `.agent/workflows/build.md`, `.agent/skills/harnessing-agents/` (SKILL.md, references/, templates/)
  - OUT: `framework/` (read-only source of truth), `research/`, `references/`
- **Status:** `done`
- **Steps:**
  - [x] Read all framework docs and build workflow; identify 6 divergence gaps
  - [x] Socratic questioning (P1-11) — 6 clarifications confirmed by user
  - [x] Rewrite `build.md`: EP-N table, chain annotations on all 5 phases, canonical 6-dim scoring (0-5), 32-feature count, HE Principle Map.md as source
  - [x] Cascade to `SKILL.md`: version 3.1.0→4.0.0, Canonical Sources section, 32 features, EP-15 backlink
  - [x] Cascade to `references/he-quick-start.md`: P1-12 item, EP range annotations, 32 features
  - [x] Cascade to `references/he-scoping-evaluation.md`: chain-level mappings on all 6 dimensions, 32 features
  - [x] Cascade to `references/he-scoring.md`: Chain Level column, P1-12 range
  - [x] Cascade to `references/he-full-audit.md`: chain annotations on all 7 phases, 32 features, Principle Map ref
  - [x] Cascade to `references/he-chain-context.md`: full P1-12 Skill Engineering feature entry
  - [x] Cascade to `references/he-subagent-prompts.md`: Context Agent scope P1-1→P1-12
  - [x] Cascade to `references/he-cascade-analysis.md`: P1-12 entry (Impact Weight 4)
  - [x] Validation: `npm run check` passes clean
- **Constraints:** Framework docs are read-only source of truth. Canonical scoring = 6 dimensions (0-5) from HE Inverse Outcomes.md. All 31→32 refs updated. EP-N replaces governing principles.
- **Checkpoints:** CP1: build.md rewritten → CP2: SKILL.md versioned → CP3: all references cascaded → CP4: lint green
- **Blocking Issues:** None.

### Plan: Harness Engineering Playbook Bootstrap

- **Goal:** Apply all nine OpenAI Harness Engineering practices to this repository, closing gaps identified in the baseline audit.
- **Scope:** Root-level meta-docs, `docs/`, `scripts/harness/`, `package.json`, `CLAUDE.md`. Out of scope: `framework/`, `research/`, `references/` content.
- **Status:** `done`
- **Steps:**
  - [x] Baseline repo — inventory existing artifacts and CI
  - [x] Identify gaps against the 9 HE practices
  - [x] Create `PLANS.md` (Practice 5)
  - [x] Create `docs/ARCHITECTURE.md` (Practice 3)
  - [x] Create `docs/OBSERVABILITY.md` (Practice 4)
  - [x] Create `scripts/harness/smoke.sh`, `lint.sh`, `audit.sh` (Practice 6)
  - [x] Add `smoke`, `check`, `ci`, `audit` npm scripts (Practice 1)
  - [x] Update `CLAUDE.md` with new commands (Practice 2)
- **Constraints:** Do not edit `framework/` or `references/` content. Preserve all existing conventions. Do not overwrite `.husky/pre-commit` or CI workflows.
- **Checkpoints:** `docs/` complete → scripts complete → package.json updated → CLAUDE.md updated.
- **Blocking Issues:** None.
- **Completed:** 2026-04-04
