---
description: Add a new Harness Engineering feature, rebuild skills, and feedback to project docs
---

# Harness Engineering Feature Addition Workflow (`/he-newfeature`)

This workflow automates the end-to-end process of adding a new feature to the Harness Engineering (HE) framework. It updates the core `harnessing-agents` skill files, verifies the updates, and propagates the changes back to the canonical documentation in the `HarnessEngineeringLab` project.

## Prerequisites

To use this workflow, the user must provide:
1. The **name** of the new feature.
2. The **Pillar** or Foundation it belongs to.
3. A short description of the **Actions** and **Tools** associated with the feature.
4. Any specific prevention points or assessment questions.

## Workflow Steps

// turbo-all

1. **Update Core `harnessing-agents` Skill Files:**
   Modify the authoritative skill files located in `~/.gemini/antigravity/skills/harnessing-agents/`:
   - `SKILL.md`: Increment the total aspect/feature count and add the new feature to the summary table for the appropriate Pillar.
   - `enhancement-options.md`: Increment feature counts, insert the new feature's Actions and Tools under the correct Pillar, and renumber all subsequent features to maintain sequential order.
   - `assessment-checklist.md`: Increment feature and Pillar aspect counts, insert a new assessment point (Look for / If missing / Recommend), and update the Scoring Summary totals at the bottom.
   - `prevention-checklist.md`: Add a new prevention bullet point emphasizing what failure modes this new feature prevents.

2. **Rebuild & Verify Skill:**
   Run checks to ensure markdown formatting is intact. Verify that aspect counts align across all four core skill files and that numbering is completely sequential without gaps or duplicates.

3. **Feedback to Current Project Activities (HarnessEngineeringLab):**
   Propagate the exact same feature additions to the local `HarnessEngineeringLab` workspace to keep the project's documentation in parity with the core skills:
   - Update `HESkill/HE Enhancement Options.md` (add Actions/Tools, renumber).
   - Update `HESkill/HE Prevention Checklist.md`.
   - Update `HESkill/Core Features for MAS.md` and/or `HESkill/Core Features for SAS.md` by inserting a summary bullet under the relevant Pillar.
   - Scan the `comments/` directory and update relevant high-level docs (e.g., `HE Big Picture.md`, `Harness Assessment Sheet.md`, `Harness Function Areas.md`, `Mature Harness Features.md`) by inserting the new feature into the appropriate Pillar's text block or checklist.

4. **Summarize Changes:**
   Generate a final report detailing all modified files in both the `~/.gemini/antigravity/` skills directory and the local `/Users/macbook1/work/HarnessEngineeringLab/` directory.
