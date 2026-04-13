# Task Plan

## Goal

Review the canonical framework features and principles for contradictions, broken mappings, or incompatible enforcement claims.

## Phases

- [x] Map canonical expectations from the index and chain model
- [x] Scan all feature and principle files for contradictions
- [x] Verify candidates with exact references and validation commands
- [x] Deliver findings-first review

## Constraints

- Use only the canonical framework surface.
- Treat docs/ as non-authoritative.
- Separate confirmed contradictions from wording variance.

## Errors Encountered

- Serena onboarding check tool failed with an internal invocation error; continuing with direct repository inspection.

## Notes

- `npm run smoke` passed during the audit.
- Reverse dependency blocks are not maintained exhaustively across all feature files, so omissions alone were not treated as contradictions.
- Remediation was applied by clarifying `downstream` graph semantics, removing the unsupported hard dependency claim from `P0-01.md`, and adding a lint rule for invalid `Required by` assertions.
