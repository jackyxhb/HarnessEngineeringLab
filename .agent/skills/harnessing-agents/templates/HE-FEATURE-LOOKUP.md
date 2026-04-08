# HE-FEATURE-LOOKUP

Use this exact shape for Mode 3 (`feature`) responses. Do not replace it with a field/value table or a chain-only dump.

## Feature

- **ID:** [Feature ID, e.g. `P2-3`]
- **Name:** [Canonical feature name]
- **Pillar:** [Foundation | Pillar 1 | Pillar 2 | Pillar 3]
- **Governed By:** [EP-N — principle name]

## Chain

- **L1 Principle:** [Principle text]
- **L2 Enhancement:** [Enhancement text]
- **L3 Design:** [Design summary]
- **L4 Actions:**
  - [Action 1]
  - [Action 2]
- **L4 Prevention:**
  - [Prevention 1]
  - [Prevention 2]
- **L5 Gap Signals:**
  - [Gap signal 1]
  - [Gap signal 2]
- **L5 Measurement:** [Measurement summary]
- **Dependencies:** [Requires/interacts with]

## Current State

[Short repository-state summary grounded in the relevant canonical files. In HELab, this must reflect what `REQUIREMENTS.md`, `PLANS.md`, and `REVIEWS.md` show about the feature today.]

## Next Valid Actions

1. [Concrete next action that is valid from the current state]
2. [Concrete next action that is valid from the current state]
3. [Optional third next action]

## Output Rules

- Do not output a field/value table as the final answer unless the user explicitly requested tabular formatting.
- Do not stop after `Chain`; `Current State` and `Next Valid Actions` are required.
- If HELab already has the feature mounted or hardened, say so in `Current State` and shift `Next Valid Actions` toward delivery refinement, stronger verification, or application in a target project.
- If no target project was named, use generic wording like “apply to a target project.”
- If a target project was named, use that exact name only.
