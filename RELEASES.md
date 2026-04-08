# HELab Releases

Canonical release notes for HELab and the live-linked `harnessing-agents` skill surface it ships.

- **Canonical version source:** `package.json`
- **Mirrored skill metadata version:** `.agent/skills/harnessing-agents/SKILL.md`
- **Downstream impact rule:** If changes under `framework/` or `.agent/skills/harnessing-agents/` affect linked consumers, update the `Unreleased` section before merging.

## Unreleased

### Summary

Pending downstream changes for the next HELab version.

### What's New

- Added a reusable target-project `REVIEWS.md` template and a P2-3 remediation reference so the live-linked skill can mount an independent-review pattern in external projects.

### Changed

- Clarified across the root governance docs and the live-linked skill contract that HELab's primary mission is effective target-project delivery of the full Harness Engineering feature set, with self-hosting treated as a proving loop rather than the end state.

### Fixed

- None yet.

### Tooling

- Added a root `REVIEWS.md` ledger and a `he-lint` review gate for core harness surfaces.
- Updated the full-audit references so P2-3 planning and execution now call for concrete target-project review assets instead of a generic recommendation.

### Downstream Impact

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
