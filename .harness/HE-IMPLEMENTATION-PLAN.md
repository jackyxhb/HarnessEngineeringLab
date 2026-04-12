# HE Implementation Plan

**Date:** 2026-04-12
**Auditor:** GitHub Copilot (Claude Opus 4.6)
**Target:** HELab (self-host)
**Scope:** Tier 1 + Tier 2 gaps from HE-PRIORITIES.md

---

## Batch 1: Tier 1 — Critical (Immediate)

### 1.1 P1-11 Socratic Questioning — Light

**Current State:** No disambiguation protocol exists. Agents may silently interpret ambiguous inputs.
**Root Cause:** Missing contract-level rule in AGENTS.md.
**Remediation:** Add a Socratic Pause protocol to AGENTS.md under `## Task Execution & Cognitive Memory`.

**Changes:**
| File | Action | Description |
|------|--------|-------------|
| `AGENTS.md` | Edit | Add Socratic Pause rule mandating agents surface assumptions and ask clarifying questions before executing ambiguous tasks. Include machine-readable escalation: if input has >1 valid interpretation, agent must ask before proceeding. |

**Verification:** `npm run smoke` passes. Next ambiguous task triggers clarification instead of silent assumption.
**Risk:** Low — pure contract change, no script or CI modification.

---

### 1.2 P0-1 Bash Sandboxes — Light

**Current State:** No sandbox isolation. Agents execute on the developer's machine.
**Root Cause:** HELab is a docs-first repo with no application code. Sandbox isolation has near-zero operational value here.
**Remediation:** Document explicit risk acceptance per L5 improvement policy: "For docs-first repositories where agents edit only Markdown and run only linters/validators, sandbox isolation is not required. This decision should be revisited if application code is added."

**Changes:**
| File | Action | Description |
|------|--------|-------------|
| `AGENTS.md` | Edit | Add a risk-acceptance note under `## Conventions` documenting that sandbox isolation (P0-1) is accepted as not-applicable for a docs-first, no-build-artifact repo. Cite conditions for re-evaluation. |

**Verification:** `npm run smoke` passes.
**Risk:** None — documents existing reality.

---

### 1.3 P1-5 Observability / Dashboards — Medium

**Current State:** `audit.sh` provides structural observability (file existence, workflow registry, pre-commit health). `generate-observation-report.js` is functional but depends on `agent-logs.jsonl` which is never populated because IDE agents don't emit structured file-based logs.
**Root Cause:** IDE agents (Claude Code, GitHub Copilot, Cursor, Windsurf) don't write to repo log files. The AGENTS.md logging spec is aspirational.
**Remediation:**
1. Wire `generate-observation-report.js` into `npm run audit` so it runs alongside `audit.sh`.
2. Extend `audit.sh` to append a structural observation entry to `agent-logs.jsonl` each time it runs, providing minimum data flow for the report generator.
3. Update AGENTS.md logging configuration to mark runtime agent logging as IDE-dependent and add the audit-based observability as the achievable baseline.

**Changes:**
| File | Action | Description |
|------|--------|-------------|
| `scripts/harness/audit.sh` | Edit | Append a JSON Lines entry to `.harness/agent-logs.jsonl` at the end of each audit run (timestamp, agent_id="harness-audit", action="structural-audit", result, duration_ms). |
| `package.json` | Edit | Chain `generate-observation-report.js` into the `audit` npm script. |
| `AGENTS.md` | Edit | Update Centralized Logging Configuration to distinguish achievable baseline (audit-triggered) from aspirational runtime logging (IDE-dependent). |

**Verification:** `npm run audit` produces `.harness/observation-report.json` with at least one entry. `npm run smoke` passes.
**Risk:** Low — extends existing scripts, no new dependencies.

---

## Batch 2: Tier 2 — Important (Mid-term)

### 2.1 P0-7 Escalation Policies & Audit Trails — Medium

**Current State:** AGENTS.md specifies logging format but no operational escalation rules. No heartbeat or stuck-detection mechanism.
**Root Cause:** True automated escalation (heartbeat monitoring, external orchestrator) requires MAS infrastructure that doesn't exist in SAS context. However, contract-level escalation rules are achievable.
**Remediation:**
1. Add escalation protocol rules to AGENTS.md: if an agent hits 3 consecutive failures on the same step, STOP execution and present a diagnostic to the user.
2. This complements Ralph Loops (P0-4) configuration already in AGENTS.md by adding the "what to do when stuck" contract.

**Changes:**
| File | Action | Description |
|------|--------|-------------|
| `AGENTS.md` | Edit | Add an Escalation Protocol subsection under Ralph Loops Configuration. Define: 3 consecutive same-step failures → stop + present diagnostic. Document that automated escalation (notifications, orchestrator routing) requires MAS infrastructure. |

**Verification:** `npm run smoke` passes.
**Risk:** Low — contract-level rule.

---

### 2.2 P0-4 Ralph Loops — Medium

**Current State:** `exit-interceptor.js` exists with `checkPrematureExit()` and `triggerReinjection()` functions. Not wired into any workflow. AGENTS.md references `node scripts/exit-interceptor.js` but no workflow calls it.
**Root Cause:** The script was created as infrastructure-first without a caller. IDE agents don't run post-task hooks automatically.
**Remediation:**
1. Wire exit-interceptor into `npm run audit` as a check: if `.harness/task-state.json` exists and shows incomplete steps, emit a warning.
2. Add an AGENTS.md rule: after completing a multi-step task, agents should verify completion by checking the todo list or task state against the original objective before declaring done.

**Changes:**
| File | Action | Description |
|------|--------|-------------|
| `scripts/harness/audit.sh` | Edit | Add an exit-interceptor check: if `.harness/task-state.json` exists, run `node scripts/exit-interceptor.js` and report incomplete tasks as a warning. |
| `AGENTS.md` | Edit | Add a completion verification rule: agents must verify all planned steps are done before declaring task complete. Reference P0-4 Ralph Loops. |

**Verification:** `npm run audit` includes exit-interceptor output when task-state.json is present. `npm run smoke` passes.
**Risk:** Low — extends audit workflow, no breaking changes.

---

## Batch 3: Tier 3 — Deferred

Features P0-5, P0-10, P1-3, P1-6, P2-2, P2-4, P3-3 score ≤ 2.5 and are contextually adequate for HELab's docs-first, SAS-primary profile. **No action this cycle.** Re-evaluate if HELab adds application code or transitions to MAS.

---

## Execution Order

```text
Batch 1 (3 items):  P1-11 → P0-1 → P1-5
Batch 2 (2 items):  P0-7 → P0-4
```

All Batch 1 changes can be implemented in a single commit. Batch 2 changes depend on Batch 1's AGENTS.md edits being in place.

## Summary

| Batch | Items | Files Touched | Estimated Scope |
|-------|-------|---------------|-----------------|
| 1 | 3 | AGENTS.md, audit.sh, package.json | 5 edits across 3 files |
| 2 | 2 | AGENTS.md, audit.sh | 3 edits across 2 files |
| Total | 5 | 3 unique files | 8 edits |
