# First-Mount Governance Mount Pattern

Canonical execution pattern for documentation-heavy target repositories that lack a portable governance layer.

Use this reference during **Phase 3 planning** and **Phase 4 execution** when the target repository is primarily a knowledge archive or theory/reference surface and the audit classifies it as a **first-mount governance** profile.

## Goal

Turn a weak-governance documentation repository into a minimally agent-operable target without introducing application-style process overhead.

The minimum viable first-mount governance batch has 5 layers:

1. **Portable root contract** via `AGENTS.md`.
2. **Requirements intake ledger** via `REQUIREMENTS.md`.
3. **Durable planning surface** via `PLANS.md`.
4. **Independent review ledger** via `REVIEWS.md`.
5. **Lightweight document-integrity verification** via the narrowest repo-native command surface.

## Planning Pattern

- Use this guide only after the target repository has been classified as documentation-first or archive-first and the audit confirms there is no stronger native governance layer to extend in place.
- **Remediation Level:** `Medium` when the repo already has readable content structure and only needs the portable governance layer plus a lightweight verification command.
- **Dependencies:** Reuse `P1-10 Requirements Ledger`, `P1-7 Planning`, `P2-5 Upstream Intake Gate`, and `P2-3 AI Auditors & Collaboration Channels` in that order. Reference `P0-3 Verification` only for the narrow verification surface; do not mount broader verification infrastructure unless the target repo shape justifies it.
- **Lifecycle rule:** During audit and planning, keep findings under `.harness/`. Move into live root-level governance files only after the user approves the first batch.
- **Scope guard:** Keep the batch limited to governance and document-integrity checks. Defer taxonomy cleanup, archival restructuring, release automation, and app-runtime tooling.

## Execution Pattern

### 1. Mount the Portable Contract

- Create a root `AGENTS.md`.
- State repository purpose, canonical content surfaces, editing constraints, available verification commands, and prohibited operations.
- Preserve any IDE-specific instruction file as a shim or local supplement rather than the canonical rule surface.

### 2. Mount the Requirements Ledger

- Create a root `REQUIREMENTS.md` with a fenced `json` block.
- Add only the minimum active requirements needed for the mounted governance model and the current execution tranche.
- Require multi-step work to cite requirement IDs before planning or execution proceeds.

### 3. Mount the Planning Surface

- Create a root `PLANS.md` with active and completed sections.
- Use a structured entry shape that includes goal, requirement IDs, scope, status, ordered steps, constraints, checkpoints, and blockers.
- Archive completed plans inline instead of deleting them.

### 4. Mount the Review Ledger

- Create a root `REVIEWS.md` with machine-readable approval records.
- Add generator/evaluator separation rules to `AGENTS.md`.
- Treat canonical theory/reference surfaces as review-required.

### 5. Mount the Narrowest Verification Surface

- Prefer a small shell or language-native script under `scripts/` when the repo has no stronger existing check surface.
- The verification command should prove:
  - required governance files exist
  - required core content directories exist
  - active plans cite requirement IDs when present
  - review records are structurally present for review-required changes when the batch requires them
- Expose the command through the smallest repo-native interface available for the target stack. In docs-first repos with no package manager, a shell command is sufficient.

### 6. Align the Root README Minimally

- Update `README.md` only enough to point agents and maintainers at the new root governance surface.
- Do not rewrite the archive narrative or content hierarchy during the first batch.

## Verification Pattern

Preferred verification flow:

1. run the mounted smoke command before the governance files exist or with a deliberately broken requirement/plan linkage, when feasible
2. confirm explicit failure
3. mount the governance files and correct the linkage
4. rerun the smoke command
5. confirm success
6. record the command and result in `.harness/HE-CHANGE-SUMMARY.md`

For documentation-heavy repositories, success is defined by deterministic governance presence and integrity, not by application test coverage.

## Do Not

- Do not treat an IDE-specific instruction file as the canonical contract once `AGENTS.md` exists.
- Do not introduce heavyweight CI/CD, release, or build tooling during the first-mount governance batch unless the target repository already has those surfaces.
- Do not restructure content directories as part of the initial governance mount.
- Do not skip the smoke command; first-mount governance is not complete if the mounted surfaces cannot be checked mechanically.
