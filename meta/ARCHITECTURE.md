# ARCHITECTURE.md — Layered Domain Architecture

> Architectural constraints are not bureaucracy.
> They are what allows agents to ship fast without decay or drift.
> **Enforce boundaries centrally. Allow autonomy locally.**

---

## Why Architecture Must Be Explicit

Human engineers accumulate architectural taste implicitly over years. Agents have no such memory. Without explicit, mechanically enforced architecture:

- Patterns drift across domains
- Cross-cutting concerns bleed everywhere
- Technical debt compounds invisibly
- Future agent runs produce inconsistent output

Therefore: **all architectural decisions must be encoded, explicit, and machine-verifiable.**

> [!IMPORTANT]
> **This is the kind of architecture you usually postpone until you have hundreds of engineers. With coding agents, it's an early prerequisite.** The constraints are what allows speed without decay or architectural drift. Do not defer architecture — invest in it from day one.

---

## Layered Domain Model

Every business domain follows a **strict forward-only dependency chain**:

```
Types → Config → Repo → Service → Runtime → UI
```

### Rules

1. Code may only depend **forward** — never backward — through the layers.
2. Cross-cutting concerns (auth, telemetry, feature flags, connectors) are **not** allowed to enter business logic directly. They enter through a single explicit interface: **Providers**.
3. A `Utils` module may exist outside domain boundaries and feed into Providers only.
4. App Wiring assembles everything at the outermost layer.

### Layer Responsibilities

| Layer | Responsibility |
|---|---|
| **Types** | Data shapes, enums, interfaces. No business logic. No I/O. |
| **Config** | Environment configuration. Read-only. No side effects. |
| **Repo** | Data access only. No business rules. Returns typed domain objects. |
| **Service** | Business logic. Orchestrates Repo and other Services. |
| **Runtime** | Side effects, integrations, external calls. Uses Service layer. |
| **UI** | Presentation only. Reads from Runtime/Service. No direct data access. |
| **Providers** | Injects cross-cutting concerns (auth, telemetry, flags) at the boundary. |

### What Is Not Allowed

- UI importing directly from Repo or Config
- Service calling UI
- Types importing from any other layer
- Cross-domain imports except through Providers
- Undocumented side effects at any layer below Runtime

---

## Enforcing the Architecture

Architectural rules are verified mechanically — **not by convention, not by review alone**.

### Required Enforcement Mechanisms

- **Custom linters** that enforce layer dependency directions at import/require level
- **Structural tests** that verify no forbidden edges exist in the dependency graph
- **CI jobs** that block PRs violating architecture rules
- **Error messages** in linters that include remediation instructions for agent context

> When you write a new linter rule, the error message must explain *how to fix the violation*, not just *that a violation occurred*. This injects remediation context directly into future agent runs.

### Adding New Domains

When creating a new business domain:

1. Create the full layer scaffold: `types/`, `config/`, `repo/`, `service/`, `runtime/`, `ui/`
2. Register the domain in `ARCHITECTURE.md` domain index (below)
3. Add linting rules covering the new domain's boundaries
4. Add structural tests verifying the layer graph is correct

---

## Per-Worktree App Isolation

Every agent task runs against its own **isolated application instance** in a dedicated git worktree.

### Rules

1. The application must be fully bootable per git worktree — no shared state between instances.
2. Each instance has its own ephemeral observability stack (logs, metrics, traces). See [`meta/OBSERVABILITY.md`](./OBSERVABILITY.md).
3. The observability stack is torn down when the worktree is removed — no cross-task contamination.
4. Each instance is driveable via Chrome DevTools Protocol so the agent can validate UI behaviour without a human in the loop.

### Why This Is an Architectural Requirement

- Without worktree isolation, parallel agent tasks produce interfering signals.
- Without agent-driveable instances, human QA becomes the bottleneck as throughput increases.
- The full autonomy loop (bug reproduction → fix → validation) depends on this isolation.

---

## Dependency Philosophy

### Prefer Boring, Composable Technologies

Agents model technologies most accurately when those technologies:

- Have **stable, well-documented APIs** — less drift from what the model learned during training
- Are **composable and predictable** — easy to reason about in isolation
- Are **well-represented in the model's training set** — mainstream, widely-used technologies are modelled more accurately than niche or novel ones

**Prefer**: established standards, simple primitives, in-repo implementations of small utilities.  
**Avoid**: opaque library internals, complex abstraction chains, rapidly evolving APIs.

> The training-data representation argument is decisive: a technology that exists heavily in public codebases is one the agent can reason about accurately. A novel or opaque library is a source of hallucination and guessing.

### Reimplement vs. Wrap — The Decision Rule

When a dependency's behaviour is critical but its internals are opaque to the agent:

| Situation | Decision |
|---|---|
| External package has stable, inspectable API | Wrap it. Use it as-is. |
| External package behaviour is opaque or non-standard | Reimplement the needed subset in-repo. |
| External package is large but only a small subset is needed | Reimplement the subset. |

Reimplementing is not a last resort — it is sometimes the **cheaper** option when wrapping an opaque upstream creates ongoing uncertainty.

### Own Your Utilities

When you implement a utility in-repo:

- Ensure 100% test coverage
- Integrate with existing observability (logging, tracing, metrics)
- Document its contract explicitly in the relevant layer
- Register it in the shared utility index so future agents don't hand-roll duplicates

> Example: rather than `p-limit`, a custom `mapWithConcurrency` helper tightly integrated with OpenTelemetry gives the agent full visibility, full testability, and full ownership.

### Multi-Agent Interoperability

Pulling more of the system into a form agents can inspect, validate, and modify directly increases leverage — **not just for one agent, but for all agents working on the codebase**.

Legibility investments compound across agents. A well-structured, agent-readable repository benefits every tool in the ecosystem — primary coding agents, review agents, cleanup agents, and third-party agents alike. Design the repository for agent diversity, not a single vendor.

---

## Parse at the Boundary

Data validation must happen **at system boundaries** — never deep inside business logic.

- Validate all external input (HTTP requests, queue messages, file reads) at the Repo or Runtime layer using a schema validator.
- Once data passes the boundary, treat it as trusted and typed.
- Never "YOLO-probe" data shapes — always validate or use typed SDKs.

This prevents agents from accidentally building on guessed, unvalidated shapes.

---

## Domain Index

> **This table is a required, actively maintained artifact.** It is the agent's top-level map of all business domains. Every new domain must be registered here when its layer scaffold is created. An unregistered domain is invisible to future agents.

| Domain | Layers Present | Owner | Status |
|---|---|---|---|
| *(none yet — register the first domain here when created)* | — | — | — |

Columns:

- **Domain**: Business domain name (matches the directory name)
- **Layers Present**: Comma-separated list of layers that exist (Types, Config, Repo, Service, Runtime, UI)
- **Owner**: Team or agent responsible for this domain
- **Status**: `active` / `deprecated` / `planned`

---

## Further Reading

- [AGENTS.md](./AGENTS.md) — top-level navigation map
- [KNOWLEDGE.md](./KNOWLEDGE.md) — knowledge management practices
- [QUALITY.md](./QUALITY.md) — taste invariants and coding standards
- `docs/design-docs/` — rationale for specific architectural decisions
