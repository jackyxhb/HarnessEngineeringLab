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
| **What to Do** | What should this feature look like when implemented? | `references/he-chain-foundation.md`, `references/he-chain-context.md`, `references/he-chain-constraints-entropy.md` — per-feature definitions (SAS + MAS) |
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

## How to Use (3 Modes)

### Mode 1: Quick Scan — `"run a quick harness scan"`
Runs the 32-item yes/no checklist against the target project. Produces a maturity level score.
- **Time:** ~5 min
- **Reference:** `references/he-quick-start.md`
- **Output:** `.harness/HE-SCOPE.md`

### Mode 2: Full Audit — `"run a full harness audit"`
Complete 6-phase lifecycle: Scope → Gap Analysis → Scoring → Planning → Execution → Verification.
- **Time:** 30–60 min
- **Reference:** `references/he-full-audit.md`
- **Output:** `.harness/HE-CLUES.md`, `.harness/HE-PRIORITIES.md`, `.harness/HE-IMPLEMENTATION-PLAN.md`, `.harness/HE-CHANGE-SUMMARY.md`, `.harness/HE-ASSESSMENT-REPORT.md`

### Mode 3: Feature Lookup — `"look up P0-9"` or `"explain Smart Command Wrappers"`
Look up a specific feature's 3-step chain (What to Do → Don't Do → Options).
- **Time:** ~2 min
- **Reference:** `references/he-chain-foundation.md` (P0-1–P0-11), `references/he-chain-context.md` (P1-1–P1-12), `references/he-chain-constraints-entropy.md` (P2-1–P3-4)

### Internal Tools (used within Full Audit, not user-invoked)

These are used automatically during a full audit — users do not need to invoke them directly:
- `references/he-scoring.md` — 6-dimension scoring + priority formula (Phase 2)
- `references/he-scoping-evaluation.md` — 4 scoping dimensions (Phase 0)
- `references/he-subagent-prompts.md` — parallel agent dispatch prompts (Phase 1)
- `references/he-cascade-analysis.md` — feature dependency maps (Phase 2)

## Output Directory Convention

All output artifacts produced by this skill (`HE-SCOPE.md`, `HE-CLUES.md`, `HE-PRIORITIES.md`, `HE-IMPLEMENTATION-PLAN.md`, `HE-CHANGE-SUMMARY.md`, `HE-ASSESSMENT-REPORT.md`) **MUST be written to `./.harness/`** in the target project root — never to the project root itself.

- Create the `.harness/` directory if it does not exist.
- All file references in plans, reports, and subagent outputs use the `.harness/` prefix (e.g., `.harness/HE-CLUES.md`).
- This prevents HE audit artifacts from cluttering the target project's root directory.

## Emphasize Automated Tooling

When auditing or remediating harness gaps, rely strictly on **mechanical enforcement** rather than manual observation.

- **Do Not rely on general conversational output:** Agents must use specific filesystem tools (`Glob`, `Grep`, `Read`) to explicitly scan targets such as `CLAUDE.md`, `.cursorrules`, `.github/workflows/`, `.husky/`, `.agent/`, and `AGENTS.md`.
- **Do Not assume architecture:** Always parse configuration targets natively.
- **Do Not stray from templates:** When gathering data, constructing plans, or reporting findings, rigidly adhere to output formats in the `templates/` directory.

## Core Templates

Templates define the format; output files are written to `.harness/` in the target project.

- `templates/HE-CLUES.md`: Clue collection format → output: `.harness/HE-CLUES.md`
- `templates/HE-IMPLEMENTATION-PLAN.md`: Tiered remediation plan → output: `.harness/HE-IMPLEMENTATION-PLAN.md`
- `templates/HE-CHANGE-SUMMARY.md`: Per-agent change summary → output: `.harness/HE-CHANGE-SUMMARY.md`
- `templates/HE-ASSESSMENT-REPORT.md`: Before/after milestone report → output: `.harness/HE-ASSESSMENT-REPORT.md`
