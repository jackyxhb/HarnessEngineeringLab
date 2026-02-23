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

## Dependency Philosophy

### Prefer Boring, Composable Technologies

Agents model technologies most accurately when those technologies:

- Have stable, well-documented APIs
- Are composable and predictable
- Are well-represented in training data

**Prefer**: established standards, simple primitives, in-repo implementations of small utilities.
**Avoid**: opaque library internals, complex abstraction chains, rapidly evolving APIs.

### Own Your Utilities

If a utility's behavior is critical and an external package's behaviour is opaque or non-standard:

- Implement the utility in-repo
- Ensure 100% test coverage
- Integrate with existing observability (logging, tracing, metrics)
- Document its contract explicitly in the relevant layer

> Example: rather than `p-limit`, a custom `mapWithConcurrency` helper tightly integrated with OpenTelemetry gives the agent full visibility, full testability, and full ownership.

---

## Parse at the Boundary

Data validation must happen **at system boundaries** — never deep inside business logic.

- Validate all external input (HTTP requests, queue messages, file reads) at the Repo or Runtime layer using a schema validator.
- Once data passes the boundary, treat it as trusted and typed.
- Never "YOLO-probe" data shapes — always validate or use typed SDKs.

This prevents agents from accidentally building on guessed, unvalidated shapes.

---

## Domain Index

*(Add each domain here as the project grows)*

| Domain | Layers Present | Owner | Status |
|---|---|---|---|
| *(none yet)* | — | — | — |

---

## Further Reading

- [AGENTS.md](./AGENTS.md) — top-level navigation map
- [KNOWLEDGE.md](./KNOWLEDGE.md) — knowledge management practices
- [QUALITY.md](./QUALITY.md) — taste invariants and coding standards
- `docs/design-docs/` — rationale for specific architectural decisions
