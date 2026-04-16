# HELab Releases

Canonical release notes for HELab and the live-linked `harnessing-agents` skill surface it ships.

- **Canonical version source:** `package.json`
- **Mirrored skill metadata version:** `.agent/skills/harnessing-agents/SKILL.md`
- **Downstream impact rule:** If changes under `framework/` or `.agent/skills/harnessing-agents/` affect linked consumers, update the `Unreleased` section before merging.

## Unreleased

*No unreleased changes yet.*

## 4.2.0 - 2026-04-17

### Summary

Complete registry synchronization and binding hardening. Resolved all he-lint validation gaps by coordinating updates across measurement-definitions, prevention-rules-registry, HE Index, and feature files. Created deferred enforcement surfaces for all prevention rules targeting Tranche 4 (MAS infrastructure).

### What's New

- **Architectural Binding Remediation (P0-P3):** Resolved strict logical rule constraints by synchronizing the measurement and prevention registries with the framework features.
  - **Feature-Registry Alignment:** Updated `.harness/measurement-definitions.json` and `.harness/prevention-rules-registry.json` to include missing entries for P0-1, P0-4, and other critical P0-P3 features, ensuring 1:1 parity between feature goals and mechanical enforcement.
  - **Binding Hardening:** Added canonical `## Measurement Bindings` and `## Enforcement Bindings` sections to all feature files in `framework/features/` and `.agent/skills/harnessing-agents/framework/features/`. These sections now explicitly reference the shared standards (`framework/HE Measurement Standards.md`) and registries, including mandatory Binding Keys.
  - **Index Synchronization:** Mirrored the canonical feature IDs into the `measurement_binding` fields of `framework/HE Index.md` to ensure a deterministic path from the DAG to operational telemetry.
  - **Template Repair:** Restored missing `## L5: Measurement` and `## Dependencies` sections in `P2-01.md` to maintain structural compliance across the feature chain.
  - **Linter Validation:** Verified all changes via `node scripts/he-lint.js` to eliminate binding gaps and ensure strict adherence to the Harness Engineering structural constraints.
- **Tranche 1 P1 remediation (P1-2, P1-5, P1-6, P1-11):** Added measurement bindings and L4 tool specifications for all 4 targeted P1 features. Created `.harness/L4-P1-*-tool-specification.md` files with concrete operational recipes for context-summary generation (P1-2), task-artifact enforcement (P1-5), MCP capability discovery (P1-6), and Socratic pause automation (P1-11). Added missing `measurement_binding` fields to HE Index for P1-2 and P1-6; populated `.harness/measurement-definitions.json` with metrics for P1-2 and P1-6; added enforcement bindings sections to P1-6 and P1-11 feature files; and registered 4 new prevention rules in `.harness/prevention-rules-registry.json` with status (implemented | declared-unmounted). SAS/MAS scope clarified for all 4 features with explicit migration paths.
- **P0-9 Smart Command Wrappers polish:** Enhanced P0-09.md from high-level overview to operational clarity with three concrete workflows (`/ccp`, `/ccpr`, `/reconcile`), detailed step-by-step execution with CLI examples, explicit output format standards (JSON for agent parsing, Markdown for humans), cost stratification model with measurable latency tiers (smoke < 2s, check < 30s, audit < 60s), and prevention-rule specifications for enforcement binding to `npm run smoke` and `he-lint.js`.
- **P0-4 Ralph Loops operational clarity:** Enhanced P0-4 with comprehensive state machine diagram (pending → active → reinjected → completed/escalated), concrete JSON task-state structure with example, explicit exit-interception timing (< 1s detection latency), deterministic escalation rules (N=3 reinjections hard limit, entropy-based consecutive-failures detection, 30-min heartbeat timeout), and concrete observability thresholds (reinjection < 3, detection < 1s, escalation visibility < 5 min). Task-state compression targets explicit (< 500 tokens). Prevention rules now mechanically tied to detection mechanisms (N consecutive reinjections, entropy-based detection, time-based bailout).
- **Explicit SAS vs MAS scope clarification:** Added "Scope: SAS vs MAS" sections to P1-9 (Branch-Based Cognitive Memory), P2-3 (AI Auditors & Collaboration Channels), and P3-4 (Consolidation Loop) to distinguish single-agent and multi-agent behavior, clarify transition paths between deployment modes, and improve downstream consumer understanding of feature scope and scaling requirements.
- **Cross-tranche measurement definitions:** Added `framework/HE Measurement Standards.md`, `.harness/measurement-schema.json`, and `.harness/measurement-definitions.json`; bound the nine targeted measurement features plus `framework/HE Index.md` to the new registry; and extended `he-lint`, `npm run observe`, and `scripts/harness/audit.sh` so measurement coverage and registry freshness are now surfaced mechanically.
- **Tranche 3 graph reconciliation:** Corrected the remaining targeted graph drift in `framework/HE Index.md` for P0-1, P0-3, P0-9, and P2-3; clarified `P0-9` to name explicit downstream feature IDs (`P3-1`, `P3-3`) instead of a vague pillar-level enablement; and extended `he-lint` with targeted graph-reconciliation checks so those canonical edges stay aligned.
- **Tranche 2 enforcement bindings:** Added `framework/schemas/prevention-rules-registry.schema.json`, `.harness/prevention-rules-registry.json`, and `.harness/prevention-enforcement-config.json`; updated P0-8, P1-2, P1-5, P2-4, P2-5, and P3-3 with explicit enforcement-binding sections; and extended lint/audit surfaces so targeted prevention rules must be bound to a concrete surface or explicitly declared unmounted.
- **Tranche 1 shared schema layer:** Added canonical `.harness/*.schema.json` contracts for P1-8, P1-10, P1-11, P1-12, P3-3, and P3-4; updated those feature files and `AGENTS.md` to bind machine-readable requirements to checked-in schema surfaces; and prepared `he-lint` enforcement for schema-reference coverage.
- **P1-5 observability baseline:** Added `npm run observe`, rebuilt `scripts/generate-observation-report.js` to emit richer `.harness/observation-report.json` metrics plus generated `.harness/dashboard.md`, and wired `scripts/harness/audit.sh` to verify both outputs.
- **P0-4 Ralph Loop baseline:** Added `npm run task-state`, `npm run exit-check`, `.harness/task-state.schema.json`, and `scripts/task-state.js` so HELab now has a canonical task-state utility and reinjection surface for long-running work.
- **P0-7 escalation rules:** Added `.harness/escalation-rules.json` and upgraded `scripts/exit-interceptor.js` to emit structured reinjection and escalation events for incomplete or stuck tasks.
- **P2-4 permission manifest:** Added `.harness/agent-permissions.json` as the canonical bounded-autonomy manifest, including tiered profiles and human-approval triggers for high-risk actions.
- **P1-6 capability manifest:** Added `.harness/mcp-capabilities.json` as the canonical machine-readable declaration of HELab's MCP and web-search capability surface.
- **Structural audit count alignment:** Updated `scripts/harness/audit.sh` to expect the canonical 16-principle framework state in both the root and bundled skill-runtime checks, removing a stale 19-principle assumption left behind after the earlier consolidation.
- **Dependency metadata hardening:** Clarified that `framework/HE Index.md` `downstream` edges represent broader graph relationships than hard `Requires` links, removed the unsupported `P0-1` `Required by` claims for `P0-5` and `P1-3`, and extended `scripts/he-lint.js` to fail when any feature file asserts a `Required by` dependency that the dependent feature does not actually declare.
- **Framework contradiction audit and remediation:** Systematic validation of all 32 features and 16 principles resolved 13 mechanical inconsistencies: P3-3 L2 text realigned to outcome-focused wording in both Index and feature file; 4 DAG downstream arrays corrected (P0-2→P1-3, P1-1→P0-11, P1-2→P0-4, P1-8→P0-4); P0-4 missing dependency refs added (P1-2, P1-8); P0-1 downstream pruned (removed P1-6 false link); P0-1/P0-2 reconciliation notes added for persistent-vs-ephemeral boundary; P3-4 L2 sharpened to differentiate from P3-2; typo fixed in P0-6; broken bullet fixed in P0-3; 3 minor L2 wording drifts aligned between Index and feature files (P0-1, P0-7, P1-5). Bundle mirror synced via `npm run sync:skill-framework`.
- **Principle consolidation (19 → 16):** Merged 3 redundant/narrow engineering principles into stronger parents. EP-6 (Scaffolding is temporary) absorbed into EP-9 (Standard operations reduce variance); EP-13 (Current signals outperform stale snapshots) absorbed into EP-12 (Finite attention demands active management); EP-19 (Documentation must live with the code) absorbed into EP-11 (If it's not in the repo, it doesn't exist). All 32 features preserved unchanged; governed-feature mappings updated. Retired principle IDs (EP-6, EP-13, EP-19) leave gaps in the numbering — no renumbering applied.
- **P1-9 mount pattern:** Added `references/he-p1-9-branch-enforcement-mount-pattern.md` — the skill can now physically install branch-based cognitive memory in target projects during Phase 4 execution instead of only assessing the gap.
- **Phase 4 feature guide:** Wired P1-9 into the full-audit Additional Feature Guides so gap-to-execution routing exists for branch enforcement.
- **Assessment proof gate:** Hardened `templates/HE-ASSESSMENT-REPORT.md` Section 2 with a mandatory evidence citation rule — every feature marked `[x]` must cross-reference a concrete file or gate from `HE-CHANGE-SUMMARY.md`. Features assessed but not mounted must remain `[ ]` with a deferral reason.
- **Phase 5 proof gate:** Added an assessment proof gate blockquote to Phase 5 in `he-full-audit.md` reinforcing the evidence-over-discussion rule during verification.
- **SKILL.md guide list:** Added `he-p1-9-branch-enforcement-mount-pattern.md` to the Feature Implementation Guides section so agents discover the new P1-9 mount pattern from the skill entry point.

## 4.1.1 - 2026-04-12

### Summary

Skill quality, accuracy, and robustness improvements. Added anti-termination constraint to Phase 0 so audits can never be falsely terminated based on project type. Cleaned up stale mode references, reconciled the Protocol with the slim single-agent execution model, hardened the scan-target list, and improved portability of skill installation paths.

### What's New

- Added `framework/HE Skill Creation Standard.md` — canonical recipe for professional skill creation. Codifies the 6 Mandatory Principles (Metadata Clarity, Dual-Mode Routing, Mechanical Phases, Output Templates, Progressive Context Loading, State-Aware Actions) extracted from `harnessing-agents` v4.1.0. Governs all future skills in HELab and is top-priority governance for the live-linked skill surface.

### Changed

- Revised the `harnessing-agents` skill to remove the quick scan mode and make full audit mode the default.
- Implemented P1-5 Observability / Dashboards with centralized logging and real-time dashboards.
- Implemented P0-4 Ralph Loops with exit interception hooks and prompt reinjection utilities.

### Fixed

- Repaired `framework/features/P0-05.md` so its L3, L5 gap-signal, and L5 measurement sections align with the Principle-to-Practice Chain instead of carrying mixed-in corruption and failure-state bullets.
- Normalized `framework/features/P1-04.md` to use the canonical JSON `improvement_policies` structure and synced `framework/features/P1-06.md` back to the L2 wording declared in `framework/HE Index.md`.
- Removed stale `Mode 3` labels from `.agent/skills/harnessing-agents/SKILL.md`, `templates/HE-FEATURE-LOOKUP.md`, and `README.md`. The skill has had only two modes (`full`, `feature`) since the quick-scan removal; the `Mode 3` references were orphaned from an earlier three-mode version and contradicted the `How to Use (2 Modes)` heading.
- Added `.harness/HE-SCOPE.md` to the Mode 1 `full` output list in `.agent/skills/harnessing-agents/SKILL.md`. The artifact was already produced (Phase 0 of `references/he-full-audit.md` and declared under `Output Directory Convention`) but was missing from the summary output contract, causing drift between what the skill promises and what it writes.
- Added anti-termination constraint to Phase 0 in `references/he-full-audit.md`, `framework/HE Harnessing Protocol.md`, and `SKILL.md`. Phase 0 scoping is informational only — agents must never terminate, skip, or reduce an audit based on project type, tech stack, or scale. Incident: a target-project audit on an iOS app incorrectly concluded "not a candidate for Harness Engineering" and terminated at Phase 0 because the skill lacked an explicit prohibition against early exit.
- Documented the Protocol-to-slim-flow collapse of `HE-RECOMMENDATIONS.md` into `HE-IMPLEMENTATION-PLAN.md` in both `SKILL.md` (Mode 1) and `references/he-full-audit.md` (Phase 3). The canonical `framework/HE Harnessing Protocol.md` still splits design decisions into Task 3.1 (`HE-RECOMMENDATIONS.md` scratchpad) and Task 3.2 (`HE-IMPLEMENTATION-PLAN.md`); the slim `full` flow drafts decisions in working memory and writes the implementation plan directly, without shipping a separate recommendations artifact.
- Replaced the hardcoded `/Users/macbook1/work/HE/HELab/...` deployment path in `.agent/skills/harnessing-agents/SKILL.md` with a portable `git rev-parse --show-toplevel`-based snippet. Also added an explicit `~/.claude/skills/` symlink mirror step so Claude Code users can install the skill without assuming the `~/.agents → ~/.claude` chain already exists.
- Appended `Keywords: full, feature.` to the `description` field in `.agent/skills/harnessing-agents/SKILL.md` so the skill metadata satisfies the `{One-sentence mission}. Use when {problem}. Keywords: {routing keywords}.` shape prescribed by `framework/HE Skill Creation Standard.md`.
- Reworded the `Internal Tools` subsection in `.agent/skills/harnessing-agents/SKILL.md` to clarify the subagent-dispatch story. `references/he-subagent-prompts.md` is now explicitly described as an **optional** parallel-dispatch prompt template for orchestrators that already have subagent capability, not a baseline Mode 1 requirement. The prior wording implied the skill dispatched subagents automatically, which contradicted the `allowed-tools` list (Read/Write/Edit/Bash/Glob/Grep — no `Task`/`Agent`) and the sequential single-agent walk described in `references/he-full-audit.md` Phase 1.
- Replaced line-number citations (`SKILL.md lines X–Y`) with section-anchor references in `framework/HE Skill Creation Standard.md` at all six `**Example:**` lines for the 6 Mandatory Principles (metadata, routing, phases, templates, context loading, state awareness). Line numbers rot on any SKILL.md edit; section anchors survive reordering. Synced into the bundled mirror at `.agent/skills/harnessing-agents/framework/HE Skill Creation Standard.md` via `npm run sync:skill-framework`.
- Generalized the `Mode 2 Output Contract` state-check block in `.agent/skills/harnessing-agents/SKILL.md` to handle both HELab and target-project workspaces. The prior text unconditionally told the skill to read `REQUIREMENTS.md`, `PLANS.md`, and `REVIEWS.md`, which only applies to HELab-style repos. The new block detects workspace type from the presence of the HELab trio, falls back to inspecting `.harness/` artifacts or native plan/requirement surfaces in target projects, and requires the skill to state "no prior record" explicitly rather than inventing maturity claims when no state is available.
- Expanded the `Emphasize Automated Tooling` scan-target list in `.agent/skills/harnessing-agents/SKILL.md` to cover modern agent-contract, rule, and automation surfaces. The prior list (`CLAUDE.md`, `.cursorrules`, `.github/workflows/`, `.husky/`, `.agent/`, `AGENTS.md`) missed portable contracts (`AGENT.md`), IDE-specific rule files (`.cursor/rules/`, `.windsurfrules`, `.continue/`, `.claude/`, `.github/copilot-instructions.md`, `.aider.conf.yml`), alternate CI surfaces (`.gitlab-ci.yml`, `.circleci/`, `.pre-commit-config.yaml`, `lefthook.yml`, `Makefile`, `justfile`), and workflow surfaces (`.harness/`, `.claude/commands/`, `scripts/`). Structured as grouped sub-lists and explicitly marked **non-exhaustive** so future agent-contract formats can be added without rewriting the rule.
- Hoisted the **Canonical Path Rule** to the `framework/HE Index.md` header as the authoritative statement that feature and principle filenames are zero-padded (`P2-3` → `framework/features/P2-03.md`, `EP-3` → `framework/principles/EP-03.md`). Trimmed the three duplicate reminders in `.agent/skills/harnessing-agents/SKILL.md` (navigation protocol + Mode 2 navigation) and `references/he-full-audit.md` to short references that point at the index header. Synced the bundled skill mirror via `npm run sync:skill-framework`.
- Surfaced the Mode 1 **user checkpoint (STOP gate)** in `.agent/skills/harnessing-agents/SKILL.md`. The canonical `references/he-full-audit.md` Phase 3 and `framework/HE Harnessing Protocol.md` Task 3.2 already require stopping for user review before Phase 4 execution, but a reader of SKILL.md alone could not see that gate. Added an explicit bullet under Mode 1 stating the skill must stop and present `.harness/HE-IMPLEMENTATION-PLAN.md` for user confirmation before applying any remediation batch.
- Reconciled `framework/HE Harnessing Protocol.md` with the slim single-agent execution model used by the released skill. Added a new **Execution Modes** note to the Protocol preamble explicitly naming two modes — **multi-agent dispatch** (sibling tasks run on separate agents, every handoff requires a persisted artifact) and **single-agent slim mode** (one agent walks sequentially, handoff artifacts can collapse into working memory). Annotated Task 3.1's `HE-RECOMMENDATIONS.md` output as a **(handoff artifact)** required only for multi-agent dispatch; annotated Task 3.2's `HE-IMPLEMENTATION-PLAN.md` output as a **(shipped artifact)** required in both modes. Updated Appendix C: tagged the existing `3 Decisions` row with an `artifact_class` field explaining the multi-agent/slim distinction and added a new `3 Plan` row for `HE-IMPLEMENTATION-PLAN.md` so the shipped user-facing Phase 3 artifact is now explicitly represented in the assessment matrix. Synced the bundled mirror via `npm run sync:skill-framework`.

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
