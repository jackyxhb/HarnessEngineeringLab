# P2-3 Target-Project Review Gate

Canonical remediation pattern for mounting **P2-3 AI Auditors & Collaboration Channels** in a target project.

Use this reference during **Phase 3 planning** and **Phase 4 execution** whenever the target project lacks a concrete independent-review mechanism.

## Goal

Turn the abstract P2-3 requirement into target-project infrastructure that an agent can inspect, mount, and verify.

The minimum viable target-project review gate has 3 layers:

1. **Audit trail:** a machine-readable root `REVIEWS.md` ledger.
2. **Recall hook:** explicit generator/evaluator separation rules in the target project's canonical agent contract (`AGENTS.md` or equivalent).
3. **Mechanical enforcement:** a repo-native check, hook, or CI step that fails when review-required changes lack an approving review record.

## Planning Pattern

When writing `.harness/HE-IMPLEMENTATION-PLAN.md`, use a P2-3 entry shaped like this:

- **Remediation Level:** `Light` if only the ledger and contract hook are missing.
- **Remediation Level:** `Medium` if the project also lacks a gate and needs a new hook or CI check.
- **Dependencies:** `P0-3 Verification` should be referenced if the project already has a validation surface that can host the gate.
- **Verification:** must describe how to prove a review-required change fails without approval.

## Execution Pattern

### 1. Mount the Root Review Ledger

- Create `REVIEWS.md` in the target project root from `templates/REVIEWS.md`.
- Keep the ledger machine-readable JSON inside a fenced `json` block.
- Store at least these fields per review record:
  - `id`
  - `date`
  - `status`
  - `generator`
  - `reviewer`
  - `review_type`
  - `scope_paths`
  - `findings`

### 2. Inject the Contract Hook

Update the target project's canonical instruction surface.

Preferred order:

1. `AGENTS.md`
2. Existing canonical workspace instruction file if `AGENTS.md` is absent

The hook should state:

- which surfaces are review-required
- that the implementation agent cannot also approve the change
- where review records are stored
- what to do when a reviewer finds blocking issues

### 3. Add the Narrowest Repo-Native Gate

Prefer the smallest existing validation surface in the target project:

1. existing lint/check script
2. existing pre-commit hook
3. existing CI workflow
4. a new lightweight script if no validation surface exists

The gate does not need to copy HELab's `he-lint.js`. It must only enforce the local target-project review rule in the simplest maintainable way for that stack.

Examples:

- **Node project:** add a small script that checks changed review-required paths and requires a matching `REVIEWS.md` approval record.
- **Python project:** add a lightweight verification script and run it from the existing check command.
- **Docs-first repo:** add a simple shell or JS gate in CI if there is no language runtime standard.

### 4. Verify the Mount

Verification must demonstrate blocked self-grading.

Preferred check:

1. make or simulate a change to a review-required surface
2. run the target project's gate without an approving review record
3. confirm failure
4. add an approving record with a distinct reviewer identity
5. confirm the gate passes

Record the result in `.harness/HE-CHANGE-SUMMARY.md`.

## Do Not

- Do not stop at prose like "use peer review" with no artifact or gate.
- Do not force HELab-specific file names beyond `REVIEWS.md` unless the target project already has a stronger native pattern.
- Do not add a heavyweight framework-specific validator when a narrow repo-native check is sufficient.
- Do not treat a conversational approval as equivalent to a machine-readable review record.
