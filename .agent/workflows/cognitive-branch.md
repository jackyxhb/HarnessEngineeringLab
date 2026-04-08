---
description: Spawn tracking branches for sub-tasks, execute work, and merge back to build cognitive memory.
---

# /cognitive-branch — Branch-Based Cognitive Memory Workflow

Run this workflow when faced with a complex task or issue that should not be executed as a monolith. This enforces the **P1-9: Branch-Based Cognitive Memory** feature, ensuring parallelizable task execution and that commit logs form an explicit approval of evidence logic tree.

## Branch Naming Convention

All branches created by this workflow must follow one of these naming patterns so that branch names serve as **machine-readable cognitive addresses**:

- **Task branch:** `task/[issue-id]-[concise-description]`
  - Example: `task/p1-9-branch-name-sensor`
- **Sub-task branch:** `subtask/[parent-name]-[feature]`
  - Example: `subtask/p1-9-naming-validation`

Branches that do not match either pattern will be flagged by the branch-name sensor (pre-commit or CI gate). Non-compliant names break cognitive addressability and prevent automated task-resumption.

## Approval of Evidence Commit Format

Every merge-worthy commit must contain structured evidence. Use this JSON schema in the commit body:

```json
{
  "evidence": {
    "what": "Brief description of what was done",
    "why": "Why this resolves the sub-task correctly",
    "confirmation": "How correctness was verified (test run, lint pass, manual review, etc.)"
  }
}
```

If JSON is too verbose for a simple change, the commit message must still answer all three questions (what / why / confirmation) in plain text.

## Phase 1: Sub-Task Spawning

1. **Breakdown:** Deconstruct the parent task into discrete, atomic sub-tasks.
2. **Branch Creation:** For each sub-task, create a new tracking branch off the current working branch using the naming convention above.
3. **Validation:** The branch-name sensor validates the naming convention before any commit is allowed. If the sensor rejects the name, rename the branch before proceeding.

## Phase 2: Isolated Execution & Commit Memory

1. **Focus:** Fully resolve the sub-task within its isolated branch.
2. **Approval of Evidence Commit:** Once the sub-task is complete, generate a commit using the evidence format above. This commit message acts as the agent's external memory — it must briefly explain _what_ was done, _why_ it resolves the sub-task correctly, and _how_ correctness was confirmed.
3. **Quality Gate:** Run `npm run check` (or equivalent) before merging. Any failure blocks the merge.

## Phase 3: Recursive Merging & Cleanup

1. **Merge Back:** Checkout the parent branch and merge the completed sub-task branch.
   - _Constraint:_ Ensure quality gates pass and no regression was introduced during the merge.
2. **Cleanup:** Delete the merged sub-task branch to prevent stale branch accumulation (P3-1 entropy control).
3. **Repeat:** Repeat identifying and spawning new sub-task branches or merging pending parallel branches until the root task is fully resolved.
4. **Final Root Merge:** Once all sub-tasks are complete and merged to the parent branch, merge the parent branch into the root development branch (e.g., `develop` or `main`) to seal the cognitive memory structure for that interaction.
5. **Final Cleanup:** Delete the parent task branch after the root merge succeeds.
