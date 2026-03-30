# Core Features for SAS - Single Agent Systems

## Pillar 1: Context Engineering (Inform)

_The largest pillar. This encompasses everything related to managing what the model sees, its memory, its durable storage, its real-time knowledge, and its strategic continuity._

- **P1-1. Repository as Truth:** Encoding all project rules and static context directly into the codebase, eliminating reliance on human-only knowledge.
- **P1-2. Context Compaction:** Intelligently summarizing and offloading older context to prevent the agent's context window from filling up ("context rot").
- **P1-3. Tool Offloading:** Stripping noisy tool outputs to keep only the head and tail tokens in context, while storing the full results.
- **P1-4. Progressive Skills:** Loading specific tool logic into context only when needed via progressive disclosure.
- **P1-5. Observability / Dashboards:** Serving as "Dynamic Context," giving the agent real-time access to logs, metrics, traces, and CI/CD pipeline statuses.
- **P1-6. Web Search & MCP Integration:** Utilizing external search and Model Context Protocol (MCP) tools to access up-to-date information beyond the model's training cutoff.
- **P1-7. Planning & State Files:** Using the filesystem to store plan files and injecting reminders into the context so the agent can decompose goals and stay on track.
- **P1-8. Context Anchoring:** Syncing critical decision points (what, why, target, background) to persistent memory files so the agent can recall long-term goals and strategy, even across context window resets.
- **P1-9. Branch-Based Cognitive Memory:** Splitting complex objectives into subtasks across concurrent branches, using merges and structured commit messages as functional memory checkpoints.
- **P1-10. Requirements Ledger:** Capturing all incoming user stories, requirements, and functional scenario narratives into a single unified ledger document before any planning or execution begins.

## Pillar 2: Architectural Constraints (Constrain)

_This pillar mechanically enforces what good code looks like so the agent doesn't waste tokens exploring dead ends._

- **P2-1. Automated Linters:** Deterministic rules and pre-commit hooks that automatically flag and reject non-compliant code.
- **P2-2. Dependency Enforcement:** Structural tests that mechanically restrict which architectural layers the agent can import from.
- **P2-3. AI Auditors:** Secondary LLM-based agents specifically tasked with reviewing the primary agent's output for architectural compliance.
- **P2-4. Bounded Autonomy:** Defining explicit scope boundaries and access controls for how far an agent can go without human escalation, preventing unconstrained autonomous drift.
- **P2-5. Upstream Intake Gate:** Mechanically enforcing that all requirement-like artifacts (user stories, functional scenarios, feature requests) are captured in the Requirements Ledger before planning and execution proceed.

## Pillar 3: Entropy Management (Maintain)

_Also known as "Garbage Collection," this pillar manages the health of the codebase over time as AI generates more code._

- **P3-1. Scheduled Cleanups:** Dedicated cleanup agents (like constraint violation scanners) running on daily or weekly schedules to catch code that slipped past earlier checks.
- **P3-2. Documentation Sync:** Agents that actively verify and update project documentation so it matches the current, living state of the code.
- **P3-3. Pattern Auditing:** Agents that track and resolve circular dependencies, dead code, or deviations from established coding patterns.
- **P3-4. Consolidation Loop:** Agents that auto-update core system counts, track issue history, maintain changelogs, and prompt for ADRs to keep central knowledge synchronized with the codebase.

## Foundational Infrastructure (Execute)

_It is the execution engine and orchestration layer that the harness is built upon._

- **P0-1. Bash Sandboxes:** Secure, on-demand execution environments equipped with language runtimes, test runners, and a general-purpose bash tool.
- **P0-2. Filesystem & Git Workspace:** The core primitive for durable storage, version control, and a shared collaboration surface for multiple agents.
- **P0-3. Self-Verification:** Feedback loops allowing agents to write code, run tests, inspect logs, and autonomously fix their errors before completion.
- **P0-4. Ralph Loops:** Execution hooks that intercept an agent's exit attempt and reinject the prompt alongside previous state to force the completion of long-horizon tasks.
- **P0-5. Orchestration Logic:** The routing layer responsible for spawning subagents, handling task handoffs, and managing multi-agent teams working in parallel.
- **P0-6. Rippable Middleware:** Composable middleware layers that add specific capabilities but can be easily removed as underlying AI models improve.
- **P0-7. Escalation Policies:** Automated triggers and routing systems for when an agent gets stuck and requires human intervention.
- **P0-8. Harness Versioning:** The ability to version control the harness and run A/B tests to discover the most productive configurations.
