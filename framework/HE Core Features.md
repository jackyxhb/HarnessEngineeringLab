# HE Core Features

The canonical 30 core features of Harness Engineering, organized under the 3-Pillar + 1-Foundation framework (see `ANCHORS.md`). These features apply universally — scaling naturally from a single agent to multi-agent systems without requiring separate definitions.

## Foundational Infrastructure (Execute)

_The execution engine and orchestration layer that the harness is built upon. It runs code, orchestrates agents, prevents collisions, and traces accountability._

- **P0-1. Bash Sandboxes:** Secure, on-demand execution environments equipped with language runtimes, test runners, and a general-purpose bash tool. Each agent gets an isolated sandbox.
- **P0-2. Filesystem, Git & File Locking:** The core primitive for durable storage, version control, and collaboration. Implements file locking and task-claiming mechanisms to prevent race conditions when multiple agents edit the same file or claim the same task.
- **P0-3. Verification (Self & Collective):** Feedback loops allowing agents to write code, run tests, inspect logs, and autonomously fix errors before completion. Scales to consensus-seeking protocols where multiple agents vote or debate before committing partial solutions to shared state.
- **P0-4. Ralph Loops:** Execution hooks that intercept an agent's exit attempt and reinject the prompt alongside previous state to force the completion of long-horizon tasks. Per-agent exit interception with reinjection across context resets.
- **P0-5. Orchestration Logic:** The routing layer responsible for spawning subagents, handling task handoffs, and managing agent teams working in parallel. Supports topology selection (Supervisor, Hierarchical, Peer-to-Peer, Blackboard, Swarm) based on task type to prevent quadratic coordination overhead.
- **P0-6. Rippable Middleware:** Composable middleware layers that add specific capabilities but can be easily removed as underlying AI models improve. Per-agent middleware stacks with independent enable/disable controls.
- **P0-7. Escalation Policies & Audit Trails:** Automated triggers and routing systems for when agents get stuck and require human intervention. Maintains strict logs of which agent initiated an action, what data it accessed, and how it influenced peers — resolving the dilemma of decentralized liability.
- **P0-8. Harness Versioning:** The ability to version control the harness and run A/B tests to discover the most productive configurations, including per-agent performance tracking.
- **P0-9. Smart Command Wrappers:** Elevating raw system commands into intelligent, multi-step workflows (e.g., `ccp`, `ccpr`, `reconcile`) that integrate agent reasoning and repository intent. Shared across all agents. Commands must be stratified by execution cost: a fast gate (e.g., `smoke`) for pre-commit frequency, a full quality gate (e.g., `check`/`ci`) for pre-push, and a structural integrity audit (e.g., `audit`) for on-demand harness health. Command names must remain stable across harness versions; implementations evolve behind the wrapper.
- **P0-10. Inter-Agent Communication (The Mailbox):** A dedicated messaging bus that allows agents to communicate via peer-to-peer (P2P) messaging, broadcast to the swarm, and send idle notifications.

---

## Pillar 1: Context Engineering (Inform)

_The largest pillar. Encompasses everything related to managing what the model sees: its memory, durable storage, real-time knowledge, and strategic continuity. In multi-agent setups, context extends to maintaining a coherent shared reality across a network of agents._

- **P1-1. Repository as Truth:** Encoding all project rules and static context directly into the codebase, eliminating reliance on human-only knowledge. Establishes ground truth for all agents. Requires three explicit components: (1) a **Failure Ledger** where every rule traces to a concrete incident — not generic advice; (2) a **Forbidden Operations** section listing what agents must never do, with the consequence of each violation stated inline; and (3) a **Tool Declaration** listing all available tools and scripts — undeclared tools do not exist to agents.
- **P1-2. Context Compaction & Memory Management:** Intelligently summarizing and offloading older context to prevent "context rot." Separates short-term memory (session history) from long-term memory (centralized stores), allowing agents to selectively synchronize knowledge.
- **P1-3. Tool Offloading:** Stripping noisy tool outputs to keep only the head and tail tokens in context, while storing the full results. Offloaded results can be saved to shared surfaces for other agents to read without polluting their context.
- **P1-4. Progressive Skills:** Loading specific tool logic into context only when needed via progressive disclosure, matched to each agent's assigned role.
- **P1-5. Observability / Dashboards:** Serving as "Dynamic Context," giving agents real-time access to logs, metrics, traces, and CI/CD pipeline statuses. Tracks per-agent metrics and cross-agent correlations. Harness structural integrity — required file existence, workflow registry completeness, and hook liveness — is a first-class signal category alongside logs and metrics. A dedicated observability spec (e.g., `docs/OBSERVABILITY.md`) defines the minimum observable fields, alert thresholds, and signal sources that must remain green before any agent run is trusted.
- **P1-6. Web Search & MCP Integration:** Utilizing external search and Model Context Protocol (MCP) tools to access up-to-date information beyond the model's training cutoff. Cached lookups can be shared across agents.
- **P1-7. Planning, Task Lists & Blackboards:** Using the filesystem to store plan files and inject reminders so agents decompose goals and stay on track. Scales to centralized knowledge spaces where agents view statuses, autonomously claim unassigned work, and build upon each other's partial solutions. Plan entries must use a structured format — goal, scope, status, checkboxed steps, constraints, and checkpoints — and front-load enough durable context that an agent can resume after a full context reset from the plan file alone, without replaying conversation history. Completed plans must be archived inline, not deleted, to preserve a traceable record of resolved constraints and blocking issues for future agents.
- **P1-8. Context Anchoring:** Syncing critical decision points (what, why, target, background) to persistent memory files so agents recall long-term goals and strategy even across context window resets. Anchor files serve as shared strategic alignment records across all agents.
- **P1-9. Branch-Based Cognitive Memory:** Splitting complex objectives into subtasks across concurrent branches, using merges and structured commit messages as functional memory checkpoints. Parallel agents execute sub-task branches concurrently.
- **P1-10. Requirements Ledger:** Capturing all incoming user stories, requirements, and functional scenario narratives into a single unified ledger document before any planning or execution begins. All agents read from and write to the same ledger, with file locking to prevent conflicting entries.
- **P1-11. Socratic Questioning:** Applying structured Socratic questioning to extract complete, unambiguous information before execution begins. When confronting unclear inputs — statements, requirements, tasks, or problems — the agent pauses and systematically interrogates using six question categories (Clarification, Probing Assumptions, Probing Reason & Evidence, Questioning Viewpoints, Probing Implications, Questions about the Question) until all ambiguities are resolved. The goal is cooperative discovery to reach complete clarity before committing to a plan. In MAS, specialized interrogator agents probe different dimensions in parallel before merging a consensus clarifications document.

---

## Pillar 2: Architectural Constraints (Constrain)

_Mechanically enforces what good code looks like so agents don't waste tokens exploring dead ends. With multiple agents, the attack surface expands — this pillar also enforces security, permissions, and constructive adversarial friction._

- **P2-1. Automated Linters:** Deterministic rules and pre-commit hooks that automatically flag and reject non-compliant code. Enforcement must be **CI-wired** — pre-commit hooks alone can be bypassed and are insufficient as the sole gate. Every linter error must include a **teaching message**: a `↳ Fix:` line pointing to the canonical source and exact remediation, so agents can self-correct on first re-attempt without human intervention. Linters may extend beyond content quality to include **structural existence checks** — verifying required harness files are present — so that harness degradation is surfaced at commit time rather than waiting for the weekly entropy scan.
- **P2-2. Dependency Enforcement:** Structural tests that mechanically restrict which architectural layers agents can import from. In documentation-first repositories, applies equally to **document layer hierarchies**: canonical docs (`framework/`) are the source of truth; derived docs (`research/`) must not contradict them — enforced by structural lint checks validating pillar labels, terminology, and feature counts against canonical definitions.
- **P2-3. AI Auditors & Collaboration Channels:** Secondary LLM-based agents reviewing output for architectural compliance. Includes Cooperation (assembly line review), Competition (agents debate competing hypotheses), and Coopetition (agents compromise) — actively preventing anchoring bias.
- **P2-4. Bounded Autonomy & Access Control:** Defining explicit scope boundaries and access controls for how far an agent can go without human escalation. Enforces real-time guardrails ensuring a compromised agent cannot expose restricted data or hijack peers.
- **P2-5. Upstream Intake Gate:** Mechanically enforcing that all requirement-like artifacts are captured in the Requirements Ledger before planning and execution proceed. All agents validate the ledger before claiming work.

---

## Pillar 3: Entropy Management (Maintain)

_Also known as "Garbage Collection." Manages the health of the codebase over time as AI generates code. With concurrent agents, debt accumulates faster and maintenance must include conflict resolution._

- **P3-1. Scheduled Cleanups:** Dedicated cleanup agents running on schedules to catch code that slipped past earlier checks and reconcile overlapping or conflicting changes from concurrent agents. The implementation mechanism is a **CI cron trigger** (e.g., weekly) — a manually-invoked workflow does not qualify as scheduled cleanup. Output is a discrete report or issue per GC category, not a single large manual audit. Complement the CI-cron trigger with a local `audit.sh` script for on-demand structural health checks that agents can invoke before deployment or after major changes, without waiting for the scheduled cycle.
- **P3-2. Documentation Sync:** Agents that actively verify and update project documentation so it matches the current, living state of the code.
- **P3-3. Pattern Auditing:** Agents that track and resolve circular dependencies, dead code, or deviations from established coding patterns — including cross-agent pattern divergence.
- **P3-4. Consolidation Loop:** Agents that auto-update core system counts, track issue history, maintain changelogs, and prompt for ADRs to keep central knowledge synchronized with the codebase.
