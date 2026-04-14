# HE-CLUES

**Date:** 2026-04-14
**Auditor:** GitHub Copilot (GPT-5.4)
**Target:** HELab (self-host)

---

**Area:** Foundation
**Feature:** P0-4 Ralph Loops
**Governed By:** EP-4 — Committed tasks must be completed
**Current State:** `.harness/task-state.schema.json`, `scripts/task-state.js`, and `scripts/exit-interceptor.js` now provide the canonical task-state and reinjection surfaces, but ordinary multi-step work does not yet automatically create task-state records.
**Prevention Active:** `P0-4` Prevent Premature Exits and `P0-4` Prevent Narrative Task State — the machine-readable contract now exists, but operational adoption is still incomplete.
**Recommended Options:**

- Route future multi-step tasks through `npm run task-state -- <command>` by default rather than ad hoc state notes.
- Add a repo-native workflow or wrapper that initializes and closes task-state automatically for long-running work.
  **Severity:** Important — causes friction
  **Remediation Level:** Medium — operationalize mounted utility

---

**Area:** Foundation
**Feature:** P0-7 Escalation Policies & Audit Trails
**Governed By:** EP-7 — Every action must be traceable
**Current State:** `.harness/escalation-rules.json`, `scripts/exit-interceptor.js`, `.harness/reinjection-log.jsonl`, and the generated dashboard now provide machine-readable escalation and reinjection surfaces. External notification remains intentionally out of scope in SAS mode.
**Prevention Active:** `P0-7` Prevent Silent Looping and `P0-7` Prevent Narrative Audit Trails — trigger rules and audit fields are now durable, but alert routing is still limited to repo-visible artifacts.
**Recommended Options:**

- Extend the JSON action trail beyond structural audits to more repo-native commands.
- Add a lightweight resolved/unresolved workflow for escalation events if open-event handling becomes necessary.
  **Severity:** Important — causes friction
  **Remediation Level:** Medium — broaden mounted baseline

---

**Area:** Pillar 1
**Feature:** P1-5 Observability / Dashboards
**Governed By:** EP-8 — You cannot improve what you do not measure
**Current State:** `scripts/generate-observation-report.js` now produces richer JSON metrics and a generated `.harness/dashboard.md`; `audit.sh` verifies both outputs.
**Prevention Active:** `P1-5` Prevent Blind Execution and `P1-5` Prevent Narrative Observability Metrics — the structural baseline is mounted, with only broader runtime action coverage still deferred.
**Recommended Options:**

- Extend centralized logging beyond structural audits when more repo-native command coverage is worth the noise.
- Add external alert routing only if HELab moves into sustained MAS or long-running unattended execution.
  **Severity:** Improvement complete for current SAS baseline
  **Remediation Level:** Monitor

---

**Area:** Pillar 1
**Feature:** P1-6 Web Search & MCP Integration
**Governed By:** EP-12 — Finite attention demands active management
**Current State:** `.harness/mcp-capabilities.json` now declares the canonical capability surface, but the checked-in repo still ships no MCP server manifests and no external lookup trail is logged.
**Prevention Active:** `P1-6` Prevent Narrative MCP Server Manifests — the manifest exists, but checked-in runtime coverage remains partial.
**Recommended Options:**

- Add a checked-in MCP server manifest only when HELab needs one as a repo dependency rather than an IDE runtime assumption.
- Log externally sourced lookups when they materially influence repo decisions.
  **Severity:** Enhancement — nice to have
  **Remediation Level:** Light — keep partial

---

**Area:** Pillar 2
**Feature:** P2-4 Bounded Autonomy & Access Control
**Governed By:** EP-17 — Capabilities proportional to risk
**Current State:** `.harness/agent-permissions.json` now provides the canonical permission manifest, and `AGENTS.md` explicitly distinguishes durable policy from local IDE overrides.
**Prevention Active:** `P2-4` Prevent Narrative Permission Policies — a machine-readable manifest now exists at the repo level.
**Recommended Options:**

- Revisit stronger mechanical enforcement only if HELab adds higher-risk operations such as deployments or side-effecting external APIs.
  **Severity:** Improvement complete for current SAS baseline
  **Remediation Level:** Monitor

---

**Area:** Foundation
**Feature:** P0-5 Orchestration Logic
**Governed By:** EP-5 — Coordination cost must stay bounded
**Current State:** HELab ships workflow definitions and can use IDE subagents, but there is no supervisor/router layer, no topology config, and no task queue. Current operation remains SAS-primary.
**Prevention Active:** None currently active in day-to-day self-hosting because the repo is not operating a sustained MAS topology.
**Recommended Options:**

- Defer a router/topology layer until HELab starts regular MAS execution.
- If MAS usage increases, implement basic supervisor routing and context-preserving handoffs.
  **Severity:** Enhancement — nice to have
  **Remediation Level:** Light — defer

---

**Area:** Foundation
**Feature:** P0-10 Inter-Agent Communication (The Mailbox)
**Governed By:** EP-5 — Coordination cost must stay bounded
**Current State:** No mailbox, shared queue, or message schema is present. Subagent communication remains parent-context mediated by the IDE runtime.
**Prevention Active:** None in current SAS-primary operation, but the repo still lacks the canonical MAS communication substrate described by the framework.
**Recommended Options:**

- Defer implementation until HELab needs regular multi-agent message passing.
- When needed, implement a file-backed mailbox with a strict JSON schema and bounded retry rules.
  **Severity:** Enhancement — nice to have
  **Remediation Level:** Light — defer

---
