# HELab Releases

Canonical release notes for HELab and the live-linked `harnessing-agents` skill surface it ships.

- **Canonical version source:** `package.json`
- **Mirrored skill metadata version:** `.agent/skills/harnessing-agents/SKILL.md`
- **Downstream impact rule:** If changes under `framework/` or `.agent/skills/harnessing-agents/` affect linked consumers, update the `Unreleased` section before merging.

## Unreleased

### Summary

Pending downstream changes for the next HELab version.

### What's New

- Added `HE-R009` to authorize concrete feature implementation guides as the next target-project delivery layer for the live-linked `harnessing-agents` skill.
- Added the canonical `he-feature-implementation-guide-pattern.md` reference plus the first concrete target-project execution guides for `P0-3 Verification` and `P1-10 Requirements Ledger`.
- Added a second execution-guide tranche for `P0-1 Bash Sandboxes`, `P1-7 Planning, Task Lists & Blackboards`, and `P2-5 Upstream Intake Gate`.

### Changed

- Recorded a new strategic anchor and active plan for shipping execution-oriented guide patterns that let the skill turn feature gaps into concrete remediation steps in target projects.
- Updated the full-audit workflow and live-linked skill contract so Phase 3 planning and Phase 4 execution prefer feature-specific implementation guides when they exist instead of improvising from abstract feature text.
- Tightened the implementation-planning template so remediation entries must name the feature-specific guide used when a shipped mount pattern exists.

### Fixed

- None yet.

### Tooling

- Added a synthetic target-project proof under `tmp/` to exercise the shipped `P0-3` and `P1-10` guides end to end without claiming success against a real external repository.

### Downstream Impact

- Target-project audits can now route directly to concrete execution guides for `P0-1`, `P0-3`, `P1-7`, `P1-10`, `P2-3`, and `P2-5` instead of improvising remediation from abstract feature text.
- Implementation plans now explicitly record which shipped guide was used when a feature has a mount pattern.

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
