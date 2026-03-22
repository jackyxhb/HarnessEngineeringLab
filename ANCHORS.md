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

### A3: HESkill/ as Canonical Source
- **What:** Designated the `HESkill/` directory as the authoritative source of truth, over the `comments/` directory.
- **Why:** Prevents entropy and conflicting instructions. `comments/` contains analysis that must strictly align with the canonical definitions in `HESkill/`.
- **Target:** Directory structure and all documentation files.
- **Background:** Enforced mechanically by the `/revise-comments` workflow.
- **Date:** 2026-03-16

### A4: Scalable SAS-to-MAS Path
- **What:** Designed all features initially as Single Agent Systems (SAS) constructs, explicitly documenting their corresponding upgrade paths to Multi-Agent Systems (MAS).
- **Why:** Prevents multi-agent overhead (quadratic coordination) for simple tasks, while ensuring the harness can cleanly scale to decentralized autonomy without rework.
- **Target:** `Core Features for SAS.md`, `Core Features for MAS.md`, `SAS to MAS Feature Mapping.md`.
- **Background:** A core requirement identified in early HE Gap implementations.
- **Date:** 2026-03-22

### A5: Workflow-Driven Consistency
- **What:** Adopted `.agent/workflows/` scripts (like `/polish`, `/reconcile`) to enforce documentation updates mechanically.
- **Why:** AI-generated artifacts drift over time absent mechanical maintenance (Entropy Management). Workflows guarantee sequential feature numbering and system counts stay accurate.
- **Target:** `.agent/workflows/` and all agent activities.
- **Background:** Resolves previously observed numbering bugs and terminology inconsistencies.
- **Date:** 2026-03-16

### A6: 24-Feature Canonical Count
- **What:** Fixed the canonical feature count of the framework at exactly 24 core features: Foundation (8), Pillar 1 (9), Pillar 2 (4), Pillar 3 (3).
- **Why:** Acts as a checksum for reconciliation workflows. Prevents orphaned concepts or duplicate features slipping into the framework unnoticed.
- **Target:** All framework definitions and the `.agent/workflows/reconcile.md` script.
- **Background:** Stabilized after resolving numbering inconsistencies during the first workspace reconciliation run.
- **Date:** 2026-03-22

### A7: Reward Engineering as Cross-Cutting
- **What:** Classified "Reward Engineering" not as a standalone Pillar or Feature, but as a cross-cutting concern paired directly with the Prevention Checklist.
- **Why:** Reward manipulation and anti-hacking are systemic risks that emerge across *all* pillars, not single capabilities.
- **Target:** `HE Prevention Checklist.md` and related GAP Evaluation documentation.
- **Background:** Clarified during a structural reconciliation to avoid polluting the core feature list with meta-concerns.
- **Date:** 2026-03-22
