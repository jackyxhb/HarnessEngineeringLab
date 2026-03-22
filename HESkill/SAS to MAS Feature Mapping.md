# SAS → MAS Feature Mapping

How each SAS core feature upgrades when transitioning to a Multi-Agent System.

> Canonical reference: `HESkill/Core Features for SAS.md` → `HESkill/Core Features for MAS.md`

## Pillar 1: Context Engineering (Inform)

| # | SAS Feature | MAS Upgrade | Key Change |
|---|---|---|---|
| 1 | Repository as Truth | Shared Repository as Truth | Becomes a multi-agent shared ledger |
| 2 | Context Compaction | Distributed Context Compaction | Each agent compacts independently; shared summaries sync via filesystem |
| 3 | Tool Call Offloading | Tool Call Offloading | No structural change; per-agent offloading |
| 4 | Progressive Skills | Progressive Skills | Loaded per-agent role; specialist skills per topology |
| 5 | Observability / Dashboards | Distributed Observability | Must track per-agent metrics + cross-agent correlations |
| 6 | Static Context | Shared Static Context | AGENTS.md becomes multi-role; topology-aware |
| 7 | Dynamic Context | Shared Dynamic Context | Real-time state sync across agents via Blackboard |
| 8 | Context Anchoring | Distributed Context Anchoring | Each agent anchors independently; shared anchor files sync strategic continuity |

## Pillar 2: Architectural Constraints (Constrain)

| # | SAS Feature | MAS Upgrade | Key Change |
|---|---|---|---|
| 9 | Bounded Autonomy | Bounded Autonomy & Access Control | Inter-agent security boundaries added |
| 10 | AI Auditors | Diverse Collaboration Channels | Expands to Competition, Coopetition, Adversarial Debate |
| 11 | Automated Linters | Automated Linters | No structural change |
| 12 | Dependency Enforcement | Dependency Enforcement | No structural change |

## Pillar 3: Entropy Management (Maintain)

| # | SAS Feature | MAS Upgrade | Key Change |
|---|---|---|---|
| 13 | Scheduled Cleanups | Scheduled Cleanups | Reconciles overlapping changes from concurrent agents |
| 14 | Documentation Sync | Documentation Sync | Must handle docs touched by multiple agents |
| 15 | Pattern Auditing | Pattern Auditing | Cross-agent pattern divergence detection |
| 16 | Consolidation Loop | Consolidation Pipeline | Scales to multi-team changelog aggregation |

## Foundational Infrastructure (Execute)

| # | SAS Feature | MAS Upgrade | Key Change |
|---|---|---|---|
| 17 | Orchestration Logic | Multi-Agent Orchestration | Adds topology selection (Supervisor, P2P, Hierarchical, Blackboard) |
| 18 | — | Inter-Agent Communication (Mailbox) | **New in MAS**: messaging bus, broadcast, idle notifications |
| 19 | Filesystem & Git | Filesystem, Git & File Locking | **Adds file locking** to prevent race conditions |
| 20 | Self-Verification | Collective Verification | Consensus-seeking protocols; multi-agent vote before commit |
| 21 | Escalation Policies | Audit Trails & Accountability | **Adds audit logs** for decentralized liability |
| 22 | Bash Sandboxes | Bash Sandboxes | Per-agent isolated environments |
| 23 | Rippable Middleware | Rippable Middleware | No structural change |

---

*See also: `comments/MAS Critical Enhancements.md` for detailed upgrade requirements.*
*See also: `HESkill/HE Gap Evaluation Framework.md` Perspective D for SAS→MAS readiness assessment.*
