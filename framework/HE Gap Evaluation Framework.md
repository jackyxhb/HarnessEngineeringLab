# HE Gap Evaluation Framework

A comprehensive, multi-dimensional approach to evaluating Harness Engineering gaps and deriving improvement policies for each core feature. This framework replaces simple binary checklists with a systematic method for identifying where a harness is weak, why it matters, and what to do about it.

---

## Part 1: Evaluation Dimensions

Every core feature is evaluated through **six lenses**. Each lens reveals a different type of gap that a single-dimension maturity model would miss.

```json
[
  { "dimension": "Implementation Maturity", "question": "How fully built is this feature?", "why_it_matters": "Unbuilt features can't deliver value" },
  { "dimension": "Operational Effectiveness", "question": "Does the feature actually work in practice?", "why_it_matters": "A feature can exist but underperform" },
  { "dimension": "Risk Exposure", "question": "What breaks if this feature is absent or weak?", "why_it_matters": "Reveals hidden blast radius" },
  { "dimension": "Cost-Efficiency", "question": "Is the investment proportional to the value?", "why_it_matters": "Prevents over-engineering and token waste" },
  { "dimension": "Scalability (SAS→MAS)", "question": "Will this feature survive the transition to multi-agent?", "why_it_matters": "Avoids rework when scaling" },
  { "dimension": "Human Role Evolution", "question": "Does this feature shift humans from writing code to designing systems?", "why_it_matters": "Measures progress toward the HE vision" }
]
```

### Scoring Scale (per dimension)

```json
[
  { "score": 0, "label": "Absent", "meaning": "Feature does not exist" },
  { "score": 1, "label": "Ad-hoc", "meaning": "Informal, inconsistent, human-dependent" },
  { "score": 2, "label": "Basic", "meaning": "Partially implemented, works for simple cases" },
  { "score": 3, "label": "Functional", "meaning": "Reliable for standard workflows" },
  { "score": 4, "label": "Optimized", "meaning": "Measurably effective, monitored, iterated upon" },
  { "score": 5, "label": "Leading", "meaning": "Autonomous, self-improving, sets industry standard" }
]
```

---

## Part 2: Feature-by-Feature Gap Analysis and Improvement Policies

Each of the 31 core features is analyzed below with:

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

```json
[
  { "tier": 1, "action": "Provision isolated containers or VMs per agent session", "dimensions": ["Risk", "Maturity"] },
  { "tier": 1, "action": "Pre-install language runtimes, test runners, and CLI tools in sandbox images", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Enable visual monitoring of sandbox state (tmux, split-pane terminals)", "dimensions": ["Human Role"] },
  { "tier": 3, "action": "Auto-scale sandbox pools based on concurrent agent demand", "dimensions": ["Scalability", "Cost"] }
]
```

**Dependencies:** Required by Verification (P0-3), Orchestration Logic (P0-5). Blocking if absent.

---

#### P0-2. Filesystem, Git & File Locking

**Gap Signals:**

- Agents lose state between sessions
- No version control of agent-generated changes
- Multiple agents overwrite each other's files (MAS)
- No rollback mechanism when agent produces bad output

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Ensure every agent session has a Git-tracked workspace", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Implement per-agent branching strategy (worktrees or feature branches)", "dimensions": ["Risk"] },
  { "tier": 2, "action": "Add file locking and task-claiming for MAS shared workspaces", "dimensions": ["Scalability"] },
  { "tier": 2, "action": "Build rollback automation (auto-revert on test failure)", "dimensions": ["Effectiveness"] },
  { "tier": 3, "action": "Implement conflict resolution agents for concurrent edits", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Foundation for all other features. Planning, Task Lists & Blackboards (P1-7) and Scheduled Cleanups (P3-1) depend on this.

---

#### P0-3. Verification (Self & Collective)

**Gap Signals:**

- Agent submits code without running tests
- Agent cannot read its own error logs
- No feedback loop between code generation and validation
- Human must manually verify every agent output

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Wire test suite execution into the agent's task completion flow", "dimensions": ["Maturity", "Effectiveness"] },
  { "tier": 1, "action": "Pipe error logs back into agent context for autonomous fix attempts", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Add pre-completion checklists that gate task finalization", "dimensions": ["Risk"] },
  { "tier": 2, "action": "Upgrade to collective verification (consensus voting) for MAS", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Implement verification metrics (pass rate, fix iterations) for observability", "dimensions": ["Human Role"] }
]
```

**Dependencies:** Requires Bash Sandboxes (P0-1). Enables Escalation Policies & Audit Trails (P0-7) — escalation triggers when self-verification fails repeatedly.

---

#### P0-4. Ralph Loops

**Gap Signals:**

- Agent stops mid-task and declares "done" prematurely
- Long-horizon tasks consistently produce incomplete output
- Context window exhaustion causes agent to lose track of the goal
- No mechanism to reinject the original prompt into a fresh context

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Implement exit interception hooks that detect premature completion", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Build prompt reinjection with state summary into fresh context windows", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Add loop budgets (max reinjections) to prevent infinite retries", "dimensions": ["Cost", "Risk"] },
  { "tier": 2, "action": "Track loop metrics (reinjection count, completion rate)", "dimensions": ["Effectiveness"] },
  { "tier": 3, "action": "Combine with Planning & State Files for cross-window goal persistence", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Requires Planning, Task Lists & Blackboards (P1-7) for state persistence across reinjections. Interacts with Escalation Policies & Audit Trails (P0-7) for max-retry limits.

---

#### P0-5. Orchestration Logic

**Gap Signals:**

- Only one agent can work at a time
- No task routing — all tasks go to the same agent regardless of specialization
- Subagent spawning is manual or impossible
- Task handoffs lose context

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Implement basic supervisor pattern (central orchestrator → workers)", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Add topology selection based on task type (parallel vs. sequential)", "dimensions": ["Effectiveness", "Cost"] },
  { "tier": 2, "action": "Build context-preserving handoff protocols between agents", "dimensions": ["Effectiveness"] },
  { "tier": 3, "action": "Support dynamic topology switching (supervisor ↔ peer-to-peer ↔ swarm)", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Implement overhead monitoring to detect coordination degradation", "dimensions": ["Cost"] }
]
```

**Dependencies:** Requires Inter-Agent Communication (P0-10) for MAS topologies. Enables all multi-agent workflows.

---

#### P0-6. Rippable Middleware

**Gap Signals:**

- Harness logic is monolithic and tightly coupled
- Removing one component breaks the entire pipeline
- Middleware built for older models is still running despite model improvements
- No ability to A/B test harness configurations

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Refactor harness into composable, independently removable layers", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Add feature flags to toggle middleware components on/off", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Regularly audit middleware relevance against current model capabilities", "dimensions": ["Cost"] },
  { "tier": 3, "action": "Build A/B testing infrastructure to compare harness variants", "dimensions": ["Human Role", "Effectiveness"] }
]
```

**Dependencies:** Enables Harness Versioning (P0-8). Philosophical foundation — over-engineering prevention.

---

#### P0-7. Escalation Policies & Audit Trails

**Gap Signals:**

- Agent loops indefinitely on unsolvable problems
- No notification when agent is stuck
- Human discovers failures hours or days later
- No defined threshold for "stuck" vs. "still working"

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Define escalation triggers (N consecutive test failures, time limits, loop detection)", "dimensions": ["Maturity", "Risk"] },
  { "tier": 1, "action": "Route stuck tasks to human via notification (Slack, email, dashboard)", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Implement tiered escalation (retry → different agent → human)", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Add escalation analytics to identify systemic failure patterns", "dimensions": ["Human Role"] }
]
```

**Dependencies:** Requires Verification (P0-3) to detect failure. Requires Observability (P1-5) for monitoring.

---

#### P0-8. Harness Versioning

**Gap Signals:**

- No way to compare different harness configurations
- Changes to the harness are untested before deployment
- Cannot reproduce results from a previous harness version
- No data on which configurations produce better agent output

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Version-control all harness configuration (prompts, tools, middleware)", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Track agent performance metrics per harness version", "dimensions": ["Effectiveness"] },
  { "tier": 3, "action": "Build A/B testing pipeline to statistically compare harness variants", "dimensions": ["Human Role"] },
  { "tier": 3, "action": "Implement automated harness optimization (genetic/evolutionary search)", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Requires Observability (P1-5) for performance data. Requires Rippable Middleware (P0-6) for component-level versioning.

---

#### P0-9. Smart Command Wrappers

**Gap Signals:**

- Agents execute raw, multi-step CLI commands (git, npm, shell) manually
- No standardization of common workflows (CCPR, Reconcile)
- High variation in commit message quality and release note detail
- Coordination overhead from agents mis-ordering system commands

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Install baseline wrapper workflows (ccp, ccpr, reconcile) in the repository", "dimensions": ["Maturity", "Risk"] },
  { "tier": 2, "action": "Integrate agent reasoning into wrappers (auto-generating comments/release notes)", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Stratify commands by cost tier: smoke (< 2s, pre-commit) → check (< 30s, pre-push) → audit (< 60s, on-demand) → LLM review (expensive, last resort). Agents must use the cheapest tier appropriate to context", "dimensions": ["Cost", "Effectiveness"] },
  { "tier": 3, "action": "Build automated workflow validation (ensuring wrappers are used over raw CLI)", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Requires Filesystem, Git & File Locking (P0-2). Enables Consistent Entropy Management (P3).

---

#### P0-10. Inter-Agent Communication (The Mailbox)

**Gap Signals:**

- Agents coordinate only through shared files, with no structured messaging
- No mechanism for direct peer-to-peer communication between agents
- Broadcasting important state changes requires manual orchestrator intervention
- Idle agents have no way to signal availability to the swarm
- Task handoffs lose context because there is no message protocol

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Implement a shared message queue or mailbox file that agents poll for directives", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Define message schema (sender, receiver, type, payload, timestamp)", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Add peer-to-peer (P2P), broadcast, and idle notification communication strategies", "dimensions": ["Scalability"] },
  { "tier": 2, "action": "Implement message acknowledgment and delivery guarantees", "dimensions": ["Risk"] },
  { "tier": 3, "action": "Build adaptive routing that selects communication strategy based on topology", "dimensions": ["Scalability", "Cost"] }
]
```

**Dependencies:** Required by Multi-Agent Orchestration Logic (P0-5) for topology management. Interacts with Planning, Task Lists & Blackboards (P1-7) for task claiming.

---

#### P0-11. Portable Agent Surface

**Gap Signals:**

- `AGENTS.md` does not exist at the repository root
- `CLAUDE.md` or `.cursorrules` contains project-wide rules not replicated in an IDE-agnostic file
- IDE-specific files contain substantive harness rules instead of pointers to a canonical source
- Project rules are stored in an IDE's proprietary memory system (e.g., Claude Code memory files) invisible to other IDEs
- Switching IDEs requires manually re-creating the agent instruction surface

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Create AGENTS.md at repo root with all IDE-agnostic harness rules", "dimensions": ["Maturity", "Risk"] },
  { "tier": 1, "action": "Refactor IDE-specific files to thin shims referencing AGENTS.md", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Add CI lint check verifying AGENTS.md exists and shim files contain canonical reference pointer", "dimensions": ["Risk", "Scalability"] },
  { "tier": 3, "action": "Auto-generate IDE shim files from AGENTS.md template during CI", "dimensions": ["Scalability", "Cost"] }
]
```

**Dependencies:** Requires Repository as Truth (P1-1) for content. Enables Rippable Middleware (P0-6) philosophy — IDE integration layers are independently swappable.

---

### Pillar 1: Context Engineering (Inform)

#### P1-1. Repository as Truth

**Gap Signals:**

- Project rules live in Slack, Google Docs, or human memory
- Agent hallucinates because it lacks access to architectural decisions
- Onboarding a new agent requires extensive human briefing
- `CLAUDE.md` or `AGENTS.md` is absent or stale

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Create and maintain `CLAUDE.md` / `AGENTS.md` with project conventions", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Migrate all architectural decisions from external tools into the repo", "dimensions": ["Risk", "Effectiveness"] },
  { "tier": 2, "action": "Add linter validation that context files are present and non-empty", "dimensions": ["Risk"] },
  { "tier": 2, "action": "Cross-link design docs to code modules for agent discoverability", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Score codebase Agent Legibility (see Perspective F) and address low-scoring criteria: replace bleeding-edge stacks, clarify boundaries, reduce metaprogramming", "dimensions": ["Effectiveness", "Cost"] },
  { "tier": 2, "action": "Implement expertise extraction: every human correction of an agent mistake must produce a new harness artifact (AGENTS.md rule, linter rule, or template), not just a code fix", "dimensions": ["Human Role", "Effectiveness"] },
  { "tier": 3, "action": "Automate staleness detection — alert when docs diverge from code", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Foundation for all Pillar 1 features. Documentation Sync (P3-2) maintains this over time.

---

#### P1-2. Context Compaction & Memory Management

**Gap Signals:**

- Agent performance degrades noticeably on long tasks
- Context window fills with conversation history and noise
- Agent "forgets" early instructions by the end of a session
- No summarization or offloading of old context

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Implement conversation history summarization at regular intervals", "dimensions": ["Maturity", "Effectiveness"] },
  { "tier": 2, "action": "Separate short-term (session) from long-term (vector DB) memory", "dimensions": ["Scalability"] },
  { "tier": 2, "action": "Set token budgets per context section (tools, history, instructions)", "dimensions": ["Cost"] },
  { "tier": 3, "action": "Build adaptive compaction that adjusts aggressiveness based on task complexity", "dimensions": ["Effectiveness"] }
]
```

**Dependencies:** Interacts with Tool Offloading (P1-3). Critical for Ralph Loops (P0-4) — reinjected prompts need compacted state.

---

#### P1-3. Tool Offloading

**Gap Signals:**

- Large tool outputs (logs, API responses) consume most of the context window
- Agent loses reasoning quality after a few tool calls
- Full tool outputs are kept in context when only the summary matters

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Strip tool outputs to head/tail tokens; store full results on filesystem", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Make full tool outputs retrievable on-demand by the agent", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Set per-tool token limits with configurable thresholds", "dimensions": ["Cost"] },
  { "tier": 3, "action": "Build intelligent summarization (LLM-based) for complex tool outputs", "dimensions": ["Effectiveness"] }
]
```

**Dependencies:** Requires Filesystem (P0-2) for storage. Feeds into Context Compaction (P1-2).

---

#### P1-4. Progressive Skills

**Gap Signals:**

- Agent's system prompt is enormous with all tools loaded at startup
- Adding a new tool degrades performance on unrelated tasks
- Agent uses wrong tools because too many are available simultaneously

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Organize tools into role-based skill modules", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Load only task-relevant skills at assignment time", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Implement skill routing — agent or orchestrator selects skills based on task type", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Build skill performance tracking (which skills improve task success rates)", "dimensions": ["Human Role"] }
]
```

**Dependencies:** Enables efficient Orchestration Logic (P0-5) — orchestrators select skill profiles per subagent.

---

#### P1-5. Observability / Dashboards

**Gap Signals:**

- No visibility into agent success/failure rates
- Cannot diagnose why an agent produced bad output
- Agent cannot access its own CI/CD pipeline status
- Human engineers fly blind on agent behavior patterns

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Expose CI/CD status, test results, and error logs to agent context", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Build basic dashboard showing agent task outcomes", "dimensions": ["Human Role"] },
  { "tier": 2, "action": "Add traces (per-step reasoning, tool calls, decisions) for debugging", "dimensions": ["Effectiveness", "Risk"] },
  { "tier": 2, "action": "Implement agent performance metrics (completion rate, fix iterations, token usage)", "dimensions": ["Cost"] },
  { "tier": 3, "action": "Build anomaly detection on agent behavior patterns", "dimensions": ["Scalability", "Risk"] }
]
```

**Dependencies:** Required by Escalation Policies & Audit Trails (P0-7), Harness Versioning (P0-8). Enables data-driven harness improvement.

---

#### P1-6. Web Search & MCP Integration

**Gap Signals:**

- Agent produces outdated answers for rapidly evolving domains
- No access to external APIs, documentation, or real-time data
- Agent cannot look up library versions or API changes

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Integrate web search tool into agent's available tools", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Connect MCP servers for domain-specific external context", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Add caching layer to reduce redundant external lookups", "dimensions": ["Cost"] },
  { "tier": 3, "action": "Build relevance filtering — agent decides when external search adds value", "dimensions": ["Effectiveness"] }
]
```

**Dependencies:** Largely independent. Interacts with Tool Offloading (P1-3) — search results can be noisy.

---

#### P1-7. Planning, Task Lists & Blackboards

**Gap Signals:**

- Agent approaches complex tasks without decomposing them
- No persistent plan that survives context window resets
- Agent repeats work it already completed in a previous step
- No shared task board for MAS coordination

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Store task plans as files on the filesystem with step-by-step breakdown", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Inject plan reminders into agent context at each step", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Evolve to shared task lists with status tracking (claimed, in-progress, done)", "dimensions": ["Scalability"] },
  { "tier": 2, "action": "Add blackboard architecture for MAS partial solution sharing", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Implement plan quality scoring and adaptive replanning", "dimensions": ["Effectiveness"] }
]
```

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

```json
[
  { "tier": 1, "action": "Create memory anchor files (e.g., `ANCHORS.md`, `decisions.log`) for recording critical decisions", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Write structured records at each major decision point: what, why, target, background", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Build recall hooks that auto-inject anchor summaries at session start or after context resets", "dimensions": ["Effectiveness", "Scalability"] },
  { "tier": 2, "action": "Implement shared anchor files accessible to all agents in MAS setups", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Add anchor quality metrics (staleness detection, relevance scoring)", "dimensions": ["Human Role"] }
]
```

**Dependencies:** Complements Planning, Task Lists & Blackboards (P1-7) — plans track _what to do next_, anchors track _why we're doing it_. Enhanced by Context Compaction (P1-2) — anchor summaries survive compaction. Critical for Ralph Loops (P0-4) — reinjected contexts need anchors for strategic continuity.

---

#### P1-9. Branch-Based Cognitive Memory

**Gap Signals:**

- Agent processes multi-step complex objectives holistically in a monolithic branch
- No checkpointed cognitive history for distinct sub-tasks
- Sub-tasks are executed sequentially rather than concurrently when they could be parallelized
- Commit messages are sparse and lack structured evidentiary value

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Require agents to spawn new branches for sub-tasks and merge back cleanly", "dimensions": ["Maturity", "Risk"] },
  { "tier": 1, "action": "Enforce detailed, accurate commit messages during segment checkpoints", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Introduce branch and sub-task coordination logic within orchestration", "dimensions": ["Scalability", "Cost"] },
  { "tier": 3, "action": "Use commit history natively as a form of contextual RAG memory", "dimensions": ["Effectiveness"] }
]
```

**Dependencies:** Relies on Filesystem, Git & File Locking (P0-2). Operates alongside Orchestration Logic (P0-5) for MAS mapping.

---

#### P1-10. Requirements Ledger

**Gap Signals:**

- Agents start coding immediately from chat input without recording requirements
- Requirements exist only in conversation history or human memory, not in structured files
- Multiple conflicting interpretations of the same feature exist across agents or sessions
- No canonical source of truth for user stories, acceptance criteria, or functional scenarios
- Planning proceeds without any reference to a documented backlog

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Create a canonical `REQUIREMENTS.md` with structured entries in the project root", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Record every user story, requirement, and scenario before planning", "dimensions": ["Risk", "Effectiveness"] },
  { "tier": 2, "action": "Add pre-planning validation hooks that check the ledger before plan/execute", "dimensions": ["Effectiveness", "Scalability"] },
  { "tier": 2, "action": "Implement shared ledger with file locking for MAS environments", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Build automated requirement deduplication and conflict detection", "dimensions": ["Scalability", "Human Role"] }
]
```

**Dependencies:** Feeds Planning, Task Lists & Blackboards (P1-7) — plans should reference ledger entries. Feeds Context Anchoring (P1-8) — anchors can reference requirement IDs. Enables Upstream Intake Gate (P2-5).

---

#### P1-11. Socratic Questioning

**Gap Signals:**

- Agent starts coding immediately from unclear or ambiguous input without surfacing assumptions
- Requirements contain multiple valid interpretations and only one is silently chosen by the agent
- Post-execution rework reveals "I assumed you meant…" situations
- Agent output diverges significantly from user intent with no documented clarification pass
- No record of resolved ambiguities, extracted clarifications, or interrogation questions in the project
- Hidden assumptions compound across planning steps, multiplying downstream errors

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Define a mandatory pre-execution ambiguity check: list all assumptions explicitly and surface them as questions before planning", "dimensions": ["Maturity", "Risk"] },
  { "tier": 1, "action": "Apply the 6 Socratic question categories (Clarification, Assumptions, Evidence, Viewpoints, Implications, Meta-questions) to all ambiguous inputs", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Inject Socratic interrogation templates into agent intake meta-docs (e.g., CLAUDE.md, AGENTS.md) so all agents apply them automatically", "dimensions": ["Effectiveness", "Scalability"] },
  { "tier": 2, "action": "Record resolved clarifications as ledger entries (P1-10) or anchor records (P1-8) before planning proceeds", "dimensions": ["Maturity", "Risk"] },
  { "tier": 3, "action": "In MAS, distribute question categories to specialized interrogator agents operating in parallel to minimize latency", "dimensions": ["Scalability", "Cost"] }
]
```

**Dependencies:** Feeds Requirements Ledger (P1-10) — extracted clarifications become formal ledger entries. Feeds Context Anchoring (P1-8) — resolved ambiguities are recorded as decision anchors. Complements Upstream Intake Gate (P2-5) — the Socratic round is the intake qualification step. Enhances Planning, Task Lists & Blackboards (P1-7) — clearer inputs produce better plans and fewer mid-execution pivots.

---

### Pillar 2: Architectural Constraints (Constrain)

#### P2-1. Automated Linters

**Gap Signals:**

- Agent commits code with formatting violations
- No pre-commit hooks in the repository
- Style guide exists but is not mechanically enforced
- Agent wastes tokens exploring code patterns that will be rejected

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Add pre-commit hooks for formatting, linting, and type checking", "dimensions": ["Maturity"] },
  { "tier": 1, "action": "Ensure linter error messages include remediation instructions (they're prompts)", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Add custom rules for project-specific conventions beyond standard linters", "dimensions": ["Effectiveness"] },
  { "tier": 3, "action": "Track linter violation frequency to identify recurring agent weaknesses", "dimensions": ["Human Role"] }
]
```

**Dependencies:** Low dependency — can be implemented independently. Feeds data to Pattern Auditing (P3-3).

---

#### P2-2. Dependency Enforcement

**Gap Signals:**

- Agent imports from forbidden architectural layers
- No structural boundaries between modules
- Dependency violations are only caught in manual code review
- Circular dependencies accumulate over time

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Define and document layer boundaries in architecture specs", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Implement structural tests (e.g., ArchUnit) that fail CI on violations", "dimensions": ["Effectiveness", "Risk"] },
  { "tier": 2, "action": "Add import restrictions to linter configuration", "dimensions": ["Effectiveness"] },
  { "tier": 3, "action": "Auto-generate dependency graphs and flag anomalies", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Requires Repository as Truth (P1-1) for boundary definitions. Feeds Pattern Auditing (P3-3).

---

#### P2-3. AI Auditors & Collaboration Channels

**Gap Signals:**

- Only one agent reviews its own work (no second opinion)
- Agent anchors on first solution without exploring alternatives
- No adversarial testing of agent output
- Code review is entirely human-dependent

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Deploy a secondary LLM agent to review primary agent's PRs", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Implement cooperative review (assembly line — draft → review → approve)", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Add competitive channels (adversarial debate between agents on design choices)", "dimensions": ["Effectiveness", "Risk"] },
  { "tier": 3, "action": "Implement coopetition (agents negotiate and compromise on solutions)", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Track auditor agreement rates to calibrate auditor thresholds", "dimensions": ["Human Role"] }
]
```

**Dependencies:** Requires Orchestration Logic (P0-5) for multi-agent coordination. Enhances Verification (P0-3).

---

#### P2-4. Bounded Autonomy & Access Control

**Gap Signals:**

- Agent executes high-risk actions without human confirmation
- Access controls are missing for sensitive environments or APIs
- No risk-based staging or gradual elevation of privileges
- Potential for cascaded or widespread damage is high if an agent goes rogue

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Require human-in-the-loop approval for critical or irreversible actions", "dimensions": ["Maturity", "Risk"] },
  { "tier": 1, "action": "Implement strict API sandboxing with least-privilege credentials", "dimensions": ["Risk"] },
  { "tier": 2, "action": "Enforce risk-based progressive disclosure of autonomy to the agent", "dimensions": ["Effectiveness"] },
  { "tier": 3, "action": "Use intelligent anomaly detection to dynamically throttle agent capabilities", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Operates alongside Escalation Policies & Audit Trails (P0-7). Extends overall Architectural Constraints.

---

#### P2-5. Upstream Intake Gate

**Gap Signals:**

- Agents jump directly from user conversation to implementation without recording requirements
- Requirements are implicitly assumed rather than explicitly recorded in the ledger
- No validation step exists between requirement intake and plan creation
- Planning workflows proceed without checking that a corresponding ledger entry exists
- Mid-task requirement discoveries are not synced back to the ledger

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Add a mandatory ledger-check step to all planning workflows and meta-docs", "dimensions": ["Maturity", "Risk"] },
  { "tier": 1, "action": "Require agents to pause and sync implicit requirements to the ledger when discovered mid-task", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Implement pre-commit hooks or workflow gates that reject plans without ledger entries", "dimensions": ["Effectiveness", "Scalability"] },
  { "tier": 3, "action": "Build distributed intake validation for MAS -- all agents check the shared ledger", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Requires Requirements Ledger (P1-10) as the target store. Complements Bounded Autonomy (P2-4). Interacts with Planning, Task Lists & Blackboards (P1-7).

---

### Pillar 3: Entropy Management (Maintain)

#### P3-1. Scheduled Cleanups

**Gap Signals:**

- Dead code accumulates without detection
- Known issues persist because no one is assigned to fix them
- Constraint violations slip past initial checks and remain in the codebase
- No scheduled automation for repository hygiene

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Schedule weekly cleanup sweeps (dead code, unused imports, stale branches)", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Add event-triggered cleanups (post-merge, post-release)", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Implement conflict reconciliation agents for concurrent MAS edits", "dimensions": ["Scalability"] },
  { "tier": 3, "action": "Build entropy metrics dashboard (tech debt score over time)", "dimensions": ["Human Role"] }
]
```

**Dependencies:** Requires Bash Sandboxes (P0-1) for execution. Interacts with Pattern Auditing (P3-3).

---

#### P3-2. Documentation Sync

**Gap Signals:**

- README describes features that no longer exist
- API docs don't match actual endpoints
- Agent-generated code has no corresponding documentation updates
- Documentation drift is discovered by users, not by automation

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Add CI checks that flag documentation files older than associated code changes", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Deploy documentation consistency agents that compare docs to code", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Require doc updates as part of agent task completion criteria", "dimensions": ["Risk"] },
  { "tier": 3, "action": "Implement auto-generated documentation from code with human review", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Maintains Repository as Truth (P1-1). Feeds into Consolidation Loop (P3-4).

---

#### P3-3. Pattern Auditing

**Gap Signals:**

- Circular dependencies form and persist
- Coding patterns diverge across modules (inconsistent approaches to the same problem)
- Agent copies patterns from outdated parts of the codebase
- No automated detection of architectural drift

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Run dependency analysis tools to detect cycles and dead code", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Define canonical patterns and detect deviations automatically", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Build a \"pattern registry\" the agent references before implementing", "dimensions": ["Risk"] },
  { "tier": 3, "action": "Deploy pattern enforcement agents that submit fix PRs autonomously", "dimensions": ["Scalability"] }
]
```

**Dependencies:** Requires Dependency Enforcement (P2-2) for boundary definitions. Informed by Automated Linters (P2-1).

---

#### P3-4. Consolidation Loop

**Gap Signals:**

- System counts in `CLAUDE.md` are wrong
- No changelog is maintained
- Architectural Decision Records (ADRs) are never created
- Config files drift from actual system state

**Improvement Policies:**

```json
[
  { "tier": 1, "action": "Automate system count updates in core docs after each feature merge", "dimensions": ["Maturity"] },
  { "tier": 2, "action": "Build changelog accumulation pipeline triggered by commits/PRs", "dimensions": ["Effectiveness"] },
  { "tier": 2, "action": "Auto-prompt for ADR creation when new architectural patterns are detected", "dimensions": ["Risk"] },
  { "tier": 3, "action": "Implement config drift detection and auto-correction", "dimensions": ["Scalability"] }
]
```

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

```json
{
  "token_savers": [
    "Context Compaction",
    "Tool Offloading",
    "Progressive Skills",
    "Automated Linters (prevent dead ends)",
    "Planning & State Files (prevent rework)",
    "Context Anchoring (prevent strategic drift)",
    "Branch Cognitive Memory (prevent chunk processing)"
  ],
  "token_spenders": [
    "AI Auditors / Diverse Collaboration",
    "Web Search & MCP",
    "Collective Verification (MAS)",
    "Inter-Agent Communication (MAS)",
    "Scheduled Cleanups"
  ]
}
```

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

```json
[
  { "feature": "Filesystem & Git", "sas_only": "Single workspace", "mas_ready": "Git worktrees", "mas_optimized": "File locking + task claiming" },
  { "feature": "Self-Verification", "sas_only": "Run tests locally", "mas_ready": "Gate on shared state", "mas_optimized": "Consensus voting" },
  { "feature": "Orchestration", "sas_only": "Sequential tasks", "mas_ready": "Supervisor pattern", "mas_optimized": "Dynamic topology switching" },
  { "feature": "Context Compaction", "sas_only": "Single window", "mas_ready": "Per-agent windows", "mas_optimized": "Distributed memory management" },
  { "feature": "AI Auditors", "sas_only": "Single reviewer", "mas_ready": "Cooperative review", "mas_optimized": "Competition + coopetition" },
  { "feature": "Context Anchoring", "sas_only": "Single-session memory", "mas_ready": "Persistent anchor files", "mas_optimized": "Shared anchor files for collective alignment" },
  { "feature": "Branch Cognitive Memory", "sas_only": "Sequential execution", "mas_ready": "Sub-task branches", "mas_optimized": "Parallel agents with structured merge gates" },
  { "feature": "Escalation", "sas_only": "Alert human", "mas_ready": "Retry with different agent", "mas_optimized": "Tiered multi-agent escalation" }
]
```

**Gap test:** If your organization plans MAS adoption, any feature stuck in "SAS-Only" is a blocker.

### Perspective E: The Human Role Progression

Map where each feature places the human:

```json
[
  { "stage": "Code Writer", "human_role": "Writes code, reviews manually", "features": "(No harness features needed)" },
  { "stage": "Harness Builder", "human_role": "Builds scaffolding, reviews agent PRs", "features": "Repository as Truth, Linters, Self-Verification" },
  { "stage": "System Architect", "human_role": "Designs environments, spot-checks", "features": "Orchestration, AI Auditors, Observability" },
  { "stage": "Strategic Overseer", "human_role": "Sets goals, harness evolves autonomously", "features": "Harness Versioning, Consolidation Loop, Pattern Auditing" }
]
```

**Gap test:** At which stage is the team stuck? The features enabling the next stage are the improvement priority.

### Perspective F: Agent Legibility Score

Rate how well the codebase is optimized for AI agent consumption rather than just human readability. This perspective targets P1-1 (Repository as Truth) but affects all features — agents working in a legible codebase produce fewer hallucinations across every pillar.

```json
[
  { "criterion": "Tech Stack Stability", "question": "Does the stack use stable, well-documented frameworks with broad training-data representation?", "low": "Bleeding-edge or niche frameworks", "high": "Established frameworks with extensive documentation and community examples" },
  { "criterion": "Boundary Clarity", "question": "Are module boundaries explicit and consistently enforced?", "low": "Implicit boundaries, shared global state, deep inheritance", "high": "Clear interfaces, dependency injection, enforced layers" },
  { "criterion": "Metaprogramming Density", "question": "How much implicit/magic behavior exists?", "low": "Heavy metaprogramming, decorators, monkey-patching", "high": "Explicit, predictable code paths agents can trace" },
  { "criterion": "Worktree Isolation", "question": "Can the project be launched and tested per worktree without shared state?", "low": "Shared databases, singletons, global config files", "high": "Each worktree boots independently with local state" },
  { "criterion": "Naming Consistency", "question": "Are naming conventions consistent and predictable across the codebase?", "low": "Mixed conventions, abbreviations, domain-specific jargon", "high": "Uniform patterns agents can pattern-match reliably" },
  { "criterion": "Documentation Format", "question": "Is documentation machine-parseable (consistent headings, structured lists, semantic IDs)?", "low": "Narrative prose, inconsistent formatting, PDFs", "high": "Markdown with consistent headings, grep-friendly structure" }
]
```

**Scoring:** Rate each criterion 0-5 using the standard scale. Average score < 3 indicates the codebase is a significant source of agent hallucinations. Prioritize Tier 1 improvements to Repository as Truth (P1-1).

**Gap test:** If agents repeatedly produce correct logic in the wrong style, location, or framework idiom, the legibility score is likely low.

---

## Part 4: Composite Scoring and Prioritization

### Step 1: Score Each Feature

For each of the 31 features, score across all 6 dimensions (0-5). This produces a 31×6 matrix.

### Step 2: Weight Dimensions by Strategic Priority

Default equal weighting (16.7% each). Adjust based on context:

```json
[
  { "context": "Security-sensitive domain", "increase": ["Risk Exposure"], "decrease": ["Cost-Efficiency"] },
  { "context": "Startup / resource-constrained", "increase": ["Cost-Efficiency"], "decrease": ["Scalability"] },
  { "context": "Preparing for MAS", "increase": ["Scalability"], "decrease": ["Human Role"] },
  { "context": "Compliance-heavy industry", "increase": ["Risk Exposure", "Effectiveness"], "decrease": ["Cost-Efficiency"] }
]
```

### Step 3: Calculate Priority Score

```text
Priority Score = (5 - Composite Score) × Impact Weight × Cascade Length
```

Where:

- **Composite Score** = weighted average across 6 dimensions
- **Impact Weight** = how many other features depend on this one (from dependency maps)
- **Cascade Length** = how many downstream failures result from this gap (from Perspective C)

### Step 4: Tier the Results

```json
[
  { "tier": "Tier 1: Critical", "priority_score": "Top 20%", "timeline": "Immediate (this sprint)" },
  { "tier": "Tier 2: Important", "priority_score": "Middle 40%", "timeline": "Mid-term (this quarter)" },
  { "tier": "Tier 3: Enhance", "priority_score": "Bottom 40%", "timeline": "Long-term (this half)" }
]
```

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
- [ ] All unclear inputs are interrogated via Socratic questioning (Clarification, Assumptions, Evidence, Viewpoints, Implications, Meta-questions) before execution begins

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
