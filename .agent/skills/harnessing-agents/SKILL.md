---
name: harnessing-agents
version: "4.0.0"
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

**Harness Engineering** is the discipline of designing the infrastructure, constraints, and feedback loops that surround an AI agent to make it productive, safe, and self-correcting. The framework spans 32 features across Foundation + 3 Pillars, organized through the Principle-to-Practice Chain (L1→L5).

**Core principle (EP-15):** When an agent fails, fix the environment — not the code. Add a mechanical guardrail (test, linter, structural constraint) so the agent self-corrects.

## 3-Step Assessment Chain

Every feature in this skill is assessed through a unified chain:

| Step | Question | Reference Source |
| --- | --- | --- |
| **What to Do** | What should this feature look like when implemented? | `references/features-foundation.md`, `references/features-pillar1.md`, `references/features-pillar2-3.md` — per-feature definitions (SAS + MAS) |
| **Don't Do** | What failure mode does this feature prevent? | Same files — per-feature "Don't Do" section, sourced from `framework/HE Negative Actions.md` |
| **Options** | What concrete actions and tools can implement it? | Same files — per-feature "Options" section, sourced from `framework/HE Actions Tools.md` |

Each feature reference includes all three steps plus **Remediation Tiers** (Tier 1 = immediate, Tier 2 = optimization).

## Canonical Sources

All skill content derives from these framework documents:

- `framework/HE Principle Map.md` — L1 Engineering Principles (EP-1 through EP-19) and L1→L5 chains for all 32 features
- `framework/HE Design Decisions.md` — L3 design patterns and feature definitions
- `framework/HE Actions Tools.md` — L4 concrete actions and tools
- `framework/HE Negative Actions.md` — L4 prevention constraints
- `framework/HE Inverse Outcomes.md` — L5 gap signals, 6 evaluation dimensions (chain-level mapped)
- `framework/HE Principle Practice Chain.md` — Chain model meta-document

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

```json
[
  { "goal": "Quick gap scan — assess maturity against 32 core features",       "start": "references/quick-checklist.md",       "time": "5 min" },
  { "goal": "Full audit — Inspect → Plan → Execute lifecycle",                "start": "references/workflow.md",              "time": "30-60 min" },
  { "goal": "Feature deep dive — 3-step chain (What / Don't / Options)",      "start": ["references/features-foundation.md", "references/features-pillar1.md", "references/features-pillar2-3.md"], "time": "2 min" },
  { "goal": "Score & analyze gaps — 6 dimensions + priority formula",         "start": "references/gap-scoring.md",           "time": "15 min" },
  { "goal": "Scope an audit — calibrate 4 scoping dimensions",               "start": "references/dimensions.md",            "time": "5 min" },
  { "goal": "Run Subagents — dispatch parallel gap audits",                   "start": "references/agent-prompts.md",         "time": "2 min" },
  { "goal": "Cascade analysis — feature dependencies & failure chains",       "start": "references/dependencies.md",          "time": "5 min" }
]
```

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
