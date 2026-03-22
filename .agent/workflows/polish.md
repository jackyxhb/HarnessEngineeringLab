---
description: Inspirate new or weak Harness Engineering features, expand their definitions, and integrate the insights
---
# /polish — Feature Polishing & Addition Workflow

Run this workflow when you encounter a new architectural requirement, a powerful organizational concept, or a "weak" existing feature that needs to be escalated or enriched within the Harness Engineering (HE) framework. This workflow handles both the conceptual design (polishing) and the mechanical execution of adding or updating features.

## Phase 1: Inspiration & Mapping
1. **Identify the Gap/Insight:** What new behavior or rule is the user proposing? 
2. **Determine Target:** Decide whether to enrich an *existing* feature (e.g., modifying F2) or create a *new* core feature (e.g., adding P1-9). Let the user decide if ambiguous.
   - *Constraint Rules:* The framework aims to be bounded. Prefer enriching existing features unless the new concept is distinctly different and occupies a higher architectural level.

## Phase 2: Execution (Drafting)
1. **Draft the Enhancements:** Formulate the new definitions:
   - **Guideline:** The core definition.
   - **Expectations (Todo/Don't Do):** Concrete mechanical steps & Actions/Tools.
   - **Remediations (Gap Signals & Policies):** How to detect absence and how to fix it.
   - **SAS→MAS Implications:** How the feature scales to multi-agent environments.
2. **Present the Draft:** Present an implementation plan detailing the precise text additions and files to be updated.

## Phase 3: Propagation (Integration)

// turbo-all

Once the draft is approved, rigorously apply it across the canonical definitions depending on if it is an enrichment or a new feature.

### Path A: Enriching an Existing Feature
Selectively update the relevant sections of:
- `~/.gemini/antigravity/skills/harnessing-agents/` skill files.
- `/Users/macbook1/work/HE/HarnessEngineeringLab/framework/` docs.
Verify the framework remains sequentially numbered and consistent overall.

### Path B: Adding a New Feature
Follow these exact steps to ensure absolutely no file gets missed and the canonical feature count increments gracefully:

#### Step 1: Update Core `harnessing-agents` Skill Files
Modify the authoritative skill files in `~/.gemini/antigravity/skills/harnessing-agents/`:
- **`SKILL.md`**: Increment the total feature count. Add the new feature to the appropriate Pillar's feature list with a one-line definition. If SAS→MAS implications exist, add a readiness note.
- **`enhancement-options.md`**: Increment the total feature count in the header. Insert the new feature's Actions and Tools under the correct Pillar. Renumber all subsequent features.
- **`assessment-checklist.md`**: Increment total feature count and the relevant Pillar's aspect count. Insert a new assessment point. Add a row to the Scoring Summary table and update the `Score: ___ / N` denominator and maturity tier boundaries.
- **`prevention-checklist.md`**: Add a new prevention bullet under the relevant Pillar describing what failure modes this feature prevents.

#### Step 2: Feedback to HarnessEngineeringLab Canonical Docs
Propagate the feature additions to all canonical docs in `/Users/macbook1/work/HE/HarnessEngineeringLab/framework/`:
- **Core Feature Lists**: Update `Core Features for SAS.md` & `Core Features for MAS.md` with a summary bullet.
- **Enhancement Options & Prevention**: Insert the new Actions/Tools in `HE Enhancement Options.md`. Add a prevention bullet in `HE Prevention Checklist.md` (if it exists).
- **HE Gap Evaluation Framework**: 
  - Part 2 (Feature Gap Analysis): Insert Gap Signals, Improvement Policies, and Dependencies map.
  - Part 3 (Cross-Cutting): Update Token Economics (if applicable) and SAS→MAS Readiness table.
  - Part 4 (Composite Scoring): Update the scoring matrix description.
  - Part 5 (Quick-Start Checklist): Add a checkbox item.
- **HE Execution Procedure**: 
  - Header: Update the total feature count in the introductory paragraph.
  - Phase 1 & 2: Add inspection steps and update scoring task ranges/context estimates.
- **Research Directory**: Scan `research/` for high-level docs referencing feature counts or Pillar breakdowns and update them.

#### Step 3: Verify Skill Consistency & Reconcile
- Run checks to ensure the feature count is identical across all skill files and canonical docs.
- Ensure numbering is completely sequential with no gaps or duplicates.
- Ensure the Scoring Summary table in `assessment-checklist.md` has the correct number of rows.

#### Step 4: Summarize Changes
Generate a final report listing all modified files across both locations and what was changed.
