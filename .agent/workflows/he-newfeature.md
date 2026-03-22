---
description: Add a new Harness Engineering feature, rebuild skills, and feedback to project docs
---

# Harness Engineering Feature Addition Workflow (`/he-newfeature`)

This workflow automates the end-to-end process of adding a new feature to the Harness Engineering (HE) framework. It updates the core `harnessing-agents` skill files, verifies consistency, and propagates changes to all canonical documentation in `HarnessEngineeringLab`.

## Prerequisites

The user must provide:

1. The **name** of the new feature.
2. The **Pillar** or Foundation it belongs to (P1=Context, P2=Constraints, P3=Entropy, F=Foundation).
3. A short description of the **Actions** and **Tools** associated with the feature.
4. Any specific prevention points or assessment questions.

## Workflow Steps

// turbo-all

### Step 1: Update Core `harnessing-agents` Skill Files

Modify the authoritative skill files in `~/.gemini/antigravity/skills/harnessing-agents/`:

- **`SKILL.md`**: Increment the total feature count (e.g., 23→24). Add the new feature to the appropriate Pillar's feature list with a one-line definition. If SAS→MAS implications exist, add a readiness note in the SAS→MAS section.
- **`enhancement-options.md`**: Increment the total feature count in the header. Insert the new feature's Actions and Tools under the correct Pillar. Renumber all subsequent features to maintain sequential order.
- **`assessment-checklist.md`**: Increment total feature count and the relevant Pillar's aspect count. Insert a new assessment point with "Look for / If missing / Recommend" structure. Add a row to the Scoring Summary table and update the `Score: ___ / N` denominator and maturity tier boundaries.
- **`prevention-checklist.md`**: Add a new prevention bullet under the relevant Pillar describing what failure modes this feature prevents.

### Step 2: Verify Skill Consistency

Run checks to ensure:

- The feature count is identical across all four skill files.
- Numbering is completely sequential with no gaps or duplicates.
- The Scoring Summary table in `assessment-checklist.md` has the correct number of rows.
- Markdown formatting is clean (headings, lists, tables).

### Step 3: Feedback to HarnessEngineeringLab

Propagate the feature additions to all canonical docs in `/Users/macbook1/work/HE/HarnessEngineeringLab/HESkill/`:

#### 3a. Core Feature Lists

- **`Core Features for SAS.md`**: Add a summary bullet under the relevant Pillar.
- **`Core Features for MAS.md`**: Add a MAS-adapted summary bullet (e.g., shared/collaborative version) under the relevant Pillar.

#### 3b. Enhancement Options & Prevention

- **`HE Enhancement Options.md`**: Insert the new feature's Actions and Tools section. Renumber subsequent features if needed.
- **`HE Prevention Checklist.md`**: Add a prevention bullet under the relevant Pillar section.

#### 3c. Gap Evaluation Framework

- **`HE Gap Evaluation Framework.md`**: This requires multiple updates:
  - **Part 2 — Feature Gap Analysis**: Insert a new `#### P{X}-{N}. {Feature Name}` entry with: Gap Signals (observable symptoms), Improvement Policies table (Tier/Action/Dimension), and Dependencies map.
  - **Part 3 — Cross-Cutting Perspectives**: If the feature saves or costs tokens, add it to the Token Economics table (Perspective B). If it has SAS→MAS implications, add a row to the SAS→MAS Readiness table (Perspective D).
  - **Part 4 — Composite Scoring**: Update the feature count in the scoring matrix description (e.g., "23×6 matrix" → "24×6 matrix").
  - **Part 5 — Quick-Start Checklist**: Add a checkbox item under the relevant Pillar section.

#### 3d. Execution Procedure

- **`HE Execution Procedure.md`**: This requires multiple updates:
  - **Header**: Update the total feature count in the introductory paragraph.
  - **Phase 1 Inspection Tasks**: Add a numbered inspection step for the new feature in the relevant Task (e.g., Task 1.2 for Pillar 1 features) with the format: `N. Check for **{Feature}** (P{X}-{N}): {What to look for}?`
  - **Phase 2 Scoring Tasks**: Update the scoring task range heading (e.g., "P1-1 to P1-8" → "P1-1 to P1-9") and adjust the context estimate line count.

#### 3e. Comments Directory (if applicable)

- Scan `comments/` for high-level docs that reference feature counts or Pillar breakdowns (e.g., `HE Big Picture.md`, `Harness Assessment Sheet.md`, `Harness Function Areas.md`, `Mature Harness Features.md`). Update feature counts and insert the new feature into appropriate text blocks or checklists.

### Step 4: Summarize Changes

Generate a final report listing all modified files across both locations:

- `~/.gemini/antigravity/skills/harnessing-agents/` (4 skill files)
- `/Users/macbook1/work/HE/HarnessEngineeringLab/HESkill/` (6+ canonical docs)
- Any files updated in `comments/`

Include a per-file summary of what was changed (added, renumbered, count updated).
