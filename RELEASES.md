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

- None yet.

### Fixed

- None yet.

### Tooling

- None yet.

### Downstream Impact

- None yet.

## 1.0.0 - 2026-04-09

### Summary

Established the explicit live-linked HELab contract and made the root repository version authoritative for the shared skill surface.

### Changed

- Reframed the `harnessing-agents` skill as a live-linked HELab component rather than an independently packaged release.
- Declared `package.json` as the canonical version source and mirrored that version into `.agent/skills/harnessing-agents/SKILL.md`.

### Tooling

- Added `npm run sync:skill-version` and a `he-lint` gate for version drift.
- Added this `RELEASES.md` surface for tracking downstream-facing HELab changes.
