# L4 Tool Specification: P1-5 Observability / Dashboards

**Feature:** P1-5 Observability / Dashboards  
**Principle:** EP-8 (You cannot improve what you do not measure)  
**Date:** 2026-04-16  
**Status:** Specification for Tranche 1 remediation

---

## Executive Summary

This specification defines the concrete tools and enforcement mechanisms for P1-5 (Observability / Dashboards). The feature prevents blind execution by ensuring real-time visibility into system behavior and harness health. This specification bridges from policy to execution, enabling agents and humans to observe work in progress and react to degradation signals.

---

## L4 Actions & Concrete Tools

### Action 1: Task-Artifact Storage Enforcement

**Purpose:** Ensure every agent task produces auditable outputs keyed by task ID.

**Tool Name:** `task-artifact-registry-engine`

**Schema:** `.harness/task-artifacts.schema.json`

**Storage Location:** `.harness/task-artifacts/{task_id}/`

**Artifact Types:**
1. **commit** — Git commit refs produced by this task
2. **file** — Non-code files written (Markdown, JSON, reports)
3. **plan** — PLANS.md entries authored
4. **report** — Generated audit/assessment reports
5. **audit-trail** — Pre-commit hook logs, lint results
6. **context-summary** — P1-2 context compaction records

**Input Contract:**
- Task ID (from `.harness/task-state.json`)
- Artifact type (enum)
- Artifact path or reference
- SHA256 hash (for verification)
- Retention days (default 90)

**Output Contract:**
- JSON record conforming to `.harness/task-artifacts.schema.json`
- Indexed by task ID for rapid lookup
- Retention lifecycle enforced by cleanup jobs (P3-1 scheduled cleanups)

**Mechanical Enforcement:**
- Requirement: Every task with status "in-progress" or "completed" must have ≥1 artifact
- Lint Rule: `validateTaskArtifacts` runs on task-state.json to verify artifact registry completeness
- Prevention Binding: P1-5-blind-execution (task-artifact-storage enforcement)

**Acceptance Criteria:**
1. [ ] Task artifacts recorded in schema-conformant JSON
2. [ ] Artifact verification via SHA256 hash (integrity check)
3. [ ] Retention policy enforced (old artifacts eligible for cleanup after N days)
4. [ ] Artifact registry accessible to auditor agents (read-only, no sibling-task interference)
5. [ ] Lint passes: every completed task has ≥1 artifact recorded

---

### Action 2: IDE Contingency Gate (Tier 1 vs. Tier 2)

**Purpose:** Define fallback observability when IDE agent logging (Tier 2) is unavailable.

**Tool Name:** `observability-tier-selector`

**Decision Tree:**

```yaml
IF IDE supports file-based agent logging (Tier 2)
  THEN collect: .harness/agent-logs.jsonl (per-action telemetry)
  AND measurement collection uses IDE logs
ELSE (SAS mode, no IDE logging)
  THEN collect: .harness/observation-report.json (structural audit only)
  AND measurement collection uses audit.sh output
  AND human review gates for blind-execution prevention (escalation required)
END
```

**Tier 1 (Structural Observability) - Always Available:**
- Source: `scripts/harness/audit.sh` output
- Artifact: `.harness/observation-report.json`
- Metrics: File existence, workflow registry health, anchor freshness, pre-commit liveness, task-state visibility
- Cadence: `npm run observe` (manual trigger)
- SAS Mode: All Tier 1 metrics apply

**Tier 2 (Runtime Agent Logging) - IDE-Dependent:**
- Source: IDE logs to `.harness/agent-logs.jsonl`
- Format: JSON Lines with `timestamp`, `agent_id`, `action`, `target`, `result`, `duration_ms`
- Cadence: Per-action logging (real-time)
- MAS Mode: Tier 2 enables cross-agent task routing observability
- SAS Mode: Optional (enhances but not required)

**Fallback Protocol (SAS Mode Without Tier 2):**
1. Agent cannot see per-action telemetry (Tier 2 unavailable)
2. Agent must invoke `npm run audit` before critical gates to refresh observation-report.json
3. Escalation rule: If task runs > 30 minutes without audit refresh, escalate for human review
4. Consequence: SAS execution is slower but equally auditable

**Acceptance Criteria:**
1. [ ] Tier 1 metrics always present regardless of IDE
2. [ ] Tier 2 detection automated (check for .harness/agent-logs.jsonl file)
3. [ ] Measurement thresholds adapt based on available tier
4. [ ] Escalation triggered if task exceeds 30min without audit refresh (Tier 1 only)
5. [ ] Documentation clear: "SAS deployments use Tier 1 observability; Tier 2 is optional enhancement"

---

### Action 3: Blind-Execution Prevention Gate

**Purpose:** Implement mechanical check that every action produces an observable audit trail.

**Tool Name:** `audit-trail-validator`

**Integration Points:**
- Pre-execution: Check that action can produce logs
- Post-execution: Verify logs contain required fields
- Fallback: If logs unavailable, escalate to human

**Enforcement Binding:**
- Prevention Rule: `P1-5-blind-execution` (currently declared-unmounted)
- Target Mount: `.agent/workflows/audit-trail-gate.js` (Tranche 2)
- Gate Location: Post-action validation in Ralph Loops (P0-4)

**Validation Checklist (Per Action):**
1. [ ] Action has a machine-readable identifier (tool name, function name, script path)
2. [ ] Audit log exists (Tier 2) OR observation-report timestamp updated (Tier 1)
3. [ ] Log contains at least: timestamp, action type, result status
4. [ ] Result is deterministic (success/failure/escalation, not narrative only)

**Escalation Condition:**
- If audit trail is missing AND Tier 1 has not been refreshed in > 30 minutes → escalate
- Message: "Action {action_id} has no audit trail. Refresh audit via `npm run audit` or escalate."

**Acceptance Criteria:**
1. [ ] Gate runs post-action and returns pass/fail deterministically
2. [ ] Escalation triggered for actions without audit trails
3. [ ] No execution proceeds past the gate without audit evidence
4. [ ] False positives < 1% (rarely escalate for valid audit trails)

---

## Prevention Rules Binding (L4 Prevention)

### P1-5-blind-execution
- **Status:** declared-unmounted
- **Rule:** You must prevent agents from performing actions without clear, observable signals. Every command must produce an audit trail that can be verified by a separate auditor agent.
- **Enforcement Surface:** Planned in `.agent/workflows/audit-trail-gate.js` (Tranche 2)
- **Current Status:** Schema & Tier 1 observability ready; Tier 2 enforcement pending

### P1-5-narrative-observability-metrics
- **Status:** implemented
- **Rule:** Performance metrics and audit summaries must be stored in machine-readable JSON format.
- **Enforcement Surface:** `.harness/observation-report.json` (generated by `scripts/harness/audit.sh`)
- **Current Gate:** `npm run observe` generates JSON; `npm run audit` validates structure

---

## SAS vs. MAS Scope

### SAS Status: Partial
- **Complete:** Tier 1 structural observability (file existence, workflow health, anchor freshness)
- **Complete:** Task-artifact storage enforcement (schema contract)
- **Partial:** Blind-execution prevention (human review gates, no automated Tier 2 logs)
- **N/A:** Per-action telemetry (single-agent, no swarm monitoring)

### MAS Status: Planned
- **Future:** Tier 2 agent logging from IDE infrastructure
- **Future:** Per-agent task-routing observability (cross-agent hand-offs)
- **Future:** Distributed task-artifact indexing across agent swarm
- **Future:** Real-time alerting for agent degradation

### SAS→MAS Migration
1. **SAS Phase 1:** Tier 1 only; task-artifact storage; manual audit refresh
2. **MAS Phase 1:** Tier 2 logging from IDE; automated audit-trail validation gate
3. **MAS Phase 2:** Cross-agent task observability; distributed artifact registry
4. **MAS Phase 3:** Real-time dashboard with anomaly detection

---

## Integration Points

### With P0-4 Ralph Loops (Critical)
- Task reinjection depends on audit trail to determine state
- Audit-trail gate prevents blind reinjection (reinjection requires fresh audit)
- Action: Ralph Loops reinjection checks audit-trail-validator before proceeding

### With P0-7 Escalation Policies
- Escalation events logged to `.harness/escalation-events.jsonl`
- Escalation metrics calculated from observation-report.json
- Action: Escalation rule triggers if task-artifact count = 0 (no observability)

### With P2-3 AI Auditors & Collaboration Channels
- Auditor agents read task-artifact registry to verify completeness
- Observation-report.json provides auditor with system state
- Action: Auditor invokes `npm run audit` and checks artifact coverage

---

## Test Strategy

### Unit Tests
1. **task-artifact-registry-engine:** Artifact write → schema-valid record
2. **observability-tier-selector:** IDE availability check → correct tier selected
3. **audit-trail-validator:** Post-action log check → pass/fail deterministic

### Integration Tests
1. **End-to-end:** Task execution → artifacts recorded → audit passes
2. **Tier fallback:** IDE disabled → Tier 1 audit available → escalation triggered after 30min
3. **Blind-execution gate:** Action without logs → gate blocks → escalation sent

### Acceptance Criteria Verification
- [ ] Task artifacts 100% recorded for completed tasks
- [ ] Audit-trail validator runs post-action without false positives
- [ ] Tier selection correct (Tier 2 detected when available)
- [ ] Escalation triggered for stale Tier 1 (>30min without refresh)
- [ ] Observation-report.json valid JSON on every `npm run audit`

---

## Measurement Bindings

**Feature:** P1-5  
**Registry:** `.harness/measurement-definitions.json`  
**Binding Key:** `P1-5`  
**Status:** proxy-mounted (Tier 1 observability ready; Tier 2 contingency documented)

### Metrics (Current)
1. **p1-5-dashboard-freshness-minutes** (implemented)
   - Target: < 5 minutes
   - Collection: `npm run observe`
   - Source: `.harness/observation-report.json`

2. **p1-5-structural-signal-automation-rate** (proxy-mounted)
   - Target: 100% automated
   - Collection: `scripts/harness/audit.sh`
   - Source: Structural signals from audit.sh

3. **p1-5-task-artifact-retention-rate** (proxy-mounted)
   - Target: 100% retention
   - Collection: Task-artifact registry validation
   - Source: `.harness/task-artifacts/`

---

## References

- Feature: `framework/features/P1-05.md`
- Schemas:
  - `.harness/task-artifacts.schema.json`
  - `.harness/observation-report.json` (generated)
- Scripts:
  - `scripts/harness/audit.sh`
  - `scripts/generate-observation-report.js` (exists)
- Related: P0-4 Ralph Loops, P0-7 Escalation Policies, P2-3 AI Auditors
- Principle: `framework/principles/EP-08.md`

---

**Specification Version:** 1.0  
**Approval Status:** Ready for Tranche 1 review  
**Next Steps:** Audit-trail gate implementation in Tranche 2; Tier 2 contingency testing in MAS phase
