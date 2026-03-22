---
description: Spawn tracking branches for sub-tasks, execute work, and merge back to build cognitive memory.
---

# /cognitive-branch — Branch-Based Cognitive Memory Workflow

Run this workflow when faced with a complex task or issue that should not be executed as a monolith. This enforces the **P1-9: Branch-Based Cognitive Memory** feature, ensuring parallelizable task execution and that commit logs form an explicit approval of evidence logic tree.

## Phase 1: Sub-Task Spawning

1. **Breakdown:** Deconstruct the parent task into discrete, atomic sub-tasks.
2. **Branch Creation:** For each sub-task, create a new tracking branch off the current working branch.
   - _Format:_ `task/[issue-id]-[concise-description]` or `subtask/[parent-name]-[feature]`

## Phase 2: Isolated Execution & Commit Memory

1. **Focus:** Fully resolve the sub-task within its isolated branch.
2. **Approval of Evidence Commit:** Once the sub-task is complete, generate a crystal-clear, accurate commit message.
   - This commit message acts as the agent's external memory. It must briefly explain _what_ was done and _why_ it resolves the sub-task correctly.

## Phase 3: Recursive Merging

1. **Merge Back:** Checkout the parent branch and merge the completed sub-task branch.
   - _Constraint:_ Ensure tests pass and no regression was introduced during the merge.
2. **Repeat:** Repeat identifying and spawning new sub-task branches or merging pending parallel branches until the root task is fully resolved.
3. **Final Root Merge:** Once all sub-tasks are complete and merged to the parent branch, merge the parent branch into the root development branch (e.g. `develop` or `main`) to seal the cognitive memory structure for that interaction.
