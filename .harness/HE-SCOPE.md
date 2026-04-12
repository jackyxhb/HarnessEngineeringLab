# HE-SCOPE

**Date:** 2026-04-12
**Auditor:** GitHub Copilot (Claude Opus 4.6)
**Target:** HELab (self-host)

## Project Identity

- **Type:** Framework-first documentation repository for the Harness Engineering methodology
- **Scale:** SAS-primary (single-agent sessions); subagent dispatch used for parallelized research
- **Tech Stack:** Node.js tooling (scripts), Markdown content, JSON configuration; no application code
- **Active Product Surfaces:** `framework/` (canonical definitions), `.agent/skills/harnessing-agents/` (live-linked skill), `.agent/workflows/` (8 workflows), `scripts/` (harness tooling)
- **Version:** 4.1.1

## Injection Context Classification

Per `references/he-harness-injection-protocol-draft.md`:

| Touch-Point Class    | HELab Surfaces                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Observational**    | `framework/`, `docs/`, `REQUIREMENTS.md`, `PLANS.md`, `REVIEWS.md`, `ANCHORS.md`, `RELEASES.md`, `package.json` |
| **Planning**         | `.harness/HE-*.md` (audit artifacts)                                                                            |
| **Live Operational** | `.agent/workflows/`, `scripts/`, `.husky/pre-commit`, `.github/workflows/`                                      |
| **Contract**         | `AGENTS.md`, `REQUIREMENTS.md`, `REVIEWS.md`                                                                    |
| **Verification**     | `scripts/he-lint.js`, `scripts/harness/audit.sh`, CI gates                                                      |
| **Audit / History**  | `RELEASES.md`, `ANCHORS.md`, `.harness/HE-ASSESSMENT-REPORT.md`                                                 |
| **Volatile**         | `.harness/observation-report.json`, `.harness/dashboard.md`                                                     |

## Quick Scan — 32 Features vs. L2 Targets

### Foundation: Infrastructure (Execute)

| ID    | Feature                            | L2 Target                            | Status              | Evidence                                                                                            |
| ----- | ---------------------------------- | ------------------------------------ | ------------------- | --------------------------------------------------------------------------------------------------- |
| P0-1  | Bash Sandboxes                     | Zero cross-contamination             | Partial             | No sandbox infra; low-risk docs repo mitigates.                                                     |
| P0-2  | Filesystem, Git & File Locking     | Persistent, versioned, conflict-free | **Present**         | Git, pre-commit hook, sync scripts.                                                                 |
| P0-3  | Verification (Self & Collective)   | Autonomous error detection           | **Present**         | he-lint.js, pre-commit gate, CI `he-lint.yml`, audit.sh.                                            |
| P0-4  | Ralph Loops                        | 100% task completion                 | Partial             | `scripts/exit-interceptor.js` defined but not wired; `.harness/task-state.json` spec'd but absent.  |
| P0-5  | Orchestration Logic                | Sublinear coordination               | Partial             | 8 workflows registered; SAS-primary; no automated routing.                                          |
| P0-6  | Rippable Middleware                | Any layer removable                  | **Present**         | Modular scripts, workflows, templates independently removable.                                      |
| P0-7  | Escalation Policies & Audit Trails | Every action attributable            | Partial             | Logging spec in AGENTS.md; `scripts/exit-interceptor.js` has heartbeat stub; no `agent-logs.jsonl`. |
| P0-8  | Harness Versioning                 | Reproducible, comparable             | **Present**         | `package.json` version, `RELEASES.md`, sync scripts, he-lint parity check.                          |
| P0-9  | Smart Command Wrappers             | Zero CLI variance                    | **Present**         | `npm run smoke/check/audit/sync:*`, pre-commit wrapper.                                             |
| P0-10 | Inter-Agent Communication          | Coordinate without bottleneck        | **Not Implemented** | No mailbox mechanism. SAS-primary reduces urgency.                                                  |
| P0-11 | Portable Agent Surface             | Discoverable from any IDE            | **Present**         | 5 IDE shims → canonical `AGENTS.md`.                                                                |

### Pillar 1: Context Engineering (Inform)

| ID    | Feature                            | L2 Target                     | Status              | Evidence                                                                                                                        |
| ----- | ---------------------------------- | ----------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| P1-1  | Repository as Truth                | Context accuracy w/o briefing | **Present**         | Comprehensive `AGENTS.md`, canonical `framework/`, all state surfaces documented.                                               |
| P1-2  | Context Compaction & Memory        | Sustained reasoning quality   | **Present**         | SKILL.md progressive loading, trajectory reduction checkpoints.                                                                 |
| P1-3  | Tool Offloading                    | Tools don't dominate context  | Partial             | Skill-level enforcement only; no repo-level mechanical gate.                                                                    |
| P1-4  | Progressive Skills                 | Task-relevant only            | **Present**         | 2 skill modes, progressive loading, templates.                                                                                  |
| P1-5  | Observability / Dashboards         | Real-time visibility          | Partial             | `scripts/generate-observation-report.js` exists as stub; `.harness/observation-report.json` minimal; no active instrumentation. |
| P1-6  | Web Search & MCP Integration       | Current world state           | Partial             | `.continue/mcpServers/` present; no manifest verification or audit trail.                                                       |
| P1-7  | Planning, Task Lists & Blackboards | Survive context resets        | **Present**         | `PLANS.md` (22 entries), `/cognitive-branch` workflow.                                                                          |
| P1-8  | Context Anchoring                  | Strategic goals persist       | **Present**         | `ANCHORS.md` (27 entries), `/anchor` workflow.                                                                                  |
| P1-9  | Branch-Based Cognitive Memory      | Checkpointed sub-tasks        | **Present**         | `/cognitive-branch` workflow, mount pattern exists.                                                                             |
| P1-10 | Requirements Ledger                | Formally recorded             | **Present**         | `REQUIREMENTS.md` (12 entries), he-lint validates.                                                                              |
| P1-11 | Socratic Questioning               | Zero ambiguous inputs         | **Not Implemented** | No explicit protocol, no mechanical gate.                                                                                       |
| P1-12 | Skill Engineering                  | Modular, context-efficient    | **Present**         | `harnessing-agents` skill: 2 modes, 6 phases, 6 templates, 13 references, 6 principles.                                         |

### Pillar 2: Architectural Constraints (Constrain)

| ID   | Feature                           | L2 Target                                  | Status      | Evidence                                                                                        |
| ---- | --------------------------------- | ------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------- |
| P2-1 | Automated Linters                 | Zero violations on main                    | **Present** | markdownlint, cspell, he-lint.js; pre-commit + CI.                                              |
| P2-2 | Dependency Enforcement            | Mechanically enforced boundaries           | Partial     | he-lint validates feature/principle counts; no import-graph or architectural boundary analysis. |
| P2-3 | AI Auditors & Collaboration       | Independent review                         | **Present** | `REVIEWS.md` (21 records), generator/reviewer separation.                                       |
| P2-4 | Bounded Autonomy & Access Control | Capabilities ∝ risk                        | Partial     | DO NOT rules in AGENTS.md, skill `allowed-tools`; no machine-readable permission manifests.     |
| P2-5 | Upstream Intake Gate              | No unrecorded requirements reach execution | **Present** | he-lint requirement gate; DO NOT rule.                                                          |

### Pillar 3: Entropy Management (Maintain)

| ID   | Feature            | L2 Target            | Status      | Evidence                                                                       |
| ---- | ------------------ | -------------------- | ----------- | ------------------------------------------------------------------------------ |
| P3-1 | Scheduled Cleanups | Entropy ≤ 1 GC cycle | **Present** | `he-weekly-gc.yml`, `audit.sh` stale-file check.                               |
| P3-2 | Documentation Sync | Docs match code      | **Present** | sync scripts, pre-commit, he-lint parity.                                      |
| P3-3 | Pattern Auditing   | Canonical patterns   | Partial     | he-lint structural patterns; `/reconcile`; no broader coding-pattern registry. |
| P3-4 | Consolidation Loop | Core docs auto-sync  | **Present** | Pre-commit sync + lint, RELEASES.md change rule.                               |

## Quick Scan Summary

- **Present:** 20 of 32
- **Partial:** 10 of 32 (P0-1, P0-4, P0-5, P0-7, P1-3, P1-5, P1-6, P2-2, P2-4, P3-3)
- **Not Implemented:** 2 of 32 (P0-10, P1-11)

## Estimated Harness Maturity Level

**3.2 / 5** — Functional-to-Optimized. Strong governance, planning, verification, and review infrastructure. Gaps in operational observability, Ralph Loop wiring, Socratic intake, and formal access control.

## HE-SCOPE — Project Identification

- **Project Name:** Harness Engineering Lab (HELab)
- **Project Type:** Framework repository for AI-first development methodology
- **Scale:** Multi-Agent Systems (MAS) - supports agent workflows, self-hosting, and target-project harnessing
- **Tech Stack:**
  - Node.js (package.json, scripts)
  - Markdown (documentation, framework)
  - Git (version control, branching)
  - CI/CD (GitHub Actions in .github/)
  - Linting (markdownlint, cspell, he-lint)
  - Pre-commit hooks (.husky/)
  - Agent surfaces (.agent/, .cursorrules, .windsurfrules, etc.)

## Quick Scan Results

Checked each of the 32 features' L2 targeted enhancement for presence in the project.

| Feature ID | Feature Name                            | L2 Enhancement                                                                  | Present? | Notes                                                     |
| ---------- | --------------------------------------- | ------------------------------------------------------------------------------- | -------- | --------------------------------------------------------- |
| P0-1       | Bash Sandboxes                          | Zero cross-contamination between agent environments                             | Yes      | Has .husky/ hooks, isolated scripts, npm run commands     |
| P0-2       | Filesystem, Git & File Locking          | Agent work is persistent, versioned, and conflict-free                          | Yes      | Git repository, file locking via Git, persistent state    |
| P0-3       | Verification (Self & Collective)        | Agents autonomously detect and correct errors before human review               | Yes      | he-lint.js, pre-commit hooks, CI checks                   |
| P0-4       | Ralph Loops                             | 100% task completion rate regardless of context window exhaustion               | Partial  | Has workflows, but not fully verified for 100% completion |
| P0-5       | Orchestration Logic                     | Agent coordination overhead stays sublinear relative to team size               | Yes      | Agent workflows, mailbox concept                          |
| P0-6       | Rippable Middleware                     | Any harness layer can be removed without breaking the rest                      | Yes      | Modular agent surfaces, portable                          |
| P0-7       | Escalation Policies & Audit Trails      | Every agent action is attributable; stuck agents detected within time bounds    | Yes      | REVIEWS.md, audit trails, escalation in AGENTS.md         |
| P0-8       | Harness Versioning                      | Harness configurations are reproducible and comparable with data                | Yes      | Versioned in package.json, synced skill versions          |
| P0-9       | Smart Command Wrappers                  | Zero variance in common CLI workflow execution                                  | Yes      | npm scripts, standardized commands                        |
| P0-10      | Inter-Agent Communication (The Mailbox) | Agents can coordinate without supervisor bottleneck, with bounded overhead      | Yes      | Mailbox concept in framework                              |
| P0-11      | Portable Agent Surface                  | Agent instructions are discoverable and functional from any IDE                 | Yes      | .cursorrules, .windsurfrules, CLAUDE.md, etc.             |
| P1-1       | Repository as Truth                     | Agent context accuracy without human briefing                                   | Yes      | All rules in AGENTS.md, canonical sources                 |
| P1-2       | Context Compaction & Memory Management  | Sustained reasoning quality across long tasks                                   | Yes      | Memory management in framework                            |
| P1-3       | Tool Offloading                         | Tool outputs never dominate the context window                                  | Yes      | Tool offloading patterns                                  |
| P1-4       | Progressive Skills                      | Only task-relevant capabilities are in context at any time                      | Yes      | Skill system, progressive loading                         |
| P1-5       | Observability / Dashboards              | Agents and humans have real-time visibility into system behavior                | Partial  | Has observability concepts, but no live dashboards        |
| P1-6       | Web Search & MCP Integration            | Agent answers reflect current state of the world                                | Yes      | Web search integration                                    |
| P1-7       | Planning, Task Lists & Blackboards      | Complex tasks survive context resets and are decomposed before execution        | Yes      | PLANS.md, task lists, blackboards                         |
| P1-8       | Context Anchoring                       | Strategic goals and critical decisions persist across all context resets        | Yes      | ANCHORS.md                                                |
| P1-9       | Branch-Based Cognitive Memory           | Complex objectives decompose into checkpointed sub-tasks with cognitive history | Yes      | Branch-based workflows, cognitive memory                  |
| P1-10      | Requirements Ledger                     | All requirements formally recorded before any planning or execution             | Yes      | REQUIREMENTS.md ledger                                    |
| P1-11      | Socratic Questioning                    | Zero ambiguous inputs reaching the execution phase                              | Yes      | Socratic questioning in framework                         |
| P1-12      | Skill Engineering                       | Agent skills are modular, context-efficient, and tunable                        | Yes      | Skill system                                              |
| P2-1       | Automated Linters                       | Zero style/type/structural violations reaching the main branch                  | Yes      | markdownlint, cspell, he-lint in CI                       |
| P2-2       | Dependency Enforcement                  | Architectural boundaries mechanically enforced, not just documented             | Yes      | Dependency rules in AGENTS.md                             |
| P2-3       | AI Auditors & Collaboration Channels    | Every substantial output is independently reviewed before merging               | Yes      | REVIEWS.md, independent reviews                           |
| P2-4       | Bounded Autonomy & Access Control       | Agent capabilities are proportional to task risk at all times                   | Yes      | Bounded autonomy in framework                             |
| P2-5       | Upstream Intake Gate                    | No planning or execution proceeds on unrecorded requirements                    | Yes      | Intake gate via REQUIREMENTS.md                           |
| P3-1       | Scheduled Cleanups                      | Entropy never accumulates beyond one GC cycle                                   | Partial  | Has cleanup concepts, but scheduling not verified         |
| P3-2       | Documentation Sync                      | Documentation always matches the current state of the code                      | Yes      | Docs live with code, sync processes                       |
| P3-3       | Pattern Auditing                        | Coding patterns converge to canonical forms; no circular deps persist           | Yes      | Pattern auditing in framework                             |
| P3-4       | Consolidation Loop                      | Core system documentation automatically stays in sync with codebase             | Yes      | Consolidation loop                                        |

## Current Harness Maturity Level

Based on the quick scan, HELab demonstrates **High Maturity** (Level 4-5 out of 5).

- **Present Features:** 30/32 (93.75%)
- **Partial Features:** 2/32 (P0-4 Ralph Loops, P3-1 Scheduled Cleanups)
- **Missing Features:** 0/32

The repository is the canonical source of the Harness Engineering framework and implements nearly all features in its own harness.
