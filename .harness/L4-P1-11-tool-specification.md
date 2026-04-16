# L4 Tool Specification: P1-11 Socratic Questioning

**Feature:** P1-11 Socratic Questioning  
**Principle:** EP-14 (Clarity before commitment)  
**Date:** 2026-04-16  
**Status:** Specification for Tranche 1 remediation

---

## Executive Summary

This specification defines the concrete tools and enforcement mechanisms for P1-11 (Socratic Questioning). The feature prevents wasted execution on ambiguous inputs by mandating a structured clarification pass before proceeding. This specification provides mechanical triggers, question templates, and assumption-rework tracking to operationalize the Socratic pause.

---

## L4 Actions & Concrete Tools

### Action 1: Socratic Pause Automation Trigger

**Purpose:** Detect ambiguous inputs and automatically pause execution before implementing.

**Tool Name:** `inquiry-response-intake-trigger`

**Schema:** `.harness/inquiry-response.schema.json`

**Ambiguity Detection Heuristics:**
1. **Scope Ambiguity:** Input permits multiple valid interpretations
   - Example: "Add a feature" (feature could mean tool, workflow, framework component)
2. **Unstated Assumptions:** Input relies on implicit context not fully stated
   - Example: "Improve the harness" (improve which aspect? For what metric?)
3. **Conflicting Requirements:** Input contains trade-offs or contradictions
   - Example: "Make it faster and more comprehensive" (often mutually exclusive)
4. **Technical Ambiguity:** Terms could map to multiple implementation paths
   - Example: "Use AI to improve X" (which AI technique? Which X layer?)

**Trigger Condition:**

```yaml
IF input.length > 100_characters AND (
  input.contains_plural_options OR
  input.has_unstated_context OR
  input.could_mean_multiple_things
)
  THEN invoke_socratic_pause()
  AND generate_inquiry_prompt()
  AND wait_for_clarification_response()
END
```

**Exception:** Single, mechanically obvious tasks skip Socratic pause:
- "Fix typo in line X"
- "Run command: npm run check"
- "Rename variable A to B"

**Output Contract:**
- Structured inquiry record conforming to `.harness/inquiry-response.schema.json`
- Written to `.harness/inquiries/{task_id}-{timestamp}.json`
- All clarification responses captured before execution proceeds

**Acceptance Criteria:**
1. [ ] Socratic pause triggered for ambiguous inputs (>95% recall)
2. [ ] False positives < 5% (no pause for clear, mechanical tasks)
3. [ ] Inquiry record captures all 6 question categories (see Action 2)
4. [ ] All responses logged before proceeding to execution
5. [ ] Task status remains "pending" until clarification complete

---

### Action 2: Structured Interrogation Templates

**Purpose:** Guide the agent through a systematic clarification process using 6 Socratic question categories.

**Tool Name:** `socratic-question-template-engine`

**The 6 Question Categories:**

#### 1. Clarification Questions
- "What exactly do you mean by [term]?"
- "How would you define [key concept]?"
- "Can you give a concrete example of [requirement]?"
- Output: Glossary of terms + examples

#### 2. Probing Assumptions
- "I notice you haven't mentioned [implicit aspect]. Is that intentional?"
- "Are you assuming [A] or [B]? (Both are valid, just want to confirm)"
- "What would success look like if [alternate assumption] were true instead?"
- Output: Explicit list of assumptions + confirmation

#### 3. Probing Reason & Evidence
- "Why is [requirement] important to you?"
- "What evidence shows that [constraint] is real?"
- "What would happen if we relaxed [stated requirement]?"
- Output: Justification rationale + evidence citations

#### 4. Questioning Viewpoints
- "How would [stakeholder] view this differently?"
- "What's the opposite perspective on [decision]?"
- "If you had 10x more resources, how would you approach this differently?"
- Output: Alternative perspectives documented

#### 5. Probing Implications
- "If we implement [solution], what downstream effects should we expect?"
- "How would [other feature] be affected by [your requirement]?"
- "What would be harder to change later if we committed to [approach]?"
- Output: Risk assessment + dependency map

#### 6. Questions about the Question
- "What's the real problem we're trying to solve?"
- "Is [stated objective] actually what you want, or is there a deeper goal?"
- "If this were easy, what would the ideal outcome be?"
- Output: Restated core objective + validation

**Question Injection Mechanism:**
- Agent receives input
- Trigger detects ambiguity (Action 1)
- Agent generates 2–3 questions per category (6 categories = 12–18 questions)
- Agent presents questions to user in categorized format
- Pause execution until all questions answered

**Input Contract:**
- Ambiguous user input
- Task context (current task ID, goal)
- Existing requirements (from P1-10 requirements ledger if available)

**Output Contract:**
- Inquiry record with 6 question categories
- Each category contains 2–3 specific questions
- User responses captured as clarification_responses array
- Clarity score assigned before/after (0=completely ambiguous, 10=crystal clear)

**Acceptance Criteria:**
1. [ ] All 6 categories covered in every inquiry
2. [ ] Questions are concrete, not open-ended ("What's most important?" is too vague)
3. [ ] User can answer each question in 1–2 sentences
4. [ ] Clarity score increases post-clarification (target: ≥8 before proceeding)
5. [ ] Questions adapt based on domain (e.g., framework questions vs. product questions)

---

### Action 3: Assumption-Rework Tracking & Prevention

**Purpose:** Track when assumptions turn out to be wrong, creating feedback loop to improve Socratic questioning.

**Tool Name:** `assumption-rework-auditor`

**Trigger:** When task produces rework due to incorrect assumption:

```yaml
IF task.status = "completed" AND
   rework_required AND
   root_cause = "incorrect_assumption"
  THEN record_assumption_rework(task_id, assumption, impact_hours, fix_description)
  AND update_socratic_templates (add question to prevent future)
END
```

**Rework Recording Schema:**

```json
{
  "rework_event_id": "RW-2026-04-16-001",
  "task_id": "TASK-12345",
  "assumption_original": "User wants feature X implemented in Y way",
  "assumption_actual": "User wants feature X implemented in Z way (different)",
  "clarification_question_missed": "Did you have a preference between Y and Z approaches?",
  "impact_hours": 4.5,
  "fix_description": "Reworked implementation to use approach Z",
  "severity": "high",
  "timestamp": "2026-04-16T14:30:00Z"
}
```

**Learning Loop:**
1. Rework events logged to `.harness/assumption-rework-events.jsonl`
2. Weekly analysis: Group by assumption type
3. For high-impact assumptions (>2 hours), add new Socratic question template
4. Template added to appropriate category (Clarification, Assumptions, etc.)
5. Next task with similar ambiguity includes new question

**Aggregation Metrics:**
- Total rework events per month
- Average impact per rework (hours)
- Top 5 assumption types causing rework
- Socratic template effectiveness (% of new questions preventing future rework)

**Acceptance Criteria:**
1. [ ] Rework events recorded with sufficient detail for root-cause analysis
2. [ ] Learning loop runs weekly (automated analysis + template updates)
3. [ ] New questions integrated into next cycle
4. [ ] Target: Rework-from-assumptions → 0 over 3 months (tracking progress)
5. [ ] All assumptions documented in inquiry records have < 5% rework rate

---

## Prevention Rules Binding (L4 Prevention)

### P1-11-premature-execution
- **Status:** declared-unmounted (intake trigger pending implementation)
- **Rule:** You must prevent agents from starting implementation on ambiguous requirements. Mandate a "Socratic pause" where the agent must ask clarifying questions until the objective is clear.
- **Enforcement Surface:** Planned in `.agent/workflows/inquiry-response-gate.js` (Tranche 2)
- **Current Status:** Guidance in AGENTS.md; schema ready; trigger implementation pending

### P1-11-narrative-inquiry-logs
- **Status:** implemented
- **Rule:** Clarification requests and responses must follow `.harness/inquiry-response.schema.json` to enable automated intent-validation and documentation.
- **Enforcement Surface:** `.harness/inquiry-response.schema.json` validated by `npm run smoke`
- **Current Gate:** Schema contract validation

---

## SAS vs. MAS Scope

### SAS Status: Partial
- **Complete:** Inquiry-response schema (machine-readable inquiry records)
- **Complete:** 6 question templates (guidance available)
- **Partial:** Manual Socratic pause (agents follow guidance but no automated trigger)
- **Partial:** Assumption-rework tracking (human-recorded, not automated)

### MAS Status: Planned
- **Future:** Automated ambiguity detection (NLP-based trigger)
- **Future:** Question injection at intake gate (P2-5)
- **Future:** Distributed assumption tracking (cross-agent decision audit)
- **Future:** Real-time clarity scoring and feedback

### SAS→MAS Migration
1. **SAS Phase 1:** Manual pause; 6 templates; inquiry schema conformance
2. **MAS Phase 1:** Automated ambiguity trigger + question injection at intake
3. **MAS Phase 2:** Assumption-rework tracking automated + learning loop mounted
4. **MAS Phase 3:** Clarity scoring calibrated via human feedback
5. **MAS Phase 4:** Predictive trigger (detect ambiguity before user perceives it)

---

## Integration Points

### With P2-5 Upstream Intake Gate (Critical)
- Socratic pause is the intake qualification step
- Inquiry-response records feed P2-5 validation
- Action: P2-5 gate checks that clarification_pass_rate = 1.0 before allowing work registration

### With P1-10 Requirements Ledger
- Clarified requirements recorded in REQUIREMENTS.md
- Inquiry record references requirement IDs
- Action: Socratic response converted to requirement entry + stored in ledger

### With P1-8 Context Anchoring
- Major assumptions clarified via Socratic round become context anchors
- Inquiry record can create new ANCHORS.md entries
- Action: Socratic response triggers anchor creation for architectural decisions

### With Ralph Loops (P0-4)
- Reinjected tasks include clarified requirements + original inquiry record
- Assumption rework tracking prevents same issues in reinjection
- Action: Ralph Loops checks assumption-rework-events.jsonl before reinjecting

---

## Test Strategy

### Unit Tests
1. **inquiry-response-intake-trigger:** Ambiguous input → trigger fired; clear input → skipped
2. **socratic-question-template-engine:** Input + context → 6-category question set generated
3. **assumption-rework-auditor:** Rework event + assumption → recorded with impact
4. **clarity-score-calculator:** Pre/post responses → clarity score calculated (0–10)

### Integration Tests
1. **End-to-end:** Ambiguous task input → Socratic pause → clarification received → execution proceeds
2. **Learning loop:** Rework event recorded → template updated → next task includes new question
3. **P2-5 integration:** Clarity score < 8 → intake gate blocks → escalation sent
4. **Assumption tracking:** Task completed with assumption-based rework → event logged + metrics updated

### Acceptance Criteria Verification
- [ ] Ambiguity detection: > 95% recall, < 5% false positives
- [ ] Question quality: User can answer in 1–2 sentences
- [ ] Clarity score post-Socratic: ≥ 8 before proceeding
- [ ] Assumption-rework events tracked with full context
- [ ] Learning loop runs weekly (automated)
- [ ] Schema conformance: 100% of inquiry records validate

---

## Measurement Bindings

**Feature:** P1-11  
**Registry:** `.harness/measurement-definitions.json`  
**Binding Key:** `P1-11`

### Metrics
1. **p1-11-clarification-pass-rate** (proxy-mounted)
   - Target: 100% for ambiguous inputs
   - Collection: Manual review + schema conformance
   - Source: `.harness/inquiry-response.schema.json`

2. **p1-11-rework-from-assumption-count** (declared-unmounted)
   - Target: 0
   - Collection: Automated audit
   - Source: `.harness/assumption-rework-events.jsonl`

3. **p1-11-inquiry-schema-conformance-rate** (implemented)
   - Target: 100%
   - Collection: `npm run smoke`
   - Source: `.harness/inquiry-response.json` schema validation

---

## References

- Feature: `framework/features/P1-11.md`
- Schemas:
  - `.harness/inquiry-response.schema.json`
  - `.harness/assumption-rework-events.jsonl` (generated)
- Related: P2-5 Upstream Intake Gate, P1-10 Requirements Ledger, P1-8 Context Anchoring, P0-4 Ralph Loops
- Principle: `framework/principles/EP-14.md`

---

**Specification Version:** 1.0  
**Approval Status:** Ready for Tranche 1 review  
**Next Steps:** Ambiguity trigger implementation in Tranche 2; learning loop automation in Tranche 3
