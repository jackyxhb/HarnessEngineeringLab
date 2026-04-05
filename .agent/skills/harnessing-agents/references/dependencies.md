# Cascade Analysis

Use this lookup table to determine a feature's **Impact Weight** (how many downstream systems rely on it) when calculating Priority Scores in `references/gap-scoring.md`.

## Feature Inter-dependencies

When a Foundation or Pillar feature breaks, calculate how many explicitly dependent features fail with it.

| Feature ID | Feature Name | Downstream Dependencies (Affected Systems) | Impact Weight |
| - | - | - | - |
| `P0-1` | Bash Sandboxes | `P0-3` (Verification (Self & Collective)), `P1-3` (Tool Offloading), `P1-6` (MCP) | 3 |
| `P0-2` | Filesystem & Git Workspace | `P1-8` (Anchoring), `P1-9` (Branches), `P1-10` (Requirements Ledger), `P3-2` (Docs), `P3-4` (Sync) | 5 |
| `P0-3` | Verification (Self & Collective) | `P2-1` (Linters), `P2-2` (Dependencies) | 2 |
| `P0-5` | Orchestration Logic | `P2-3` (AI Auditors & Collaboration Channels), `P0-6` (Middleware) | 2 |
| `P0-9` | Smart Command Wrappers | `P0-3` (Verification (Self & Collective)), `P1-9` (Branches) | 2 |
| `P1-1` | Repository as Truth | `P2-2` (Dependencies), `P2-3` (AI Auditors & Collaboration Channels), `P1-8` (Anchoring) | 3 |
| `P1-7` | Planning, Task Lists & Blackboards | `P0-4` (Ralph Loops), `P1-4` (Progressive Skills) | 2 |
| `P1-10` | Requirements Ledger | `P2-5` (Upstream Intake Gate), `P1-7` (Planning, Task Lists & Blackboards) | 2 |
| `P1-11` | Socratic Questioning | `P1-10` (Requirements Ledger), `P1-8` (Context Anchoring), `P1-7` (Planning, Task Lists & Blackboards) | 3 |
| `P1-12` | Skill Engineering | `P1-4` (Progressive Skills), `P1-2` (Context Compaction), `P1-3` (Tool Offloading), `P1-7` (Planning) | 4 |
| `P2-1` | Automated Linters | `P3-3` (Pattern Auditing) | 1 |
| `P2-4` | Bounded Autonomy & Access Control | `P0-7` (Escalation) | 1 |
| `P2-5` | Upstream Intake Gate | *(none — leaf constraint)* | 1 |

*(Note: If a feature is not listed in the table above, assume Impact Weight = 1 baseline)*

When calculating the final priority score, simply multiply `(5 - Composite Score) × Impact Weight × Cascade Length`.
