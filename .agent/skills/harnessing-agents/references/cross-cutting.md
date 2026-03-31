# Cross-Cutting Evaluation Perspectives

Apply these 5 perspectives during Phase 2 (Gap Scoring) to reveal systemic gaps that span multiple features. Each perspective includes a concrete **gap test**.

> **Source:** `framework/HE Gap Evaluation Framework.md` Part 3

---

## A. Feedback Loop Chain

Trace the harness feedback chain end-to-end:

```text
Agent writes code → Self-Verification catches errors → Linters enforce style →
Auditors review architecture → Cleanups fix what slipped through →
Observability reveals patterns → Humans improve the harness
```

**Gap test:** Remove one link. Does the system still converge on correct output? If not, that link is a critical dependency.

---

## B. Token Economics

Map each feature as a token saver or spender:

| Token Savers | Token Spenders |
| - | - |
| Context Compaction (P1-2) | AI Auditors (P2-3) |
| Tool Offloading (P1-3) | Web Search & MCP (P1-6) |
| Progressive Skills (P1-4) | Collective Verification (MAS) |
| Automated Linters (P2-1) | Inter-Agent Communication (MAS) |
| Planning & State Files (P1-7) | Scheduled Cleanups (P3-1) |
| Context Anchoring (P1-8) | |
| Branch Cognitive Memory (P1-9) | |

**Gap test:** Is the net token balance positive? Are token spenders delivering proportional value?

---

## C. Failure Cascade Map

Trace chain failures from missing features:

```text
No Repository as Truth → Agent hallucinates architecture
  → Linters can't catch semantic violations → AI Auditors give wrong feedback
    → Entropy accumulates faster → Cleanups can't keep up
```

```text
No Self-Verification → Agent ships broken code
  → Escalation overloads humans → Humans lose trust
    → Manual review replaces automation → Human role regresses
```

**Gap test:** For each feature scored 0-1, trace its cascade. Features with the longest cascade chains are the highest priority.

---

## D. SAS-to-MAS Readiness

Score key features on their MAS readiness stage:

| Feature | SAS-Only | MAS-Ready | MAS-Optimized |
| - | - | - | - |
| Filesystem & Git (P0-2) | Single workspace | Git worktrees | File locking + task claiming |
| Self-Verification (P0-3) | Run tests locally | Gate on shared state | Consensus voting |
| Orchestration (P0-5) | Sequential tasks | Supervisor pattern | Dynamic topology switching |
| Context Compaction (P1-2) | Single window | Per-agent windows | Distributed memory management |
| AI Auditors (P2-3) | Single reviewer | Cooperative review | Competition + coopetition |
| Context Anchoring (P1-8) | Single-session memory | Persistent anchor files | Shared anchor files |
| Branch Memory (P1-9) | Sequential execution | Sub-task branches | Parallel agents + merge gates |
| Escalation (P0-7) | Alert human | Retry with different agent | Tiered multi-agent escalation |

**Gap test:** If planning MAS adoption, any feature stuck in "SAS-Only" is a blocker.

---

## E. Human Role Progression

Map the team's current stage and identify the features needed to advance:

| Stage | Human Role | Enabling Features |
| - | - | - |
| **Code Writer** | Writes code, reviews manually | (No harness features needed) |
| **Harness Builder** | Builds scaffolding, reviews agent PRs | P1-1, P2-1, P0-3 |
| **System Architect** | Designs environments, spot-checks | P0-5, P2-3, P1-5 |
| **Strategic Overseer** | Sets goals, harness evolves autonomously | P0-8, P3-4, P3-3 |

**Gap test:** At which stage is the team stuck? The features enabling the next stage are the improvement priority.
