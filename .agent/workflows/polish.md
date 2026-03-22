---
description: Inspirate new or weak Harness Engineering features, expand their definitions, and integrate the insights
---

# /polish — Feature Polishing Workflow

Run this workflow when you encounter a new architectural requirement, a powerful organizational concept, or a "weak" existing feature that needs to be escalated or enriched within the Harness Engineering framework.

## Phase 1: Inspiration & Mapping

1. **Identify the Gap/Insight:** What new behavior or rule is the user proposing? (e.g., using commits as cognitive memory).
2. **Determine Target:** Decide whether to enrich an *existing* feature (e.g., modifying F2) or create a *new* core feature (e.g., adding P1-9). Let the user decide if ambiguous.
   - *Constraint Rules:* The framework aims to be bounded. Prefer enriching existing features unless the new concept is distinctly different and occupies a higher architectural level.

## Phase 2: Execution

1. **Draft the Enhancements:** Formulate the new definitions:
   - **Guideline:** The core definition.
   - **Expectations (Todo/Don't Do):** Concrete mechanical steps.
   - **Remediations (Gap Signals & Policies):** How to detect absence and how to fix it.
   - **SAS→MAS Implications:** How the feature scales to multi-agent environments.
2. **Present the Draft:** Present an implementation plan detailing the precise text additions and files to be updated.

## Phase 3: Propagation

1. **Trigger Infrastructure Update:** Once the draft is approved, rigorously apply it across the canonical definitions.
   - If adding a *new* feature: Manually execute the steps outlined in the `/he-newfeature` workflow to ensure absolutely no file gets missed and the canonical feature count increments gracefully.
   - If enriching an *existing* feature: Selectively update the relevant sections of `harnessing-agents` skill files and `HESkill/` docs.
2. **Reconcile:** Verify the framework remains sequentially numbered and consistent overall.
