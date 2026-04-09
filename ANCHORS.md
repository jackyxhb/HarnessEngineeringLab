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

- **What:** Organized the Harness Engineering framework into a Foundation: Infrastructure (Execute) and 3 Pillars: Context Engineering (Inform), Architectural Constraints (Constrain), and Entropy Management (Maintain).
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

- **What:** Designated the `framework/` directory as the authoritative source of truth and the only active project surface. Content under `docs/` is support material only and must not override framework definitions by default.
- **Why:** Prevents entropy and conflicting instructions. Support material may be useful, but it is non-authoritative unless the user explicitly asks to maintain it.
- **Target:** Directory structure and all documentation files.
- **Background:** Enforced mechanically by the active harness tooling and by restricting `/revise-comments` to optional support-material reconciliation.
- **Date:** 2026-03-16

### A4: Unified Feature Definitions

- **What:** Merged all SAS and MAS core feature definitions into unified modular files (now in `framework/features/`), eliminating the separate SAS/MAS split and the mapping file.
- **Why:** SAS and MAS share 95%+ of their structure. Maintaining separate documents created unnecessary duplication and reference complexity. Modular feature files describe single-agent behavior as the baseline and multi-agent behavior inline.
- **Target:** `framework/HE Index.md` and `framework/features/` (replaces legacy `HE Design Decisions.md`, `Core Features for SAS.md`, `Core Features for MAS.md`, and `SAS to MAS Feature Mapping.md`).
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
- **Background:** Expanded from 29 to 30 after integrating P1-11 (Socratic Questioning). Expanded from 30 to 31 after integrating P0-11 (Portable Agent Surface) to enforce IDE-agnostic rule surfaces. Expanded from 31 to 32 after integrating P1-12 (Skill Engineering) — methods extracted from a now-retired build optimization log (formerly `builder/Optimization.md`) proving monolith→module skill splits, routing-hub patterns, and mandatory-read budgets.
- **Date:** 2026-04-05

### A7: Reward Engineering as Cross-Cutting

- **What:** Classified "Reward Engineering" not as a standalone Pillar or Feature, but as a cross-cutting concern paired directly with the Prevention Checklist.
- **Why:** Reward manipulation and anti-hacking are systemic risks that emerge across _all_ pillars, not single capabilities.
- **Target:** `framework/cross-cutting/HE Prevention Checklist.md` and related evaluation documentation.
- **Background:** Clarified during a structural reconciliation to avoid polluting the core feature list with meta-concerns.
- **Date:** 2026-03-22

### A8: Portable Agent Surface (IDE-Agnostic Rules)

- **What:** Added P0-11 requiring all global agent instructions to live in an IDE-agnostic `AGENTS.md` file, with IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) serving as thin shims.
- **Why:** Prevents IDE lock-in where rules written for one agentic IDE (e.g., Claude Code memory files, Cursor-only `.cursorrules`) are invisible to agents running in other environments. All mainstream agentic IDEs — Claude Code, VS Code / GitHub Copilot, Cursor, Windsurf — must be able to discover the project’s rules.
- **Target:** Foundation layer, root-level meta-docs (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`).
- **Background:** Observed that `CLAUDE.md` contained all project rules in a Claude Code-specific format. Switching to VS Code or Cursor meant agents had no access to these rules. The pattern: one canonical file + thin IDE shims.
- **Date:** 2026-04-05

### A9: Principle-to-Practice Chain Restructuring

- **What:** Restructured the entire HE framework through the 5-level Principle-to-Practice Chain (L1 Principle → L2 Targeted Enhancement → L3 Design Decisions → L4 Actions/Tools → L5 Measurable Outcome). Defined 19 Engineering Principles (EP-1 through EP-19), each timeless and first-principles-derived. Created `framework/HE Index.md` as the canonical DAG index and moved all 32 features and 19 principles into modular files under `framework/features/` and `framework/principles/`. Updated all framework documents (Core Features chain index, Enhancement Options chain headers, Prevention Checklist chain failure index, AGENTS.md DO NOT principle backlinks, Gap Evaluation chain-level dimension mappings).
- **Why:** The framework was "hollow at L1 and L5" — strong middle layers (L3 Design Decisions, L4 Actions/Tools) but no anchoring principles (L1) or measurable outcomes (L5) for any of the 32 features. Prevention items and DO NOT rules floated without principle grounding. The chain restructuring fills L1 and L5, making every feature traceable from principle to measurement.
- **Target:** `framework/HE Index.md` (canonical), `framework/features/` (32 modular), `framework/principles/` (19 modular), `framework/cross-cutting/` (6 modular), `AGENTS.md`. `HE Principle Practice Chain.md` stays as meta-document describing the chain model.
- **Background:** Gap analysis (see `tmp/Chain Restructuring Analysis.md`) revealed 0/32 features had explicit L1 or L5. The 19 principles were refined from 23 drafts via merge/split following chain rigor. Key merges: Persistence (EP-2), Clarity before commitment (EP-14), Entropy countering (EP-18), Living documentation (EP-19). Git-as-memory demoted from principle to L3 design pattern under EP-2 Persistence.
- **Date:** 2026-04-06

### A10: Retire build.md — Direct Skill Maintenance

- **What:** Deleted `.agent/workflows/build.md` (the 449-line "skill compiler") and transitioned the `harnessing-agents` skill to direct file maintenance. Removed all references to `builder/` (non-existent directory) and `/build` workflow from AGENTS.md, README.md, ARCHITECTURE.md, and audit.sh.
- **Why:** The skill is fully built (v4.0.0, 9 references, 4 templates). Re-running the compiler on every change introduced non-deterministic output, wasted ~45K tokens on source extraction, and added indirection to a simple edit. EP-6: scaffolding is temporary by design.
- **Target:** `.agent/workflows/build.md` (deleted), AGENTS.md, README.md, ARCHITECTURE.md, audit.sh, SKILL.md (symlink documentation added).
- **Background:** The build workflow served its purpose during initial skill construction — transforming 7 dense framework files (~170KB) into a structured, token-optimized skill tree. Once the skill stabilized, the compiler became overhead. The useful verification checks (line budgets, cross-references, feature coverage) were retired rather than extracted, since existing `npm run check` + `npm run audit` provide sufficient quality gates for direct editing.
- **Date:** 2026-04-06

### A11: Machine-Readability First (P1-1) Alignment

- **What:** Refactored the entire Harness Engineering framework (32 features and 6 cross-cutting docs) to adopt the **Machine-Readability First (P1-1)** standard. Replaced narrative Markdown tables for L5 Improvement Policies and systemic perspectives with structured JSON manifests.
- **Why:** Narrative documentation is "dead data" to agents. By converting evaluation logic and improvement policies to strictly-typed JSON, we enable autonomous agents to parse, score, and self-heal the harness without human translation.
- **Target:** All 32 feature files in `framework/features/` and all 6 cross-cutting docs in `framework/cross-cutting/`.
- **Background:** Initiated to eliminate "narrative drift" (P1-1) where agent behavior diverges from documented policy because the policy is only human-readable. v3.3.1 release codifies this structural hardening.
- **Date:** 2026-04-07

### A12: Dual-Mode Self-Hosted Contract

- **What:** Declared the repository as dual-mode: it ships the released `harnessing-agents` skill for target-project use and self-hosts by running that same skill on itself to set up and improve its own harness.
- **Why:** Prevents a recurring ambiguity where target-project delivery sounded like “framework docs only.” The framework defines the method, but the actual delivery mechanism to target projects is the skill surface under `.agent/skills/harnessing-agents/`.
- **Target:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `PLANS.md`, `.agent/skills/harnessing-agents/`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, and framework review criteria.
- **Background:** Refined on 2026-04-09 after clarifying that target projects are harnessed by running the released skill in their own agentic environment, and this repository also uses that skill on itself.
- **Date:** 2026-04-09

### A13: Live-Linked Skill Version Source

- **What:** Declared `package.json` as the canonical version source for the current live-linked `harnessing-agents` skill and required `.agent/skills/harnessing-agents/SKILL.md` to mirror that version.
- **Why:** External projects currently consume the skill through a live link, and the skill shares core `framework/` files with HELab. A separate unsynchronized skill version creates an ambiguous downstream state instead of a real release boundary.
- **Target:** `package.json`, `.agent/skills/harnessing-agents/SKILL.md`, `scripts/sync-skill-version.js`, `scripts/he-lint.js`, and root governance docs.
- **Background:** Added on 2026-04-09 after clarifying that the skill is part of HELab today and does not yet have an independent packaging or release action.
- **Date:** 2026-04-09

### A14: Root Release Notes for Live Link

- **What:** Added `RELEASES.md` as the canonical HELab release-notes surface and required downstream-impact edits in `framework/` or `.agent/skills/harnessing-agents/` to update it.
- **Why:** Linked downstream consumers effectively consume HELab HEAD for the framework and skill surfaces. Without a durable root release-notes trail, externally visible changes become difficult to trace or communicate.
- **Target:** `RELEASES.md`, `/ccpr`, `scripts/he-lint.js`, and governance docs describing live-linked downstream impact.
- **Background:** Added on 2026-04-09 after version syncing was hardened and the next gap became downstream change traceability.
- **Date:** 2026-04-09

### A15: Root Review Ledger for P2-3

- **What:** Added `REVIEWS.md` as the canonical machine-readable audit trail for independent review of HELab's core harness surfaces.
- **Why:** P2-3 was previously described in the framework but not mechanically enforced in the self-hosted repository. Distinct generator and reviewer identities now become a hard gate instead of an honor system.
- **Target:** `REVIEWS.md`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, and root governance docs that define review-required surfaces.
- **Background:** Added on 2026-04-09 after release/version hardening closed and the next highest-priority gap was generator/evaluator separation for core harness changes.
- **Date:** 2026-04-09

### A16: Target-Project Delivery Primacy

- **What:** Declared that HELab's primary mission is to make the live-linked `harnessing-agents` skill capable of effectively applying all Harness Engineering features to target projects.
- **Why:** This prevents agents from mistaking self-hosted completeness for the end goal. HELab self-hosting is a proving loop that should always be justified by stronger target-project delivery.
- **Target:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `.agent/skills/harnessing-agents/SKILL.md`, and future prioritization decisions about which features to mount next.
- **Background:** Added on 2026-04-09 after clarifying that the repository exists to strengthen the skill's external delivery capability, not merely to accumulate internal feature implementations.
- **Date:** 2026-04-09

### A17: Self-Contained Skill Runtime Bundle

- **What:** Chose to keep the root `framework/` as canonical source of truth while shipping a synchronized runtime mirror of that framework inside `.agent/skills/harnessing-agents/framework/`.
- **Why:** The live-linked skill was structurally dependent on sibling HELab paths, which is acceptable for self-hosting but weak for target-project portability. Bundling the runtime framework fixes that without collapsing HELab governance and shipped runtime into one indistinct surface.
- **Target:** `.agent/skills/harnessing-agents/`, `framework/`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, and root governance docs describing the dual-mode contract.
- **Background:** Decided on 2026-04-09 after assessing whether HELab and the skill should fully converge. Full convergence was rejected as too destructive; the bundled-runtime model preserves canonical truth while improving external delivery.
- **Date:** 2026-04-09

### A18: Execution Guides Over Abstract Chains

- **What:** Prioritized concrete target-project implementation guides as the next major hardening step for the live-linked `harnessing-agents` skill.
- **Why:** The framework feature files define the L1-L5 chain well enough for diagnosis and planning, but most features still lack step-by-step execution guidance for Phase 4 remediation in target projects. Without that layer, the skill risks guessing files, commands, and verification steps instead of applying the framework mechanically.
- **Target:** `REQUIREMENTS.md`, `PLANS.md`, `.agent/skills/harnessing-agents/`, future execution references/templates, and the next target-project delivery tranche.
- **Background:** Chosen immediately after the `4.0.0` release based on a repo audit that identified concrete execution guidance as the largest remaining blocker between strong HELab self-hosting and reliable target-project delivery.
- **Date:** 2026-04-09
