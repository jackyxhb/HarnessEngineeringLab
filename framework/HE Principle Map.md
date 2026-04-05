# HE Principle Map

The canonical Principle-to-Practice Chain map for all 32 Harness Engineering core features. Each feature is anchored to an explicit Engineering Principle (L1) and threaded through the full 5-level chain defined in `HE Principle Practice Chain.md`.

**Chain Levels:**

```json
[
  { "level": "L1", "name": "Engineering Principle",            "role": "Timeless, first-principles rule — the why" },
  { "level": "L2", "name": "Targeted Enhancement",             "role": "Measurable improvement sought — the what" },
  { "level": "L3", "name": "Design Decisions / Patterns",      "role": "Architecture and strategy choices — the how (design)" },
  { "level": "L4", "name": "Concrete Actions / Configurations", "role": "Executable steps, scripts, configs — the how (build)" },
  { "level": "L5", "name": "Concrete Enhancement",             "role": "Observable result implementors measure — the proof" }
]
```

**Related Documents:**

- L1 principles: defined here (§ Engineering Principles Catalog)
- L3 design patterns: `HE Design Decisions.md` (feature definitions)
- L4 actions & tools: `HE Actions Tools.md`
- L4 negative (what NOT to do): `HE Negative Actions.md`, `AGENTS.md` § DO NOT
- L5 inverse (gap signals): `HE Inverse Outcomes.md`

---

## Engineering Principles Catalog

19 Engineering Principles derived from first-principles engineering wisdom. Each is timeless, general, and distinctly different from every other.

```json
[
  { "id": "EP-1",  "principle": "Isolation prevents contamination",            "origin": "Thermodynamics, clean-room engineering",          "governs": "P0-1" },
  { "id": "EP-2",  "principle": "State must outlive the session",              "origin": "ACID durability, persistence theory",             "governs": "P0-2, P1-7, P1-8, P1-9" },
  { "id": "EP-3",  "principle": "Verify before declaring completion",          "origin": "Quality assurance, test-before-ship",             "governs": "P0-3" },
  { "id": "EP-4",  "principle": "Committed tasks must be completed",           "origin": "Project management, definition of done",          "governs": "P0-4" },
  { "id": "EP-5",  "principle": "Coordination cost must stay bounded",         "origin": "Amdahl's Law, Brooks' Law",                       "governs": "P0-5, P0-10" },
  { "id": "EP-6",  "principle": "Scaffolding is temporary by design",          "origin": "Construction engineering",                        "governs": "P0-6" },
  { "id": "EP-7",  "principle": "Every action must be traceable",              "origin": "Chain of custody, audit provenance",              "governs": "P0-7" },
  { "id": "EP-8",  "principle": "You cannot improve what you do not measure",  "origin": "Deming, statistical process control",             "governs": "P0-8, P1-5" },
  { "id": "EP-9",  "principle": "Standard operations reduce variance",         "origin": "Manufacturing SOPs, jigs and fixtures",           "governs": "P0-9" },
  { "id": "EP-10", "principle": "Portability over proprietary convenience",     "origin": "Interchangeable parts, open standards",           "governs": "P0-11" },
  { "id": "EP-11", "principle": "If it's not in the repo, it doesn't exist",   "origin": "Single source of truth, DRY",                    "governs": "P1-1, P1-10" },
  { "id": "EP-12", "principle": "Finite attention demands active management",   "origin": "Theory of Constraints, bottleneck theory",       "governs": "P1-2, P1-3, P1-4" },
  { "id": "EP-13", "principle": "Current signals outperform stale snapshots",   "origin": "Control theory, feedback loops",                  "governs": "P1-6" },
  { "id": "EP-14", "principle": "Clarity before commitment",                   "origin": "Requirements engineering, measure twice",          "governs": "P1-11, P2-5" },
  { "id": "EP-15", "principle": "Mechanical enforcement over advisory guidance","origin": "Poka-yoke, fool-proofing",                       "governs": "P2-1, P2-2" },
  { "id": "EP-16", "principle": "No author is their own best reviewer",        "origin": "Peer review, red teams, checks and balances",     "governs": "P2-3" },
  { "id": "EP-17", "principle": "Capabilities proportional to risk",           "origin": "Least privilege, need-to-know",                   "governs": "P2-4" },
  { "id": "EP-18", "principle": "Entropy requires scheduled countering",       "origin": "Second law of thermodynamics",                    "governs": "P3-1, P3-3" },
  { "id": "EP-19", "principle": "Documentation must live with the code",       "origin": "Configuration management, as-built records",      "governs": "P3-2, P3-4" }
]
```

### Cross-Cutting Influences

Each feature maps to exactly one primary principle above. Some principles exert secondary influence on features governed by a different primary principle. These cross-cutting relationships are engineering concerns that span feature boundaries but do not define the feature's chain:

```json
[
  { "feature": "P0-2 Filesystem, Git & File Locking", "primary_ep": "EP-2 Persistence",         "secondary_influence": "EP-1 Isolation",         "how": "File locking uses isolation to prevent concurrent write contamination" },
  { "feature": "P0-5 Orchestration Logic",            "primary_ep": "EP-5 Bounded coordination", "secondary_influence": "EP-16 Independent review", "how": "Generator/evaluator role separation within orchestration topology" },
  { "feature": "P1-5 Observability / Dashboards",     "primary_ep": "EP-8 Measure to improve",   "secondary_influence": "EP-13 Current signals",   "how": "Dashboard freshness requires current signals, not stale snapshots" },
  { "feature": "P1-10 Requirements Ledger",           "primary_ep": "EP-11 Repo truth",          "secondary_influence": "EP-14 Clarity first",     "how": "Ledger entries require clarity before being actioned" },
  { "feature": "P2-3 AI Auditors",                    "primary_ep": "EP-16 Independent review",  "secondary_influence": "EP-3 Verify",              "how": "Auditor review is a form of verification by a different agent" },
  { "feature": "P3-3 Pattern Auditing",               "primary_ep": "EP-18 Entropy countering",  "secondary_influence": "EP-3 Verify",              "how": "Pattern compliance checks are verification against canonical patterns" }
]
```

---

## Principle-to-Practice Chains

### Foundation: Infrastructure (Execute)

#### P0-1. Bash Sandboxes

```json
{
  "L1_principle": "EP-1: Isolation prevents contamination",
  "L2_targeted_enhancement": "Zero cross-contamination between agent execution environments",
  "L3_design_decisions": "Isolated containers/VMs per agent session; pre-installed language runtimes, test runners, CLI tools; visual monitoring of sandbox state",
  "L4_actions_tools": "Provision sandboxes → install runtimes → enable visual monitoring → auto-scale pools · See HE Actions Tools.md P0-1",
  "L5_measurement": "0 environment collision incidents per sprint · 0 cross-agent state leaks · Agent can install/execute arbitrary packages without affecting peers"
}
```

---

#### P0-2. Filesystem, Git & File Locking

```json
{
  "L1_principle": "EP-2: State must outlive the session",
  "L2_targeted_enhancement": "All agent-generated state is durable, versioned, and conflict-free",
  "L3_design_decisions": "Git-tracked workspaces; per-agent branching (worktrees/feature branches); explicit file locking and task claiming; throughput-first merge philosophy",
  "L4_actions_tools": "Initialize Git workspace → implement branching strategy → add file locking → build rollback automation → conflict resolution agents · See HE Actions Tools.md P0-2",
  "L5_measurement": "0 state-loss incidents per sprint · 0 concurrent-edit conflicts reaching main · Rollback time < 1 minute · PR lifecycle < 4 hours for agent PRs"
}
```

---

#### P0-3. Verification (Self & Collective)

```json
{
  "L1_principle": "EP-3: Verify before declaring completion",
  "L2_targeted_enhancement": "Agents autonomously detect and correct errors before human review",
  "L3_design_decisions": "Test suite wired into task completion flow; error logs piped back into agent context; pre-completion checklists; consensus voting for MAS",
  "L4_actions_tools": "Wire test execution → pipe error logs → add completion checklists → upgrade to collective verification · See HE Actions Tools.md P0-3",
  "L5_measurement": "Agent self-fix rate > 80% · Human-required review rate < 20% of tasks · 0 broken code reaching main without test execution"
}
```

---

#### P0-4. Ralph Loops

```json
{
  "L1_principle": "EP-4: Committed tasks must be completed",
  "L2_targeted_enhancement": "100% task completion rate regardless of context window exhaustion",
  "L3_design_decisions": "Exit interception hooks; prompt reinjection with state summary; loop budgets to prevent infinite retries; integration with Planning for cross-window persistence",
  "L4_actions_tools": "Implement exit interception → build prompt reinjection → add loop budgets → track loop metrics · See HE Actions Tools.md P0-4",
  "L5_measurement": "Premature exit rate → 0% · Long-horizon task completion rate > 95% · Average reinjections per completion < 3"
}
```

---

#### P0-5. Orchestration Logic

```json
{
  "L1_principle": "EP-5: Coordination cost must stay bounded",
  "L2_targeted_enhancement": "Agent coordination overhead stays sublinear relative to team size",
  "L3_design_decisions": "Topology selection (Supervisor, Hierarchical, P2P, Blackboard, Swarm); context-preserving handoffs; generator/evaluator role separation; 4–6 specialized starting roles",
  "L4_actions_tools": "Implement supervisor pattern → add topology selection → build handoff protocols → support dynamic switching · See HE Actions Tools.md P0-5",
  "L5_measurement": "Task throughput scales > 70% linearly with added agents · Coordination token overhead < 30% · 0 supervisor bottleneck incidents"
}
```

---

#### P0-6. Rippable Middleware

```json
{
  "L1_principle": "EP-6: Scaffolding is temporary by design",
  "L2_targeted_enhancement": "Any harness layer can be removed without breaking the rest",
  "L3_design_decisions": "Composable, independently removable middleware layers; feature flags for toggle; regular relevance audits against model capabilities",
  "L4_actions_tools": "Refactor to composable layers → add feature flags → audit relevance → build A/B testing · See HE Actions Tools.md P0-6",
  "L5_measurement": "Each middleware component independently toggleable · Removal of any single layer causes 0 cascade failures · Middleware count decreases as model capabilities increase"
}
```

---

#### P0-7. Escalation Policies & Audit Trails

```json
{
  "L1_principle": "EP-7: Every action must be traceable",
  "L2_targeted_enhancement": "Every agent action is attributable; stuck agents are detected and escalated within defined time bounds",
  "L3_design_decisions": "Escalation triggers (N failures, time limits, loop detection); tiered escalation chains (retry → different agent → human); strict audit logs",
  "L4_actions_tools": "Define triggers → route stuck tasks → implement tiered escalation → add escalation analytics · See HE Actions Tools.md P0-7",
  "L5_measurement": "Time-to-escalation < N minutes (configurable) · 100% of actions audit-logged · 0 unattributed actions in the system"
}
```

---

#### P0-8. Harness Versioning

```json
{
  "L1_principle": "EP-8: You cannot improve what you do not measure",
  "L2_targeted_enhancement": "Harness configurations are reproducible and comparable with data",
  "L3_design_decisions": "VCS-tracked harness configuration; per-version agent performance metrics; A/B testing infrastructure; reusable template library of harness blueprints",
  "L4_actions_tools": "Version-control configs → track performance per version → build A/B pipeline → maintain template library · See HE Actions Tools.md P0-8",
  "L5_measurement": "100% of harness changes version-controlled · A/B comparison data available per config change · Regression detection time < 1 sprint"
}
```

---

#### P0-9. Smart Command Wrappers

```json
{
  "L1_principle": "EP-9: Standard operations reduce variance",
  "L2_targeted_enhancement": "Zero variance in common CLI workflow execution",
  "L3_design_decisions": "Intelligent multi-step wrappers (ccp, ccpr, reconcile); shift-left cost stratification (smoke < check < audit < LLM review); stable command names across versions",
  "L4_actions_tools": "Install baseline wrappers → integrate agent reasoning → stratify by cost tier → validate wrapper usage · See HE Actions Tools.md P0-9",
  "L5_measurement": "Wrapper usage rate > 95% · Raw CLI usage for wrapped operations → 0 · Commit metadata consistency = 100%"
}
```

---

#### P0-10. Inter-Agent Communication (The Mailbox)

```json
{
  "L1_principle": "EP-5: Coordination cost must stay bounded",
  "L2_targeted_enhancement": "Agents can coordinate without supervisor bottleneck, with bounded message overhead",
  "L3_design_decisions": "Shared message queue/mailbox; defined message schema (sender, receiver, type, payload, timestamp); P2P, broadcast, idle notification strategies",
  "L4_actions_tools": "Implement message queue → define schema → add P2P/broadcast → add delivery guarantees → adaptive routing · See HE Actions Tools.md P0-10",
  "L5_measurement": "P2P message delivery latency < N seconds · 0 lost messages · Broadcast fan-out complete within 1 cycle"
}
```

---

#### P0-11. Portable Agent Surface

```json
{
  "L1_principle": "EP-10: Portability over proprietary convenience",
  "L2_targeted_enhancement": "Agent instructions are discoverable and functional from any IDE",
  "L3_design_decisions": "Single AGENTS.md as canonical surface; IDE-specific files as thin shims; bootstrap recipe (AGENTS.md → subfolder AGENTS.md → first linter → first structural test → initial roles)",
  "L4_actions_tools": "Create AGENTS.md → refactor IDE files to shims → add CI lint check → auto-generate shims · See HE Actions Tools.md P0-11",
  "L5_measurement": "0 IDE-specific-only rules · All rules accessible from ≥ 3 IDE environments · IDE switch requires 0 manual rule recreation"
}
```

---

### Pillar 1: Context Engineering (Inform)

#### P1-1. Repository as Truth

```json
{
  "L1_principle": "EP-11: If it's not in the repo, it doesn't exist",
  "L2_targeted_enhancement": "Agent context accuracy without human briefing",
  "L3_design_decisions": "Failure Ledger (every rule traces to an incident); Forbidden Operations section; Tool Declaration; agent legibility optimization; expertise extraction (human corrections → harness artifacts)",
  "L4_actions_tools": "Create AGENTS.md → migrate external knowledge → add Failure Ledger → add Tool Declaration → optimize legibility → implement expertise extraction · See HE Actions Tools.md P1-1",
  "L5_measurement": "New agent onboarding requires 0 human conversations · Hallucination rate on project conventions → 0 · Agent Legibility Score ≥ 3.0"
}
```

---

#### P1-2. Context Compaction & Memory Management

```json
{
  "L1_principle": "EP-12: Finite attention demands active management",
  "L2_targeted_enhancement": "Sustained reasoning quality across long tasks",
  "L3_design_decisions": "Conversation history summarization; short-term/long-term memory separation; token budgets per context section; adaptive compaction",
  "L4_actions_tools": "Implement summarization → separate memory tiers → set token budgets → adaptive compaction · See HE Actions Tools.md P1-2",
  "L5_measurement": "Output quality at token 100K ≈ quality at token 10K (< 10% degradation) · Context utilization efficiency > 70%"
}
```

---

#### P1-3. Tool Offloading

```json
{
  "L1_principle": "EP-12: Finite attention demands active management",
  "L2_targeted_enhancement": "Tool outputs never dominate the context window",
  "L3_design_decisions": "Head/tail token stripping; full results to filesystem; on-demand retrieval; per-tool token limits",
  "L4_actions_tools": "Strip tool outputs → store full results → make retrievable → set per-tool limits → intelligent summarization · See HE Actions Tools.md P1-3",
  "L5_measurement": "Tool output context consumption < 15% of window · Full outputs retrievable on-demand · 0 data loss from offloading"
}
```

---

#### P1-4. Progressive Skills

```json
{
  "L1_principle": "EP-12: Finite attention demands active management",
  "L2_targeted_enhancement": "Only task-relevant capabilities are in context at any time",
  "L3_design_decisions": "Role-based skill modules; task-time skill loading; skill routing by orchestrator; skill performance tracking",
  "L4_actions_tools": "Organize skills into modules → load at assignment → implement skill routing → track performance · See HE Actions Tools.md P1-4",
  "L5_measurement": "Startup skill load = task-relevant set only · Skill-selection accuracy > 90% · Irrelevant tool usage → 0"
}
```

---

#### P1-5. Observability / Dashboards

```json
{
  "L1_principle": "EP-8: You cannot improve what you do not measure",
  "L2_targeted_enhancement": "Agents and humans have real-time visibility into system behavior and health",
  "L3_design_decisions": "CI/CD status exposure to agents; harness structural integrity as signal category; task-ID artifact storage; dedicated OBSERVABILITY.md spec",
  "L4_actions_tools": "Expose CI/CD status → build dashboards → add traces → implement agent performance metrics → anomaly detection · See HE Actions Tools.md P1-5",
  "L5_measurement": "Dashboard freshness < 5 minutes · Harness structural integrity signals 100% automated · Agent task artifact retention = 100%"
}
```

---

#### P1-6. Web Search & MCP Integration

```json
{
  "L1_principle": "EP-13: Current signals outperform stale snapshots",
  "L2_targeted_enhancement": "Agent answers reflect current state of the world, not stale training data",
  "L3_design_decisions": "Web search tool integration; MCP server connections for domain-specific context; caching layer; relevance filtering",
  "L4_actions_tools": "Integrate web search → connect MCP servers → add caching → build relevance filtering · See HE Actions Tools.md P1-6",
  "L5_measurement": "Outdated-answer rate → 0 for rapidly evolving domains · External lookup cache hit rate > 60%"
}
```

---

#### P1-7. Planning, Task Lists & Blackboards

```json
{
  "L1_principle": "EP-2: State must outlive the session",
  "L2_targeted_enhancement": "Complex tasks survive context resets and are decomposed before execution",
  "L3_design_decisions": "Filesystem-based plan files; plan reminder injection; structured format (goal, scope, status, steps, constraints, checkpoints); shared blackboards for MAS; completed plans archived inline",
  "L4_actions_tools": "Store plans as files → inject reminders → evolve to shared task lists → add blackboard architecture → plan quality scoring · See HE Actions Tools.md P1-7",
  "L5_measurement": "Plan file exists for 100% of multi-step tasks · Post-reset task resumption success rate > 90% · Rework rate due to lost context < 10%"
}
```

---

#### P1-8. Context Anchoring

```json
{
  "L1_principle": "EP-2: State must outlive the session",
  "L2_targeted_enhancement": "Strategic goals and critical decisions persist across all context window resets",
  "L3_design_decisions": "Structured anchor records (what, why, target, background); persistent anchor files (ANCHORS.md); recall hooks at session start; shared anchors for MAS",
  "L4_actions_tools": "Create anchor files → write structured records → build recall hooks → shared anchor files → anchor quality metrics · See HE Actions Tools.md P1-8",
  "L5_measurement": "Anchor recall at session start = 100% · Strategic drift incidents → 0 · Decision re-exploration rate → 0"
}
```

---

#### P1-9. Branch-Based Cognitive Memory

```json
{
  "L1_principle": "EP-2: State must outlive the session",
  "L2_targeted_enhancement": "Complex objectives decompose into checkpointed sub-tasks with cognitive history",
  "L3_design_decisions": "Sub-task branches with structured merges; commit messages as 'approval of evidence'; Git worktrees for concurrency; commit history as contextual memory",
  "L4_actions_tools": "Spawn branches for sub-tasks → enforce structured commit messages → introduce branch coordination → use commit history as RAG memory · See HE Actions Tools.md P1-9",
  "L5_measurement": "Branch-based decomposition for 100% of complex tasks · Merge conflict rate < 5% · Commit messages contain structured evidence"
}
```

---

#### P1-10. Requirements Ledger

```json
{
  "L1_principle": "EP-11: If it's not in the repo, it doesn't exist",
  "L2_targeted_enhancement": "All requirements formally recorded before any planning or execution",
  "L3_design_decisions": "Canonical REQUIREMENTS.md with structured entries (ID, title, narrative, acceptance criteria, status, source); pre-planning validation hooks; shared ledger with file locking for MAS",
  "L4_actions_tools": "Create canonical file → record every requirement → add pre-planning validation → shared ledger with locking → automated deduplication · See HE Actions Tools.md P1-10",
  "L5_measurement": "0 unrecorded requirements reaching planning phase · Ledger entry exists for 100% of implemented features · Scope creep rate < 10%"
}
```

---

#### P1-11. Socratic Questioning

```json
{
  "L1_principle": "EP-14: Clarity before commitment",
  "L2_targeted_enhancement": "Zero ambiguous inputs reaching the execution phase",
  "L3_design_decisions": "6 Socratic question categories (Clarification, Assumptions, Evidence, Viewpoints, Implications, Meta-questions); ambiguity scoring heuristics; clarifications recorded to ledger/anchors; parallel interrogator agents for MAS",
  "L4_actions_tools": "Define mandatory ambiguity check → apply 6 question categories → inject interrogation templates → record clarifications → distribute to MAS interrogators · See HE Actions Tools.md P1-11",
  "L5_measurement": "Pre-execution clarification pass rate = 100% for ambiguous inputs · Post-execution 'I assumed you meant…' rework → 0"
}
```

---

#### P1-12. Skill Engineering

```json
{
  "L1_principle": "EP-12: Finite attention demands active management",
  "L2_targeted_enhancement": "Agent skills are modular, context-efficient, and tunable",
  "L3_design_decisions": "Mandatory-read budget per skill file (<200 lines); routing-hub pattern in skill orchestrator; monolith→module splits isolating framework layers; decision-tree routing; template extraction; subagent dispatch prompts; terminology standardization",
  "L4_actions_tools": "Split monolithic skill refs → modular files · Add decision-tree routing hub · Enforce <200 line budget · Extract reusable output templates · Pre-build subagent dispatch prompts · Standardize terminology across skill files · See HE Actions Tools.md P1-12",
  "L5_measurement": "Mandatory read per action path reduced 40-60% · All skill reference files <200 lines · Time-to-first-action measurably improved"
}
```

---

### Pillar 2: Architectural Constraints (Constrain)

#### P2-1. Automated Linters

```json
{
  "L1_principle": "EP-15: Mechanical enforcement over advisory guidance",
  "L2_targeted_enhancement": "Zero style/type/structural violations reaching the main branch",
  "L3_design_decisions": "Deterministic pre-commit hooks; CI-wired enforcement (hooks alone insufficient); teaching messages ('↳ Fix:') on every error; structural existence checks; guide/sensor parity audits",
  "L4_actions_tools": "Add pre-commit hooks → wire into CI → add teaching messages → custom project rules → track violation frequency · See HE Actions Tools.md P2-1",
  "L5_measurement": "Main branch violation rate = 0 · Agent self-correction on first lint failure > 80% · Linter teaching-message coverage = 100% · Guide/sensor parity = 100%"
}
```

---

#### P2-2. Dependency Enforcement

```json
{
  "L1_principle": "EP-15: Mechanical enforcement over advisory guidance",
  "L2_targeted_enhancement": "Architectural boundaries mechanically enforced, not just documented",
  "L3_design_decisions": "Structural tests restricting imports; document-layer hierarchy (framework/ → research/); content-flow directionality enforcement; pillar label and terminology validation",
  "L4_actions_tools": "Define layer boundaries → implement structural tests → add import restrictions → auto-generate dependency graphs · See HE Actions Tools.md P2-2",
  "L5_measurement": "0 cross-boundary imports reaching main · Structural test CI failure rate < 5% (agents learn) · Document-layer violations = 0"
}
```

---

#### P2-3. AI Auditors & Collaboration Channels

```json
{
  "L1_principle": "EP-16: No author is their own best reviewer",
  "L2_targeted_enhancement": "Every substantial output is independently reviewed before merging",
  "L3_design_decisions": "Secondary LLM-based review agents; Cooperation (assembly line), Competition (adversarial debate), Coopetition (negotiate and compromise) channels; active anchoring bias prevention",
  "L4_actions_tools": "Deploy secondary reviewer → implement cooperative review → add competitive channels → implement coopetition → track auditor agreement rates · See HE Actions Tools.md P2-3",
  "L5_measurement": "0 unreviewed merges for non-trivial changes · Anchoring bias incidents → 0 · Auditor disagreement → improvement rate > 50%"
}
```

---

#### P2-4. Bounded Autonomy & Access Control

```json
{
  "L1_principle": "EP-17: Capabilities proportional to risk",
  "L2_targeted_enhancement": "Agent capabilities are proportional to task risk at all times",
  "L3_design_decisions": "Explicit scope boundaries; real-time guardrails; risk-based progressive disclosure; solution-space constraining (templates, allowed-pattern lists, architectural scaffolding)",
  "L4_actions_tools": "Require human approval for critical actions → implement API sandboxing → enforce progressive autonomy → intelligent anomaly detection · See HE Actions Tools.md P2-4",
  "L5_measurement": "0 unauthorized high-risk actions · Human-in-the-loop for 100% of defined critical actions · 0 data exfiltration incidents"
}
```

---

#### P2-5. Upstream Intake Gate

```json
{
  "L1_principle": "EP-14: Clarity before commitment",
  "L2_targeted_enhancement": "No planning or execution proceeds on unrecorded requirements",
  "L3_design_decisions": "Mandatory ledger-check step in all planning workflows; mid-task requirement sync-back; pre-commit hooks or workflow gates rejecting plans without ledger entries",
  "L4_actions_tools": "Add ledger-check step → require mid-task sync → implement workflow gates → build distributed intake validation for MAS · See HE Actions Tools.md P2-5",
  "L5_measurement": "Gate rejection rate for unrecorded requirements = 100% · Mid-task requirement sync-back compliance = 100%"
}
```

---

### Pillar 3: Entropy Management (Maintain)

#### P3-1. Scheduled Cleanups

```json
{
  "L1_principle": "EP-18: Entropy requires scheduled countering",
  "L2_targeted_enhancement": "Entropy never accumulates beyond one GC cycle",
  "L3_design_decisions": "CI cron trigger (manually-invoked does not qualify); discrete reports per GC category; event-triggered cleanups; local audit.sh for on-demand checks; conflict reconciliation agents for MAS",
  "L4_actions_tools": "Schedule weekly sweeps → add event-triggered cleanups → implement conflict reconciliation → build entropy metrics dashboard · See HE Actions Tools.md P3-1",
  "L5_measurement": "Dead code / stale docs age ≤ 7 days · Cleanup cadence = weekly minimum · 0 constraint violations persisting > 1 GC cycle"
}
```

---

#### P3-2. Documentation Sync

```json
{
  "L1_principle": "EP-19: Documentation must live with the code",
  "L2_targeted_enhancement": "Documentation always matches the current state of the code",
  "L3_design_decisions": "CI checks flagging stale docs; documentation consistency agents; doc updates as part of task completion criteria; auto-generated documentation with human review",
  "L4_actions_tools": "Add CI staleness checks → deploy consistency agents → require doc updates at task completion → implement auto-generation · See HE Actions Tools.md P3-2",
  "L5_measurement": "Docs-code divergence detection time < 24 hours · 0 stale docs persisting > 1 sprint · Automated sync coverage = 100% of critical docs"
}
```

---

#### P3-3. Pattern Auditing

```json
{
  "L1_principle": "EP-18: Entropy requires scheduled countering",
  "L2_targeted_enhancement": "Coding patterns converge to canonical forms; no circular dependencies or dead code persists",
  "L3_design_decisions": "Dependency analysis tools; canonical pattern registry; deviation detection; pattern enforcement agents",
  "L4_actions_tools": "Run dependency analysis → define canonical patterns → detect deviations → deploy enforcement agents · See HE Actions Tools.md P3-3",
  "L5_measurement": "Circular dependency count → 0 · Dead code percentage < 2% · Pattern divergence across modules < 5%"
}
```

---

#### P3-4. Consolidation Loop

```json
{
  "L1_principle": "EP-19: Documentation must live with the code",
  "L2_targeted_enhancement": "Core system documentation automatically stays in sync with codebase state",
  "L3_design_decisions": "Automated system count updates; changelog accumulation pipeline; ADR prompts on new patterns; config drift detection",
  "L4_actions_tools": "Automate count updates → build changelog pipeline → auto-prompt for ADRs → implement drift detection · See HE Actions Tools.md P3-4",
  "L5_measurement": "System count accuracy = 100% · Changelog lag < 1 merge · ADR prompt rate = 100% for new architectural patterns"
}
```

---

## Cross-Cutting Chain Perspectives

Some framework elements span multiple chain levels or operate across all 32 features. Their chain position is "lateral" rather than "vertical."

### Prevention Checklist — Broken Chain Detector

Each Prevention Checklist item is a **chain break alarm** — it fires when a specific chain level fails for a specific feature. Prevention items classify by the chain level they protect:

```json
[
  { "chain_level_broken": "L1 violated (Principle ignored)",  "prevention_type": "Principle Violations", "examples": "Prevent Cascading Hallucinations (EP-3 violated) · Prevent Over-Engineering (EP-6 violated)" },
  { "chain_level_broken": "L2 abandoned (Outcome drifted)",   "prevention_type": "Outcome Drift",        "examples": "Prevent Context Rot (drifted from 'sustained reasoning quality') · Prevent Vanity Metrics (drifted from 'real quality outcomes')" },
  { "chain_level_broken": "L3 wrong (Bad design choice)",     "prevention_type": "Design Failures",      "examples": "Prevent Quadratic Coordination Overhead (wrong topology) · Prevent Supervisor Bottlenecks (wrong pattern)" },
  { "chain_level_broken": "L4 skipped (Action omitted)",      "prevention_type": "Action Omissions",     "examples": "Prevent IDE-Locked Rules (missing AGENTS.md) · Prevent Human-Only Documentation (migration not done)" }
]
```

### DO NOT Rules — L4 Constraints with L1 Backlinks

Each `AGENTS.md` DO NOT rule is an **L4 negative action** (what not to do). Each should backlink to the L1 Principle it protects. See the main plan for the specific DO NOT → EP mapping.

### Reward Engineering — Cross-Chain Anti-Gaming

Reward Engineering is not a feature but a **chain integrity concern** — it detects when agents game any chain level:

```json
[
  { "chain_level_gamed": "L3 gamed", "anti_gaming_pattern": "Agent weakens test assertions to pass (gaming the verification design)" },
  { "chain_level_gamed": "L4 gamed", "anti_gaming_pattern": "Agent optimizes vanity metrics (gaming the action criteria)" },
  { "chain_level_gamed": "L5 gamed", "anti_gaming_pattern": "Agent inflates measurable outputs without real improvement (gaming the measurement)" }
]
```

### Token Economics — Chain Cost Profile

Every feature either **saves tokens** (compresses the chain path) or **spends tokens** (extends it). This is a resource allocation concern across all chains, not a chain level itself.

### SAS→MAS Readiness — Chain Scaling Dimension

Each feature's chain can scale from single-agent to multi-agent. This is a **width dimension** of the chain (how many agents traverse it in parallel), not a chain level.
