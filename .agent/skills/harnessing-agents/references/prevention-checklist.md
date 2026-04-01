# Prevention Checklist (Quick Reference)

Cross-reference this checklist during gap analysis (Phase 1) to identify which prevention failures are active in the target project. Each item maps to specific core features by ID.

> **Source:** `framework/HE Prevention Checklist.md` (canonical)

## Foundation: Coordination & Execution Failures (Execute)

| # | Prevent | Primary Feature | Related Features |
| - | - | - | - |
| 1 | State and File Conflicts | **P0-2** | P1-7 |
| 2 | Cascading Hallucinations (Error Propagation) | **P0-3** | P2-3 |
| 3 | Premature Exits | **P0-4** | P1-9 |
| 4 | Quadratic Coordination Overhead | **P0-5** | P0-10 |
| 5 | Supervisor Bottlenecks | **P0-5** | P0-10 |
| 6 | Manual, Error-Prone CLI Execution | **P0-9** | — |

## Pillar 1: Context & Memory Degradation (Inform)

| # | Prevent | Primary Feature | Related Features |
| - | - | - | - |
| 7 | Human-Only Documentation (rules not in repo) | **P1-1** | — |
| 8 | Context Rot (noisy logs filling the window) | **P1-2** | P1-3, P1-4 |
| 9 | Attention Drift & Strategic Amnesia | **P1-7** | P1-8 |
| 10 | Inconsistent Shared Context (MAS) | **P1-1** | P1-7 |
| 11 | Unrecorded Requirements | **P1-10** | P2-5 |

## Pillar 2: Security, Ethics & Emergent Risks (Constrain)

| # | Prevent | Primary Feature | Related Features |
| - | - | - | - |
| 12 | Prompt Injections and Data Leakage | **P2-4** | — |
| 13 | Malicious Emergent Behaviors | **P2-4** | P0-7 |
| 14 | Opaque Decision-Making | **P0-7** | P2-4 |
| 15 | Anthropomorphization and Over-Reliance | **P2-4** | — |
| 16 | Unregistered Work (bypassing intake gate) | **P2-5** | P1-10 |

## Pillar 3: Lifecycle & Architectural Decay (Maintain)

| # | Prevent | Primary Feature | Related Features |
| - | - | - | - |
| 17 | Over-Engineering the Control Flow | **P0-6** | — |
| 18 | Codebase Entropy | **P3-1** | P3-3 |
| 19 | Runaway Concurrency Costs | **P0-5** | — |
| 20 | Evaluation Overfitting | **P2-3** | — |
| 21 | Documentation Disconnects (Missing Consolidation) | **P3-2** | P3-4 |

## Cross-Cutting: Reward Engineering & Anti-Hacking

| # | Prevent | Primary Feature | Related Features |
| - | - | - | - |
| 22 | Human-in-the-loop that adds delay without insight | **P0-7** | P2-4 |
| 23 | Optimizing for vanity metrics over quality | **P1-5** | — |
| 24 | Agent gaming its own success criteria | **P0-3** | P2-3 |
| 25 | Conflicting reward signals across agents | **P0-5** | — |
| 26 | Reward-aligned outputs not correlating with value | **P1-5** | — |
