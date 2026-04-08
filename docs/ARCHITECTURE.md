# Architecture

Legacy support note for repository structure. This file is **not** part of the active project surface; `framework/` and root harness files remain canonical.

---

## Module Map

| Module | Role | Write Authority |
| --- | --- | --- |
| `framework/` | Canonical source of truth — feature definitions, gap evaluation, prevention checklist | Humans only (via `/polish`, `/reconcile`, `/revise-comments` workflows) |
| `docs/` | Non-core support material; may be stale or removed without affecting the canonical framework | Explicit user request only |
| `.agent/workflows/` | Agent procedure definitions | Humans only |
| `scripts/` | Operational tooling (linting, auditing) | Humans only |
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
framework/         (canonical definitions)
    │
    ├──▶ .agent/workflows/ (procedures operating on the canonical framework)
    │
    ├──▶ scripts/ (tools validating the canonical framework surface)
    │
    └──▶ docs/ (optional support material; non-authoritative)
```

**Rule:** Canonical truth originates in `framework/` only. Content under `docs/` is support material and must never override framework definitions.

---

## Dependency Rules

### `framework/`

- The single source of truth for all feature definitions, pillar structure, and feature counts.
- He-lint.js validates the active framework surface against `framework/HE Index.md` and `framework/features/`.

### `docs/`

- Support material only. It may summarize or assist framework work, but it is not authoritative.
- No enforcement or design decision should depend on `docs/` unless the user explicitly asks to maintain it.

### `.agent/workflows/`

- Must reference only commands listed in `AGENTS.md ## Available Tools & Commands`.
- Do not introduce new tools inside workflows without registering them in `AGENTS.md` first.

### `scripts/`

- `he-lint.js` hardcodes paths to `framework/HE Index.md`, `framework/cross-cutting/HE Prevention Checklist.md`, and `ANCHORS.md`. Changes to those file names must update `he-lint.js`.
- `scripts/harness/` provides thin wrappers that call npm scripts. Never duplicate logic — keep behavior in npm scripts and let shell wrappers be entrypoints only.

### `tmp/`

- No other module may reference `tmp/` content.
- Files older than 30 days are flagged as stale by `scripts/harness/audit.sh`.

---

## Key Contracts

### File Naming

Max 5 words, Title Case with spaces. Prefix `HE` for general content, `MAS` for multi-agent specifics. Enforced by convention; validated by `/reconcile`.

### Feature Count

Exactly **32 core features**: 11 Foundation + 12 P1 + 5 P2 + 4 P3. Validated by `he-lint.js` number-bias check.

### Pillar Labels

All headings referencing a pillar must use the canonical verb form:
- **Foundation: Infrastructure (Execute)**
- **Pillar 1: Context Engineering (Inform)**
- **Pillar 2: Architectural Constraints (Constrain)**
- **Pillar 3: Entropy Management (Maintain)**

---

## Anti-Patterns

| Anti-Pattern | Consequence | Enforcement |
| --- | --- | --- |
| Editing `framework/` to match support material | Bad content enters canonical truth | DO NOT rule in `AGENTS.md` |
| Treating `docs/` as canonical project truth | Agents reason from stale support material instead of the framework | DO NOT rule in `AGENTS.md` |
| Registering a workflow without a `AGENTS.md` entry | Tool is invisible to agents | DO NOT rule in `AGENTS.md` |
| Leaving `tmp/` files > 30 days | Context pollution, stale data | `audit.sh` stale-file check |
