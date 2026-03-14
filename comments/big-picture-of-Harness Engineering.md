# Big picture for Harness Engineering

## 1. The Starting Point: The Core Engine (Foundational Infrastructure)

Before an agent can do anything, it needs a place to exist and operate. This is your underlying infrastructure layer.

* **Where it fits:** This is the execution environment sitting underneath all other pillars.
* **The Features in Action:** The agent is dropped into a secure **Bash Sandbox** with a durable **Filesystem & Git Workspace** to track its work. **Orchestration Logic** manages the routing of tasks (perhaps handing work off to sub-agents). If the agent fails, **Self-Verification** and **Ralph Loops** force it to keep trying to fix its own errors, while **Escalation Policies** alert human engineers if it gets permanently stuck. Meanwhile, the human team uses **Harness Versioning** and **Rippable Middleware** to test and update this entire engine as AI models improve.

## 2. The Briefing: Context Engineering (Inform)

Once the engine is running, the agent needs to know what to do and how to do it without getting overwhelmed.

* **Where it fits:** This happens at the start of a task and continuously feeds information into the execution engine.
* **The Features in Action:** The agent first reads the **Repository as Truth** to understand project rules. For external or new data, it uses **Web Search & MCP Integration**. Because long tasks generate too much text, **Context Compaction** and **Tool Offloading** constantly clean up its memory, while **Progressive Skills** only loads the specific tools it needs right now. To stay on track for a complex feature, it relies on **Planning & State Files**, and uses **Observability / Dashboards** to read live CI/CD statuses.

## 3. The Guardrails: Architectural Constraints (Constrain)

While the agent is actively writing code in its sandbox, the system must mechanically prevent it from going down the wrong path.

* **Where it fits:** These act as strict boundaries surrounding the execution engine, checking work in real-time.
* **The Features in Action:** As the agent attempts to commit code, **Automated Linters** instantly reject formatting errors, and **Dependency Enforcement** physically blocks it from importing from the wrong architectural layers. Simultaneously, secondary **AI Auditors** review the primary agent's pull request to ensure it didn't violate the project's design philosophy.

## 4. The Aftermath: Entropy Management (Maintain)

After the agent successfully merges its code and the task is complete, the codebase needs long-term care.

* **Where it fits:** This operates in the background, continuously sweeping the repository after the primary execution engine finishes a job.
* **The Features in Action:** AI-generated codebases accumulate mess over time. To fix this, **Scheduled Cleanups** run automatically every night or week. **Documentation Sync** agents ensure that the READMEs and API docs still match the newly merged code, while **Pattern Auditing** agents hunt down dead code and circular dependencies that slipped past the initial guardrails.

## The Big Picture Summary

The **Foundational Infrastructure** provides the safe room and the tools. **Context Engineering** hands the agent its instructions and memory. **Architectural Constraints** build the walls so the agent doesn't wander off. And **Entropy Management** acts as the janitor that cleans up the room after the work is done. Your visual infographic will plot these exact relationships.
