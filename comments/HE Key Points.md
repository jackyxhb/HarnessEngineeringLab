# Harness Engineering (HE) Key Points

Harness Engineering (HE) is an AI-first methodology focused on creating safe, controllable, and productive environments for autonomous AI agents. Below are the extracted key points defining this discipline based on the repository documentation and current industry literature (including the Medium article on AI Harness Engineering):

## 1. Core Philosophy: Humans Steer, Agents Execute

- **Shift in Engineering Role:** Human engineers stop writing every line of code. Instead, their job is to design the environment, specify intent, validate outcomes, and build automated feedback loops.
- **Safety-by-Design:** Controls are built into the foundation and architecture of the system from day one, ensuring agents operate safely and predictably.
- **Environment Driven:** When an agent fails, you don't manually fix the code. You fix the environment by adding a mechanical guardrail (like a new test or linter) so the agent learns to self-correct.

## 2. Architectural Rigidity and Constraints

- **Explicit and Machine-Verifiable:** Architectural decisions cannot rely on human memory or convention. They must be explicitly encoded via linters, structural tests, and CI/CD pipelines.
- **Strict Dependency Boundaries:** Enforce forward-only dependency chains (e.g., Types → Config → Repo → Service → Runtime → UI) to prevent spaghetti code and architectural drift.
- **Tool Shed/Sandboxing:** Restrict the agent's actions to a specific, well-defined set of pre-approved APIs and tools.

## 3. Foundational Infrastructure: Verification and Execution

- **Per-Worktree Isolation:** Agents must operate in fully isolated environments (e.g., dedicated git worktrees) with their own ephemeral observability stacks (logs, metrics, traces) to prevent cross-task contamination.
- **Parse at the Boundary:** Data validation happens strictly at system boundaries, ensuring agents do not hallucinate or guess data shapes deep in business logic.
- **Self-Verification Loops:** Providing agents with tools to observe the results of their actions, run tests, and fix their own mistakes autonomously.

## 4. Context Engineering: Memory and Reflection

- **Reflection and Memory:** Providing agents with long-term storage of past successes/failures to prevent repeated mistakes and maintain durable context across sessions.

## 5. Reward Engineering and Anti-Hacking

*Integrated into the canonical framework as a cross-cutting concern. See `HESkill/HE Prevention Checklist.md` § Reward Engineering & Anti-Hacking.*

- **Reward Shaping:** Providing incremental goals to guide agents toward beneficial outcomes.
- **Preventing Reward Hacking:** Actively anticipating and designing penalties for "lazy or malicious" ways an AI might game its objectives (e.g., achieving a goal in a literal but destructive way).

## 6. Human-in-the-Loop (HITL) and Escalation (Foundation)

- **Judgment, Not Execution:** Human review is reserved for judgment calls, visual ambiguity, and architectural escalations—not for syntax checking.
- **Tooling Gap Identification:** If an operation requires human intervention (like copying/pasting terminal output), it is considered a tooling gap that must be encoded and automated.

## 7. Predictable and Boring Technologies

- **Favor Legibility:** Use established standards, simple primitives, and highly public technologies. Agents model well-documented and widely-used technologies much more accurately than niche, opaque, or rapidly evolving abstractions.
