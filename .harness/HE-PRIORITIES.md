# HE-PRIORITIES

**Date:** 2026-04-12
**Auditor:** GitHub Copilot (Claude Opus 4.6)
**Target:** HELab (self-host)

## Scoring Methodology

Per `references/he-scoring.md`: 6 dimensions (0–5), Priority Score = `(5 - Composite) × Impact Weight × Cascade Length`.

- **Impact Weight** = downstream dependency count from `framework/HE Index.md` (0 → 1).
- **Cascade Length** = failure propagation severity (1 = localized, 2 = moderate, 3 = systemic).

## Per-Feature Scores

```json
[
  {
    "id": "P1-11",
    "name": "Socratic Questioning",
    "scores": { "maturity": 0, "effectiveness": 0, "risk": 3, "cost": 4, "scalability": 1, "human_role": 2 },
    "composite": 1.67,
    "impact_weight": 4,
    "cascade_length": 2,
    "priority_score": 26.64,
    "tier": 1,
    "note": "4 downstream (P1-10, P1-8, P2-5, P1-7). Ambiguous inputs cascade into wrong plans and execution."
  },
  {
    "id": "P0-1",
    "name": "Bash Sandboxes",
    "scores": { "maturity": 1, "effectiveness": 2, "risk": 1, "cost": 4, "scalability": 1, "human_role": 3 },
    "composite": 2.0,
    "impact_weight": 5,
    "cascade_length": 1,
    "priority_score": 15.0,
    "tier": 1,
    "note": "5 downstream (P0-3, P0-5, P1-3, P1-6, P3-1). High formula score but docs-first repo has inherently low contamination risk. Light remediation: document risk acceptance."
  },
  {
    "id": "P1-5",
    "name": "Observability / Dashboards",
    "scores": { "maturity": 1, "effectiveness": 1, "risk": 2, "cost": 3, "scalability": 1, "human_role": 2 },
    "composite": 1.67,
    "impact_weight": 2,
    "cascade_length": 2,
    "priority_score": 13.32,
    "tier": 1,
    "note": "2 downstream (P0-7, P0-8). P0-7 also broken — shared root cause. Structural observability (audit.sh) works; runtime observability absent."
  },
  {
    "id": "P0-7",
    "name": "Escalation Policies & Audit Trails",
    "scores": { "maturity": 1, "effectiveness": 0, "risk": 2, "cost": 3, "scalability": 1, "human_role": 1 },
    "composite": 1.33,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 3.67,
    "tier": 2,
    "note": "Logging spec aspirational — IDE agents don't natively emit repo-file logs. Root-cause shared with P1-5."
  },
  {
    "id": "P0-10",
    "name": "Inter-Agent Communication (The Mailbox)",
    "scores": { "maturity": 0, "effectiveness": 0, "risk": 1, "cost": 4, "scalability": 0, "human_role": 3 },
    "composite": 1.33,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 3.67,
    "tier": 3,
    "note": "SAS-primary; zero operational need currently."
  },
  {
    "id": "P0-4",
    "name": "Ralph Loops",
    "scores": { "maturity": 1, "effectiveness": 0, "risk": 2, "cost": 3, "scalability": 1, "human_role": 2 },
    "composite": 1.5,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 3.5,
    "tier": 2,
    "note": "Script exists but disconnected from any agent workflow. Wiring cost is moderate."
  },
  {
    "id": "P0-5",
    "name": "Orchestration Logic",
    "scores": { "maturity": 2, "effectiveness": 3, "risk": 2, "cost": 4, "scalability": 1, "human_role": 3 },
    "composite": 2.5,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.5,
    "tier": 3,
    "note": "SAS-primary; workflows adequate for current scale."
  },
  {
    "id": "P2-4",
    "name": "Bounded Autonomy & Access Control",
    "scores": { "maturity": 2, "effectiveness": 2, "risk": 2, "cost": 4, "scalability": 2, "human_role": 3 },
    "composite": 2.5,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.5,
    "tier": 3,
    "note": "DO NOT rules + review gates provide proxy enforcement. Low risk for docs-first repo."
  },
  {
    "id": "P1-6",
    "name": "Web Search & MCP Integration",
    "scores": { "maturity": 2, "effectiveness": 3, "risk": 2, "cost": 4, "scalability": 2, "human_role": 3 },
    "composite": 2.67,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.33,
    "tier": 3,
    "note": "IDE-managed. Functional for agent work."
  },
  {
    "id": "P1-3",
    "name": "Tool Offloading",
    "scores": { "maturity": 3, "effectiveness": 3, "risk": 2, "cost": 4, "scalability": 3, "human_role": 3 },
    "composite": 3.0,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.0,
    "tier": 3,
    "note": "Skill-level enforcement sufficient. Repo-level gate not needed."
  },
  {
    "id": "P2-2",
    "name": "Dependency Enforcement",
    "scores": { "maturity": 3, "effectiveness": 3, "risk": 2, "cost": 4, "scalability": 3, "human_role": 3 },
    "composite": 3.0,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.0,
    "tier": 3,
    "note": "he-lint validates structural deps. No import-graph needed for docs-first repo."
  },
  {
    "id": "P3-3",
    "name": "Pattern Auditing",
    "scores": { "maturity": 3, "effectiveness": 3, "risk": 2, "cost": 4, "scalability": 3, "human_role": 3 },
    "composite": 3.0,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.0,
    "tier": 3,
    "note": "he-lint + /reconcile + weekly GC cover structural patterns. No application code patterns to audit."
  }
]
```

## Cross-Cutting Perspective Amplification

1. **Agent Legibility** — P1-11 amplified. Ambiguous inputs reduce agent comprehension of tasks. Combined with strong contract surfaces (AGENTS.md), the gap is specifically in pre-execution disambiguation rather than general legibility.

2. **Entropy Trajectory** — P1-5 amplified. Agent behavior entropy is unmeasured. Structural entropy (file counts, naming, sync) is well-controlled by he-lint + weekly GC.

3. **Human Role Optimization** — Current stage: **Harness Builder**. Human has strong governance tools but lacks real-time visibility (P1-5 gap). Strengthening observability would shift human toward proactive oversight.

4. **SAS→MAS Readiness** — P0-5, P0-10 are MAS concerns. HELab is SAS-primary. Not amplified for current cycle.

## Tier Summary

### Tier 1: Critical (Immediate)
| Rank | Feature | Score | Remediation |
|------|---------|-------|-------------|
| 1 | P1-11 Socratic Questioning | 26.64 | Light |
| 2 | P0-1 Bash Sandboxes | 15.0 | Light |
| 3 | P1-5 Observability / Dashboards | 13.32 | Medium |

### Tier 2: Important (Mid-term)
| Rank | Feature | Score | Remediation |
|------|---------|-------|-------------|
| 4 | P0-7 Escalation Policies & Audit Trails | 3.67 | Medium |
| 5 | P0-4 Ralph Loops | 3.5 | Medium |

### Tier 3: Enhance (Long-term)
| Rank | Feature | Score | Remediation |
|------|---------|-------|-------------|
| 6 | P0-10 Inter-Agent Communication | 3.67 | Light (defer) |
| 7 | P0-5 Orchestration Logic | 2.5 | Light (defer) |
| 8 | P2-4 Bounded Autonomy | 2.5 | Light (defer) |
| 9 | P1-6 Web Search & MCP | 2.33 | Light (defer) |
| 10 | P1-3 Tool Offloading | 2.0 | Light (defer) |
| 11 | P2-2 Dependency Enforcement | 2.0 | Light (defer) |
| 12 | P3-3 Pattern Auditing | 2.0 | Light (defer) |
