# OBSERVABILITY.md — Agent Observability Stack

> Observability is not just for humans.  
> The agent must be able to **query, reason, and act** on logs, metrics, and traces directly.  
> If the agent can't see it, it can't fix it.

---

## Why Observability Must Be Agent-Accessible

As agent code throughput increases, the human QA bottleneck is **observability capacity**. The solution is to make logs, metrics, and traces directly legible to the agent — enabling the agent to:

- Reproduce bugs by observing runtime state
- Validate fixes by querying real signals
- Express and enforce SLO-style goals as prompt constraints
- Iterate without a human reading logs on its behalf

This is not optional. Without agent-accessible observability, human QA becomes the irreducible bottleneck.

---

## Stack Architecture

Each agent worktree runs its own **fully isolated, ephemeral observability stack**, torn down when the task completes.

```
App (per worktree)
    │
    ▼
Vector (log/metric/trace fan-out)
    │
    ├─► Victoria Logs     ← queryable via LogQL
    ├─► Victoria Metrics  ← queryable via PromQL
    └─► Victoria Traces   ← queryable via TraceQL
              │
              ▼
        Codex agent
  (queries, correlates, reasons, acts)
```

### Signal Types

| Signal | Store | Query Language | Example Use |
|---|---|---|---|
| **Logs** | Victoria Logs | LogQL | "Show all ERROR logs for the startup sequence" |
| **Metrics** | Victoria Metrics | PromQL | `histogram_quantile(0.99, app_startup_duration_seconds_bucket)` |
| **Traces** | Victoria Traces | TraceQL | "Find spans over 2s in the checkout user journey" |

---

## Per-Worktree Isolation

Every git worktree gets its own isolated environment:

- **App instance**: The application is bootable per worktree. Each Codex task launches and drives its own instance.
- **Observability stack**: Logs, metrics, and traces are scoped to that worktree's app instance.
- **Teardown**: When the task completes (or the worktree is removed), the observability stack is torn down with it. No cross-contamination between tasks.

This enables:

- Parallel agent tasks without observability interference
- Clean signal — no historical noise from other runs
- Agents sleeping for hours and resuming to a consistent state

---

## UI Legibility via Chrome DevTools Protocol

In addition to the observability stack, each worktree's app is driveable via Chrome DevTools Protocol (CDP), exposing:

| Capability | What the Agent Can Do |
|---|---|
| **DOM snapshots** | Inspect UI state at any point in a flow |
| **Screenshots** | Capture visual state before/after actions |
| **Navigation** | Drive the app through user journeys programmatically |
| **Runtime events** | Observe JavaScript errors, network calls, console output |

### UI Validation Loop

```
1. Snapshot state before action
2. Trigger UI path
3. Observe runtime events via CDP
4. Snapshot state after action
5. Apply fix if needed
6. Restart app
7. Re-run validation
8. Repeat until clean
```

This loop is implemented as repository-embedded skills. See `docs/references/` for the CDP skill API surface.

---

## Video Recording as Validation Artifact

As part of the full autonomy loop, agents produce video recordings to demonstrate:

1. **Bug reproduction**: A recording showing the failure before the fix
2. **Fix validation**: A recording showing the resolved behavior after the fix

These recordings are attached to the pull request as validation evidence. They allow human reviewers to verify correctness visually without running the app themselves.

> This is not optional for user-facing bug fixes. A PR that claims to fix a user-visible bug must include before/after recordings.

---

## Expressing Goals as Observability Constraints

Because the agent has direct query access, goals can be expressed as observable constraints:

| Goal | Prompt Form |
|---|---|
| Fast startup | "Ensure service startup completes in under 800ms" |
| Low-latency journeys | "No span in these four critical user journeys exceeds two seconds" |
| Error-free deploys | "Zero ERROR-level log lines during the startup sequence" |
| Metric threshold | "99th percentile checkout latency must be below 500ms" |

The agent translates these into PromQL/LogQL/TraceQL queries, validates against real app signals, and iterates until the constraint is satisfied.

---

## Escalation Criteria

The agent works autonomously until it encounters a signal requiring human judgment:

| Signal | Action |
|---|---|
| Metric constraint cannot be satisfied after N iterations | Escalate to human with trace evidence |
| Error pattern is non-deterministic or environment-specific | Escalate with logs and reproduction steps |
| Fix requires architectural change outside current task scope | Escalate with proposed design |
| Video recording shows ambiguous UX regression | Escalate for human visual judgment |

> Escalation is not failure. It is correct behaviour. The contract is: the agent exhausts its available signals and tools before asking a human.

---

## Lifecycle Summary

```
Task starts
    │
    ├── Worktree created
    ├── App instance booted
    ├── Observability stack started (logs, metrics, traces)
    │
    ├── Agent runs task
    │       ├── Queries signals as needed
    │       ├── Drives UI via CDP
    │       ├── Iterates until constraints satisfied
    │       └── Records videos for validation artifacts
    │
    ├── PR opened with recordings attached
    ├── Agent reviews satisfied
    ├── PR merged
    │
    └── Worktree torn down → observability stack torn down
```

---

## Further Reading

- [AGENTS.md](./AGENTS.md) — top-level navigation and full autonomy loop
- [ARCHITECTURE.md](./ARCHITECTURE.md) — structural rules and domain model
- [QUALITY.md](./QUALITY.md) — taste invariants and entropy control
- `docs/references/` — CDP skill API surface and observability query examples
