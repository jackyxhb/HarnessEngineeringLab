# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **knowledge base and research repository** for Harness Engineering — the AI-first development methodology where humans design environments and agents write the code. There is no traditional build system, test suite, or application code. The deliverables are structured Markdown documents.

## Organizing Framework: 3-Pillar + 1-Foundation

All content is organized under this canonical structure. When editing or creating documents, always align to it:

| Layer                                   | Role                                 | SAS Verb  | MAS Verb                      |
| --------------------------------------- | ------------------------------------ | --------- | ----------------------------- |
| **Foundation: Infrastructure**          | Execution engine & orchestration     | Execute   | Execute, Orchestrate & Verify |
| **Pillar 1: Context Engineering**       | Memory, knowledge, real-time data    | Inform    | Inform & Synchronize          |
| **Pillar 2: Architectural Constraints** | Mechanical enforcement of boundaries | Constrain | Constrain & Protect           |
| **Pillar 3: Entropy Management**        | Long-term codebase health            | Maintain  | Maintain & Reconcile          |

**Foundation** features (9): Bash Sandboxes, Filesystem & Git, Self-Verification, Ralph Loops, Orchestration Logic, Rippable Middleware, Escalation Policies, Harness Versioning, Smart Command Wrappers

**Pillar 1** features (10): Repository as Truth, Context Compaction, Tool Offloading, Progressive Skills, Observability/Dashboards, Web Search & MCP, Planning & State Files, Context Anchoring, Branch-Based Cognitive Memory, Requirements Ledger

**Pillar 2** features (5): Automated Linters, Dependency Enforcement, AI Auditors, Bounded Autonomy, Upstream Intake Gate

**Pillar 3** features (4): Scheduled Cleanups, Documentation Sync, Pattern Auditing, Consolidation Loop

## Directory Layout

- `framework/` — **Canonical source of truth.** Core framework definitions for SAS and MAS, enhancement options, and prevention checklist. All other docs must be consistent with these files.
- `research/` — Analysis, principles, and commentary documents. Must align with `framework/` (enforced by the `/revise-comments` workflow).
- `references/` — Original source articles (reference material, rarely modified).
- `case-studies/` — Real-world case studies (e.g., SMS Agent design).
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
- **SAS vs MAS:** Single Agent Systems vs Multi-Agent Systems. MAS extends SAS with inter-agent communication, file locking, collective verification, bounded autonomy, and diverse collaboration.
- **Commit style:** `feat:` and `docs:` prefixes with descriptive messages.
