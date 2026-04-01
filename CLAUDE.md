# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **knowledge base and research repository** for Harness Engineering — the AI-first development methodology where humans design environments and agents write the code. There is no traditional build system, test suite, or application code. The deliverables are structured Markdown documents.

## Organizing Framework: 3-Pillar + 1-Foundation

All content is organized under this canonical structure. When editing or creating documents, always align to it:

```json
[
  { "layer": "Foundation: Infrastructure", "role": "Execution engine & orchestration", "verb": "Execute" },
  { "layer": "Pillar 1: Context Engineering", "role": "Memory, knowledge, real-time data", "verb": "Inform" },
  { "layer": "Pillar 2: Architectural Constraints", "role": "Mechanical enforcement of boundaries", "verb": "Constrain" },
  { "layer": "Pillar 3: Entropy Management", "role": "Long-term codebase health", "verb": "Maintain" }
]
```

**Foundation** features (10): Bash Sandboxes, Filesystem, Git & File Locking, Verification (Self & Collective), Ralph Loops, Orchestration Logic, Rippable Middleware, Escalation Policies & Audit Trails, Harness Versioning, Smart Command Wrappers, Inter-Agent Communication (The Mailbox)

**Pillar 1** features (10): Repository as Truth, Context Compaction & Memory Management, Tool Offloading, Progressive Skills, Observability / Dashboards, Web Search & MCP Integration, Planning, Task Lists & Blackboards, Context Anchoring, Branch-Based Cognitive Memory, Requirements Ledger

**Pillar 2** features (5): Automated Linters, Dependency Enforcement, AI Auditors & Collaboration Channels, Bounded Autonomy & Access Control, Upstream Intake Gate

**Pillar 3** features (4): Scheduled Cleanups, Documentation Sync, Pattern Auditing, Consolidation Loop

## Directory Layout

- `framework/` — **Canonical source of truth.** Core framework definitions (29 features), enhancement options, and prevention checklist. All other docs must be consistent with these files.
- `research/` — Analysis, principles, and commentary documents. Must align with `framework/` (enforced by the `/revise-comments` workflow).
- `references/` — Original source articles (reference material, rarely modified).
- `builder/` — Build logs for the `harnessing-agents` skill optimization.
- `tmp/` — Working documents and drafts.
- `.agent/workflows/` — Agent workflow definitions.

## Workflows

### `/polish` — Feature Polishing & Addition Workflow

Run this workflow when you encounter a new architectural requirement, a powerful organizational concept, or a "weak" existing feature that needs to be escalated or enriched. It handles both the conceptual design (polishing) and the mechanical execution of adding or updating features across the canonical definitions and `harnessing-agents` skill files.

### `/cognitive-branch` — Branch-Based Task Execution

Enforces P1-9 by breaking down complex parent tasks into isolated git sub-task tracking branches. Builds cognitive memory through explicit "approval of evidence" commit messages before recursive merging.

### `/reconcile` — Workspace Entropy Audit

Systematically audits the entire workspace for entropy: broken content, inconsistent terminology, duplication, orphan concepts, and concept chain gaps. Produces a findings report, applies approved fixes, and commits.

### `/mount` — Mount a Framework Feature

Transitions a defined HE feature from concept to live infrastructure. Designs the physical files, injects recall hooks into `CLAUDE.md`, seeds historical data, and creates a dedicated maintenance workflow.

### `/revise-comments` — Consistency Check

Compares each `research/` document against canonical `framework/` definitions. Fixes structural conflicts (wrong pillars, naming, placement). Renames files using max-5-word Title Case names with `HE` or `MAS` prefix.

### `/anchor` — Anchor Management

Add, review, or prune context anchor records in `ANCHORS.md` to maintain strategic continuity across sessions.

### `/build` — Project Build

Orchestrates multi-phase project builds with structured planning and execution.

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
- **When Making Decisions:** Write new anchor records to `ANCHORS.md` (using the `/anchor` workflow) when you resolve ambiguities, add new features, or alter the framework. Reference existing anchors (e.g., "per A3") in your reasoning.

## Conventions

- **File naming:** Title Case with spaces, max 5 words. Use `HE` prefix for general docs, `MAS` for multi-agent specific content.
- **Consistency rule:** `framework/` is the single source of truth. Never contradict it in `research/` or other directories.
- **Gap evaluation:** Use `framework/HE Gap Evaluation Framework.md` for multi-dimensional assessment of harness implementations. It provides per-feature gap signals, improvement policies, dependency maps, and cross-cutting evaluation perspectives.
- **Unified features:** All 29 features are defined once in `HE Core Features.md`. Each feature description covers both single-agent and multi-agent behavior inline — no separate SAS/MAS documents.
- **Commit style:** `feat:` and `docs:` prefixes with descriptive messages.
