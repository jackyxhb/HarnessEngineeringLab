# AGENTS.md

This file is the **IDE-agnostic canonical source** of all project rules for AI agents. Every agentic IDE — Claude Code, VS Code / GitHub Copilot, Cursor, Windsurf, and any future environment — must be able to discover and load these rules. IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) are thin shims that point here.

> **P0-11 Portable Agent Surface:** If a rule isn't in this file, it isn't portable. Never store project-wide rules exclusively in an IDE's proprietary memory system.

## Repository Purpose

This repository's active product surface is the **Harness Engineering framework** in `framework/` plus the released **`harnessing-agents` skill** in `.agent/skills/harnessing-agents/`. It is a framework-first repository for the AI-first development methodology where humans design environments and agents write the code. This repository has a dual role: target projects are harnessed by running the `harnessing-agents` skill in their own agentic environment, and this repository self-hosts by running that same skill on itself to set up and improve its own harness. There is no traditional build system or application code; the deliverables are the canonical framework documents under `framework/`, the released skill surface under `.agent/skills/harnessing-agents/`, and the harness files that protect both.

## Organizing Framework: 3-Pillar + 1-Foundation

All content is organized under this canonical structure. When editing or creating documents, always align to it:

```json
[
  { "layer": "Foundation: Infrastructure (Execute)", "role": "Execution engine & orchestration", "verb": "Execute" },
  { "layer": "Pillar 1: Context Engineering (Inform)", "role": "Memory, knowledge, real-time data", "verb": "Inform" },
  { "layer": "Pillar 2: Architectural Constraints (Constrain)", "role": "Mechanical enforcement of boundaries", "verb": "Constrain" },
  { "layer": "Pillar 3: Entropy Management (Maintain)", "role": "Long-term codebase health", "verb": "Maintain" }
]
```

**Foundation** features (11): Bash Sandboxes, Filesystem, Git & File Locking, Verification (Self & Collective), Ralph Loops, Orchestration Logic, Rippable Middleware, Escalation Policies & Audit Trails, Harness Versioning, Smart Command Wrappers, Inter-Agent Communication (The Mailbox), Portable Agent Surface

**Pillar 1** features (12): Repository as Truth, Context Compaction & Memory Management, Tool Offloading, Progressive Skills, Observability / Dashboards, Web Search & MCP Integration, Planning, Task Lists & Blackboards, Context Anchoring, Branch-Based Cognitive Memory, Requirements Ledger, Socratic Questioning, Skill Engineering

**Pillar 2** features (5): Automated Linters, Dependency Enforcement, AI Auditors & Collaboration Channels, Bounded Autonomy & Access Control, Upstream Intake Gate

**Pillar 3** features (4): Scheduled Cleanups, Documentation Sync, Pattern Auditing, Consolidation Loop

## Directory Layout

- `framework/` — **Canonical knowledge source.** Core framework definitions (32 features), 19 engineering principles, and enhancement options that the skill loads and applies.
- `.agent/skills/harnessing-agents/` — **Released product skill surface.** The skill that audits and improves target projects and that this repository also runs on itself.
- `.agent/workflows/` — Active agent workflow definitions that operate on the canonical framework surface.
- `scripts/` — Active harness tooling that validates and audits the canonical framework surface and released skill surface.
- `docs/` — Non-core support material. It is not part of the active project surface and must not be treated as authoritative unless the user explicitly asks to work there.
- `tmp/` — Working documents and drafts.

## Workflows

### `/polish` — Feature Polishing & Addition Workflow

Run this workflow when you encounter a new architectural requirement, a powerful organizational concept, or a "weak" existing feature that needs to be escalated or enriched. It handles both the conceptual design (polishing) and the mechanical execution of adding or updating features across the canonical definitions and `harnessing-agents` skill files.

### `/cognitive-branch` — Branch-Based Task Execution

Enforces P1-9 by breaking down complex parent tasks into isolated git sub-task tracking branches. Builds cognitive memory through explicit "approval of evidence" commit messages before recursive merging.

### `/reconcile` — Workspace Entropy Audit

Systematically audits the entire workspace for entropy: broken content, inconsistent terminology, duplication, orphan concepts, and concept chain gaps. Produces a findings report, applies approved fixes, and commits.

### `/mount` — Mount a Framework Feature

Transitions a defined HE feature from concept to live infrastructure. Designs the physical files, injects recall hooks into `AGENTS.md`, seeds historical data, and creates a dedicated maintenance workflow.

### `/revise-comments` — Consistency Check

Legacy workflow for reconciling support material against canonical `framework/` definitions. Use only when the user explicitly asks to maintain `docs/research/` or related support material.

### `/anchor` — Anchor Management

Add, review, or prune context anchor records in `ANCHORS.md` to maintain strategic continuity across sessions.

### `/ccp` — Claude Commit & Push

Intelligent commit workflow: stages changes, generates descriptive commit messages, and pushes to remote.

### `/ccpr` — Claude Commit, Push & Release

Extended commit workflow: commits, pushes, creates a pull request, and after merge creates a GitHub release with version tag and release notes.

## Task Execution & Cognitive Memory

To preserve tracking history and prevent monolithic execution failures, agents must exercise **P1-9 Branch-Based Cognitive Memory**.

- **Crucial Hook:** When given a complex feature, refactor, or multi-step objective, **do not** execute it in a single unbroken stream on `main`. You must use the `/cognitive-branch` workflow to partition the work, check out isolated sub-task tracking branches, commit incremental progress to build cognitive memory, and recursively merge back.

## Context Anchoring

To prevent strategic drift across context window resets, agents rely on **Anchors** (P1-8).

- **At Session Start:** Always read `ANCHORS.md` in the root directory to re-establish the project's strategic goals and major architectural decisions.
- **For Multi-Step Tasks:** Read `REQUIREMENTS.md` and `PLANS.md` before starting. Append a new plan entry for any task requiring more than 3 sequential steps, and cite the relevant requirement IDs.
- **When Making Decisions:** Write new anchor records to `ANCHORS.md` (using the `/anchor` workflow) when you resolve ambiguities, add new features, or alter the framework. Reference existing anchors (e.g., "per A3") in your reasoning.

## Available Tools & Commands

All available tools and scripts. Undeclared tools do not exist for agents — if a tool is useful but not listed, add it here rather than using it undocumented.

- `npm run smoke` — Fast HE consistency check (he-lint.js only). Run before any commit to verify feature IDs and pillar labels. Target runtime < 2s.
- `npm run check` — Full quality gate: markdownlint + cspell + he-lint.js. Equivalent to what CI runs. Use before pushing.
- `npm run ci` — Alias for `npm run check`. Use in automated contexts.
- `npm run audit` — Structural integrity audit: verifies the active harness files exist, workflows are registered, tmp/ is clean, and anchor count is healthy. Exit 0 = PASS.
- `node scripts/he-lint.js` — Canonical HE consistency checker for the active framework surface. Runs on `git commit` (pre-commit hook) and in CI on every push/PR.
- `/reconcile` — Manual entropy audit workflow. Run when content drift is suspected or after large structural changes. Requires agent invocation.
- `/polish` — Feature polishing + addition workflow. Use when adding or upgrading framework features.
- `/cognitive-branch` — Complex task execution with branch memory (P1-9). Use for any multi-step objective.
- `/ccp` — Intelligent commit wrapper: stages, generates message, and pushes.
- `/ccpr` — Commit + push + PR + release wrapper.
- `/anchor` — Add, review, or prune context anchor records in `ANCHORS.md`.
- `/revise-comments` — Legacy consistency check for support material. Run only when explicitly maintaining `docs/research/` against `framework/`.

## DO NOT

Explicit forbidden operations. Each entry states the action and the consequence of performing it. Each rule traces to an Engineering Principle — see `framework/HE Index.md` and `framework/principles/` for full chains.

- **`EP-11` Never edit `framework/` files to resolve a support-material inconsistency by matching the wrong definition.** Consequence: bad content enters canonical truth. Action: if support material must be kept, update it to match `framework/`; otherwise leave the support material non-authoritative.
- **`EP-14`, `EP-2` Never start multi-step planning or execution without citing requirement IDs from `REQUIREMENTS.md` in `PLANS.md`.** Consequence: unregistered work bypasses the intake gate, breaks planning traceability, and weakens self-hosted enforcement of P1-10/P2-5.
- **`EP-11` Never add a rule to this file without a concrete incident, failure, or constraint that justifies it.** Consequence: generic rules are ignored by agents trained to find mechanically-enforced constraints; the next `/reconcile` run will flag and remove them.
- **`EP-15` Never bypass pre-commit hooks with `git commit --no-verify`.** Consequence: `he-lint` violations enter the repository and CI will reject the push.
- **`EP-11` Never treat anything under `docs/` as canonical project truth.** Consequence: support material can override the framework in agent reasoning and create silent harness drift. Action: prefer `framework/` for all decisions; only edit or reference `docs/` when explicitly requested.
- **`EP-11` Never create SAS-only or MAS-only variants of core feature definitions.** Consequence: parallel files diverge and agents load contradictory definitions. All 32 features are unified through `framework/HE Index.md` and single DAG node files (per A4).
- **`EP-11` Never introduce a new workflow or script without adding it to `## Available Tools & Commands`.** Consequence: the tool is invisible to agents and effectively non-existent as a harness resource.
- **`EP-2` Never mark a `PLANS.md` entry status as `done` without moving it to the Completed Plans section.** Consequence: task history is lost; future agents cannot examine resolved blocking issues, constraints applied, or decisions made during the task — rebuilding that context costs a full conversation replay.
- **`EP-15` Never push to `main` when `npm run audit` exits with FAIL.** Consequence: a structurally degraded harness enters the main branch; missing critical files are invisible to agents until the next weekly GC remediation cycle completes.
- **`EP-10` Never store project-wide rules exclusively in an IDE-specific file or proprietary memory system.** Consequence: agents running in other IDEs cannot discover the rules, fragmenting the harness. All global rules must live in `AGENTS.md`; IDE-specific files are shims only (per A8).
- **`EP-15` Never deploy advisory or warning-level CI checks; all checks must be binary pass/fail.** Consequence: agents ignore warnings — only hard failures drive behavior change. Advisory warnings accumulate silently until they cascade into hard-to-diagnose failures.
- **`EP-3` Never attribute an agent failure to the agent without first diagnosing the harness (1. Is the constraint in AGENTS.md? → 2. Is there a CI gate? → 3. Does the error message include remediation?).** Consequence: skipping harness diagnosis means the root cause (missing rule, missing gate, unclear error message) persists and the same failure recurs in every future agent run.
- **`EP-9` Never choose bleeding-edge or poorly-documented technology stacks for agent-authored code without explicit justification.** Consequence: agents generate more hallucinations and incorrect patterns with novel frameworks lacking training-data representation, increasing correction overhead and token waste.

## Conventions

- **File naming:** Title Case with spaces, max 5 words. Use `HE` prefix for general docs, `MAS` for multi-agent specific content. Violation causes naming entropy that breaks cross-link validation and file-search heuristics.
- **Consistency rule:** `framework/` is the single source of truth for Harness Engineering definitions. The released skill in `.agent/skills/harnessing-agents/` must derive from and stay consistent with `framework/`. Never define or validate framework truth from `docs/`; support material may be stale or disposable.
- **Dual-mode contract:** This repository both ships the `harnessing-agents` skill for target-project use and self-hosts by running that same skill on itself. If a document claims local enforcement, the claim must map to an actual repo gate; if it describes how the skill should act in a target project, frame it as skill behavior or target-project requirement.
- **Gap evaluation:** Use `framework/HE Index.md` to navigate feature nodes for multi-dimensional assessment of harness implementations. The `framework/features/` directory provides per-feature gap signals, improvement policies, and dependency maps, while `framework/cross-cutting/` contains evaluation perspectives.
- **Unified features:** All 32 features are defined once as single files in `framework/features/`. Each feature description covers both single-agent and multi-agent behavior inline — no separate SAS/MAS documents. Creating split files causes definitions to diverge; `he-lint.js` will catch the count mismatch.
- **Commit style:** `feat:` and `docs:` prefixes with descriptive messages. Generic messages like "update docs" block downstream automation from extracting semantic change history.
- **Rule entries:** Every rule added to `AGENTS.md` must state the consequence of violation. Generic advice (e.g., "follow best practices") will be removed on the next `/reconcile` run.
- **IDE shim pattern (P0-11):** `AGENTS.md` is the canonical rule surface. IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) must be thin shims that reference `AGENTS.md` and contain only IDE-specific overrides. When rules change, update `AGENTS.md` first, then verify shims remain consistent.
- **Machine-Readability First (P1-1):** Prioritize JSON or structured code blocks over Markdown tables for all framework data (measurables, dependency graphs, scoring matrices). Consequence: Markdown tables are difficult for agents to parse deterministically; JSON allows for reliable automation and state management.
