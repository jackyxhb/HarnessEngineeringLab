# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a **knowledge base and research repository** for Harness Engineering — the AI-first development methodology where humans design environments and agents write the code. There is no traditional build system, test suite, or application code. The deliverables are structured Markdown documents.

## Organizing Framework: 3-Pillar + 1-Foundation

All content is organized under this canonical structure. When editing or creating documents, always align to it:

| Layer | Role | SAS Verb | MAS Verb |
|---|---|---|---|
| **Foundation: Infrastructure** | Execution engine & orchestration | Verify & Correct | Execute, Orchestrate & Verify |
| **Pillar 1: Context Engineering** | Memory, knowledge, real-time data | Inform | Inform & Synchronize |
| **Pillar 2: Architectural Constraints** | Mechanical enforcement of boundaries | Constrain | Constrain & Protect |
| **Pillar 3: Entropy Management** | Long-term codebase health | Maintain | Maintain & Reconcile |

**Foundation** features: Bash Sandboxes, Filesystem & Git, Self-Verification, Ralph Loops, Orchestration Logic, Rippable Middleware, Escalation Policies, Harness Versioning

**Pillar 1** features: Repository as Truth, Context Compaction, Tool Offloading, Progressive Skills, Observability/Dashboards, Web Search & MCP, Planning & State Files

**Pillar 2** features: Automated Linters, Dependency Enforcement, AI Auditors

**Pillar 3** features: Scheduled Cleanups, Documentation Sync, Pattern Auditing

## Directory Layout

- `HESkill/` — **Canonical source of truth.** Core framework definitions for SAS and MAS, enhancement options, and prevention checklist. All other docs must be consistent with these files.
- `comments/` — Analysis, principles, and commentary documents. Must align with `HESkill/` (enforced by the `/revise-comments` workflow).
- `origins/` — Original source articles (reference material, rarely modified).
- `CaseStudy/` — Real-world case studies (e.g., SMS Agent design).
- `HESamples/` — Sample implementations.
- `tmp/` — Working documents and drafts.
- `.agent/workflows/` — Agent workflow definitions.

## Workflows

### `/he-newfeature` — Add a Feature to the Framework

Requires: feature name, target pillar, actions/tools description, prevention points. Updates the `~/.gemini/antigravity/skills/harnessing-agents/` skill files first, then propagates to local `HESkill/` and `comments/` docs. Verifies aspect counts and sequential numbering across all files.

### `/revise-comments` — Consistency Check

Compares each `comments/` document against canonical `HESkill/` definitions. Fixes structural conflicts (wrong pillars, naming, placement). Renames files using max-5-word Title Case names with `HE` or `MAS` prefix.

## Conventions

- **File naming:** Title Case with spaces, max 5 words. Use `HE` prefix for general docs, `MAS` for multi-agent specific content.
- **Consistency rule:** `HESkill/` is the single source of truth. Never contradict it in `comments/` or other directories.
- **SAS vs MAS:** Single Agent Systems vs Multi-Agent Systems. MAS extends SAS with inter-agent communication, file locking, collective verification, bounded autonomy, and diverse collaboration.
- **Commit style:** `feat:` and `docs:` prefixes with descriptive messages.
