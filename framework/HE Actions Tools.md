# HE Actions Tools

When implementing or upgrading a harness, use these options to translate the 32 core features into concrete **Actions** and **Tools**. Each feature section includes a chain reference (L1 Principle → L2 Targeted Enhancement). Full L1→L5 chains live in `HE Principle Map.md`.

## P0 — Foundational Infrastructure (Execute)

### P0-1. Bash Sandboxes

> **Chain:** EP-1 — Isolation prevents contamination → Zero cross-contamination between agent environments

- **Action:** Do not run agent code locally; provision safe, scalable, and isolated execution environments.
- **Tool:** General-purpose bash execution tools.
- **Tool:** Sandboxes pre-installed with language runtimes, test runners, CLI tools, and browsers.
- **Tool:** Visual split-pane terminals (e.g., `tmux` or `iTerm2`) to monitor multiple sandbox environments simultaneously.

### P0-2. Filesystem, Git & File Locking

> **Chain:** EP-2 — State must outlive the session → All agent state durable, versioned, conflict-free

- **Action:** Use the filesystem as the core collaboration surface and durable storage.
- **Action:** Implement explicit file locking and task-claiming mechanisms to prevent race conditions when multiple agents try to edit the same file.
- **Action:** Adopt a **throughput-first merge philosophy**: define a target PR lifecycle duration (e.g., < 4 hours for agent-generated PRs), auto-retry flaky CI, and treat post-merge corrections as cheaper than pre-merge delays. Track merge velocity as an observability signal.
- **Tool:** Git (for versioning, tracking work, and rolling back errors).

### P0-3. Verification (Self & Collective)

> **Chain:** EP-3 — Verify before declaring completion → Agents autonomously detect and correct errors

- **Action:** Ground solutions in tests before agents complete a task to prevent cascading hallucinations across the network.
- **Tool:** Test execution suites and pre-completion checklists.
- **Tool:** Consensus-seeking protocols or voting mechanisms.
- **Tool:** Task completion hooks (e.g., `TaskCompleted` exiting with code 2 to prevent completion on failure).

### P0-4. Ralph Loops

> **Chain:** EP-4 — Committed tasks must be completed → 100% task completion despite context exhaustion

- **Action:** Intercept premature model exits to force long-horizon task completion.
- **Tool:** Ralph Loops (intercepts an exit attempt and reinjects the prompt into a fresh context window).
- **Tool:** Composable Middleware (e.g., loop detection middleware, reasoning sandwiches).

### P0-5. Orchestration Logic

> **Chain:** EP-5 — Coordination cost must stay bounded → Coordination overhead sublinear to team size

- **Action:** Define how agents are spawned, how tasks are handed off, and how workflows are parallelized.
- **Action:** Avoid multi-agent setups for simple sequential tasks to prevent quadratic coordination overhead.
- **Action:** Enforce **generator/evaluator role separation**: the agent that writes code must not be the sole reviewer. Define a minimum starting topology of 4–6 specialized roles (e.g., Orchestrator, Spec Writer, Builder, QA Reviewer, Tech Lead) with explicit handoff contracts specifying what each role produces and what it expects as input.
- **Tool:** Orchestration Topologies (Supervisor, Hierarchical, Peer-to-Peer, Blackboard, or Swarm).
- **Tool:** Frameworks like LangGraph (conditional routing), CrewAI (role-based), AutoGen (actor model), or OpenAI Swarm.

### P0-6. Rippable Middleware

> **Chain:** EP-6 — Scaffolding is temporary by design → Any harness layer removable without breakage

- **Action:** Structure the harness modularly so obsolete logic can be safely removed ("ripped out") as underlying AI models get smarter natively.
- **Action:** Use feature flags to toggle middleware components on/off; regularly audit relevance against current model capabilities.
- **Tool:** Composable middleware layers with independent enable/disable controls.

### P0-7. Escalation Policies & Audit Trails

> **Chain:** EP-7 — Every action must be traceable → Every action attributable; stuck agents escalated

- **Action:** Maintain visibility to trace accountability, debug failures, and handle agents that get permanently stuck.
- **Action:** Define escalation triggers (N consecutive failures, time limits, loop detection) and route stuck tasks to humans.
- **Tool:** Strict audit logs recording which agent initiated an action, what data was accessed, and who it influenced.
- **Tool:** Automated escalation triggers for human intervention.
- **Tool:** Tiered escalation chains (retry → different agent → human).

### P0-8. Harness Versioning

> **Chain:** EP-8 — You cannot improve what you do not measure → Configs reproducible and comparable with data

- **Action:** Version-control all harness configuration (prompts, tools, middleware) to enable reproducibility and comparison.
- **Action:** Track agent performance metrics per harness version to identify optimal configurations.
- **Action:** Maintain a **reusable template library** of parameterized harness blueprints for common service archetypes (API service, event processor, CLI tool, library). New projects instantiate from a template rather than building a harness from scratch.
- **Tool:** VCS-tracked harness configuration files.
- **Tool:** A/B Testing Infrastructure for comparing harness variants.

### P0-9. Smart Command Wrappers

> **Chain:** EP-9 — Standard operations reduce variance → Zero variance in common CLI execution

- **Action:** Elevate raw system commands into intelligent, multi-step workflows that integrate agent reasoning and repository intent.
- **Action:** Standardize common tasks (commit, push, release, reconcile) to ensure deterministic execution order and metadata generation.
- **Action:** Stratify commands by execution cost: fast gate (e.g., `npm run smoke`) for pre-commit frequency; full quality gate (e.g., `npm run check` / `npm run ci`) for pre-push; structural audit (e.g., `npm run audit`) for on-demand harness health checks. Agents must use the cheapest gate appropriate to their context.
- **Action:** Keep command names stable across harness versions; change implementations behind wrappers so agent muscle-memory and CI references never break.
- **Tool:** Recommended wrapper workflows as `.md` files in `.agent/workflows/`. Wrappers are markdown workflow definitions that agents interpret — never executable scripts (Python, Bash, etc.). The three standard wrappers are:
  - **`ccp.md`** — **Comment, Commit, Push.** Reviews changes (`git diff`), stages all changes (`git add -A`), generates a conventional-commit message, commits (`git commit`), and pushes (`git push`).
  - **`ccpr.md` `<tagID>`** — **Comment, Commit, Push, Release.** Runs `/ccp`, then creates and pushes a Git tag `<tagID>` and a GitHub Release with release notes.
  - **`reconcile.md`** — **Reconciliation.** Audits all markdown documents, the latest edition of the codebase, and `README.md` for consistency — fixing broken content, inconsistent terminology, duplication, and orphan concepts.

### P0-10. Inter-Agent Communication (The Mailbox)

> **Chain:** EP-5 — Coordination cost must stay bounded → Coordination without supervisor bottleneck

- **Action:** Provide a messaging bus for agents to communicate without relying solely on a central supervisor.
- **Tool:** Direct peer-to-peer messaging functions (`message`).
- **Tool:** Swarm broadcasting (`broadcast`) and idle notifications.
- **Tool:** Inter-agent messaging middleware.

### P0-11. Portable Agent Surface

> **Chain:** EP-10 — Portability over proprietary convenience → Instructions discoverable from any IDE

- **Action:** Maintain a single `AGENTS.md` at the repository root containing all IDE-agnostic harness rules (purpose, layout, workflows, tools, forbidden operations, conventions).
- **Action:** Reduce IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) to thin shims that reference `AGENTS.md` and contain only IDE-specific overrides.
- **Action:** Never store project-wide rules exclusively in an IDE's proprietary memory system (e.g., Claude Code memory files, Cursor-only `.cursorrules`) — if it isn't in `AGENTS.md`, it isn't portable.
- **Action:** For cold-start bootstrapping, follow a **Bootstrap Recipe**: (1) create `AGENTS.md` at the repo root (~100 lines covering purpose, layout, tools, DO NOT, conventions); (2) add subfolder `AGENTS.md` files for progressive disclosure of sub-domains; (3) add the first custom linter rule; (4) add the first structural test; (5) define 4–6 initial agent roles with handoff contracts. This recipe gets a harness from zero to functional in a single session.
- **Tool:** Template `AGENTS.md` with standard sections (Purpose, Organizing Framework, Directory Layout, Workflows, Tools & Commands, DO NOT, Conventions).
- **Tool:** CI check verifying `AGENTS.md` exists and each IDE shim file contains a canonical reference pointer to it.

---

## Pillar 1: Context Engineering (Inform)

### P1-1. Repository as Truth

> **Chain:** EP-11 — If it’s not in the repo, it doesn’t exist → Agent context accuracy without human briefing

- **Action:** Encode all project rules, architectural decisions, and style guides directly into the codebase at agent startup.
- **Action:** Cross-link design documents to ensure the model isn't blind to human knowledge.
- **Action:** Maintain a **Failure Ledger** — every rule in `AGENTS.md`/`CLAUDE.md` must trace to a concrete incident, failure, or constraint. Generic advice without an incident should be removed on next audit.
- **Action:** Include a **Forbidden Operations** section explicitly listing what agents must never do, with the consequence of each violation stated inline.
- **Action:** Maintain a **Tool Declaration** section listing every available tool and script — undeclared tools do not exist to agents; if a useful tool is absent from this list, agents will not use it.
- **Action:** Optimize the codebase for **agent legibility**: prefer stable, well-documented frameworks with strong training-data representation; maintain clear module boundaries; minimize metaprogramming and "magic"; ensure the project is launchable per worktree. Rate legibility periodically using the Agent Legibility Score (see Gap Evaluation Framework).
- **Action:** Implement **expertise extraction**: when a human corrects an agent mistake, the correction must be encoded as a new harness artifact (AGENTS.md rule, linter rule, or template) — not just applied as a code fix. Every human intervention is a harness-engineering opportunity.
- **Tool:** IDE-agnostic `AGENTS.md` as canonical rule surface, with IDE shims (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) for discovery.
- **Tool:** Structured failure-ledger entry format (e.g., `rule / context / fix` triples).

### P1-2. Context Compaction & Memory Management

> **Chain:** EP-12 — Finite attention demands active management → Sustained reasoning quality across long tasks

- **Action:** Actively manage "context rot" by intelligently summarizing and separating short-term memory (session history) from long-term memory.
- **Tool:** Vector Databases to index past interactions and retrieved documents for long-term memory retrieval.

### P1-3. Tool Offloading

> **Chain:** EP-12 — Finite attention demands active management → Tool outputs never dominate the context window

- **Action:** Prevent noisy tool outputs from filling the agent's context window by keeping only head and tail tokens above a specific threshold.
- **Tool:** The filesystem (offload the full, unedited tool results directly to the filesystem for later access).

### P1-4. Progressive Skills

> **Chain:** EP-12 — Finite attention demands active management → Only task-relevant capabilities in context

- **Action:** Apply "progressive disclosure" to prevent context degradation from loading too many tools at startup.
- **Action:** Load specific skill front-matter into context only when an agent is assigned a task requiring that role.
- **Tool:** Modular skill and tool configuration files.

### P1-5. Observability / Dashboards

> **Chain:** EP-8 — You cannot improve what you do not measure → Real-time visibility into system behavior

- **Action:** Serve real-time system states as dynamic context so agents can observe their own work.
- **Action:** Track harness structural integrity as a dedicated signal category: verify required file existence, workflow registry completeness, and pre-commit hook liveness. These signals must remain green before any agent run is trusted.
- **Action:** Implement **task-ID artifact storage**: each agent task produces outputs keyed by a unique task identifier, forming an inspectable audit trail of artifacts (not just logs) that persist beyond the context window. Post-task review of the artifact folder drives harness improvements.
- **Tool:** Logs, metrics, traces, screenshots, and live CI/CD pipeline statuses.
- **Tool:** Agent Performance Monitoring Dashboards for human oversight.
- **Tool:** `docs/OBSERVABILITY.md` — minimum observable field spec defining all signal sources, targets, alert thresholds, and recovery procedures. All new harness files must register their signals here.

### P1-6. Web Search & MCP Integration

> **Chain:** EP-13 — Current signals outperform stale snapshots → Answers reflect current state of the world

- **Action:** Give agents access to real-time knowledge and current data beyond their training cutoff.
- **Tool:** Web Search tools.
- **Tool:** Model Context Protocol (MCP) servers (e.g., Context7).

### P1-7. Planning, Task Lists & Blackboards

> **Chain:** EP-2 — State must outlive the session → Complex tasks survive context resets

- **Action:** Maintain a shared task list where agents can autonomously view statuses, claim unassigned work, and build upon partial solutions.
- **Action:** Store plan files and inject reminders so agents can decompose goals and stay on track.
- **Action:** Use a structured plan entry format for every multi-step task: **goal** (success definition), **scope** (in/out boundaries), **status**, **checkboxed steps**, **constraints** (hard rules that must not be violated), **checkpoints** (commit-worthy states), and **blocking issues**.
- **Action:** Front-load enough durable context in every plan entry that an agent can resume the task from the plan file alone after a context reset, without replaying conversation history.
- **Action:** Archive completed plan entries inline rather than deleting them, preserving a traceable record of resolved constraints, blocking issues, and decisions applied during the task for future agents.
- **Tool:** Centralized knowledge spaces (Blackboards).
- **Tool:** The filesystem (for storing shared plan files, e.g., `PLANS.md` in the project root).

### P1-8. Context Anchoring

> **Chain:** EP-2 — State must outlive the session → Strategic decisions persist across resets

- **Action:** At key decision points, write concise structured records to persistent memory files capturing: **what** (action taken), **why** (rationale), **target** (what it affects), and **background** (relevant context).
- **Action:** Ensure agents recall anchor records at session start or after context resets to re-establish long-term goals and strategy.
- **Tool:** Structured anchor files (e.g., `ANCHORS.md`, `decisions.log`, or per-task decision records).
- **Tool:** Recall hooks that auto-inject anchor summaries into fresh context windows.

### P1-9. Branch-Based Cognitive Memory

> **Chain:** EP-2 — State must outlive the session → Complex objectives decompose with checkpoints

- **Action:** Split complex objectives into subtasks, execute each in a new branch concurrently, and merge back to the parent task branch.
- **Action:** Produce concise, accurate commit messages during branching and merging to act as critical "approval of evidence" and natural memory storage.
- **Tool:** Git Worktrees and Concurrent Branch Management scripts.

### P1-10. Requirements Ledger

> **Chain:** EP-11 — If it's not in the repo, it doesn't exist → All requirements recorded before planning

- **Action:** Capture all incoming user stories, requirements, and functional scenarios into a single unified ledger document before any planning or execution begins.
- **Action:** Each entry should capture: ID, title, narrative/scenario, acceptance criteria, status (recorded/planned/executed), and source (who/when).
- **Tool:** Canonical requirements file (e.g., `REQUIREMENTS.md`, `BACKLOG.md`) in the project root.
- **Tool:** Pre-planning validation hooks that check the ledger before plan/execute workflows proceed.

### P1-11. Socratic Questioning

> **Chain:** EP-14 — Clarity before commitment → Zero ambiguous inputs reaching execution

- **Action:** When encountering an unclear or ambiguous input, pause execution and apply a structured Socratic interrogation pass before proceeding.
- **Action:** Probe the input using all six question categories: Clarification, Probing Assumptions, Probing Reason & Evidence, Questioning Viewpoints, Probing Implications, and Questions about the Question.
- **Action:** Record extracted clarifications as structured entries in the Requirements Ledger (P1-10) or as Context Anchors (P1-8) before proceeding to planning.
- **Tool:** Structured interrogation templates covering the 6 Socratic question types, injected into agent context at task intake.
- **Tool:** Ambiguity scoring heuristics — rate input clarity before and after the Socratic round; do not proceed if clarity score remains below threshold.

### P1-12. Skill Engineering

> **Chain:** EP-12 — Finite attention demands active management → Agent skills are modular, context-efficient, and tunable

- **Action:** Split monolithic skill reference files into modular components (e.g., foundation vs. pillars) to keep each file below a mandatory-read budget (<200 lines).
- **Action:** Transform the skill orchestrator (e.g., `SKILL.md`) into a routing hub with a decision tree that directs agents to the correct reference file without scanning the full skill surface.
- **Action:** Reduce mandatory context load per action path by extracting utilities, checklists, and templates into dedicated files agents load only when needed.
- **Action:** Standardize terminology across all skill files to prevent logic errors in subagent dispatches (e.g., distinguish "Scoping Dimensions" from "Evaluation Dimensions").
- **Action:** Extract reusable output templates (e.g., assessment reports, implementation plans, change summaries) into a dedicated `templates/` directory.
- **Action:** Pre-build subagent dispatch prompts containing pre-configured orchestration instructions for parallel agent workflows.
- **Tool:** File-length linters enforcing the <200 line budget per skill reference file.
- **Tool:** Decision-tree routing patterns in skill orchestrators.
- **Tool:** Template libraries for standardized skill outputs.

---

## Pillar 2: Architectural Constraints (Constrain)

### P2-1. Automated Linters

> **Chain:** EP-15 — Mechanical enforcement over advisory guidance → Zero violations reaching main branch

- **Action:** Mechanically enforce what good code looks like to save tokens and prevent the agent from exploring dead ends.
- **Action:** Wire all linters into the **CI pipeline** — pre-commit hooks can be bypassed and are insufficient as the sole enforcement gate. CI failure is the authoritative signal.
- **Action:** Every linter error message must include a **teaching message**: a `↳ Fix:` line pointing to the canonical source and exact remediation step, so agents can self-correct on first re-attempt without human intervention.
- **Action:** Run periodic **Feedforward/Feedback Audits** — verify that every guide (AGENTS.md rule, template, prompt) has a corresponding sensor (lint rule, test, or manual check) and vice versa. A guide without a sensor is an unenforced wish; a sensor without a guide is a mystery constraint agents cannot reason about. Flag orphaned guides or sensors during `/reconcile`.
- **Tool:** Custom deterministic linters.
- **Tool:** Pre-commit hooks that automatically flag and reject non-compliant code before it enters the repository.
- **Tool:** CI workflow (e.g., GitHub Actions `he-lint.yml`) running the full linter scan on every push and pull request.

### P2-2. Dependency Enforcement

> **Chain:** EP-15 — Mechanical enforcement over advisory guidance → Boundaries mechanically enforced

- **Action:** Mechanically restrict which architectural layers an agent can import from or modify.
- **Action:** For **documentation-first repositories**, apply the same concept to document layers: canonical docs (`framework/`) are the source of truth; derived docs (`research/`) must not contradict or redefine canonical content. Enforce this with structural lint checks that validate terminology, pillar labels, and feature counts against canonical definitions.
- **Action:** Enforce strict **content-flow directionality**: content flows `references/ → framework/ → research/` only. Derived documents (`research/`) may never define new canonical concepts — concepts must originate in `framework/` first and propagate downward. An agent that defines a new concept in `research/` before `framework/` creates a silent fork that persists until the next `/revise-comments` run.
- **Tool:** Structural testing frameworks (e.g., ArchUnit).
- **Tool:** Structural lint checks validating document-layer consistency (e.g., pillar label integrity, canonical term validation, feature count enforcement).

### P2-3. AI Auditors & Collaboration Channels

> **Chain:** EP-16 — No author is their own best reviewer → Every output independently reviewed

- **Action:** Deploy secondary LLM-based agents to review the primary agent's output for compliance and security.
- **Action:** Structure interactions to actively prevent anchoring bias.
- **Tool:** Cooperative channels (assembly line review).
- **Tool:** Competitive channels (adversarial debate/competing hypotheses to find root causes).
- **Tool:** Coopetition channels (negotiating and compromising).

### P2-4. Bounded Autonomy & Access Control

> **Chain:** EP-17 — Capabilities proportional to risk → Capabilities proportional to task risk

- **Action:** Limit agent actions to prevent prompt injection and data exfiltration across the network.
- **Action:** Block malicious queries before they reach downstream agents.
- **Tool:** Real-time guardrails and network isolation.
- **Tool:** Risk-based boundaries (e.g., requiring human approval for financial transactions or system modifications).

### P2-5. Upstream Intake Gate

> **Chain:** EP-14 — Clarity before commitment → No execution on unrecorded requirements

- **Action:** Enforce a mandatory validation step before any planning or execution workflow: verify the requirement is recorded in the Requirements Ledger (P1-10).
- **Action:** If an agent discovers an implicit requirement mid-task, pause and sync it to the ledger before continuing.
- **Tool:** Ledger-check steps in planning workflows and meta-docs (e.g., a `requirementsCheck` step in `/polish` or `/cognitive-branch`).
- **Tool:** Pre-commit hooks or workflow gates that reject plans without matching ledger entries.

---

## Pillar 3: Entropy Management (Maintain)

### P3-1. Scheduled Cleanups

> **Chain:** EP-18 — Entropy requires scheduled countering → Entropy never exceeds one GC cycle

- **Action:** Catch constraint violations and reconcile overlapping or conflicting code changes made by concurrent agent teams.
- **Action:** Implement GC as a **CI cron trigger** (e.g., weekly schedule) — a manually-invoked workflow does not qualify as scheduled cleanup. Output discrete reports or issues per GC category rather than a single large manual audit.
- **Tool:** Dedicated background cleanup agents running on specific daily/weekly schedules or via event-based triggers.
- **Tool:** Scheduled CI workflow (e.g., GitHub Actions `he-weekly-gc.yml`) with a cron trigger and automated issue creation on violations.
- **Tool:** `scripts/harness/audit.sh` — local on-demand structural integrity audit for pre-deployment or post-change use outside the weekly CI schedule. Produces per-check `[OK]` / `[WARNING]` / `[FAIL]` output with a final PASS/FAIL verdict.

### P3-2. Documentation Sync

> **Chain:** EP-19 — Documentation must live with the code → Docs always match current code state

- **Action:** Prevent documentation drift by actively verifying that READMEs and API docs match the living state of the code.
- **Tool:** Dedicated documentation consistency agents.

### P3-3. Pattern Auditing

> **Chain:** EP-18 — Entropy requires scheduled countering → Patterns converge; no circular deps

- **Action:** Run system sweeps to ensure long-term codebase health as AI generates high volumes of code.
- **Tool:** Pattern enforcement and dependency auditing agents configured to hunt down dead code and circular dependencies.

### P3-4. Consolidation Loop

> **Chain:** EP-19 — Documentation must live with the code → System docs auto-synced with codebase

- **Action:** Auto-update core documentation (e.g., CLAUDE.md system counts), accumulate changelogs, update config files (e.g., HarnessConfig.json), and track issue history as features land and bugs are fixed.
- **Action:** Prompt for Architectural Decision Record (ADR) creation when new architectural patterns are introduced.
- **Tool:** Automated consolidation pipelines and background documentation agents.
