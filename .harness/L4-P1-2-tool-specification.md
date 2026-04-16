# L4 Tool Specification: P1-2 Context Compaction & Memory Management

**Feature:** P1-2 Context Compaction & Memory Management  
**Principle:** EP-12 (Finite attention demands active management)  
**Date:** 2026-04-16  
**Status:** Specification for Tranche 1 remediation

---

## Executive Summary

This specification defines the concrete tools and mechanical enforcement for P1-2 (Context Compaction & Memory Management). The feature prevents context window overflow through intelligent summarization, explicit memory anchors, and machine-readable context snapshots. This specification provides the operational bridge from policy (L3/L4) to execution (L5 measurements and enforcement surfaces).

---

## L4 Actions & Concrete Tools

### Action 1: Context-Summary Generator

**Purpose:** Generate machine-readable summaries of long conversations to prevent context overflow.

**Tool Name:** `context-summary-generator`

**Location:** `.agent/tools/context-summary-generator.js` (deferred to implementation phase)

**Input Contract:**
- Task ID (from `.harness/task-state.json`)
- Full conversation history (array of messages)
- Token count at entry (estimated)

**Output Contract:**
- JSON record conforming to `.harness/context-summary.schema.json`
- Written to `.harness/context-summaries/` with filename `{task_id}-{timestamp}.json`

**Acceptance Criteria:**
1. Summary size < 20% of original conversation size
2. Key decisions extracted and recorded with rationale
3. Token estimate accurate within ±10%
4. Memory anchors mapped to P1-8 ANCHORS.md references
5. Compaction timestamp recorded in ISO8601 format

**Integration Point:**
- Triggered by: `.harness/task-state.json` heartbeat checking (future)
- Condition: Token usage > 80% of window threshold (e.g., 80K out of 100K)
- Invoked by: Ralph Loops reinjection (P0-4) when task reactivates

---

### Action 2: Compaction Policy Engine

**Purpose:** Define when and how context compaction occurs to prevent ad-hoc decisions.

**Tool Name:** `context-compaction-policy-engine`

**Schema:** `.harness/context-compaction-policy.schema.json`

**Policy Document:** `framework/context-compaction-policy.md` (deferred)

**Policies to Define:**
1. **Token Threshold:** Trigger compaction when context usage > 75% of window (default 75K/100K)
2. **Temporal Cadence:** Summarize every N hours or every M tasks (default: every 4 hours or every 10 tasks)
3. **Relevance Filter:** Remove messages > 24 hours old unless anchored to ANCHORS.md
4. **Summary Retention:** Keep N most recent summaries; rotate out older ones (default: keep 3 per task)

**Enforcement Binding:**
- Recorded in `.harness/context-compaction-policy.json`
- Validated by: `npm run audit` (future gate)
- Override path: AGENTS.md section "Context Compaction Thresholds"

**Acceptance Criteria:**
1. Policy readable as JSON with machine-enforced structure
2. Each policy rule has documented justification and threshold
3. Policy conflicts resolved by priority ranking (token-threshold > temporal-cadence)
4. Policy changes logged to `.harness/policy-audit.jsonl`

---

### Action 3: Memory-Anchor Binding

**Purpose:** Link key architectural decisions to P1-8 anchors to preserve context across compaction cycles.

**Tool Name:** `memory-anchor-extractor`

**Integration with P1-8:** Context Anchoring

**Input Contract:**
- Context summary (from Action 1)
- Key decisions array (extracted from conversation)
- Existing ANCHORS.md entries

**Output Contract:**
- Array of anchor references (e.g., `["A1", "A3", "A7"]`)
- Stored in context-summary record under `memory_anchors` field
- Cross-reference validation: all anchors must exist in ANCHORS.md

**Mechanical Enforcement:**
- Validate anchor IDs against ANCHORS.md at lint time (`npm run smoke`)
- Flag dangling anchor references (references to non-existent anchors)
- Requirement: Every context summary must reference ≥1 anchor if task involves architectural decisions

**Acceptance Criteria:**
1. All referenced anchors exist in ANCHORS.md
2. Anchor references include the anchor's timestamp to prevent stale references
3. Anchor count ≥ 1 for ambiguous-task summaries, ≥ 0 for mechanical tasks
4. Lint rule `validateAnchorReferences` runs on context summaries

---

## Prevention Rules Binding (L4 Prevention)

### P1-2-context-overflow
- **Status:** declared-unmounted
- **Rule:** You must prevent agents from hitting context window limits by mandating periodic summaries and clear-cuts of irrelevant history.
- **Enforcement Surface:** `.harness/context-compaction-policy.json` + token-threshold monitor (future)
- **Remediation Timeline:** Tranche 2 (escalation infrastructure + cron scheduling)

### P1-2-narrative-context-summaries
- **Status:** implemented
- **Rule:** Context summaries and memory anchors must follow a machine-readable JSON format.
- **Enforcement Surface:** `.harness/context-summary.schema.json` validated by `npm run smoke`
- **Current Gate:** Schema contract validation

---

## SAS vs. MAS Scope

### SAS Status: Partial
- **Complete:** Schema contract (context-summary.schema.json exists)
- **Partial:** Manual compaction discipline (agents follow P1-2 guidance but no automated enforcement)
- **N/A:** Temporal compaction cron (single-agent, no background scheduler)

### MAS Status: Planned
- **Future:** Automated compaction at token thresholds (Tranche 2)
- **Future:** Distributed summaries across agent boundaries (Tranche 3)
- **Future:** Summary-sharding for swarm context management (Tranche 4+)

### SAS→MAS Migration
1. SAS: Manual compaction via context-summary-generator, validated schema
2. MAS Phase 1: Cron-based temporal compaction + token-threshold monitoring
3. MAS Phase 2: Distributed summary streaming across agent handoffs
4. MAS Phase 3: Multi-agent context fusion (summarize outputs from multiple agents into unified context)

---

## Integration Points

### With P0-4 Ralph Loops (Critical Dependency)
- Ralph Loops reinjection depends on context-summary records to restore compacted context
- Context-summary must include `memory_anchors` references to reconstruct full decision tree
- Action: Reinjected prompt includes context-summary + anchor-anchors reference

### With P1-8 Context Anchoring
- Memory anchors extracted from context summaries must reference valid ANCHORS.md entries
- Bidirectional: ANCHORS.md can reference context-summary records when summarizing past phases

### With P1-10 Requirements Ledger
- Task ID in context-summary must match `.harness/task-state.json` task IDs
- Requirements referenced in conversation should be cited by requirement ID (per P2-5)

---

## Test Strategy

### Unit Tests
1. **context-summary-generator:** Input conversation → output schema-valid summary
2. **memory-anchor-extractor:** Key decisions → valid anchor references
3. **compaction-policy-engine:** Policy rules → deterministic threshold decisions

### Integration Tests
1. **End-to-end:** Long task (100K+ tokens) → context compaction triggered → reinjection succeeds
2. **Ralph Loops interaction:** Compacted context → reinjection recovery → task resumes correctly
3. **ANCHORS.md validation:** Context summaries only reference existing anchors

### Acceptance Criteria Verification
- [ ] Summary size consistently < 20% of original
- [ ] No decision loss (key decisions preserved and traceable)
- [ ] Token estimates accurate ±10%
- [ ] All memory anchors exist in ANCHORS.md
- [ ] Lint rules pass for 100% of checked summaries

---

## Measurement Bindings

**Feature:** P1-2  
**Registry:** `.harness/measurement-definitions.json`  
**Binding Key:** `P1-2`

### Metrics
1. **p1-2-context-window-utilization** (declared-unmounted)
   - Target: > 70% efficiency
   - Collection: `.harness/context-compaction-audit.json`

2. **p1-2-chunk-efficiency** (declared-unmounted)
   - Target: Quality at 100K tokens ≥ 90% of quality at 10K tokens
   - Collection: Automated quality evaluation

3. **p1-2-compaction-summary-schema-conformance** (implemented)
   - Target: 100% conformance
   - Collection: `npm run smoke`

---

## References

- Feature: `framework/features/P1-02.md`
- Schemas:
  - `.harness/context-summary.schema.json`
  - `.harness/context-compaction-policy.schema.json`
  - `.harness/memory-anchor.schema.json`
- Related: P0-4 Ralph Loops, P1-8 Context Anchoring, P1-10 Requirements Ledger
- Principle: `framework/principles/EP-12.md`

---

**Specification Version:** 1.0  
**Approval Status:** Ready for Tranche 1 review  
**Next Steps:** Schema validation in Tranche 1; tool implementation in Tranche 2
