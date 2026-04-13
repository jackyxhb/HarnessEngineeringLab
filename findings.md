# Findings

## Candidate Issues

- HE Index `downstream` semantics appear to mix hard dependencies with softer relationships like `Protects`, which makes automated contradiction checks ambiguous.

## Confirmed Issues

- `framework/features/P0-01.md` states that P0-5 Orchestration and P1-3 Tool Offloading are `Required by` dependents, and `framework/HE Index.md` lists them in P0-1's `downstream` set, but the dependent feature files only declare `P0-10` and `P0-2` respectively under `Requires:`. This leaves the canonical dependency model internally inconsistent.

## Remediation

- Clarified `framework/HE Index.md` so `downstream` is explicitly a broader framework-graph relationship, not a synonym for hard `Requires` edges.
- Removed the unsupported `P0-5` and `P1-3` entries from `framework/features/P0-01.md` `Required by` metadata.
- Added a `scripts/he-lint.js` rule that fails when a feature asserts `Required by` metadata that the dependent feature does not actually declare under `Requires:`.

## Non-Issues

- P0-1 and P0-2 explicitly reconcile ephemeral sandboxes with durable Git-tracked outputs; that pair is internally consistent.
- Missing reverse references in `Required by:` lists were treated as metadata incompleteness, not contradictions, because that pattern appears throughout the canonical feature set.
