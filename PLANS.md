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

_No active plans. Create an entry here before starting any multi-step task._

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
