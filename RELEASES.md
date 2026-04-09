# HELab Releases

Canonical release notes for HELab and the live-linked `harnessing-agents` skill surface it ships.

- **Canonical version source:** `package.json`
- **Mirrored skill metadata version:** `.agent/skills/harnessing-agents/SKILL.md`
- **Downstream impact rule:** If changes under `framework/` or `.agent/skills/harnessing-agents/` affect linked consumers, update the `Unreleased` section before merging.

## Unreleased

### Summary

Pending downstream changes for the next HELab version.

### What's New

- None yet.

### Changed

- Revised the `harnessing-agents` skill to remove the quick scan mode and make full audit mode the default.
- Implemented P1-5 Observability / Dashboards with centralized logging and real-time dashboards.
- Implemented P0-4 Ralph Loops with exit interception hooks and prompt reinjection utilities.

### Fixed

- Repaired `framework/features/P0-05.md` so its L3, L5 gap-signal, and L5 measurement sections align with the Principle-to-Practice Chain instead of carrying mixed-in corruption and failure-state bullets.
- Normalized `framework/features/P1-04.md` to use the canonical JSON `improvement_policies` structure and synced `framework/features/P1-06.md` back to the L2 wording declared in `framework/HE Index.md`.

### Tooling

- Extended `scripts/he-lint.js` to validate canonical feature-chain structure, EP mapping consistency, JSON-formatted `improvement_policies`, and failure-state bullets accidentally placed in L5 measurement sections.

### Downstream Impact

- The `harnessing-agents` skill now defaults to full audit mode instead of quick scan, affecting how target projects are audited by default.
- Linked downstream consumers now receive corrected canonical feature definitions for `P0-5`, `P1-4`, and `P1-6`, and future regressions of the same class fail `npm run smoke` instead of passing silently.

## 4.1.0 - 2026-04-09

### Summary

Shipped the first reusable first-mount governance execution capability, added a canonical framework terms reference, and normalized the live skill language around Repo Profiles and Feature Packages.

### What's New

- Added `HE-R009` to authorize concrete feature implementation guides as the next target-project delivery layer for the live-linked `harnessing-agents` skill.
- Added the canonical `he-feature-implementation-guide-pattern.md` reference plus the first concrete target-project execution guides for `P0-3 Verification` and `P1-10 Requirements Ledger`.
- Added a second execution-guide tranche for `P0-1 Bash Sandboxes`, `P1-7 Planning, Task Lists & Blackboards`, and `P2-5 Upstream Intake Gate`.
- Added `HE-R010` and a draft harness-injection protocol reference so the skill now has a permanent lifecycle model for slot classes, touch-points, safety levels, and proof obligations during target-project execution.
- Added `HE-R011` to authorize a reusable first-mount governance execution pattern for documentation-heavy repositories.
- Added `HE-R012` to authorize a canonical framework terms reference that distinguishes framework ontology from skill-side delivery terminology.

### Changed

- Recorded a new strategic anchor and active plan for shipping execution-oriented guide patterns that let the skill turn feature gaps into concrete remediation steps in target projects.
- Updated the full-audit workflow and live-linked skill contract so Phase 3 planning and Phase 4 execution prefer feature-specific implementation guides when they exist instead of improvising from abstract feature text.
- Tightened the implementation-planning template so remediation entries must name the feature-specific guide used when a shipped mount pattern exists.
- Folded the first real external target proof back into the skill guidance so audits preserve a target project's live execution-plan surface during inspection and retarget that plan only after a specific remediation batch is approved.
- Began codifying target-repository mutation flow as a skill-side harness-injection protocol instead of leaving slot and touch-point handling implicit inside individual feature guides.
- Recorded the CareerHelper protocol test as a second external proof that strong repos should be classified through slot and touch-point strength first, with live mutation deferred until a narrow approved batch exists.
- Recorded the ServiceAgent protocol test as a third external proof that strong contract and verification surfaces do not eliminate the need for live planning, requirements-ledger, intake-gate, and review-ledger infrastructure.
- Recorded the encA0 protocol test as a fourth external proof that a mature repo can already have strong harness and verification surfaces while still needing selective mutation because its portable contracts, planning state, and harness audit docs have drifted out of sync with live enforcement.
- Recorded the ENCT protocol test as a fifth external proof that documentation-heavy repositories with minimal harness infrastructure should be treated as first-mount governance targets rather than as application-style remediation cases.
- Converted the ENCT repo profile from audit-only proof into a real execution proof by shipping a first-mount governance guide and applying it to ENCT with a passing smoke command.
- Opened a canonical framework terms reference so growing delivery-layer vocabulary can be defined without overloading core framework terms.
- Normalized the live skill and protocol references to use `Repo Profile` and `Feature Package` consistently against `framework/HE-Terms.md`.

### Fixed

- None yet.

### Tooling

- Added a synthetic target-project proof under `tmp/` to exercise the shipped `P0-3` and `P1-10` guides end to end without claiming success against a real external repository.
- Added a real target-project proof note from ACSS showing the shipped guide layer successfully drove focused `P2-5`, `P2-3`, and `P0-3` follow-on batches in an external repository.
- Added a permanent draft reference that describes how the skill should classify repo slots, resolve concrete touch-points, stage mutations, and verify harness injection during target-project runs.
- Added a second real target-project proof note from CareerHelper showing the draft protocol can stop at audit-only staging and still identify stronger pre-existing slots plus narrower Tier 1 gaps.
- Added a third real target-project proof note from ServiceAgent showing the draft protocol can distinguish mature contract and verification surfaces from missing intake and live planning infrastructure without rewriting stable repo-native controls.
- Added a fourth real target-project proof note from encA0 showing the draft protocol can identify a drifted-harness repo profile where the first safe batch is an audit refresh plus contract-sync planning rather than a new harness mount.
- Added a fifth real target-project proof note from ENCT showing the draft protocol can identify a documentation-heavy knowledge archive as a first-mount governance case and stage the result entirely under `.harness/`.
- Added a reusable first-mount governance mount pattern so the skill can execute the ENCT-style repo profile as a deterministic batch instead of composing the batch ad hoc from multiple feature guides.
- Added a real execution proof in ENCT showing the first-mount governance pattern can install a portable contract, intake and planning ledgers, review tracking, and a lightweight smoke gate on a documentation-heavy archive.
- Added `framework/HE-Terms.md` as the canonical reference for current Harness Engineering terminology, including the boundary between framework terms and skill-side execution terms like `Feature Package`.

### Downstream Impact

- Target-project audits can now route directly to concrete execution guides for `P0-1`, `P0-3`, `P1-7`, `P1-10`, `P2-3`, and `P2-5` instead of improvising remediation from abstract feature text.
- Implementation plans now explicitly record which shipped guide was used when a feature has a mount pattern.
- The full-audit guidance now tells the skill to keep audit planning in `.harness/` first when a target repo already has a live execution-plan surface, reducing the risk of overwriting active delivery work during inspection.
- The live-linked skill now carries an explicit harness-injection draft that can standardize how future target-project runs move from inspection to safe, verified mutation.
- The harness-injection draft now has two external proof points with different repo profiles, increasing confidence that selective mutation and staged planning should stay the default behavior for strong target repositories.
- The harness-injection draft now has three external proof points across different repo profiles, improving confidence that target-project audits should distinguish contract strength, verification strength, and intake/planning weakness before selecting a remediation batch.
- The harness-injection draft now has four external proof points across different repo profiles, improving confidence that target-project audits should also distinguish drifted-harness repos from both missing-harness repos and intake-first repos before choosing a remediation batch.
- The harness-injection draft now has five external proof points across different repo profiles, improving confidence that target-project audits should also distinguish documentation-heavy first-mount governance targets from both application repos and drifted-harness repos before choosing a remediation batch.
- The live-linked skill now has a reusable execution path for first-mount governance targets, reducing the gap between repo-profile classification and narrow target-project remediation.
- Agents and humans now have a canonical terminology reference in `framework/`, reducing drift between framework ontology and newer delivery-layer terms.

## 4.0.0 - 2026-04-09

### Summary

Cut the first major HELab release that ships the self-contained runtime bundle for the live-linked `harnessing-agents` skill and codifies target-project delivery as the primary mission.

### What's New

- Added a reusable target-project `REVIEWS.md` template and a P2-3 remediation reference so the live-linked skill can mount an independent-review pattern in external projects.

### Changed

- Clarified across the root governance docs and the live-linked skill contract that HELab's primary mission is effective target-project delivery of the full Harness Engineering feature set, with self-hosting treated as a proving loop rather than the end state.
- Began migrating the live-linked skill toward a self-contained shipped runtime by introducing a synchronized framework bundle under `.agent/skills/harnessing-agents/framework/`, while keeping the root `framework/` as canonical source of truth.
- Renamed the target-project review-ledger template to `.agent/skills/harnessing-agents/templates/HE-REVIEWS.md` so the shipped skill templates follow the established `HE-` naming convention while keeping the mounted target-project ledger name `REVIEWS.md` unchanged.
- Renamed the P2-3 target-project review reference to `.agent/skills/harnessing-agents/references/he-p2-3-review-mount-pattern.md` so the `references/` surface uses a more clearly instructional naming pattern.
- Clarified feature-lookup navigation so the skill resolves canonical feature paths from `framework/HE Index.md` and uses the root `REQUIREMENTS.md` ledger for requirement traceability.
- Clarified that Mode 3 feature lookups must check current HELab state before suggesting next actions, preventing duplicate local work and guessed target-project names.
- Strengthened Mode 3 output rules so feature lookups must return a deterministic response shape with `Current State` and `Next Valid Actions`, preventing incomplete chain-only answers.
- Added a dedicated Mode 3 feature-lookup template and explicitly disallowed field/value summary output as the default final response shape.
- Hardened Mode 3 canonical fidelity so feature metadata must match `framework/HE Index.md`, chain details must come from the canonical feature file, and `Current State` cannot invent a workspace name.

### Tooling

- Added a root `REVIEWS.md` ledger and a `he-lint` review gate for core harness surfaces.
- Updated the full-audit references so P2-3 planning and execution now call for concrete target-project review assets instead of a generic recommendation, now pointing at `templates/HE-REVIEWS.md`.
- Updated the P2-3 reference path to `references/he-p2-3-review-mount-pattern.md` to make its instructional role explicit.

### Downstream Impact

- Linked target projects now consume a self-contained skill runtime bundle instead of depending on sibling HELab framework paths, per [A17](ANCHORS.md).
- Core HELab harness changes now require a machine-readable independent review record before merge.

## 3.3.2 - 2026-04-09

### Summary

Aligned HELab's live-linked skill contract with the existing release line and added durable downstream change tracking for linked consumers.

### What's New

- Added `RELEASES.md` as the canonical HELab release-notes surface for downstream-facing changes.

### Changed

- Reframed the `harnessing-agents` skill as a live-linked HELab component rather than an independently packaged release.
- Declared `package.json` as the canonical version source and mirrored that version into `.agent/skills/harnessing-agents/SKILL.md`.
- Updated `/ccpr` to derive release tags from the root HELab version instead of a standalone skill version.

### Fixed

- Removed the backward `1.0.0` placeholder state by moving the root and mirrored skill version back onto the existing published tag line at `3.3.2`.

### Tooling

- Added `npm run sync:skill-version` and a `he-lint` gate for version drift.
- Added a downstream-impact `he-lint` rule that requires `RELEASES.md` updates when `framework/` or `.agent/skills/harnessing-agents/` changes affect linked consumers.

### Downstream Impact

- Linked target projects now observe a single coherent HELab version line again, and release notes are required for future live-linked framework or skill changes.
