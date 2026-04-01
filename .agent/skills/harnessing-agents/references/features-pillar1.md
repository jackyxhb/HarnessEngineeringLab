# Feature Chain: Pillar 1 — Context Engineering (Inform)

Each feature follows the assessment chain: **What to Do** (definition) → **Don't Do** (prevention) → **Options** (actions & tools). Use this chain to assess a target project and recommend concrete improvements.

---

## P1-1. Repository as Truth

### What to Do
Encoding all project rules, architectural decisions, and style guides directly into the codebase, eliminating reliance on human-only knowledge. In MAS, establishes a ground truth for all agents.

### Don't Do
**Prevent Human-Only Documentation:** You must prevent project rules, APIs, and architectural decisions from living only in human heads, Slack threads, or private Google Docs. If information is not in the repository, the agent is blind to it.

**Prevent Inconsistent Shared Context (MAS):** You must prevent agents from operating on conflicting or outdated information. Without shared context management, agents will give inconsistent answers.

### Options
- **Action:** Encode all project rules, architectural decisions, and style guides directly into the codebase at agent startup.
- **Action:** Cross-link design documents to ensure the model isn't blind to human knowledge.
- **Tool:** Localized memory files like `AGENTS.md`, `CLAUDE.md`, or `.cursorrules`.

### Remediation Tiers
- [Tier 1] Create base context files in the root folder.
- [Tier 2] Cross-link design docs for discoverability.

---

## P1-2. Context Compaction & Memory Management

### What to Do
Intelligently summarizing and offloading older context to prevent the agent's context window from filling up ("context rot"). In MAS, separate short-term memory (session history) from long-term memory (centralized vector databases) so agents can selectively synchronize knowledge.

### Don't Do
**Prevent Context Rot:** You must prevent the agent's context window from filling up with noisy logs, massive tool outputs, and long conversation histories. This is avoided by utilizing context compaction, tool call offloading, and progressive skills.

### Options
- **Action:** Actively manage "context rot" by intelligently summarizing and separating short-term memory from long-term memory.
- **Tool:** Vector Databases to index past interactions and retrieved documents for long-term memory retrieval.

### Remediation Tiers
- [Tier 1] Implement conversation history summarization.
- [Tier 2] Separate short/long-term memory stores.

---

## P1-3. Tool Offloading

### What to Do
Stripping noisy tool outputs to keep only the head and tail tokens in context, while storing the full results. In MAS, offloaded tool results can be saved to shared blackboards for other agents to read without polluting their context.

### Don't Do
**Prevent Context Rot:** (shared with P1-2) You must prevent the agent's context window from filling up with massive tool outputs. Offload full results to the filesystem.

### Options
- **Action:** Prevent noisy tool outputs from filling the agent's context window by keeping only head and tail tokens above a specific threshold.
- **Tool:** The filesystem (offload the full, unedited tool results directly to the filesystem for later access).

### Remediation Tiers
- [Tier 1] Strip outputs (head/tail tokens) and save full results to filesystem.

---

## P1-4. Progressive Skills

### What to Do
Loading specific tool logic into context only when needed via progressive disclosure. In MAS, load tools specific to each agent's assigned role.

### Don't Do
**Prevent Context Rot:** (shared with P1-2) Loading too many tools at startup causes context degradation. Apply progressive disclosure.

### Options
- **Action:** Apply "progressive disclosure" to prevent context degradation from loading too many tools at startup.
- **Action:** Load specific skill front-matter into context only when an agent is assigned a task requiring that role.
- **Tool:** Modular skill and tool configuration files.

### Remediation Tiers
- [Tier 1] Organize tools into role-based skill modules handled dynamically.

---

## P1-5. Observability / Dashboards

### What to Do
Serving real-time system states as dynamic context so agents can observe their own work. Logs, metrics, traces, and live CI/CD pipeline statuses.

### Don't Do
**Prevent Vanity Metrics (Cross-Cutting):** Don't let agents optimize for vanity metrics (lines of code, PRs merged) rather than actual quality outcomes. Don't allow reward-aligned outputs that don't correlate with real-world value.

### Options
- **Action:** Serve real-time system states as dynamic context so agents can observe their own work.
- **Tool:** Logs, metrics, traces, screenshots, and live CI/CD pipeline statuses.
- **Tool:** Agent Performance Monitoring Dashboards for human oversight.

### Remediation Tiers
- [Tier 1] Expose logs and metrics to the runtime context. Focus on traces.

---

## P1-6. Web Search & MCP Integration

### What to Do
Giving agents access to real-time knowledge and current data beyond their training cutoff via external search and Model Context Protocol (MCP) tools.

### Don't Do
_(No direct prevention entry — P1-6 is a context enhancement. Its absence limits the agent to stale training data.)_

### Options
- **Action:** Give agents access to real-time knowledge and current data beyond their training cutoff.
- **Tool:** Web Search tools.
- **Tool:** Model Context Protocol (MCP) servers (e.g., Context7).

### Remediation Tiers
- [Tier 1] Provide a Web Search tool and MCP. Add caching layer.

---

## P1-7. Planning, Task Lists & Blackboards

### What to Do
Using the filesystem to store plan files and injecting reminders so agents can decompose goals and stay on track. In MAS, evolves into centralized knowledge spaces where teammates view statuses, claim unassigned work, and build upon each other's partial solutions.

### Don't Do
**Prevent Attention Drift & Strategic Amnesia:** You must prevent agents from losing sight of original objectives and long-term strategy as intermediate context noise accumulates. Prevent this by syncing critical decision points to persistent memory files that agents recall at session start.

**Prevent Inconsistent Shared Context (MAS):** Without shared task lists, agents will give inconsistent answers and work on conflicting items.

### Options
- **Action:** Maintain a shared task list where agents can autonomously view statuses, claim unassigned work, and build upon partial solutions.
- **Action:** Store plan files and inject reminders so agents can decompose goals and stay on track.
- **Tool:** Centralized knowledge spaces (Blackboards).
- **Tool:** The filesystem (for storing shared plan files).

### Remediation Tiers
- [Tier 1] Define and trace task plans on disk strictly.

---

## P1-8. Context Anchoring

### What to Do
Syncing critical decision points (what, why, target, background) to persistent memory files so the agent can recall long-term goals and strategy, even across context window resets. In MAS, anchor files serve as shared strategic alignment records for all agents.

### Don't Do
**Prevent Attention Drift & Strategic Amnesia:** (shared with P1-7) You must prevent agents from losing sight of original objectives. Prevent this by writing concise structured records to persistent memory files capturing: what (action taken), why (rationale), target (what it affects), and background (relevant context).

### Options
- **Action:** At key decision points, write concise structured records to persistent memory files capturing: what, why, target, and background.
- **Action:** Ensure agents recall anchor records at session start or after context resets to re-establish long-term goals.
- **Tool:** Structured anchor files (e.g., `ANCHORS.md`, `decisions.log`, or per-task decision records).
- **Tool:** Recall hooks that auto-inject anchor summaries into fresh context windows.

### Remediation Tiers
- [Tier 1] Create memory anchor files with structured records for re-injection later.

---

## P1-9. Branch-Based Cognitive Memory

### What to Do
Splitting complex objectives into subtasks, executing each in a new branch concurrently, and merging back to the parent task branch. Using merges and structured commit messages as functional memory checkpoints. In MAS, parallel agents with merge gates.

### Don't Do
_(No direct prevention entry — P1-9's absence means monolithic execution that loses cognitive context on long tasks. Related to P0-4 Prevent Premature Exits.)_

### Options
- **Action:** Split complex objectives into subtasks, execute each in a new branch concurrently, and merge back.
- **Action:** Produce concise, accurate commit messages during branching and merging as "approval of evidence" and natural memory storage.
- **Tool:** Git Worktrees and Concurrent Branch Management scripts.

### Remediation Tiers
- [Tier 1] Require agents to spawn branches for multi-prompt sub-tasks.

---

## P1-10. Requirements Ledger

### What to Do
Capturing all incoming user stories, requirements, and functional scenario narratives into a single unified ledger document before any planning or execution begins. Each entry captures: ID, title, narrative/scenario, acceptance criteria, status, and source. In MAS, all agents read from and write to the same ledger with file locking.

### Don't Do
**Prevent Unrecorded Requirements:** You must prevent agents from operating on requirements that exist only in chat history, user conversations, or human memory. Prevent this by mandating a Requirements Ledger where all requirements are formally recorded before any planning or execution begins.

### Options
- **Action:** Capture all incoming user stories, requirements, and functional scenarios into a single unified ledger before planning.
- **Action:** Each entry should capture: ID, title, narrative/scenario, acceptance criteria, status, and source.
- **Tool:** Canonical requirements file (e.g., `REQUIREMENTS.md`, `BACKLOG.md`) in the project root.
- **Tool:** Pre-planning validation hooks that check the ledger before plan/execute workflows proceed.

### Remediation Tiers
- [Tier 1] Create a `REQUIREMENTS.md` with structured entries in the project root.
- [Tier 2] Add pre-planning validation hooks that check the ledger before plan/execute.
