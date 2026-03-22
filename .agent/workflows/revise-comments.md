---
description: Revise comments documents to be consistent with HESkill
---

# Revise Comments for HESkill Consistency

This workflow processes each document in the `research/` folder one by one, comparing it against the canonical framework documents, finding conflicts, and fixing them.

## Prerequisites

1. Read the framework source-of-truth documents:
   - `framework/Core Features for SAS.md` — the canonical **3-Pillar + 1-Foundation** framework for Single Agent Systems
   - `framework/Core Features for MAS.md` — the canonical framework for Multi-Agent Systems

2. Internalise the canonical structure before processing any comments:
   - **Foundation:** Foundational Infrastructure (SAS: "Verify & Correct" / MAS: "Execute, Orchestrate & Verify")
     - Contains: Bash Sandboxes, Filesystem & Git, Self-Verification, Ralph Loops, Orchestration Logic, Rippable Middleware, Escalation Policies, Harness Versioning
   - **Pillar 1:** Context Engineering (SAS: "Inform" / MAS: "Inform & Synchronize")
     - Contains: Repository as Truth, Context Compaction, Tool Offloading, Progressive Skills, Observability/Dashboards, Web Search & MCP, Planning & State Files
   - **Pillar 2:** Architectural Constraints (SAS: "Constrain" / MAS: "Constrain & Protect")
     - Contains: Automated Linters, Dependency Enforcement, AI Auditors
   - **Pillar 3:** Entropy Management (SAS: "Maintain" / MAS: "Maintain & Reconcile")
     - Contains: Scheduled Cleanups, Documentation Sync, Pattern Auditing

## Workflow Steps

// turbo-all

1. List all files in the `research/` folder.

2. For EACH document in `research/`, process ONE AT A TIME in sequence:

   a. Read the document fully.

   b. Compare it against the canonical framework. Look for these specific conflict types:
   - **Wrong structure**: Using a different number of sections/pillars than 3-Pillar + 1-Foundation (e.g., 5 areas, 6 sections)
   - **Wrong placement**: Features placed in the wrong pillar/foundation (e.g., Observability outside Pillar 1, Escalation outside Foundation, Sandboxes as a separate pillar)
   - **Wrong naming**: Section headings using different names or verbs than the canonical ones
   - **Mixed categories**: A single section combining items from different pillars
   - **Missing Foundation**: Not recognising Foundation as a separate area from the Pillars
   - **Standalone Observability**: Having Observability as its own section instead of under Pillar 1

   c. If the document is a **framework/structure document** (defines or categorises harness features into areas), fix the conflicts by restructuring to match 3-Pillar + 1-Foundation.

   d. If the document is a **principles/essay/example document** (doesn't define framework structure), check that any referenced concepts are consistent with framework terminology. These documents typically have no conflicts — note them as clean and move on.

   e. Only fix conflicts — do NOT rewrite content that is consistent. Preserve the document's unique insights and details.

   f. After fixing (or confirming no conflicts), move to the next document.

3. After all conflict fixes are done, rename each file in `research/` with a short, straightforward, and concise name (max 5 words) that reveals the core content of the file. Rules:
   - Use Title Case with spaces (e.g., `HE Big Picture.md`)
   - Use `HE` prefix for general Harness Engineering docs
   - Use `MAS` prefix for multi-agent specific content
   - Do not exceed 5 words in the filename
   - Rename via `mv` command

4. After all documents are processed, report a summary of:
   - Which documents had conflicts and what was fixed
   - Which documents had no conflicts
   - Old → New filename mapping for any renames
