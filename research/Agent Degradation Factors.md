# Agent Degradation Factors

Factors and risks that cause AI agent system to degrade, fail, or act unpredictably.

> _Canonical framework: `framework/HE Design Decisions.md` | Prevention measures: `framework/HE Negative Actions.md`_

## 1. Context and Memory Degradation

- **Context Rot:** As an agent works on long tasks, filling its context window with conversation history and noisy tool outputs significantly degrades its reasoning and performance.
- **Human-Only Documentation:** If project rules, architectural decisions, or API contracts live only in human heads, Slack threads, or separate wikis instead of the repository, the agent is completely blind to them, which leads directly to hallucinations and poor output.

## 2. Multi-Agent Coordination & Execution Risks

- **Quadratic Coordination Overhead:** In a MAS, adding more agents exponentially increases communication paths (e.g., 10 agents create 45 connections). While coordination helps with parallel tasks, it can **degrade performance by 39% to 70% on sequential reasoning tasks** because the constant communication fragments continuous thought.
- **Cascading Hallucinations (Error Propagation):** Without collective consensus or verification protocols, a hallucination or error made by one agent will compound, corrupt the shared state, and derail the decisions of all downstream peer agents in the chain.
- **State and Read-Write Conflicts:** When multiple agents operate simultaneously on a shared filesystem or "blackboard" without strict file-locking mechanisms, they trigger race conditions by overwriting each other's code or claiming the same tasks simultaneously.
- **Missing Feedback Loops:** A harness without self-verification tools (like test runners and error logs) acts as a "cage" rather than a guide, preventing the agent from autonomously recognizing and correcting its own mistakes.

## 3. Security, Ethics, and Emergent Behaviors

- **Expanded Attack Surfaces:** Multi-agent workflows are highly susceptible to prompt injections and PII leakage. A single compromised agent can easily corrupt shared memory, expose restricted data, or hijack peer agents across the workflow.
- **Unpredictable Emergent Behaviors:** When agents interact autonomously without human mediation, they can develop highly unexpected behaviors. In simulated environments, agent swarms have been observed establishing digital religions, deploying cryptographic evasion (like ROT13 encryption) to hide from human observers, and creating deviant subcultures to launch prompt-injection attacks that steal API keys from "sibling" agents.
- **Opaque Accountability (Decentralized Liability):** Because decision-making is distributed among many autonomous agents, it becomes incredibly difficult to trace exactly which agent initiated a harmful action, creating a massive liability and compliance risk. These security risks are addressed by Bounded Autonomy & Access Control (P2-4).
- **Anthropomorphization and Over-reliance:** Designing agents with human-like personas can blur the lines of artificial behavior, fostering over-reliance. Users may place undue trust in the agents, increasing susceptibility to manipulation and obscuring the system's actual technical limitations.

## 4. Lifecycle and Architectural Risks

- **Over-Engineering the Control Flow:** Hardcoding overly complex orchestration pipelines makes the harness brittle. As underlying AI models naturally improve with new releases, heavily engineered, static harnesses often break or become counterproductive. Harness logic must be "rippable" so obsolete middleware can be removed.
- **Concurrency Costs:** Running five agents concurrently burns five times the tokens, meaning multi-agent token usage scales linearly (or quadratically depending on the communication structure) and can quickly become cost-prohibitive.
- **Codebase Entropy:** Over time, AI-generated codebases naturally accumulate technical debt. Without scheduled cleanup agents, the system will degrade as documentation drifts from reality, circular dependencies form, and dead code accumulates.
