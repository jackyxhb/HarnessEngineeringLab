# QUALITY.md — Taste Invariants & Entropy Control

> Documentation alone doesn't keep an agent-generated codebase coherent.
> **Enforce invariants, not implementations.**
> Human taste, captured once, enforced everywhere, continuously.

---

## The Entropy Problem

A fully agent-generated codebase naturally drifts. Agents replicate the patterns they see — including the uneven and suboptimal ones. Left unmanaged, this leads to:

- Inconsistent abstractions across domains
- Hand-rolled utilities that duplicate shared ones
- Data access without boundary validation
- Documentation that no longer reflects code
- Increasing cost of each future agent run

Entropy is not a failure state — it's physics. The solution is **continuous, automated garbage collection**, not periodic manual cleanups.

> The team that spent 20% of every week (every Friday) manually cleaning "AI slop" found it didn't scale. The team that encoded golden principles and automated cleanup found it did.

---

## Golden Principles

These are the opinionated, mechanical rules that keep the codebase legible and consistent. They are non-negotiable.

### 1. Shared > Hand-Rolled

**Prefer shared utility packages over custom helpers.**

- If a utility is needed more than once, it belongs in a shared package.
- Shared utilities keep invariants centralised and are tested once.
- Hand-rolled helpers fragment test coverage and diverge silently.

**Check before implementing**: Does this utility already exist in the shared packages? If yes, use it. If no, create it in the right shared location, not inline.

### 2. Parse at the Boundary

**Validate data at entry points. Never inside business logic.**

- All external data (HTTP, queues, databases, files) must be validated at the boundary layer (Repo or Runtime) using a schema validator.
- Once data has crossed the boundary, treat it as trusted and typed.
- Do not probe or guess data shapes inside Service or UI layers.
- Use typed SDKs wherever available. If an SDK is absent, define a schema and validate explicitly.

### 3. Structured Logging Only

**Never use unstructured log strings.**

- All log lines must be structured (key-value pairs, not free-form strings).
- Log level must be explicit and appropriate.
- Include context fields: `domain`, `operation`, `trace_id` at minimum.
- Linting enforces this on every file.

### 4. Naming Conventions Are Enforced

**Schema, type, and file names follow consistent conventions.**

- Types: `PascalCase` nouns (e.g. `UserProfile`, `InvoiceLineItem`)
- Schemas: `<type>Schema` suffix (e.g. `UserProfileSchema`)
- Files: `kebab-case` (e.g. `user-profile.ts`, `invoice-line-item.ts`)
- Tests: co-located with the file they test, `*.test.ts`

Violations are flagged by linter with remediation instructions.

### 5. File Size Limits

**No file should exceed the established line limit.**

Large files are a signal that a module has grown beyond its intended scope. When a file approaches the limit:

- Split into sub-modules by responsibility
- Extract shared logic into a utility
- Do not simply suppress the lint warning

### 6. 100% Test Coverage on Shared Utilities

All shared utility packages must have 100% test coverage. No exceptions.
Application code targets coverage thresholds defined per domain in the quality scorecard.

### 7. No Silent Failures

**All errors must be surfaced, logged, and handled explicitly.**

- Never swallow exceptions silently.
- Never return `null` or `undefined` where a typed result or explicit error is expected.
- Use typed result types (`Result<T, E>`) for operations that can fail predictably.

---

## Taste Invariants (Mechanically Enforced)

These invariants are encoded in linters and CI. They apply to every line of code, always.

| Invariant | Enforcement |
|---|---|
| Structured logging only | Custom lint rule |
| Schema/type naming conventions | Custom lint rule |
| File size limits | Custom lint rule |
| Layer dependency directions | Structural test + lint |
| No cross-domain imports except via Providers | Structural test + lint |
| Parse at the boundary | Lint rule on Repo/Runtime layer |
| Shared utils preferred over inline | Lint rule detecting duplication patterns |
| Platform-specific reliability requirements | Custom lint rule per platform |

> Lint error messages must include **remediation instructions**, not just violation descriptions. An error message is also a prompt for the next agent run.

> [!TIP]
> In a human-first workflow, these rules might feel pedantic or constraining. **With agents, they become multipliers**: once encoded, they apply everywhere at once, on every line of code, on every PR. The ROI of strict enforcement is fundamentally different in an agent-first world.

---

## Continuous Garbage Collection

### What It Is

A set of background agent tasks running on a regular cadence that:

- Scan the codebase for pattern deviations against golden principles
- Update per-domain quality grades in the quality scorecard
- Open targeted refactoring PRs for detected violations
- Flag stale documentation for fix-up

### Why It Works

- PRs are small, focused, and reviewable in under a minute
- Most can be automerged if CI passes and no human flag is raised
- Technical debt is paid down continuously in micro-increments
- Bad patterns are caught daily, not weekly or monthly

> **Technical debt is like a high-interest loan**: it's almost always better to pay it down continuously in small increments than to let it compound and tackle it in painful bursts. Human taste is captured once, then enforced continuously on every line of code.

### Garbage Collection Agents and Their Cadence

| Agent | Frequency | Output |
|---|---|---|
| Pattern deviation scan | Daily | Refactoring PRs |
| Doc freshness check | Daily | Fix-up PRs |
| Quality grade update | Weekly | Updated quality scorecard |
| Tech debt triage | Weekly | Updated `tech-debt-tracker.md` |
| Architecture drift check | Per PR | CI block on violation |

---

## Quality Scorecard

Each domain and architectural layer is graded on:

| Dimension | What Is Graded |
|---|---|
| **Test coverage** | % lines/branches covered |
| **Architecture compliance** | No layer violations detected |
| **Documentation freshness** | All docs verified < 30 days |
| **Shared utility adoption** | No inline duplication of shared code |
| **Lint health** | Zero lint errors |

The scorecard lives at `docs/exec-plans/quality-scorecard.md` and is updated by the weekly quality grade agent.

---

## QA at Scale

As agent code throughput increases, **human QA capacity becomes the bottleneck**. This is a known trajectory, not an edge case. The solution is to progressively shift QA to the agent itself.

### The QA Progression

| Stage | Who Does QA | Trigger to Advance |
|---|---|---|
| **Stage 1: Manual QA** | Humans check agent output manually | Too slow; throughput exceeds human review capacity |
| **Stage 2: Agent-Assisted QA** | Agents run checks; humans review results | Human review is still the bottleneck |
| **Stage 3: Agent-Driven QA** | Agents reproduce bugs, validate fixes, record videos; humans approve only judgment calls | Target state |

Reducing the human QA surface area is a **first-class engineering goal**, not an optimisation. Every investment in application legibility (observability, CDP-driven UI, per-worktree isolation) directly reduces the human QA surface.

See [`meta/OBSERVABILITY.md`](./OBSERVABILITY.md) for the tooling that enables Stage 3.

---

## Throughput and Velocity Health Signals

Agent-first development has an inverted throughput curve: velocity should **increase** as the team grows, not plateau. This is the health signal that the multiplier is working.

### Reference Baseline (from OpenAI's Harness Engineering experience)

- The team estimates they built the product **in ~1/10th the time** it would have taken to write the code by hand
- ~1,500 PRs merged in 5 months with a team starting at 3 engineers
- Average throughput: **≥ 3 PRs per engineer per day**
- Throughput increased as team grew from 3 → 7 engineers
- Total output: ~1,000,000 lines of code across all categories in ~5 months

### Health Signals

| Signal | Healthy | Needs Attention |
|---|---|---|
| PR throughput per engineer/day | ≥ 3 | < 1 |
| Throughput as team grows | Increases | Plateaus or decreases |
| Human QA time per PR | Decreasing | Increasing |
| Friday cleanup time | Near zero | > 10% of week |
| Background agent fix PRs reviewable in < 1 min | > 90% | < 70% |

> If velocity is decreasing as the team grows, the bottleneck is almost always in the scaffolding: missing tools, stale docs, or underspecified architecture. Invest there first.

---

## Feedback Loop: Taste into Tooling

Human taste enters the system through:

1. **Review comments** — captured and turned into documentation updates
2. **Refactoring PRs** — patterns the human corrected once become patterns the agent avoids forever
3. **User-facing bugs** — root-cause patterns are encoded as lint rules or architectural constraints
4. **Design discussions** — any team alignment decision is encoded as a design doc before the conversation ends

> When documentation falls short of preventing a pattern, promote the rule into code (lint or structural test). Code enforcement always wins over documentation alone.

---

## The Merge Philosophy

In an agent-throughput world, conventional merge gates become counterproductive when misapplied.

### Principles

- **PRs are short-lived.** Open, reviewed, and merged quickly.
- **Corrections are cheap.** A follow-up PR to fix a small issue is preferable to blocking the pipeline.
- **Waiting is expensive.** Agent time waiting on a blocked PR is waste.
- **Test flakes get follow-up runs**, not indefinite blocks.
- **Blocking gates are reserved** for architecture violations, security issues, and broken CI — not stylistic preferences.

### What Must Always Block

- Architecture boundary violations
- Security issues
- CI failures
- Missing tests for new public utilities

### What Should Not Block

- Minor style inconsistencies (encode the preference, then auto-fix)
- Test flakes on unrelated modules
- Documentation gaps in non-critical areas (open a follow-up ticket)

---

## Further Reading

- [AGENTS.md](./AGENTS.md) — top-level navigation map
- [ARCHITECTURE.md](./ARCHITECTURE.md) — structural rules and domain model
- [KNOWLEDGE.md](./KNOWLEDGE.md) — knowledge management practices
- `docs/exec-plans/quality-scorecard.md` — current per-domain quality grades
- `docs/exec-plans/tech-debt-tracker.md` — known debt and prioritisation
