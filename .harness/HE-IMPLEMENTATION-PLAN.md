# HE-IMPLEMENTATION-PLAN

**Project Scope:** HELab, SAS-primary self-host for a docs-first framework repository with Node-based harness tooling and a live-linked delivery skill.

## Tier 1 (Immediate Execution)

### 1-1. P1-5 Observability / Dashboards

- **Remediation Level:** Medium
- **Prevention Active:** `P1-5` Prevent Blind Execution — structural audit signals exist, but they do not yet provide a broader action stream or a generated dashboard humans can rely on.
- **Dependencies:** None
- **Implementation Guide:** `None`
- **Action Items** _(from the feature's guide when present; otherwise from the feature's L4 section):_
  - `scripts/generate-observation-report.js` — Extend the JSON report so it captures freshness, last failing audit, and additional harness signal categories beyond the current aggregate count.
  - `.harness/dashboard.md` or a new generator under `scripts/` — Replace the placeholder dashboard with generated values sourced from `observation-report.json` and recent `agent-logs.jsonl` entries.
  - `package.json` / `scripts/` — Route additional repo-native harness actions (`smoke`, `check`, sync flows) through the same JSON logging schema so the dashboard is not audit-only.
- **Remediation Tier:** Tier 1 — Enable centralized logging and JSON-standardized observation outputs.
- **Verification:** Run `npm run audit` and confirm the report includes richer metrics and the dashboard renders live values rather than placeholders.

### 1-2. P0-4 Ralph Loops

- **Remediation Level:** Medium
- **Prevention Active:** `P0-4` Prevent Premature Exits and `P0-4` Prevent Narrative Task State — task completion is still verified mostly by contract, not by a normal task-state + reinjection path.
- **Dependencies:** `P1-7`, `P1-2`, `P1-8`
- **Implementation Guide:** `None`
- **Action Items** _(from the feature's guide when present; otherwise from the feature's L4 section):_
  - `.harness/task-state.json` — Define a machine-readable task-state schema with `taskId`, `expectedSteps`, `completedSteps`, and compact state summary fields.
  - `scripts/exit-interceptor.js` — Upgrade the current placeholder so it validates the task-state schema, emits deterministic failure codes/messages, and logs reinjection metadata consistently.
  - `scripts/harness/audit.sh` or `.agent/workflows/cognitive-branch.md` — Hook task-state validation into a real multi-step completion path rather than relying on an optional audit-time check only.
- **Remediation Tier:** Tier 1 — Implement exit interception and JSON-standardized state reinjection.
- **Verification:** Create a synthetic incomplete `task-state.json`, run the interceptor, and confirm it reports a premature exit and writes reinjection metadata.

### 1-3. P0-7 Escalation Policies & Audit Trails

- **Remediation Level:** Medium
- **Prevention Active:** `P0-7` Prevent Silent Looping and `P0-7` Prevent Narrative Audit Trails — the trail is partial and escalation thresholds are not yet machine-readable.
- **Dependencies:** `P0-3`, `P1-5`
- **Implementation Guide:** `None`
- **Action Items** _(from the feature's guide when present; otherwise from the feature's L4 section):_
  - `.harness/escalation-rules.json` or another canonical config surface — Define escalation triggers for same-step failures, stale task-state, and timeout thresholds.
  - `scripts/exit-interceptor.js` / `scripts/` — Emit structured escalation events when those thresholds trip.
  - `.harness/dashboard.md` / observation pipeline — Surface escalation status in a human-visible audit output.
- **Remediation Tier:** Tier 1 — Define escalation triggers and route stuck tasks to human-visible alerts.
- **Verification:** Simulate a threshold breach and confirm a structured escalation event is recorded and surfaced.

---

## Tier 2 (Mid-term Execution)

### 2-1. P2-4 Bounded Autonomy & Access Control

- **Remediation Level:** Light
- **Prevention Active:** `P2-4` Prevent Narrative Permission Policies — permission boundaries are real but not canonically materialized in a repo-level manifest.
- **Dependencies:** None
- **Implementation Guide:** `None`
- **Action Items** _(from the feature's guide when present; otherwise from the feature's L4 section):_
  - `AGENTS.md`-adjacent JSON manifest or a new config file under `scripts/`/`.harness/` — Define tiered permission levels from read-only through high-risk actions.
  - Map existing tool restrictions (`allowed-tools`, local IDE allow-lists, review gates) into that canonical manifest.
  - Add explicit human-approval mapping for the highest-risk operations touching review-required surfaces.
- **Remediation Tier:** Tier 1 — Define tiered permission models as machine-readable manifests.
- **Verification:** Validate that the manifest covers current tool classes and names the approval gate for high-risk changes.

### 2-2. P1-6 Web Search & MCP Integration

- **Remediation Level:** Light
- **Prevention Active:** `P1-6` Prevent Narrative MCP Server Manifests — runtime capability is not declared canonically inside the repo.
- **Dependencies:** None
- **Implementation Guide:** `None`
- **Action Items** _(from the feature's guide when present; otherwise from the feature's L4 section):_
  - `.continue/mcpServers/` or another canonical config surface — Add a JSON capability manifest describing available MCP and web-search paths used by self-hosted audits.
  - Add a short canonical note distinguishing checked-in capability declarations from IDE-global tool availability.
  - Extend the observability trail to record when external search or MCP context materially informs a decision.
- **Remediation Tier:** Tier 1 — Adopt JSON-standardized MCP capability manifests.
- **Verification:** Confirm the manifest is checked in, machine-readable, and references the actual search/MCP surfaces available to this workspace.

---

## Tier 3 (Long-term Backlog)

### 3-1. P0-5 Orchestration Logic

- **Reason Deferred:** HELab remains SAS-primary; a router/topology layer adds more complexity than value at the current operating scale.
- **Implementation Guide:** `None`
- **Action Items** _(from the feature's guide when present; otherwise from the feature's L4 section):_
  - `.agent/workflows/` — Revisit supervisor routing and context-preserving handoff protocols when routine MAS execution becomes normal.

### 3-2. P0-10 Inter-Agent Communication (The Mailbox)

- **Reason Deferred:** No sustained MAS message-passing demand exists yet; mailbox infrastructure would be speculative.
- **Implementation Guide:** `None`
- **Action Items** _(from the feature's guide when present; otherwise from the feature's L4 section):_
  - `.harness/mailbox/` or equivalent future surface — Introduce a file-backed mailbox and strict JSON message schema only when MAS coordination becomes a real bottleneck.

---

## Execution Order

```text
Tier 1: P1-5 → P0-4 → P0-7
Tier 2: P2-4 → P1-6
Tier 3: P0-5 / P0-10 only if HELab shifts into sustained MAS operation
```

## Execution Status

User approval for the Tier 1 + Tier 2 batch was granted on 2026-04-14. The actions above were executed in this cycle and verified with `npm run observe`, `npm run audit`, and `npm run check`.
