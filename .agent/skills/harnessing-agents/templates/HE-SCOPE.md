# HE-SCOPE: Phase 0 Pre-Flight Assessment

> **Phase:** Pre-Flight (Pre-chain: Scope)
> **Purpose:** Establish project scope and baseline before Phase 1 principle analysis begins.
> **Output Location:** `./.harness/HE-SCOPE.md` (in target project root)
> **Reference:** `framework/HE Index.md` (32 total features: P0-1 through P3-4)

---

## 1. Project Metadata

**Project Name:** _(e.g., "DataPipeline Orchestrator")_

**Project Type:** _(Select one)_
- [ ] Framework/Library
- [ ] Application (Standalone/Web)
- [ ] Service/Microservice
- [ ] CLI Tool
- [ ] Agent/Automation Platform
- [ ] Other: _______________

**Scale Classification:** _(Select one)_
- [ ] **SAS** — Single-Agent System (one agent, sequential or minimal coordination)
- [ ] **MAS** — Multi-Agent System (multiple agents, distributed coordination, messaging)

**Tech Stack:**
- **Primary Language:** _(e.g., Python, TypeScript, Go, Rust)_
- **Agent Framework/Runtime:** _(e.g., Claude SDK, LangChain, LlamaIndex, Custom)_
- **Key Dependencies:** _(e.g., FastAPI, PostgreSQL, Redis, Kubernetes)_
- **Orchestration/Execution:** _(e.g., Docker, Kubernetes, Lambda, Job Queue)_

---

## 2. Quick Feature Scan (L2 Targeted Enhancement Presence)

**Instructions:** Walk `framework/HE Index.md` and check each feature's L2 targeted enhancement for presence in this project. Mark presence as:
- **Y** = L2 enhancement is implemented/present
- **N** = L2 enhancement is absent
- **Partial** = Partial/incomplete implementation of L2 enhancement

| Feature | Name | L2 Target | Present? | Notes |
|---------|------|-----------|----------|-------|
| P0-1 | Principle Alignment | Agent design follows stated engineering principles | _____ | |
| P0-2 | Metadata Discipline | Consistent harness metadata (versioning, ownership) | _____ | |
| P0-3 | Routing & Orchestration | Multi-agent routing and task dispatch | _____ | |
| P0-4 | Workflow Phases | Explicit phase management (e.g., Pre/Post hooks) | _____ | |
| P1-1 | Goal Clarity | Agent goals explicitly defined and tracked | _____ | |
| P1-2 | Safety Boundaries | Injection, prompt, and capability boundaries present | _____ | |
| P1-3 | Action Constraints | Explicit permission/prohibition framework | _____ | |
| P1-4 | Tool Auditing | Discovered tools audited for safety & capability | _____ | |
| P2-1 | Context Loading | State/context passed explicitly to agents | _____ | |
| P2-2 | Error Recovery | Defined fallback & recovery mechanisms | _____ | |
| P2-3 | Execution Isolation | Agent execution sandboxed/isolated | _____ | |
| P2-4 | Decision Transparency | Agent reasoning/decisions logged & inspectable | _____ | |
| P3-1 | State Awareness | Agent maintains & validates internal state | _____ | |
| P3-2 | Deadlock Prevention | Mechanisms prevent circular waits/deadlock | _____ | |
| P3-3 | Graceful Degradation | Fallback behavior on cascade failure | _____ | |
| P3-4 | Observability | Traces, metrics, & dashboards in production | _____ | |

```text
Add additional feature rows as needed. Reference the HE Index.md file header for
canonical feature file paths (e.g., P0-1 resolves to framework/features/P0-01.md).
```

---

## 3. Harness Maturity Level Assessment

**Definition:** Classify the target project's current harness maturity on the scale below. Select ONE that best describes the project.

- **Level 0: No Harness**
  - No structured agent governance, safety boundaries, or coordination framework.
  - Example: Agents are invoked ad-hoc with minimal oversight.

- **Level 1: Minimal Harness**
  - Basic boundaries exist (e.g., restricted tool access), but no integrated governance framework.
  - Example: Some safety rules documented, but no systematic phase management.

- **Level 2: Structured Harness**
  - Explicit phases, metadata discipline, and clear action constraints.
  - Example: Pre/Post hooks defined, tool audit performed, routing policies in place.

- **Level 3: Integrated Harness**
  - Multi-dimensional governance (L1 Principles + L2 Enhancements), state awareness, and recovery mechanisms.
  - Example: Full L1→L5 chain implemented for critical paths; observability dashboard present.

- **Level 4: Mature Harness**
  - Production-grade: All 32 features implemented; automated failure detection, graceful degradation, full observability.
  - Example: Harness certification pathway complete; continuous audit integration.

**Current Assessment:** **Level ___**

**Justification:**
_(Briefly explain why this level was chosen. Reference key observations from the feature scan above.)_

```text
Example:
Level 1 — Agent invocation is present but lacks structured phase management,
no metadata discipline for ownership tracking, and tool auditing is informal.
```

---

## 4. Injection Context Classification (Optional)

**When to Complete:** Complete this section if the audit is expected to progress into repo edits (Phase 3 or Phase 4 mutation). This classification identifies touch-points where live mutation may occur.

**Reference:** `references/he-harness-injection-protocol-draft.md`

| Context Type | Present? | Risk Level | Notes |
|--------------|----------|-----------|-------|
| **Planning Context** | Yes/No | Low/Medium/High | _(New features, design docs, roadmap edits)_ |
| **Live Operational** | Yes/No | Low/Medium/High | _(Active agent processes, logs, state)_ |
| **Contract/Interfaces** | Yes/No | Low/Medium/High | _(API signatures, tool bindings, protocols)_ |
| **Verification/Testing** | Yes/No | Low/Medium/High | _(Test suites, CI/CD pipelines, validation logic)_ |
| **Volatile Touch-Points** | Yes/No | Low/Medium/High | _(Frequently modified files, hot-reload code, config)_ |

**Injection Risk Summary:**
_(Identify the highest-risk areas where harness edits should be applied cautiously or staged incrementally.)_

```text
Example:
Live Operational (HIGH) — Agent execution happens in production containers.
Recommend staging harness changes in feature branch with integration tests before
production rollout. Contract/Interfaces (MEDIUM) — Tool bindings are versioned;
audit will recommend new safety boundaries that must be backward-compatible.
```

---

## 5. Audit Metadata

**Audit Date:** _______________

**Auditor/Agent:** _(Name or identifier of agent conducting audit)_

**Next Phase:** Phase 1 — Gap Analysis (L1: Principles)
_(Proceed to framework/features/ for detailed per-feature assessment)_

---

### Notes & Instructions

1. **Feature Scan Scope:** The quick scan examines L2 _targeted enhancement_ presence only. Full L1→L5 assessment happens in Phase 1+.
2. **Canonical Paths:** Feature files are zero-padded; P0-1 = `framework/features/P0-01.md`, P0-2 = `framework/features/P0-02.md`, etc.
3. **Anti-Termination Rule:** Phase 0 is informational; do not skip or reduce subsequent phases based on maturity level or project type. All phases apply to projects with agents.
4. **No External Dependencies:** This template is self-contained and does not require external tools or files to complete.
5. **Trajectory Reduction:** After completing Phase 0, transition directly to Phase 1 without storing raw scan outputs in working memory.
