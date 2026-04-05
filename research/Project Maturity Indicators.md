# Project Maturity Indicators

> _Canonical framework: `framework/HE Design Decisions.md` | Landing pathway: `research/Harness Landing Pathway.md`_

Three alternative indicators to assess project maturity:

## 1. Functional Maturity (Based on the "3-Pillar + 1-Foundation Framework" in `HE Design Decisions.md` | `ANCHORS.md`)

You can divide the project's maturity based on how many of the core areas of harness engineering have been successfully implemented:

- **Foundation - Foundational Infrastructure (Execute):** The harness provides the execution engine: secure bash sandboxes, filesystem & Git workspace, verification (self & collective), Ralph Loops for long-horizon tasks, orchestration logic, escalation policies & audit trails, rippable middleware, harness versioning, smart command wrappers (P0-9), and inter-agent communication (P0-10). This is the prerequisite layer that all pillars build upon.
- **Level 1 - Context Engineering (Inform):** The harness successfully delivers the right information to the agent at the right time. This includes setting up static context (like `AGENTS.md` and architecture specs), dynamic context (like real-time CI/CD status via observability/dashboards), and ensuring the repository acts as the single source of truth.
- **Level 2 - Architectural Constraints (Constrain):** The harness moves beyond simply giving the agent instructions and begins **mechanically enforcing boundaries**. This level is achieved when deterministic linters, structural tests, and LLM-based auditors are actively preventing the agent from exploring dead ends or violating dependency rules.
- **Level 3 - Entropy Management (Maintain):** The highest functional level, where the system maintains its own health over time. This is achieved by deploying periodic cleanup agents that run on schedules to automatically fix documentation drift, resolve circular dependencies, and enforce coding patterns.

## 2. Level of Automation (Based on Real-World Approaches)

You can categorize the project based on how autonomous the execution pipeline has become, drawing on examples from industry leaders:

- **Modular / Middleware Level:** The harness utilizes composable middleware layers (such as loop detection or self-verification) to assist the agent and improve its reasoning, though humans likely still manage the overarching task lifecycle.
- **Total Pipeline Automation:** The harness handles the entire lifecycle of a task independently. At this level, (similar to Stripe's "Minion" agents), a human assigns a task, and the harness autonomously manages the agent as it writes code, passes continuous integration (CI) tests, and opens a pull request, with **zero human interaction** in between.
- **Zero Human Code Level:** The ultimate maturity stage, where humans stop writing code entirely. Similar to OpenAI's application development, the harness is so robust that agents write 100% of the codebase, and engineers solely focus on designing the architecture and specifying intent.

## 3. The Evolution of the Human Role

Finally, you can measure the harness's maturity by looking at how the daily jobs of the software engineers on the project have changed:

- **Baseline:** Engineers are primarily writing code, writing tests, and maintaining documentation as an afterthought.
- **Transition:** Engineers are spending less time writing code and more time debugging agent behavior patterns and reviewing agent-generated pull requests.
- **Mature:** Engineers operate purely as system architects—their primary job is designing the environments where AI writes code, designing test strategies for agents to execute, and treating documentation as critical, machine-readable infrastructure.
