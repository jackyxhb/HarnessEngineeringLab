# HE-PRIORITIES

**Date:** 2026-04-14
**Auditor:** GitHub Copilot (GPT-5.4)
**Target:** HELab (self-host)

## Scoring Methodology

Per `references/he-scoring.md`: 6 dimensions (0–5), `Priority Score = (5 - Composite Score) × Impact Weight × Cascade Length`.

- **Impact Weight:** Downstream dependency count from `framework/HE Index.md` (0 downstream → weight 1).
- **Cascade Length:** 1 = localized, 2 = moderate, 3 = systemic.

## Per-Feature Scores

```json
[
  {
    "id": "P0-4",
    "name": "Ralph Loops",
    "scores": {
      "maturity": 3,
      "effectiveness": 3,
      "risk": 3,
      "cost": 3,
      "scalability": 2,
      "human_role": 2
    },
    "composite": 2.67,
    "impact_weight": 1,
    "cascade_length": 2,
    "priority_score": 4.66,
    "tier": 1,
    "note": "The schema, CLI, and reinjection path now exist, but ordinary multi-step work is not yet consistently routed through task-state."
  },
  {
    "id": "P0-7",
    "name": "Escalation Policies & Audit Trails",
    "scores": {
      "maturity": 3,
      "effectiveness": 3,
      "risk": 3,
      "cost": 3,
      "scalability": 2,
      "human_role": 3
    },
    "composite": 2.83,
    "impact_weight": 1,
    "cascade_length": 2,
    "priority_score": 4.34,
    "tier": 1,
    "note": "Machine-readable trigger rules and event outputs now exist, but action-level coverage and external notification remain intentionally limited in SAS mode."
  },
  {
    "id": "P1-6",
    "name": "Web Search & MCP Integration",
    "scores": {
      "maturity": 3,
      "effectiveness": 3,
      "risk": 2,
      "cost": 4,
      "scalability": 2,
      "human_role": 3
    },
    "composite": 2.83,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.17,
    "tier": 2,
    "note": "The canonical capability manifest now exists, but HELab still ships no checked-in MCP servers and does not log external lookups."
  },
  {
    "id": "P0-10",
    "name": "Inter-Agent Communication (The Mailbox)",
    "scores": {
      "maturity": 0,
      "effectiveness": 0,
      "risk": 1,
      "cost": 4,
      "scalability": 1,
      "human_role": 3
    },
    "composite": 1.5,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 3.5,
    "tier": 3,
    "note": "Absent by design in current SAS-primary operation; revisit only when HELab starts sustained MAS execution."
  },
  {
    "id": "P0-5",
    "name": "Orchestration Logic",
    "scores": {
      "maturity": 2,
      "effectiveness": 3,
      "risk": 2,
      "cost": 4,
      "scalability": 2,
      "human_role": 3
    },
    "composite": 2.67,
    "impact_weight": 1,
    "cascade_length": 1,
    "priority_score": 2.33,
    "tier": 3,
    "note": "SAS-primary self-hosting keeps urgency low until a real MAS router is needed."
  }
]
```

## Cross-Cutting Perspective Amplification

1. **Human Role Optimization** — Humans are now closer to oversight than repair, but Ralph Loop adoption and escalation breadth still depend on workflow discipline.
2. **Entropy Trajectory** — Structural entropy is strongly controlled; the remaining entropy is concentrated in operational consistency and MAS-deferred surfaces.
3. **Agent Legibility** — Contract clarity is strong. The remaining issue is operational coverage, not missing policy surfaces.
4. **SAS→MAS Readiness** — P0-5 and P0-10 remain intentionally deferred until MAS demand becomes real.

## Tier Summary

### Tier 1: Immediate

| Rank | Feature                                 | Score | Remediation |
| ---- | --------------------------------------- | ----- | ----------- |
| 1    | P0-4 Ralph Loops                        | 4.66  | Medium      |
| 2    | P0-7 Escalation Policies & Audit Trails | 4.34  | Medium      |

### Tier 2: Mid-term

| Rank | Feature                           | Score | Remediation |
| ---- | --------------------------------- | ----- | ----------- |
| 3    | P1-6 Web Search & MCP Integration | 2.17  | Light       |

### Tier 3: Deferred / MAS-triggered

| Rank | Feature                                       | Score | Remediation    |
| ---- | --------------------------------------------- | ----- | -------------- |
| 4    | P0-10 Inter-Agent Communication (The Mailbox) | 3.5   | Heavy (defer)  |
| 5    | P0-5 Orchestration Logic                      | 2.33  | Medium (defer) |
