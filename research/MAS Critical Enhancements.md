# MAS Critical Enhancements

> _Canonical framework: `framework/HE Design Decisions.md`_

When transitioning from single-agent setups to Multi-Agent Systems (MAS), certain harness requirements intensify significantly. While highly effective for managing a single model, deploying a "swarm" or network of agents introduces complex challenges such as quadratic coordination overhead, race conditions, cascading hallucinations, and decentralized liability.

Here are the critical considerations that need improvement in the framework to properly support a multi-agent system, organized by the 3-Pillar + 1-Foundation structure:

## 1. Foundational Infrastructure: Upgrading the Engine

- **Concurrency Control and File Locking (P0-2):** In the current framework, the _Filesystem & Git Workspace_ acts as a shared ledger. However, when multiple agents work in parallel, they can easily overwrite each other's code, leading to file conflicts. The harness must introduce explicit **file locking** and task-claiming mechanisms to prevent race conditions when teammates try to execute the same task simultaneously.
- **Inter-Agent Communication Protocols (P0-10 — The Mailbox):** Beyond reading and writing to a shared filesystem, multi-agent systems require a dedicated messaging bus. The harness needs a "Mailbox" system that supports distinct communication strategies, such as direct peer-to-peer (P2P) messaging, broadcasting, and idle notifications.
- **Dynamic Topology & Overhead Optimization (P0-5):** The _Orchestration Logic_ must become much smarter about _when_ to use multiple agents. Research shows that while MAS improves parallel tasks, multi-agent coordination actually **degrades performance by 39% to 70% on sequential reasoning tasks** because communication overhead fragments continuous thought. The harness needs routing logic that dynamically assesses task topology (parallel vs. sequential) and tool density to prevent quadratic communication overhead.
- **Collective Verification (P0-3 — Verification (Self & Collective)):** In MAS, an error made by one agent can lead to "cascading hallucinations" where downstream agents build upon corrupted data. The harness needs mechanisms like consensus-seeking protocols, where multiple agents must vote or agree on a partial solution before it is committed to the shared _State File_ or _Blackboard_.
- **Decentralized Accountability & Audit Trails (P0-7 — Escalation Policies & Audit Trails):** When an autonomous swarm produces an output or exhibits unexpected "emergent behaviors", it becomes incredibly difficult to trace how the decision was made. The harness must maintain strict **Audit Trails** that log exactly which agent initiated an action, what data they accessed, and how they influenced peer agents. This is critical for regulatory compliance and resolving the ethical dilemma of "who is liable" when a multi-agent system fails.

## 2. Pillar 1: Context Engineering — Preventing Error Cascades

- **Context Compaction & Memory Management (P1-2):** The framework must clearly define how memory is handled. The harness must manage _Short-term memory_ (session history) for individual agents alongside a _Long-term centralized memory_ (e.g., a vector database) so agents can selectively synchronize knowledge without overwhelming their individual context windows.

## 3. Pillar 2: Architectural Constraints — Security & Interaction Types

- **Bounded Autonomy and Access Control (P2-4):** The current framework lacks specific inter-agent security constraints. Multi-agent systems vastly expand the attack surface; a prompt injection or hallucination in one agent can rapidly corrupt the shared state and hijack peer agents. The harness must implement **Bounded Autonomy** (e.g., requiring human approval for high-risk actions) and strict access controls to ensure agents do not inadvertently share restricted information with agents or users who lack proper permissions.
- **AI Auditors & Collaboration Channels (P2-3 — Competition & Coopetition):** The current framework's _AI Auditors_ imply a purely cooperative setup. However, advanced MAS frameworks benefit massively from diverse collaboration types, including **Competition** and **Coopetition**. For instance, setting up agents as adversaries to debate competing hypotheses or critique code prevents "anchoring bias" and yields much more robust problem-solving than cooperation alone.
- **Distributed Upstream Intake Gate (P2-5):** In MAS, the Upstream Intake Gate must ensure all agents check the shared _Requirements Ledger_ before claiming work. Without this constraint, multiple agents independently interpret and build conflicting implementations of the same feature, creating costly rework and merge entropy.

## 4. Pillar 3: Entropy Management — Accelerated Decay Control

- **Scheduled Cleanups (P3-1):** When multiple agents generate code and modify state concurrently, the codebase accumulates technical debt significantly faster than in SAS. Cleanup agents must expand beyond standard error detection to actively **reconcile overlapping or conflicting code changes** made by concurrent teams. Dedicated conflict resolution agents running in the background become essential.
- **Documentation Sync (P3-2):** With multiple agents shipping features in parallel, documentation drifts out of date far more rapidly. The harness needs designated documentation agents that continuously audit and update project docs to reflect the rapidly evolving codebase, rather than relying on post-hoc manual sweeps.
- **Pattern Auditing (P3-3):** Independent agents working on separate modules naturally develop divergent coding patterns. Pattern auditing must track and resolve not only circular dependencies and dead code, but also **inter-agent style drift** — inconsistent approaches to the same problem emerging across different agent-owned modules.
- **Consolidation Loop (P3-4):** The Consolidation Loop must scale from single-agent doc updates to a swarm-aware pipeline that aggregates changelogs, system counts, and config changes from all agents into a single coherent state — preventing the common MAS failure mode where core documentation reflects only the last agent's perspective.
