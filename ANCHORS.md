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

- **What:** Merged all SAS and MAS core feature definitions into a single unified document (`HE Design Decisions.md`), eliminating the separate SAS/MAS split and the mapping file.
- **Why:** SAS and MAS share 95%+ of their structure. Maintaining separate documents created unnecessary duplication and reference complexity. A unified document describes single-agent behavior as the baseline and multi-agent behavior inline.
- **Target:** `HE Design Decisions.md` (replaces `Core Features for SAS.md`, `Core Features for MAS.md`, and `SAS to MAS Feature Mapping.md`).
- **Background:** Originally designed as separate SAS/MAS paths (see original A4). Consolidated after recognizing the overhead of maintaining parallel documents outweighed the benefit of separate definitions.
- **Date:** 2026-04-01

### A5: Workflow-Driven Consistency

- **What:** Adopted `.agent/workflows/` scripts (like `/polish`, `/reconcile`) to enforce documentation updates mechanically.
- **Why:** AI-generated artifacts drift over time absent mechanical maintenance (Entropy Management). Workflows guarantee sequential feature numbering and system counts stay accurate.
- **Target:** `.agent/workflows/` and all agent activities.
- **Background:** Resolves previously observed numbering bugs and terminology inconsistencies.
- **Date:** 2026-03-16

### A6: 32-Feature Canonical Count

- **What:** Fixed the canonical feature count of the framework at exactly 32 core features: Foundation (11), Pillar 1 (12), Pillar 2 (5), Pillar 3 (4). Feature IDs follow the unified `P<area>-<sub>` pattern (e.g., P0-11, P1-12, P2-5). P1-12 (Skill Engineering) was added to enforce modular, context-efficient, and tunable agent skill architecture.
- **Why:** Acts as a checksum for reconciliation workflows. Prevents orphaned concepts or duplicate features slipping into the framework unnoticed.
- **Target:** All framework definitions and the `.agent/workflows/reconcile.md` script.
- **Background:** Expanded from 29 to 30 after integrating P1-11 (Socratic Questioning). Expanded from 30 to 31 after integrating P0-11 (Portable Agent Surface) to enforce IDE-agnostic rule surfaces. Expanded from 31 to 32 after integrating P1-12 (Skill Engineering) — methods extracted from builder/Optimization.md proving monolith→module skill splits, routing-hub patterns, and mandatory-read budgets.
- **Date:** 2026-04-05

### A7: Reward Engineering as Cross-Cutting

- **What:** Classified "Reward Engineering" not as a standalone Pillar or Feature, but as a cross-cutting concern paired directly with the Prevention Checklist.
- **Why:** Reward manipulation and anti-hacking are systemic risks that emerge across _all_ pillars, not single capabilities.
- **Target:** `HE Negative Actions.md` and related GAP Evaluation documentation.
- **Background:** Clarified during a structural reconciliation to avoid polluting the core feature list with meta-concerns.
- **Date:** 2026-03-22

### A8: Portable Agent Surface (IDE-Agnostic Rules)

- **What:** Added P0-11 requiring all global agent instructions to live in an IDE-agnostic `AGENTS.md` file, with IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) serving as thin shims.
- **Why:** Prevents IDE lock-in where rules written for one agentic IDE (e.g., Claude Code memory files, Cursor-only `.cursorrules`) are invisible to agents running in other environments. All mainstream agentic IDEs — Claude Code, VS Code / GitHub Copilot, Cursor, Windsurf — must be able to discover the project’s rules.
- **Target:** Foundation layer, root-level meta-docs (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`).
- **Background:** Observed that `CLAUDE.md` contained all project rules in a Claude Code-specific format. Switching to VS Code or Cursor meant agents had no access to these rules. The pattern: one canonical file + thin IDE shims.
- **Date:** 2026-04-05

### A9: Principle-to-Practice Chain Restructuring

- **What:** Restructured the entire HE framework through the 5-level Principle-to-Practice Chain (L1 Principle → L2 Targeted Enhancement → L3 Design Decisions → L4 Actions/Tools → L5 Measurable Outcome). Defined 19 Engineering Principles (EP-1 through EP-19), each timeless and first-principles-derived. Created `framework/HE Principle Map.md` as the canonical L1→L5 chain map for all 32 features. Updated all framework documents (Core Features chain index, Enhancement Options chain headers, Prevention Checklist chain failure index, AGENTS.md DO NOT principle backlinks, Gap Evaluation chain-level dimension mappings).
- **Why:** The framework was "hollow at L1 and L5" — strong middle layers (L3 Design Decisions, L4 Actions/Tools from Core Features and Enhancement Options) but no anchoring principles (L1) or measurable outcomes (L5) for any of the 32 features. Prevention items and DO NOT rules floated without principle grounding. The chain restructuring fills L1 and L5, making every feature traceable from principle to measurement.
- **Target:** `framework/HE Principle Map.md` (new), `framework/HE Design Decisions.md`, `framework/HE Actions Tools.md`, `framework/HE Negative Actions.md`, `framework/HE Inverse Outcomes.md`, `AGENTS.md`. `HE Principle Practice Chain.md` stays as meta-document describing the chain model.
- **Background:** Gap analysis (see `tmp/Chain Restructuring Analysis.md`) revealed 0/32 features had explicit L1 or L5. The 19 principles were refined from 23 drafts via merge/split following chain rigor. Key merges: Persistence (EP-2), Clarity before commitment (EP-14), Entropy countering (EP-18), Living documentation (EP-19). Git-as-memory demoted from principle to L3 design pattern under EP-2 Persistence.
- **Date:** 2026-04-06
