---
name: harnessing-agents
version: "3.0.0"
description: Evaluate and improve AI agent harness maturity for any project. Use when assessing existing agent infrastructure, designing new harness scaffolding, fixing repeated agent failures, scaling SAS to MAS, or running a full harness audit-and-improvement cycle (Inspect → Plan → Execute) to reach maximum maturity.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---

# Harnessing Agents

## Overview

**Harness Engineering** is the discipline of designing the infrastructure, constraints, and feedback loops that surround an AI agent to make it productive, safe, and self-correcting.

**Core principle:** When an agent fails, fix the environment — not the code. Add a mechanical guardrail (test, linter, structural constraint) so the agent self-corrects.

## 3-Step Assessment Chain

Every feature in this skill is assessed through a unified chain:

| Step | Question | Reference Source |
| --- | --- | --- |
| **What to Do** | What should this feature look like when implemented? | `references/features-foundation.md`, `references/features-pillar1.md`, `references/features-pillar2-3.md` — per-feature definitions (SAS + MAS) |
| **Don't Do** | What failure mode does this feature prevent? | Same files — per-feature "Don't Do" section, sourced from `framework/HE Prevention Checklist.md` |
| **Options** | What concrete actions and tools can implement it? | Same files — per-feature "Options" section, sourced from `framework/HE Enhancement Options.md` |

Each feature reference includes all three steps plus **Remediation Tiers** (Tier 1 = immediate, Tier 2 = optimization).

## Context & Action Space Optimization

To prevent hallucination and token-bloat, this skill strictly enforces LLM Action Space Optimization principles:
- **Progressive Context Loading:** Do not pre-read all reference files. Only load templates or dense framework files exactly when required by the workflow phase.
- **Trajectory Reduction:** After completing any major phase (e.g. Inspect), summarize findings into the requested template, then flush raw file contents from active working memory before proceeding.
- **ReAct Formatting:** When analyzing gaps, wrap logical deductions in `<scratchpad>` or `<thought>` tags before generating final template outputs.

## When to Use

- Setting up agent scaffolding or development environments.
- Addressing agent failures, hallucinations, or context loss.
- Establishing multi-agent systems (MAS) and managing coordination overhead.
- Auditing existing AI infrastructure for gaps and vulnerabilities.

## Quick Routing (Decision Tree)

| Goal | Start Here | Estimated Time |
| --- | --- | --- |
| **Quick gap scan:** Rapidly assess maturity against the 29 core features | `references/quick-checklist.md` | 5 min |
| **Full audit:** Run the complete Inspect → Plan → Execute lifecycle | `references/workflow.md` | 30-60 min |
| **Feature deep dive:** Look up the 3-step chain (What to Do / Don't Do / Options) for any feature | `references/features-foundation.md`, `references/features-pillar1.md`, or `references/features-pillar2-3.md` | 2 min |
| **Score & analyze gaps:** 6 evaluation dimensions, priority formula, and 5 cross-cutting perspectives | `references/gap-scoring.md` | 15 min |
| **Scope an audit:** Calibrate against 4 scoping dimensions before starting | `references/dimensions.md` | 5 min |
| **Run Subagents:** Ready-to-use prompts for delegating gap audits to parallel agents | `references/agent-prompts.md` | 2 min |
| **Cascade analysis:** Map feature dependencies and upstream failure chains | `references/dependencies.md` | 5 min |

## Emphasize Automated Tooling

When auditing or remediating harness gaps, rely strictly on **mechanical enforcement** rather than manual observation.

- **Do Not rely on general conversational output:** Agents must use specific filesystem tools (`Glob`, `Grep`, `Read`) to explicitly scan targets such as `CLAUDE.md`, `.cursorrules`, `.github/workflows/`, `.husky/`, `.agent/`, and `AGENTS.md`.
- **Do Not assume architecture:** Always parse configuration targets natively.
- **Do Not stray from templates:** When gathering data, constructing plans, or reporting findings, rigidly adhere to output formats in the `templates/` directory.

## Core Templates

- `templates/he-clues.md`: Clue collection format (gap analysis with 3-step chain references)
- `templates/implementation-plan.md`: Tiered remediation plan format
- `templates/change-summary.md`: Per-agent change summary
- `templates/assessment-report.md`: Before/after milestone report
