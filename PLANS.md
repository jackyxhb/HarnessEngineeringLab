# PLANS.md

Active task planning file. Implements **Practice 5: Optimize For Agent Flow** — front-loads durable context (scope, constraints, checkpoints) so agent restarts stay cheap.

**Agents:** Read the active plan before starting any multi-step task. Append a new plan entry for any task requiring more than 3 sequential steps. Archive completed plans by moving them to the `## Completed Plans` section.

---

## Plan Format

```markdown
### Plan: <Title>

- **Goal:** What success looks like.
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

### Plan: Principle-to-Practice Chain Restructuring

- **Goal:** Restructure the entire HE framework so every feature, prevention item, DO NOT rule, and enhancement option is organized through the 5-level Principle-to-Practice Chain defined in `HE Principle Practice Chain.md`. Success = every chain level (L1–L5) is explicitly populated for all 32 features, and all supporting documents (Prevention Checklist, Enhancement Options, Gap Evaluation, DO NOT rules) trace back to their chain position.
- **Scope:**
  - IN: `framework/HE Design Decisions.md`, `framework/HE Actions Tools.md`, `framework/HE Negative Actions.md`, `framework/HE Inverse Outcomes.md`, `framework/HE Principle Practice Chain.md`, `AGENTS.md` (DO NOT + Conventions sections), `ANCHORS.md`
  - OUT: `references/` (read-only), `research/` (will need consistency alignment AFTER framework changes, via `/revise-comments`), `framework/HE Execution Procedure.md` (wraps L4 execution — update references only)
- **Status:** `awaiting-review`
- **Steps:**
  - [x] Phase 0: Deep Research — Read all framework documents and map current chain coverage
  - [x] Phase 0: Gap Analysis — Produce `tmp/Chain Restructuring Analysis.md` with per-feature chain gaps
  - [x] Phase 0: Extract implicit principles (L1) — Draft 23 Engineering Principles from implicit content
  - [x] Phase 1A: Define L1 (Engineering Principles) — Finalized 19 principles (EP-1 through EP-19); validated timeless, general, first-principles-derived; mapped to governed features
  - [x] Phase 2A: Create modular framework files — Defined 32 features and 19 principles in `framework/features/` and `framework/principles/`, indexed by `framework/HE Index.md`
  - [x] Phase 2B: Update framework documents — Principles, features, and cross-cutting concerns updated and verified
  - [x] Phase 3: Cross-Cutting Alignment — Integrated into `framework/cross-cutting/`: Prevention Checklist, Reward Engineering, Token Economics, SAS→MAS readiness
  - [x] Phase 4: Validation — `npm run check` passes clean (markdownlint + cspell + he-lint)
  - [ ] Phase 5: Consistency Cascade — Run `/revise-comments` to align `research/` documents with updated `framework/` modular definitions
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

### Plan: Workspace Entropy Reconciliation

- **Goal:** Eliminate workspace entropy by standardizing terminology, aligning meta-documentation with the modular framework DAG, and remediating broken references.
- **Scope:** Root meta-docs (`README.md`, `AGENTS.md`, `ANCHORS.md`, `PLANS.md`), `framework/`, `research/`, and `docs/`.
- **Status:** `in-progress`
- **Steps:**
  - [x] Phase 1: Terminology Standardization — Align pillar/verb strings across all files
  - [x] Phase 2: Meta-Doc Realignment — Update structure and feature counts in `README.md` and `AGENTS.md`
  - [/] Phase 3: Reference Remediation — Redirect 18+ broken research links to `framework/HE Index.md` and modular files
  - [ ] Phase 4: Consistency Loop — Run `/revise-comments` and final `npm run audit`
- **Constraints:** `framework/` is canonical truth (A3). 32-feature count is check-sum (A6).
- **Checkpoints:** CP1: Root docs updated → CP2: Research links remediated → CP3: Final audit pass.
- **Blocking Issues:** None.

---

## Completed Plans

### Plan: Build Workflow Reconciliation

- **Goal:** Reconcile `.agent/workflows/build.md` and all `harnessing-agents` skill files with the latest framework edition — specifically `HE Execution Procedure.md`, `HE Principle Practice Chain.md`, and `HE Principle Map.md`. Align scoring systems, feature counts (31→32), chain-level annotations, and EP principle backlinks across all files.
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
