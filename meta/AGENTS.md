# AGENTS.md — Agent Navigation Map

> **This file is the entry point, not the manual.**
> Read it fully, then follow the pointers. Do not rely on this file alone.
> Source: OpenAI Harness Engineering (Feb 2026)

---

## Core Philosophy

- **Humans steer. Agents execute.**
- Every line of code, test, config, and doc is agent-generated.
- Human time is the scarcest resource — protect it ruthlessly.
- When something fails, ask: *"What capability is missing? How do we make it legible and enforceable for the agent?"* — never just "try harder."

---

## How to Work Here

### Starting a Task

1. Read this file first. Then read the file it points you to.
2. Break the task into small building blocks (design → code → review → test).
3. Work **depth-first**: unlock the next step, don't skip the foundation.
4. Use repository-embedded tools directly (scripts, linters, CI). Don't ask humans to copy-paste.

### Driving a PR to Completion

1. Implement the change.
2. Review your own changes locally.
3. Request agent reviews (local + cloud if available).
4. Respond to all feedback (agent or human) and iterate.
5. Repeat until all reviewers are satisfied.
6. Merge — do not leave PRs open indefinitely.

### When You Are Stuck

- Do **not** guess or hallucinate. Stop and identify what context is missing.
- Check `meta/KNOWLEDGE.md` for where to find deeper documentation.
- Check `meta/ARCHITECTURE.md` for structural constraints before writing new code.
- Check `meta/QUALITY.md` for taste invariants and golden principles.
- If information is missing from the repository, that is a bug — encode it and open a fix-up PR.

---

## What Agents Can Touch

Agents are expected to produce **all** of the following:

| Category | Examples |
|---|---|
| Product code & tests | Application logic, unit tests, integration tests |
| Infrastructure | CI configuration, release tooling, deployment scripts |
| Internal tooling | Developer utilities, scripts that manage the repo |
| Documentation | Design docs, product specs, architecture notes |
| Evaluation | Test harnesses, quality scorecards |
| Review | PR review comments and responses |
| Observability | Dashboard definitions, log queries, metric thresholds |

---

## Knowledge Map

This is where to look for deeper context:

| Document | Purpose |
|---|---|
| [`meta/ARCHITECTURE.md`](./ARCHITECTURE.md) | Domain model, layer dependencies, structural rules |
| [`meta/KNOWLEDGE.md`](./KNOWLEDGE.md) | Docs structure, knowledge management, progressive disclosure |
| [`meta/QUALITY.md`](./QUALITY.md) | Taste invariants, golden principles, entropy/garbage collection |
| `docs/design-docs/` | Product and engineering design decisions |
| `docs/exec-plans/active/` | Active execution plans for complex work |
| `docs/exec-plans/completed/` | Historical decisions and rationale |
| `docs/exec-plans/tech-debt-tracker.md` | Known technical debt, prioritised |
| `docs/product-specs/` | Product requirements and acceptance criteria |
| `docs/references/` | External API and library LLM-friendly reference docs |

---

## Agent Limits

> **What the agent can't see doesn't exist.**

The repository is the single source of truth. Information that lives in:

- chat threads
- people's heads
- external docs (Google Docs, Notion, Confluence, etc.)
- undocumented tribal knowledge

...is **not available to you** and therefore effectively **does not exist**. If you encounter a gap, encode it into the repository before proceeding.

---

## What Success Looks Like

- Output is **correct**, **maintainable**, and **legible to future agent runs**.
- Code does not need to match any particular human stylistic preference — it needs to be verifiable and structurally sound.
- PRs are short-lived and self-contained.
- Knowledge is always in the repository, not in your context window alone.
