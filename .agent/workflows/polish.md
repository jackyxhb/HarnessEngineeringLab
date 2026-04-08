---
description: Inspire new or weak Harness Engineering features, expand their definitions, and integrate the insights across the canonical framework
---

# /polish — Feature Polishing & Addition Workflow

Run this workflow when you encounter a new architectural requirement, a powerful organizational concept, or a "weak" existing feature that needs to be escalated or enriched within the Harness Engineering (HE) framework. This workflow handles both the conceptual design (polishing) and the mechanical propagation of changes across the canonical definitions and supporting harness.

> **Architectural anchor (A4):** All 32 features live as single files in `framework/features/P*-*.md`. Each file contains the full L1→L5 vertical chain slice. Never create parallel SAS/MAS variants, and never split a feature across multiple files.

## Phase 1: Inspiration & Mapping

1. **Identify the Gap/Insight:** What new behavior, rule, or failure mode is the user proposing? What existing project evidence motivates it?
2. **Determine Target:** Decide whether to enrich an _existing_ feature (e.g., modifying `P1-8 Context Anchoring`) or create a _new_ core feature slot (e.g., adding `P{pillar}-NEXT …`). Let the user decide if ambiguous.
   - **Constraint rule:** The framework is intentionally bounded (32 features). Prefer enriching an existing feature unless the new concept is distinctly different AND occupies an unoccupied architectural slot. Adding a feature increments the canonical count and triggers `he-lint.js` to enforce `EXPECTED_FEATURE_FILES`.
3. **Identify the Governing Principle:** Which of the 19 engineering principles (`framework/principles/EP-*.md`) governs this behavior? If none fits, the insight may be a new principle, not a new feature — escalate before proceeding.

## Phase 2: Execution (Drafting)

Produce a draft that fills every required slot of the canonical feature file template. This prevents incomplete integrations later.

1. **Draft the L1→L5 Chain:**
   - **L1 Principle reference:** `> **Chain:** [EP-N](../principles/EP-NN.md) → {principle summary}`
   - **L2 Targeted Enhancement:** The concrete enhancement stated as an outcome.
   - **L3 Design Decisions:** One-line design pattern(s) selected.
   - **L4 Concrete Actions & Tools:** `**Action:**` and `**Tool:**` bullets.
   - **L4 Prevention:** At least one `**\`P{id}\` Prevent {FailureMode}:**` item. If the feature is data-bearing, add a matching `Prevent Narrative {Artifact}` item to enforce P1-1 Machine-Readability First.
   - **L5 Gap Signals:** Observable signs that the feature is absent or weak in a target project.
   - **L5 Improvement Policies:** JSON block only — never Markdown tables (P1-1).
   - **L5 Measurement:** Concrete metrics for the enhancement.
   - **Dependencies:** `Requires:` / `Complements:` / `Enables:` / `Feeds:` cross-links to other feature IDs.
2. **SAS→MAS Implications:** Document inline within L3/L4 how the feature behaves in both single-agent and multi-agent scales. Never create a separate MAS variant file (per A4).
3. **Present the Draft:** Present the drafted feature content plus the exact list of files that will be touched in Phase 3, for user approval before any propagation begins.

## Phase 3: Propagation (Integration)

// turbo-all

Once the draft is approved, apply changes according to whether this is an enrichment or a new feature.

### Path A: Enriching an Existing Feature

Scope is narrow because features are single-file:

1. **Edit the feature file:** `framework/features/P{pillar}-{num}.md` — update the relevant L1→L5 section(s) only. Do not rewrite untouched sections.
2. **Touch cross-cutting docs only if structural:**
   - `framework/cross-cutting/HE Prevention Checklist.md` — add/update the row if a new `Prevent {FailureMode}` item was introduced.
   - `framework/cross-cutting/HE Cross Cutting Perspectives.md` — only if the enrichment changes how the feature appears in Human Role Optimization, SAS→MAS Readiness, Agent Legibility, or Entropy Trajectory analysis.
   - `framework/cross-cutting/HE Evaluation Dimensions.md` / `HE SAS MAS Readiness.md` / `HE Token Economics.md` — only if scoring semantics change.
3. **Principle backlink:** If the governing `EP-N` changed, update both the old and new `framework/principles/EP-NN.md` `governed_features` lists and the `governs` array in `framework/HE Index.md`.
4. **Support-material cascade:** Run `/revise-comments` only when the user explicitly wants support material reconciled against the framework. Never let support material drive canonical framework changes.

### Path B: Adding a New Feature

Every step below is mandatory — `he-lint.js` enforces feature/principle counts and will hard-fail the commit if anything is missed.

#### Step 1: Create the canonical feature file

- **`framework/features/P{pillar}-{num}.md`** — create the new file using the drafted L1→L5 content. Filename must match the ID (zero-padded where the repository uses it, e.g. `P1-12.md`).
- Pillar-to-prefix map:
  - Foundation → `P0-*`
  - Pillar 1 (Context Engineering) → `P1-*`
  - Pillar 2 (Architectural Constraints) → `P2-*`
  - Pillar 3 (Entropy Management) → `P3-*`
- Numbering is sequential within a pillar — pick the next free integer. Do not reuse deleted slots without a migration note in `ANCHORS.md`.

#### Step 2: Wire the feature into the DAG index

- **`framework/HE Index.md`** — add a new entry to the `features` JSON array with `id`, `pillar`, `name`, `l1_principle`, `l2_target`, `file`, `requires`, `complements`, `downstream`, and `impact_weight`. Update the containing pillar's `count` field if present.
- **`framework/HE Index.md` `principles` section** — append the new feature ID to the `governs` array of the principle that governs it.

#### Step 3: Update principle backlink

- **`framework/principles/EP-{NN}.md`** — add the new feature ID to the `governed_features` list so the principle-to-feature cross-link is bidirectional.

#### Step 4: Update cross-cutting docs (only where relevant)

- **`framework/cross-cutting/HE Prevention Checklist.md`** — add a row for each new `Prevent {FailureMode}` item introduced, with its `broken_principle` and `failure_level`.
- **`framework/cross-cutting/HE Cross Cutting Perspectives.md`** — add the feature to any of the 4 canonical perspective manifests (Human Role Optimization, SAS→MAS Readiness, Agent Legibility, Entropy Trajectory) it meaningfully participates in. Do not invent new perspectives here — that is a separate architectural change.
- **`framework/cross-cutting/HE SAS MAS Readiness.md`** / **`HE Token Economics.md`** — add rows only if the feature has a distinctive scaling or token-economics profile.

#### Step 5: Update the portable rule surface

- **`AGENTS.md`** — bump the feature count for the affected pillar in the "Organizing Framework" section. The counts are the authoritative agent-facing number.
- **`CLAUDE.md`** — no change (it is a thin shim per P0-11). Verify it still points to `AGENTS.md`.

#### Step 6: Update the Harnessing Protocol inspection tasks

- **`framework/HE Harnessing Protocol.md`** — add a check line to the relevant Phase 1 Task (1.1–1.4) for inspecting the new feature in target projects, and update the scoring matrix size in Phase 2 Task 2.x if needed.

#### Step 7: Update the skill surface (only if behavior changes)

- **`.agent/skills/harnessing-agents/SKILL.md`** — update only if the new feature introduces a new mode, new output artifact, or new navigation pattern. Routine feature additions do not require skill edits — agents navigate via `framework/HE Index.md`.
- **`.agent/skills/harnessing-agents/references/he-scoring.md`** — no change (dimensions are canonical and stable).
- **`.agent/skills/harnessing-agents/references/he-full-audit.md`** — no change (phases are feature-count-agnostic).

#### Step 8: Reconcile support material only if requested

- Run `/revise-comments` only if the user explicitly wants support material under `docs/` updated to reflect the canonical framework. Support material is non-authoritative and may be skipped entirely.

#### Step 9: Verify

Run the canonical gates in order. Any failure blocks the commit:

```bash
npm run smoke   # he-lint.js: feature/principle counts, pillar labels
npm run audit   # structural integrity: required files, workflows, anchors
npm run check   # full CI: markdownlint + cspell + he-lint
```

- `he-lint.js` enforces `EXPECTED_FEATURE_FILES = 32`. After an addition, update the constant (and any references to "32 features" in `AGENTS.md`, `framework/HE Index.md`, `SKILL.md`, and `HE Harnessing Protocol.md`) in a single atomic commit so the count changes everywhere together.

#### Step 10: Summarize changes

Generate a final report listing every modified file and what changed in each, grouped by layer (feature file / index / principles / cross-cutting / meta-docs / skill / research). This report becomes the basis for the commit message and any new `ANCHORS.md` record if the addition represents a strategic decision.

## Post-Workflow: Anchor the Decision

If the polished feature represents a meaningful architectural decision (new category, contested trade-off, reversal of a prior approach), invoke `/anchor` to record a new entry in `ANCHORS.md` so the rationale survives future context resets (per P1-8).
