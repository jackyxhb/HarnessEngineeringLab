# HE-CLUES

**Date:** 2026-04-12
**Auditor:** GitHub Copilot (Claude Opus 4.6)
**Target:** HELab (self-host)

---

**Area:** Foundation
**Feature:** P0-1 Bash Sandboxes
**Governed By:** EP-1 — Isolation prevents contamination
**Current State:** No explicit sandbox infrastructure. HELab is a docs/framework repo — agents edit Markdown and run Node.js scripts (he-lint, sync). No application code, no compilation, no deployment. `.husky/pre-commit` runs linting. Contamination risk is inherently low due to repo nature.
**Prevention Active:** None actively triggered. "Prevent Persistent Local State" and "Prevent Unmonitored Sandbox State" technically apply — agent sessions persist local state and side-effects are not monitored per sandbox spec — but impact is negligible for a docs-first repo.
**Recommended Options:** Defer. Document the risk acceptance for docs-first repos in AGENTS.md as an explicit SAS-for-docs exemption.
**Severity:** Enhancement — nice to have
**Remediation Level:** Light — meta-doc update

---

**Area:** Foundation
**Feature:** P0-4 Ralph Loops
**Governed By:** EP-4 — Committed tasks must be completed
**Current State:** `scripts/exit-interceptor.js` exists with `checkPrematureExit()` and `triggerReinjection()` exports. AGENTS.md specifies loop budgets (max 3 reinjections), escalation thresholds (2 failed → human), and state persistence via `.harness/task-state.json`. However: (1) `exit-interceptor.js` is not wired into any workflow, pre-commit hook, or CI gate; (2) `.harness/task-state.json` does not exist; (3) `.harness/reinjection-log.jsonl` does not exist; (4) no agent workflow references the exit interceptor.
**Prevention Active:** "Prevent Premature Exits" — agents can stop mid-task and declare "done" without any interception. "Prevent Narrative Task State" — no machine-readable task state is being produced.
**Recommended Options:**

- Wire `exit-interceptor.js` as a post-task hook or AGENTS.md instruction for agents to run before closing.
- Seed `.harness/task-state.json` schema so the script can read it.
- Add AGENTS.md instruction: "Run `node scripts/exit-interceptor.js` after task completion."
  **Severity:** Important — causes friction (premature task abandonment is a known agent failure mode)
  **Remediation Level:** Medium — add feature/hook

---

**Area:** Foundation
**Feature:** P0-5 Orchestration Logic
**Governed By:** EP-5 — Coordination cost must stay bounded
**Current State:** 8 registered workflows in `.agent/workflows/`. SAS-primary operation. Subagent dispatch available in some IDE contexts (Claude Code `Task` tool, VS Code `Explore` subagent). No automated task routing, topology selection, or worker-pool management. Workflows are agent-invoked, not orchestrator-invoked.
**Prevention Active:** None directly. "Prevent Quadratic Coordination Overhead" is not triggered because HELab operates in SAS mode. "Prevent Supervisor Bottlenecks" is N/A for SAS.
**Recommended Options:** Defer significant investment. Document SAS-primary scale in AGENTS.md. Review when HELab transitions to regular MAS operation.
**Severity:** Enhancement — nice to have (SAS context)
**Remediation Level:** Light — meta-doc update

---

**Area:** Foundation
**Feature:** P0-7 Escalation Policies & Audit Trails
**Governed By:** EP-7 — Every action must be traceable
**Current State:** AGENTS.md specifies JSON logging format (timestamp, agent_id, action, target, result, duration_ms), log location (`.harness/agent-logs.jsonl`), logging triggers (every tool use, file edit, command execution), and 30-day retention. `scripts/exit-interceptor.js` contains heartbeat-style monitoring. `scripts/generate-observation-report.js` reads `agent-logs.jsonl`. However: (1) `.harness/agent-logs.jsonl` does not exist — no agent actually emits logs to it; (2) no escalation triggers are mechanically wired; (3) no notification integrations exist.
**Prevention Active:** "Prevent Silent Looping" — no heartbeat monitoring is active. "Prevent Narrative Audit Trails" — audit logs are not being generated at all, making JSON standardization moot.
**Recommended Options:**

- The logging spec is aspirational: current IDE agents (Claude Code, VS Code Copilot) do not natively emit JSON logs to a repo file. Mechanical enforcement requires an agent wrapper or post-session hook that doesn't yet exist at the IDE level.
- Accept the gap for now; add a stub `.harness/agent-logs.jsonl` with schema documentation so future tooling can target it.
- Wire `exit-interceptor.js` heartbeat check into the `/cognitive-branch` workflow as a pre-merge validation.
  **Severity:** Important — causes friction (no operational traceability)
  **Remediation Level:** Medium — add feature/hook

---

**Area:** Foundation
**Feature:** P0-10 Inter-Agent Communication (The Mailbox)
**Governed By:** EP-5 — Coordination cost must stay bounded
**Current State:** No mailbox mechanism, message queue, or structured inter-agent communication. HELab operates SAS-primary. When subagents are dispatched (e.g., Explore subagent in VS Code, Task tool in Claude Code), communication is through the parent agent's context — not a shared mailbox.
**Prevention Active:** None triggered — SAS operation means no inter-agent messaging loops possible.
**Recommended Options:** Defer. Document SAS-primary exemption. Revisit if HELab begins regular MAS operation or adds orchestration middleware.
**Severity:** Enhancement — nice to have
**Remediation Level:** Light — meta-doc update

---

**Area:** Pillar 1
**Feature:** P1-3 Tool Offloading
**Governed By:** EP-12 — Finite attention demands active management
**Current State:** The `harnessing-agents` skill enforces progressive context loading and trajectory reduction checkpoints (flush raw outputs after each phase). No repo-level mechanical gate prevents tool output from dominating agent context. IDE-level tool output management is controlled by the IDE, not the repo.
**Prevention Active:** None mechanically enforced at repo level. Skill-level instructions mitigate for harnessing-agents skill users only.
**Recommended Options:** Defer repo-level enforcement — this is primarily an IDE/agent-runtime concern. The skill already addresses it for its own execution context.
**Severity:** Enhancement — nice to have
**Remediation Level:** Light — meta-doc update

---

**Area:** Pillar 1
**Feature:** P1-5 Observability / Dashboards
**Governed By:** EP-8 — You cannot improve what you do not measure
**Current State:** `scripts/generate-observation-report.js` exists — reads `.harness/agent-logs.jsonl` and produces summary stats. `.harness/observation-report.json` exists as a stub. `.harness/dashboard.md` exists. `audit.sh` tracks structural integrity (21 required files, feature/principle counts, workflow registry). Weekly GC workflow produces GitHub Issues for violations. However: (1) `agent-logs.jsonl` doesn't exist, so observation reports are empty; (2) no real-time alerting; (3) harness structural integrity IS monitored (via audit.sh + CI).
**Prevention Active:** "Prevent Blind Execution" — agent actions do not produce an audit trail that a separate auditor can verify. "Prevent Narrative Observability Metrics" — no metrics are being generated.
**Recommended Options:**

- Structural observability (audit.sh, he-lint, CI) is strong. The gap is in runtime agent-action observability.
- Same root cause as P0-7: IDE agents don't natively emit repo-file logs.
- Strengthen what's working: add he-lint result metrics to observation-report.json; wire audit.sh results into dashboard.md.
  **Severity:** Important — causes friction
  **Remediation Level:** Medium — add feature/hook

---

**Area:** Pillar 1
**Feature:** P1-6 Web Search & MCP Integration
**Governed By:** EP-12 — Finite attention demands active management
**Current State:** `.continue/mcpServers/` directory exists with MCP server configuration. IDE-level MCP and web search tools are available (VS Code has `vscode-websearchforcopilot_webSearch`; Claude Code has web search tools). No repo-level manifest of available MCP capabilities. No audit trail of external data used in agent decisions.
**Prevention Active:** None critically. "Prevent Knowledge Silos" is partially mitigated by IDE-level web search access. "Prevent Narrative MCP Server Manifests" — no machine-readable MCP capability manifest exists at the repo level.
**Recommended Options:** Defer — MCP integration is IDE-managed. Document available MCP servers in AGENTS.md for agent awareness.
**Severity:** Enhancement — nice to have
**Remediation Level:** Light — meta-doc update

---

**Area:** Pillar 1
**Feature:** P1-11 Socratic Questioning
**Governed By:** EP-14 — Clarity before commitment
**Current State:** No explicit Socratic questioning protocol. No mechanical gate that forces agents to pause and clarify before executing on ambiguous inputs. AGENTS.md has extensive rules and conventions but no "Socratic pause" requirement. The harnessing-agents skill has Mode routing (keywords trigger specific modes), which is a form of intent disambiguation, but no structured inquiry template for general agent tasks.
**Prevention Active:** "Prevent Premature Execution" — agents can start implementation on ambiguous inputs without surfacing assumptions. No record of clarifications is maintained.
**Recommended Options:**

- Add an AGENTS.md instruction requiring agents to confirm understanding of multi-step tasks before execution.
- This is primarily a skill/workflow concern — the harnessing-agents skill already routes by keyword; general agent behavior is harder to gate mechanically without IDE-level support.
- Add a Socratic pause requirement in AGENTS.md for any task involving changes to review-required surfaces.
  **Severity:** Important — causes friction (misunderstood tasks waste agent cycles)
  **Remediation Level:** Light — meta-doc update (AGENTS.md instruction)

---

**Area:** Pillar 2
**Feature:** P2-2 Dependency Enforcement
**Governed By:** EP-15 — Mechanical enforcement over advisory guidance
**Current State:** `he-lint.js` validates: feature file count (32), principle file count (19), feature ID format, requirement-gate consistency, review-ledger format, downstream reference validity. No import-graph analysis (repo has no application code with imports). No architectural boundary definitions beyond feature/principle structure. For a docs-first repo, the "dependency" concern maps to: do feature files reference correct dependency IDs? he-lint validates this.
**Prevention Active:** Partially addressed. "Prevent Boundary Overreach" — not applicable to a docs repo in the traditional sense. he-lint does enforce the feature-to-principle dependency structure and downstream references.
**Recommended Options:**

- For HELab's docs-first nature, dependency enforcement IS implemented via he-lint's structural validation.
- Could strengthen by adding cross-reference validation: verify that every `downstream` link in HE Index.md matches a corresponding "Required by" or "Interacts with" entry in the target feature file.
  **Severity:** Enhancement — nice to have
  **Remediation Level:** Medium — add feature/hook (he-lint enhancement)

---

**Area:** Pillar 2
**Feature:** P2-4 Bounded Autonomy & Access Control
**Governed By:** EP-17 — Capabilities proportional to risk
**Current State:** AGENTS.md has 18 DO NOT rules with consequence statements. The harnessing-agents skill declares `allowed-tools` constraints. `.claude/settings.local.json` may contain Claude Code-specific permission settings. No machine-readable permission manifest. No tiered permission model. No secret scanning or PII detection in CI (not needed — no application code or secrets in a framework docs repo).
**Prevention Active:** "Prevent Unauthorized Privilege Escalation" — partially addressed by DO NOT rules; not mechanically enforced beyond agent contract text. "Prevent Narrative Permission Policies" — no JSON permission manifests.
**Recommended Options:**

- For a docs-first repo, the risk profile is low. The primary risk is agents editing canonical surfaces without review — which P2-3 and P2-5 already gate.
- Document the risk acceptance: for HELab, bounded autonomy is achieved through review gates + intake gates rather than tool-access whitelists.
  **Severity:** Enhancement — nice to have
  **Remediation Level:** Light — meta-doc update

---

**Area:** Pillar 3
**Feature:** P3-3 Pattern Auditing
**Governed By:** EP-18 — Entropy requires scheduled countering
**Current State:** `he-lint.js` validates structural patterns (feature count, principle count, ID format, naming convention). `/reconcile` workflow audits for entropy (broken content, inconsistent terminology, duplication). Weekly GC workflow runs `audit.sh`. No formal coding-pattern registry or anti-pattern definitions beyond AGENTS.md conventions convention rules.
**Prevention Active:** None critically. "Prevent Pattern Drift" — the weekly GC and `/reconcile` address this at the structural level. No coding pattern drift possible in a docs-first repo (no application code).
**Recommended Options:** Existing enforcement is appropriate for repo type. Could enhance by adding naming-convention validation to he-lint (e.g., verify Title Case with spaces, max 5 words as specified in AGENTS.md conventions).
**Severity:** Enhancement — nice to have
**Remediation Level:** Medium — add feature/hook

---
