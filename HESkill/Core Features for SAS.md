# Core Features for SAS - Single Agent Systems

## Pillar 1: Context Engineering (Inform)

*The largest pillar. This encompasses everything related to managing what the model sees, its memory, its durable storage, and its real-time knowledge.*

* **Repository as Truth:** Encoding all project rules and static context directly into the codebase, eliminating reliance on human-only knowledge.
* **Context Compaction:** Intelligently summarizing and offloading older context to prevent the agent's context window from filling up ("context rot").
* **Tool Offloading:** Stripping noisy tool outputs to keep only the head and tail tokens in context, while storing the full results.
* **Progressive Skills:** Loading specific tool logic into context only when needed via progressive disclosure.
* **Observability / Dashboards:** Serving as "Dynamic Context," giving the agent real-time access to logs, metrics, traces, and CI/CD pipeline statuses.
* **Web Search & MCP Integration:** Utilizing external search and Model Context Protocol (MCP) tools to access up-to-date information beyond the model's training cutoff.
* **Planning & State Files:** Using the filesystem to store plan files and injecting reminders into the context so the agent can decompose goals and stay on track.

## Pillar 2: Architectural Constraints (Constrain)

*This pillar mechanically enforces what good code looks like so the agent doesn't waste tokens exploring dead ends.*

* **Automated Linters:** Deterministic rules and pre-commit hooks that automatically flag and reject non-compliant code.
* **Dependency Enforcement:** Structural tests that mechanically restrict which architectural layers the agent can import from.
* **AI Auditors:** Secondary LLM-based agents specifically tasked with reviewing the primary agent's output for architectural compliance.

## Pillar 3: Entropy Management (Maintain)

*Also known as "Garbage Collection," this pillar manages the health of the codebase over time as AI generates more code.*

* **Scheduled Cleanups:** Dedicated cleanup agents (like constraint violation scanners) running on daily or weekly schedules to catch code that slipped past earlier checks.
* **Documentation Sync:** Agents that actively verify and update project documentation so it matches the current, living state of the code.
* **Pattern Auditing:** Agents that track and resolve circular dependencies, dead code, or deviations from established coding patterns.

---

## Foundational Infrastructure (Execute)

*It is the execution engine and orchestration layer that the harness is built upon.*

* **Bash Sandboxes:** Secure, on-demand execution environments equipped with language runtimes, test runners, and a general-purpose bash tool.
* **Filesystem & Git Workspace:** The core primitive for durable storage, version control, and a shared collaboration surface for multiple agents.
* **Self-Verification:** Feedback loops allowing agents to write code, run tests, inspect logs, and autonomously fix their errors before completion.
* **Ralph Loops:** Execution hooks that intercept an agent's exit attempt and reinject the prompt alongside previous state to force the completion of long-horizon tasks.
* **Orchestration Logic:** The routing layer responsible for spawning subagents, handling task handoffs, and managing multi-agent teams working in parallel.
* **Rippable Middleware:** Composable middleware layers that add specific capabilities but can be easily removed as underlying AI models improve.
* **Escalation Policies:** Automated triggers and routing systems for when an agent gets stuck and requires human intervention.
* **Harness Versioning:** The ability to version control the harness and run A/B tests to discover the most productive configurations.
