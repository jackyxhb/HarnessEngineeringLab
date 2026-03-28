---
name: harnessing-agents
version: "1.1.0"
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

This skill synthesizes Harness Engineering into a structured framework:
1. **4 Scoping Dimensions:** The high-level pillars of the harness.
2. **25 Core Features:** Specific, testable capabilities within each dimension.
3. **Evaluation Framework (0-5):** Multi-dimensional gap assessment and maturity scoring.
4. **Automated Remediations:** Executable runbooks to automatically close gaps using integrated filesystem tools (`list_dir`, `grep_search`, `write_to_file`).

## Context & Action Space Optimization

To prevent hallucination and token-bloat, this skill strictly enforces LLM Action Space Optimization principles:
- **Progressive Context Loading:** Do not pre-read all reference files. Only load templates or dense framework files exactly when required by the workflow phase.
- **Trajectory Reduction:** After completing any major phase (e.g. Inspect), you must summarize the findings into the requested template, and then consciously "flush" the raw file contents from your active working memory before proceeding to the next phase to avoid context rot.
- **ReAct Formatting:** When analyzing gaps, wrap your logical deductions in `<scratchpad>` or `<thought>` tags before generating final template outputs.

## When to Use

- Setting up agent scaffolding or development environments.
- Addressing agent failures, hallucinations, or context loss.
- Establishing multi-agent systems (MAS) and managing coordination overhead.
- Auditing existing AI infrastructure for gaps and vulnerabilities.

## Quick Routing (Decision Tree)

| Goal | Start Here | Estimated Time |
| --- | --- | --- |
| **Quick gap scan:** Rapidly assess maturity against the 25 core features | `references/quick-checklist.md` | 5 min |
| **Full audit:** Run the complete Inspect → Plan → Execute lifecycle | `references/workflow.md` | 30-60 min |
| **Score gaps:** Evaluate individual features across 6 dimensions (0-5) | `references/gap-scoring.md` | 15 min |
| **Feature deep dive:** Look up the definition and policies of a specific feature | `references/features-foundation.md` or `references/features-pillars.md` | 2 min |
| **Scope an audit:** Understand the evaluation and Scoping dimensions | `references/dimensions.md` | 5 min |
| **Run Subagents:** Ready-to-use prompts for delegating gap audits | `references/agent-prompts.md` | 2 min |
| **Cascade Analysis:** Map feature dependencies and upstream failures | `references/dependencies.md` | 5 min |

## Emphasize Automated Tooling

When auditing or remediating harness gaps, rely strictly on **mechanical enforcement** rather than manual observation.

- **Do Not rely on general conversational output:** Agents must use specific filesystem tools (`list_dir`, `grep_search`, `view_file`) to explicitly scan targets such as `.cursorrules`, `.windsurfrules`, `.github/workflows/`, `.husky/`, `.agents/`, and `AGENTS.md`.
- **Do Not assume architecture:** Always parse configuration targets natively.
- **Do Not stray from templates:** When gathering data, constructing plans, or reporting findings, you must rigidly adhere to output formats located in the `templates/` directory.

## Core Templates

- `templates/he-clues.md`: Clue collection format (gap analysis)
- `templates/implementation-plan.md`: Tiered remediation plan format
- `templates/change-summary.md`: Per-agent change summary
- `templates/assessment-report.md`: Before/after milestone report
