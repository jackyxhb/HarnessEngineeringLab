# HE-IMPLEMENTATION-PLAN

**Project Scope:** HELab, MAS scale, complex system (framework development with agent workflows)

## Tier 1 (Immediate Execution)

### 1-1. P1-5 Observability / Dashboards
- **Remediation Level:** Medium
- **Prevention Active:** "Prevent Blind Execution" — agents perform actions without comprehensive observable signals
- **Dependencies:** None
- **Implementation Guide:** None
- **Action Items** _(from the feature's L4 section):_
  - `AGENTS.md` — Add centralized logging configuration for all agent actions
  - `scripts/` — Implement JSON-standardized observation reports for audits
  - `.harness/` — Create real-time dashboard files for performance tracking
- **Remediation Tier:** Tier 1 — Enable centralized logging for all agent and harness actions
- **Verification:** Confirm logs are generated for agent actions and can be parsed for metrics

## Tier 2 (Mid-term Execution)

### 2-1. P0-4 Ralph Loops
- **Remediation Level:** Medium
- **Prevention Active:** "Prevent Premature Exits" — agents may stop mid-task without full completion
- **Dependencies:** P1-7 Planning, Task Lists & Blackboards
- **Implementation Guide:** None
- **Action Items** _(from the feature's L4 section):_
  - `scripts/` — Implement exit interception hooks that detect premature completion
  - `framework/` — Add prompt reinjection utilities with state summaries
  - `AGENTS.md` — Add loop budgets and escalation thresholds
- **Remediation Tier:** Tier 1 — Implement exit interception hooks that detect premature completion and trigger reinjection
- **Verification:** Test long-horizon tasks complete without premature exits

## Tier 3 (Long-term Backlog)

### 3-1. P3-1 Scheduled Cleanups
- **Reason Deferred:** Lower priority compared to observability and task completion gaps
- **Implementation Guide:** None
- **Action Items** _(from the feature's L4 section):_
  - `.github/workflows/` — Add scheduled workflow for entropy audits
  - `scripts/` — Create cleanup scripts for dead code and stale branches
  - `.harness/` — Implement machine-readable cleanup reports
