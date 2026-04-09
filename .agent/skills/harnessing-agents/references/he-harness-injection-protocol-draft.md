# Harness Injection Protocol Draft

Draft skill-side protocol for how `harnessing-agents` should move through a target repository when staging, injecting, verifying, and recording harness improvements.

This is **not** yet a canonical `framework/` asset. It is a permanent execution reference for the live-linked skill.

## Goal

Normalize target-repository intervention into a deterministic lifecycle so the skill does not improvise broad repo mutation one file at a time.

The protocol treats harnessing as:

- **Slots** — abstract harness receptacles such as planning, verification, review, intake, observability, memory, or orchestration.
- **Touch-points** — concrete repo surfaces that currently realize, or could realize, those slots.
- **Injection actions** — the minimal edits or mounts that install a missing harness capability into a chosen touch-point.

## Core Definitions

### 1. Slot

An architectural class of harness capability that may or may not already exist in a target repository.

Examples:

- planning slot
- intake slot
- verification slot
- review slot
- observability slot
- memory slot
- orchestration slot

### 2. Touch-Point

A concrete repository surface that can satisfy or partially satisfy a slot.

Examples:

- `.harness/HE-IMPLEMENTATION-PLAN.md`
- `.agent/task_plan.md`
- `REVIEWS.md`
- `scripts/agent_ralph_loop.sh`
- `.github/workflows/*.yml`
- `AGENTS.md`

### 3. Injection Action

The smallest maintainable mutation that installs or strengthens a harness slot at a touch-point.

Examples:

- add a validator call to an existing gate
- create a review ledger
- add a requirements linkage check
- add a verification snapshot refresh

## Touch-Point Classes

Use these classes before mutating a target repository.

### Observational Surfaces

Read-first surfaces used to understand current repo state.

Examples: repo status reporters, existing plans, existing ledgers, scripts, CI config.

### Planning Surfaces

Low-risk staging surfaces where the skill can write audit intent and proposed remediations without disturbing live repo operations.

Examples: `.harness/HE-*` files.

### Live Operational Surfaces

High-sensitivity surfaces that already participate in real repo delivery or workflow execution.

Examples: `.agent/task_plan.md`, active deployment plans, required CI workflows, production validators.

### Contract Surfaces

Repo rules, policy, and review contracts that shape allowed behavior.

Examples: `AGENTS.md`, requirements ledgers, review ledgers.

### Verification Surfaces

Repo-native gates that can produce a stable pass/fail result.

Examples: Ralph Loop scripts, CI jobs, test wrappers, lint gates.

### Audit / History Surfaces

Durable traces that explain what was changed and why.

Examples: release notes, anchors, assessment summaries, change summaries.

### Volatile Surfaces

Runtime-local state that may be useful during execution but should not usually be treated as durable proof.

Examples: local caches, mailbox files, temporary session state, machine-local settings.

## Lifecycle Phases

### Phase 0: Scope

Identify project type, repo scale, and whether active harness or delivery plans already exist.

### Phase 1: Observe

Read observational, contract, and verification surfaces. Do not mutate live operational surfaces yet.

### Phase 2: Classify

Map discovered repo surfaces into slot classes and touch-point classes.

Questions:

- which slots already exist?
- which slots are weak or missing?
- which touch-points are staging-safe versus live?

### Phase 3: Stage

Write audit intent and remediation options into planning surfaces first.

Default rule:

- use `.harness/` before mutating live operational surfaces

### Phase 4: Approve Transition

Move from staged planning into live mutation only after a specific remediation batch is approved.

### Phase 5: Inject

Apply the minimum valid mutation to the selected touch-points for the approved batch.

### Phase 6: Verify

Run the narrowest repo-native proof that the injection worked.

Preferred order:

1. failure-first proof when feasible
2. repo-native verification gate
3. secondary auditor or consistency check

### Phase 7: Certify

Update review, release, anchor, or assessment surfaces as required by the repo's contract.

### Phase 8: Exit

Release locks, summarize the batch, and leave volatile state out of durable outputs unless the target repo explicitly requires otherwise.

## Safety Levels

### Safety Level A — Read Only

Allowed during Scope and Observe.

### Safety Level B — Stage Only

Allowed in planning surfaces during Stage.

### Safety Level C — Approved Live Mutation

Allowed only after an explicit remediation batch is chosen.

### Safety Level D — Protected / Escalate First

Surfaces that should not be mutated without stronger approval or human escalation.

Examples: deployment-critical CI, secrets flows, destructive automation, production rollout controls.

## Protocol Rules

1. Do not treat all repo files as equally mutable.
2. Do not overwrite a target repo's live operational plan during inspection when a planning surface like `.harness/` is available.
3. Do not jump directly from observed gap to live mutation without a staged remediation batch.
4. Prefer the narrowest existing touch-point that can satisfy the slot before inventing a new one.
5. Treat volatile state as execution support, not durable proof.
6. If a slot can be filled by extending an existing repo-native gate, prefer that over adding a parallel harness mechanism.

## Proof Requirements

An injected slot should not count as real until the protocol has evidence for all applicable layers:

1. **Resolution proof** — the chosen touch-point really corresponds to the intended slot.
2. **Mutation proof** — the required files or commands were actually installed or updated.
3. **Behavior proof** — the repo-native gate shows the new behavior.
4. **Failure proof** — the gate fails when the protected condition is intentionally violated, when feasible.
5. **Audit proof** — the repo's review or release surfaces were updated when required.

## Relationship To Feature Guides

This draft does not replace feature-specific implementation guides.

- Feature guides explain how to mount a specific feature.
- The harness-injection protocol explains how the skill should move through the target repo while mounting any feature.

The protocol governs lifecycle and safety.
The guides govern feature-specific execution details.

For terminology boundaries, use `framework/HE-Terms.md`: repo-shape names in this draft are skill-side **Repo Profile** terms, and reusable multi-feature batches derived from them should be treated as **Feature Packages** rather than new framework features.

## Proof Status

Current external proof base:

1. **ACSS** — showed that the protocol should preserve a target repo's active execution plan during inspection, stage audit artifacts under `.harness/`, and move into live mutation only for approved focused follow-on batches.
2. **CareerHelper** — showed that the same protocol can correctly stop at audit-only staging when the target repo already has strong verification, sandboxing, orchestration, MCP, and review automation surfaces, leaving only narrower Tier 1 intake/review-durability gaps.
3. **ServiceAgent** — showed that a target repo can already have strong portable contracts, harness history, CI, and pre-commit verification while still lacking live planning, requirements-ledger, intake-gate, and durable review-ledger surfaces.
4. **encA0** — showed that a target repo can already have a substantial harness, requirements ledger, CI, scheduled maintenance, and execution history, yet still need selective mutation because its portable rule surfaces, planning surfaces, and audit surfaces have drifted out of sync with the live implementation and enforcement layer.
5. **ENCT** — showed that a documentation-heavy theory/archive repository with only an IDE-specific instruction shim and no portable governance, planning, review, or verification surfaces should be treated as a first-mount governance target, and was later successfully mounted through a narrow governance batch with a passing smoke command.

Current interpretation:

- the draft has enough evidence to remain a durable skill-side execution asset
- the draft now has better Repo Profile diversity across missing-harness, strong-repo selective-mutation, intake-first, drifted-harness, and first-mount governance profiles, and the last profile now has a concrete Feature Package plus one real implementation proof, but still does not yet have enough repetition or cross-skill need to justify promotion into canonical `framework/` ontology

## Promotion Rule

Keep this protocol in the skill surface until repeated target-project proofs show it is stable enough to become canonical framework doctrine.

Promotion threshold should require:

1. multiple external target-project proofs
2. evidence across different repo types
3. a demonstrated need beyond the current `harnessing-agents` skill
