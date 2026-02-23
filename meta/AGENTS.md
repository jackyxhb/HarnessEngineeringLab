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
- **Building software still demands discipline, but the discipline shows up in the scaffolding — not the code.** The quality of your work now lives in the tooling, abstractions, and feedback loops, not in the application code itself.

> [!CAUTION]
> **Early progress will be slower than expected.** This is almost always because the environment is underspecified — not because the agent is incapable. The agent lacks the tools, abstractions, and internal structure required to make progress toward high-level goals. Invest in the environment first.

---

## How to Work Here

### Starting a Task

1. Read this file first. Then read the file it points you to.
2. Break the task into small building blocks (design → code → review → test).
3. Work **depth-first**: unlock the next step, don't skip the foundation.
4. Use repository-embedded tools directly (scripts, linters, CI). Don't ask humans to copy-paste.

### Driving a PR to Completion (Ralph Wiggum Loop)

1. Implement the change.
2. Review your own changes locally.
3. Request agent reviews — **both locally and in the cloud** (where available).
4. Respond to all feedback (agent or human) and iterate.
5. **Repeat until all agent reviewers are satisfied** — not until a fixed count of passes.
6. Merge — do not leave PRs open indefinitely.

> Human review is **optional**. Humans may review pull requests but are not required to. Over time, push all review effort toward agent-to-agent. Reserve human review for judgment calls only.

### When You Are Stuck

- Do **not** guess or hallucinate. Stop and identify what context is missing.
- Check `meta/KNOWLEDGE.md` for where to find deeper documentation.
- Check `meta/ARCHITECTURE.md` for structural constraints before writing new code.
- Check `meta/QUALITY.md` for taste invariants and golden principles.
- If information is missing from the repository, that is a bug — encode it and open a fix-up PR.

---

## The Full Autonomy Loop

Given a single well-specified prompt, the agent should be able to drive a feature or bug fix end-to-end:

| Step | Action |
|---|---|
| 1 | Validate the current state of the codebase |
| 2 | Reproduce the reported bug |
| 3 | **Record a video demonstrating the failure** |
| 4 | Implement a fix |
| 5 | Validate the fix by driving the application (via Chrome DevTools Protocol) |
| 6 | **Record a second video demonstrating the resolution** |
| 7 | Open a pull request with both recordings attached |
| 8 | Respond to agent and human feedback |
| 9 | Detect and remediate build failures |
| 10 | **Escalate to a human only when judgment is required** (see below) |
| 11 | Merge the change |

> [!IMPORTANT]
> This level of autonomy depends heavily on the specific structure and tooling of the repository. It should not be assumed to generalise without similar investment in architecture, observability, and agent-accessible tooling.

### Escalation Criteria — When to Involve a Human

Escalate only when:

- The metric/log constraint cannot be satisfied after exhausting available tools
- The fix requires an architectural change outside the current task scope
- The error is non-deterministic or environment-specific and cannot be reproduced reliably
- A UX change introduces visual ambiguity that requires human aesthetic judgment

> Escalation is correct behaviour, not failure. Exhaust agent-available signals first.

See [`meta/OBSERVABILITY.md`](./OBSERVABILITY.md) for the full observability-driven validation loop.

---

## The Human Role

The engineer's job is no longer to write code. It is to **design environments, specify intent, and build feedback loops** that allow agents to do reliable work.

Humans work at a **different layer of abstraction**:

- **Prioritise** work from the product and user feedback queue
- **Translate** user feedback and business goals into acceptance criteria
- **Validate** outcomes — approve that what shipped matches intent
- **Encode** judgment: when the agent struggles, identify what is missing (tool, guardrail, doc) and feed it back into the repository — always via the agent

Humans should not write code, copy-paste terminal output, or manually fix things the agent could fix.

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
| [`meta/OBSERVABILITY.md`](./OBSERVABILITY.md) | Observability stack, per-worktree isolation, SLO-style goals, UI driving |
| `docs/design-docs/` | Product and engineering design decisions |
| `docs/design-docs/core-beliefs.md` | Agent-first operating principles and core beliefs |
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

## Tooling Principle: Everything Must Be Scriptable

> **All repository operations must be scriptable. Agents must never require a human to copy output and paste it into a prompt.**

This means:

- All tools used in the development loop (`gh`, linters, test runners, observability queries) must be invocable directly from agent context.
- Repository-embedded skills must provide agent-callable interfaces for all common operations.
- If an operation requires human copy-paste intermediation, that is a **tooling gap** — encode the missing capability and open a fix-up PR.

---

## What Success Looks Like

- Output is **correct**, **maintainable**, and **legible to future agent runs**.
- Code does not need to match any particular human stylistic preference — it needs to be verifiable and structurally sound.
- PRs are short-lived and self-contained.
- Knowledge is always in the repository, not in your context window alone.

---

## What We're Still Learning

This system has worked well through internal launch and early adoption. Open questions that require human judgment to navigate:

- **Long-term architectural coherence**: How coherence evolves over years in a fully agent-generated system is unknown. Monitor for drift signals proactively.
- **Where human judgment adds the most leverage**: We are still learning which decisions compound most when humans make them vs. delegate them. Encode that judgment as you discover it.
- **Model capability evolution**: As underlying models improve, patterns that required careful scaffolding today may become trivially solvable. Revisit constraints and scaffolding regularly — do not over-engineer for limitations that may disappear.

> Epistemic humility is a team norm. Treat these as active hypotheses, not solved problems.
