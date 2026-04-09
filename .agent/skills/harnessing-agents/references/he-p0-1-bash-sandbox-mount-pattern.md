# P0-1 Bash Sandbox Mount Pattern

Canonical remediation pattern for mounting **P0-1 Bash Sandboxes** in a target project.

Use this reference during **Phase 3 planning** and **Phase 4 execution** whenever agent work in the target project runs directly on a developer workstation or lacks a reproducible, isolated command surface.

## Goal

Turn the abstract P0-1 requirement into a concrete execution environment that isolates agent side-effects and makes command execution reproducible.

The minimum viable P0-1 mount has 3 layers:

1. **Isolated execution surface** for agent-run commands.
2. **Preinstalled or scripted tool bootstrap** so the agent does not mutate the host ad hoc.
3. **Visible state and reset behavior** so contamination is detectable and disposable.

## Planning Pattern

When writing `.harness/HE-IMPLEMENTATION-PLAN.md`, use a P0-1 entry shaped like this:

- **Remediation Level:** `Light` if the target project already has a safe container, devcontainer, or task sandbox but agents are not directed to use it consistently.
- **Remediation Level:** `Medium` if the project needs a lightweight wrapper such as a devcontainer, docker compose service, `mise`, `nix`, or bootstrap script to standardize command execution.
- **Remediation Level:** `Heavy` if the project has no reproducible execution environment and agent work currently depends on developer-local state.
- **Dependencies:** None, but P0-1 often enables P0-3, P1-3, and other execution-heavy features.
- **Verification:** must show the same command can run in the mounted sandbox repeatedly without relying on undocumented host-machine state.

## Execution Pattern

### 1. Pick the Narrowest Reproducible Sandbox

Prefer the strongest repo-native execution surface the target project can realistically maintain:

1. existing devcontainer or container task
2. existing Docker or Compose service
3. existing reproducible tool bootstrap (`mise`, `asdf`, `nix`, shell bootstrap)
4. new lightweight sandbox wrapper only if none exists

### 2. Standardize Agent Entry

- Add or reuse a documented command entry point for agent execution.
- Ensure required runtimes and CLIs are either preinstalled in the sandbox or provisioned deterministically from version-controlled config.
- Prefer one visible command entry over scattered ad hoc setup steps.

### 3. Make State Observable and Disposable

- Document where sandbox logs, shell sessions, or bootstrap output can be observed.
- Prefer ephemeral or resettable environments over long-lived mutable shells.
- If full ephemerality is not realistic, document the reset command explicitly.

### 4. Record the Mounted Surface

Record the sandbox entry point, bootstrap files, and reset path in `.harness/HE-CHANGE-SUMMARY.md`.

## Verification Pattern

Preferred verification flow:

1. enter the mounted sandbox or run the sandbox entry command
2. execute a representative project command inside it
3. reset or recreate the sandbox surface
4. rerun the same command
5. confirm the result is repeatable without undocumented host setup

If the target project cannot support a full reset, at minimum prove the bootstrap command reconstructs the expected toolchain from version-controlled inputs.

## Do Not

- Do not treat the developer's ambient local machine as the sandbox.
- Do not require manual one-off setup steps that are not committed to the repository.
- Do not introduce a heavyweight orchestration layer when an existing lightweight reproducible surface already exists.
- Do not mark P0-1 complete if side-effects remain invisible or unrecoverable.
