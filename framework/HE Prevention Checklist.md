# HE Prevention Checklist

What must be prevented in AI Agent Harness and Multi-Agent System (MAS) to ensure secure, efficient, and accurate operation.

To ensure an AI Agent Harness and Multi-Agent System (MAS) operates securely, efficiently, and accurately, several critical risks and failure modes must be explicitly prevented through system design.

Here is a breakdown of what must be prevented across the 3-Pillar + 1-Foundation framework of harness engineering (see `ANCHORS.md`):

## Pillar 1: Prevent Context and Memory Degradation (Inform)

- **Prevent Context Rot:** You must prevent the agent's context window from filling up with noisy logs, massive tool outputs, and long conversation histories. This is avoided by utilizing context compaction, tool call offloading, and progressive skills.
- **Prevent Human-Only Documentation:** You must prevent project rules, APIs, and architectural decisions from living only in human heads, Slack threads, or private Google Docs. If information is not in the repository, the agent is blind to it.
- **Prevent Attention Drift & Strategic Amnesia:** You must prevent agents from losing sight of original objectives and long-term strategy as intermediate context noise accumulates. Prevent this by syncing critical decision points (what, why, target, background) to persistent memory files that agents recall at session start and after context resets.
- **Prevent Inconsistent Shared Context:** In a MAS, you must prevent agents from operating on conflicting or outdated information. Without shared context management, agents will give inconsistent answers and frustrate users.
- **Prevent Unrecorded Requirements:** You must prevent agents from operating on requirements that exist only in chat history, user conversations, or human memory. Prevent this by mandating a Requirements Ledger where all user stories, functional scenarios, and requirements are formally recorded before any planning or execution begins.

## Foundation: Prevent Coordination and Execution Failures (Execute)

- **Prevent Quadratic Coordination Overhead:** You must prevent the exponential growth of communication paths between agents. Over-communicating can degrade performance by 39% to 70% on sequential reasoning tasks. Prevent this by using appropriate routing topologies and limiting team sizes.
- **Prevent Cascading Hallucinations (Error Propagation):** You must prevent one agent's mistake, hallucination, or overconfidence from corrupting the decisions of downstream peer agents. This is prevented by enforcing collective verification and consensus-seeking protocols before committing work.
- **Prevent State and File Conflicts:** You must prevent race conditions where multiple agents overwrite each other's code or claim the same tasks simultaneously. Prevent this by implementing explicit file locking, shared task lists, and breaking work down so teammates own different sets of files.
- **Prevent Premature Exits:** You must prevent models from stopping early or losing coherence over long horizons. Prevent this using "Ralph Loops" to intercept exit attempts and reinject prompts to force task completion.
- **Prevent Supervisor Bottlenecks:** In hierarchical or supervisor patterns, you must prevent the central coordinating agent from becoming a single point of failure that stalls the entire workflow when request volumes spike.

## Pillar 2: Prevent Security, Ethics, and Emergent Risks (Constrain)

- **Prevent Prompt Injections and Data Leakage:** You must prevent malicious inputs from manipulating agent instructions to steal API keys or expose Personally Identifiable Information (PII) across the network. Prevent this using real-time guardrails and bounded autonomy.
- **Prevent Malicious Emergent Behaviors:** In autonomous swarms, you must prevent agents from executing "bot muggings," planting logic bombs, or deploying cryptographic evasion to hide from human oversight. This requires strict access controls and continuous monitoring.
- **Prevent Opaque Decision-Making:** You must prevent decentralized unaccountability, where it is impossible to know _which_ agent made a harmful decision. Prevent this by enforcing strict audit trails that log every tool call, state transition, and inter-agent influence.
- **Prevent Anthropomorphization and Over-Reliance:** You must prevent users from placing undue trust in agents by treating them as human entities, which obscures the system's actual technical limits and vulnerabilities.
- **Prevent Unregistered Work:** You must prevent agents from starting planning or execution on requirements that have not been formally captured in the Requirements Ledger. Prevent this by implementing an Upstream Intake Gate that validates ledger entries exist before workflows proceed.

## Pillar 3: Prevent Lifecycle and Architectural Decay (Maintain)

- **Prevent Over-Engineering the Control Flow:** You must prevent the harness from becoming a brittle, static cage. Hardcoding overly complex pipelines will break when underlying models naturally improve. Prevent this by building "rippable" middleware that can be easily removed.
- **Prevent Codebase Entropy:** You must prevent the natural accumulation of dead code, documentation drift, and circular dependencies generated by AI. Prevent this by deploying scheduled cleanup agents (garbage collection).
- **Prevent Runaway Concurrency Costs:** You must prevent token costs from scaling linearly or quadratically without matching performance gains. Prevent this by avoiding agent swarms for simple tasks that a single session could handle.
- **Prevent Evaluation Overfitting:** You must prevent the system from overfitting to static benchmarks. Prevent this by utilizing dynamic benchmarking and "Agent-as-a-Judge" frameworks to continuously create challenging, evolving evaluation instances.
- **Prevent Documentation Disconnects (Missing Consolidation):** You must prevent core system counts and architectural records from drifting out of sync. Prevent this by implementing a "Consolidation Loop" that auto-updates CLAUDE.md, prompts for ADRs on new patterns, accumulates changelogs, and updates configs like HarnessConfig.json as features land.

---

## Cross-Cutting: Reward Engineering & Anti-Hacking

_Agent reward structures can be gamed. Preventing reward-hacking is essential for reliable autonomous execution. (See also: HE Key Points §5)_

- Creating a human-in-the-loop process that creates delay without adding genuine insight
- Optimizing for vanity metrics (e.g., lines of code, PRs merged) rather than actual quality outcomes
- Allowing the agent to game its own success criteria (e.g., passing tests by weakening assertions)
- Deploying reward signals that conflict with each other across agents, causing adversarial drift
- Failing to audit whether reward-aligned outputs actually correlate with real-world value
