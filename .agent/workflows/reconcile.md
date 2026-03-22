---
description: Systematically audit the workspace for entropy, deduplicate, standardize terms, and bridge broken concept chains
---

# /reconcile — Workspace Entropy Reconciliation

// turbo-all

Periodically run this workflow to keep the HarnessEngineeringLab project at a low entropy level.

## Phase 1: Read & Inventory

1. List all files in `framework/`, `research/`, `case-studies/`, and `references/` directories
2. Read every document to build a mental model of the content
3. Cross-check `README.md` against actual file structure — flag any drift

## Phase 2: Analyse & Identify Issues

Scan for all of the following categories:

4. **Broken content** — corrupted text, numbering bugs, typos, formatting errors
5. **Inconsistent terminology** — pillar verb tags, feature names, feature counts must match canonical sources:
   - Foundation = `(Execute)` (canonical: `Core Features for SAS.md`)
   - Pillar 1 = `Context Engineering (Inform)` 
   - Pillar 2 = `Architectural Constraints (Constrain)`
   - Pillar 3 = `Entropy Management (Maintain)`
   - Canonical feature count = **25** (8 Foundation + 9 P1 + 4 P2 + 4 P3)
6. **Content duplication** — multiple files saying the same thing in different words
7. **Missing cross-references** — documents that reference concepts without linking to the canonical source
8. **Orphan concepts** — ideas introduced in one file but not connected to the framework
9. **Structural issues** — misplaced files, empty directories, missing navigation indexes
10. **Concept chain gaps** — SAS→MAS upgrade path, feature traceability, example→framework links

## Phase 3: Produce Reconciliation Report

11. Create a Reconciliation Findings document covering each issue category
12. Prioritize by effort (Light / Medium / Heavy) and propose specific fixes
13. Present findings to user for review and decision-making on which fixes to execute

## Phase 4: Execute Approved Fixes

14. Apply Light fixes first (typos, numbering, terminology standardization)
15. Apply Medium fixes (cross-references, orphan integration, structural moves)
16. Apply Heavy fixes (content consolidation, deduplication) only if approved
17. Update `README.md` to reflect any structural changes

## Phase 5: Sync & Commit

18. Run final check: re-read changed files to verify no new issues introduced
19. Use `ccp` to commit all reconciliation changes with descriptive message

## Canonical Term Reference

When checking terminology, the following are the **single source of truth** labels:

| Component | Canonical Label | Source File |
|---|---|---|
| Foundation | Foundational Infrastructure (Execute) | `Core Features for SAS.md` |
| Pillar 1 | Context Engineering (Inform) | `Core Features for SAS.md` |
| Pillar 2 | Architectural Constraints (Constrain) | `Core Features for SAS.md` |
| Pillar 3 | Entropy Management (Maintain) | `Core Features for SAS.md` |
| Feature count | 24 core features | `HE Enhancement Options.md` |
| Cross-cutting | Reward Engineering & Anti-Hacking | `HE Prevention Checklist.md` |
