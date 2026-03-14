# Critical enhancements when multi-agent system

When transitioning from single-agent setups to Multi-Agent Systems (MAS), the 21-feature harness framework requires significant upgrades. While highly effective for managing a single model, deploying a "swarm" or network of agents introduces complex challenges such as quadratic coordination overhead, race conditions, cascading hallucinations, and decentralized liability.

Here are the critical considerations that are currently missed or need improvement in the 21-feature framework to properly support a multi-agent system:

## 1. Foundational Infrastructure: Upgrading the Engine

* **Concurrency Control and File Locking:** In the current framework, the *Filesystem & Git Workspace* acts as a shared ledger. However, when multiple agents work in parallel, they can easily overwrite each other's code, leading to file conflicts. The harness must introduce explicit **file locking** and task-claiming mechanisms to prevent race conditions when teammates try to execute the same task simultaneously.
* **Inter-Agent Communication Protocols (The Mailbox):** Beyond reading and writing to a shared filesystem, multi-agent systems require a dedicated messaging bus. The harness needs a "Mailbox" system that supports distinct communication strategies, such as direct peer-to-peer (P2P) messaging, broadcasting, and idle notifications.
* **Dynamic Topology & Overhead Optimization:** The *Orchestration Logic* must become much smarter about *when* to use multiple agents. Research shows that while MAS improves parallel tasks, multi-agent coordination actually **degrades performance by 39% to 70% on sequential reasoning tasks** because communication overhead fragments continuous thought. The harness needs routing logic that dynamically assesses task topology (parallel vs. sequential) and tool density to prevent quadratic communication overhead.

## 2. Architectural Constraints: Security & Interaction Types

* **Bounded Autonomy and Access Control:** The current framework lacks specific inter-agent security constraints. Multi-agent systems vastly expand the attack surface; a prompt injection or hallucination in one agent can rapidly corrupt the shared state and hijack peer agents. The harness must implement **Bounded Autonomy** (e.g., requiring human approval for high-risk actions) and strict access controls to ensure agents do not inadvertently share restricted information with agents or users who lack proper permissions.
* **Diverse Collaboration Channels (Competition & Coopetition):** The current framework's *AI Auditors* imply a purely cooperative setup. However, advanced MAS frameworks benefit massively from diverse collaboration types, including **Competition** and **Coopetition**. For instance, setting up agents as adversaries to debate competing hypotheses or critique code prevents "anchoring bias" and yields much more robust problem-solving than cooperation alone.

## 3. Context & Memory: Preventing Error Cascades

* **Cross-Agent Consensus and Verification:** The *Self-Verification* feature must be expanded to **Collective Verification**. In MAS, an error made by one agent can lead to "cascading hallucinations" where downstream agents build upon corrupted data. The harness needs mechanisms like consensus-seeking protocols, where multiple agents must vote or agree on a partial solution before it is committed to the shared *State File* or *Blackboard*.
* **Distributed vs. Centralized State Management:** The framework must clearly define how memory is handled. The harness must manage *Short-term memory* (session history) for individual agents alongside a *Long-term centralized memory* (e.g., a vector database) so agents can selectively synchronize knowledge without overwhelming their individual context windows.

## 4. Observability & Operations: Accountability

* **Decentralized Accountability & Traceability:** When an autonomous swarm produces an output or exhibits unexpected "emergent behaviors", it becomes incredibly difficult to trace how the decision was made. The *Performance Dashboards* and *Escalation Policies* must be upgraded into strict **Audit Trails** that log exactly which agent initiated an action, what data they accessed, and how they influenced peer agents. This is critical for regulatory compliance and resolving the ethical dilemma of "who is liable" when a multi-agent system fails.
