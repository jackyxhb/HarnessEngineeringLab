# PLANS.md

Active task planning file. Implements **Practice 5: Optimize For Agent Flow** — front-loads durable context (scope, constraints, checkpoints) so agent restarts stay cheap.

**Agents:** Read the active plan before starting any multi-step task. Append a new plan entry for any task requiring more than 3 sequential steps. Archive completed plans by moving them to the `## Completed Plans` section.

---

## Plan Format

```markdown
### Plan: <Title>

- **Goal:** What success looks like.
- **Requirement IDs:** IDs from `REQUIREMENTS.md` that authorize the work.
- **Scope:** Files/directories in play. What is explicitly OUT of scope.
- **Status:** `in-progress` | `blocked` | `awaiting-review` | `done`
- **Steps:**
  - [ ] Step description
- **Constraints:** Hard rules that must not be violated.
- **Checkpoints:** Commit-worthy states to lock progress at.
- **Blocking Issues:** Any blockers and their resolution path.
```

---

## Active Plans

_No active plans._

---

## Completed Plans

### Plan: Dependency Metadata Contradiction Remediation

- **Goal:** Resolve the confirmed canonical dependency-metadata contradiction, clarify the HE Index graph semantics so soft downstream relationships are not misread as hard prerequisites, and add lint coverage for unsupported `Required by` claims.
- **Requirement IDs:** `HE-R003`, `HE-R004`, `HE-R006`, `HE-R007`
- **Scope:** `framework/HE Index.md`, `framework/features/P0-01.md`, `.agent/skills/harnessing-agents/framework/`, `scripts/he-lint.js`, `PLANS.md`, `RELEASES.md`, and `REVIEWS.md`. Out of scope: broad reclassification of every downstream edge in the framework graph.
- **Status:** `done`
- **Steps:**
  - [x] Clarify graph semantics in `framework/HE Index.md`
  - [x] Remove the unsupported hard dependency claim from `framework/features/P0-01.md`
  - [x] Add a lint rule that fails on unsupported `Required by` claims
  - [x] Sync the bundled skill framework mirror, update release/review ledgers, and validate
- **Constraints:** Keep `framework/` canonical, avoid broad DAG rewrites without a separate audit, and enforce only the dependency claims the framework actually models as hard facts.
- **Checkpoints:** Canonical files updated; lint rule added; bundle synced; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-13

### Plan: Feature-Principle Contradiction Audit

- **Goal:** Review the canonical framework features and engineering principles for contradictions, broken mappings, or mutually incompatible enforcement claims, then deliver a findings-first audit with exact references.
- **Requirement IDs:** `HE-R003`, `HE-R004`
- **Scope:** `framework/features/`, `framework/principles/`, `framework/HE Index.md`, and `framework/HE Principle Practice Chain.md`. Out of scope: `docs/`, skill-side execution guides, and unrelated wording cleanup outside the canonical framework surface.
- **Status:** `done`
- **Steps:**
  - [x] Read the canonical index and chain model to establish expected mappings
  - [x] Cross-check feature files against their governing principles and index metadata
  - [x] Identify confirmed contradictions and separate them from harmless wording variance
  - [x] Run repository validation commands relevant to framework integrity
  - [x] Deliver a findings-first audit with exact file references
- **Constraints:** Treat `framework/` as canonical truth, keep the audit grounded in the existing L1-L5 model, and do not treat support material under `docs/` as authoritative.
- **Checkpoints:** Plan recorded; mapping sweep complete; contradiction candidates verified; validation run complete; findings delivered.
- **Blocking Issues:** None.
- **Completed:** 2026-04-13

### Plan: Consolidate Engineering Principles (19 → 16)

- **Goal:** Eliminate 3 redundant/narrow engineering principles by merging their governed features into stronger parent principles. EP-19 → EP-11, EP-6 → EP-9, EP-13 → EP-12.
- **Requirement IDs:** `HE-R004`
- **Scope:** `framework/principles/`, `framework/features/`, `framework/HE Index.md`, `framework/cross-cutting/HE Prevention Checklist.md`, `framework/HE-Terms.md`, `scripts/he-lint.js`, `README.md`, `AGENTS.md`, `.harness/HE-CLUES.md`, `RELEASES.md`, `REVIEWS.md`. Out of scope: renumbering remaining principle IDs (gaps at EP-6, EP-13, EP-19 are accepted).
- **Status:** `done`
- **Steps:**
  - [x] Delete EP-06.md, EP-13.md, EP-19.md; update EP-09.md, EP-11.md, EP-12.md with absorbed features
  - [x] Update feature files P0-6, P1-6, P3-2, P3-4 chain headers
  - [x] Update HE Index.md (remove 3 principles, update governs + feature ep fields)
  - [x] Update Prevention Checklist, HE-Terms, HE-CLUES, README, AGENTS.md, he-lint.js
  - [x] Sync skill framework mirror, update RELEASES.md, validate with npm run check
- **Constraints:** Preserve all 32 features unchanged. Do not renumber principle IDs. Keep historical PLANS.md and ANCHORS.md references intact.
- **Checkpoints:** Principle files updated; feature chains updated; index updated; lint green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-13

### Plan: P1-9 Mount Pattern and Assessment Proof Gate

- **Goal:** Ship a P1-9 branch-enforcement mount pattern so Phase 4 can install branch-based cognitive memory in target projects, and harden the assessment report template so features cannot be marked done without verified execution evidence.
- **Requirement IDs:** `HE-R008`, `HE-R009`
- **Scope:** `.agent/skills/harnessing-agents/references/`, `.agent/skills/harnessing-agents/templates/HE-ASSESSMENT-REPORT.md`, `.agent/skills/harnessing-agents/references/he-full-audit.md`, `PLANS.md`, `RELEASES.md`, and `REVIEWS.md`. Out of scope: changing canonical `framework/features/P1-09.md` or promoting the mount pattern into framework ontology.
- **Status:** `done`
- **Steps:**
  - [x] Create `he-p1-9-branch-enforcement-mount-pattern.md` following the established mount-pattern structure
  - [x] Wire the new pattern into Phase 4 feature guides in `he-full-audit.md`
  - [x] Harden `HE-ASSESSMENT-REPORT.md` Section 2 with a proof gate requiring change-summary cross-references
  - [x] Sync framework mirror, update RELEASES.md, add REVIEWS.md record, validate
- **Constraints:** Follow existing mount-pattern structure (Goal → Planning → Execution → Verification → Do Not). Keep the pattern skill-side. Assessment proof gate must be mechanical, not advisory.
- **Checkpoints:** Mount pattern created; Phase 4 wired; template hardened; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-12

### Plan: Feature Chain Compliance Remediation

- **Goal:** Repair the confirmed feature-chain compliance defects, normalize the verified P1-6 source-of-truth drift, and teach `he-lint` to fail on the same defect class in future edits.
- **Requirement IDs:** `HE-R003`, `HE-R004`, `HE-R006`, `HE-R007`
- **Scope:** `framework/features/`, `.agent/skills/harnessing-agents/framework/features/`, `scripts/he-lint.js`, `PLANS.md`, `RELEASES.md`, and `REVIEWS.md`. Out of scope: broader wording cleanups across unrelated framework files.
- **Status:** `done`
- **Steps:**
  - [x] Fix the confirmed feature-file defects in the canonical framework surface
  - [x] Sync the bundled skill runtime mirror to the canonical framework state
  - [x] Extend `he-lint` so feature-chain structure, EP mapping consistency, non-JSON improvement policies, and invalid L5 measurement bullets fail validation
  - [x] Record release notes, independent review, and rerun validation
- **Constraints:** Keep `framework/` canonical, preserve bundle parity with the shipped skill runtime, and avoid inventing new chain criteria beyond the repository's existing L1-L5 contract.
- **Checkpoints:** Canonical feature files fixed; bundled runtime synced; `npm run smoke` fails on these defect classes if reintroduced; review recorded.
- **Blocking Issues:** None.
- **Completed:** 2026-04-10

### Plan: Feature Chain Compliance Audit

- **Goal:** Check every canonical feature file for integrity and compliance with the Principle-to-Practice Chain specification, then report concrete findings with exact references.
- **Requirement IDs:** `HE-R003`, `HE-R004`
- **Scope:** `framework/features/`, `framework/HE Principle Practice Chain.md`, `framework/HE Index.md`, and any directly needed cross-references under `framework/principles/`. Out of scope: `docs/`, skill-side execution guides, and unrelated wording cleanup outside the canonical framework surface.
- **Status:** `done`
- **Steps:**
  - [x] Read the canonical chain specification and feature index structure
  - [x] Inspect all 32 feature files for required chain completeness and structural integrity
  - [x] Cross-check feature claims against linked principle practice expectations
  - [x] Deliver a findings-first compliance review with exact file references
- **Constraints:** Treat `framework/` as canonical truth, keep the audit grounded in the existing chain model rather than inventing new criteria, and do not treat `docs/` support material as authoritative.
- **Checkpoints:** Plan recorded; feature sweep complete; findings verified against exact file lines; final review delivered.
- **Blocking Issues:** None.
- **Completed:** 2026-04-10

### Plan: HELab 4.1.0 Release Cut

- **Goal:** Cut HELab `v4.1.0` so the first-mount governance capability, canonical terms reference, and terminology normalization land as a published release with synced version metadata, release notes, tag, and GitHub release.
- **Requirement IDs:** `HE-R005`, `HE-R006`, `HE-R007`
- **Scope:** `package.json`, `.agent/skills/harnessing-agents/SKILL.md`, `RELEASES.md`, `PLANS.md`, `REVIEWS.md`, and git/GitHub release state. Out of scope: additional feature work beyond the already merged changes in `Unreleased`.
- **Status:** `done`
- **Steps:**
  - [x] Bump the canonical version to `4.1.0` and sync the mirrored skill metadata
  - [x] Move `Unreleased` into a `4.1.0` release section and reopen a fresh `Unreleased` block
  - [x] Record independent review, validate, commit the release cut, tag `v4.1.0`, push, and publish the GitHub release
- **Constraints:** Keep `package.json` as the canonical version source, keep `.agent/skills/harnessing-agents/SKILL.md` mirrored to it, preserve a fresh `Unreleased` section after the cut, and do not publish the release without a matching tag and release notes.
- **Checkpoints:** Version surfaces updated; release notes cut; review recorded; validation green; tag pushed; GitHub release published.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R012 Terms Normalization

- **Goal:** Normalize the highest-value skill and protocol surfaces so `Repo Profile` and `Feature Package` usage stays consistent with `framework/HE-Terms.md`.
- **Requirement IDs:** `HE-R003`, `HE-R004`, `HE-R012`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, `.agent/skills/harnessing-agents/references/`, `PLANS.md`, `RELEASES.md`, and `REVIEWS.md`. Out of scope: broad wording cleanup across all framework and support docs.
- **Status:** `done`
- **Steps:**
  - [x] Normalize terminology in the live skill and protocol references
  - [x] Record review, validate HELab, and archive the plan
- **Constraints:** Keep the terms reference canonical, avoid rewriting stable content that does not materially benefit from the normalization, and do not promote skill-side terms into framework features.
- **Checkpoints:** Skill docs updated; release note recorded; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R012 Canonical Terms Reference

- **Goal:** Add a canonical terms reference under `framework/` so Harness Engineering terminology, including the new Feature Package concept, is discoverable and consistently scoped across framework and skill surfaces.
- **Requirement IDs:** `HE-R003`, `HE-R004`, `HE-R012`
- **Scope:** `framework/`, `.agent/skills/harnessing-agents/framework/`, `REQUIREMENTS.md`, `PLANS.md`, `RELEASES.md`, and `REVIEWS.md`. Out of scope: promoting skill-side terms into formal framework features or refactoring all existing documents to use the new glossary immediately.
- **Status:** `done`
- **Steps:**
  - [x] Add the requirement, active plan, and canonical framework terms file
  - [x] Link the terms reference from framework entry points and sync the bundled runtime mirror
  - [x] Record independent review, validate HELab, and archive the plan
- **Constraints:** Keep the framework canonical, distinguish framework ontology from skill-side execution terminology, and avoid turning the glossary into a second index or feature catalog.
- **Checkpoints:** Requirement recorded; terms reference added; entry-point links added; runtime mirror synced; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R011 First-Mount Governance Capability

- **Goal:** Turn the first-mount governance repo profile into a reusable execution pattern for the live-linked skill and prove it on ENCT with a narrow governance mount.
- **Requirement IDs:** `HE-R003`, `HE-R008`, `HE-R009`, `HE-R010`, `HE-R011`
- **Scope:** `REQUIREMENTS.md`, `PLANS.md`, `RELEASES.md`, `ANCHORS.md`, `REVIEWS.md`, `.agent/skills/harnessing-agents/` references/templates/contract surfaces, and the target repo `/Users/macbook1/work/ENCT/ENCT`. Out of scope: changing canonical framework feature definitions, restructuring ENCT content directories, or adding app-style CI/CD surfaces in ENCT.
- **Status:** `done`
- **Steps:**
  - [x] Add the new requirement and active plan for the first-mount governance execution tranche
  - [x] Ship and wire a reusable first-mount governance execution guide in the live-linked skill
  - [x] Mount the narrow governance batch in ENCT and verify it with a deterministic smoke command
  - [x] Fold the real execution proof back into HELab, run independent review, validate, and archive the plan
- **Constraints:** Keep the pattern skill-side, preserve ENCT as a documentation-heavy archive, avoid broad repo restructuring, and keep the mounted batch limited to governance plus lightweight verification.
- **Checkpoints:** Requirement recorded; guide added; skill routing updated; ENCT governance files mounted; ENCT smoke command passes; review recorded; HELab validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R010 ENCT Protocol Proof

- **Goal:** Carry the ENCT harness-injection protocol test back into HELab so the fifth external proof becomes durable evidence for a documentation-heavy first-mount governance repo profile.
- **Requirement IDs:** `HE-R008`, `HE-R010`
- **Scope:** `ANCHORS.md`, `PLANS.md`, `RELEASES.md`, `.agent/skills/harnessing-agents/references/he-harness-injection-protocol-draft.md`, and `REVIEWS.md`. Out of scope: changing canonical framework definitions or executing a remediation batch inside ENCT.
- **Status:** `done`
- **Steps:**
  - [x] Record the ENCT protocol result as a strategic anchor and completed plan
  - [x] Update release notes and the draft protocol reference with fifth-proof evidence
  - [x] Run independent review, validate HELab, and archive the plan
- **Constraints:** Keep the protocol framed as a skill-side asset, avoid overclaiming framework promotion readiness, and preserve the audit-only outcome in ENCT.
- **Checkpoints:** Anchor recorded; release note updated; protocol draft evidence note updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R010 encA0 Protocol Proof

- **Goal:** Carry the encA0 harness-injection protocol test back into HELab so the fourth external proof becomes durable evidence for a drifted-harness repo profile and sharper selective-mutation rules.
- **Requirement IDs:** `HE-R008`, `HE-R010`
- **Scope:** `ANCHORS.md`, `PLANS.md`, `RELEASES.md`, `.agent/skills/harnessing-agents/references/he-harness-injection-protocol-draft.md`, and `REVIEWS.md`. Out of scope: changing canonical framework definitions or executing a remediation batch inside encA0.
- **Status:** `done`
- **Steps:**
  - [x] Record the encA0 protocol result as a strategic anchor and completed plan
  - [x] Update release notes and the draft protocol reference with fourth-proof evidence
  - [x] Run independent review, validate HELab, and archive the plan
- **Constraints:** Keep the protocol framed as a skill-side asset, avoid overclaiming framework promotion readiness, and preserve the audit-only outcome in encA0.
- **Checkpoints:** Anchor recorded; release note updated; protocol draft evidence note updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R010 ServiceAgent Protocol Proof

- **Goal:** Carry the ServiceAgent harness-injection protocol test back into HELab so the third external proof becomes durable evidence for the skill-side draft and sharper promotion criteria.
- **Requirement IDs:** `HE-R008`, `HE-R010`
- **Scope:** `ANCHORS.md`, `PLANS.md`, `RELEASES.md`, `.agent/skills/harnessing-agents/references/he-harness-injection-protocol-draft.md`, and `REVIEWS.md`. Out of scope: changing canonical framework definitions or executing a remediation batch inside ServiceAgent.
- **Status:** `done`
- **Steps:**
  - [x] Record the ServiceAgent protocol result as a strategic anchor and completed plan
  - [x] Update release notes and the draft protocol reference with third-proof evidence
  - [x] Run independent review, validate HELab, and archive the plan
- **Constraints:** Keep the protocol framed as a skill-side asset, avoid overclaiming framework promotion readiness, and preserve the audit-only outcome in ServiceAgent.
- **Checkpoints:** Anchor recorded; release note updated; protocol draft evidence note updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R010 CareerHelper Protocol Proof

- **Goal:** Carry the CareerHelper harness-injection protocol test back into HELab so the second external proof becomes durable evidence for the skill-side draft and future promotion decisions.
- **Requirement IDs:** `HE-R008`, `HE-R010`
- **Scope:** `ANCHORS.md`, `PLANS.md`, `RELEASES.md`, `.agent/skills/harnessing-agents/references/he-harness-injection-protocol-draft.md`, and `REVIEWS.md`. Out of scope: changing canonical framework definitions or executing a remediation batch inside CareerHelper.
- **Status:** `done`
- **Steps:**
  - [x] Record the CareerHelper protocol result as a strategic anchor and completed plan
  - [x] Update release notes and the draft protocol reference with second-proof evidence
  - [x] Run independent review, validate HELab, and archive the plan
- **Constraints:** Keep the protocol framed as a skill-side asset, avoid overclaiming framework promotion readiness from a single additional proof, and preserve the audit-only outcome in CareerHelper.
- **Checkpoints:** Anchor recorded; release note updated; protocol draft evidence note added; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R010 Harness Injection Draft

- **Goal:** Coin a permanent draft spec for slot-based harness injection so the live-linked skill has a durable lifecycle protocol for touching target repositories.
- **Requirement IDs:** `HE-R008`, `HE-R010`
- **Scope:** `ANCHORS.md`, `PLANS.md`, `RELEASES.md`, `REQUIREMENTS.md`, `.agent/skills/harnessing-agents/SKILL.md`, `.agent/skills/harnessing-agents/references/`, and `REVIEWS.md`. Out of scope: changing canonical framework feature definitions or promoting the draft into `framework/` ontology.
- **Status:** `done`
- **Steps:**
  - [x] Define the draft protocol as a skill-side reference with slot classes, touch-points, lifecycle phases, safety levels, and proof requirements
  - [x] Wire the draft into the live-linked skill and full-audit guidance so agents can actually use it during target-project runs
  - [x] Run independent review, validate HELab, and archive the plan
- **Constraints:** Keep the draft explicitly skill-side; do not overclaim it as settled framework doctrine; preserve target-project delivery primacy and the existing guide-backed execution model.
- **Checkpoints:** Requirement added; draft reference added; skill/audit wiring updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R009 Real Target Foldback

- **Goal:** Fold the ACSS target-project delivery results back into HELab so the live-linked skill guidance reflects the proven audit/execution pattern rather than only synthetic proof.
- **Requirement IDs:** `HE-R008`, `HE-R009`
- **Scope:** `ANCHORS.md`, `PLANS.md`, `RELEASES.md`, `.agent/skills/harnessing-agents/` references/templates, and `REVIEWS.md` for review tracking. Out of scope: new framework feature definitions or another target-project remediation batch.
- **Status:** `done`
- **Steps:**
  - [x] Record the strategic lesson from the ACSS proof in anchors and release notes
  - [x] Update the full-audit/implementation-planning guidance so target projects with active plan surfaces are audited through `.harness/` first and retargeted only for approved follow-on batches
  - [x] Run independent review, validate HELab, and archive the plan
- **Constraints:** Keep `framework/` canonical, avoid inventing new framework features from one target-project run, and capture only delivery guidance that was mechanically demonstrated in ACSS.
- **Checkpoints:** Anchor recorded; skill guidance updated; release note recorded; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HE-R009 Guide Tranche Two

- **Goal:** Ship the next high-leverage execution guides for `P0-1`, `P1-7`, and `P2-5`, tighten the implementation-plan template so guide lookup is explicit, and prove the shipped guide layer against a synthetic target repository.
- **Requirement IDs:** `HE-R003`, `HE-R008`, `HE-R009`
- **Scope:** `PLANS.md`, `RELEASES.md`, `REVIEWS.md`, `.agent/skills/harnessing-agents/` references and templates, plus a synthetic proof target under `tmp/`. Out of scope: cutting a new HELab release or claiming proof against a real external repository.
- **Status:** `done`
- **Steps:**
  - [x] Add the next bounded guide tranche for `P0-1`, `P1-7`, and `P2-5`
  - [x] Tighten the implementation-planning surface so shipped guide lookup is explicit and required when available
  - [x] Run a synthetic target-project proof for the shipped `P0-3` and `P1-10` guides, then record review, validate, and archive the plan
- **Constraints:** Keep root `framework/` canonical; do not treat the synthetic repo as equivalent to a real external production target; preserve separation between abstract framework definitions and execution guidance.
- **Checkpoints:** New guides added; plan template tightened; synthetic proof artifacts written; review recorded; validation green.
- **Blocking Issues:** A real external target repository is not currently available in the workspace, so end-to-end proof will use a synthetic repo under `tmp/` for now.
- **Completed:** 2026-04-09

### Plan: HE-R009 Guide Pattern

- **Goal:** Define and ship the first bounded implementation-guide pattern that lets the live-linked `harnessing-agents` skill turn feature gaps into concrete target-project remediation steps instead of conceptual-only guidance.
- **Requirement IDs:** `HE-R003`, `HE-R008`, `HE-R009`
- **Scope:** `REQUIREMENTS.md`, `ANCHORS.md`, `PLANS.md`, `RELEASES.md`, `REVIEWS.md`, and the live-linked skill surfaces needed to define and prove the first implementation-guide delivery slice. Out of scope: delivering all 32 feature guides in one batch.
- **Status:** `done`
- **Steps:**
  - [x] Define the canonical pattern and placement for execution-oriented feature implementation guides
  - [x] Choose the first bounded delivery slice and wire it into the live-linked skill surface
  - [x] Record review, validate, and archive the plan
- **Constraints:** Keep root `framework/` canonical, avoid collapsing abstract feature definitions and execution recipes into one file, and optimize for target-project delivery rather than self-hosted completeness theater.
- **Checkpoints:** Requirement added; guide-pattern decision recorded; first delivery slice integrated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HELab 4.0.0 Release Cut

- **Goal:** Cut the next HELab release as `v4.0.0` so the shipped skill/runtime architecture changes and naming-surface changes are reflected in the canonical version, mirrored skill metadata, release notes, git tag, and GitHub release.
- **Requirement IDs:** `HE-R005`, `HE-R006`
- **Scope:** `package.json`, `.agent/skills/harnessing-agents/SKILL.md`, `RELEASES.md`, `PLANS.md`, `REVIEWS.md`, git tag state, and GitHub release notes. Out of scope: additional feature work beyond the already merged changes.
- **Status:** `done`
- **Steps:**
  - [x] Bump the canonical root version and mirrored skill version to `4.0.0`
  - [x] Move `Unreleased` downstream changes into a `4.0.0` release section and re-open `Unreleased`
  - [x] Record independent review, validate, commit, tag `v4.0.0`, push, and create the GitHub release
- **Constraints:** Keep `package.json` as the canonical version source, keep `.agent/skills/harnessing-agents/SKILL.md` mirrored to that version, and preserve an `Unreleased` section in `RELEASES.md` after the cut.
- **Checkpoints:** Version surfaces updated; release notes cut; review recorded; validation green; tag pushed; GitHub release created.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: P2-3 Reference Naming Alignment

- **Goal:** Rename the P2-3 target-project review-gate reference to a more instructional name so the skill's `references/` surface clearly distinguishes procedural guidance from mounted target-project artifacts.
- **Requirement IDs:** `HE-R001`, `HE-R002`
- **Scope:** `.agent/skills/harnessing-agents/references/`, direct skill references to that file, `PLANS.md`, `RELEASES.md`, and `REVIEWS.md`. Out of scope: changing the actual mounted target-project artifact names such as `REVIEWS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Rename the P2-3 reference file to a more instructional name
  - [x] Update all direct references to the renamed file
  - [x] Record review, validate, and archive the plan
- **Constraints:** Preserve the current P2-3 mounting behavior and keep the runtime target-project output names unchanged.
- **Checkpoints:** Reference renamed; no stale paths remain; release note recorded; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Reviews Template Naming Alignment

- **Goal:** Rename the target-project review-ledger template to `HE-REVIEWS.md` so the skill template surface follows the established Harness Engineering naming convention without changing the runtime root ledger name `REVIEWS.md`.
- **Requirement IDs:** `HE-R001`, `HE-R002`
- **Scope:** `.agent/skills/harnessing-agents/templates/`, skill references that point to the template, `RELEASES.md`, `REVIEWS.md`, and `PLANS.md`. Out of scope: renaming the runtime root `REVIEWS.md` ledger used by HELab or target projects.
- **Status:** `done`
- **Steps:**
  - [x] Rename the template file to `HE-REVIEWS.md`
  - [x] Update all skill references to the renamed template path
  - [x] Record review, validate, and archive the plan
- **Constraints:** Keep the mounted target-project output file named `REVIEWS.md`; only rename the template asset inside the skill surface.
- **Checkpoints:** Template renamed; references updated; release note recorded; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Skill Runtime Bundle Migration

- **Goal:** Make the shipped `harnessing-agents` skill self-contained for target-project execution by bundling a synchronized runtime mirror of `framework/` inside the skill while keeping the root `framework/` as canonical source of truth.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/`, `framework/`, root governance docs, and harness tooling that validates or documents the current split contract. Out of scope: publishing an independently versioned skill package.
- **Status:** `done`
- **Steps:**
  - [x] Add a deterministic sync command that mirrors root `framework/` into `.agent/skills/harnessing-agents/framework/`
  - [x] Update validation, audit, and governance to treat the skill bundle as a required shipped runtime mirror
  - [x] Run independent review, validate, and archive the migration plan
- **Constraints:** Keep root `framework/` canonical, avoid manual edits inside the bundled mirror, and preserve the dual-mode live-linked contract.
- **Checkpoints:** Sync command exists; skill bundle exists; he-lint detects drift; docs describe the bundled runtime model.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Feature Lookup Canonical Fidelity

- **Goal:** Make Mode 3 feature lookups preserve canonical metadata and workspace grounding, so responses cannot substitute the wrong pillar, governing principle, feature chain, or workspace name.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, `.agent/skills/harnessing-agents/templates/HE-FEATURE-LOOKUP.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: parser-based enforcement outside the live-linked skill surface.
- **Status:** `done`
- **Steps:**
  - [x] Require Mode 3 metadata fields to match the canonical `framework/HE Index.md` entry exactly
  - [x] Require `Current State` to stay grounded in the actual workspace and forbid invented target/workspace names
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep Mode 3 lightweight, and avoid claiming mechanical enforcement beyond the skill contract.
- **Checkpoints:** Canonical-source rules added; workspace-grounding rules added; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: HELab Structural Convergence Assessment

- **Goal:** Rigorously assess whether HELab should converge the project and live-linked skill into a more unified folder structure, including feasibility, migration cost, risks, and likely payoff for target-project delivery.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R008`
- **Scope:** Repository structure, skill surface under `.agent/skills/harnessing-agents/`, canonical `framework/` surface, root governance files, and harness tooling that encodes current path assumptions. Out of scope: implementing the restructure in this step.
- **Status:** `done`
- **Steps:**
  - [x] Inventory the current path-coupling points and duplication boundaries across framework, skill, tooling, and governance
  - [x] Evaluate structural options, migration feasibility, and cost/risk tradeoffs against target-project delivery primacy
  - [x] Deliver a critical recommendation with concrete migration paths, if any
- **Constraints:** Treat `framework/` canonical-truth rules and the dual-mode live-linked contract as first-class constraints; do not propose a restructure that weakens downstream delivery clarity without a strong offsetting benefit.
- **Checkpoints:** Coupling inventory complete; option matrix complete; recommendation tied to concrete repo surfaces.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Feature Lookup Output Enforcement

- **Goal:** Make Mode 3 feature lookups produce a deterministic output shape that includes current-state checks and explicit next valid actions, so agents do not stop after only printing the L1→L5 chain.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: changing the P2-3 framework definition itself or adding a repository code gate.
- **Status:** `done`
- **Steps:**
  - [x] Replace the soft Mode 3 guidance with a required output structure that includes state check and next actions
  - [x] Update public docs so the expected feature-lookup behavior is explicit
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep Mode 3 lightweight, and avoid claiming mechanical enforcement that does not yet exist.
- **Checkpoints:** Required Mode 3 sections added; docs updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Feature Lookup Template Hardening

- **Goal:** Make Mode 3 feature lookups follow a dedicated response template and explicitly reject field/value summary output, so the live-linked skill produces the intended state-aware answer shape in practice.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, `.agent/skills/harnessing-agents/templates/HE-FEATURE-LOOKUP.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: adding a parser-based enforcement gate.
- **Status:** `done`
- **Steps:**
  - [x] Add a dedicated Mode 3 feature-lookup template
  - [x] Bind the skill contract to that template and ban field/value summary output
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep Mode 3 lightweight, and avoid claiming parser-level enforcement that does not yet exist.
- **Checkpoints:** Template exists; Mode 3 references it directly; docs updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Feature Lookup State Awareness

- **Goal:** Make Mode 3 feature lookup suggestions state-aware so the skill does not propose duplicate HELab work, invent new requirement IDs unnecessarily, or guess a target project name that the user did not specify.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: changing the canonical framework definitions for P2-3 itself.
- **Status:** `done`
- **Steps:**
  - [x] Add a Mode 3 output contract that requires current-state checks before suggesting next actions
  - [x] Prevent guessed target-project names and duplicate HELab implementation suggestions when the feature is already mounted locally
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep feature lookup lightweight, and rely only on canonical state surfaces already present in the repo.
- **Checkpoints:** State-aware follow-up rules added; stale-option guardrails added; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Feature Lookup Path Hardening

- **Goal:** Prevent `harnessing-agents` feature lookups from guessing non-canonical paths like `framework/features/P2-3.md` or `docs/REQUIREMENTS.md` when the real sources are `framework/HE Index.md`, zero-padded feature files, and the root `REQUIREMENTS.md` ledger.
- **Requirement IDs:** `HE-R001`, `HE-R004`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/SKILL.md`, relevant skill references, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` for review tracking. Out of scope: changes to support material under `docs/`.
- **Status:** `done`
- **Steps:**
  - [x] Update feature-mode instructions so agents resolve the feature path from `framework/HE Index.md` instead of inferring filenames
  - [x] Explicitly bind requirement traceability requests to the root `REQUIREMENTS.md` ledger
  - [x] Run independent review, validate, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep the instructions portable across IDEs, and avoid adding redundant navigation rules outside the canonical skill surfaces.
- **Checkpoints:** Feature lookup path rule updated; requirements-ledger rule updated; review recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Target-Project P2-3 Delivery

- **Goal:** Make the live-linked `harnessing-agents` skill capable of planning and mounting a reusable P2-3 independent-review pattern in target projects rather than only describing the feature abstractly.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R008`
- **Scope:** `.agent/skills/harnessing-agents/`, `framework/HE Harnessing Protocol.md`, `README.md`, `RELEASES.md`, `PLANS.md`, and `REVIEWS.md` as needed for review. Out of scope: building a repo-specific validator for every possible target-project stack.
- **Status:** `done`
- **Steps:**
  - [x] Design the reusable target-project P2-3 mount pattern and encode it in the skill references/templates
  - [x] Update the skill and protocol so full audits can recommend and execute the target-project review gate concretely
  - [x] Run independent review, validate the repository, and archive the plan
- **Constraints:** Preserve target-project delivery primacy, keep audit artifacts under `.harness/`, and distinguish reusable target-project assets from HELab-only self-hosted enforcement.
- **Checkpoints:** P2-3 mount reference exists; target-project review ledger template exists; skill/protocol wording explains how to apply the pattern; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Target-Project Delivery Primacy

- **Goal:** Codify that HELab's primary mission is to make the live-linked `harnessing-agents` skill capable of effectively applying the full Harness Engineering framework to target projects.
- **Requirement IDs:** `HE-R008`
- **Scope:** `AGENTS.md`, `ANCHORS.md`, `REQUIREMENTS.md`, `README.md`, `.agent/skills/harnessing-agents/SKILL.md`, and `RELEASES.md`. Out of scope: implementing any new target-project feature mounts in this step.
- **Status:** `done`
- **Steps:**
  - [x] Add a canonical requirement that target-project application effectiveness is the primary success criterion
  - [x] Add a strategic anchor and repository-purpose wording that self-hosting is validation, not the end state
  - [x] Update the live-linked skill overview so target-project delivery remains explicit during skill execution
  - [x] Re-run validation and archive the plan
- **Constraints:** Preserve the existing live-linked contract, avoid weakening the self-hosted proof role, and keep the new wording portable across IDEs and sessions.
- **Checkpoints:** Requirement added; anchor added; repo and skill wording aligned; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: P2-3 Independent Review Gate

- **Goal:** Mechanize P2-3 in the self-hosted harness by requiring a machine-readable independent review record for changes to core harness surfaces.
- **Requirement IDs:** `HE-R003`, `HE-R007`
- **Scope:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `PLANS.md`, `REVIEWS.md`, `scripts/he-lint.js`, `scripts/harness/audit.sh`. Out of scope: new CI workflows, release automation changes, and support material under `docs/`.
- **Status:** `done`
- **Steps:**
  - [x] Add a canonical root review ledger and document the review-required surfaces
  - [x] Extend `he-lint` and `audit.sh` so review-required changes fail without a valid independent review record
  - [x] Run an independent review pass for this change, record it in `REVIEWS.md`, and re-run validation
- **Constraints:** Preserve the live-linked skill contract, keep the review artifact machine-readable, and do not fake a separate release boundary or human-only process.
- **Checkpoints:** Review ledger exists; P2-3 gate fails closed; current change has a recorded independent review; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Release Baseline Migration

- **Goal:** Migrate the temporary `1.0.0` root-version state onto the existing published tag line by releasing the current live-linked HELab changes as `v3.3.2`.
- **Requirement IDs:** `HE-R005`, `HE-R006`
- **Scope:** `package.json`, `.agent/skills/harnessing-agents/SKILL.md`, `RELEASES.md`, `PLANS.md`, git tag state, and the GitHub release record.
- **Status:** `done`
- **Steps:**
  - [x] Move the root and mirrored skill version from `1.0.0` to `3.3.2`
  - [x] Rewrite `RELEASES.md` so the pending changes land under a real `3.3.2` release entry instead of an unreleased `1.0.0` placeholder
  - [x] Re-run validation and commit the release-baseline migration
  - [x] Create tag `v3.3.2` and publish the GitHub release
- **Constraints:** Preserve the live-linked version-sync rule, avoid creating a backward-facing release tag, and make the published release history match the existing `v3.3.1` lineage.
- **Checkpoints:** Root version advanced; release notes aligned; validation green; tag and GitHub release created.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Release Semantics Hardening

- **Goal:** Make the live-linked HELab release model operational by adding a release-notes surface, aligning `/ccpr` with the root version contract, and enforcing downstream-impact updates through the harness.
- **Requirement IDs:** `HE-R002`, `HE-R004`, `HE-R005`, `HE-R006`
- **Scope:** `.agent/workflows/ccpr.md`, `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `PLANS.md`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, and a new root release-notes file.
- **Status:** `done`
- **Steps:**
  - [x] Add a root HELab release-notes surface for versioned downstream change tracking
  - [x] Update `/ccpr` to use `package.json` as the canonical release version source
  - [x] Add a lint rule requiring release-notes updates when live-linked downstream surfaces change
  - [x] Re-run validation and archive the plan
- **Constraints:** Preserve the live-linked skill model, avoid introducing a fake independent skill release boundary, and keep release semantics grounded in the root HELab version.
- **Checkpoints:** Release-notes file exists; `/ccpr` aligned; downstream-impact gate active; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Live-Linked Skill Version Sync

- **Goal:** Align the repository contract with the real live-linked consumption model and add a mechanical method that syncs the `harnessing-agents` skill version from HELab's root version.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R004`, `HE-R005`
- **Scope:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `package.json`, `scripts/he-lint.js`, `scripts/`, `.agent/skills/harnessing-agents/SKILL.md`, and `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Reframe docs so the skill is described as a live-linked HELab component rather than an independently released artifact
  - [x] Add a deterministic sync command that copies the root version into the skill metadata
  - [x] Add a validation gate that fails when `package.json` and the skill version diverge
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve `framework/` as canonical truth, keep the skill metadata concise, and prefer a mechanical guardrail over a documentation-only rule.
- **Checkpoints:** Contract wording aligned; sync command available; lint gate catches version drift; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Framework-to-Skill Wording Alignment

- **Goal:** Align the remaining protocol and released skill wording with the clarified contract that target projects are harnessed by running the `harnessing-agents` skill, including HELab self-host mode.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R004`
- **Scope:** `framework/HE Harnessing Protocol.md`, `.agent/skills/harnessing-agents/`, `.agent/workflows/mount.md`, and `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Tighten framework protocol wording so it explicitly describes skill-driven target-project and self-host execution
  - [x] Align released skill references with the clarified contract and current support-material rules
  - [x] Fix stale workflow references to `CLAUDE.md` and incomplete skill paths where `AGENTS.md` and `.agent/skills/harnessing-agents/` are canonical
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve the framework as the canonical knowledge source, keep the released skill surface concise, and avoid changing templates unless the contract actually requires it.
- **Checkpoints:** Protocol aligned; skill references aligned; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Skill Boundary Contract Correction

- **Goal:** Correct the repository contract so it reflects the actual product boundary: framework definitions plus the released `harnessing-agents` skill that target projects run and this repository self-hosts.
- **Requirement IDs:** `HE-R001`, `HE-R002`, `HE-R004`
- **Scope:** `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `ANCHORS.md`, `package.json`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Reframe root governance docs around framework-plus-skill delivery
  - [x] Align the dual-mode contract with skill execution in target projects and self-hosted use here
  - [x] Expand active harness validation to include the released skill surface
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve `framework/` as the canonical knowledge source, keep `docs/` non-authoritative, and avoid changing the skill behavior itself unless the contract requires it.
- **Checkpoints:** Root contract corrected; skill surface added to validation; verification green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Dual-Mode Intake Enforcement

- **Goal:** Repair canonical content defects, add a real self-hosted requirements intake gate, and align the repository contract with the explicit dual self-hosted plus target-project intent.
- **Requirement IDs:** `HE-R002`, `HE-R003`, `HE-R004`
- **Scope:** `REQUIREMENTS.md`, `AGENTS.md`, `ANCHORS.md`, `PLANS.md`, `package.json`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, and affected framework feature files.
- **Status:** `done`
- **Steps:**
  - [x] Create a machine-readable root requirements ledger for the self-hosted repository contract
  - [x] Enforce active-plan requirement IDs through the live he-lint gate
  - [x] Update repository contract and anchors to the dual-mode self-hosted plus target-project model
  - [x] Repair malformed canonical feature content and re-run validation
- **Constraints:** Preserve the 32-feature framework structure, keep support material non-authoritative, and only claim local enforcement where the repo now has a real gate.
- **Checkpoints:** Ledger created; he-lint gate active; dual-mode contract recorded; validation green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Framework Surface Consistency Sweep

- **Goal:** Remove remaining active-surface references that still treat `docs/`, `research/`, or `references/` as canonical dependencies, then perform a framework-only critique.
- **Scope:** `framework/`, `.agent/workflows/`, `PLANS.md`, and active root harness files. Out of scope: editing support material under `docs/` unless required for path integrity.
- **Status:** `done`
- **Steps:**
  - [x] Inspect root shims and active-surface files for stale support-material coupling
  - [x] Patch canonical framework/workflow files to align with the framework-only scope rule
  - [x] Re-run mechanical validation on the active harness surface
  - [x] Produce a fresh framework-only critique
- **Constraints:** Preserve the framework's canonical structure and avoid promoting support material back into the active surface.
- **Checkpoints:** Active-surface references cleaned; validation green; critique completed.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Framework-Only Surface Cleanup

- **Goal:** Align the repository's active harness with the new scope rule that `framework/` is canonical and `docs/` is non-core support material.
- **Scope:** `AGENTS.md`, `README.md`, `docs/ARCHITECTURE.md`, `docs/OBSERVABILITY.md`, `scripts/he-lint.js`, `scripts/harness/audit.sh`, `package.json`, `PLANS.md`.
- **Status:** `done`
- **Steps:**
  - [x] Update root meta-docs to describe `framework/` as the only canonical product surface
  - [x] Remove `docs/` from active harness enforcement where it is currently treated as required/core
  - [x] Retune lint/audit behavior to focus on the active project surface instead of support material
  - [x] Re-run quality checks and archive the plan
- **Constraints:** Preserve the existing framework structure and feature counts; do not change canonical framework content unless required for path integrity.
- **Checkpoints:** Meta-docs aligned; enforcement scripts aligned; verification green.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Repository Critique Audit

- **Goal:** Conduct a rigorous repository-wide critique to identify structural weaknesses, validation gaps, documentation drift, and improvement opportunities across the harness.
- **Scope:** Root meta-docs, `docs/`, `framework/`, `research/`, `scripts/`, and package-level validation commands. Out of scope: changing canonical framework definitions unless a critique requires a concrete reference.
- **Status:** `done`
- **Steps:**
  - [x] Run the existing mechanical checks (`npm run check`, `npm run audit`) and inspect failures or blind spots
  - [x] Review root governance docs and harness scripts for contradictions, missing enforcement, or weak signals
  - [x] Sample canonical `framework/` files and downstream `research/` files for drift and machine-readability issues
  - [x] Produce prioritized findings with exact file citations and concrete remediation directions
- **Constraints:** `framework/` remains canonical truth; do not “fix” issues during the review unless explicitly requested; findings must distinguish hard defects from tuning opportunities.
- **Checkpoints:** Mechanical validation captured; documentation layers sampled; final findings ranked by severity.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Principle-to-Practice Chain Restructuring

- **Goal:** Restructure the entire HE framework so every feature, prevention item, DO NOT rule, and enhancement option is organized through the 5-level Principle-to-Practice Chain defined in `HE Principle Practice Chain.md`. Success = every chain level (L1–L5) is explicitly populated for all 32 features, and all supporting documents (Prevention Checklist, Enhancement Options, Gap Evaluation, DO NOT rules) trace back to their chain position.
- **Scope:**
  - IN: `framework/HE Design Decisions.md`, `framework/HE Actions Tools.md`, `framework/HE Negative Actions.md`, `framework/HE Inverse Outcomes.md`, `framework/HE Principle Practice Chain.md`, `AGENTS.md` (DO NOT + Conventions sections), `ANCHORS.md`
  - OUT: `references/` (read-only), `research/` (will need consistency alignment AFTER framework changes, via `/revise-comments`), `framework/HE Harnessing Protocol.md` (wraps L4 execution — update references only)
- **Status:** `done`
- **Steps:**
  - [x] Phase 0: Deep Research — Read all framework documents and map current chain coverage
  - [x] Phase 0: Gap Analysis — Produce `tmp/Chain Restructuring Analysis.md` with per-feature chain gaps
  - [x] Phase 0: Extract implicit principles (L1) — Draft 23 Engineering Principles from implicit content
  - [x] Phase 1A: Define L1 (Engineering Principles) — Finalized 19 principles (EP-1 through EP-19); validated timeless, general, first-principles-derived; mapped to governed features
  - [x] Phase 2A: Create modular framework files — Defined 32 features and 19 principles in `framework/features/` and `framework/principles/`, indexed by `framework/HE Index.md`
  - [x] Phase 2B: Update framework documents — Principles, features, and cross-cutting concerns updated and verified
  - [x] Phase 3: Cross-Cutting Alignment — Integrated into `framework/cross-cutting/`: Prevention Checklist, Reward Engineering, Token Economics, SAS→MAS readiness
  - [x] Phase 4: Validation — `npm run check` passes clean (markdownlint + cspell + he-lint)
  - [x] Phase 5: Consistency Cascade — Run `/revise-comments` to align `research/` documents with updated `framework/` modular definitions
  - [x] Phase 6: Anchor — Write new ANCHORS.md entry (A9) recording the Chain Restructuring decision
- **Constraints:**
  - The 32-feature count (A6) must remain exactly 32 — no features added or removed
  - The 3-Pillar + 1-Foundation taxonomy (A1) is preserved — chain restructuring adds depth, not width
  - `framework/` remains the single source of truth (A3) — no principle definitions in `research/`
  - Unified feature definitions (A4) — no SAS/MAS splits introduced
  - All changes must pass `he-lint.js` pre-commit and CI checks
  - Each phase should be executable in a single agent context window
- **Checkpoints:**
  - CP1: Phase 0 complete (analysis + principle draft) → commit `tmp/Chain Restructuring Analysis.md`
  - CP2: Phase 1 complete (L1 + L2 + L5 defined for all 32 features) → commit updated Chain.md
  - CP3: Phase 2 complete (all framework docs updated) → commit batch
  - CP4: Phase 4 complete (validation green) → commit verification
  - CP5: Phase 5 complete (research/ aligned) → commit consistency
- **Blocking Issues:** All resolved.
  - ~~**Principle granularity:**~~ RESOLVED — Apply chain rigor: merge/split principles according to the chain. Refined from 23 draft to 19 final principles (EP-1 through EP-19). Each is timeless, first-principles-derived, and distinctly different. Merged: EP-2+EP-14→EP-2 (Persistence); EP-16+EP-20→EP-14 (Clarity before commitment); EP-21+EP-23→EP-18 (Entropy); EP-22+EP-3.4→EP-19 (Living documentation). Removed EP-15 (git-as-memory demoted to L3 design pattern under EP-2).
  - ~~**L5 measurability:**~~ RESOLVED — L5 framed as "what implementors should measure" not what this docs repo measures internally.
  - ~~**Chain.md role:**~~ RESOLVED — `HE Principle Practice Chain.md` stays as meta-document describing the chain model. New `HE Principle Map.md` created as the canonical principle-to-practice map for all 32 features.
- **Completed:** 2026-04-09

### Plan: Workspace Entropy Reconciliation

- **Goal:** Eliminate workspace entropy by standardizing terminology, aligning meta-documentation with the modular framework DAG, and remediating broken references.
- **Scope:** Root meta-docs (`README.md`, `AGENTS.md`, `ANCHORS.md`, `PLANS.md`), `framework/`, `research/`, and `docs/`.
- **Status:** `done`
- **Steps:**
  - [x] Phase 1: Terminology Standardization — Align pillar/verb strings across all files
  - [x] Phase 2: Meta-Doc Realignment — Update structure and feature counts in `README.md` and `AGENTS.md`
  - [x] Phase 3: Reference Remediation — Redirect 18+ broken research links to `framework/HE Index.md` and modular files
  - [x] Phase 4: Consistency Loop — Run `/revise-comments` and final `npm run audit`
- **Constraints:** `framework/` is canonical truth (A3). 32-feature count is check-sum (A6).
- **Checkpoints:** CP1: Root docs updated → CP2: Research links remediated → CP3: Final audit pass.
- **Blocking Issues:** None.
- **Completed:** 2026-04-09

### Plan: Build Workflow Reconciliation

- **Goal:** Reconcile `.agent/workflows/build.md` and all `harnessing-agents` skill files with the latest framework edition — specifically `HE Harnessing Protocol.md`, `HE Principle Practice Chain.md`, and `HE Principle Map.md`. Align scoring systems, feature counts (31→32), chain-level annotations, and EP principle backlinks across all files.
- **Scope:**
  - IN: `.agent/workflows/build.md`, `.agent/skills/harnessing-agents/` (SKILL.md, references/, templates/)
  - OUT: `framework/` (read-only source of truth), `research/`, `references/`
- **Status:** `done`
- **Steps:**
  - [x] Read all framework docs and build workflow; identify 6 divergence gaps
  - [x] Socratic questioning (P1-11) — 6 clarifications confirmed by user
  - [x] Rewrite `build.md`: EP-N table, chain annotations on all 5 phases, canonical 6-dim scoring (0-5), 32-feature count, HE Principle Map.md as source
  - [x] Cascade to `SKILL.md`: version 3.1.0→4.0.0, Canonical Sources section, 32 features, EP-15 backlink
  - [x] Cascade to `references/he-quick-start.md`: P1-12 item, EP range annotations, 32 features
  - [x] Cascade to `references/he-scoping-evaluation.md`: chain-level mappings on all 6 dimensions, 32 features
  - [x] Cascade to `references/he-scoring.md`: Chain Level column, P1-12 range
  - [x] Cascade to `references/he-full-audit.md`: chain annotations on all 7 phases, 32 features, Principle Map ref
  - [x] Cascade to `references/he-chain-context.md`: full P1-12 Skill Engineering feature entry
  - [x] Cascade to `references/he-subagent-prompts.md`: Context Agent scope P1-1→P1-12
  - [x] Cascade to `references/he-cascade-analysis.md`: P1-12 entry (Impact Weight 4)
  - [x] Validation: `npm run check` passes clean
- **Constraints:** Framework docs are read-only source of truth. Canonical scoring = 6 dimensions (0-5) from HE Inverse Outcomes.md. All 31→32 refs updated. EP-N replaces governing principles.
- **Checkpoints:** CP1: build.md rewritten → CP2: SKILL.md versioned → CP3: all references cascaded → CP4: lint green
- **Blocking Issues:** None.

### Plan: Harness Engineering Playbook Bootstrap

- **Goal:** Apply all nine OpenAI Harness Engineering practices to this repository, closing gaps identified in the baseline audit.
- **Scope:** Root-level meta-docs, `docs/`, `scripts/harness/`, `package.json`, `CLAUDE.md`. Out of scope: `framework/`, `research/`, `references/` content.
- **Status:** `done`
- **Steps:**
  - [x] Baseline repo — inventory existing artifacts and CI
  - [x] Identify gaps against the 9 HE practices
  - [x] Create `PLANS.md` (Practice 5)
  - [x] Create `docs/ARCHITECTURE.md` (Practice 3)
  - [x] Create `docs/OBSERVABILITY.md` (Practice 4)
  - [x] Create `scripts/harness/smoke.sh`, `lint.sh`, `audit.sh` (Practice 6)
  - [x] Add `smoke`, `check`, `ci`, `audit` npm scripts (Practice 1)
  - [x] Update `CLAUDE.md` with new commands (Practice 2)
- **Constraints:** Do not edit `framework/` or `references/` content. Preserve all existing conventions. Do not overwrite `.husky/pre-commit` or CI workflows.
- **Checkpoints:** `docs/` complete → scripts complete → package.json updated → CLAUDE.md updated.
- **Blocking Issues:** None.
- **Completed:** 2026-04-04
