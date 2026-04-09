---
name: harnessing-agents
version: "4.1.0"
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

This live-linked skill is the delivery mechanism for applying that framework in real projects. Target projects are currently harnessed by linking this skill into their own agentic environment, and HELab self-hosts by running the same skill on itself. Its metadata version mirrors HELab's root version because the skill is currently part of HELab rather than an independently packaged release. The shipped skill runtime carries its own synchronized `framework/` mirror so target-project execution does not depend on sibling HELab paths.

The primary success criterion for HELab and for this skill is **target-project delivery effectiveness**: the skill should be able to inspect, plan, apply, and verify the full Harness Engineering feature set in external projects. HELab self-hosting is the proving loop for that goal, not a substitute for it.

**Core principle (EP-15):** When an agent fails, fix the environment — not the code. Add a mechanical guardrail (test, linter, structural constraint) so the agent self-corrects.

## Framework Architecture — DAG Navigation

All framework knowledge is organized as a **Directed Acyclic Graph (DAG)**. Inside the shipped skill, the `framework/` paths below refer to the bundled runtime mirror under this skill directory. In HELab, the root `framework/` remains canonical and must be synced into that mirror before merge. Navigate via the index:

1. **Entry point:** `framework/HE Index.md` — JSON-based index with L1+L2 inline metadata for all 32 features, 19 principles, and 6 cross-cutting concerns.
2. **Feature files:** one file per feature under `framework/features/`, containing the full L1→L5 vertical chain slice (principle → enhancement → design → actions/prevention → measurement). Resolve the exact path from the `file` field in `framework/HE Index.md` rather than inferring filenames.
3. **Principle files:** `framework/principles/EP-{num}.md` — one file per engineering principle, listing governed features.
4. **Cross-cutting:** `framework/cross-cutting/` — concerns spanning multiple features (reward engineering, token economics, SAS→MAS readiness, prevention checklist, evaluation dimensions, perspectives).
5. **Chain model:** `framework/HE Principle Practice Chain.md` — the L1→L5 methodology.
6. **Execution procedure:** `framework/HE Harnessing Protocol.md` — step-by-step audit workflow.

**Navigation protocol:** Read `framework/HE Index.md` first → identify the target feature ID → use the matching `file` field from the index JSON to open the canonical feature file (for example `P2-3` resolves to `framework/features/P2-03.md`) → read only the specific files needed. Never pre-read all feature files.

## When to Use

- Setting up agent scaffolding or development environments.
- Addressing agent failures, hallucinations, or context loss.
- Establishing multi-agent systems (MAS) and managing coordination overhead.
- Auditing existing AI infrastructure for gaps and vulnerabilities.

## How to Use (2 Modes)

Route by keyword in the user's input. If no keyword matches, **default to Mode 1 (Full Audit)**.

| Keyword | Mode | What It Does | Time |
| --- | --- | --- | --- |
| **`full`** | Full Audit | 6-phase lifecycle: Scope → Gaps → Score → Plan → Execute → Verify | 30–60 min |
| **`feature`** | Feature Lookup | Look up a specific feature's full L1→L5 chain | ~2 min |

### Mode 1: Full Audit — keyword: `full` (DEFAULT)
Complete 6-phase lifecycle: Scope → Gap Analysis → Scoring → Planning → Execution → Verification.
- **Reference:** `references/he-full-audit.md`
- **Navigation:** For each gap, read the specific `framework/features/P*.md` file to access L4 actions, L4 prevention, and L5 improvement policies.
- **Lifecycle discipline:** When the audit will touch a live target repository, also use `references/he-harness-injection-protocol-draft.md` to classify slots, distinguish staging versus live operational touch-points, and control when mutation is allowed.
- **Output:** `.harness/HE-CLUES.md`, `.harness/HE-PRIORITIES.md`, `.harness/HE-IMPLEMENTATION-PLAN.md`, `.harness/HE-CHANGE-SUMMARY.md`, `.harness/HE-ASSESSMENT-REPORT.md`

### Mode 2: Feature Lookup — keyword: `feature`
Look up a specific feature's full chain (L1 Principle → L2 Enhancement → L3 Design → L4 Actions/Prevention → L5 Gaps/Measurement). The user should specify a feature ID (e.g., `P0-9`) or feature name.
- **Navigation:** Read `framework/HE Index.md` → find the requested feature ID in the JSON → open the exact canonical path in that feature's `file` field. Do not guess unpadded paths such as `framework/features/P2-3.md`.
- **Traceability:** If the user asks for requirement traceability, read the root `REQUIREMENTS.md` ledger. Do not look under `docs/` for canonical requirements.
- **Output Template:** Use `templates/HE-FEATURE-LOOKUP.md` as the response shape for Mode 2.
- **Canonical Source Rule:** `Feature` metadata (`ID`, `Name`, `Pillar`, `Governed By`, `L1`, `L2`) must match the `framework/HE Index.md` entry for the requested feature exactly. Do not substitute alternate pillar labels, principle IDs, or renamed summaries from other docs.
- **Chain Source Rule:** `L3`, `L4`, `L5`, and dependency details must be grounded in the canonical feature file referenced by the index `file` field.

#### Mode 2 Output Contract

Mode 2 responses must not stop after printing the feature chain. After presenting the chain, feature lookup must make any suggested next actions **state-aware** and must emit the required sections below.

Before suggesting next actions:

1. Read the root `REQUIREMENTS.md` to see whether the requested feature already has a governing requirement in this repository.
2. Read `PLANS.md` and `REVIEWS.md` when the workspace is HELab to determine whether the feature has already been implemented, mounted, or recently hardened here.
3. Check whether the user explicitly named a target project. If not, do not invent one.
4. Confirm the current workspace identity from the actual repository you are inspecting. If no explicit project name is available, use neutral wording like `this workspace` or `HELab` rather than inventing a name.

Rules for suggested next actions:

- Do **not** suggest “add a requirement” if an existing requirement already authorizes the relevant work.
- Do **not** suggest “implement in HELab” if the feature has already been mounted or materially hardened in HELab.
- If the feature is already implemented in HELab, prefer suggestions like refining the delivery pattern, extending verification, or applying the feature to a target project.
- If no target project was explicitly named, use generic wording such as “apply to a target project” rather than guessing a repository name.
- If the target project **was** explicitly named, use that exact project name and no other.
- Do **not** relabel the pillar, governing EP, or chain text with alternate terminology once the canonical index/feature-file values are known.
- Do **not** attribute `Current State` findings to another workspace or repository unless the user explicitly named that target and the agent actually inspected it.

The purpose of Mode 2 is not just to explain the feature. It must suggest the next valid action from the **current repository state**.

#### Required Mode 3 Response Shape

Every Mode 3 response must follow `templates/HE-FEATURE-LOOKUP.md` and contain these sections, in order:

1. `Feature` — the canonical feature name and ID.
2. `Chain` — the L1→L5 breakdown.
3. `Current State` — a short statement of what the repository already has for this feature, grounded in the relevant requirement/review/plan state when the workspace is HELab.
4. `Next Valid Actions` — 1 to 3 concrete next actions that are valid from the current state.

Minimum requirements:

- `Feature` metadata must match the canonical `framework/HE Index.md` row for the requested feature.
- `Current State` must explicitly say whether the feature already appears implemented, mounted, hardened, or still missing in HELab.
- `Next Valid Actions` must always be present. A chain-only response is incomplete.
- A field/value extraction table is not a valid final response shape unless the user explicitly asked for a table.
- If the feature is already implemented in HELab, at least one next action should shift outward toward delivery refinement, verification hardening, or application in a target project.
- If the user only asked for lookup and no action is needed, `Next Valid Actions` may say that no new HELab work is currently required and then name the next externalization step.
- If the current workspace has not been explicitly named by the user, `Current State` must use `this workspace` or `HELab` rather than inventing a repository name.

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

All audit artifacts produced by this skill (`HE-SCOPE.md`, `HE-CLUES.md`, `HE-PRIORITIES.md`, `HE-IMPLEMENTATION-PLAN.md`, `HE-CHANGE-SUMMARY.md`, `HE-ASSESSMENT-REPORT.md`) **MUST be written to `./.harness/`** in the target project root — never to the project root itself.

- Create the `.harness/` directory if it does not exist.
- All file references in plans, reports, and subagent outputs use the `.harness/` prefix (e.g., `.harness/HE-CLUES.md`).
- This prevents HE audit artifacts from cluttering the target project's root directory.

Mounted harness assets are different: when a remediation batch installs real infrastructure in the target project (for example `AGENTS.md`, `REVIEWS.md`, hooks, or CI files), those assets must be written to their canonical project locations rather than into `.harness/`.

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

## Mounting Assets

Some features require reusable root-level harness assets in target projects. Use these assets when the implementation plan calls for them.

- `templates/HE-REVIEWS.md`: Root review-ledger template for mounting P2-3 independent review in a target project.
- `references/he-p2-3-review-mount-pattern.md`: Canonical target-project remediation pattern for mounting P2-3 review gating.

## Feature Implementation Guides

Use feature implementation guides when a feature gap has already been identified and the skill needs concrete target-project execution steps instead of abstract L4-only guidance.

- `references/he-feature-implementation-guide-pattern.md`: Canonical shape for execution-oriented feature guides.
- `references/he-p0-1-bash-sandbox-mount-pattern.md`: Concrete target-project remediation pattern for mounting P0-1 bash-sandbox infrastructure.
- `references/he-p0-3-verification-mount-pattern.md`: Concrete target-project remediation pattern for mounting P0-3 verification.
- `references/he-p1-7-planning-mount-pattern.md`: Concrete target-project remediation pattern for mounting P1-7 planning infrastructure.
- `references/he-p1-10-requirements-ledger-mount-pattern.md`: Concrete target-project remediation pattern for mounting P1-10 requirements-ledger infrastructure.
- `references/he-p2-5-intake-gate-mount-pattern.md`: Concrete target-project remediation pattern for mounting P2-5 intake-gate enforcement.
- `references/he-first-mount-governance-mount-pattern.md`: Concrete Feature Package mount pattern for the first-mount governance Repo Profile.

If a feature-specific implementation guide exists, prefer it during Phase 3 planning and Phase 4 execution before falling back to the abstract L4 section in `framework/features/P*.md`.

When the harness-injection protocol classifies a target repository under the **first-mount governance** Repo Profile, prefer `references/he-first-mount-governance-mount-pattern.md` as the Feature Package execution layer and sequence the batch through `AGENTS.md`, `REQUIREMENTS.md`, `PLANS.md`, `REVIEWS.md`, and lightweight document-integrity verification. See `framework/HE-Terms.md` for the boundary between framework terms and skill-side execution terms.

## Harness Injection Lifecycle Draft

Use `references/he-harness-injection-protocol-draft.md` when the skill needs to reason about *how* it should move through a target repository, not just *what* feature it should mount.

The draft defines:

- slot classes
- concrete touch-point classes
- lifecycle phases for staging versus live mutation
- safety levels for repo surfaces
- proof requirements for counting a harness injection as real

This is currently a permanent skill-side execution asset, not yet a canonical `framework/` concept.

## Deployment

This skill is maintained directly in the HELab workspace. To make it available globally across all projects, ensure the global symlink is active:

```bash
ln -sfn /Users/macbook1/work/HE/HELab/.agent/skills/harnessing-agents ~/.agents/skills/harnessing-agents
```

Verify with: `ls -la ~/.agents/skills/harnessing-agents/SKILL.md`
