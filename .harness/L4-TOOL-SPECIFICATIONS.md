# L4 Tool Specifications for P2-4, P3-1, P3-3, P3-4

**Report Date:** 2026-04-16  
**Tranche:** 2–4 Remediation  
**Status:** Specification (Not Implemented)

---

## P2-4: Bounded Autonomy & Access Control

### L4 Tool: Bounded Autonomy Policy Enforcement Gate

**Tool Name:** `bounded-autonomy-validator`  
**Integration Point:** Pre-execution hook + CI gate + audit.sh  
**Execution Context:** SAS and MAS

**Description:**  
Validates agent actions against the canonical `.harness/bounded-autonomy-policy.json` file, enforcing privilege escalation rules, prompt injection prevention, and data leakage detection before task execution.

**Schema Binding:**  
- Input Schema: `.harness/bounded-autonomy-policy.schema.json`
- Enforcement Rules: `privilege_escalation_rules`, `prompt_injection_rules`, `data_leakage_rules`

**Acceptance Criteria:**

1. **Rule Validation**
   - [ ] Tool validates policy JSON against `.harness/bounded-autonomy-policy.schema.json`
   - [ ] Exit code 0 on valid policy, non-zero on schema violation
   - [ ] Detailed error messages identify validation failures by rule_id

2. **Privilege Escalation Enforcement**
   - [ ] Tool blocks operations exceeding agent's current privilege level
   - [ ] Approvals are verified before high-risk operations proceed
   - [ ] Audit trail logs all escalation attempts (approved and denied)

3. **Prompt Injection Detection**
   - [ ] Tool parses agent prompts for injection patterns defined in policy
   - [ ] Detects all patterns in `prompt_injection_rules` array
   - [ ] Action (block/alert/sanitize/escalate) is executed per policy

4. **Data Leakage Prevention**
   - [ ] Tool scans outputs for PII/secrets/credentials per `data_leakage_rules`
   - [ ] Detects at least 95% of common patterns (API keys, SSNs, passwords)
   - [ ] Takes configured action: redact, quarantine, or escalate

5. **Audit Trail**
   - [ ] All policy violations are logged to `.harness/escalation-events.jsonl`
   - [ ] Logs include timestamp, rule_id, violation_type, agent_id, action_taken
   - [ ] Logs are retained for at least 30 days

**Integration Points:**

- **SAS Mode:** Tool runs as pre-execution gate in Claude Code hook; violations escalate to human review
- **MAS Mode:** Tool integrated into orchestrator authorization layer; violations trigger distributed escalation protocols

**Test Strategy:**

- Unit tests: Validate 50+ injection patterns and 20+ PII formats
- Integration tests: End-to-end execution with mock privileged operations
- Regression tests: Policy updates do not break existing approval workflows

**Timeline:** Tranche 4 (weeks 7–8)

---

## P3-1: Scheduled Cleanups

### L4 Tool: Cleanup Job Orchestrator

**Tool Name:** `cleanup-job-executor`  
**Integration Point:** Cron/scheduled task runner (external orchestrator)  
**Execution Context:** SAS and MAS

**Description:**  
Executes periodic cleanup jobs defined in `.harness/cleanup-job.schema.json`, removing dead code, pruning stale branches, cleaning temporary files, and tracking entropy metrics.

**Schema Binding:**  
- Input Schema: `.harness/cleanup-job.schema.json`
- Job Registry: `.harness/cleanup-jobs/*.json` (individual job definitions)

**Acceptance Criteria:**

1. **Job Scheduling**
   - [ ] Tool supports cron expressions from `schedule.cron_expression` field
   - [ ] Next run timestamp is calculated and updated in `last_run.next_run`
   - [ ] Jobs execute on schedule with ±5 minute accuracy

2. **Dead Code Detection**
   - [ ] Tool identifies unused imports, unreachable functions, unused variables
   - [ ] Detection coverage >= 80% of static analysis patterns
   - [ ] Can be run in `dry_run` mode for preview before deletion

3. **Stale Branch Pruning**
   - [ ] Tool identifies branches older than `selector.age_days` threshold
   - [ ] Respects `exclude_patterns` to protect critical branches (main, develop)
   - [ ] Optional approval workflow when `approval_required: true`

4. **Temporary File Cleanup**
   - [ ] Removes files matching `cleanup_rules[*].selector.path_pattern`
   - [ ] Respects `.gitignore` and exclude patterns
   - [ ] Reports count of files removed

5. **Metric Tracking**
   - [ ] Generates JSON report with metrics per `metrics_tracking` config
   - [ ] Tracks: dead_code_ratio, stale_branch_count, orphan_file_count, cleanup_success_rate
   - [ ] Updates `last_run` fields: timestamp, status, items_processed, items_removed

6. **Notifications**
   - [ ] On completion: posts to configured target (email, Slack, webhook)
   - [ ] On error: escalates to human review with remediation suggestions

**Integration Points:**

- **SAS Mode:** Runs as weekly cron job via external scheduler (GitHub Actions, GitLab CI, etc.)
- **MAS Mode:** Integrated into distributed cleanup coordinator; per-agent cleanup reports are aggregated

**Test Strategy:**

- Unit tests: Dead-code detection on 50+ code samples
- Integration tests: Full cleanup cycle on temporary repo with known entropy
- Regression tests: Ensure protected patterns (main branch, critical files) are never deleted

**Timeline:** Tranche 4 (weeks 7–8)

---

## P3-3: Pattern Auditing

### L4 Tool: Pattern Drift Auditor

**Tool Name:** `pattern-audit-engine`  
**Integration Point:** Periodic audit job + linter hook  
**Execution Context:** SAS and MAS

**Description:**  
Audits codebase patterns against canonical forms and anti-patterns defined in `.harness/anti-pattern-definition.schema.json`, generating audit reports and recommending refactorings.

**Schema Binding:**  
- Anti-Pattern Registry: `.harness/anti-pattern-definition.schema.json`
- Audit Report Schema: `.harness/pattern-audit-report.schema.json`
- Linter Integration: Custom ESLint/markdownlint rules for defined patterns

**Acceptance Criteria:**

1. **Anti-Pattern Scanning**
   - [ ] Tool loads all anti-patterns from `.harness/anti-pattern-definition.schema.json`
   - [ ] Detects each pattern per `detection_rule` with >= 90% accuracy
   - [ ] Scans all code files matching project structure

2. **Pattern Convergence**
   - [ ] Tool measures pattern variants per operation (e.g., error-handling styles)
   - [ ] Reports deviation from canonical form
   - [ ] Suggests refactoring per `refactor_suggestion` field

3. **Circular Dependency Detection**
   - [ ] Identifies cycles in module/component dependency graph
   - [ ] Integrates with existing tools (madge, dependency-cruiser)
   - [ ] Reports cycle count and paths

4. **Audit Report Generation**
   - [ ] Generates `.harness/pattern-audit-report.schema.json` compliant output
   - [ ] Includes: pattern_id, files_with_drift, severity, refactor_suggestions
   - [ ] Coverage = 100% (all defined patterns are checked)

5. **Linter Enforcement**
   - [ ] Binds anti-patterns to ESLint rules / custom linter checks
   - [ ] Fails CI if new anti-pattern violations are introduced
   - [ ] Allows existing violations for incremental cleanup

**Integration Points:**

- **SAS Mode:** Weekly audit job via CI; reports emitted to REVIEWS.md
- **MAS Mode:** Distributed pattern audits per agent; consolidated drift report

**Test Strategy:**

- Unit tests: Detect 30+ anti-patterns in code samples
- Integration tests: Full audit on real codebase with known patterns
- Regression tests: Prevent pattern-enforcement rules from breaking valid code

**Timeline:** Tranche 4 (weeks 8–9)

---

## P3-4: Consolidation Loop

### L4 Tool 1: Automated ADR Prompt System

**Tool Name:** `adr-prompt-engine`  
**Integration Point:** Feature-landing event trigger  
**Execution Context:** SAS and MAS

**Description:**  
Prompts developers to create ADR (Architecture Decision Record) entries when new patterns are introduced, ensuring documentation of key design decisions.

**Schema Binding:**  
- ADR Record Schema: `.harness/adr-record.schema.json`
- ADR Ledger: `.harness/adr-records/*.json` or `.harness/ADR.md`

**Acceptance Criteria:**

1. **ADR Generation Trigger**
   - [ ] Tool detects new pattern introduction via commit message analysis or file changes
   - [ ] Triggers interactive prompt workflow for developer to create ADR
   - [ ] Integrates with `/polish` workflow for feature additions

2. **ADR Template & Prompting**
   - [ ] Prompts developer for: pattern_name, decision, context, consequences, status
   - [ ] Validates all required fields per schema before accepting
   - [ ] Generates ADR entry conforming to `.harness/adr-record.schema.json`

3. **ADR Ledger Management**
   - [ ] Appends approved ADRs to central ledger (.harness/ADR.md or JSON registry)
   - [ ] Assigns sequential adr_id (ADR-1, ADR-2, etc.)
   - [ ] Maintains status field: proposed → accepted → deprecated

4. **Adoption Tracking**
   - [ ] Measures ADR adoption rate: count(patterns_with_adr) / count(new_patterns)
   - [ ] Target: >= 90% coverage for new patterns
   - [ ] Reports unmissing ADRs in weekly audit

**Integration Points:**

- **SAS Mode:** Triggered via `/polish` workflow after feature definition; ADR stored in .harness/ADR.md
- **MAS Mode:** Integrated into feature-broadcast; consolidation coordinator collects ADRs from all agents

**Test Strategy:**

- Unit tests: ADR schema validation on 20+ sample records
- Integration tests: End-to-end workflow from pattern detection to ADR acceptance
- Regression tests: Ensure no duplicate adr_ids are assigned

**Timeline:** Tranche 4 (weeks 8–9)

---

### L4 Tool 2: Concept-Forking Prevention Engine

**Tool Name:** `concept-deduplicator`  
**Integration Point:** Weekly consolidation loop  
**Execution Context:** SAS and MAS

**Description:**  
Detects redundant or overlapping concepts across framework files (AGENTS.md, README, HE Index.md) and suggests merging or clarification.

**Schema Binding:**  
- Consolidation Audit Schema: `.harness/consolidation-audit-report.schema.json`

**Acceptance Criteria:**

1. **Concept Redundancy Detection**
   - [ ] Scans framework documentation for overlapping concepts
   - [ ] Detects when same term is defined multiple times with different meanings
   - [ ] Identifies features/principles with duplicate scope

2. **Chain Gap Analysis**
   - [ ] Verifies all principle → feature chains are complete
   - [ ] Detects missing intermediate steps or broken linkages
   - [ ] Reports gaps in framework documentation

3. **Terminology Consistency**
   - [ ] Checks terminology usage consistency across all documents
   - [ ] Detects when same concept is referred to by different names
   - [ ] Suggests standardization

4. **Consolidation Report Generation**
   - [ ] Generates `.harness/consolidation-audit-report.schema.json` compliant output
   - [ ] Includes: redundancy_findings, chain_gaps, terminology_mismatches
   - [ ] Recommends specific merge/clarification actions

5. **Automated Reconciliation**
   - [ ] Applies low-risk merges automatically (e.g., duplicate terminology)
   - [ ] Flags high-risk consolidations for human review
   - [ ] Generates commit with reconciliation changes

**Integration Points:**

- **SAS Mode:** Weekly `/reconcile` job; outputs consolidation audit report
- **MAS Mode:** Consolidation coordinator collects findings from all agents; applies distributed consensus

**Test Strategy:**

- Unit tests: Detect 10+ types of redundancy patterns
- Integration tests: Run on full framework; validate no false positives
- Regression tests: Ensure consolidation doesn't break valid design distinctions

**Timeline:** Tranche 4 (weeks 9–10)

---

### L4 Tool 3: Automated Changelog Generator

**Tool Name:** `changelog-auto-generator`  
**Integration Point:** Post-merge automation / consolidation loop  
**Execution Context:** SAS and MAS

**Description:**  
Generates changelog entries automatically from commit messages and feature changes, maintaining `.harness/changelog.json` and RELEASES.md currency.

**Schema Binding:**  
- Consolidation Audit Schema: `.harness/consolidation-audit-report.schema.json`

**Acceptance Criteria:**

1. **Commit Message Parsing**
   - [ ] Extracts semantic changes from commit message prefixes (feat:, fix:, docs:, refactor:)
   - [ ] Parses feature scope from commit body
   - [ ] Maps commit hashes to framework feature IDs

2. **Changelog Entry Generation**
   - [ ] Creates structured changelog entries: version, type, feature_id, summary, commit_hash
   - [ ] Appends to RELEASES.md Unreleased section
   - [ ] Maintains chronological order and grouping by feature

3. **Completeness Tracking**
   - [ ] Measures changelog completeness: count(changelog_entries) / count(commits)
   - [ ] Target: >= 95% coverage within 24 hours of commit
   - [ ] Reports missing entries for manual review

4. **Version Tag Synchronization**
   - [ ] Updates version tags from package.json
   - [ ] Generates semantic version per changelog (major.minor.patch)
   - [ ] Creates GitHub release with version tag and changelog body

**Integration Points:**

- **SAS Mode:** Runs on merge to main; appends to RELEASES.md automatically
- **MAS Mode:** Consolidation coordinator collects changelog entries from all agents; generates unified release

**Test Strategy:**

- Unit tests: Parse 50+ commit message formats correctly
- Integration tests: Generate changelog from real repository history
- Regression tests: Ensure no duplicate entries or malformed versions

**Timeline:** Tranche 4 (weeks 9–10)

---

## SAS vs MAS Scope Summary

| Feature | SAS Status | MAS Status | Migration Path |
|---------|-----------|-----------|-----------------|
| P2-4 | Partial (permission manifest enforced) | Planned (distributed authorization) | Extend policy rules to multi-agent context; integrate with orchestrator authorization layer |
| P3-1 | Partial (manual cleanup + documentation) | Planned (distributed cleanup coordination) | Extend cleanup job execution to per-agent tasks; aggregate metrics across agents |
| P3-3 | Partial (manual pattern audits via /reconcile) | Planned (distributed pattern audits) | Extend audit engine to run per-agent scans; consolidate findings via coordinator |
| P3-4 | Partial (manual ADR creation + reconciliation) | Planned (event-driven consolidation) | Replace scheduled loop with event-driven triggers; implement distributed consensus for merges |

---

## Implementation Priorities

**High Priority (Tranche 4, Week 7–8):**
- P2-4: Bounded Autonomy Policy Enforcement Gate
- P3-1: Cleanup Job Orchestrator

**Medium Priority (Tranche 4, Week 8–9):**
- P3-3: Pattern Drift Auditor
- P3-4: ADR Prompt System + Concept-Forking Prevention Engine

**Low Priority (Tranche 4, Week 9–10):**
- P3-4: Automated Changelog Generator

---

## Measurement & Validation

All tools must track their own execution metrics:

- **Execution Health:** Tool runs successfully >= 99% of scheduled times
- **Detection Accuracy:** All scanning tools maintain >= 95% accuracy on regression tests
- **Report Validity:** All generated reports conform to their schema 100% of the time
- **Performance:** Tools complete within SLO (P2-4: < 5s, P3-1: < 60s, P3-3: < 120s, P3-4: < 30s)

---

**Report Status:** Ready for Tranche 4 implementation review  
**Next Review Date:** 2026-05-01
