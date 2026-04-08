---
description: Mount a defined Harness Engineering feature as live infrastructure in the workspace
---

# /mount — Feature Mounting Workflow

Run this workflow to transition a defined Harness Engineering feature from a theoretical concept (in `framework/`) to live, active infrastructure within the repository workspace.

A feature is considered "mounted" when it has physical artifacts (files, directories), recall hooks in canonical agent entry points (`CLAUDE.md`), and a maintenance workflow to sustain it over time.

## Phase 1: Feature Comprehension & Design

1. **Identify the Feature:** Prompt the user for the feature ID (e.g., `P1-8` Context Anchoring) or name to mount.
2. **Review Canonical Definitions:** Read the feature's definition in `harnessing-agents/SKILL.md` and the feature's modular file in `framework/features/`. Pay close attention to its "Improvement Policy," "Actions," and "Tools".
3. **Design the Live Infrastructure:** Determine the physical requirements for the feature:
   - What new files or directories need to exist? (e.g., `ANCHORS.md`)
   - What data format/schema does the feature require?
   - What are the required "Recall Hooks" that force an agent to interact with this feature? (e.g., instructions in `CLAUDE.md`).
4. **Present the Mount Plan:** Generate an implementation plan detailing the files to create, the hooks to inject, and the maintenance workflow to build. Get user approval before executing.

## Phase 2: Execution

1. **Create the Primary Assets:** Create the necessary root files, directories, or templates as defined in the plan.
2. **Seed the Infrastructure (If applicable):** Populate the new feature with initial data extracted from historical commits, existing code, or previous architectural decisions so the feature is immediately useful.
3. **Inject Recall Hooks (`CLAUDE.md`):** Modify `CLAUDE.md` to explicitly instruct agents on _when_ and _how_ to use this new feature. Hook placement is critical: put it where agents reading `CLAUDE.md` cannot miss it.
4. **Create the Maintenance Workflow:** Create a dedicated `.agent/workflows/[feature].md` script. This script must define how future agents add to, review, and prune the feature's data to prevent entropy.
   - Example: The `/anchor` workflow for Context Anchoring.
5. **Update `README.md`:** Add the new primary assets or workflows to the Repository Structure and Key Concepts sections of the README.

## Phase 3: Verification

1. **Verify Asset Formatting:** Ensure all generated tracking/state files match their designed schemas.
2. **Verify Hook Presence:** Run a grep search to confirm the recall hooks exist in `CLAUDE.md`.
3. **Verify Workflow Discovery:** Confirm the new maintenance workflow is correctly placed in `.agent/workflows/` and has a valid description in its frontmatter.
4. **Generate Walkthrough:** Provide a markdown walkthrough documenting the successful mount, detailing exactly what live infrastructure was added to the workspace.
