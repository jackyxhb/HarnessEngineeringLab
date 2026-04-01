# Persistent Context Anchors

This file implements **Context Anchoring (P1-8)** for the HarnessEngineeringLab workspace. It acts as the persistent strategic memory for agents, ensuring long-term goals and critical decisions survive context window resets.

**Agents:** Read this file at the start of your session to re-establish strategic context before making decisions.
**Workflow:** Use `/anchor` to maintain this file context (add, review, prune).

## Anchor Format

```markdown
### A{N}: {Title}

- **What:** The action or decision taken.
- **Why:** The strategic rationale.
- **Target:** The system, architecture, or workflow it affects.
- **Background:** Relevant context.
- **Date:** YYYY-MM-DD
```

---

## Active Anchors

### A1: 3-Pillar + 1-Foundation Framework

- **What:** Organized the Harness Engineering framework into a Foundation (Execute) and 3 Pillars: Context Engineering (Inform), Architectural Constraints (Constrain), and Entropy Management (Maintain).
- **Why:** Provides a canonical taxonomy for all AI harness features, shifting development focus from writing code to designing systems.
- **Target:** All repository documentation and agent workflows.
- **Background:** Introduced to replace disjointed feature lists with a structured maturity model.
- **Date:** 2026-03-15

### A2: Repository as Single Source of Truth

- **What:** Enforced that all project knowledge (CLAUDE.md, rules, architectural decisions) must live in the codebase.
- **Why:** Humans have out-of-band context (Slack, meetings); agents only know what is explicitly exposed to them. If it's not in the repo, it doesn't exist to the agent.
- **Target:** Root meta-docs and the Context Engineering pillar.
- **Background:** Essential for avoiding hallucination and agent context drift over long periods.
- **Date:** 2026-03-15

### A3: framework/ as Canonical Source

- **What:** Designated the `framework/` directory as the authoritative source of truth, over the `research/` directory.
- **Why:** Prevents entropy and conflicting instructions. `research/` contains analysis that must strictly align with the canonical definitions in `framework/`.
- **Target:** Directory structure and all documentation files.
- **Background:** Enforced mechanically by the `/revise-comments` workflow.
- **Date:** 2026-03-16

### A4: Unified Feature Definitions

- **What:** Merged all SAS and MAS core feature definitions into a single unified document (`HE Core Features.md`), eliminating the separate SAS/MAS split and the mapping file.
- **Why:** SAS and MAS share 95%+ of their structure. Maintaining separate documents created unnecessary duplication and reference complexity. A unified document describes single-agent behavior as the baseline and multi-agent behavior inline.
- **Target:** `HE Core Features.md` (replaces `Core Features for SAS.md`, `Core Features for MAS.md`, and `SAS to MAS Feature Mapping.md`).
- **Background:** Originally designed as separate SAS/MAS paths (see original A4). Consolidated after recognizing the overhead of maintaining parallel documents outweighed the benefit of separate definitions.
- **Date:** 2026-04-01

### A5: Workflow-Driven Consistency

- **What:** Adopted `.agent/workflows/` scripts (like `/polish`, `/reconcile`) to enforce documentation updates mechanically.
- **Why:** AI-generated artifacts drift over time absent mechanical maintenance (Entropy Management). Workflows guarantee sequential feature numbering and system counts stay accurate.
- **Target:** `.agent/workflows/` and all agent activities.
- **Background:** Resolves previously observed numbering bugs and terminology inconsistencies.
- **Date:** 2026-03-16

### A6: 29-Feature Canonical Count

- **What:** Fixed the canonical feature count of the framework at exactly 29 core features: Foundation (10), Pillar 1 (10), Pillar 2 (5), Pillar 3 (4). Feature IDs follow the unified `P<area>-<sub>` pattern (e.g., P0-10, P1-10, P2-5). The former P0-MAS is now P0-10.
- **Why:** Acts as a checksum for reconciliation workflows. Prevents orphaned concepts or duplicate features slipping into the framework unnoticed.
- **Target:** All framework definitions and the `.agent/workflows/reconcile.md` script.
- **Background:** Expanded from 28 to 29 after integrating P0-MAS (Inter-Agent Communication) as a first-class feature P0-10 during the SAS/MAS unification.
- **Date:** 2026-04-01

### A7: Reward Engineering as Cross-Cutting

- **What:** Classified "Reward Engineering" not as a standalone Pillar or Feature, but as a cross-cutting concern paired directly with the Prevention Checklist.
- **Why:** Reward manipulation and anti-hacking are systemic risks that emerge across _all_ pillars, not single capabilities.
- **Target:** `HE Prevention Checklist.md` and related GAP Evaluation documentation.
- **Background:** Clarified during a structural reconciliation to avoid polluting the core feature list with meta-concerns.
- **Date:** 2026-03-22
