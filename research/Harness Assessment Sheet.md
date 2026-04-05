# AI Agent Harness Assessment Sheet

> _Canonical framework: `framework/HE Core Features.md` | Gap evaluation: `framework/HE Gap Evaluation Framework.md`_

## Foundational Infrastructure (Execute)

_Evaluates the safety of the agent's execution environment and its ability to correct its own mistakes._

- **Sandboxing:** Is the agent provided with a secure, on-demand, isolated execution environment (sandbox) pre-configured with language runtimes and CLIs?
- **General-Purpose Tooling:** Does the agent have access to a general-purpose bash tool and browser to execute code and solve problems autonomously?
- **Verification (Self & Collective):** Is there a feedback loop that allows the agent to write code, run the test suite, read the error logs, and autonomously attempt fixes before task completion?
- **Long-Horizon Execution:** Does the harness utilize mechanisms like the **"Ralph Loop"** (intercepting an exit attempt and reinjecting the prompt with the previous state into a fresh context window) to force the agent to complete complex, multi-step goals?
- **Orchestration Logic:** Does the harness manage the routing of tasks, spawning subagents, and handling task handoffs?
- **Escalation Policies & Audit Trails:** Are there automated triggers and routing for when an agent gets stuck and requires human intervention?
- **Rippable Middleware:** Are there composable middleware layers (like loop detection) that can be updated or removed as AI models improve?
- **Harness Versioning:** Can the harness be version-controlled and A/B tested to discover optimal configurations?
- **Smart Command Wrappers (P0-9):** Are common multi-step CLI workflows (e.g., `ccp`, `ccpr`, `reconcile`) standardized via intelligent wrappers that integrate agent reasoning and repository intent?

## Pillar 1: Context Engineering (Inform)

_Evaluates if the agent has the right information at the right time without overloading its context window._

- **Repository as Truth (P1-1):** Is all necessary knowledge (API contracts, design documents) stored directly in the repository rather than in human heads, Slack, or external wikis?
- **Context Compaction & Memory Management (P1-2):** Does the system utilize compaction — intelligently summarizing and offloading older context — to prevent "context rot" as the context window fills up?
- **Tool Offloading (P1-3):** Are large, noisy tool outputs stripped to head/tail tokens, with full results stored on the filesystem for later access?
- **Progressive Skills (P1-4):** Are tools loaded on-demand based on the agent's current task, rather than all at startup?
- **Observability / Dashboards (P1-5):** Is telemetry integrated so that agents can access real-time CI/CD statuses and human engineers can monitor agent behavior patterns?
- **Web Search & MCP Integration (P1-6):** Can the agent access real-time external data beyond its training cutoff via web search or MCP servers?
- **Planning, Task Lists & Blackboards (P1-7):** Does the agent decompose complex tasks into plan files with step-by-step breakdowns and injected reminders?
- **Context Anchoring (P1-8):** Are critical decisions recorded to persistent memory files (what, why, target, background) and recalled at session start?
- **Branch-Based Cognitive Memory (P1-9):** Are complex objectives decomposed into concurrent sub-task branches with structured commit messages acting as memory checkpoints?
- **Requirements Ledger (P1-10):** Are all user stories, requirements, and functional scenarios captured in a unified ledger document before planning or execution begins?

## Pillar 2: Architectural Constraints (Constrain)

_Evaluates how well the harness mechanically restricts the agent's solution space to prevent it from exploring dead ends._

- **Automated Linters & Tests:** Are there deterministic linters, structural tests, and pre-commit hooks in place to automatically flag violations?
- **Dependency Layering:** Does the harness mechanically enforce dependency rules (e.g., restricting which layers can import from others) via CI validation?
- **AI Auditors & Collaboration Channels:** Are there secondary agents specifically tasked with reviewing the primary agent's output for architectural compliance?
- **Bounded Autonomy (P2-4):** Are there explicit scope boundaries and access controls defining how far an agent can go without human escalation?
- **Upstream Intake Gate (P2-5):** Is there a mandatory validation step ensuring requirements are recorded in the Requirements Ledger before planning and execution proceed?

## Pillar 3: Entropy Management (Maintain)

_Evaluates the system's ability to maintain codebase health over time as AI generates more code._

- **Scheduled Cleanups:** Are there periodic cleanup agents running on a schedule (daily, weekly, or event-triggered)?
- **Documentation Sync:** Do dedicated agents actively verify that repository documentation matches the current state of the code?
- **Pattern Auditing:** Does the system automatically track and resolve circular dependencies, dead code, or deviations from established coding patterns?
- **Consolidation Loop:** Does the system mechanically run a consolidation loop to auto-update system counts, accumulate changelogs, and track issue history?

---

## Project Maturity Scoring

You can measure the overall progress of your harness project by determining which level it currently satisfies:

- **Level 1: Basic Harness (Single Developer)**
  - _Criteria:_ Has an `AGENTS.md` file (with IDE shims like `CLAUDE.md` or `.cursorrules`), basic pre-commit hooks, a runnable test suite for self-verification, and a clean directory structure.
- **Level 2: Team Harness (Small Team)**
  - _Criteria:_ Includes Level 1, plus an `AGENTS.md` for team conventions, CI-enforced architectural constraints, shared prompt templates, and agent-specific code review checklists.
- **Level 3: Production Harness (Enterprise/Org)**
  - _Criteria:_ Includes Level 2, plus custom middleware (like loop detection), observability integration, scheduled entropy management agents, A/B testing for the harness, and escalation policies for stuck agents.

> _See also: `framework/HE Gap Evaluation Framework.md` Part 5 for a comprehensive quick-start evaluation checklist._
