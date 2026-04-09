# Feature Implementation Guide Pattern

Canonical shape for execution-oriented feature guides used by the live-linked `harnessing-agents` skill.

Use this pattern when a feature already exists in the abstract `framework/features/P*.md` chain but target-project delivery needs concrete files, commands, templates, and verification steps.

## Purpose

Turn a feature gap into a repeatable target-project remediation recipe without mutating the canonical framework definition.

The framework file stays responsible for the L1-L5 chain.
The implementation guide is responsible for target-project execution details.

## Required Sections

Every feature implementation guide should contain these sections, in order:

1. `Goal`
2. `Planning Pattern`
3. `Execution Pattern`
4. `Verification Pattern`
5. `Do Not`

## Planning Pattern Rules

- State when the guide should be used during Phase 3 planning.
- Identify the likely remediation level (`Light`, `Medium`, `Heavy`) based on missing infrastructure.
- Point to key dependencies from the canonical feature graph when they affect sequencing.

## Execution Pattern Rules

- List concrete file names, command surfaces, hooks, or templates to mount.
- Prefer the narrowest repo-native mechanism that fits the target stack.
- Distinguish required artifacts from optional hardening.
- Reuse existing target-project validation surfaces when possible instead of introducing HELab-specific machinery by default.

## Verification Pattern Rules

- Show how to prove the feature blocks the failure mode it is meant to prevent.
- Prefer failure-first verification, then success-after-fix verification.
- Tell the agent where to record the verification result in `.harness/HE-CHANGE-SUMMARY.md`.

## Do Not

- Do not restate the abstract L1-L5 chain as a substitute for execution guidance.
- Do not require HELab-specific file names unless the mounted artifact is intentionally canonical across target projects.
- Do not force a heavyweight framework-local script when an existing repo-native command, hook, or workflow is sufficient.
- Do not omit verification steps.
