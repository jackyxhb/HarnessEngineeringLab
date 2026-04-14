# High-Severity Issue Implementation Plans

## Scope

- **Source Report:** `.harness/HE-ASSESSMENT-REPORT.md`
- **Planning Mode:** one isolated subagent plan per high-severity issue cluster, reconciled by the parent agent
- **Goal:** translate the 4 high-severity confirmed issues into concrete remediation plans without editing `framework/` yet

## Execution Order

1. **Issue 2: Machine-readable requirements are declared without schemas**

- This is the shared-contract foundation for later measurement, enforcement, and audit work.

1. **Issue 3: Prevention rules are not bound to enforcement artifacts**

- This matches the assessment report's second remediation tranche and depends unconditionally on Issue 2's schema layer.

1. **Issue 4: Canonical graph drift still exists in key places**

- This matches the assessment report's third remediation tranche and should land once the contract surfaces are stable enough for graph-reconciliation lint rules.

1. **Issue 1: Measurements exist without operational definitions**

- This is intentionally treated as a cross-tranche issue stream. Schema-definition design can begin after Issue 2, but the main operational-definition pass should land after the shared enforcement surfaces from Issue 3 are stable.

## Assessment Tranche Mapping

- **Assessment Tranche 1: shared contracts and schemas** maps directly to **Issue 2**.
- **Assessment Tranche 2: enforcement artifact binding** maps directly to **Issue 3**.
- **Assessment Tranche 3: graph and dependency reconciliation** maps directly to **Issue 4**.
- **Assessment Tranche 4: scope and mode clarification** is out of scope for this artifact.
- **Issue 1** is intentionally cross-tranche. It depends on Tranche 1 for canonical schema and storage contracts, and it partially depends on Tranche 2 where measurement collection reuses enforcement and observability surfaces.

---

## Issue 1: Measurements Without Operational Definitions

### Issue Summary

Nine features define L5 outcomes without exact thresholds, event sources, storage keys, or collection formulas: `P0-5`, `P0-10`, `P1-1`, `P1-5`, `P1-11`, `P2-3`, `P2-5`, `P3-1`, `P3-3`.

### Root Causes

- L5 measurement clauses describe desired outcomes but not collection mechanics.
- No shared measurement contract exists across the framework.
- Thresholds still use placeholders or design-language rather than operational values.
- Existing `.harness/` observability artifacts do not define a canonical measurement registry.

### Canonical Files Likely To Change

- `framework/HE Index.md`
- `framework/features/P0-05.md`
- `framework/features/P0-10.md`
- `framework/features/P1-01.md`
- `framework/features/P1-05.md`
- `framework/features/P1-11.md`
- `framework/features/P2-03.md`
- `framework/features/P2-05.md`
- `framework/features/P3-01.md`
- `framework/features/P3-03.md`
- `framework/principles/EP-08.md`
- `framework/principles/EP-18.md`
- `scripts/he-lint.js`
- `.harness/observation-report.json`
- `.harness/dashboard.md`

### Shared Artifacts To Introduce

- `framework/HE Measurement Standards.md`
- `.harness/measurement-schema.json`
- `.harness/measurement-definitions.json`

### Ordered Implementation Steps

1. Create `framework/HE Measurement Standards.md` as the canonical contract for event source, collection trigger, formula, storage key, threshold, and enforcement surface.
2. Create `.harness/measurement-schema.json` and `.harness/measurement-definitions.json` for the 9 affected features.
3. Update the 9 affected feature files so each L5 section names concrete event sources, formulas, storage keys, and thresholds.
4. Add measurement metadata references in `framework/HE Index.md` so feature nodes can be checked against the shared registry.
5. Extend `scripts/he-lint.js` with measurement completeness checks.
6. Extend `.harness/observation-report.json` and `.harness/dashboard.md` to surface measurement health.
7. Sync the bundled skill mirror after the canonical `framework/` changes land.

### Validation And Hooks

- `npm run smoke` must fail if a feature declares an L5 measurement without an operational-definition binding.
- `npm run audit` or `npm run observe` must surface measurement coverage and freshness from `.harness/measurement-definitions.json`.
- `scripts/he-lint.js` must verify every affected feature references a valid measurement definition and required fields are present.

### Risks And Dependencies

- Depends on Issue 2 establishing shared schema conventions.
- Risks overfitting thresholds without repo evidence; threshold justification should be mandatory in the measurement registry.
- Some observability-linked measurements also depend on the enforcement and event surfaces introduced by Issue 3.
- Requires bundle sync after `framework/` changes.

---

## Issue 2: Machine-Readable Requirements Without Schemas

### Issue Summary

Six features require machine-readable artifacts but do not define the canonical schema shape: `P1-8`, `P1-10`, `P1-11`, `P1-12`, `P3-3`, `P3-4`.

### Root Causes

- Feature files say “machine-readable JSON format” without naming an actual schema file.
- There is no systematic schema catalog beyond isolated existing JSON schemas.
- L4 prevention and L5 measurement layers rely on structured data that is not formally defined.

### Canonical Files Likely To Change

- `framework/features/P1-08.md`
- `framework/features/P1-10.md`
- `framework/features/P1-11.md`
- `framework/features/P1-12.md`
- `framework/features/P3-03.md`
- `framework/features/P3-04.md`
- `AGENTS.md`
- `scripts/he-lint.js`

### Shared Artifacts To Introduce

- `.harness/anchor-record.schema.json`
- `.harness/requirement-entry.schema.json`
- `.harness/compliance-record.schema.json`
- `.harness/inquiry-response.schema.json`
- `.harness/skill-manifest.schema.json`
- `.harness/tool-definition.schema.json`
- `.harness/anti-pattern-definition.schema.json`
- `.harness/pattern-audit-report.schema.json`
- `.harness/consolidation-audit-report.schema.json`
- `.harness/adr-record.schema.json`

### Ordered Implementation Steps

1. Define the canonical JSON Schema pattern to use across `.harness/*.schema.json` files.
2. Create the 10 schema files needed by the 6 affected features.
3. Update each affected feature file so L4 and L5 sections reference its canonical schema file directly.
4. Add a centralized rule in `AGENTS.md` that machine-readable requirements must bind to a checked-in schema.
5. Extend `scripts/he-lint.js` to fail when feature files mention machine-readable artifacts without a schema reference or when the referenced schema file is missing.
6. Sync the bundled skill mirror after the canonical `framework/` updates land.

### Validation And Hooks

- `npm run smoke` must fail if a machine-readable requirement lacks a `.schema.json` reference.
- `scripts/he-lint.js` must verify schema file existence and basic schema validity.
- `npm run check` should validate that the new schema tranche does not break existing harness surfaces.

### Risks And Dependencies

- This is the prerequisite tranche for Issues 1 and 3.
- There is a risk of creating inconsistent schema conventions; all schema files should use a single shared template pattern.
- Schema introduction will require release-note and review-ledger updates when landed.

---

## Issue 3: Prevention Rules Not Bound To Enforcement Artifacts

### Issue Summary

Six features define prevention rules without naming the actual linter, hook, audit job, or runtime gate that enforces them: `P0-8`, `P1-2`, `P1-5`, `P2-4`, `P2-5`, `P3-3`.

### Root Causes

- No canonical registry maps prevention rules to enforcement surfaces.
- `scripts/he-lint.js` does not currently verify prevention-rule bindings.
- Prevention logic is spread across feature files, AGENTS rules, and harness scripts without a single source of truth.

### Canonical Files Likely To Change

- `framework/features/P0-08.md`
- `framework/features/P1-02.md`
- `framework/features/P1-05.md`
- `framework/features/P2-04.md`
- `framework/features/P2-05.md`
- `framework/features/P3-03.md`
- `framework/HE Index.md`
- `AGENTS.md`
- `scripts/he-lint.js`
- `scripts/harness/audit.sh`

### Shared Artifacts To Introduce

- `.harness/prevention-rules-registry.json`
- `framework/schemas/prevention-rules-registry.schema.json`
- `.harness/prevention-enforcement-config.json`

### Ordered Implementation Steps

1. Create `framework/schemas/prevention-rules-registry.schema.json` and `.harness/prevention-rules-registry.json`.
2. Extract the L4 prevention rules from the 6 affected features into the registry, marking each as `implemented`, `planned`, or `advisory`.
3. Update the 6 feature files to add an explicit enforcement-binding section that points to the registry entry and enforcement surface.
4. Extend `scripts/he-lint.js` with prevention-binding validation.
5. Add or wire any missing enforcement scripts needed for the highest-priority rules, especially around intake gating and permissions-manifest validation.
6. Update `scripts/harness/audit.sh` so structural audit runs the prevention-binding checks.
7. Sync the bundled skill mirror after the canonical `framework/` changes land.

### Validation And Hooks

- `npm run smoke` must fail if a prevention rule lacks a declared enforcement surface or registry entry.
- `npm run audit` must report bound vs unbound prevention rules.
- `scripts/he-lint.js` must verify the enforcement artifact exists for every non-advisory prevention rule.

### Risks And Dependencies

- Depends unconditionally on Issue 2 for schema conventions.
- Depends conditionally on Issue 1 only for observability-linked or measurement-backed prevention rules; other enforcement bindings can proceed before Issue 1 is complete.
- There is a risk of marking too many rules `planned`; the first landing should focus on mechanically enforceable rules only.
- Requires careful separation between advisory and hard-gate rules.

---

## Issue 4: Canonical Graph Drift

### Issue Summary

Key dependency and downstream relationships still disagree between `framework/HE Index.md` and feature files for `P0-1`, `P0-9`, and `P2-3`.

### Root Causes

- The index and feature dependency sections are maintained separately.
- There is no lint rule that reconciles reverse-dependency claims against the index.
- Some “enables” language is ambiguous and not feature-specific.

### Canonical Files Likely To Change

- `framework/HE Index.md`
- `framework/features/P0-01.md`
- `framework/features/P0-09.md`
- `framework/features/P2-03.md`
- `scripts/he-lint.js`

### Shared Artifacts To Introduce

- No mandatory new document is required.
- Add a `GRAPH_RECONCILIATION_RULES` constant or equivalent internal contract in `scripts/he-lint.js`.

### Ordered Implementation Steps

1. Re-audit the current dependency claims in `framework/HE Index.md`, `P0-01.md`, `P0-09.md`, and `P2-03.md` against any directly affected feature files.
2. Resolve the incorrect or vague downstream claims in those files.
3. Clarify ambiguous `Enables:` language so downstream relationships name explicit feature IDs or are removed.
4. Extend `scripts/he-lint.js` with graph-reconciliation checks that compare feature-file dependency claims against `framework/HE Index.md`.
5. Sync the bundled skill mirror after canonical `framework/` corrections land.

### Validation And Hooks

- `npm run smoke` must fail on index-to-feature dependency mismatches.
- `scripts/he-lint.js` must reject vague `Enables:` clauses that do not name explicit features.
- A read-only spot check should confirm reverse-dependency symmetry for the corrected feature set.

### Risks And Dependencies

- Can run partly in parallel, but it is safer to land after the contract surfaces from Issues 1 to 3 settle.
- There is a risk of correcting soft relationships too aggressively into hard dependencies; relationship semantics should be clarified before locking the lint rule.

---

## Recommended Delivery Shape

1. Land Issue 2 as **Tranche 1: shared contracts and schemas**.
2. Land Issue 3 as **Tranche 2: enforcement artifact binding**.
3. Land Issue 4 as **Tranche 3: graph and dependency reconciliation**.
4. Land Issue 1 as **Cross-Tranche Measurement Definition Work**, beginning design after Tranche 1 and landing after the shared enforcement surfaces from Tranche 2 are stable.

Each tranche should follow the normal HELab governance cycle: active plan in `PLANS.md`, canonical edits, bundle sync if `framework/` changes, `RELEASES.md` update where required, independent review in `REVIEWS.md`, and validation via `npm run smoke` or stronger gates as appropriate.
