# HE-CLUES.md

**Area:** Foundation
**Feature:** P0-4 Ralph Loops
**Governed By:** EP-4 — Committed tasks must be completed
**Current State:** Framework defines Ralph Loops with exit interception, prompt reinjection, and loop budgets, but implementation in HELab workflows is partial. Complex tasks use /cognitive-branch for decomposition, but no explicit exit interception hooks or automatic reinjection for long-horizon tasks.
**Prevention Active:** "Prevent Premature Exits" — agents may stop mid-task without full completion, as no hooks detect premature exits.
**Recommended Options:** Implement exit interception hooks, prompt reinjection with state summaries, add loop budgets to prevent infinite retries.
**Severity:** Important
**Remediation Level:** Medium

---

**Area:** Pillar 1
**Feature:** P1-5 Observability / Dashboards
**Governed By:** EP-8 — You cannot improve what you do not measure
**Current State:** Has CI/CD checks and audit trails in REVIEWS.md, but no real-time dashboards or live visibility into agent behavior. No task-ID artifact storage or automated harness integrity signals.
**Prevention Active:** "Prevent Blind Execution" — agents perform actions without comprehensive observable signals, requiring manual reviews.
**Recommended Options:** Enable centralized logging, implement JSON-standardized observation reports, build real-time dashboards for performance tracking.
**Severity:** Important
**Remediation Level:** Medium

---

**Area:** Pillar 3
**Feature:** P3-1 Scheduled Cleanups
**Governed By:** EP-18 — Entropy requires scheduled countering
**Current State:** Has /reconcile workflow for manual entropy audits, but no scheduled automated cleanups. Dead code and stale branches may accumulate without regular detection.
**Prevention Active:** "Prevent Codebase Entropy" — entropy can accumulate beyond one GC cycle without scheduled countering.
**Recommended Options:** Deploy entropy-countering agents on a regular schedule, track cleanup metrics, build machine-readable cleanup reports.
**Severity:** Enhancement
**Remediation Level:** Light
