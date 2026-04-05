# Architecture

Module boundaries, content flow, and dependency rules for the HarnessEngineeringLab repository. Implements **Practice 3: Structure Codebase With Strict Boundaries And Flow**.

---

## Module Map

| Module | Role | Write Authority |
| --- | --- | --- |
| `framework/` | Canonical source of truth — feature definitions, gap evaluation, prevention checklist | Humans only (via `/polish`, `/reconcile`, `/revise-comments` workflows) |
| `research/` | Analysis, principles, commentary | Agents (must reference `framework/`) |
| `references/` | Immutable source articles | **Read-only.** Never modified after ingestion |
| `.agent/workflows/` | Agent procedure definitions | Humans only |
| `scripts/` | Operational tooling (linting, auditing) | Humans only |
| `builder/` | Build execution logs | Agents (append-only after creation) |
| `tmp/` | Ephemeral drafts | Agents (max 30-day lifetime) |
| `CLAUDE.md` | Claude Code shim → `AGENTS.md` | Humans only |
| `AGENTS.md` | IDE-agnostic agent rules (canonical rule surface) | Humans only |
| `.cursorrules` | Cursor shim → `AGENTS.md` | Humans only |
| `.github/copilot-instructions.md` | GitHub Copilot shim → `AGENTS.md` | Humans only |
| `.windsurfrules` | Windsurf shim → `AGENTS.md` | Humans only |
| `ANCHORS.md` | Persistent strategic decision log | Humans + agents (append via `/anchor`) |
| `PLANS.md` | Active task state | Agents (append active plan; archive on completion) |

---

## Content Flow

```text
references/        (immutable source)
    │
    ▼
framework/         (canonical definitions)
    │
    ├──▶ research/ (analysis — must reference framework/ for canonical concepts)
    │
    ├──▶ .agent/workflows/ (procedures — must reference CLAUDE.md commands)
    │
    └──▶ scripts/ (tools — paths are coupled to framework/ file structure)
```

**Rule:** Content flows downward only. `research/` may never define a new canonical concept — it must originate in `framework/` first.

---

## Dependency Rules

### `framework/`

- No imports from `research/` or `references/`.
- The single source of truth for all feature definitions, pillar structure, and feature counts.
- He-lint.js validates all `.md` files against `framework/HE Core Features.md`.

### `research/`

- May read and reference `framework/` freely.
- Must use canonical pillar names and feature IDs (enforced by `he-lint.js`).
- Must not define new features or override canonical definitions.
- Inconsistencies are fixed by `/revise-comments`, never by editing `framework/`.

### `references/`

- Immutable. No agent or workflow may write to this directory.
- If a reference document needs an amendment, the decision is recorded in `ANCHORS.md`.

### `.agent/workflows/`

- Must reference only commands listed in `CLAUDE.md ## Available Tools & Commands`.
- Do not introduce new tools inside workflows without registering them in `CLAUDE.md` first.

### `scripts/`

- `he-lint.js` hardcodes paths to `framework/HE Core Features.md`, `framework/HE Prevention Checklist.md`, and `ANCHORS.md`. Changes to those file names must update `he-lint.js`.
- `scripts/harness/` provides thin wrappers that call npm scripts. Never duplicate logic — keep behavior in npm scripts and let shell wrappers be entrypoints only.

### `tmp/`

- No other module may reference `tmp/` content.
- Files older than 30 days are flagged as stale by `scripts/harness/audit.sh`.

---

## Key Contracts

### File Naming

Max 5 words, Title Case with spaces. Prefix `HE` for general content, `MAS` for multi-agent specifics. Enforced by convention; validated by `/reconcile`.

### Feature Count

Exactly **31 core features**: 11 Foundation + 11 P1 + 5 P2 + 4 P3. Validated by `he-lint.js` number-bias check.

### Pillar Labels

All headings referencing a pillar must use the canonical verb form:
- _Context Engineering (Inform)_
- _Architectural Constraints (Constrain)_
- _Entropy Management (Maintain)_

---

## Anti-Patterns

| Anti-Pattern | Consequence | Enforcement |
| --- | --- | --- |
| Editing `framework/` to match a `research/` claim | Bad content enters canonical truth | DO NOT rule in `CLAUDE.md` |
| Defining a new feature in `research/` | Silent fork — agents load contradictory definitions | `he-lint.js` ID validation |
| Writing to `references/` | Source articles become contaminated | DO NOT rule in `CLAUDE.md` |
| Circular dependency (research → framework → research) | Infinite reconcile loops | Content-flow rule above |
| Registering a workflow without a `CLAUDE.md` entry | Tool is invisible to agents | DO NOT rule in `CLAUDE.md` |
| Leaving `tmp/` files > 30 days | Context pollution, stale data | `audit.sh` stale-file check |
