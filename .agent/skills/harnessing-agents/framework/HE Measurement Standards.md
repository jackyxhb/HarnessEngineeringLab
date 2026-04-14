# HE Measurement Standards

Canonical contract for operationalizing L5 measurement outcomes across the Harness Engineering framework.

## Purpose

- Bind measurement language in feature files to machine-readable definitions.
- Separate defined thresholds from currently mounted telemetry.
- Give `he-lint`, `npm run observe`, and `npm run audit` one shared registry to validate and surface.

## Required Fields

Every measurement definition in `.harness/measurement-definitions.json` must declare:

- `feature_id`: canonical feature ID such as `P1-5`
- `measurement_binding`: registry key mirrored from `framework/HE Index.md`
- `collection_trigger`: command or workflow that refreshes the metric
- `storage_key`: canonical location where the metric is surfaced in `.harness/observation-report.json`
- `formula`: exact computation or evaluation rule
- `threshold`: operator, target, and unit
- `threshold_justification`: why that threshold is valid for the current repository state
- `enforcement_surface`: script, artifact, or gate that owns the metric
- `status`: `implemented`, `proxy-mounted`, or `declared-unmounted`

## Status Semantics

- `implemented`: the metric is produced directly from mounted repository telemetry or a live gate.
- `proxy-mounted`: the metric is computed from an existing structural proxy rather than dedicated runtime telemetry.
- `declared-unmounted`: the metric is defined with an explicit threshold, but the repository does not yet emit the telemetry needed to calculate it automatically.

## Freshness Contract

- `.harness/measurement-definitions.json` is the source of truth for measurement coverage.
- `npm run observe` must report measurement coverage and registry freshness from that file.
- `npm run smoke` must fail when a targeted feature has L5 measurements but lacks a valid registry binding.

## Binding Contract

- `framework/HE Index.md` must include `measurement_binding` for every feature covered by the registry.
- Each affected feature file must reference this standards document and `.harness/measurement-definitions.json` in a `## Measurement Bindings` section.
- Feature files may keep human-readable L5 bullets, but the operational definition must live in the registry.
