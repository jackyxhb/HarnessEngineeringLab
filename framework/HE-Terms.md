# HE-Terms

Canonical terminology reference for Harness Engineering.

This file exists to keep the framework vocabulary stable as the delivery layer grows. It distinguishes **framework ontology** from **skill-side execution terminology** where those scopes differ.

## Canonical Framework Terms

### Harness Engineering

The discipline of designing the infrastructure, constraints, and feedback loops around an AI agent so it can operate productively, safely, and self-correctively.

### Foundation

The execution layer of the framework. Foundation features provide the operational substrate that lets agents act: environment isolation, persistence, verification, orchestration, traceability, and other execution-enabling infrastructure.

### Pillar

A top-level functional grouping in the framework. Harness Engineering uses three pillars beyond the Foundation:

- Pillar 1: Context Engineering
- Pillar 2: Architectural Constraints
- Pillar 3: Entropy Management

### Engineering Principle

A first-principles rule (`EP-1` through `EP-18`, with gaps at retired IDs) that governs one or more features. Principles explain _why_ a feature exists and what failure mode it must mechanically prevent.

### Feature

A canonical Harness Engineering capability (`P0-1` through `P3-4`) defined once under `framework/features/`. A feature is the primary unit of framework ontology and carries an L1→L5 chain slice.

### Principle-to-Practice Chain

The five-level chain used to define each feature:

- `L1` Principle
- `L2` Targeted Enhancement
- `L3` Design Decisions
- `L4` Actions / Prevention
- `L5` Measurable Outcome

### Cross-Cutting Concern

A concern that spans multiple features rather than belonging to a single one. Current cross-cutting concerns include Reward Engineering, Token Economics, SAS→MAS Readiness, Prevention Checklist, Evaluation Dimensions, and Cross-Cutting Perspectives.

### Canonical Source

The authoritative source of truth. In HELab, the root `framework/` directory is canonical for Harness Engineering definitions.

### Runtime Mirror

The synchronized bundled copy of the canonical framework shipped under `.agent/skills/harnessing-agents/framework/` so target-project execution does not depend on sibling HELab paths.

## Canonical Procedure Terms

### Harnessing Protocol

The canonical framework procedure in `framework/HE Harnessing Protocol.md` that describes how Harness Engineering is assessed and applied at the framework level.

### Quick Scan

The lightweight assessment pass that checks whether the 32 features are present or absent in a target project.

### Full Audit

The deeper multi-phase audit that moves from scope and gap discovery to planning, execution, and verification.

### Gap Signal

An observable sign that a feature is missing, weak, bypassed, or drifting away from its intended measurable outcome.

### Review-Required Surface

A file or directory that must leave a durable independent review record before merge because changes there alter canonical harness behavior or core governance.

## Skill-Side Execution Terms

The following terms are active in the live-linked `harnessing-agents` skill and current delivery guidance. They are useful and durable, but they are **not yet promoted as canonical framework features or framework ontology unless explicitly stated elsewhere in `framework/`**.

### Harness Injection Protocol

A skill-side lifecycle model for reasoning about how the skill stages, mutates, verifies, and records changes inside target repositories. It uses slot classes, touch-points, lifecycle phases, mutation safety, and proof requirements.

### Repo Profile

A skill-side classification of a target repository shape that influences which remediation sequence is safest and most effective. Examples currently used by the skill include missing-harness, strong-repo selective-mutation, intake-first, drifted-harness, and first-mount governance.

### Mount Pattern

A concrete execution guide that tells the skill how to install or strengthen a feature or repo-profile batch in a target project. Mount patterns live in the skill surface, not in canonical framework feature files.

### Feature Package

A skill-side execution bundle composed from selected slices of multiple canonical features for a specific repo profile. A Feature Package is not itself a new framework feature. It is a delivery construct that groups compatible feature slices into a narrow, reusable target-project batch.

### First-Mount Governance

The first named Feature Package in the current delivery layer. It targets documentation-heavy repositories that lack a portable governance layer and bundles the minimum governance batch:

- portable contract
- requirements ledger
- planning surface
- review ledger
- lightweight verification

This package primarily draws on parts of `P0-3`, `P1-7`, `P1-10`, `P2-3`, and `P2-5`.

### Proof Base

The accumulated set of real target-project runs used to judge whether a skill-side term or procedure is stable enough to remain durable, be refined, or eventually be promoted.

## Boundary Rules

- A **Feature** is canonical framework ontology.
- A **Feature Package** is a skill-side execution bundle, not a new framework feature.
- A **Mount Pattern** explains execution in target projects; it does not replace the framework's L1→L5 chain.
- A **Repo Profile** classifies target shape for delivery decisions; it does not redefine framework ontology.
- Skill-side terms may become canonical later, but only after repeated proof justifies promotion.
