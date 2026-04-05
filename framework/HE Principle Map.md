# HE Principle Map

The canonical Principle-to-Practice Chain map for all 31 Harness Engineering core features. Each feature is anchored to an explicit Engineering Principle (L1) and threaded through the full 5-level chain defined in `HE Chain.md`.

**Chain Levels:**

| Level | Name | Role |
| ----- | ---- | ---- |
| L1 | Engineering Principle | Timeless, first-principles rule — the *why* |
| L2 | Targeted Enhancement | Measurable improvement sought — the *what* |
| L3 | Design Decisions / Patterns | Architecture and strategy choices — the *how (design)* |
| L4 | Concrete Actions / Configurations | Executable steps, scripts, configs — the *how (build)* |
| L5 | Concrete Enhancement | Observable result implementors measure — the *proof* |

**Related Documents:**

- L1 principles: defined here (§ Engineering Principles Catalog)
- L3 design patterns: `HE Core Features.md` (feature definitions)
- L4 actions & tools: `HE Enhancement Options.md`
- L4 negative (what NOT to do): `HE Prevention Checklist.md`, `AGENTS.md` § DO NOT
- L5 inverse (gap signals): `HE Gap Evaluation Framework.md`

---

## Engineering Principles Catalog

19 Engineering Principles derived from first-principles engineering wisdom. Each is timeless, general, and distinctly different from every other.

| ID | Principle | Origin | Governs |
| -- | --------- | ------ | ------- |
| EP-1 | **Isolation prevents contamination** | Thermodynamics, clean-room engineering | P0-1 |
| EP-2 | **State must outlive the session** | ACID durability, persistence theory | P0-2, P1-7, P1-8, P1-9 |
| EP-3 | **Verify before declaring completion** | Quality assurance, test-before-ship | P0-3 |
| EP-4 | **Committed tasks must be completed** | Project management, definition of done | P0-4 |
| EP-5 | **Coordination cost must stay bounded** | Amdahl's Law, Brooks' Law | P0-5, P0-10 |
| EP-6 | **Scaffolding is temporary by design** | Construction engineering | P0-6 |
| EP-7 | **Every action must be traceable** | Chain of custody, audit provenance | P0-7 |
| EP-8 | **You cannot improve what you do not measure** | Deming, statistical process control | P0-8, P1-5 |
| EP-9 | **Standard operations reduce variance** | Manufacturing SOPs, jigs and fixtures | P0-9 |
| EP-10 | **Portability over proprietary convenience** | Interchangeable parts, open standards | P0-11 |
| EP-11 | **If it's not in the repo, it doesn't exist** | Single source of truth, DRY | P1-1, P1-10 |
| EP-12 | **Finite attention demands active management** | Theory of Constraints, bottleneck theory | P1-2, P1-3, P1-4 |
| EP-13 | **Current signals outperform stale snapshots** | Control theory, feedback loops | P1-6 |
| EP-14 | **Clarity before commitment** | Requirements engineering, measure twice | P1-11, P2-5 |
| EP-15 | **Mechanical enforcement over advisory guidance** | Poka-yoke, fool-proofing | P2-1, P2-2 |
| EP-16 | **No author is their own best reviewer** | Peer review, red teams, checks and balances | P2-3 |
| EP-17 | **Capabilities proportional to risk** | Least privilege, need-to-know | P2-4 |
| EP-18 | **Entropy requires scheduled countering** | Second law of thermodynamics | P3-1, P3-3 |
| EP-19 | **Documentation must live with the code** | Configuration management, as-built records | P3-2, P3-4 |

### Cross-Cutting Influences

Each feature maps to exactly one primary principle above. Some principles exert secondary influence on features governed by a different primary principle. These cross-cutting relationships are engineering concerns that span feature boundaries but do not define the feature's chain:

| Feature | Primary EP | Secondary Influence | How |
| ------- | ---------- | ------------------- | --- |
| P0-2 Filesystem, Git & File Locking | EP-2 Persistence | EP-1 Isolation | File locking uses isolation to prevent concurrent write contamination |
| P0-5 Orchestration Logic | EP-5 Bounded coordination | EP-16 Independent review | Generator/evaluator role separation within orchestration topology |
| P1-5 Observability / Dashboards | EP-8 Measure to improve | EP-13 Current signals | Dashboard freshness requires current signals, not stale snapshots |
| P1-10 Requirements Ledger | EP-11 Repo truth | EP-14 Clarity first | Ledger entries require clarity before being actioned |
| P2-3 AI Auditors | EP-16 Independent review | EP-3 Verify | Auditor review is a form of verification by a different agent |
| P3-3 Pattern Auditing | EP-18 Entropy countering | EP-3 Verify | Pattern compliance checks are verification against canonical patterns |

---

## Principle-to-Practice Chains

### Foundation: Infrastructure (Execute)

#### P0-1. Bash Sandboxes

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-1: Isolation prevents contamination |
| **L2 Targeted Enhancement** | Zero cross-contamination between agent execution environments |
| **L3 Design Decisions** | Isolated containers/VMs per agent session; pre-installed language runtimes, test runners, CLI tools; visual monitoring of sandbox state |
| **L4 Actions & Tools** | Provision sandboxes → install runtimes → enable visual monitoring → auto-scale pools · See `HE Enhancement Options.md` P0-1 |
| **L5 What Implementors Measure** | 0 environment collision incidents per sprint · 0 cross-agent state leaks · Agent can install/execute arbitrary packages without affecting peers |

---

#### P0-2. Filesystem, Git & File Locking

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-2: State must outlive the session |
| **L2 Targeted Enhancement** | All agent-generated state is durable, versioned, and conflict-free |
| **L3 Design Decisions** | Git-tracked workspaces; per-agent branching (worktrees/feature branches); explicit file locking and task claiming; throughput-first merge philosophy |
| **L4 Actions & Tools** | Initialize Git workspace → implement branching strategy → add file locking → build rollback automation → conflict resolution agents · See `HE Enhancement Options.md` P0-2 |
| **L5 What Implementors Measure** | 0 state-loss incidents per sprint · 0 concurrent-edit conflicts reaching main · Rollback time < 1 minute · PR lifecycle < 4 hours for agent PRs |

---

#### P0-3. Verification (Self & Collective)

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-3: Verify before declaring completion |
| **L2 Targeted Enhancement** | Agents autonomously detect and correct errors before human review |
| **L3 Design Decisions** | Test suite wired into task completion flow; error logs piped back into agent context; pre-completion checklists; consensus voting for MAS |
| **L4 Actions & Tools** | Wire test execution → pipe error logs → add completion checklists → upgrade to collective verification · See `HE Enhancement Options.md` P0-3 |
| **L5 What Implementors Measure** | Agent self-fix rate > 80% · Human-required review rate < 20% of tasks · 0 broken code reaching main without test execution |

---

#### P0-4. Ralph Loops

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-4: Committed tasks must be completed |
| **L2 Targeted Enhancement** | 100% task completion rate regardless of context window exhaustion |
| **L3 Design Decisions** | Exit interception hooks; prompt reinjection with state summary; loop budgets to prevent infinite retries; integration with Planning for cross-window persistence |
| **L4 Actions & Tools** | Implement exit interception → build prompt reinjection → add loop budgets → track loop metrics · See `HE Enhancement Options.md` P0-4 |
| **L5 What Implementors Measure** | Premature exit rate → 0% · Long-horizon task completion rate > 95% · Average reinjections per completion < 3 |

---

#### P0-5. Orchestration Logic

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-5: Coordination cost must stay bounded |
| **L2 Targeted Enhancement** | Agent coordination overhead stays sublinear relative to team size |
| **L3 Design Decisions** | Topology selection (Supervisor, Hierarchical, P2P, Blackboard, Swarm); context-preserving handoffs; generator/evaluator role separation; 4–6 specialized starting roles |
| **L4 Actions & Tools** | Implement supervisor pattern → add topology selection → build handoff protocols → support dynamic switching · See `HE Enhancement Options.md` P0-5 |
| **L5 What Implementors Measure** | Task throughput scales > 70% linearly with added agents · Coordination token overhead < 30% · 0 supervisor bottleneck incidents |

---

#### P0-6. Rippable Middleware

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-6: Scaffolding is temporary by design |
| **L2 Targeted Enhancement** | Any harness layer can be removed without breaking the rest |
| **L3 Design Decisions** | Composable, independently removable middleware layers; feature flags for toggle; regular relevance audits against model capabilities |
| **L4 Actions & Tools** | Refactor to composable layers → add feature flags → audit relevance → build A/B testing · See `HE Enhancement Options.md` P0-6 |
| **L5 What Implementors Measure** | Each middleware component independently toggleable · Removal of any single layer causes 0 cascade failures · Middleware count decreases as model capabilities increase |

---

#### P0-7. Escalation Policies & Audit Trails

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-7: Every action must be traceable |
| **L2 Targeted Enhancement** | Every agent action is attributable; stuck agents are detected and escalated within defined time bounds |
| **L3 Design Decisions** | Escalation triggers (N failures, time limits, loop detection); tiered escalation chains (retry → different agent → human); strict audit logs |
| **L4 Actions & Tools** | Define triggers → route stuck tasks → implement tiered escalation → add escalation analytics · See `HE Enhancement Options.md` P0-7 |
| **L5 What Implementors Measure** | Time-to-escalation < N minutes (configurable) · 100% of actions audit-logged · 0 unattributed actions in the system |

---

#### P0-8. Harness Versioning

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-8: You cannot improve what you do not measure |
| **L2 Targeted Enhancement** | Harness configurations are reproducible and comparable with data |
| **L3 Design Decisions** | VCS-tracked harness configuration; per-version agent performance metrics; A/B testing infrastructure; reusable template library of harness blueprints |
| **L4 Actions & Tools** | Version-control configs → track performance per version → build A/B pipeline → maintain template library · See `HE Enhancement Options.md` P0-8 |
| **L5 What Implementors Measure** | 100% of harness changes version-controlled · A/B comparison data available per config change · Regression detection time < 1 sprint |

---

#### P0-9. Smart Command Wrappers

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-9: Standard operations reduce variance |
| **L2 Targeted Enhancement** | Zero variance in common CLI workflow execution |
| **L3 Design Decisions** | Intelligent multi-step wrappers (ccp, ccpr, reconcile); shift-left cost stratification (smoke < check < audit < LLM review); stable command names across versions |
| **L4 Actions & Tools** | Install baseline wrappers → integrate agent reasoning → stratify by cost tier → validate wrapper usage · See `HE Enhancement Options.md` P0-9 |
| **L5 What Implementors Measure** | Wrapper usage rate > 95% · Raw CLI usage for wrapped operations → 0 · Commit metadata consistency = 100% |

---

#### P0-10. Inter-Agent Communication (The Mailbox)

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-5: Coordination cost must stay bounded |
| **L2 Targeted Enhancement** | Agents can coordinate without supervisor bottleneck, with bounded message overhead |
| **L3 Design Decisions** | Shared message queue/mailbox; defined message schema (sender, receiver, type, payload, timestamp); P2P, broadcast, idle notification strategies |
| **L4 Actions & Tools** | Implement message queue → define schema → add P2P/broadcast → add delivery guarantees → adaptive routing · See `HE Enhancement Options.md` P0-10 |
| **L5 What Implementors Measure** | P2P message delivery latency < N seconds · 0 lost messages · Broadcast fan-out complete within 1 cycle |

---

#### P0-11. Portable Agent Surface

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-10: Portability over proprietary convenience |
| **L2 Targeted Enhancement** | Agent instructions are discoverable and functional from any IDE |
| **L3 Design Decisions** | Single `AGENTS.md` as canonical surface; IDE-specific files as thin shims; bootstrap recipe (AGENTS.md → subfolder AGENTS.md → first linter → first structural test → initial roles) |
| **L4 Actions & Tools** | Create AGENTS.md → refactor IDE files to shims → add CI lint check → auto-generate shims · See `HE Enhancement Options.md` P0-11 |
| **L5 What Implementors Measure** | 0 IDE-specific-only rules · All rules accessible from ≥ 3 IDE environments · IDE switch requires 0 manual rule recreation |

---

### Pillar 1: Context Engineering (Inform)

#### P1-1. Repository as Truth

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-11: If it's not in the repo, it doesn't exist |
| **L2 Targeted Enhancement** | Agent context accuracy without human briefing |
| **L3 Design Decisions** | Failure Ledger (every rule traces to an incident); Forbidden Operations section; Tool Declaration; agent legibility optimization; expertise extraction (human corrections → harness artifacts) |
| **L4 Actions & Tools** | Create AGENTS.md → migrate external knowledge → add Failure Ledger → add Tool Declaration → optimize legibility → implement expertise extraction · See `HE Enhancement Options.md` P1-1 |
| **L5 What Implementors Measure** | New agent onboarding requires 0 human conversations · Hallucination rate on project conventions → 0 · Agent Legibility Score ≥ 3.0 |

---

#### P1-2. Context Compaction & Memory Management

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-12: Finite attention demands active management |
| **L2 Targeted Enhancement** | Sustained reasoning quality across long tasks |
| **L3 Design Decisions** | Conversation history summarization; short-term/long-term memory separation; token budgets per context section; adaptive compaction |
| **L4 Actions & Tools** | Implement summarization → separate memory tiers → set token budgets → adaptive compaction · See `HE Enhancement Options.md` P1-2 |
| **L5 What Implementors Measure** | Output quality at token 100K ≈ quality at token 10K (< 10% degradation) · Context utilization efficiency > 70% |

---

#### P1-3. Tool Offloading

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-12: Finite attention demands active management |
| **L2 Targeted Enhancement** | Tool outputs never dominate the context window |
| **L3 Design Decisions** | Head/tail token stripping; full results to filesystem; on-demand retrieval; per-tool token limits |
| **L4 Actions & Tools** | Strip tool outputs → store full results → make retrievable → set per-tool limits → intelligent summarization · See `HE Enhancement Options.md` P1-3 |
| **L5 What Implementors Measure** | Tool output context consumption < 15% of window · Full outputs retrievable on-demand · 0 data loss from offloading |

---

#### P1-4. Progressive Skills

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-12: Finite attention demands active management |
| **L2 Targeted Enhancement** | Only task-relevant capabilities are in context at any time |
| **L3 Design Decisions** | Role-based skill modules; task-time skill loading; skill routing by orchestrator; skill performance tracking |
| **L4 Actions & Tools** | Organize skills into modules → load at assignment → implement skill routing → track performance · See `HE Enhancement Options.md` P1-4 |
| **L5 What Implementors Measure** | Startup skill load = task-relevant set only · Skill-selection accuracy > 90% · Irrelevant tool usage → 0 |

---

#### P1-5. Observability / Dashboards

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-8: You cannot improve what you do not measure |
| **L2 Targeted Enhancement** | Agents and humans have real-time visibility into system behavior and health |
| **L3 Design Decisions** | CI/CD status exposure to agents; harness structural integrity as signal category; task-ID artifact storage; dedicated `OBSERVABILITY.md` spec |
| **L4 Actions & Tools** | Expose CI/CD status → build dashboards → add traces → implement agent performance metrics → anomaly detection · See `HE Enhancement Options.md` P1-5 |
| **L5 What Implementors Measure** | Dashboard freshness < 5 minutes · Harness structural integrity signals 100% automated · Agent task artifact retention = 100% |

---

#### P1-6. Web Search & MCP Integration

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-13: Current signals outperform stale snapshots |
| **L2 Targeted Enhancement** | Agent answers reflect current state of the world, not stale training data |
| **L3 Design Decisions** | Web search tool integration; MCP server connections for domain-specific context; caching layer; relevance filtering |
| **L4 Actions & Tools** | Integrate web search → connect MCP servers → add caching → build relevance filtering · See `HE Enhancement Options.md` P1-6 |
| **L5 What Implementors Measure** | Outdated-answer rate → 0 for rapidly evolving domains · External lookup cache hit rate > 60% |

---

#### P1-7. Planning, Task Lists & Blackboards

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-2: State must outlive the session |
| **L2 Targeted Enhancement** | Complex tasks survive context resets and are decomposed before execution |
| **L3 Design Decisions** | Filesystem-based plan files; plan reminder injection; structured format (goal, scope, status, steps, constraints, checkpoints); shared blackboards for MAS; completed plans archived inline |
| **L4 Actions & Tools** | Store plans as files → inject reminders → evolve to shared task lists → add blackboard architecture → plan quality scoring · See `HE Enhancement Options.md` P1-7 |
| **L5 What Implementors Measure** | Plan file exists for 100% of multi-step tasks · Post-reset task resumption success rate > 90% · Rework rate due to lost context < 10% |

---

#### P1-8. Context Anchoring

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-2: State must outlive the session |
| **L2 Targeted Enhancement** | Strategic goals and critical decisions persist across all context window resets |
| **L3 Design Decisions** | Structured anchor records (what, why, target, background); persistent anchor files (ANCHORS.md); recall hooks at session start; shared anchors for MAS |
| **L4 Actions & Tools** | Create anchor files → write structured records → build recall hooks → shared anchor files → anchor quality metrics · See `HE Enhancement Options.md` P1-8 |
| **L5 What Implementors Measure** | Anchor recall at session start = 100% · Strategic drift incidents → 0 · Decision re-exploration rate → 0 |

---

#### P1-9. Branch-Based Cognitive Memory

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-2: State must outlive the session |
| **L2 Targeted Enhancement** | Complex objectives decompose into checkpointed sub-tasks with cognitive history |
| **L3 Design Decisions** | Sub-task branches with structured merges; commit messages as "approval of evidence"; Git worktrees for concurrency; commit history as contextual memory |
| **L4 Actions & Tools** | Spawn branches for sub-tasks → enforce structured commit messages → introduce branch coordination → use commit history as RAG memory · See `HE Enhancement Options.md` P1-9 |
| **L5 What Implementors Measure** | Branch-based decomposition for 100% of complex tasks · Merge conflict rate < 5% · Commit messages contain structured evidence |

---

#### P1-10. Requirements Ledger

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-11: If it's not in the repo, it doesn't exist |
| **L2 Targeted Enhancement** | All requirements formally recorded before any planning or execution |
| **L3 Design Decisions** | Canonical `REQUIREMENTS.md` with structured entries (ID, title, narrative, acceptance criteria, status, source); pre-planning validation hooks; shared ledger with file locking for MAS |
| **L4 Actions & Tools** | Create canonical file → record every requirement → add pre-planning validation → shared ledger with locking → automated deduplication · See `HE Enhancement Options.md` P1-10 |
| **L5 What Implementors Measure** | 0 unrecorded requirements reaching planning phase · Ledger entry exists for 100% of implemented features · Scope creep rate < 10% |

---

#### P1-11. Socratic Questioning

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-14: Clarity before commitment |
| **L2 Targeted Enhancement** | Zero ambiguous inputs reaching the execution phase |
| **L3 Design Decisions** | 6 Socratic question categories (Clarification, Assumptions, Evidence, Viewpoints, Implications, Meta-questions); ambiguity scoring heuristics; clarifications recorded to ledger/anchors; parallel interrogator agents for MAS |
| **L4 Actions & Tools** | Define mandatory ambiguity check → apply 6 question categories → inject interrogation templates → record clarifications → distribute to MAS interrogators · See `HE Enhancement Options.md` P1-11 |
| **L5 What Implementors Measure** | Pre-execution clarification pass rate = 100% for ambiguous inputs · Post-execution "I assumed you meant…" rework → 0 |

---

### Pillar 2: Architectural Constraints (Constrain)

#### P2-1. Automated Linters

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-15: Mechanical enforcement over advisory guidance |
| **L2 Targeted Enhancement** | Zero style/type/structural violations reaching the main branch |
| **L3 Design Decisions** | Deterministic pre-commit hooks; CI-wired enforcement (hooks alone insufficient); teaching messages (`↳ Fix:`) on every error; structural existence checks; guide/sensor parity audits |
| **L4 Actions & Tools** | Add pre-commit hooks → wire into CI → add teaching messages → custom project rules → track violation frequency · See `HE Enhancement Options.md` P2-1 |
| **L5 What Implementors Measure** | Main branch violation rate = 0 · Agent self-correction on first lint failure > 80% · Linter teaching-message coverage = 100% · Guide/sensor parity = 100% |

---

#### P2-2. Dependency Enforcement

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-15: Mechanical enforcement over advisory guidance |
| **L2 Targeted Enhancement** | Architectural boundaries mechanically enforced, not just documented |
| **L3 Design Decisions** | Structural tests restricting imports; document-layer hierarchy (framework/ → research/); content-flow directionality enforcement; pillar label and terminology validation |
| **L4 Actions & Tools** | Define layer boundaries → implement structural tests → add import restrictions → auto-generate dependency graphs · See `HE Enhancement Options.md` P2-2 |
| **L5 What Implementors Measure** | 0 cross-boundary imports reaching main · Structural test CI failure rate < 5% (agents learn) · Document-layer violations = 0 |

---

#### P2-3. AI Auditors & Collaboration Channels

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-16: No author is their own best reviewer |
| **L2 Targeted Enhancement** | Every substantial output is independently reviewed before merging |
| **L3 Design Decisions** | Secondary LLM-based review agents; Cooperation (assembly line), Competition (adversarial debate), Coopetition (negotiate and compromise) channels; active anchoring bias prevention |
| **L4 Actions & Tools** | Deploy secondary reviewer → implement cooperative review → add competitive channels → implement coopetition → track auditor agreement rates · See `HE Enhancement Options.md` P2-3 |
| **L5 What Implementors Measure** | 0 unreviewed merges for non-trivial changes · Anchoring bias incidents → 0 · Auditor disagreement → improvement rate > 50% |

---

#### P2-4. Bounded Autonomy & Access Control

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-17: Capabilities proportional to risk |
| **L2 Targeted Enhancement** | Agent capabilities are proportional to task risk at all times |
| **L3 Design Decisions** | Explicit scope boundaries; real-time guardrails; risk-based progressive disclosure; solution-space constraining (templates, allowed-pattern lists, architectural scaffolding) |
| **L4 Actions & Tools** | Require human approval for critical actions → implement API sandboxing → enforce progressive autonomy → intelligent anomaly detection · See `HE Enhancement Options.md` P2-4 |
| **L5 What Implementors Measure** | 0 unauthorized high-risk actions · Human-in-the-loop for 100% of defined critical actions · 0 data exfiltration incidents |

---

#### P2-5. Upstream Intake Gate

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-14: Clarity before commitment |
| **L2 Targeted Enhancement** | No planning or execution proceeds on unrecorded requirements |
| **L3 Design Decisions** | Mandatory ledger-check step in all planning workflows; mid-task requirement sync-back; pre-commit hooks or workflow gates rejecting plans without ledger entries |
| **L4 Actions & Tools** | Add ledger-check step → require mid-task sync → implement workflow gates → build distributed intake validation for MAS · See `HE Enhancement Options.md` P2-5 |
| **L5 What Implementors Measure** | Gate rejection rate for unrecorded requirements = 100% · Mid-task requirement sync-back compliance = 100% |

---

### Pillar 3: Entropy Management (Maintain)

#### P3-1. Scheduled Cleanups

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-18: Entropy requires scheduled countering |
| **L2 Targeted Enhancement** | Entropy never accumulates beyond one GC cycle |
| **L3 Design Decisions** | CI cron trigger (manually-invoked does not qualify); discrete reports per GC category; event-triggered cleanups; local `audit.sh` for on-demand checks; conflict reconciliation agents for MAS |
| **L4 Actions & Tools** | Schedule weekly sweeps → add event-triggered cleanups → implement conflict reconciliation → build entropy metrics dashboard · See `HE Enhancement Options.md` P3-1 |
| **L5 What Implementors Measure** | Dead code / stale docs age ≤ 7 days · Cleanup cadence = weekly minimum · 0 constraint violations persisting > 1 GC cycle |

---

#### P3-2. Documentation Sync

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-19: Documentation must live with the code |
| **L2 Targeted Enhancement** | Documentation always matches the current state of the code |
| **L3 Design Decisions** | CI checks flagging stale docs; documentation consistency agents; doc updates as part of task completion criteria; auto-generated documentation with human review |
| **L4 Actions & Tools** | Add CI staleness checks → deploy consistency agents → require doc updates at task completion → implement auto-generation · See `HE Enhancement Options.md` P3-2 |
| **L5 What Implementors Measure** | Docs-code divergence detection time < 24 hours · 0 stale docs persisting > 1 sprint · Automated sync coverage = 100% of critical docs |

---

#### P3-3. Pattern Auditing

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-18: Entropy requires scheduled countering |
| **L2 Targeted Enhancement** | Coding patterns converge to canonical forms; no circular dependencies or dead code persists |
| **L3 Design Decisions** | Dependency analysis tools; canonical pattern registry; deviation detection; pattern enforcement agents |
| **L4 Actions & Tools** | Run dependency analysis → define canonical patterns → detect deviations → deploy enforcement agents · See `HE Enhancement Options.md` P3-3 |
| **L5 What Implementors Measure** | Circular dependency count → 0 · Dead code percentage < 2% · Pattern divergence across modules < 5% |

---

#### P3-4. Consolidation Loop

| Level | Content |
| ----- | ------- |
| **L1 Principle** | EP-19: Documentation must live with the code |
| **L2 Targeted Enhancement** | Core system documentation automatically stays in sync with codebase state |
| **L3 Design Decisions** | Automated system count updates; changelog accumulation pipeline; ADR prompts on new patterns; config drift detection |
| **L4 Actions & Tools** | Automate count updates → build changelog pipeline → auto-prompt for ADRs → implement drift detection · See `HE Enhancement Options.md` P3-4 |
| **L5 What Implementors Measure** | System count accuracy = 100% · Changelog lag < 1 merge · ADR prompt rate = 100% for new architectural patterns |

---

## Cross-Cutting Chain Perspectives

Some framework elements span multiple chain levels or operate across all 31 features. Their chain position is "lateral" rather than "vertical."

### Prevention Checklist — Broken Chain Detector

Each Prevention Checklist item is a **chain break alarm** — it fires when a specific chain level fails for a specific feature. Prevention items classify by the chain level they protect:

| Chain Level Broken | Prevention Type | Examples |
| ------------------ | --------------- | ------- |
| **L1 violated** (Principle ignored) | Principle Violations | Prevent Cascading Hallucinations (EP-3 violated) · Prevent Over-Engineering (EP-6 violated) |
| **L2 abandoned** (Outcome drifted) | Outcome Drift | Prevent Context Rot (drifted from "sustained reasoning quality") · Prevent Vanity Metrics (drifted from "real quality outcomes") |
| **L3 wrong** (Bad design choice) | Design Failures | Prevent Quadratic Coordination Overhead (wrong topology) · Prevent Supervisor Bottlenecks (wrong pattern) |
| **L4 skipped** (Action omitted) | Action Omissions | Prevent IDE-Locked Rules (missing AGENTS.md) · Prevent Human-Only Documentation (migration not done) |

### DO NOT Rules — L4 Constraints with L1 Backlinks

Each `AGENTS.md` DO NOT rule is an **L4 negative action** (what not to do). Each should backlink to the L1 Principle it protects. See the main plan for the specific DO NOT → EP mapping.

### Reward Engineering — Cross-Chain Anti-Gaming

Reward Engineering is not a feature but a **chain integrity concern** — it detects when agents game any chain level:

| Chain Level Gamed | Anti-Gaming Pattern |
| ----------------- | ------------------- |
| L3 gamed | Agent weakens test assertions to pass (gaming the verification design) |
| L4 gamed | Agent optimizes vanity metrics (gaming the action criteria) |
| L5 gamed | Agent inflates measurable outputs without real improvement (gaming the measurement) |

### Token Economics — Chain Cost Profile

Every feature either **saves tokens** (compresses the chain path) or **spends tokens** (extends it). This is a resource allocation concern across all chains, not a chain level itself.

### SAS→MAS Readiness — Chain Scaling Dimension

Each feature's chain can scale from single-agent to multi-agent. This is a **width dimension** of the chain (how many agents traverse it in parallel), not a chain level.
