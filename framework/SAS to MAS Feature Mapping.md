# SAS → MAS Feature Mapping

How each SAS core feature upgrades when transitioning to a Multi-Agent System.

> Canonical reference: `framework/Core Features for SAS.md` → `framework/Core Features for MAS.md`

## Pillar 1: Context Engineering (Inform)

| ID   | SAS Feature                   | MAS Upgrade                    | Key Change                                                                      |
| ---- | ----------------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| P1-1 | Repository as Truth           | Shared Repository as Truth     | Becomes a multi-agent shared ledger                                             |
| P1-2 | Context Compaction            | Distributed Context Compaction | Each agent compacts independently; shared summaries sync via filesystem         |
| P1-3 | Tool Offloading               | Tool Offloading                | No structural change; per-agent offloading                                      |
| P1-4 | Progressive Skills            | Progressive Skills             | Loaded per-agent role; specialist skills per topology                           |
| P1-5 | Observability / Dashboards    | Distributed Observability      | Must track per-agent metrics + cross-agent correlations                         |
| P1-6 | Web Search & MCP Integration  | Shared Web Search & MCP        | Cached external lookups shared across agents; MCP servers serve the swarm       |
| P1-7 | Planning & State Files        | Shared Task Lists & Blackboards| Centralized knowledge spaces where agents view statuses and claim work          |
| P1-8 | Context Anchoring             | Distributed Context Anchoring  | Each agent anchors independently; shared anchor files sync strategic continuity |
| P1-9 | Branch-Based Cognitive Memory | MAS Parallel Branches          | Parallel agents execute sub-task branches concurrently                          |
| P1-10| Requirements Ledger           | Shared Requirements Ledger     | Multi-agent synchronized ledger with locking to prevent conflicting entries     |

## Pillar 2: Architectural Constraints (Constrain)

| ID   | SAS Feature            | MAS Upgrade                       | Key Change                                              |
| ---- | ---------------------- | --------------------------------- | ------------------------------------------------------- |
| P2-1 | Automated Linters      | Automated Linters                 | No structural change                                    |
| P2-2 | Dependency Enforcement | Dependency Enforcement            | No structural change                                    |
| P2-3 | AI Auditors            | Diverse Collaboration Channels    | Expands to Competition, Coopetition, Adversarial Debate |
| P2-4 | Bounded Autonomy       | Bounded Autonomy & Access Control | Inter-agent security boundaries added                   |
| P2-5 | Upstream Intake Gate   | Distributed Intake Gate           | All agents validate ledger before claiming work         |

## Pillar 3: Entropy Management (Maintain)

| ID   | SAS Feature        | MAS Upgrade            | Key Change                                            |
| ---- | ------------------ | ---------------------- | ----------------------------------------------------- |
| P3-1 | Scheduled Cleanups | Scheduled Cleanups     | Reconciles overlapping changes from concurrent agents |
| P3-2 | Documentation Sync | Documentation Sync     | Must handle docs touched by multiple agents           |
| P3-3 | Pattern Auditing   | Pattern Auditing       | Cross-agent pattern divergence detection              |
| P3-4 | Consolidation Loop | Consolidation Pipeline | Scales to multi-team changelog aggregation            |

## P0 — Foundational Infrastructure (Execute)

| ID   | SAS Feature            | MAS Upgrade                         | Key Change                                                          |
| ---- | ---------------------- | ----------------------------------- | ------------------------------------------------------------------- |
| P0-1 | Bash Sandboxes         | Bash Sandboxes                      | Per-agent isolated environments                                     |
| P0-2 | Filesystem & Git       | Filesystem, Git & File Locking      | **Adds file locking** to prevent race conditions                    |
| P0-3 | Self-Verification      | Collective Verification             | Consensus-seeking protocols; multi-agent vote before commit         |
| P0-4 | Ralph Loops            | Ralph Loops                         | Per-agent exit interception; reinjection across context resets      |
| P0-5 | Orchestration Logic    | Multi-Agent Orchestration           | Adds topology selection (Supervisor, P2P, Hierarchical, Blackboard) |
| P0-6 | Rippable Middleware    | Rippable Middleware & Versioning    | No structural change; A/B testing across the swarm                  |
| P0-7 | Escalation Policies    | Audit Trails & Accountability       | **Adds audit logs** for decentralized liability                     |
| P0-8 | Harness Versioning     | Harness Versioning                  | Version control extended to swarm-level configurations              |
| P0-9 | Smart Command Wrappers | Smart Command Wrappers              | Standardized ccp/reconcile workflows shared across all agents       |
| —    | —                      | Inter-Agent Communication (Mailbox) | **New in MAS**: messaging bus, broadcast, idle notifications        |

---

_See also: `research/MAS Critical Enhancements.md` for detailed upgrade requirements._
_See also: `framework/HE Gap Evaluation Framework.md` Perspective D for SAS→MAS readiness assessment._
