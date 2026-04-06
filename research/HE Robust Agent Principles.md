# HE Robust Agent Principles

How to Create a Robust Agent — General Principles, distilled from OpenAI's Harness Engineering experience and broader agent design patterns.

> _Canonical framework: `framework/HE Index.md` | Feature definitions: `framework/features/`_

## 1. Design the Environment, Not Just the Agent

> _"The discipline shows up in the scaffolding, not the code."_

The agent is only as good as the environment it operates in. Invest in:

- **Structured, discoverable context** — give the agent a map, not a manual
- **Clear boundaries and constraints** — what it can and cannot do
- **Feedback loops** — how it knows if it succeeded or failed

---

## 2. Make Everything Legible

If the agent can't see it, it can't act on it:

- **Observable state** — logs, metrics, traces must be queryable by the agent
- **Repository as the single source of truth** — no tribal knowledge, no chat-only decisions
- **Typed, validated data** — parse at the boundary, never guess shapes

---

## 3. Enforce Invariants Mechanically

Don't rely on the agent's "memory" or "judgment" for rules that must always hold:

- **Linting and CI gates** catch violations automatically
- **Error messages include remediation instructions** — they're prompts for the next run
- **Taste is encoded once, enforced everywhere** — review comments → docs → lint rules → CI checks

---

## 4. Progressive Disclosure Over Information Dumps

- Short, stable entry point (like `AGENTS.md`) that teaches where to look
- Layer context by relevance: entry point → task-specific → architectural → deep docs
- **Precision beats volume** — more context is not always better

---

## 5. Design for the Feedback Loop, Not the Happy Path

- **When something fails, ask**: _"What capability is missing?"_ — not _"try harder"_
- **Escalation is correct behavior**, not failure — exhaust agent-available signals first
- **Corrections are cheap, waiting is expensive** — optimize for throughput, not perfection per step

---

## 6. Isolate and Contain

- Each agent task runs in its own **isolated environment** (e.g., per-worktree)
- No shared mutable state between concurrent tasks
- Ephemeral resources are torn down after the task — no cross-contamination

---

## 7. Prefer Boring, Composable Tools

Technologies the agent can reason about accurately share three traits:

- **Stable, well-documented APIs** — less drift from training data
- **Composable and predictable** — easy to reason about in isolation
- **Well-represented in the training set** — mainstream > niche

When upstream is opaque, **reimplement the needed subset** rather than wrapping blindly.

---

## 8. Build for Autonomy Incrementally (P2-4)

The autonomy ladder:

1. Agent does the work, **human reviews everything**
2. Agent reviews its own work, **human spot-checks**
3. Agent reviews agent work, **human intervenes only on judgment calls**
4. Full end-to-end: validate → fix → test → record evidence → merge

Each stage requires **more scaffolding**, not less human investment.

---

## 9. Continuous Garbage Collection

Agents replicate patterns they see — including bad ones. Combat entropy with:

- **Background cleanup agents** scanning for deviations on a regular cadence
- **Quality scorecards** tracking per-domain health
- **Small, frequent fix-up PRs** — pay down tech debt like a high-interest loan

---

## 10. Encode Human Judgment So It Compounds (P1-8)

Human taste enters the system through:

1. **Review comments** → documentation updates
2. **Bug patterns** → lint rules or architectural constraints
3. **Design discussions** → versioned design docs

> The goal: **capture judgment once, enforce it continuously on every line of code.**

---

## The Meta-Principle

A robust agent isn't one that's smarter — it's one that operates in a well-designed environment with clear boundaries, observable state, and mechanical enforcement of the rules that matter.

**The human's job shifts from writing code to designing the system that makes the agent effective.**
