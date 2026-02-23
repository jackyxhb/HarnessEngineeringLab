# KNOWLEDGE.md — Knowledge Management & Progressive Disclosure

> The repository is the single source of truth.
> If it isn't here, it doesn't exist.
> **Give the agent a map, not a 1,000-page manual.**

---

## The Core Problem: Context is Finite

An agent's effectiveness is bounded by what it can hold in context.
Too much context = noise. Too little context = blind spots.

The goal is **progressive disclosure**: a short, stable entry point that teaches the agent exactly where to look next — rather than overwhelming it with everything up front.

---

## The Anti-Patterns to Avoid

### The Monolithic AGENTS.md

A single giant instruction file fails in four ways:

| Failure Mode | Why It Happens |
|---|---|
| **Crowds out task context** | Leaves no room for the actual code, task, and relevant docs |
| **Non-guidance** | When everything is labelled "important", nothing is |
| **Instant rot** | Stale rules accumulate; agents can't distinguish live rules from dead ones |
| **Unverifiable** | A blob can't be checked for coverage, freshness, or cross-link correctness |

### The Undocumented Decision

Any architectural decision, design choice, or team alignment that lives outside the repository (Slack, Google Docs, people's memories) is **invisible to all future agents**. It is equivalent to it never having happened.

---

## The Knowledge Structure

All persistent knowledge lives in a structured directory tree treated as the **system of record**.

```
meta/
├── AGENTS.md          ← Entry point / table of contents
├── ARCHITECTURE.md    ← Structural rules, domain model
├── KNOWLEDGE.md       ← This file: knowledge management
└── QUALITY.md         ← Taste invariants, entropy control

docs/
├── design-docs/
│   ├── index.md       ← Catalogued, indexed, with verification status
│   ├── core-beliefs.md
│   └── ...
├── exec-plans/
│   ├── active/        ← Plans currently in progress
│   ├── completed/     ← Historical decisions + rationale
│   └── tech-debt-tracker.md
├── generated/
│   └── db-schema.md   ← Auto-generated artifacts
├── product-specs/
│   ├── index.md
│   └── ...
└── references/
    ├── design-system-reference-llms.txt
    └── ...             ← LLM-friendly reference docs for key dependencies
```

---

## Types of Knowledge Artifacts

### AGENTS.md (this project's entry point)

- ~100 lines maximum
- A map, not a manual
- Points to deeper documents
- Reviewed and updated when any major structural change occurs

### Design Docs (`docs/design-docs/`)

- One file per significant architectural or product decision
- Must include: **context**, **decision**, **consequences**, **verification status**
- Indexed in `docs/design-docs/index.md`
- Catalogued with: date, status (active/superseded/deprecated)

### Execution Plans (`docs/exec-plans/`)

- Used for complex multi-step work
- Contains: goal, steps, progress log, decision log
- Checked in alongside code changes — not stored externally
- Lightweight plans (< 1 day work): ephemeral, not persisted
- Complex plans: persisted in `active/`, moved to `completed/` when done

### Technical Debt (`docs/exec-plans/tech-debt-tracker.md`)

- Each item: description, impact, remediation approach, priority
- Updated by background cleanup agents on a recurring cadence
- Reviewed and triaged by humans at regular intervals

### Product Specs (`docs/product-specs/`)

- One file per feature or product area
- Linked from design docs and execution plans
- Written in terms of acceptance criteria, not implementation details

### Reference Docs (`docs/references/`)

- LLM-optimised (plain text, no JS-rendered content) versions of key external dependencies
- Examples: design system tokens, package API surfaces, deployment configs
- Updated when the upstream changes in a way that affects agent behaviour

---

## Encoding Decisions into the Repository

Whenever a decision is made — in a review, in a chat, in a meeting — it must be encoded before the work is considered complete.

### Decision Encoding Ladder

1. **Comment in code** — for local, implementation-specific context
2. **Update a design doc** — for team-level design decisions
3. **Update ARCHITECTURE.md** — for structural/boundary rules
4. **Promote to a lint rule** — for rules that must never be violated
5. **Add a CI check** — for rules that must block bad PRs

> Move rules *up the ladder* as soon as a second violation occurs. Fixing a pattern once is maintenance. Fixing it twice signals the rule belongs in tooling.

---

## Doc Gardening

Stale documentation is actively harmful — agents follow outdated rules silently.

### Maintenance Practices

- A recurring **doc-gardening agent** scans for documentation that does not match actual code behaviour
- Stale or contradicted docs are flagged and fix-up PRs are opened automatically
- CI validates cross-links are not broken
- CI validates all referenced files and anchors exist
- Design docs include a `verified:` date that triggers staleness alerts when old

### Freshness Signals

| Signal | Action |
|---|---|
| Doc references a module that no longer exists | Open fix-up PR immediately |
| Doc's `verified:` date > 30 days old | Flag for human review |
| Lint rule references a doc that is deprecated | Update lint error message |
| PR introduces new pattern not documented anywhere | Block until pattern is documented |

---

## Context Injection Strategy

When writing prompts or agent entry points:

1. **Start with the entry point** — AGENTS.md is always injected first
2. **Add task-specific context** — the relevant exec plan or product spec
3. **Add architectural context** — ARCHITECTURE.md for structural work
4. **Add targeted docs** — only the design docs relevant to the current task
5. **Never inject everything** — inject nothing you don't need for this specific task

> More context is not always better. Precision beats volume.

---

## Further Reading

- [AGENTS.md](./AGENTS.md) — top-level navigation map
- [ARCHITECTURE.md](./ARCHITECTURE.md) — structural rules
- [QUALITY.md](./QUALITY.md) — coding standards and taste invariants
- `docs/design-docs/index.md` — full design decision catalogue
