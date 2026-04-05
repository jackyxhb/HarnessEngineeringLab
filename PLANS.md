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

- **Goal:** Restructure the entire HE framework so every feature, prevention item, DO NOT rule, and enhancement option is organized through the 5-level Principle-to-Practice Chain defined in `HE Principle Practice Chain.md`. Success = every chain level (L1–L5) is explicitly populated for all 31 features, and all supporting documents (Prevention Checklist, Enhancement Options, Gap Evaluation, DO NOT rules) trace back to their chain position.
- **Scope:**
  - IN: `framework/HE Design Decisions.md`, `framework/HE Actions Tools.md`, `framework/HE Negative Actions.md`, `framework/HE Inverse Outcomes.md`, `framework/HE Principle Practice Chain.md`, `AGENTS.md` (DO NOT + Conventions sections), `ANCHORS.md`
  - OUT: `references/` (read-only), `research/` (will need consistency alignment AFTER framework changes, via `/revise-comments`), `framework/HE Execution Procedure.md` (wraps L4 execution — update references only)
- **Status:** `awaiting-review`
- **Steps:**
  - [x] Phase 0: Deep Research — Read all framework documents and map current chain coverage
  - [x] Phase 0: Gap Analysis — Produce `tmp/Chain Restructuring Analysis.md` with per-feature chain gaps
  - [x] Phase 0: Extract implicit principles (L1) — Draft 23 Engineering Principles from implicit content
  - [x] Phase 1A: Define L1 (Engineering Principles) — Finalized 19 principles (EP-1 through EP-19); validated timeless, general, first-principles-derived; mapped to governed features
  - [x] Phase 1B: Define L2 (Targeted Enhancements) — Written for all 31 features in `HE Principle Map.md`
  - [x] Phase 1C: Define L5 (Concrete Enhancements) — Written for all 31 features in `HE Principle Map.md`
  - [x] Phase 2A: Create `HE Principle Map.md` — New canonical document with full L1→L5 chains for all 31 features organized by pillar (HE Principle Practice Chain.md stays meta per user direction)
  - [x] Phase 2B: Update `HE Design Decisions.md` — Added Principle-to-Practice Chain Index table mapping all 31 features to L1 principles and L2 outcomes
  - [x] Phase 2C: Update `HE Actions Tools.md` — Added chain reference blockquotes (EP-N → L2 outcome) to all 31 feature sections + updated intro
  - [x] Phase 2D: Update `HE Negative Actions.md` — Added Chain Failure Index table classifying all prevention items by broken principle and failure level
  - [x] Phase 2E: Update `AGENTS.md` DO NOT rules — Added EP-N principle backlinks to all 13 DO NOT rules + updated section intro
  - [x] Phase 2F: Update `HE Inverse Outcomes.md` — Added chain_level mapping to all 6 evaluation dimensions + updated intro
  - [x] Phase 3: Cross-Cutting Alignment — Integrated into `HE Principle Map.md` cross-cutting sections: Prevention as chain-break alarm, DO NOT as L4 constraints with L1 backlinks, Reward Engineering as cross-chain anti-gaming, Token Economics as chain cost profile, SAS→MAS readiness
  - [x] Phase 4: Validation — `npm run check` passes clean (markdownlint + cspell + he-lint)
  - [ ] Phase 5: Consistency Cascade — Run `/revise-comments` to align `research/` documents with updated `framework/` definitions
  - [x] Phase 6: Anchor — Write new ANCHORS.md entry (A9) recording the Chain Restructuring decision
- **Constraints:**
  - The 31-feature count (A6) must remain exactly 31 — no features added or removed
  - The 3-Pillar + 1-Foundation taxonomy (A1) is preserved — chain restructuring adds depth, not width
  - `framework/` remains the single source of truth (A3) — no principle definitions in `research/`
  - Unified feature definitions (A4) — no SAS/MAS splits introduced
  - All changes must pass `he-lint.js` pre-commit and CI checks
  - Each phase should be executable in a single agent context window
- **Checkpoints:**
  - CP1: Phase 0 complete (analysis + principle draft) → commit `tmp/Chain Restructuring Analysis.md`
  - CP2: Phase 1 complete (L1 + L2 + L5 defined for all 31 features) → commit updated Chain.md
  - CP3: Phase 2 complete (all framework docs updated) → commit batch
  - CP4: Phase 4 complete (validation green) → commit verification
  - CP5: Phase 5 complete (research/ aligned) → commit consistency
- **Blocking Issues:** All resolved.
  - ~~**Principle granularity:**~~ RESOLVED — Apply chain rigor: merge/split principles according to the chain. Refined from 23 draft to 19 final principles (EP-1 through EP-19). Each is timeless, first-principles-derived, and distinctly different. Merged: EP-2+EP-14→EP-2 (Persistence); EP-16+EP-20→EP-14 (Clarity before commitment); EP-21+EP-23→EP-18 (Entropy); EP-22+EP-3.4→EP-19 (Living documentation). Removed EP-15 (git-as-memory demoted to L3 design pattern under EP-2).
  - ~~**L5 measurability:**~~ RESOLVED — L5 framed as "what implementors should measure" not what this docs repo measures internally.
  - ~~**Chain.md role:**~~ RESOLVED — `HE Principle Practice Chain.md` stays as meta-document describing the chain model. New `HE Principle Map.md` created as the canonical principle-to-practice map for all 31 features.

---

## Completed Plans

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
