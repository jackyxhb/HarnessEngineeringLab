# Core Features: Foundation (Execute)

The Foundational Infrastructure provides the secure execution engine and orchestration layer that the rest of the harness is built upon.

## F1. Bash Sandboxes
* **Guideline:** Secure, on-demand execution environments equipped with language runtimes, test runners, and isolation.
* **Expectations:** Provision isolated containers per session. Never run agent code directly on local dev machine.
* **Remediation:**
  * [Tier 1] Provision isolated environments.
  * [Tier 2] Add visual monitoring; auto-scale sandbox pools.

## F2. Filesystem & Git Workspace
* **Guideline:** The core primitive for durable storage, version control, and collaboration.
* **Expectations:** Ensure every session works within a Git-tracked workspace. Implement per-task branches.
* **Remediation:**
  * [Tier 1] Implement per-agent worktrees or branches.
  * [Tier 2] File locking for shared MAS workspaces; rollback automation.

## F3. Self-Verification
* **Guideline:** Grounding solutions in tests. Enables agents to autonomously fix errors before completion.
* **Expectations:** Wire test execution into the completion flow. Pipe error logs back into context.
* **Remediation:**
  * [Tier 1] Make test passes a gating criteria for task finalization.
  * [Tier 2] Add pre-completion checklists.

## F4. Ralph Loops
* **Guideline:** Execution hooks that intercept premature exits and reinject the prompt to force completion.
* **Expectations:** Intercept exits and reinject prompt with state summaries into fresh contexts.
* **Remediation:**
  * [Tier 1] Build prompt reinjection with state summaries.
  * [Tier 2] Set max-retry limits (loop budgets).

## F5. Orchestration Logic
* **Guideline:** Routing layer for spawning subagents, managing handoffs, and managing topology.
* **Expectations:** Shift from simple routing to dynamic topology management (Supervisor, Swarm).
* **Remediation:**
  * [Tier 1] Implement basic supervisor pattern.
  * [Tier 2] Add context-preserving handoffs and dynamic topology switching.

## F6. Rippable Middleware
* **Guideline:** Composable middleware layers that can be safely removed as models improve natively.
* **Expectations:** Structure harness modularly. Don't hardcode monolithic pipelines.
* **Remediation:**
  * [Tier 1] Refactor harness into independently removable layers.
  * [Tier 2] Use feature flags; audit relevance regularly.

## F7. Escalation Policies
* **Guideline:** Automated triggers routing stuck agents to human intervention.
* **Expectations:** Maintain strict audit logs of actions. Route explicitly stuck tasks to humans.
* **Remediation:**
  * [Tier 1] Define strict triggers (N failures, timeouts).
  * [Tier 2] Implement tiered escalation (retry → peer agent → human).

## F8. Harness Versioning
* **Guideline:** Version controlling the harness to A/B test infrastructure configurations.
* **Expectations:** Track prompts, tools, and middleware in VCS.
* **Remediation:**
  * [Tier 1] Version-control complete harness configuration natively.
  * [Tier 2] Build A/B testing pipelines tracking agent performance per config.
