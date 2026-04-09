# P1-7 Planning Mount Pattern

Canonical remediation pattern for mounting **P1-7 Planning, Task Lists & Blackboards** in a target project.

Use this reference during **Phase 3 planning** and **Phase 4 execution** whenever multi-step work in the target project lacks a durable, resumable, version-controlled plan surface.

## Goal

Turn the abstract P1-7 requirement into concrete task-state infrastructure that survives context resets and handoffs.

The minimum viable P1-7 mount has 3 layers:

1. **Canonical plan file** for multi-step work.
2. **Structured entry format** that captures goal, scope, status, steps, constraints, checkpoints, and blockers.
3. **Archive behavior** so completed plans remain available as cognitive memory.

## Planning Pattern

When writing `.harness/HE-IMPLEMENTATION-PLAN.md`, use a P1-7 entry shaped like this:

- **Remediation Level:** `Light` if the project already has a root plan or task file that only needs structure and lifecycle rules.
- **Remediation Level:** `Medium` if a canonical plan file must be introduced and the agent contract must point to it.
- **Remediation Level:** `Heavy` if the project needs both local planning infrastructure and a shared blackboard or multi-agent task surface.
- **Dependencies:** Requires a stable filesystem surface; pair with P1-10 or P2-5 if planning should also be gated by requirements.
- **Verification:** must prove a multi-step task can be resumed from the plan file without relying on chat history.

## Execution Pattern

### 1. Mount the Canonical Plan Surface

- Prefer `PLANS.md` at the project root unless the target project already has a stronger canonical planning file.
- Keep active and completed plans in the same file unless the target project has a better existing archival pattern.

### 2. Add the Structured Entry Format

Each multi-step plan entry should capture at least:

- goal
- requirement IDs if the project uses a requirements ledger
- scope
- status
- ordered steps with checkboxes
- constraints
- checkpoints
- blocking issues

### 3. Inject the Planning Hook

Update the target project's canonical instruction surface so agents must create or update a plan before executing multi-step work.

Preferred surfaces:

1. `AGENTS.md`
2. canonical workspace instruction file
3. existing workflow docs

### 4. Preserve Completed Plan History

- Archive completed plans inline instead of deleting them.
- Keep enough context in each completed plan that a later agent can understand what happened and why.

## Verification Pattern

Preferred verification flow:

1. create a synthetic multi-step task in the mounted plan surface
2. record partial progress
3. simulate a handoff or reset by rereading only the plan file
4. confirm the remaining steps and blockers are still clear
5. archive the completed plan without losing the execution history

## Do Not

- Do not rely on chat history alone for multi-step task state.
- Do not create a plan file that omits status and checkpoint structure.
- Do not delete completed plans if they are the only durable record of execution history.
- Do not mark P1-7 complete if complex work can still begin without a durable plan surface.
