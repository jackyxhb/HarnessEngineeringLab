# HE Negative Actions

What must be prevented in AI Agent Harness Engineering to ensure secure, efficient, and accurate operation.

Here is a breakdown of what must be prevented across the 3-Pillar + 1-Foundation framework of harness engineering (see `HE Design Decisions.md` | `ANCHORS.md`).

Each prevention item maps to a broken link in the Principle-to-Practice Chain (see `HE Principle Map.md`). The table below classifies what chain level fails when the prevention is absent.

## Chain Failure Index

```json
[
  { "prevention_item": "P0-2 State & File Conflicts",      "broken_principle": "EP-2 Persistence",              "failure_level": "L4 omission — locking actions not taken" },
  { "prevention_item": "P0-3 Cascading Hallucinations",    "broken_principle": "EP-3 Verify before completion",  "failure_level": "L4 omission — no verification protocol" },
  { "prevention_item": "P0-4 Premature Exits",             "broken_principle": "EP-4 Tasks must be completed",   "failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P0-5 Quadratic Overhead",          "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L3 failure — wrong topology choice" },
  { "prevention_item": "P0-5 Supervisor Bottlenecks",      "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L3 failure — wrong orchestration pattern" },
  { "prevention_item": "P0-9 Manual CLI Execution",        "broken_principle": "EP-9 Standard operations",       "failure_level": "L4 omission — wrappers not used" },
  { "prevention_item": "P0-11 IDE-Locked Rules",           "broken_principle": "EP-10 Portability",              "failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P1-1 Human-Only Docs",             "broken_principle": "EP-11 Repo as truth",            "failure_level": "L1 violation — knowledge outside repo" },
  { "prevention_item": "P1-1 Human-Only Format",           "broken_principle": "EP-11 Repo as truth",            "failure_level": "L3 failure — wrong documentation format" },
  { "prevention_item": "P1-2,3 Context Rot",               "broken_principle": "EP-12 Finite attention",         "failure_level": "L4 omission — compaction not active" },
  { "prevention_item": "P1-7,8 Attention Drift",           "broken_principle": "EP-2 Persistence",               "failure_level": "L4 omission — no anchoring actions" },
  { "prevention_item": "P1-1,7 Inconsistent Context",      "broken_principle": "EP-11 Repo as truth",            "failure_level": "L3 failure — no single shared source" },
  { "prevention_item": "P1-10 Unrecorded Requirements",    "broken_principle": "EP-14 Clarity before commitment", "failure_level": "L4 omission — ledger not maintained" },
  { "prevention_item": "P1-11 Ambiguous Inputs",           "broken_principle": "EP-14 Clarity before commitment", "failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P1-12 Monolithic Skills",            "broken_principle": "EP-12 Finite attention",           "failure_level": "L4 omission — skill not modularized" },
  { "prevention_item": "P2-1 Unenforced Rules",            "broken_principle": "EP-15 Mechanical enforcement",   "failure_level": "L4 omission — no sensor for guide" },
  { "prevention_item": "P2-4 Prompt Injections",           "broken_principle": "EP-17 Capabilities ∝ risk",      "failure_level": "L4 omission — guardrails not deployed" },
  { "prevention_item": "P2-4 Emergent Behaviors",          "broken_principle": "EP-17 Capabilities ∝ risk",      "failure_level": "L3 failure — access controls insufficient" },
  { "prevention_item": "P0-7 Opaque Decisions",            "broken_principle": "EP-7 Traceability",              "failure_level": "L4 omission — audit trails not wired" },
  { "prevention_item": "P2-4 Anthropomorphization",        "broken_principle": "EP-17 Capabilities ∝ risk",      "failure_level": "L2 drift — outcome not tracked" },
  { "prevention_item": "P2-5 Unregistered Work",           "broken_principle": "EP-14 Clarity before commitment", "failure_level": "L4 omission — intake gate missing" },
  { "prevention_item": "P0-6 Over-Engineering",            "broken_principle": "EP-6 Scaffolding temporary",     "failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P3-1,3 Codebase Entropy",          "broken_principle": "EP-18 Entropy countering",       "failure_level": "L4 omission — GC not scheduled" },
  { "prevention_item": "P0-5 Runaway Costs",               "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L2 drift — cost/benefit not measured" },
  { "prevention_item": "P2-3 Evaluation Overfitting",      "broken_principle": "EP-16 Not own reviewer",         "failure_level": "L3 failure — static benchmarks only" },
  { "prevention_item": "P3-2,4 Doc Disconnects",           "broken_principle": "EP-19 Docs with code",           "failure_level": "L4 omission — sync not automated" },
  { "prevention_item": "Reward: Performative Oversight",    "broken_principle": "EP-7 Traceability",              "failure_level": "L2 drift — oversight adds delay not insight" },
  { "prevention_item": "Reward: Vanity Metrics",           "broken_principle": "EP-8 Measure for improvement",   "failure_level": "L2 drift — wrong metrics tracked" },
  { "prevention_item": "Reward: Success Gaming",           "broken_principle": "EP-16 Review",                   "failure_level": "L3 failure — weak assertion design" },
  { "prevention_item": "Reward: Conflicting Signals",      "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L3 failure — reward misalignment" },
  { "prevention_item": "Reward: Unaudited Correlation",    "broken_principle": "EP-8 Measure for improvement",   "failure_level": "L4 omission — no value correlation audit" }
]
```

## Foundation: Prevent Coordination and Execution Failures (Execute)

- **`P0-2` Prevent State and File Conflicts:** You must prevent race conditions where multiple agents overwrite each other's code or claim the same tasks simultaneously. Prevent this by implementing explicit file locking, shared task lists, and breaking work down so teammates own different sets of files.
- **`P0-3` Prevent Cascading Hallucinations (Error Propagation):** You must prevent one agent's mistake, hallucination, or overconfidence from corrupting the decisions of downstream peer agents. This is prevented by enforcing collective verification and consensus-seeking protocols before committing work.
- **`P0-4` Prevent Premature Exits:** You must prevent models from stopping early or losing coherence over long horizons. Prevent this using "Ralph Loops" to intercept exit attempts and reinject prompts to force task completion.
- **`P0-5` Prevent Quadratic Coordination Overhead:** You must prevent the exponential growth of communication paths between agents. Over-communicating can degrade performance by 39% to 70% on sequential reasoning tasks. Prevent this by using appropriate routing topologies and limiting team sizes.
- **`P0-5` Prevent Supervisor Bottlenecks:** In hierarchical or supervisor patterns, you must prevent the central coordinating agent from becoming a single point of failure that stalls the entire workflow when request volumes spike.
- **`P0-9` Prevent Manual, Error-Prone CLI Execution:** You must prevent agents from manually executing raw, multi-step system commands (git, npm, shell) without standardization. Prevent this by mandating Smart Command Wrappers (ccp, ccpr, reconcile) that ensure deterministic execution order and metadata generation.
- **`P0-11` Prevent IDE-Locked Rules:** You must prevent global project rules from living exclusively in one IDE's proprietary format (e.g., Claude Code memory files, Cursor-only `.cursorrules`, VS Code-only `copilot-instructions.md`). Rules stored this way are invisible to agents running in other environments, fragmenting the harness across IDEs. Prevent this by mandating a single `AGENTS.md` as the canonical rule surface, with IDE-specific files serving as thin shims.

## Pillar 1: Prevent Context and Memory Degradation (Inform)

- **`P1-1` Prevent Human-Only Documentation:** You must prevent project rules, APIs, and architectural decisions from living only in human heads, Slack threads, or private Google Docs. If information is not in the repository, the agent is blind to it.
- **`P1-1` Prevent Human-Only Documentation Format:** You must prevent documentation that is structured exclusively for human consumption (narrative prose, unstructured paragraphs, inconsistent headings). All documentation must be simultaneously machine-parseable: use consistent Markdown headings, grep-friendly formatting, structured lists, and semantic identifiers so agents can reliably locate and extract information without relying on natural-language inference.
- **`P1-2, P1-3` Prevent Context Rot:** You must prevent the agent's context window from filling up with noisy logs, massive tool outputs, and long conversation histories. This is avoided by utilizing context compaction, tool call offloading, and progressive skills.
- **`P1-7, P1-8` Prevent Attention Drift & Strategic Amnesia:** You must prevent agents from losing sight of original objectives and long-term strategy as intermediate context noise accumulates. Prevent this by syncing critical decision points (what, why, target, background) to persistent memory files that agents recall at session start and after context resets.
- **`P1-1, P1-7` Prevent Inconsistent Shared Context:** In a MAS, you must prevent agents from operating on conflicting or outdated information. Without shared context management, agents will give inconsistent answers and frustrate users.
- **`P1-10` Prevent Unrecorded Requirements:** You must prevent agents from operating on requirements that exist only in chat history, user conversations, or human memory. Prevent this by mandating a Requirements Ledger where all user stories, functional scenarios, and requirements are formally recorded before any planning or execution begins.
- **`P1-11` Prevent Execution on Ambiguous Inputs:** You must prevent agents from proceeding with planning or execution while the input contains unresolved ambiguities, hidden assumptions, or unclear requirements. Apply Socratic questioning — systematically probing for Clarification, Assumptions, Evidence, Viewpoints, Implications, and Meta-questions — before any execution begins. Record all resolved clarifications in the Requirements Ledger or Context Anchors before proceeding.
- **`P1-12` Prevent Monolithic, Unstructured Skills:** You must prevent agent skills from shipping as monolithic reference files that exceed mandatory-read budgets or lack routing logic. Monolithic skills force agents to read hundreds of lines before finding the correct action path, causing context waste and degraded reasoning. Prevent this by enforcing modular skill architecture: split references below 200 lines, add decision-tree routing hubs, standardize terminology, and extract reusable templates.

## Pillar 2: Prevent Security, Ethics, and Emergent Risks (Constrain)

- **`P2-1` Prevent Guide-Only Features (Unenforced Rules):** You must prevent AGENTS.md rules, templates, or prompts from shipping without a corresponding enforcement sensor (lint rule, structural test, or CI check). A guide without a sensor is an unenforced wish that agents will ignore. Prevent this by auditing guide/sensor parity during every `/reconcile` run and flagging orphaned guides for mechanical enforcement.
- **`P2-4` Prevent Prompt Injections and Data Leakage:** You must prevent malicious inputs from manipulating agent instructions to steal API keys or expose Personally Identifiable Information (PII) across the network. Prevent this using real-time guardrails and bounded autonomy.
- **`P2-4` Prevent Malicious Emergent Behaviors:** In autonomous swarms, you must prevent agents from executing "bot muggings," planting logic bombs, or deploying cryptographic evasion to hide from human oversight. This requires strict access controls and continuous monitoring.
- **`P0-7` Prevent Opaque Decision-Making:** You must prevent decentralized unaccountability, where it is impossible to know _which_ agent made a harmful decision. Prevent this by enforcing strict audit trails that log every tool call, state transition, and inter-agent influence.
- **`P2-4` Prevent Anthropomorphization and Over-Reliance:** You must prevent users from placing undue trust in agents by treating them as human entities, which obscures the system's actual technical limits and vulnerabilities.
- **`P2-5, P1-10` Prevent Unregistered Work:** You must prevent agents from starting planning or execution on requirements that have not been formally captured in the Requirements Ledger. Prevent this by implementing an Upstream Intake Gate that validates ledger entries exist before workflows proceed.

## Pillar 3: Prevent Lifecycle and Architectural Decay (Maintain)

- **`P0-6` Prevent Over-Engineering the Control Flow:** You must prevent the harness from becoming a brittle, static cage. Hardcoding overly complex pipelines will break when underlying models naturally improve. Prevent this by building "rippable" middleware that can be easily removed.
- **`P3-1, P3-3` Prevent Codebase Entropy:** You must prevent the natural accumulation of dead code, documentation drift, and circular dependencies generated by AI. Prevent this by deploying scheduled cleanup agents (garbage collection).
- **`P0-5` Prevent Runaway Concurrency Costs:** You must prevent token costs from scaling linearly or quadratically without matching performance gains. Prevent this by avoiding agent swarms for simple tasks that a single session could handle.
- **`P2-3` Prevent Evaluation Overfitting:** You must prevent the system from overfitting to static benchmarks. Prevent this by utilizing dynamic benchmarking and "Agent-as-a-Judge" frameworks to continuously create challenging, evolving evaluation instances.
- **`P3-2, P3-4` Prevent Documentation Disconnects (Missing Consolidation):** You must prevent core system counts and architectural records from drifting out of sync. Prevent this by implementing a "Consolidation Loop" that auto-updates CLAUDE.md, prompts for ADRs on new patterns, accumulates changelogs, and updates configs like HarnessConfig.json as features land.

---

## Cross-Cutting: Reward Engineering & Anti-Hacking

_Agent reward structures can be gamed. Preventing reward-hacking is essential for reliable autonomous execution. (See also: `references/OpenAI-Harness-Engineering.md`)_

- **`P0-7, P2-4` Prevent Performative Oversight:** You must prevent human-in-the-loop processes that create delay without adding genuine insight.
- **`P1-5` Prevent Vanity Metric Optimization:** You must prevent agents from optimizing for vanity metrics (e.g., lines of code, PRs merged) rather than actual quality outcomes.
- **`P0-3, P2-3` Prevent Success Criteria Gaming:** You must prevent agents from gaming their own success criteria (e.g., passing tests by weakening assertions).
- **`P0-5` Prevent Conflicting Reward Signals:** You must prevent reward signals that conflict with each other across agents, causing adversarial drift.
- **`P1-5` Prevent Unaudited Reward Correlation:** You must prevent reward-aligned outputs from going unaudited for correlation with real-world value.
