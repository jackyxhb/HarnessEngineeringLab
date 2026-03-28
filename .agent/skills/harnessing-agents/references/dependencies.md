# Cascade Analysis

Use this lookup table to determine a feature's **Impact Weight** (how many downstream systems rely on it) when calculating Priority Scores in `references/gap-scoring.md`.

## Feature Inter-dependencies

When a Foundation or Pillar feature breaks, calculate how many explicitly dependent features fail with it.

| Feature ID | Feature Name | Downstream Dependencies (Affected Systems) | Impact Weight |
| - | - | - | - |
| `F1` | Bash Sandboxes | `F3` (Self-Verification), `P1-3` (Tool Offloading), `P1-6` (MCP) | 3 |
| `F2` | Filesystem & Git Workspace | `P1-8` (Anchoring), `P1-9` (Branches), `P3-2` (Docs), `P3-4` (Sync) | 4 |
| `F3` | Self-Verification | `P2-1` (Linters), `P2-2` (Dependencies) | 2 |
| `F5` | Orchestration Logic | `P2-3` (Auditors), `F6` (Middleware) | 2 |
| `P1-1` | Repository as Truth | `P2-2` (Dependencies), `P2-3` (Auditors), `P1-8` (Anchoring) | 3 |
| `P1-7` | Planning & State Files | `F4` (Ralph Loops), `P1-4` (Progressive Skills) | 2 |
| `P2-1` | Automated Linters | `P3-3` (Pattern Auditing) | 1 |
| `P2-4` | Bounded Autonomy | `F7` (Escalation) | 1 |

*(Note: If a feature is not listed in the table above, assume Impact Weight = 1 baseline)*

When calculating the final priority score, simply multiply `(5 - Composite Score) × Impact Weight × Cascade Length`.
