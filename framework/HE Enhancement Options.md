# Harness Engineering Enhancement Options

When implementing or upgrading a harness, use these options to translate the 29 core features into concrete **Actions** and **Tools**.

## P0 — Foundational Infrastructure (Execute)

### P0-1. Bash Sandboxes

- **Action:** Do not run agent code locally; provision safe, scalable, and isolated execution environments.
- **Tool:** General-purpose bash execution tools.
- **Tool:** Sandboxes pre-installed with language runtimes, test runners, CLI tools, and browsers.
- **Tool:** Visual split-pane terminals (e.g., `tmux` or `iTerm2`) to monitor multiple sandbox environments simultaneously.

### P0-2. Filesystem, Git & File Locking

- **Action:** Use the filesystem as the core collaboration surface and durable storage.
- **Action:** Implement explicit file locking and task-claiming mechanisms to prevent race conditions when multiple agents try to edit the same file.
- **Tool:** Git (for versioning, tracking work, and rolling back errors).

### P0-3. Verification (Self & Collective)

- **Action:** Ground solutions in tests before agents complete a task to prevent cascading hallucinations across the network.
- **Tool:** Test execution suites and pre-completion checklists.
- **Tool:** Consensus-seeking protocols or voting mechanisms.
- **Tool:** Task completion hooks (e.g., `TaskCompleted` exiting with code 2 to prevent completion on failure).

### P0-4. Ralph Loops

- **Action:** Intercept premature model exits to force long-horizon task completion.
- **Tool:** Ralph Loops (intercepts an exit attempt and reinjects the prompt into a fresh context window).
- **Tool:** Composable Middleware (e.g., loop detection middleware, reasoning sandwiches).

### P0-5. Orchestration Logic

- **Action:** Define how agents are spawned, how tasks are handed off, and how workflows are parallelized.
- **Action:** Avoid multi-agent setups for simple sequential tasks to prevent quadratic coordination overhead.
- **Tool:** Orchestration Topologies (Supervisor, Hierarchical, Peer-to-Peer, Blackboard, or Swarm).
- **Tool:** Frameworks like LangGraph (conditional routing), CrewAI (role-based), AutoGen (actor model), or OpenAI Swarm.

### P0-6. Rippable Middleware

- **Action:** Structure the harness modularly so obsolete logic can be safely removed ("ripped out") as underlying AI models get smarter natively.
- **Action:** Use feature flags to toggle middleware components on/off; regularly audit relevance against current model capabilities.
- **Tool:** Composable middleware layers with independent enable/disable controls.

### P0-7. Escalation Policies

- **Action:** Maintain visibility to trace accountability, debug failures, and handle agents that get permanently stuck.
- **Action:** Define escalation triggers (N consecutive failures, time limits, loop detection) and route stuck tasks to humans.
- **Tool:** Strict audit logs recording which agent initiated an action, what data was accessed, and who it influenced.
- **Tool:** Automated escalation triggers for human intervention.
- **Tool:** Tiered escalation chains (retry → different agent → human).

### P0-8. Harness Versioning

- **Action:** Version-control all harness configuration (prompts, tools, middleware) to enable reproducibility and comparison.
- **Action:** Track agent performance metrics per harness version to identify optimal configurations.
- **Tool:** VCS-tracked harness configuration files.
- **Tool:** A/B Testing Infrastructure for comparing harness variants.

### P0-9. Smart Command Wrappers

- **Action:** Elevate raw system commands into intelligent, multi-step workflows that integrate agent reasoning and repository intent.
- **Action:** Standardize common tasks (commit, push, release, reconcile) to ensure deterministic execution order and metadata generation.
- **Tool:** Recommended wrapper workflows (e.g., `ccp`, `ccpr`, `reconcile`).
- **Tool:** Workflow installation scripts that provide localized command definitions.

### P0-10. Inter-Agent Communication (The Mailbox)

- **Action:** Provide a messaging bus for agents to communicate without relying solely on a central supervisor.
- **Tool:** Direct peer-to-peer messaging functions (`message`).
- **Tool:** Swarm broadcasting (`broadcast`) and idle notifications.
- **Tool:** Inter-agent messaging middleware.

---

## Pillar 1: Context Engineering (Inform)

### P1-1. Repository as Truth

- **Action:** Encode all project rules, architectural decisions, and style guides directly into the codebase at agent startup.
- **Action:** Cross-link design documents to ensure the model isn't blind to human knowledge.
- **Tool:** Localized memory files like `AGENTS.md`, `CLAUDE.md`, or `.cursorrules`.

### P1-2. Context Compaction & Memory Management

- **Action:** Actively manage "context rot" by intelligently summarizing and separating short-term memory (session history) from long-term memory.
- **Tool:** Vector Databases to index past interactions and retrieved documents for long-term memory retrieval.

### P1-3. Tool Offloading

- **Action:** Prevent noisy tool outputs from filling the agent's context window by keeping only head and tail tokens above a specific threshold.
- **Tool:** The filesystem (offload the full, unedited tool results directly to the filesystem for later access).

### P1-4. Progressive Skills

- **Action:** Apply "progressive disclosure" to prevent context degradation from loading too many tools at startup.
- **Action:** Load specific skill front-matter into context only when an agent is assigned a task requiring that role.
- **Tool:** Modular skill and tool configuration files.

### P1-5. Observability / Dashboards

- **Action:** Serve real-time system states as dynamic context so agents can observe their own work.
- **Tool:** Logs, metrics, traces, screenshots, and live CI/CD pipeline statuses.
- **Tool:** Agent Performance Monitoring Dashboards for human oversight.

### P1-6. Web Search & MCP Integration

- **Action:** Give agents access to real-time knowledge and current data beyond their training cutoff.
- **Tool:** Web Search tools.
- **Tool:** Model Context Protocol (MCP) servers (e.g., Context7).

### P1-7. Planning, Task Lists & Blackboards

- **Action:** Maintain a shared task list where agents can autonomously view statuses, claim unassigned work, and build upon partial solutions.
- **Action:** Store plan files and inject reminders so agents can decompose goals and stay on track.
- **Tool:** Centralized knowledge spaces (Blackboards).
- **Tool:** The filesystem (for storing shared plan files).

### P1-8. Context Anchoring

- **Action:** At key decision points, write concise structured records to persistent memory files capturing: **what** (action taken), **why** (rationale), **target** (what it affects), and **background** (relevant context).
- **Action:** Ensure agents recall anchor records at session start or after context resets to re-establish long-term goals and strategy.
- **Tool:** Structured anchor files (e.g., `ANCHORS.md`, `decisions.log`, or per-task decision records).
- **Tool:** Recall hooks that auto-inject anchor summaries into fresh context windows.

### P1-9. Branch-Based Cognitive Memory

- **Action:** Split complex objectives into subtasks, execute each in a new branch concurrently, and merge back to the parent task branch.
- **Action:** Produce concise, accurate commit messages during branching and merging to act as critical "approval of evidence" and natural memory storage.
- **Tool:** Git Worktrees and Concurrent Branch Management scripts.

### P1-10. Requirements Ledger

- **Action:** Capture all incoming user stories, requirements, and functional scenarios into a single unified ledger document before any planning or execution begins.
- **Action:** Each entry should capture: ID, title, narrative/scenario, acceptance criteria, status (recorded/planned/executed), and source (who/when).
- **Tool:** Canonical requirements file (e.g., `REQUIREMENTS.md`, `BACKLOG.md`) in the project root.
- **Tool:** Pre-planning validation hooks that check the ledger before plan/execute workflows proceed.

---

## Pillar 2: Architectural Constraints (Constrain)

### P2-1. Automated Linters

- **Action:** Mechanically enforce what good code looks like to save tokens and prevent the agent from exploring dead ends.
- **Tool:** Custom deterministic linters.
- **Tool:** Pre-commit hooks that automatically flag and reject non-compliant code before it enters the repository.

### P2-2. Dependency Enforcement

- **Action:** Mechanically restrict which architectural layers an agent can import from or modify.
- **Tool:** Structural testing frameworks (e.g., ArchUnit).

### P2-3. AI Auditors & Collaboration Channels

- **Action:** Deploy secondary LLM-based agents to review the primary agent's output for compliance and security.
- **Action:** Structure interactions to actively prevent anchoring bias.
- **Tool:** Cooperative channels (assembly line review).
- **Tool:** Competitive channels (adversarial debate/competing hypotheses to find root causes).
- **Tool:** Coopetition channels (negotiating and compromising).

### P2-4. Bounded Autonomy & Access Control

- **Action:** Limit agent actions to prevent prompt injection and data exfiltration across the network.
- **Action:** Block malicious queries before they reach downstream agents.
- **Tool:** Real-time guardrails and network isolation.
- **Tool:** Risk-based boundaries (e.g., requiring human approval for financial transactions or system modifications).

### P2-5. Upstream Intake Gate

- **Action:** Enforce a mandatory validation step before any planning or execution workflow: verify the requirement is recorded in the Requirements Ledger (P1-10).
- **Action:** If an agent discovers an implicit requirement mid-task, pause and sync it to the ledger before continuing.
- **Tool:** Ledger-check steps in planning workflows and meta-docs (e.g., a `requirementsCheck` step in `/polish` or `/cognitive-branch`).
- **Tool:** Pre-commit hooks or workflow gates that reject plans without matching ledger entries.

---

## Pillar 3: Entropy Management (Maintain)

### P3-1. Scheduled Cleanups

- **Action:** Catch constraint violations and reconcile overlapping or conflicting code changes made by concurrent agent teams.
- **Tool:** Dedicated background cleanup agents running on specific daily/weekly schedules or via event-based triggers.

### P3-2. Documentation Sync

- **Action:** Prevent documentation drift by actively verifying that READMEs and API docs match the living state of the code.
- **Tool:** Dedicated documentation consistency agents.

### P3-3. Pattern Auditing

- **Action:** Run system sweeps to ensure long-term codebase health as AI generates high volumes of code.
- **Tool:** Pattern enforcement and dependency auditing agents configured to hunt down dead code and circular dependencies.

### P3-4. Consolidation Loop

- **Action:** Auto-update core documentation (e.g., CLAUDE.md system counts), accumulate changelogs, update config files (e.g., HarnessConfig.json), and track issue history as features land and bugs are fixed.
- **Action:** Prompt for Architectural Decision Record (ADR) creation when new architectural patterns are introduced.
- **Tool:** Automated consolidation pipelines and background documentation agents.
