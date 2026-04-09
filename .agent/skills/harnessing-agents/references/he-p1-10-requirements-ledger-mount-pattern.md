# P1-10 Requirements Ledger Mount Pattern

Canonical remediation pattern for mounting **P1-10 Requirements Ledger** in a target project.

Use this reference during **Phase 3 planning** and **Phase 4 execution** whenever the target project is planning or implementing work without a durable, machine-readable requirements ledger.

## Goal

Turn the abstract P1-10 requirement into concrete intake infrastructure that the skill can inspect, mount, and verify in a target project.

The minimum viable P1-10 mount has 3 layers:

1. **Canonical root ledger** for requirements, usually `REQUIREMENTS.md`.
2. **Planning hook** that requires plans to cite requirement IDs before work proceeds.
3. **Machine-readable entries** so future automation can validate the ledger.

## Planning Pattern

When writing `.harness/HE-IMPLEMENTATION-PLAN.md`, use a P1-10 entry shaped like this:

- **Remediation Level:** `Light` if the project already has a root backlog or requirements file that only needs machine-readable structure and explicit planning hooks.
- **Remediation Level:** `Medium` if a ledger must be created and current planning documents must be wired to cite requirement IDs.
- **Remediation Level:** `Heavy` if the project has no stable planning surface and the skill must introduce both the ledger and the associated validation/check flow.
- **Dependencies:** Reference `P1-7 Planning` when plans need to be created or normalized alongside the ledger. Reference `P0-3 Verification` if a repo-native gate is needed to enforce the intake rule.
- **Verification:** must prove that planning without a requirement ID is now blocked or explicitly treated as invalid.

## Execution Pattern

### 1. Mount the Canonical Ledger

- Prefer `REQUIREMENTS.md` in the project root unless the target project already has a stronger canonical root ledger with a different established name.
- Store machine-readable entries in a fenced `json` block.
- Each entry should include at least:
  - `id`
  - `title`
  - `narrative`
  - `acceptance_criteria`
  - `status`
  - `source`

### 2. Wire the Planning Hook

Update the target project's canonical planning surface so plans or implementation tasks must cite requirement IDs before execution begins.

Preferred surfaces:

1. `PLANS.md`
2. `AGENTS.md`
3. an existing canonical planning workflow or intake document

The hook should state that multi-step work must cite requirement IDs from the root ledger.

### 3. Add the Narrowest Validation Surface

Prefer an existing project-native check that can validate the presence and shape of requirement references:

1. existing lint/check script
2. existing pre-commit hook
3. existing CI workflow
4. new lightweight validation script only if needed

The gate only needs to prove that the project cannot silently plan or implement multi-step work without the ledger linkage.

### 4. Record the Mounted Files

Record the new ledger path, planning-hook path, and validation surface in `.harness/HE-CHANGE-SUMMARY.md`.

## Verification Pattern

Preferred verification flow:

1. attempt to create or validate a multi-step plan that omits requirement IDs
2. run the mounted planning or validation surface
3. confirm failure or explicit rejection
4. add a valid requirement entry and cite it from the plan
5. rerun the same surface
6. confirm success

If the target project does not yet have a formal plan file, verify that the canonical agent contract now instructs agents to block multi-step execution until the ledger is updated.

## Do Not

- Do not treat ad hoc prose in issues, chat, or commit messages as a substitute for the ledger.
- Do not create narrative-only requirement entries that cannot be validated mechanically.
- Do not force HELab's exact intake structure when the target project already has a stronger repo-native planning surface.
- Do not mark P1-10 complete if planning can still proceed without ledger-backed requirement IDs.
