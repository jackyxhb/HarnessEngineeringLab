# HE-SCOPE

**Date:** 2026-04-14
**Auditor:** GitHub Copilot (GPT-5.4)
**Target:** HELab (self-host)

## Project Identity

- **Type:** Framework-first Harness Engineering repository with a live-linked delivery skill
- **Scale:** SAS-primary self-host with MAS-aware workflow surfaces
- **Tech Stack:** Node.js scripts, Markdown framework docs, JSON config, GitHub Actions, Husky, IDE-agent shims
- **Active Product Surfaces:** `framework/`, `.agent/skills/harnessing-agents/`, `.agent/workflows/`, `scripts/`
- **Version:** 4.1.1

## Injection Context Classification

Per `references/he-harness-injection-protocol-draft.md`:

| Touch-Point Class    | HELab Surfaces                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| **Observational**    | `framework/`, `REQUIREMENTS.md`, `PLANS.md`, `REVIEWS.md`, `ANCHORS.md`, `RELEASES.md`, `package.json` |
| **Planning**         | `.harness/HE-*.md`                                                                                     |
| **Live Operational** | `.agent/workflows/`, `scripts/`, `.github/workflows/`, `.husky/pre-commit`                             |
| **Contract**         | `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md`          |
| **Verification**     | `scripts/he-lint.js`, `scripts/harness/audit.sh`, `npm run check`, `npm run audit`                     |
| **Audit / History**  | `REVIEWS.md`, `RELEASES.md`, `.harness/agent-logs.jsonl`, `.harness/observation-report.json`           |
| **Volatile / Local** | `.serena/`, `.aider.tags.cache.v4/`, `.DS_Store`                                                       |

## Quick Scan — 32 Features vs. L2 Targets

### Foundation: Infrastructure (Execute)

| ID    | Feature                                 | Status              | Evidence                                                                                                                                                                      |
| ----- | --------------------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0-1  | Bash Sandboxes                          | **Present**         | `AGENTS.md` explicitly records sandbox risk acceptance for this docs-first repo; no build/deploy surface exists.                                                              |
| P0-2  | Filesystem, Git & File Locking          | **Present**         | Git-backed workspace, pre-commit gate, sync scripts, durable root ledgers.                                                                                                    |
| P0-3  | Verification (Self & Collective)        | **Present**         | `npm run smoke`, `npm run check`, `npm run audit`, `scripts/he-lint.js`, CI workflow, pre-commit hook.                                                                        |
| P0-4  | Ralph Loops                             | **Partial**         | `.harness/task-state.schema.json`, `scripts/task-state.js`, and `scripts/exit-interceptor.js` now exist, but ordinary multi-step work is not yet consistently routed through task-state. |
| P0-5  | Orchestration Logic                     | **Partial**         | 8 workflows and subagent-capable environments exist, but no router, topology selection, or queueing layer is checked in.                                                      |
| P0-6  | Rippable Middleware                     | **Present**         | Scripts, workflows, framework, and skill surfaces remain separable and can be synchronized independently.                                                                    |
| P0-7  | Escalation Policies & Audit Trails      | **Partial**         | `.harness/escalation-rules.json`, reinjection logging, and generated dashboard outputs now exist, but automated external notification remains MAS-dependent. |
| P0-8  | Harness Versioning                      | **Present**         | `package.json`, sync scripts, `RELEASES.md`, and he-lint parity checks enforce version integrity.                                                                             |
| P0-9  | Smart Command Wrappers                  | **Present**         | `npm run smoke/check/audit/sync:*` and Husky standardize common operations.                                                                                                   |
| P0-10 | Inter-Agent Communication (The Mailbox) | **Not Implemented** | No shared mailbox, message schema, or queue surface exists in the repo.                                                                                                       |
| P0-11 | Portable Agent Surface                  | **Present**         | Canonical `AGENTS.md` plus IDE shims (`CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `.github/copilot-instructions.md`).                                                      |

### Pillar 1: Context Engineering (Inform)

| ID    | Feature                                | Status      | Evidence                                                                                                                                                                |
| ----- | -------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1-1  | Repository as Truth                    | **Present** | Root governance docs and `framework/` remain the canonical source of truth.                                                                                             |
| P1-2  | Context Compaction & Memory Management | **Present** | `harnessing-agents` skill enforces progressive context loading and trajectory reduction checkpoints.                                                                    |
| P1-3  | Tool Offloading                        | **Present** | Full-audit skill explicitly limits reads, uses templates, and flushes raw context after major phases.                                                                   |
| P1-4  | Progressive Skills                     | **Present** | Skill has two modes, phased references, and template-driven outputs.                                                                                                    |
| P1-5  | Observability / Dashboards             | **Present** | `scripts/generate-observation-report.js` now generates richer `.harness/observation-report.json` output plus a live `.harness/dashboard.md`, and `audit.sh` verifies both. |
| P1-6  | Web Search & MCP Integration           | **Partial** | `.harness/mcp-capabilities.json` now provides a canonical capability manifest, but `.continue/mcpServers/` remains empty and no external lookup trail is logged. |
| P1-7  | Planning, Task Lists & Blackboards     | **Present** | Root `PLANS.md` and `.harness/HE-IMPLEMENTATION-PLAN.md` provide durable planning surfaces.                                                                             |
| P1-8  | Context Anchoring                      | **Present** | `ANCHORS.md` persists strategic decisions across sessions.                                                                                                              |
| P1-9  | Branch-Based Cognitive Memory          | **Present** | `/cognitive-branch` workflow and shipped mount pattern exist.                                                                                                           |
| P1-10 | Requirements Ledger                    | **Present** | `REQUIREMENTS.md` plus he-lint requirement-ID enforcement.                                                                                                              |
| P1-11 | Socratic Questioning                   | **Present** | `AGENTS.md` now defines a mandatory Socratic Pause Protocol for ambiguous work.                                                                                         |
| P1-12 | Skill Engineering                      | **Present** | The live-linked skill surface is modular, phased, and governed by the canonical skill standard.                                                                         |

### Pillar 2: Architectural Constraints (Constrain)

| ID   | Feature                              | Status      | Evidence                                                                                                                                                                  |
| ---- | ------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2-1 | Automated Linters                    | **Present** | markdownlint, cspell, he-lint, Husky, CI.                                                                                                                                 |
| P2-2 | Dependency Enforcement               | **Present** | he-lint validates structural dependency metadata and bundle parity on the active product surfaces.                                                                        |
| P2-3 | AI Auditors & Collaboration Channels | **Present** | `REVIEWS.md` plus review gating in he-lint and AGENTS contract.                                                                                                           |
| P2-4 | Bounded Autonomy & Access Control    | **Present** | `.harness/agent-permissions.json` now provides the canonical permission manifest, and `audit.sh` validates its presence and JSON integrity. |
| P2-5 | Upstream Intake Gate                 | **Present** | Requirement-gated planning is enforced via `PLANS.md`, `REQUIREMENTS.md`, and he-lint.                                                                                    |

### Pillar 3: Entropy Management (Maintain)

| ID   | Feature            | Status      | Evidence                                                                                               |
| ---- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------------ |
| P3-1 | Scheduled Cleanups | **Present** | Weekly GC workflow plus stale-file checks in `audit.sh`.                                               |
| P3-2 | Documentation Sync | **Present** | Sync scripts, release notes, and bundle parity checks keep docs and runtime aligned.                   |
| P3-3 | Pattern Auditing   | **Present** | he-lint, `/reconcile`, and periodic audit workflows enforce structural pattern consistency.            |
| P3-4 | Consolidation Loop | **Present** | Canonical root framework and bundled mirror stay synchronized via repo-native sync commands and gates. |

## Quick Scan Summary

- **Present:** 27 of 32
- **Partial:** 4 of 32 (`P0-4`, `P0-5`, `P0-7`, `P1-6`)
- **Not Implemented:** 1 of 32 (`P0-10`)

## Estimated Harness Maturity Level

**4.1 / 5** — Strong self-hosted governance and verification with only a narrow residual gap set. The remaining weaknesses are concentrated in operationalizing Ralph Loops for ordinary work, broadening escalation and external-lookup traceability, and the intentionally deferred MAS-only coordination surfaces.
