# Core Features of MAS

Core features of Harness Engineering for MAS - Multi-Agent Systems.When upgrading from a single-agent harness to a Multi-Agent System (MAS), the framework must be significantly adapted to handle the complexities of decentralized collaboration. In a MAS, challenges like quadratic coordination overhead, cascading hallucinations across agents, and emergent behaviors require the harness to act less like a simple track and more like a highly orchestrated, secure factory floor.

Based on the latest architectural principles for multi-agent workflows, here is the re-organized **3-Pillar and 1-Foundation Framework tailored for the MAS version**, expanding and upgrading the core features:

## Foundational Infrastructure (Execute)

_In a MAS, the engine doesn't just execute code; it must orchestrate dynamic communication, prevent collisions between autonomous workers, and trace accountability across the swarm._

- **P0-1. Bash Sandboxes:** Secure, on-demand execution environments equipped with runtimes and test runners. In MAS, each agent gets an isolated sandbox.
- **P0-2. Filesystem, Git & File Locking:** The shared workspace must now implement strict file locking and task-claiming mechanisms to prevent race conditions when multiple teammates attempt to edit the same file or claim the same task simultaneously.
- **P0-3. Collective Verification (extends Self-Verification):** Because one agent's error can cause cascading hallucinations downstream, verification expands into consensus-seeking protocols, requiring multiple agents to vote or debate before committing partial solutions to the shared state.
- **P0-4. Ralph Loops:** Execution hooks that intercept premature exits and reinject prompts to force task completion. Per-agent exit interception with reinjection across context resets.
- **P0-5. Multi-Agent Orchestration Logic:** Shifts from simple task routing to dynamically managing topologies (such as Supervisor, Hierarchical, Peer-to-Peer, Blackboard, or Swarm patterns) based on the task type to prevent quadratic coordination overhead, which can degrade sequential reasoning performance by up to 70%.
- **P0-6. Rippable Middleware:** Composable middleware layers that can be safely removed as underlying AI models improve. Per-agent middleware stacks with independent enable/disable controls.
- **P0-7. Escalation Policies + Audit Trails:** Because decision-making is distributed and can lead to unpredictable emergent behaviors, the harness must maintain strict logs of exactly which agent initiated an action, what data it accessed, and how it influenced peers, resolving the dilemma of decentralized liability.
- **P0-8. Harness Versioning:** A/B testing infrastructure for comparing harness configurations across the swarm, tracking per-agent performance metrics per version.
- **P0-9. Smart Command Wrappers:** Elevating raw system commands into intelligent, multi-step workflows (e.g., `ccp`, `ccpr`, `reconcile`) that integrate agent reasoning and repository intent. Shared across all agents.
- **P0-MAS. Inter-Agent Communication (The Mailbox):** A dedicated messaging bus that allows agents to communicate directly via peer-to-peer (P2P) messaging, broadcast to the swarm, and send idle notifications. _(MAS-only addition)_

---

## Pillar 1: Context Engineering (Inform)

_In a MAS, context is no longer just about feeding one model; it is about maintaining a coherent shared reality across a network of agents without overwhelming individual context windows._

- **P1-7. Shared Task Lists & Blackboards:** Evolving from single-agent plan files into centralized knowledge spaces where teammates can view statuses, autonomously claim unassigned work, and incrementally build upon each other's partial solutions.
- **P1-2. Distributed Memory Management:** The harness intelligently separates _short-term memory_ (immediate session history) from _long-term memory_ (centralized vector databases). This allows agents to selectively synchronize knowledge and maintain shared context without suffering from "context rot".
- **P1-1. Repository as Truth:** Encoding all project rules directly into the codebase to establish a ground truth for all agents.
- **P1-3. Tool Offloading:** Stripping noisy tool outputs to keep only the head and tail tokens in context, while storing the full results. In a MAS, offloaded tool results can be saved to shared blackboards for other agents to read without polluting their context.
- **P1-4. Progressive Skills:** Loading specific tools into an agent's context only when needed for their specific role.
- **P1-5. Observability / Dashboards:** Serving real-time system and CI/CD statuses into the agents' dynamic context.
- **P1-6. Web Search & MCP Integration:** Providing external tools to access real-time data beyond the model's training cutoff.
- **P1-8. Context Anchoring (Shared Anchor Files):** Writing critical decision points to persistent memory files (what, why, target, background) that all agents can access. In MAS, anchor files serve as shared strategic alignment records, ensuring all agents operate from the same long-term goals even across independent context windows.
- **P1-9. Branch-Based Cognitive Memory:** Decomposing complex tasks into independent sub-task branches for parallel parallel agents, relying on merge gates and detailed commit histories for transparent structural memory.
- **P1-10. Shared Requirements Ledger:** Extending the single-agent Requirements Ledger into a multi-agent synchronized source of truth. All agents read from and write to the same ledger, with file locking to prevent conflicting entries and ensure no agent works on phantom requirements.

---

## Pillar 2: Architectural Constraints (Constrain)

_With multiple agents interacting, the attack surface expands massively. This pillar must now mechanically enforce security, permissions, and constructive adversarial friction._

- **P2-4. Bounded Autonomy & Access Control:** Enforcing real-time guardrails and strict permissions. If one agent falls victim to prompt injection or hallucination, access controls ensure it cannot expose restricted data or hijack peer agents in the workflow.
- **P2-3. Diverse Collaboration Channels (formerly AI Auditors):** Moving beyond simple cooperative review to include _Competition_ (where agents debate competing hypotheses to find the root cause) and _Coopetition_ (where agents compromise). Designing agents to actively challenge each other prevents anchoring bias and yields faster convergence on the truth.
- **P2-1. Automated Linters:** Pre-commit hooks that automatically reject non-compliant code before it enters the shared repository.
- **P2-2. Dependency Enforcement:** Structural boundaries that restrict which architectural layers any given agent is allowed to modify.
- **P2-5. Distributed Upstream Intake Gate:** A swarm-wide constraint ensuring all agents check the shared Requirements Ledger before claiming work, preventing multiple agents from independently interpreting and building conflicting features.

---

## Pillar 3: Entropy Management (Maintain)

_As multiple agents generate code and modify states concurrently, the codebase accumulates technical debt much faster. Maintenance must focus heavily on conflict resolution._

- **P3-1. Scheduled Cleanups (Conflict Resolution):** Dedicated cleanup agents running in the background to not only catch standard errors but to reconcile overlapping or conflicting code changes made by concurrent agent teams.
- **P3-2. Documentation Sync:** Agents designated to actively audit and update project documentation so it accurately reflects the rapidly living state of the code.
- **P3-3. Pattern Auditing:** System sweeps that track and resolve circular dependencies, dead code, or deviations from established coding patterns.
- **P3-4. Documentation Consolidation Pipeline (Consolidation Loop):** Auto-updates core documentation, accumulates changelogs, updates config files, and tracks issue history as features land and bugs are fixed.
