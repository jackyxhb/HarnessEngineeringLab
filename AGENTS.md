# AGENTS.md

This file is the **IDE-agnostic canonical source** of all project rules for AI agents. Every agentic IDE — Claude Code, VS Code / GitHub Copilot, Cursor, Windsurf, and any future environment — must be able to discover and load these rules. IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) are thin shims that point here.

> **P0-11 Portable Agent Surface:** If a rule isn't in this file, it isn't portable. Never store project-wide rules exclusively in an IDE's proprietary memory system.

## Repository Purpose

This is a **knowledge base and research repository** for Harness Engineering — the AI-first development methodology where humans design environments and agents write the code. There is no traditional build system, test suite, or application code. The deliverables are structured Markdown documents.

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

- `framework/` — **Canonical source of truth.** Core framework definitions (32 features), 19 engineering principles, and enhancement options. All other docs must be consistent with these files.
- `research/` — Analysis, principles, and commentary documents. Must align with `framework/` (enforced by the `/revise-comments` workflow).
- `references/` — Original source articles (reference material, rarely modified).
- `.agent/workflows/` — Agent workflow definitions.
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

Compares each `research/` document against canonical `framework/` definitions. Fixes structural conflicts (wrong pillars, naming, placement). Renames files using max-5-word Title Case names with `HE` or `MAS` prefix.

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
- **For Multi-Step Tasks:** Read `PLANS.md` to check for active plans before starting. Append a new plan entry for any task requiring more than 3 sequential steps.
- **When Making Decisions:** Write new anchor records to `ANCHORS.md` (using the `/anchor` workflow) when you resolve ambiguities, add new features, or alter the framework. Reference existing anchors (e.g., "per A3") in your reasoning.

## Available Tools & Commands

All available tools and scripts. Undeclared tools do not exist for agents — if a tool is useful but not listed, add it here rather than using it undocumented.

- `npm run smoke` — Fast HE consistency check (he-lint.js only). Run before any commit to verify feature IDs and pillar labels. Target runtime < 2s.
- `npm run check` — Full quality gate: markdownlint + cspell + he-lint.js. Equivalent to what CI runs. Use before pushing.
- `npm run ci` — Alias for `npm run check`. Use in automated contexts.
- `npm run audit` — Structural integrity audit: verifies all required harness files exist, workflows are registered, tmp/ is clean, and anchor count is healthy. Exit 0 = PASS.
- `node scripts/he-lint.js` — Canonical HE consistency checker. Runs on `git commit` (pre-commit hook) and in CI on every push/PR. Run manually before committing docs changes.
- `/reconcile` — Manual entropy audit workflow. Run when content drift is suspected or after large structural changes. Requires agent invocation.
- `/polish` — Feature polishing + addition workflow. Use when adding or upgrading framework features.
- `/cognitive-branch` — Complex task execution with branch memory (P1-9). Use for any multi-step objective.
- `/ccp` — Intelligent commit wrapper: stages, generates message, and pushes.
- `/ccpr` — Commit + push + PR + release wrapper.
- `/anchor` — Add, review, or prune context anchor records in `ANCHORS.md`.
- `/revise-comments` — Consistency check between `research/` and `framework/`. Run after editing canonical framework docs.

## DO NOT

Explicit forbidden operations. Each entry states the action and the consequence of performing it. Each rule traces to an Engineering Principle — see `framework/HE Index.md` and `framework/principles/` for full chains.

- **`EP-11` Never edit `framework/` files to resolve a `research/` inconsistency by matching the wrong definition.** Consequence: bad content enters canonical truth. Action: update `research/` to match `framework/`, or run `/revise-comments`.
- **`EP-11` Never add a rule to this file without a concrete incident, failure, or constraint that justifies it.** Consequence: generic rules are ignored by agents trained to find mechanically-enforced constraints; the next `/reconcile` run will flag and remove them.
- **`EP-15` Never bypass pre-commit hooks with `git commit --no-verify`.** Consequence: `he-lint` violations enter the repository and CI will reject the push.
- **`EP-11` Never write directly to `references/` files.** Consequence: original source articles become contaminated; `references/` is read-only reference material. If a reference needs updating, flag it in `ANCHORS.md`.
- **`EP-11` Never create SAS-only or MAS-only variants of core feature definitions.** Consequence: parallel files diverge and agents load contradictory definitions. All 32 features are unified through `framework/HE Index.md` and single DAG node files (per A4).
- **`EP-11` Never introduce a new workflow or script without adding it to `## Available Tools & Commands`.** Consequence: the tool is invisible to agents and effectively non-existent as a harness resource.
- **`EP-2` Never mark a `PLANS.md` entry status as `done` without moving it to the Completed Plans section.** Consequence: task history is lost; future agents cannot examine resolved blocking issues, constraints applied, or decisions made during the task — rebuilding that context costs a full conversation replay.
- **`EP-8` Never add a file to `docs/` without registering its observable signals in `docs/OBSERVABILITY.md`.** Consequence: the new file becomes invisible to the harness audit signal table, enabling silent structural regressions that escape both pre-commit and the weekly GC scan.
- **`EP-15` Never push to `main` when `npm run audit` exits with FAIL.** Consequence: a structurally degraded harness enters the main branch; missing critical files are invisible to agents until the next weekly GC remediation cycle completes.
- **`EP-10` Never store project-wide rules exclusively in an IDE-specific file or proprietary memory system.** Consequence: agents running in other IDEs cannot discover the rules, fragmenting the harness. All global rules must live in `AGENTS.md`; IDE-specific files are shims only (per A8).
- **`EP-15` Never deploy advisory or warning-level CI checks; all checks must be binary pass/fail.** Consequence: agents ignore warnings — only hard failures drive behavior change. Advisory warnings accumulate silently until they cascade into hard-to-diagnose failures.
- **`EP-3` Never attribute an agent failure to the agent without first diagnosing the harness (1. Is the constraint in AGENTS.md? → 2. Is there a CI gate? → 3. Does the error message include remediation?).** Consequence: skipping harness diagnosis means the root cause (missing rule, missing gate, unclear error message) persists and the same failure recurs in every future agent run.
- **`EP-9` Never choose bleeding-edge or poorly-documented technology stacks for agent-authored code without explicit justification.** Consequence: agents generate more hallucinations and incorrect patterns with novel frameworks lacking training-data representation, increasing correction overhead and token waste.

## Conventions

- **File naming:** Title Case with spaces, max 5 words. Use `HE` prefix for general docs, `MAS` for multi-agent specific content. Violation causes naming entropy that breaks cross-link validation and file-search heuristics.
- **Consistency rule:** `framework/` is the single source of truth. Never edit `research/` to define a new framework concept — write it in `framework/` first, then align `research/` to it. Violating this creates silent forks where agents read contradictory definitions depending on which file they loaded first.
- **Gap evaluation:** Use `framework/HE Index.md` to navigate feature nodes for multi-dimensional assessment of harness implementations. The `framework/features/` directory provides per-feature gap signals, improvement policies, and dependency maps, while `framework/cross-cutting/` contains evaluation perspectives.
- **Unified features:** All 32 features are defined once as single files in `framework/features/`. Each feature description covers both single-agent and multi-agent behavior inline — no separate SAS/MAS documents. Creating split files causes definitions to diverge; `he-lint.js` will catch the count mismatch.
- **Commit style:** `feat:` and `docs:` prefixes with descriptive messages. Generic messages like "update docs" block downstream automation from extracting semantic change history.
- **Rule entries:** Every rule added to `AGENTS.md` must state the consequence of violation. Generic advice (e.g., "follow best practices") will be removed on the next `/reconcile` run.
- **IDE shim pattern (P0-11):** `AGENTS.md` is the canonical rule surface. IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) must be thin shims that reference `AGENTS.md` and contain only IDE-specific overrides. When rules change, update `AGENTS.md` first, then verify shims remain consistent.
