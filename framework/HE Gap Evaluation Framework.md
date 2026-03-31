# HE Gap Evaluation Framework

A comprehensive, multi-dimensional approach to evaluating Harness Engineering gaps and deriving improvement policies for each core feature. This framework replaces simple binary checklists with a systematic method for identifying where a harness is weak, why it matters, and what to do about it.

---

## Part 1: Evaluation Dimensions

Every core feature is evaluated through **six lenses**. Each lens reveals a different type of gap that a single-dimension maturity model would miss.

| Dimension                     | Question It Answers                                                    | Why It Matters                            |
| ----------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| **Implementation Maturity**   | How fully built is this feature?                                       | Unbuilt features can't deliver value      |
| **Operational Effectiveness** | Does the feature actually work in practice?                            | A feature can exist but underperform      |
| **Risk Exposure**             | What breaks if this feature is absent or weak?                         | Reveals hidden blast radius               |
| **Cost-Efficiency**           | Is the investment proportional to the value?                           | Prevents over-engineering and token waste |
| **Scalability (SAS→MAS)**     | Will this feature survive the transition to multi-agent?               | Avoids rework when scaling                |
| **Human Role Evolution**      | Does this feature shift humans from writing code to designing systems? | Measures progress toward the HE vision    |

### Scoring Scale (per dimension)

| Score | Label      | Meaning                                            |
| ----- | ---------- | -------------------------------------------------- |
| 0     | Absent     | Feature does not exist                             |
| 1     | Ad-hoc     | Informal, inconsistent, human-dependent            |
| 2     | Basic      | Partially implemented, works for simple cases      |
| 3     | Functional | Reliable for standard workflows                    |
| 4     | Optimized  | Measurably effective, monitored, iterated upon     |
| 5     | Leading    | Autonomous, self-improving, sets industry standard |

---

## Part 2: Feature-by-Feature Gap Analysis and Improvement Policies

Each of the 28 core features is analyzed below with:

- **Gap Signals** — observable symptoms that indicate a gap exists
- **Improvement Policies** — concrete actions organized by priority tier
- **Dependency Map** — what this feature enables or requires

---

### Foundational Infrastructure (Execute)

#### P0-1. Bash Sandboxes

**Gap Signals:**

- Agents execute code on the developer's local machine
- No isolation between agent sessions
- Agent cannot install packages or run arbitrary commands
- Failures in one agent's execution corrupt another's environment

**Improvement Policies:**

| Tier | Action                                                                       | Dimension Addressed |
| ---- | ---------------------------------------------------------------------------- | ------------------- |
| 1    | Provision isolated containers or VMs per agent session                       | Risk, Maturity      |
| 1    | Pre-install language runtimes, test runners, and CLI tools in sandbox images | Effectiveness       |
| 2    | Enable visual monitoring of sandbox state (tmux, split-pane terminals)       | Human Role          |
| 3    | Auto-scale sandbox pools based on concurrent agent demand                    | Scalability, Cost   |

**Dependencies:** Required by Self-Verification (P0-3), Orchestration Logic (P0-5). Blocking if absent.

---

#### P0-2. Filesystem & Git Workspace

**Gap Signals:**

- Agents lose state between sessions
- No version control of agent-generated changes
- Multiple agents overwrite each other's files (MAS)
- No rollback mechanism when agent produces bad output

**Improvement Policies:**

| Tier | Action                                                                 | Dimension Addressed |
| ---- | ---------------------------------------------------------------------- | ------------------- |
| 1    | Ensure every agent session has a Git-tracked workspace                 | Maturity            |
| 1    | Implement per-agent branching strategy (worktrees or feature branches) | Risk                |
| 2    | Add file locking and task-claiming for MAS shared workspaces           | Scalability         |
| 2    | Build rollback automation (auto-revert on test failure)                | Effectiveness       |
| 3    | Implement conflict resolution agents for concurrent edits              | Scalability         |

**Dependencies:** Foundation for all other features. Planning & State Files (P1-7) and Scheduled Cleanups (P3-1) depend on this.

---

#### P0-3. Self-Verification

**Gap Signals:**

- Agent submits code without running tests
- Agent cannot read its own error logs
- No feedback loop between code generation and validation
- Human must manually verify every agent output

**Improvement Policies:**

| Tier | Action                                                                       | Dimension Addressed     |
| ---- | ---------------------------------------------------------------------------- | ----------------------- |
| 1    | Wire test suite execution into the agent's task completion flow              | Maturity, Effectiveness |
| 1    | Pipe error logs back into agent context for autonomous fix attempts          | Effectiveness           |
| 2    | Add pre-completion checklists that gate task finalization                    | Risk                    |
| 2    | Upgrade to collective verification (consensus voting) for MAS                | Scalability             |
| 3    | Implement verification metrics (pass rate, fix iterations) for observability | Human Role              |

**Dependencies:** Requires Bash Sandboxes (P0-1). Enables Escalation Policies (P0-7) — escalation triggers when self-verification fails repeatedly.

---

#### P0-4. Ralph Loops

**Gap Signals:**

- Agent stops mid-task and declares "done" prematurely
- Long-horizon tasks consistently produce incomplete output
- Context window exhaustion causes agent to lose track of the goal
- No mechanism to reinject the original prompt into a fresh context

**Improvement Policies:**

| Tier | Action                                                                 | Dimension Addressed |
| ---- | ---------------------------------------------------------------------- | ------------------- |
| 1    | Implement exit interception hooks that detect premature completion     | Maturity            |
| 1    | Build prompt reinjection with state summary into fresh context windows | Effectiveness       |
| 2    | Add loop budgets (max reinjections) to prevent infinite retries        | Cost, Risk          |
| 2    | Track loop metrics (reinjection count, completion rate)                | Effectiveness       |
| 3    | Combine with Planning & State Files for cross-window goal persistence  | Scalability         |

**Dependencies:** Requires Planning & State Files (P1-7) for state persistence across reinjections. Interacts with Escalation Policies (P0-7) for max-retry limits.

---

#### P0-5. Orchestration Logic

**Gap Signals:**

- Only one agent can work at a time
- No task routing — all tasks go to the same agent regardless of specialization
- Subagent spawning is manual or impossible
- Task handoffs lose context

**Improvement Policies:**

| Tier | Action                                                                 | Dimension Addressed |
| ---- | ---------------------------------------------------------------------- | ------------------- |
| 1    | Implement basic supervisor pattern (central orchestrator → workers)    | Maturity            |
| 2    | Add topology selection based on task type (parallel vs. sequential)    | Effectiveness, Cost |
| 2    | Build context-preserving handoff protocols between agents              | Effectiveness       |
| 3    | Support dynamic topology switching (supervisor ↔ peer-to-peer ↔ swarm) | Scalability         |
| 3    | Implement overhead monitoring to detect coordination degradation       | Cost                |

**Dependencies:** Requires Inter-Agent Communication (P0-MAS) for MAS topologies. Enables all multi-agent workflows.

---

#### P0-6. Rippable Middleware

**Gap Signals:**

- Harness logic is monolithic and tightly coupled
- Removing one component breaks the entire pipeline
- Middleware built for older models is still running despite model improvements
- No ability to A/B test harness configurations

**Improvement Policies:**

| Tier | Action                                                                  | Dimension Addressed       |
| ---- | ----------------------------------------------------------------------- | ------------------------- |
| 1    | Refactor harness into composable, independently removable layers        | Maturity                  |
| 2    | Add feature flags to toggle middleware components on/off                | Effectiveness             |
| 2    | Regularly audit middleware relevance against current model capabilities | Cost                      |
| 3    | Build A/B testing infrastructure to compare harness variants            | Human Role, Effectiveness |

**Dependencies:** Enables Harness Versioning (P0-8). Philosophical foundation — over-engineering prevention.

---

#### P0-7. Escalation Policies

**Gap Signals:**

- Agent loops indefinitely on unsolvable problems
- No notification when agent is stuck
- Human discovers failures hours or days later
- No defined threshold for "stuck" vs. "still working"

**Improvement Policies:**

| Tier | Action                                                                                | Dimension Addressed |
| ---- | ------------------------------------------------------------------------------------- | ------------------- |
| 1    | Define escalation triggers (N consecutive test failures, time limits, loop detection) | Maturity, Risk      |
| 1    | Route stuck tasks to human via notification (Slack, email, dashboard)                 | Effectiveness       |
| 2    | Implement tiered escalation (retry → different agent → human)                         | Scalability         |
| 3    | Add escalation analytics to identify systemic failure patterns                        | Human Role          |

**Dependencies:** Requires Self-Verification (P0-3) to detect failure. Requires Observability (P1-5) for monitoring.

---

#### P0-8. Harness Versioning

**Gap Signals:**

- No way to compare different harness configurations
- Changes to the harness are untested before deployment
- Cannot reproduce results from a previous harness version
- No data on which configurations produce better agent output

**Improvement Policies:**

| Tier | Action                                                                 | Dimension Addressed |
| ---- | ---------------------------------------------------------------------- | ------------------- |
| 1    | Version-control all harness configuration (prompts, tools, middleware) | Maturity            |
| 2    | Track agent performance metrics per harness version                    | Effectiveness       |
| 3    | Build A/B testing pipeline to statistically compare harness variants   | Human Role          |
| 3    | Implement automated harness optimization (genetic/evolutionary search) | Scalability         |

**Dependencies:** Requires Observability (P1-5) for performance data. Requires Rippable Middleware (P0-6) for component-level versioning.

---

#### P0-9. Smart Command Wrappers

**Gap Signals:**

- Agents execute raw, multi-step CLI commands (git, npm, shell) manually
- No standardization of common workflows (CCPR, Reconcile)
- High variation in commit message quality and release note detail
- Coordination overhead from agents mis-ordering system commands

**Improvement Policies:**

| Tier | Action                                                                           | Dimension Addressed |
| ---- | -------------------------------------------------------------------------------- | ------------------- |
| 1    | Install baseline wrapper workflows (ccp, ccpr, reconcile) in the repository      | Maturity, Risk      |
| 2    | Integrate agent reasoning into wrappers (auto-generating comments/release notes) | Effectiveness       |
| 3    | Build automated workflow validation (ensuring wrappers are used over raw CLI)    | Scalability         |

**Dependencies:** Requires Filesystem & Git Workspace (P0-2). Enables Consistent Entropy Management (P3).

---

### Pillar 1: Context Engineering (Inform)

#### P1-1. Repository as Truth

**Gap Signals:**

- Project rules live in Slack, Google Docs, or human memory
- Agent hallucinates because it lacks access to architectural decisions
- Onboarding a new agent requires extensive human briefing
- `CLAUDE.md` or `AGENTS.md` is absent or stale

**Improvement Policies:**

| Tier | Action                                                                 | Dimension Addressed |
| ---- | ---------------------------------------------------------------------- | ------------------- |
| 1    | Create and maintain `CLAUDE.md` / `AGENTS.md` with project conventions | Maturity            |
| 1    | Migrate all architectural decisions from external tools into the repo  | Risk, Effectiveness |
| 2    | Add linter validation that context files are present and non-empty     | Risk                |
| 2    | Cross-link design docs to code modules for agent discoverability       | Effectiveness       |
| 3    | Automate staleness detection — alert when docs diverge from code       | Scalability         |

**Dependencies:** Foundation for all Pillar 1 features. Documentation Sync (P3-2) maintains this over time.

---

#### P1-2. Context Compaction

**Gap Signals:**

- Agent performance degrades noticeably on long tasks
- Context window fills with conversation history and noise
- Agent "forgets" early instructions by the end of a session
- No summarization or offloading of old context

**Improvement Policies:**

| Tier | Action                                                                         | Dimension Addressed     |
| ---- | ------------------------------------------------------------------------------ | ----------------------- |
| 1    | Implement conversation history summarization at regular intervals              | Maturity, Effectiveness |
| 2    | Separate short-term (session) from long-term (vector DB) memory                | Scalability             |
| 2    | Set token budgets per context section (tools, history, instructions)           | Cost                    |
| 3    | Build adaptive compaction that adjusts aggressiveness based on task complexity | Effectiveness           |

**Dependencies:** Interacts with Tool Offloading (P1-3). Critical for Ralph Loops (P0-4) — reinjected prompts need compacted state.

---

#### P1-3. Tool Offloading

**Gap Signals:**

- Large tool outputs (logs, API responses) consume most of the context window
- Agent loses reasoning quality after a few tool calls
- Full tool outputs are kept in context when only the summary matters

**Improvement Policies:**

| Tier | Action                                                                   | Dimension Addressed |
| ---- | ------------------------------------------------------------------------ | ------------------- |
| 1    | Strip tool outputs to head/tail tokens; store full results on filesystem | Maturity            |
| 2    | Make full tool outputs retrievable on-demand by the agent                | Effectiveness       |
| 2    | Set per-tool token limits with configurable thresholds                   | Cost                |
| 3    | Build intelligent summarization (LLM-based) for complex tool outputs     | Effectiveness       |

**Dependencies:** Requires Filesystem (P0-2) for storage. Feeds into Context Compaction (P1-2).

---

#### P1-4. Progressive Skills

**Gap Signals:**

- Agent's system prompt is enormous with all tools loaded at startup
- Adding a new tool degrades performance on unrelated tasks
- Agent uses wrong tools because too many are available simultaneously

**Improvement Policies:**

| Tier | Action                                                                            | Dimension Addressed |
| ---- | --------------------------------------------------------------------------------- | ------------------- |
| 1    | Organize tools into role-based skill modules                                      | Maturity            |
| 1    | Load only task-relevant skills at assignment time                                 | Effectiveness       |
| 2    | Implement skill routing — agent or orchestrator selects skills based on task type | Scalability         |
| 3    | Build skill performance tracking (which skills improve task success rates)        | Human Role          |

**Dependencies:** Enables efficient Orchestration Logic (P0-5) — orchestrators select skill profiles per subagent.

---

#### P1-5. Observability / Dashboards

**Gap Signals:**

- No visibility into agent success/failure rates
- Cannot diagnose why an agent produced bad output
- Agent cannot access its own CI/CD pipeline status
- Human engineers fly blind on agent behavior patterns

**Improvement Policies:**

| Tier | Action                                                                             | Dimension Addressed |
| ---- | ---------------------------------------------------------------------------------- | ------------------- |
| 1    | Expose CI/CD status, test results, and error logs to agent context                 | Maturity            |
| 1    | Build basic dashboard showing agent task outcomes                                  | Human Role          |
| 2    | Add traces (per-step reasoning, tool calls, decisions) for debugging               | Effectiveness, Risk |
| 2    | Implement agent performance metrics (completion rate, fix iterations, token usage) | Cost                |
| 3    | Build anomaly detection on agent behavior patterns                                 | Scalability, Risk   |

**Dependencies:** Required by Escalation Policies (P0-7), Harness Versioning (P0-8). Enables data-driven harness improvement.

---

#### P1-6. Web Search & MCP Integration

**Gap Signals:**

- Agent produces outdated answers for rapidly evolving domains
- No access to external APIs, documentation, or real-time data
- Agent cannot look up library versions or API changes

**Improvement Policies:**

| Tier | Action                                                                    | Dimension Addressed |
| ---- | ------------------------------------------------------------------------- | ------------------- |
| 1    | Integrate web search tool into agent's available tools                    | Maturity            |
| 2    | Connect MCP servers for domain-specific external context                  | Effectiveness       |
| 2    | Add caching layer to reduce redundant external lookups                    | Cost                |
| 3    | Build relevance filtering — agent decides when external search adds value | Effectiveness       |

**Dependencies:** Largely independent. Interacts with Tool Offloading (P1-3) — search results can be noisy.

---

#### P1-7. Planning & State Files

**Gap Signals:**

- Agent approaches complex tasks without decomposing them
- No persistent plan that survives context window resets
- Agent repeats work it already completed in a previous step
- No shared task board for MAS coordination

**Improvement Policies:**

| Tier | Action                                                                        | Dimension Addressed |
| ---- | ----------------------------------------------------------------------------- | ------------------- |
| 1    | Store task plans as files on the filesystem with step-by-step breakdown       | Maturity            |
| 1    | Inject plan reminders into agent context at each step                         | Effectiveness       |
| 2    | Evolve to shared task lists with status tracking (claimed, in-progress, done) | Scalability         |
| 2    | Add blackboard architecture for MAS partial solution sharing                  | Scalability         |
| 3    | Implement plan quality scoring and adaptive replanning                        | Effectiveness       |

**Dependencies:** Requires Filesystem (P0-2). Critical for Ralph Loops (P0-4). Evolves into MAS shared blackboards.

---

#### P1-8. Context Anchoring

**Gap Signals:**

- Agent forgets original objectives mid-task as context fills with intermediate outputs
- Actions diverge from strategic goals without any persistent record of why decisions were made
- Agent re-explores questions that were already resolved in earlier sessions
- After context window resets, agent has no way to recall long-term strategy
- No structured decision log exists in the project

**Improvement Policies:**

| Tier | Action                                                                                            | Dimension Addressed        |
| ---- | ------------------------------------------------------------------------------------------------- | -------------------------- |
| 1    | Create memory anchor files (e.g., `ANCHORS.md`, `decisions.log`) for recording critical decisions | Maturity                   |
| 1    | Write structured records at each major decision point: what, why, target, background              | Effectiveness              |
| 2    | Build recall hooks that auto-inject anchor summaries at session start or after context resets     | Effectiveness, Scalability |
| 2    | Implement shared anchor files accessible to all agents in MAS setups                              | Scalability                |
| 3    | Add anchor quality metrics (staleness detection, relevance scoring)                               | Human Role                 |

**Dependencies:** Complements Planning & State Files (P1-7) — plans track _what to do next_, anchors track _why we're doing it_. Enhanced by Context Compaction (P1-2) — anchor summaries survive compaction. Critical for Ralph Loops (P0-4) — reinjected contexts need anchors for strategic continuity.

---

---

#### P1-9. Branch-Based Cognitive Memory

**Gap Signals:**

- Agent processes multi-step complex objectives holistically in a monolithic branch
- No checkpointed cognitive history for distinct sub-tasks
- Sub-tasks are executed sequentially rather than concurrently when they could be parallelized
- Commit messages are sparse and lack structured evidentiary value

**Improvement Policies:**

| Tier | Action                                                                    | Dimension Addressed |
| ---- | ------------------------------------------------------------------------- | ------------------- |
| 1    | Require agents to spawn new branches for sub-tasks and merge back cleanly | Maturity, Risk      |
| 1    | Enforce detailed, accurate commit messages during segment checkpoints     | Effectiveness       |
| 2    | Introduce branch and sub-task coordination logic within orchestration     | Scalability, Cost   |
| 3    | Use commit history natively as a form of contextual RAG memory            | Effectiveness       |

**Dependencies:** Relies on Filesystem & Git Workspace (P0-2). Operates alongside Orchestration Logic (P0-5) for MAS mapping.

---

#### P1-10. Requirements Ledger

**Gap Signals:**

- Agents start coding immediately from chat input without recording requirements
- Requirements exist only in conversation history or human memory, not in structured files
- Multiple conflicting interpretations of the same feature exist across agents or sessions
- No canonical source of truth for user stories, acceptance criteria, or functional scenarios
- Planning proceeds without any reference to a documented backlog

**Improvement Policies:**

| Tier | Action                                                                            | Dimension Addressed        |
| ---- | --------------------------------------------------------------------------------- | -------------------------- |
| 1    | Create a canonical `REQUIREMENTS.md` with structured entries in the project root  | Maturity                   |
| 1    | Record every user story, requirement, and scenario before planning                | Risk, Effectiveness        |
| 2    | Add pre-planning validation hooks that check the ledger before plan/execute       | Effectiveness, Scalability |
| 2    | Implement shared ledger with file locking for MAS environments                    | Scalability                |
| 3    | Build automated requirement deduplication and conflict detection                  | Scalability, Human Role    |

**Dependencies:** Feeds Planning & State Files (P1-7) — plans should reference ledger entries. Feeds Context Anchoring (P1-8) — anchors can reference requirement IDs. Enables Upstream Intake Gate (P2-5).

### Pillar 2: Architectural Constraints (Constrain)

#### P2-1. Automated Linters

**Gap Signals:**

- Agent commits code with formatting violations
- No pre-commit hooks in the repository
- Style guide exists but is not mechanically enforced
- Agent wastes tokens exploring code patterns that will be rejected

**Improvement Policies:**

| Tier | Action                                                                          | Dimension Addressed |
| ---- | ------------------------------------------------------------------------------- | ------------------- |
| 1    | Add pre-commit hooks for formatting, linting, and type checking                 | Maturity            |
| 1    | Ensure linter error messages include remediation instructions (they're prompts) | Effectiveness       |
| 2    | Add custom rules for project-specific conventions beyond standard linters       | Effectiveness       |
| 3    | Track linter violation frequency to identify recurring agent weaknesses         | Human Role          |

**Dependencies:** Low dependency — can be implemented independently. Feeds data to Pattern Auditing (P3-3).

---

#### P2-2. Dependency Enforcement

**Gap Signals:**

- Agent imports from forbidden architectural layers
- No structural boundaries between modules
- Dependency violations are only caught in manual code review
- Circular dependencies accumulate over time

**Improvement Policies:**

| Tier | Action                                                                 | Dimension Addressed |
| ---- | ---------------------------------------------------------------------- | ------------------- |
| 1    | Define and document layer boundaries in architecture specs             | Maturity            |
| 2    | Implement structural tests (e.g., ArchUnit) that fail CI on violations | Effectiveness, Risk |
| 2    | Add import restrictions to linter configuration                        | Effectiveness       |
| 3    | Auto-generate dependency graphs and flag anomalies                     | Scalability         |

**Dependencies:** Requires Repository as Truth (P1-1) for boundary definitions. Feeds Pattern Auditing (P3-3).

---

#### P2-3. AI Auditors / Diverse Collaboration

**Gap Signals:**

- Only one agent reviews its own work (no second opinion)
- Agent anchors on first solution without exploring alternatives
- No adversarial testing of agent output
- Code review is entirely human-dependent

**Improvement Policies:**

| Tier | Action                                                                         | Dimension Addressed |
| ---- | ------------------------------------------------------------------------------ | ------------------- |
| 1    | Deploy a secondary LLM agent to review primary agent's PRs                     | Maturity            |
| 2    | Implement cooperative review (assembly line — draft → review → approve)        | Effectiveness       |
| 2    | Add competitive channels (adversarial debate between agents on design choices) | Effectiveness, Risk |
| 3    | Implement coopetition (agents negotiate and compromise on solutions)           | Scalability         |
| 3    | Track auditor agreement rates to calibrate auditor thresholds                  | Human Role          |

**Dependencies:** Requires Orchestration Logic (P0-5) for multi-agent coordination. Enhances Self-Verification (P0-3).

---

#### P2-4. Bounded Autonomy & Access Control

**Gap Signals:**

- Agent executes high-risk actions without human confirmation
- Access controls are missing for sensitive environments or APIs
- No risk-based staging or gradual elevation of privileges
- Potential for cascaded or widespread damage is high if an agent goes rogue

**Improvement Policies:**

| Tier | Action                                                                       | Dimension Addressed |
| ---- | ---------------------------------------------------------------------------- | ------------------- |
| 1    | Require human-in-the-loop approval for critical or irreversible actions      | Maturity, Risk      |
| 1    | Implement strict API sandboxing with least-privilege credentials             | Risk                |
| 2    | Enforce risk-based progressive disclosure of autonomy to the agent           | Effectiveness       |
| 3    | Use intelligent anomaly detection to dynamically throttle agent capabilities | Scalability         |

**Dependencies:** Operates alongside Escalation Policies (P0-7). Extends overall Architectural Constraints.

---

#### P2-5. Upstream Intake Gate

**Gap Signals:**

- Agents jump directly from user conversation to implementation without recording requirements
- Requirements are implicitly assumed rather than explicitly recorded in the ledger
- No validation step exists between requirement intake and plan creation
- Planning workflows proceed without checking that a corresponding ledger entry exists
- Mid-task requirement discoveries are not synced back to the ledger

**Improvement Policies:**

| Tier | Action                                                                                        | Dimension Addressed        |
| ---- | --------------------------------------------------------------------------------------------- | -------------------------- |
| 1    | Add a mandatory ledger-check step to all planning workflows and meta-docs                     | Maturity, Risk             |
| 1    | Require agents to pause and sync implicit requirements to the ledger when discovered mid-task | Effectiveness              |
| 2    | Implement pre-commit hooks or workflow gates that reject plans without ledger entries         | Effectiveness, Scalability |
| 3    | Build distributed intake validation for MAS -- all agents check the shared ledger             | Scalability                |

**Dependencies:** Requires Requirements Ledger (P1-10) as the target store. Complements Bounded Autonomy (P2-4). Interacts with Planning & State Files (P1-7).

---

### Pillar 3: Entropy Management (Maintain)

#### P3-1. Scheduled Cleanups

**Gap Signals:**

- Dead code accumulates without detection
- Known issues persist because no one is assigned to fix them
- Constraint violations slip past initial checks and remain in the codebase
- No scheduled automation for repository hygiene

**Improvement Policies:**

| Tier | Action                                                                     | Dimension Addressed |
| ---- | -------------------------------------------------------------------------- | ------------------- |
| 1    | Schedule weekly cleanup sweeps (dead code, unused imports, stale branches) | Maturity            |
| 2    | Add event-triggered cleanups (post-merge, post-release)                    | Effectiveness       |
| 2    | Implement conflict reconciliation agents for concurrent MAS edits          | Scalability         |
| 3    | Build entropy metrics dashboard (tech debt score over time)                | Human Role          |

**Dependencies:** Requires Bash Sandboxes (P0-1) for execution. Interacts with Pattern Auditing (P3-3).

---

#### P3-2. Documentation Sync

**Gap Signals:**

- README describes features that no longer exist
- API docs don't match actual endpoints
- Agent-generated code has no corresponding documentation updates
- Documentation drift is discovered by users, not by automation

**Improvement Policies:**

| Tier | Action                                                                         | Dimension Addressed |
| ---- | ------------------------------------------------------------------------------ | ------------------- |
| 1    | Add CI checks that flag documentation files older than associated code changes | Maturity            |
| 2    | Deploy documentation consistency agents that compare docs to code              | Effectiveness       |
| 2    | Require doc updates as part of agent task completion criteria                  | Risk                |
| 3    | Implement auto-generated documentation from code with human review             | Scalability         |

**Dependencies:** Maintains Repository as Truth (P1-1). Feeds into Consolidation Loop (P3-4).

---

#### P3-3. Pattern Auditing

**Gap Signals:**

- Circular dependencies form and persist
- Coding patterns diverge across modules (inconsistent approaches to the same problem)
- Agent copies patterns from outdated parts of the codebase
- No automated detection of architectural drift

**Improvement Policies:**

| Tier | Action                                                              | Dimension Addressed |
| ---- | ------------------------------------------------------------------- | ------------------- |
| 1    | Run dependency analysis tools to detect cycles and dead code        | Maturity            |
| 2    | Define canonical patterns and detect deviations automatically       | Effectiveness       |
| 2    | Build a "pattern registry" the agent references before implementing | Risk                |
| 3    | Deploy pattern enforcement agents that submit fix PRs autonomously  | Scalability         |

**Dependencies:** Requires Dependency Enforcement (P2-2) for boundary definitions. Informed by Automated Linters (P2-1).

---

#### P3-4. Consolidation Loop

**Gap Signals:**

- System counts in `CLAUDE.md` are wrong
- No changelog is maintained
- Architectural Decision Records (ADRs) are never created
- Config files drift from actual system state

**Improvement Policies:**

| Tier | Action                                                                    | Dimension Addressed |
| ---- | ------------------------------------------------------------------------- | ------------------- |
| 1    | Automate system count updates in core docs after each feature merge       | Maturity            |
| 2    | Build changelog accumulation pipeline triggered by commits/PRs            | Effectiveness       |
| 2    | Auto-prompt for ADR creation when new architectural patterns are detected | Risk                |
| 3    | Implement config drift detection and auto-correction                      | Scalability         |

**Dependencies:** Requires Documentation Sync (P3-2). Maintains Repository as Truth (P1-1). Ensures long-term harness coherence.

---

## Part 3: Cross-Cutting Evaluation Perspectives

Beyond per-feature analysis, these cross-cutting perspectives reveal systemic gaps that span multiple features.

### Perspective A: The Feedback Loop Chain

A harness is only as strong as its weakest feedback loop. Trace the chain:

```text
Agent writes code → Self-Verification catches errors → Linters enforce style →
Auditors review architecture → Cleanups fix what slipped through →
Observability reveals patterns → Humans improve the harness
```

**Gap test:** Break this chain at any point. If you remove one link, does the system still converge on correct output? If not, that link is a critical dependency.

### Perspective B: The Token Economics View

Every feature either **saves tokens** (Context Compaction, Tool Offloading, Progressive Skills, Automated Linters) or **costs tokens** (AI Auditors, Web Search, Collective Verification). Map each feature's token impact:

| Token Savers                                       | Token Spenders                      |
| -------------------------------------------------- | ----------------------------------- |
| Context Compaction                                 | AI Auditors / Diverse Collaboration |
| Tool Offloading                                    | Web Search & MCP                    |
| Progressive Skills                                 | Collective Verification (MAS)       |
| Automated Linters (prevent dead ends)              | Inter-Agent Communication (MAS)     |
| Planning & State Files (prevent rework)            | Scheduled Cleanups                  |
| Context Anchoring (prevent strategic drift)        |                                     |
| Branch Cognitive Memory (prevent chunk processing) |                                     |

**Gap test:** Is the net token balance positive? Are token spenders delivering proportional value?

### Perspective C: The Failure Cascade Map

Some features, when absent, trigger chain failures across the system:

```text
No Repository as Truth → Agent hallucinates architecture
  → Linters can't catch semantic violations → AI Auditors give wrong feedback
    → Entropy accumulates faster → Cleanups can't keep up
```

```text
No Self-Verification → Agent ships broken code
  → Escalation overloads humans → Humans lose trust
    → Manual review replaces automation → Human role regresses
```

**Gap test:** For each feature scored 0-1, trace the cascade. Features with the longest cascade chains are the highest priority.

### Perspective D: The SAS→MAS Readiness Assessment

Score each feature on MAS-readiness:

| Feature                 | SAS-Only              | MAS-Ready                  | MAS-Optimized                                |
| ----------------------- | --------------------- | -------------------------- | -------------------------------------------- |
| Filesystem & Git        | Single workspace      | Git worktrees              | File locking + task claiming                 |
| Self-Verification       | Run tests locally     | Gate on shared state       | Consensus voting                             |
| Orchestration           | Sequential tasks      | Supervisor pattern         | Dynamic topology switching                   |
| Context Compaction      | Single window         | Per-agent windows          | Distributed memory management                |
| AI Auditors             | Single reviewer       | Cooperative review         | Competition + coopetition                    |
| Context Anchoring       | Single-session memory | Persistent anchor files    | Shared anchor files for collective alignment |
| Branch Cognitive Memory | Sequential execution  | Sub-task branches          | Parallel agents with structured merge gates  |
| Escalation              | Alert human           | Retry with different agent | Tiered multi-agent escalation                |

**Gap test:** If your organization plans MAS adoption, any feature stuck in "SAS-Only" is a blocker.

### Perspective E: The Human Role Progression

Map where each feature places the human:

| Stage                  | Human Role                               | Features That Enable It                                  |
| ---------------------- | ---------------------------------------- | -------------------------------------------------------- |
| **Code Writer**        | Writes code, reviews manually            | (No harness features needed)                             |
| **Harness Builder**    | Builds scaffolding, reviews agent PRs    | Repository as Truth, Linters, Self-Verification          |
| **System Architect**   | Designs environments, spot-checks        | Orchestration, AI Auditors, Observability                |
| **Strategic Overseer** | Sets goals, harness evolves autonomously | Harness Versioning, Consolidation Loop, Pattern Auditing |

**Gap test:** At which stage is the team stuck? The features enabling the next stage are the improvement priority.

---

## Part 4: Composite Scoring and Prioritization

### Step 1: Score Each Feature

For each of the 28 features, score across all 6 dimensions (0-5). This produces a 28×6 matrix.

### Step 2: Weight Dimensions by Strategic Priority

Default equal weighting (16.7% each). Adjust based on context:

| Context                        | Increase Weight              | Decrease Weight |
| ------------------------------ | ---------------------------- | --------------- |
| Security-sensitive domain      | Risk Exposure                | Cost-Efficiency |
| Startup / resource-constrained | Cost-Efficiency              | Scalability     |
| Preparing for MAS              | Scalability                  | Human Role      |
| Compliance-heavy industry      | Risk Exposure, Effectiveness | Cost-Efficiency |

### Step 3: Calculate Priority Score

```text
Priority Score = (5 - Composite Score) × Impact Weight × Cascade Length
```

Where:

- **Composite Score** = weighted average across 6 dimensions
- **Impact Weight** = how many other features depend on this one (from dependency maps)
- **Cascade Length** = how many downstream failures result from this gap (from Perspective C)

### Step 4: Tier the Results

| Tier                  | Priority Score | Action Timeline         |
| --------------------- | -------------- | ----------------------- |
| **Tier 1: Critical**  | Top 20%        | Immediate (this sprint) |
| **Tier 2: Important** | Middle 40%     | Mid-term (this quarter) |
| **Tier 3: Enhance**   | Bottom 40%     | Long-term (this half)   |

---

## Part 5: Quick-Start Evaluation Checklist

For teams that want to start immediately without full scoring, use this rapid assessment:

**Foundation — Can the agent execute safely?**

- [ ] Agent runs in an isolated sandbox (not on developer's machine)
- [ ] Agent's work is Git-tracked and rollback-able
- [ ] Agent runs tests and reads its own error logs before completing
- [ ] Long tasks survive context window resets (Ralph Loops)
- [ ] Common tasks are executed via intelligent wrappers (ccp, ccpr, reconcile)
- [ ] Stuck agents escalate to humans automatically

**Pillar 1 — Does the agent know what it needs to know?**

- [ ] All project rules are in the repo, not in human heads
- [ ] Context window doesn't degrade on tasks >30 minutes
- [ ] Agent can access real-time CI/CD status and external data
- [ ] Tools are loaded on-demand, not all-at-once
- [ ] Critical decisions are recorded to persistent memory files (what, why, target, background)
- [ ] Complex objectives are decomposed into concurrent branches with structured commit memory
- [ ] All user stories and requirements are recorded in a unified ledger before planning

**Pillar 2 — Is the agent mechanically prevented from bad output?**

- [ ] Pre-commit hooks reject style and type violations
- [ ] Import boundaries are enforced by CI, not just convention
- [ ] A second agent or process reviews the first agent's output
- [ ] Agent actions are bounded by explicit limits (e.g., human-in-the-loop for high-risk actions)
- [ ] Requirements are validated in the ledger before planning proceeds

**Pillar 3 — Does the system clean up after itself?**

- [ ] Automated sweeps run on a schedule (not just when humans remember)
- [ ] Documentation is validated against code, not just written once
- [ ] Dead code and circular dependencies are detected automatically
- [ ] Core system docs (counts, changelogs, configs) stay in sync

**Each unchecked box is a gap. Each gap maps to a specific feature's Tier 1 improvement policy above.**
