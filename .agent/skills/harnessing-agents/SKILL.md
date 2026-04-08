---
name: harnessing-agents
version: "3.3.2"
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

This live-linked skill is the delivery mechanism for applying that framework in real projects. Target projects are currently harnessed by linking this skill into their own agentic environment, and HELab self-hosts by running the same skill on itself. Its metadata version mirrors HELab's root version because the skill is currently part of HELab rather than an independently packaged release.

The primary success criterion for HELab and for this skill is **target-project delivery effectiveness**: the skill should be able to inspect, plan, apply, and verify the full Harness Engineering feature set in external projects. HELab self-hosting is the proving loop for that goal, not a substitute for it.

**Core principle (EP-15):** When an agent fails, fix the environment — not the code. Add a mechanical guardrail (test, linter, structural constraint) so the agent self-corrects.

## Framework Architecture — DAG Navigation

All framework knowledge is organized as a **Directed Acyclic Graph (DAG)**. Navigate via the index:

1. **Entry point:** `framework/HE Index.md` — JSON-based index with L1+L2 inline metadata for all 32 features, 19 principles, and 6 cross-cutting concerns.
2. **Feature files:** `framework/features/P{pillar}-{num}.md` — one file per feature, containing the full L1→L5 vertical chain slice (principle → enhancement → design → actions/prevention → measurement).
3. **Principle files:** `framework/principles/EP-{num}.md` — one file per engineering principle, listing governed features.
4. **Cross-cutting:** `framework/cross-cutting/` — concerns spanning multiple features (reward engineering, token economics, SAS→MAS readiness, prevention checklist, evaluation dimensions, perspectives).
5. **Chain model:** `framework/HE Principle Practice Chain.md` — the L1→L5 methodology.
6. **Execution procedure:** `framework/HE Harnessing Protocol.md` — step-by-step audit workflow.

**Navigation protocol:** Read `HE Index.md` first → identify target feature IDs → read only the specific `features/P*.md` files needed. Never pre-read all feature files.

## When to Use

- Setting up agent scaffolding or development environments.
- Addressing agent failures, hallucinations, or context loss.
- Establishing multi-agent systems (MAS) and managing coordination overhead.
- Auditing existing AI infrastructure for gaps and vulnerabilities.

## How to Use (3 Modes)

Route by keyword in the user's input. If no keyword matches, **default to Mode 1 (Quick Scan)**.

| Keyword | Mode | What It Does | Time |
| --- | --- | --- | --- |
| **`scan`** | Quick Scan | 32-item yes/no checklist → maturity score | ~5 min |
| **`full`** | Full Audit | 6-phase lifecycle: Scope → Gaps → Score → Plan → Execute → Verify | 30–60 min |
| **`feature`** | Feature Lookup | Look up a specific feature's full L1→L5 chain | ~2 min |

### Mode 1: Quick Scan — keyword: `scan` (DEFAULT)
Runs the 32-item yes/no checklist against the target project. Produces a maturity level score.
- **Reference:** `framework/HE Index.md` — check each feature's L2 targeted enhancement for presence in the target project.
- **Navigation:** Read `framework/HE Index.md` for the feature list with L1+L2 inline; check each feature's presence in the target project.
- **Output:** `.harness/HE-SCOPE.md`

### Mode 2: Full Audit — keyword: `full`
Complete 6-phase lifecycle: Scope → Gap Analysis → Scoring → Planning → Execution → Verification.
- **Reference:** `references/he-full-audit.md`
- **Navigation:** For each gap, read the specific `framework/features/P*.md` file to access L4 actions, L4 prevention, and L5 improvement policies.
- **Output:** `.harness/HE-CLUES.md`, `.harness/HE-PRIORITIES.md`, `.harness/HE-IMPLEMENTATION-PLAN.md`, `.harness/HE-CHANGE-SUMMARY.md`, `.harness/HE-ASSESSMENT-REPORT.md`

### Mode 3: Feature Lookup — keyword: `feature`
Look up a specific feature's full chain (L1 Principle → L2 Enhancement → L3 Design → L4 Actions/Prevention → L5 Gaps/Measurement). The user should specify a feature ID (e.g., `P0-9`) or feature name.
- **Navigation:** Read `framework/HE Index.md` → find feature ID → read `framework/features/{id}.md`.

### Internal Tools (used within Full Audit, not user-invoked)

These are used automatically during a full audit — users do not need to invoke them directly:
- `references/he-scoring.md` — 6-dimension scoring + priority formula (Phase 2)
- `references/he-subagent-prompts.md` — parallel agent dispatch prompts (Phase 1)
- `framework/HE Index.md` — feature dependency maps (`downstream`, `impact_weight`) used by Phase 2 prioritization

## Context & Action Space Optimization

To prevent hallucination and token-bloat, this skill strictly enforces LLM Action Space Optimization principles:
- **Progressive Context Loading:** Do not pre-read all feature files. Read the index first, then load only the specific feature files needed for the current task.
- **Trajectory Reduction:** After completing any major phase (e.g. Inspect), summarize findings into the requested template, then flush raw file contents from active working memory before proceeding.
- **ReAct Formatting:** When analyzing gaps, wrap logical deductions in `<scratchpad>` or `<thought>` tags before generating final template outputs.

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

## Deployment

This skill is maintained directly in the HELab workspace. To make it available globally across all projects, ensure the global symlink is active:

```bash
ln -sfn /Users/macbook1/work/HE/HELab/.agent/skills/harnessing-agents ~/.agents/skills/harnessing-agents
```

Verify with: `ls -la ~/.agents/skills/harnessing-agents/SKILL.md`
