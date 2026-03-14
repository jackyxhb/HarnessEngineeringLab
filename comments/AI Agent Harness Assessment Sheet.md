# AI Agent Harness Assessment Sheet

## 1. Context Engineering & Memory Management

*Evaluates if the agent has the right information at the right time without overloading its context window.*

* **Single Source of Truth:** Is all necessary knowledge (API contracts, design documents) stored directly in the repository rather than in human heads, Slack, or external wikis?
* **Static Context:** Are project-specific rules explicitly encoded in configuration files (e.g., `AGENTS.md`, `CLAUDE.md`) and validated by linters?
* **Dynamic Context:** Can the agent easily access real-time observability data, directory structures, and CI/CD pipeline statuses?
* **Context Rot Prevention:** Does the system utilize **compaction** (intelligently summarizing and offloading older context) and **tool call offloading** (storing large, noisy tool outputs in the filesystem) to keep the context window clean?

## 2. Architectural Constraints & Enforcement

*Evaluates how well the harness mechanically restricts the agent's solution space to prevent it from exploring dead ends.*

* **Automated Linters & Tests:** Are there deterministic linters, structural tests, and pre-commit hooks in place to automatically flag violations?
* **Dependency Layering:** Does the harness mechanically enforce dependency rules (e.g., restricting which layers can import from others) via CI validation?
* **LLM-Based Auditors:** Are there secondary agents specifically tasked with reviewing the primary agent's output for architectural compliance?

## 3. Execution Environments & Feedback Loops

*Evaluates the safety of the agent's workspace and its ability to correct its own mistakes.*

* **Sandboxing:** Is the agent provided with a secure, on-demand, isolated execution environment (sandbox) pre-configured with language runtimes and CLIs?
* **General-Purpose Tooling:** Does the agent have access to a general-purpose bash tool and browser to execute code and solve problems autonomously?
* **Self-Verification:** Is there a feedback loop that allows the agent to write code, run the test suite, read the error logs, and autonomously attempt fixes before task completion?
* **Long-Horizon Execution:** Does the harness utilize mechanisms like the **"Ralph Loop"** (intercepting an exit attempt and reinjecting the prompt with the previous state into a fresh context window) to force the agent to complete complex, multi-step goals?

## 4. Entropy Management ("Garbage Collection")

*Evaluates the system's ability to maintain codebase health over time as AI generates more code.*

* **Scheduled Cleanups:** Are there periodic cleanup agents running on a schedule (daily, weekly, or event-triggered)?
* **Documentation Consistency:** Do dedicated agents actively verify that repository documentation matches the current state of the code?
* **Pattern & Dependency Auditing:** Does the system automatically track and resolve circular dependencies, dead code, or deviations from established coding patterns?

---

## Project Maturity Scoring

You can measure the overall progress of your harness project by determining which level it currently satisfies:

* **Level 1: Basic Harness (Single Developer)**
  * *Criteria:* Has a `.cursorrules` or `CLAUDE.md` file, basic pre-commit hooks, a runnable test suite for self-verification, and a clean directory structure.
* **Level 2: Team Harness (Small Team)**
  * *Criteria:* Includes Level 1, plus an `AGENTS.md` for team conventions, CI-enforced architectural constraints, shared prompt templates, and agent-specific code review checklists.
* **Level 3: Production Harness (Enterprise/Org)**
  * *Criteria:* Includes Level 2, plus custom middleware (like loop detection), observability integration, scheduled entropy management agents, A/B testing for the harness, and escalation policies for stuck agents.
