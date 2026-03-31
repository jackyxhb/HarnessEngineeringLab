# Prevention Checklist (Quick Reference)

Cross-reference this checklist during gap analysis (Phase 1) to identify which prevention failures are active in the target project. Each item maps to one or more core features.

> **Source:** `framework/HE Prevention Checklist.md` (canonical)

## Pillar 1: Context & Memory Degradation (Inform)

| # | Prevent | Related Features |
| - | - | - |
| 1 | Context Rot (noisy logs filling the window) | P1-2, P1-3 |
| 2 | Human-Only Documentation (rules not in repo) | P1-1 |
| 3 | Attention Drift & Strategic Amnesia | P1-8, P1-7 |
| 4 | Inconsistent Shared Context (MAS) | P1-1, P1-7 |
| 5 | Unrecorded Requirements | P1-10, P2-5 |

## Foundation: Coordination & Execution Failures (Execute)

| # | Prevent | Related Features |
| - | - | - |
| 6 | Quadratic Coordination Overhead | P0-5 |
| 7 | Cascading Hallucinations (Error Propagation) | P0-3 |
| 8 | State and File Conflicts | P0-2 |
| 9 | Premature Exits | P0-4 |
| 10 | Manual, Error-Prone CLI Execution | P0-9 |
| 11 | Supervisor Bottlenecks | P0-5 |

## Pillar 2: Security, Ethics & Emergent Risks (Constrain)

| # | Prevent | Related Features |
| - | - | - |
| 12 | Prompt Injections and Data Leakage | P2-4 |
| 13 | Malicious Emergent Behaviors | P2-4 |
| 14 | Opaque Decision-Making | P0-7 |
| 15 | Anthropomorphization and Over-Reliance | P2-4 |
| 16 | Unregistered Work (bypassing intake gate) | P2-5, P1-10 |

## Pillar 3: Lifecycle & Architectural Decay (Maintain)

| # | Prevent | Related Features |
| - | - | - |
| 17 | Over-Engineering the Control Flow | P0-6 |
| 18 | Codebase Entropy | P3-1, P3-3 |
| 19 | Runaway Concurrency Costs | P0-5 |
| 20 | Evaluation Overfitting | P2-3 |
| 21 | Documentation Disconnects (Missing Consolidation) | P3-2, P3-4 |

## Cross-Cutting: Reward Engineering & Anti-Hacking

| # | Prevent | Related Features |
| - | - | - |
| 22 | Human-in-the-loop that adds delay without insight | P0-7, P2-4 |
| 23 | Optimizing for vanity metrics over quality | P1-5 |
| 24 | Agent gaming its own success criteria | P0-3, P2-3 |
| 25 | Conflicting reward signals across agents | P0-5 |
| 26 | Reward-aligned outputs not correlating with value | P1-5 |
