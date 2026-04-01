# Tools for Agentic Software Engineering

> _Canonical framework: `framework/HE Core Features.md` | Enhancement options: `framework/HE Enhancement Options.md`_

## Execution Engines and Orchestration Frameworks (The MAS Backbone)

These frameworks provide the foundational infrastructure for spawning, routing, and managing multi-agent teams or structured Single-Agent System (SAS) workflows.

- **Claude Code Agent Teams:** A terminal-based framework that spins up autonomous teammates communicating peer-to-peer. It utilizes a shared task list, an inter-agent mailbox (P0-10), and split-pane terminal displays (via `tmux` or `iTerm2`) to manage independent context windows and avoid file conflicts.
- **Microsoft Agent Framework (and Magentic-One):** A generalist MAS that acts as the successor to AutoGen and Semantic Kernel. It features graph-based workflows, type-safe routing, session-based state management, and a central Orchestrator agent that delegates tasks while tracking progress and handling error recovery.
- **OpenAI Swarm:** An educational, lightweight orchestration framework designed for ergonomic control. It runs statelessly on the client, managing agent execution through simple routines and agent-to-agent "handoffs".
- **IBM Bee Agent Framework:** An open-source, modular framework that supports scalable multi-agent workflows. Its key harness feature is the ability to serialize agent states, allowing the system to pause and resume complex, long-running tasks without data loss.
- **LangGraph & CrewAI:** LangGraph utilizes state graphs and conditional routing logic to explicitly define agent dependencies. CrewAI implements a role-based abstraction where agents are assigned specific goals and backstories, communicating through a shared context object.
- **AgentMesh & ITA:** Academic/open-source cooperative frameworks that strictly divide labor. AgentMesh splits software development into Planner, Coder, Debugger, and Reviewer roles. ITA (Intelligent Test Automation) uses specialized agents (Test Case Generation, Modification, and Validation) built on AutoGen to dynamically generate and self-correct test cases.
- **BMAD (Breakthrough Method for Agile AI-Driven Development):** Organizes agents into agile roles (e.g., Product Owner, Architect) and uses a Scrum Master agent to "shard" context into specific story files so developer agents don't suffer from context rot.

## Agent-First Development & Refactoring Tools (The Agent's Workbench)

Tools explicitly designed for agents to execute code edits deterministically, replacing human-centric IDE workflows.

- **AIDE (Agent Interface for Deterministic Editing):** A CLI tool acting as a "structural scalpel" designed _only_ for agents. Instead of human-readable text, it outputs structured JSON and uses native Abstract Syntax Tree (AST) parsers for precision. Most importantly for harness engineering, it features atomic safety: passing the `--verify` flag automatically runs the test suite and instantly auto-reverts all file changes if a single test fails.
- **SuperClaude:** An open-source toolkit that wraps the Claude Code CLI with predefined commands and templates, embodying Smart Command Wrappers (P0-9). It acts as an execution harness that enforces consistent, high-quality interactions (like generating Product Requirement Prompts) and eliminates redundant prompt setup.
- **Cursor and Windsurf:** AI-driven IDEs serving as the transitional bridge. While currently operating as human-driven "AI pair programmers" with inline modifications, their emerging "agent modes" provide the sandboxing and execution environment for future agent-first SDLCs.

## Observability, Telemetry, and Debugging (Verification and Traceability)

Tools that capture the massive volume of non-deterministic traces, evaluate span-level metrics, and ensure agents execute workflows safely.

- **AgentTrace:** A structured logging framework that instruments agents at runtime without code modifications. It captures data across three specific surfaces: _operational_ (execution timing), _cognitive_ (LLM reasoning and planning), and _contextual_ (external tool I/O). It natively exports to OpenTelemetry to link an agent's internal thoughts directly to system-level actions.
- **Maxim AI:** An end-to-end platform built for cross-functional teams. It emphasizes proactive quality assurance by allowing teams to simulate hundreds of agent scenarios before deployment. It provides trace-level evaluations and automated quality checks in production.
- **LangSmith & Langfuse:** LangSmith offers deep integration with LangChain/LangGraph, featuring "Polly," an AI assistant that analyzes traces to suggest prompt improvements, and a CLI tool to pull traces directly into coding agents. Langfuse is an open-source alternative specializing in prompt management, version control, and A/B testing of prompt deployments.
- **Arize (Phoenix and AX) & Comet Opik:** Enterprise-grade platforms unifying LLM observability with traditional ML workflows. Arize uses OpenTelemetry for strict enterprise monitoring, while Comet Opik provides span-level metrics and automated agent optimization algorithms.
- **Watson:** A cognitive observability framework designed specifically to surface implicit reasoning errors and hallucinations without altering the underlying agent architecture.

## Evaluation, Simulation, and Benchmarking (Dynamic Guardrails)

Frameworks that continuously test system capabilities to prevent benchmark overfitting and enforce rigorous deployment gates.

- **Agent-as-a-Judge:** A framework that deploys independent, specialized agentic modules to continuously evaluate other working agents during the task-solving process. This provides fine-grained, dynamic feedback at a fraction of the cost of human evaluation.
- **Benchmark Self-Evolving:** A multi-agent setup that proactively mutates the contexts and questions of existing benchmarks. By dynamically generating new challenges, it forces the harness to prove it hasn't just overfit to static tests.
- **Antithesis & Deterministic Simulation Testing:** Infrastructure that provides deterministic replay and state-space exploration. It allows the CI system to meticulously reconstruct the exact sequence of events leading to an agent's failure, exploring all possible execution paths to ensure reliability before code merges.
- **SWE-bench & mini-SWE-agent:** A highly rigorous benchmark and testing harness used to evaluate an agent's capability to autonomously resolve real-world GitHub issues using standard execution environments.

## Context, Memory, and Agent-Friendly Infrastructure (Inform & Expose)

Systems that guarantee agents possess persistent memory, real-time knowledge, and safe boundaries.

- **AI-Ready APIs:** A new design paradigm emphasizing that APIs are the "hands and feet" of AI agents. Agent-ready APIs prioritize explicit discoverability over implicit conventions, pass rich data objects rather than primitive strings, and provide highly actionable, descriptive error contexts so agents can autonomously self-correct during a ReAct loop.
- **Model Context Protocol (MCP) Servers:** Standardized connectors (like Context7) that provide agents with secure, real-time access to external data, internal tools, and up-to-date knowledge beyond the model's training cutoff.
- **Vector Databases & Distributed State:** Used as long-term memory infrastructure to index past interactions. This allows a multi-agent system to selectively synchronize knowledge without overwhelming individual agents' context windows (preventing "context rot").
- **AGENT.md / CLAUDE.md / .cursorrules (MentorScripts):** Repository-local static files that serve as the project's ground truth. They durably encode architectural specs, style guides, and institutional knowledge directly into the agent's context upon startup, shifting mentorship into version-controlled code.
