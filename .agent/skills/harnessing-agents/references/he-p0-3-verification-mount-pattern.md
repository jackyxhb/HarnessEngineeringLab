# P0-3 Verification Mount Pattern

Canonical remediation pattern for mounting **P0-3 Verification (Self & Collective)** in a target project.

Use this reference during **Phase 3 planning** and **Phase 4 execution** whenever the target project lacks deterministic verification before agents declare completion, commit work, or request review.

## Goal

Turn the abstract P0-3 requirement into concrete verification infrastructure that the skill can inspect, mount, and verify in a target project.

The minimum viable P0-3 mount has 3 layers:

1. **Canonical verification commands** that return a machine-parseable pass/fail signal.
2. **Task-completion or commit-time hook** that forces those commands to run before work is declared complete.
3. **Repeatable failure-first verification** proving broken work is blocked.

## Planning Pattern

When writing `.harness/HE-IMPLEMENTATION-PLAN.md`, use a P0-3 entry shaped like this:

- **Remediation Level:** `Light` if the project has verification commands but agents are not required to run them before completion.
- **Remediation Level:** `Medium` if commands exist but no hook, task wrapper, or CI surface enforces them.
- **Remediation Level:** `Heavy` if the project has no reliable verification command surface and the skill must first create one.
- **Dependencies:** Reuse existing stack-native test/lint commands first. Reference `P0-1 Bash Sandboxes` if command execution is not yet isolated or reproducible.
- **Verification:** must show one intentional failure case and one passing case.

## Execution Pattern

### 1. Normalize the Verification Surface

- Identify the narrowest existing repo-native command surface, for example:
  - `npm run check`
  - `npm test`
  - `pytest`
  - `make test`
  - an existing CI or lint script
- If multiple commands are needed, mount a single umbrella command that agents can run deterministically before completion.
- Prefer an existing root command over introducing a new custom script.

### 2. Add the Completion Gate

Mount the narrowest gate that matches the target project:

1. existing pre-commit hook
2. existing project task runner or wrapper command
3. existing CI workflow required before merge
4. new lightweight hook or script only if no gate exists

The gate should require the canonical verification command to pass before commit, merge, or task finalization.

### 3. Preserve Machine-Readable Failure Signals

- Prefer exit-code based pass/fail.
- If output parsing is needed, keep the failure text stable and short.
- Avoid verification flows that require a human to inspect logs manually just to know whether the project passed.

### 4. Record the Mounted Surface

Record the chosen verification command, gate location, and any new files in `.harness/HE-CHANGE-SUMMARY.md`.

## Verification Pattern

Preferred verification flow:

1. introduce or simulate a small failure in a file covered by the verification command
2. run the mounted verification surface
3. confirm failure with a non-zero exit or explicit blocked status
4. revert or fix the failure
5. rerun the same surface
6. confirm success

If the target project has no meaningful testable failure case yet, at minimum prove the gate runs the expected verification command and propagates its exit status.

## Do Not

- Do not stop at advice like "run tests" without mounting a concrete command surface.
- Do not introduce a heavyweight custom verification framework when the project already has a native command that can be reused.
- Do not mark P0-3 complete if agents can still bypass verification during normal task completion.
- Do not rely on manual reviewer inspection as the primary verification signal.
