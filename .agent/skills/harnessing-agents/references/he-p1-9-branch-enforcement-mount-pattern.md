# P1-9 Branch Enforcement Mount Pattern

Canonical remediation pattern for mounting **P1-9 Branch-Based Cognitive Memory** in a target project.

Use this reference during **Phase 3 planning** and **Phase 4 execution** whenever the target project allows agents to execute complex, multi-step objectives in a single unbroken stream on the default branch without checkpointed branch-based progress.

## Goal

Turn the abstract P1-9 requirement into concrete branch-enforcement infrastructure that prevents monolithic task execution and builds traceable cognitive history across context resets.

The minimum viable P1-9 mount has 3 layers:

1. **Agent contract clause** requiring branch-based execution for multi-step work.
2. **Branch naming convention** so branch names serve as machine-readable cognitive addresses.
3. **Merge-before-completion rule** so work flows back to the parent branch through explicit checkpoints.

## Planning Pattern

When writing `.harness/HE-IMPLEMENTATION-PLAN.md`, use a P1-9 entry shaped like this:

- **Remediation Level:** `Light` if agents are already branching for features but the contract does not mandate it or enforce naming conventions.
- **Remediation Level:** `Medium` if agents work on the default branch and the instruction surface needs an explicit branching mandate plus naming convention.
- **Remediation Level:** `Heavy` if the project also needs a workflow definition, pre-commit branch-name validator, or multi-agent dispatch with parallel sub-task branches.
- **Dependencies:** Requires a stable filesystem and Git surface (P0-2). Pairs well with P1-7 Planning for durable plan-per-branch state and P0-3 Verification for pre-merge quality gates.
- **Verification:** must prove that a multi-step task creates a branch before mutating the codebase and that the work merges back through a checkpoint.

## Execution Pattern

### 1. Add the Branch Enforcement Clause to the Agent Contract

Update the target project's canonical instruction surface (`AGENTS.md`, `.cursorrules`, or equivalent) with an explicit mandate:

> **Task Execution & Cognitive Memory:** When given a complex feature, refactor, or multi-step objective, do not execute it in a single unbroken stream on the default branch. Create a task branch before mutating the codebase, commit incremental progress with descriptive messages, and merge back to the parent branch only after verification passes.

Key elements the clause must contain:

- a trigger condition (multi-step or complex work)
- a prohibition (do not work on the default branch for such work)
- a required action (create a task branch first)
- a merge gate (verification must pass before merging back)

### 2. Define the Branch Naming Convention

Add a naming convention to the same instruction surface:

- `task/[issue-id]-[concise-description]` for top-level tasks
- `subtask/[parent-name]-[feature]` for decomposed sub-tasks

The convention must be documented in the agent contract so branch names serve as cognitive addresses — a future agent can infer the task context from the branch name alone.

### 3. Add the Merge Checkpoint

Define what must happen before a task branch merges back:

1. All verification gates pass (link to P0-3 if mounted).
2. Commit messages explain what was done and what evidence confirms correctness.
3. The parent branch receives the merged work through a standard merge or PR flow.

If the project already has a P0-3 verification gate, reference it as the pre-merge requirement rather than duplicating the verification surface.

### 4. Optional: Mount a Workflow or Hook

For projects that need mechanical enforcement beyond contract-level instructions:

- **Workflow definition:** A `/cognitive-branch` or equivalent workflow that agents invoke to partition, execute, and merge sub-tasks.
- **Branch-name validator:** A pre-commit hook or CI check that rejects commits on the default branch when the commit message or changed files indicate multi-step work without a task branch.
- **Plan-per-branch linkage:** Pair with P1-7 so each task branch has a corresponding plan entry that tracks progress, constraints, and blocking issues.

Only mount these if the target project's maturity and complexity justify the overhead.

### 5. Record the Mounted Surface

Record the chosen enforcement clause, naming convention, merge rules, and any new files in `.harness/HE-CHANGE-SUMMARY.md`.

## Verification Pattern

Preferred verification flow:

1. Identify or simulate a multi-step task in the target project.
2. Confirm the agent contract now requires branch creation before execution.
3. Verify the naming convention is documented and discoverable.
4. Confirm the merge checkpoint references the project's verification gate.
5. If a hook or workflow was mounted, test that the default branch rejects unauthorized multi-step commits.

At minimum, prove that the agent contract clause exists and is mechanically discoverable by an agent reading the instruction surface.

## Do Not

- Do not stop at advice like "use branches" without mounting a concrete contract clause.
- Do not require heavyweight workflow infrastructure when a contract-level instruction is sufficient for the target project's complexity.
- Do not mark P1-9 complete if agents can still execute complex multi-step work on the default branch without creating a task branch.
- Do not enforce P1-9 for trivial single-step changes — the trigger condition is multi-step or complex work, not every commit.
- Do not assume the target project uses GitHub PRs — the merge checkpoint should work with whatever merge flow the project uses.
