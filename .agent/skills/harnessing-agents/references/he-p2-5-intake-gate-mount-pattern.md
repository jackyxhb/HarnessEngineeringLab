# P2-5 Intake Gate Mount Pattern

Canonical remediation pattern for mounting **P2-5 Upstream Intake Gate** in a target project.

Use this reference during **Phase 3 planning** and **Phase 4 execution** whenever the target project may have requirements or planning files but still allows planning or execution to proceed on unregistered work.

## Goal

Turn the abstract P2-5 requirement into concrete intake enforcement that blocks planning and execution until requirements are recorded and sufficiently clear.

The minimum viable P2-5 mount has 3 layers:

1. **Intake checkpoint** before planning or execution.
2. **Ledger validation** against the project's requirements surface.
3. **Escalation path** when the requirement is missing or underspecified.

## Planning Pattern

When writing `.harness/HE-IMPLEMENTATION-PLAN.md`, use a P2-5 entry shaped like this:

- **Remediation Level:** `Light` if the project already has a requirements ledger and planning file but no explicit instruction-level intake gate.
- **Remediation Level:** `Medium` if the project needs a repo-native script or hook that validates requirement presence before planning/execution.
- **Remediation Level:** `Heavy` if the project needs both the ledger dependency surface and a formal intake workflow.
- **Dependencies:** Requires `P1-10 Requirements Ledger`; often pairs with `P1-7 Planning` and `P1-11 Socratic Questioning`.
- **Verification:** must prove that an unregistered task is rejected before planning or execution proceeds.

## Execution Pattern

### 1. Define the Intake Checkpoint

Pick the narrowest point in the target project's workflow where planning or execution can be blocked safely:

1. plan-generation script or workflow
2. pre-task checklist or command wrapper
3. existing lint/check command
4. CI workflow if earlier blocking is not available

### 2. Validate Requirement Presence

- The gate should verify that the incoming task or plan cites a valid requirement ID from the canonical ledger.
- If the project does not yet have the ledger, mount `P1-10` first.

### 3. Define the Escalation Path

- If the requirement is missing, the gate should direct the agent to record or clarify the requirement before continuing.
- If the requirement exists but lacks clarity, route to the project's questioning or clarification surface rather than allowing silent execution.

### 4. Record the Mounted Gate

Record the intake checkpoint, ledger dependency, and failure behavior in `.harness/HE-CHANGE-SUMMARY.md`.

## Verification Pattern

Preferred verification flow:

1. attempt to start a multi-step task or plan without a valid requirement ID
2. run the mounted intake checkpoint
3. confirm explicit rejection or failure
4. add a valid requirement entry and cite it
5. rerun the same checkpoint
6. confirm success

## Do Not

- Do not assume the mere existence of `REQUIREMENTS.md` means P2-5 is mounted.
- Do not allow agents to bypass intake by starting work directly from chat instructions.
- Do not build a heavyweight intake router if a narrow repo-native check is sufficient.
- Do not mark P2-5 complete if unregistered work can still reach planning or execution.
