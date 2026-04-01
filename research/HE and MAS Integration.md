# AI Agent Harness Engineering and Multi-Agent Systems (MAS)

> _Canonical framework: `framework/Core Features for SAS.md` | MAS: `framework/Core Features for MAS.md`_

**AI Agent Harness Engineering and Multi-Agent Systems (MAS) are deeply interconnected: if the multi-agent mechanism is the workforce, the harness is the factory floor that orchestrates, constrains, and supports them.**

Single agents typically hit a performance ceiling when managing more than 10 to 15 tools or when their context windows become overwhelmed, making multi-agent systems necessary for complex, real-world tasks. However, multi-agent systems introduce severe challenges like quadratic coordination overhead, error propagation across agent chains, and state conflicts. Harness engineering provides the infrastructure to solve these exact systemic challenges.

Here is how harness engineering directly enables and manages multi-agent working mechanisms, organized by the **3-Pillar + 1-Foundation Framework** (see `Core Features for SAS.md` | `Core Features for MAS.md` | `ANCHORS.md`):

## Foundational Infrastructure (Execute)

A foundational feature of a harness is providing secure execution sandboxes and durable filesystem/Git workspaces. In a multi-agent system, **the filesystem acts as the core primitive for context management and a shared ledger where multiple agents can collaborate**. This infrastructure makes advanced multi-agent structures possible, such as the "Blackboard" architecture, where a shared knowledge space allows diverse specialist agents to incrementally read, write, and refine partial solutions without stepping on each other's toes.

A production harness does not just manage one isolated agent; it manages complex workflows. **The harness provides the orchestration layer responsible for spawning subagents, handling task handoffs, and managing multi-agent teams working in parallel**. Through the harness, engineers configure the exact multi-agent communication structure needed for the task, powered by Inter-Agent Communication (P0-MAS):

- **Supervisor (Centralized):** The harness designates a central orchestrator agent to plan, route tasks to worker agents, and merge results. Frameworks like OpenAI's Swarm use the harness to facilitate these seamless "handoffs" between a lead agent and specialized teammates.
- **Hierarchical:** The harness stacks multiple supervisor layers, breaking down complex workflows so mid-level supervisors can manage their own teams of workers.
- **Peer-to-Peer (Decentralized):** The harness allows agents to communicate directly via message passing to negotiate and make distributed decisions.

## Pillar 1: Context Engineering (Inform)

Multi-agent systems significantly expand the risk of "context rot" across multiple agents. The harness mitigates this through context engineering:

- **Context Compaction & Tool Offloading:** The harness intelligently summarizes older context and strips noisy tool outputs so that agents communicating in a network do not suffer from "context rot".

## Pillar 2: Architectural Constraints (Constrain)

Harnesses enforce strict architectural boundaries to prevent agents from exploring dead ends. In a multi-agent setup, the harness uses the MAS mechanism itself as a guardrail. **Harnesses deploy secondary LLM-based "auditor" or "critic" agents whose specific role is to review the primary agent's output** for compliance, security, and architectural correctness. This creates a cooperative or competitive dynamic (like a parallel code review or a debate over competing hypotheses) where agents actively challenge each other to refine the final output.

Multi-agent systems also vastly expand the attack surface; one hallucinating or compromised agent can corrupt the shared state or derail downstream peer decisions. The harness enforces:

- **Bounded Autonomy (P2-4):** The harness enforces risk-based boundaries (such as requiring human approval for certain actions) and implements real-time guardrails to block malicious queries before they can propagate across the multi-agent workflow.

## Pillar 3: Entropy Management (Maintain)

As multiple agents generate code, execute tools, and interact, the system naturally accumulates "entropy"—such as documentation drift, circular dependencies, or dead code. The harness manages the long-term health of a multi-agent system by running **periodic, scheduled cleanup agents**. These specialized agents run automatically in the background to synchronize documentation and audit coding patterns, ensuring the shared repository remains healthy despite the high volume of AI-generated edits.

---

Ultimately, the multi-agent mechanism provides the distributed intelligence required to solve complex problems, while the harness provides the state management, rigid constraints, and routing logic required to ensure those agents actually converge on a correct solution.
