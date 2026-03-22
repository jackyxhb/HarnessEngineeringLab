# Harness Engineering Enhancement Options

When implementing or upgrading a harness, use these options to translate the 25 core features into concrete **Actions** and **Tools**.

## Pillar 1: Context Engineering (Inform)

### 1. Repository as Truth

- **Action:** Encode all project rules, architectural decisions, and style guides directly into the codebase at agent startup.
- **Action:** Cross-link design documents to ensure the model isn't blind to human knowledge.
- **Tool:** Localized memory files like `AGENTS.md`, `CLAUDE.md`, or `.cursorrules`.

### 2. Distributed Memory Management (Context Compaction)

- **Action:** Actively manage "context rot" by intelligently summarizing and separating short-term memory (session history) from long-term memory.
- **Tool:** Vector Databases to index past interactions and retrieved documents for long-term memory retrieval.

### 3. Tool Offloading

- **Action:** Prevent noisy tool outputs from filling the agent's context window by keeping only head and tail tokens above a specific threshold.
- **Tool:** The filesystem (offload the full, unedited tool results directly to the filesystem for later access).

### 4. Progressive Skills

- **Action:** Apply "progressive disclosure" to prevent context degradation from loading too many tools at startup.
- **Action:** Load specific skill front-matter into context only when an agent is assigned a task requiring that role.
- **Tool:** Modular skill and tool configuration files.

### 5. Observability / Dashboards

- **Action:** Serve real-time system states as dynamic context so agents can observe their own work.
- **Tool:** Logs, metrics, traces, screenshots, and live CI/CD pipeline statuses.
- **Tool:** Agent Performance Monitoring Dashboards for human oversight.

### 6. Web Search & MCP Integration

- **Action:** Give agents access to real-time knowledge and current data beyond their training cutoff.
- **Tool:** Web Search tools.
- **Tool:** Model Context Protocol (MCP) servers (e.g., Context7).

### 7. Shared Task Lists & Blackboards (Planning)

- **Action:** Maintain a shared task list where agents can autonomously view statuses, claim unassigned work, and build upon partial solutions.
- **Action:** Store plan files and inject reminders so agents can decompose goals and stay on track.
- **Tool:** Centralized knowledge spaces (Blackboards).
- **Tool:** The filesystem (for storing shared plan files).

### 8. Context Anchoring

- **Action:** At key decision points, write concise structured records to persistent memory files capturing: **what** (action taken), **why** (rationale), **target** (what it affects), and **background** (relevant context).
- **Action:** Ensure agents recall anchor records at session start or after context resets to re-establish long-term goals and strategy.
- **Tool:** Structured anchor files (e.g., `ANCHORS.md`, `decisions.log`, or per-task decision records).
- **Tool:** Recall hooks that auto-inject anchor summaries into fresh context windows.

### 9. Branch-Based Cognitive Memory

- **Action:** Split complex objectives into subtasks, execute each in a new branch concurrently, and merge back to the parent task branch.
- **Action:** Produce concise, accurate commit messages during branching and merging to act as critical "approval of evidence" and natural memory storage.
- **Tool:** Git Worktrees and Concurrent Branch Management scripts.

---

## Pillar 2: Architectural Constraints (Constrain)

### 10. Bounded Autonomy & Access Control

- **Action:** Limit agent actions to prevent prompt injection and data exfiltration across the network.
- **Action:** Block malicious queries before they reach downstream agents.
- **Tool:** Real-time guardrails and network isolation.
- **Tool:** Risk-based boundaries (e.g., requiring human approval for financial transactions or system modifications).

### 11. Diverse Collaboration Channels (AI Auditors)

- **Action:** Deploy secondary LLM-based agents to review the primary agent's output for compliance and security.
- **Action:** Structure interactions to actively prevent anchoring bias.
- **Tool:** Cooperative channels (assembly line review).
- **Tool:** Competitive channels (adversarial debate/competing hypotheses to find root causes).
- **Tool:** Coopetition channels (negotiating and compromising).

### 12. Automated Linters

- **Action:** Mechanically enforce what good code looks like to save tokens and prevent the agent from exploring dead ends.
- **Tool:** Custom deterministic linters.
- **Tool:** Pre-commit hooks that automatically flag and reject non-compliant code before it enters the repository.

### 13. Dependency Enforcement

- **Action:** Mechanically restrict which architectural layers an agent can import from or modify.
- **Tool:** Structural testing frameworks (e.g., ArchUnit).

---

## Pillar 3: Entropy Management (Maintain)

### 14. Scheduled Cleanups

- **Action:** Catch constraint violations and reconcile overlapping or conflicting code changes made by concurrent agent teams.
- **Tool:** Dedicated background cleanup agents running on specific daily/weekly schedules or via event-based triggers.

### 15. Documentation Sync

- **Action:** Prevent documentation drift by actively verifying that READMEs and API docs match the living state of the code.
- **Tool:** Dedicated documentation consistency agents.

### 16. Pattern Auditing

- **Action:** Run system sweeps to ensure long-term codebase health as AI generates high volumes of code.
- **Tool:** Pattern enforcement and dependency auditing agents configured to hunt down dead code and circular dependencies.

### 17. Documentation Consolidation Pipeline (Consolidation Loop)

- **Action:** Auto-update core documentation (e.g., CLAUDE.md system counts), accumulate changelogs, update config files (e.g., HarnessConfig.json), and track issue history as features land and bugs are fixed.
- **Action:** Prompt for Architectural Decision Record (ADR) creation when new architectural patterns are introduced.
- **Tool:** Automated consolidation pipelines and background documentation agents.

---

## Foundational Infrastructure (Execute)

### 18. Multi-Agent Orchestration Logic

- **Action:** Define how agents are spawned, how tasks are handed off, and how workflows are parallelized.
- **Action:** Avoid multi-agent setups for simple sequential tasks to prevent quadratic coordination overhead.
- **Tool:** Orchestration Topologies (Supervisor, Hierarchical, Peer-to-Peer, Blackboard, or Swarm).
- **Tool:** Frameworks like LangGraph (conditional routing), CrewAI (role-based), AutoGen (actor model), or OpenAI Swarm.

### 19. Inter-Agent Communication (The Mailbox)

- **Action:** Provide a messaging bus for agents to communicate without relying solely on a central supervisor.
- **Tool:** Direct peer-to-peer messaging functions (`message`).
- **Tool:** Swarm broadcasting (`broadcast`) and idle notifications.

### 20. Filesystem, Git & File Locking

- **Action:** Use the filesystem as the core collaboration surface and durable storage.
- **Action:** Implement explicit file locking and task-claiming mechanisms to prevent race conditions when multiple agents try to edit the same file.
- **Tool:** Git (for versioning, tracking work, and rolling back errors).

### 21. Collective Verification (Self-Verification)

- **Action:** Ground solutions in tests before agents complete a task to prevent cascading hallucinations across the network.
- **Tool:** Test execution suites and pre-completion checklists.
- **Tool:** Consensus-seeking protocols or voting mechanisms.
- **Tool:** Task completion hooks (e.g., `TaskCompleted` exiting with code 2 to prevent completion on failure).

### 22. Audit Trails & Accountability (Escalation Policies)

- **Action:** Maintain visibility to trace accountability, debug failures, and handle agents that get permanently stuck.
- **Tool:** Strict audit logs recording which agent initiated an action, what data was accessed, and who it influenced.
- **Tool:** Automated escalation triggers for human intervention.

### 23. Bash Sandboxes

- **Action:** Do not run agent code locally; provision safe, scalable, and isolated execution environments.
- **Tool:** General-purpose bash execution tools.
- **Tool:** Sandboxes pre-installed with language runtimes, test runners, CLI tools, and browsers.
- **Tool:** Visual split-pane terminals (e.g., `tmux` or `iTerm2`) to monitor multiple sandbox environments simultaneously.

### 24. Ralph Loops

- **Action:** Intercept premature model exits to force long-horizon task completion.
- **Tool:** Ralph Loops (intercepts an exit attempt and reinjects the prompt into a fresh context window).
- **Tool:** Composable Middleware (e.g., loop detection middleware, reasoning sandwiches).

### 25. Rippable Middleware & Harness Versioning

- **Action:** Structure the harness modularly so obsolete logic can be safely removed ("ripped out") as underlying AI models get smarter natively.
- **Tool:** A/B Testing Infrastructure for harness versioning.
