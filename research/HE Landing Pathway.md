# HE Landing Pathway

> _Canonical framework: `framework/HE Design Decisions.md` | Execution procedure: `framework/HE Execution Procedure.md`_

The practical pathway to landing a harness in a real project generally follows three maturity levels:

## Step 1: The Basic Harness (Single Developer Level)

The first step takes only 1-2 hours to set up and focuses on preventing the most common mistakes an AI agent will make on an individual project.
At this stage, the pathway involves setting up:

- An `AGENTS.md` file to establish basic project conventions (with IDE shims like `CLAUDE.md`, `.cursorrules`, or `.windsurfrules` for discovery).
- Basic pre-commit hooks for linting and formatting code.
- A test suite that the agent can execute itself to self-verify its work.
- A clear, consistently named directory structure so the agent can navigate the repository easily.

## Step 2: The Team Harness (Small Team Level)

Once the basic harness is working, the next step (taking about 1-2 days) scales the harness for 3-10 developers sharing a codebase, focusing on consistent agent behavior across the team.
The pathway here involves adding:

- An `AGENTS.md` file that encodes team-wide conventions.
- Architectural constraints that are strictly enforced by Continuous Integration (CI) pipelines.
- "Documentation-as-code" that is validated by linters, ensuring the agent always has access to the most up-to-date specs.
- Shared prompt templates for common tasks and specific code review checklists tailored for agent-generated Pull Requests.

## Step 3: The Production Harness (Engineering Organization Level)

The final stage transforms the harness into an enterprise-grade system that allows dozens of concurrent agents to operate as autonomous contributors. Setting this up typically takes 1-2 weeks.
The pathway to production involves integrating:

- **Custom Middleware Layers:** Implementing specific logic like loop detection (to stop agents getting stuck in "doom loops") or reasoning optimization.
- **Entropy Management:** Deploying scheduled cleanup agents that run automatically to track and resolve dead code, update documentation, and enforce patterns.
- **Observability and Tooling:** Integrating dashboards to monitor agent performance, allowing agents to read logs and metrics, and establishing escalation policies for when agents get stuck.
- **Harness A/B Testing:** Versioning the harness to test which configurations yield the most productive agent output.

## Guiding Principles for the Journey

As you progress along this pathway, there are a few critical rules to follow to ensure the harness actually works in reality:

- **Repository-First Documentation:** You must forcefully move all architectural decisions, naming conventions, and deployment processes out of Slack, Google Docs, or human heads, and place them directly into the repository. From the agent's perspective, anything it cannot access in its context window does not exist.
- **Build "Rippable" Harnesses:** Do not over-engineer the control flow. AI models improve rapidly, and a highly complex pipeline built today might break when the next model update is released. Your harness should be modular so that "smart" logic can be easily ripped out once the underlying model gets smart enough to handle the task natively.
- **Ensure a Feedback Loop:** A harness without feedback is just a cage. The agent must have self-verification steps before task completion and access to test execution results so it can learn when it is succeeding or failing.
