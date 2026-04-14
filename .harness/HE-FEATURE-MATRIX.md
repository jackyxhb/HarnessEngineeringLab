# HE Feature Matrix

Feature-by-feature matrix distilled from the 2026-04-14 isolated-subagent assessment run.

| Feature | Name                                    | Verdict           | Short Remediation Note                                                                                                                                       |
| ------- | --------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P0-1    | Bash Sandboxes                          | needs-remediation | Define the actual isolation model, reconcile downstream dependency drift, and either specify or remove network-egress control as an enforceable requirement. |
| P0-2    | Filesystem, Git & File Locking          | healthy           | Keep as baseline reference; only polish SAS vs MAS guidance and make rollback/feedback mechanics more explicit.                                              |
| P0-3    | Verification (Self & Collective)        | needs-polish      | Define MAS collective-verification mechanics, operationalize self-fix metrics, and map prevention rules cleanly to improvement tiers.                        |
| P0-4    | Ralph Loops                             | needs-remediation | Clarify reinjection vs escalation thresholds, define measurement mechanics, and bind completion verification to the task-state schema explicitly.            |
| P0-5    | Orchestration Logic                     | needs-remediation | Define queue-latency thresholds, formalize orchestration-log/schema enforcement, and specify role/topology execution rules instead of leaving them implied.  |
| P0-6    | Rippable Middleware                     | needs-remediation | Strengthen EP-9 grounding, define a removal-test harness and middleware protocol, and operationalize middleware-removal measurements.                         |
| P0-7    | Escalation Policies & Audit Trails      | needs-polish      | Split attribution from escalation, define required audit fields, and make time-to-escalation and action logging fully operational.                           |
| P0-8    | Harness Versioning                      | needs-remediation | Convert versioning prevention into real gates, define A/B result artifacts/schemas, and resolve the ambiguous dependency on observability.                   |
| P0-9    | Smart Command Wrappers                  | needs-remediation | Reconcile index downstream metadata, replace vague tool references with actual repo tooling, and formalize wrapper output schema and cost-tier enforcement.  |
| P0-10   | Inter-Agent Communication (The Mailbox) | needs-remediation | Unify the message schema, define bounded-overhead thresholds and message limits, and specify validation/enforcement for communication contracts.             |
| P0-11   | Portable Agent Surface                  | needs-remediation | Add shim-validation checks, automate shim sync, and move the portability contract into machine-readable validation inputs.                                   |
| P1-1    | Repository as Truth                     | needs-polish      | Define the Agent Legibility Score formally and align the feature's own L3 structure with its machine-readability claims.                                     |
| P1-2    | Context Compaction & Memory Management  | needs-remediation | Replace opaque vector-first guidance with machine-readable memory contracts, define ConvStrategy or remove it, and add explicit enforcement hooks.           |
| P1-3    | Tool Offloading                         | needs-polish      | Clarify tool-manifest wording, define how the context-budget metric is enforced, and make the joint boundary with P1-2 self-contained.                       |
| P1-4    | Progressive Skills                      | needs-remediation | Add prevention rules, define task-relevance and routing logic explicitly, and turn the feature from advisory guidance into an enforceable loading strategy.  |
| P1-5    | Observability / Dashboards              | needs-remediation | Define artifact storage contracts, resolve the auditor-loop abstraction, and split dashboard freshness and retention metrics by target surface.              |
| P1-6    | Web Search & MCP Integration            | needs-remediation | Clarify why this feature is governed by EP-12, define the output-budget contract with P1-3, and operationalize outdated-answer measurement.                  |
| P1-7    | Planning, Task Lists & Blackboards      | needs-polish      | Resolve the Markdown vs machine-readable plan contradiction, define reminder injection, and formalize what counts as enough resumable context.               |
| P1-8    | Context Anchoring                       | needs-remediation | Publish an anchor-record schema, define recall-hook execution flow, and specify how anchors integrate with Ralph Loop reinjection.                           |
| P1-9    | Branch-Based Cognitive Memory           | needs-polish      | Define the approval-of-evidence schema, formalize branch naming as a regex, and document merge/conflict strategy beyond the happy path.                      |
| P1-10   | Requirements Ledger                     | needs-polish      | Provide the canonical JSON schema, clarify the status state machine, and separate ledger definition from intake-gate enforcement responsibility.             |
| P1-11   | Socratic Questioning                    | needs-remediation | Define ambiguity scoring, give clarification records a concrete storage contract, and bind the feature to an actual enforcement/gating hook.                 |
| P1-12   | Skill Engineering                       | needs-polish      | Bind the feature directly to the Skill Creation Standard, define baseline measurement for action-path reduction, and map prevention rules to concrete gates. |
| P2-1    | Automated Linters                       | needs-polish      | Operationalize parity and bypass metrics, define trivial auto-fix scope, and tighten the mapping between narrative rules and concrete sensors.               |
| P2-2    | Dependency Enforcement                  | needs-remediation | Clarify tool choices, define the enforcement scope precisely, and refine the measurements so they distinguish prevention from post-fact remediation.         |
| P2-3    | AI Auditors & Collaboration Channels    | needs-remediation | Define what counts as a substantial output, fix the index dependency direction, and drop or instrument defect-escape metrics properly.                       |
| P2-4    | Bounded Autonomy & Access Control       | needs-remediation | Decide whether the manifest is advisory or enforced, remove unimplemented sandbox/security claims, and add measurable permission-check logging.              |
| P2-5    | Upstream Intake Gate                    | needs-remediation | Define gate sequencing, specify the clarity threshold and ledger-update flow, and either implement or remove the unstated risk-assessment logic.             |
| P3-1    | Scheduled Cleanups                      | needs-remediation | Define the GC cycle concretely, move enforcement language to AGENTS-level rules, and bind the cleanup cadence to an actual execution surface.                |
| P3-2    | Documentation Sync                      | needs-remediation | Clarify whether the feature is detection-only or generation-capable, define the documentation-map schema, and resolve code-to-doc directionality.            |
| P3-3    | Pattern Auditing                        | needs-remediation | Define the audit schedule, create a durable anti-pattern artifact/schema, and attach JSON enforcement plus approval rules to the audit loop.                 |
| P3-4    | Consolidation Loop                      | needs-polish      | Replace undefined artifacts like HarnessConfig.json, define trigger and ownership model, and specify the JSON structure for consolidation records.           |

## Summary Counts

| Verdict           | Count |
| ----------------- | ----: |
| healthy           |     1 |
| needs-polish      |    10 |
| needs-remediation |    21 |
