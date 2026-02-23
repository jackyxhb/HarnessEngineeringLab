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

### Core Beliefs (`docs/design-docs/core-beliefs.md`)

`core-beliefs.md` is a **required named artifact** — not just another design doc.

It captures the fundamental operating principles of agent-first development that anchor all other decisions. Every agent that reads the repository should read this file to understand:

- Why certain constraints exist (agents, not humans, generate all code)
- What the team optimises for (agent legibility, not human preference)
- What the team explicitly does *not* optimise for (stylistic consistency for its own sake)
- The open questions the team is still learning from

This file must be kept current. When a core operating principle changes, this file is updated first.

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

## Long-Running Task Design

Single agent runs may last **upwards of six hours**, often while humans are sleeping. Tasks must be designed to support this.

### Principles

- **Design for resumability**: Execution plans must capture enough state that a failed run can be resumed without starting over. Record intermediate decisions and completed steps in the plan file.
- **Checkpoint to the repository**: Any significant intermediate state (partial data migration, phase completion, validated sub-results) must be written to the repository — not held only in agent memory.
- **Scope tasks for atomic completion**: A single agent run should produce a mergeable PR or a clearly checkpointed intermediate state. Avoid runs that produce dangling, un-committable state.
- **Define exit criteria upfront**: Before starting a long run, the execution plan must state: what success looks like, what partial success looks like, and what constitutes a failure requiring escalation.

### Execution Plan Structure for Long Runs

Long-running tasks (estimated > 1 hour) must have a persisted execution plan in `docs/exec-plans/active/` with:

```markdown
## Goal
[What this run achieves]

## Steps
- [x] Step 1 — completed at [timestamp]
- [/] Step 2 — in progress
- [ ] Step 3

## Decision Log
- [timestamp]: Chose X over Y because ...

## Checkpoint State
[Any intermediate state needed to resume if the run is interrupted]

## Exit Criteria
- Success: ...
- Partial success: ...
- Escalate if: ...
```

### Recovery

If a long run fails mid-task:

1. The execution plan's progress log shows where it stopped.
2. The agent reads the checkpoint state and resumes from the last completed step.
3. If the failure is non-recoverable, the agent escalates to a human with the progress log and failure evidence.

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

## Bootstrapping a New Repository

The agent-first approach applies from the very first commit. The initial repository scaffold — structure, CI configuration, formatting rules, package manager setup, and application framework — should be generated by the agent, guided by a small set of existing templates.

### How to Bootstrap

1. Start with an **empty git repository**.
2. Provide the agent with existing templates or reference repos as context.
3. Have the agent generate the initial scaffold: repo structure, CI config, formatting rules, package manager setup, and app framework.
4. Have the agent generate the initial `AGENTS.md` — even the entry point itself is agent-written.
5. Bootstrap the `docs/` knowledge structure (design-docs, exec-plans, product-specs, references).
6. Add linting, structural tests, and CI gates immediately — these are **prerequisites**, not later additions.

> There is no pre-existing human-written code to anchor the system. From the beginning, the repository is shaped by the agent.

---

## Further Reading

- [AGENTS.md](./AGENTS.md) — top-level navigation map
- [ARCHITECTURE.md](./ARCHITECTURE.md) — structural rules
- [QUALITY.md](./QUALITY.md) — coding standards and taste invariants
- `docs/design-docs/index.md` — full design decision catalogue

### External References from the Source Article

- [Ralph Wiggum Loop](https://ghuntley.com/loop/) — iterate until agent reviewers are satisfied
- [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/) — validate data at boundaries
- [ARCHITECTURE.md best practices](https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html) — top-level map of domains and package layering
- [Execution plans](https://cookbook.openai.com/articles/codex_exec_plans) — how to structure plans as first-class artifacts
- [AI is forcing us to write good code](https://bits.logic.inc/p/ai-is-forcing-us-to-write-good-code) — why strict boundaries and predictable structure benefit agents
