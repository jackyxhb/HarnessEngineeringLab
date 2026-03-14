# Core Function Areas of AI Agent Harness

## 1. Context & Memory (Inform)

*This happens first.* Before the agent can take any action, it must understand the environment, the goal, and the codebase.

* **Repository as Truth:** The agent reads project-specific rules (`AGENTS.md`) and architecture specs.
* **Progressive Skills & Context Compaction:** The harness loads necessary tools and summarizes past memory so the agent can start with a clean, focused context window.

## 2. Architectural Constraints (Constrain)

*This happens before and during code generation.* Instead of letting the agent guess, the harness restricts its solution space so it doesn't waste time exploring dead ends.

* **Automated Linters & Dependency Enforcement:** Rules mechanically enforce what the agent is allowed to write and which architectural layers it can import from.

## 3. Sandboxes & Feedback (Execute)

*This is the active execution phase.* The agent does the work, checks it, and fixes its own mistakes.

* **Bash Sandboxes & Filesystem:** The agent writes and executes code in a secure, isolated environment.
* **Self-Verification & Ralph Loops:** The agent runs tests, reads error logs, and autonomously attempts fixes. If it tries to quit prematurely, the "Ralph Loop" reinjects the prompt to force it to finish the long-horizon task.

## 4. Observability & Operations (Observe)

*This runs in parallel with execution and immediately after.* The system monitors the agent's progress to ensure it is actually succeeding.

* **Rippable Middleware & Performance Dashboards:** Middleware tracks the agent's file edits to prevent it from getting stuck in "doom loops". Telemetry lets human engineers analyze the agent's behavior.
* **Escalation Policies:** If the agent fails its self-verification too many times, the harness routes the task to a human.

## 5. Entropy Management (Maintain)

*This happens last, continuously over time.* After tasks are completed and pull requests are merged, AI-generated codebases naturally accumulate "entropy" or technical debt.

* **Scheduled Cleanups & Documentation Sync:** Dedicated agents run on daily or weekly schedules to automatically fix documentation drift, resolve circular dependencies, and clean up dead code.
