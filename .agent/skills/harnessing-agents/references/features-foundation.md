# Feature Chain: P0 — Foundation (Execute)
Assessment chain: **What to Do** → **Don't Do** → **Options**. See also: `features-pillar1.md` (P1) · `features-pillar2-3.md` (P2–P3).

## P0-1. Bash Sandboxes

### What to Do
Secure, on-demand execution environments equipped with language runtimes, test runners, and isolation. In MAS, each agent gets an isolated sandbox. Never run agent code directly on a developer's local machine.

### Don't Do
_(No direct prevention entry — P0-1 is foundational infrastructure. Its absence degrades P0-3 Verification, P1-3 Tool Offloading, and P1-6 MCP Integration.)_
### Options
- **Action:** Provision safe, scalable, and isolated execution environments — do not run agent code locally.
- **Tool:** General-purpose bash execution tools.
- **Tool:** Sandboxes pre-installed with language runtimes, test runners, CLI tools, and browsers.
- **Tool:** Visual split-pane terminals (e.g., `tmux` or `iTerm2`) to monitor multiple sandbox environments simultaneously.

### Remediation Tiers
- [Tier 1] Provision isolated environments per session.
- [Tier 2] Add visual monitoring; auto-scale sandbox pools.

---

## P0-2. Filesystem, Git & File Locking

### What to Do
The core primitive for durable storage, version control, and a shared collaboration surface. In MAS, implement strict file locking and task-claiming mechanisms to prevent race conditions when multiple teammates attempt to edit the same file or claim the same task simultaneously.

### Don't Do
**Prevent State and File Conflicts:** You must prevent race conditions where multiple agents overwrite each other's code or claim the same tasks simultaneously. Prevent this by implementing explicit file locking, shared task lists, and breaking work down so teammates own different sets of files.

### Options
- **Action:** Use the filesystem as the core collaboration surface and durable storage.
- **Action:** Implement explicit file locking and task-claiming mechanisms to prevent race conditions.
- **Tool:** Git (for versioning, tracking work, and rolling back errors).

### Remediation Tiers
- [Tier 1] Implement per-agent worktrees or branches. Ensure every session is Git-tracked.
- [Tier 2] File locking for shared MAS workspaces; rollback automation.

---

## P0-3. Verification (Self & Collective)

### What to Do
Feedback loops allowing agents to write code, run tests, inspect logs, and autonomously fix errors before completion. In MAS, verification expands into consensus-seeking protocols, requiring multiple agents to vote or debate before committing partial solutions to the shared state.

### Don't Do
**Prevent Cascading Hallucinations:** You must prevent one agent's mistake, hallucination, or overconfidence from corrupting the decisions of downstream peer agents. This is prevented by enforcing collective verification and consensus-seeking protocols before committing work.

### Options
- **Action:** Ground solutions in tests before agents complete a task to prevent cascading hallucinations.
- **Tool:** Test execution suites and pre-completion checklists.
- **Tool:** Consensus-seeking protocols or voting mechanisms.
- **Tool:** Task completion hooks (e.g., `TaskCompleted` exiting with code 2 to prevent completion on failure).

### Remediation Tiers
- [Tier 1] Make test passes a gating criteria for task finalization.
- [Tier 2] Add pre-completion checklists; consensus voting in MAS.

---

## P0-4. Ralph Loops

### What to Do
Execution hooks that intercept an agent's exit attempt and reinject the prompt alongside previous state to force the completion of long-horizon tasks. Per-agent exit interception with reinjection across context resets.

### Don't Do
**Prevent Premature Exits:** You must prevent models from stopping early or losing coherence over long horizons. Prevent this using "Ralph Loops" to intercept exit attempts and reinject prompts to force task completion.

### Options
- **Action:** Intercept premature model exits to force long-horizon task completion.
- **Tool:** Ralph Loops (intercepts an exit attempt and reinjects the prompt into a fresh context window).
- **Tool:** Composable Middleware (e.g., loop detection middleware, reasoning sandwiches).

### Remediation Tiers
- [Tier 1] Build prompt reinjection with state summaries.
- [Tier 2] Set max-retry limits (loop budgets).

---

## P0-5. Orchestration Logic

### What to Do
The routing layer responsible for spawning subagents, handling task handoffs, and managing multi-agent teams working in parallel. In MAS, shifts from simple task routing to dynamically managing topologies (Supervisor, Hierarchical, Peer-to-Peer, Blackboard, or Swarm) based on task type.

### Don't Do
**Prevent Quadratic Coordination Overhead:** You must prevent the exponential growth of communication paths between agents. Over-communicating can degrade performance by 39% to 70% on sequential reasoning tasks. Prevent this by using appropriate routing topologies and limiting team sizes.

**Prevent Supervisor Bottlenecks:** In hierarchical or supervisor patterns, you must prevent the central coordinating agent from becoming a single point of failure that stalls the entire workflow when request volumes spike.

**Prevent Runaway Concurrency Costs:** You must prevent token costs from scaling linearly or quadratically without matching performance gains. Prevent this by avoiding agent swarms for simple tasks that a single session could handle.

### Options
- **Action:** Define how agents are spawned, how tasks are handed off, and how workflows are parallelized.
- **Action:** Avoid multi-agent setups for simple sequential tasks to prevent quadratic coordination overhead.
- **Tool:** Orchestration Topologies (Supervisor, Hierarchical, Peer-to-Peer, Blackboard, or Swarm).
- **Tool:** Frameworks like LangGraph (conditional routing), CrewAI (role-based), AutoGen (actor model), or OpenAI Swarm.

### Remediation Tiers
- [Tier 1] Implement basic supervisor pattern.
- [Tier 2] Add context-preserving handoffs and dynamic topology switching.

---

## P0-6. Rippable Middleware

### What to Do
Composable middleware layers that add specific capabilities but can be easily removed ("ripped out") as underlying AI models improve. Per-agent middleware stacks with independent enable/disable controls.

### Don't Do
**Prevent Over-Engineering the Control Flow:** You must prevent the harness from becoming a brittle, static cage. Hardcoding overly complex pipelines will break when underlying models naturally improve. Prevent this by building "rippable" middleware that can be easily removed.

### Options
- **Action:** Structure the harness modularly so obsolete logic can be safely removed as models get smarter.
- **Action:** Use feature flags to toggle middleware components on/off; regularly audit relevance against current model capabilities.
- **Tool:** Composable middleware layers with independent enable/disable controls.

### Remediation Tiers
- [Tier 1] Refactor harness into independently removable layers.
- [Tier 2] Use feature flags; audit relevance regularly.

---

## P0-7. Escalation Policies & Audit Trails

### What to Do
Automated triggers and routing systems for when an agent gets stuck and requires human intervention. In MAS, maintain strict logs of exactly which agent initiated an action, what data it accessed, and how it influenced peers, resolving the dilemma of decentralized liability.

### Don't Do
**Prevent Opaque Decision-Making:** You must prevent decentralized unaccountability, where it is impossible to know _which_ agent made a harmful decision. Prevent this by enforcing strict audit trails that log every tool call, state transition, and inter-agent influence.

### Options
- **Action:** Maintain visibility to trace accountability, debug failures, and handle stuck agents.
- **Action:** Define escalation triggers (N consecutive failures, time limits, loop detection) and route stuck tasks to humans.
- **Tool:** Strict audit logs recording which agent initiated an action, what data was accessed, and who it influenced.
- **Tool:** Automated escalation triggers for human intervention.
- **Tool:** Tiered escalation chains (retry → different agent → human).

### Remediation Tiers
- [Tier 1] Define strict triggers (N failures, timeouts).
- [Tier 2] Implement tiered escalation (retry → peer agent → human).

---

## P0-8. Harness Versioning

### What to Do
Version-controlling all harness configuration (prompts, tools, middleware) to enable reproducibility and comparison. A/B testing infrastructure for comparing harness configurations across the swarm, tracking per-agent performance metrics per version.

### Don't Do
_(No direct prevention entry — P0-8 is a maturity amplifier. Its absence means you cannot track what configuration works best or reproduce agent behavior.)_
### Options
- **Action:** Version-control all harness configuration (prompts, tools, middleware) to enable reproducibility.
- **Action:** Track agent performance metrics per harness version to identify optimal configurations.
- **Tool:** VCS-tracked harness configuration files.
- **Tool:** A/B Testing Infrastructure for comparing harness variants.

### Remediation Tiers
- [Tier 1] Version-control complete harness configuration natively.
- [Tier 2] Build A/B testing pipelines tracking agent performance per config.

---

## P0-9. Smart Command Wrappers

### What to Do
Elevating raw system commands into intelligent, multi-step workflows (e.g., `ccp`, `ccpr`, `reconcile`) that integrate agent reasoning and repository intent. Shared across all agents. Ensure deterministic execution order and metadata generation.

### Don't Do
**Prevent Manual, Error-Prone CLI Execution:** You must prevent agents from manually executing raw, multi-step system commands (git, npm, shell) without standardization. Prevent this by mandating Smart Command Wrappers that ensure deterministic execution order and metadata generation.

### Options
- **Action:** Elevate raw system commands into intelligent, multi-step workflows that integrate agent reasoning.
- **Action:** Standardize common tasks (commit, push, release, reconcile) to ensure deterministic execution order.
- **Tool:** Recommended wrapper workflows (e.g., `ccp`, `ccpr`, `reconcile`).
- **Tool:** Workflow installation scripts that provide localized command definitions.

### Remediation Tiers
- [Tier 1] Install recommended wrappers as project workflows in `.agent/workflows/`.
- [Tier 2] Implement enforcement hooks to ensure agents use wrappers rather than raw commands.

---

## P0-10. Inter-Agent Communication (The Mailbox)

### What to Do
A dedicated messaging bus that allows agents to communicate directly via peer-to-peer (P2P) messaging, broadcast to the swarm, and send idle notifications.

### Don't Do
_(Covered by P0-5: Prevent Quadratic Coordination Overhead and Prevent Supervisor Bottlenecks. The Mailbox itself must not become a noisy broadcast channel that floods agent context windows.)_

### Options
- **Action:** Provide a messaging bus for agents to communicate without relying solely on a central supervisor.
- **Tool:** Direct peer-to-peer messaging functions (`message`).
- **Tool:** Swarm broadcasting (`broadcast`) and idle notifications.
- **Tool:** Inter-agent messaging middleware.
