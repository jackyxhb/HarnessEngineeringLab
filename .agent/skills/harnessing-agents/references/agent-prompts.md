# Subagent Dispatch Prompts

These 5 ready-to-use prompts are optimized for delegating Harness Engineering gap analysis to parallel subagents using state-of-the-art LLM Action Space optimization.

> **CRITICAL ACTION SPACE RULE FOR ALL AGENTS:** Subagents are explicitly restricted to `Glob`, `Grep`, and `Read`. You MUST use these structural read-checks before drawing conclusions.
> **CRITICAL MULTI-SHOT LOOP:** All agents must frame their thinking using a `<scratchpad>` or `<thought>` tag *before* generating their final output templates to eliminate zero-shot hallucination.

---

## 1. Foundation Auditor
**Task:** Assess the structural execution environment of the agent harness.
**Prompt:**

```markdown
Perform a gap analysis on the project's Foundation features (P0-1 Bash Sandboxes, P0-2 Filesystem & Git, P0-3 Self-Verification, P0-4 Ralph Loops, P0-5 Orchestration, P0-6 Rippable Middleware, P0-7 Escalation, P0-8 Harness Versioning, P0-9 Smart Command Wrappers).
Action Space limit: Explicitly restrict your checks to `.github/workflows/`, `.agent/workflows/`, `CLAUDE.md`, `AGENTS.md`, and CI test scripts using only `Glob` and `Read`.

<scratchpad>
Deliberate your findings here. Map out exactly what files you read, what properties exist, and what the true gap is based on the Foundation criteria.
</scratchpad>

Format your final response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Foundation
**Feature:** [e.g., P0-1 Bash Sandboxes]
**Current State:** [What exists now based on files checked]
**Missing Capability:** [What is missing]
**Remediation Level:** [Light | Medium | Heavy]
---
(Repeat for all gaps found)
```

## 2. Context Engineering Auditor (Pillar 1)
**Task:** Evaluate how the system informs the agent and controls context bloat.
**Prompt:**

```markdown
Perform a gap analysis on Pillar 1: Context Engineering (P1-1 Repository as Truth, P1-2 Context Compaction, P1-3 Tool Offloading, P1-4 Progressive Skills, P1-5 Observability, P1-6 Web Search/MCP, P1-7 Planning & State Files, P1-8 Context Anchoring, P1-9 Branch-Based Memory, P1-10 Requirements Ledger).
Action Space limit: Explicitly limit your scans to `CLAUDE.md`, `.cursorrules`, `.agent/` workflows, and `AGENTS.md` using only `Grep` and `Read`.

<scratchpad>
Deliberate the structural truth of Context Engineering. Did you locate state files? Do the prompts instruct trajectory reduction? Map findings here.
</scratchpad>

Format your response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Pillar 1 (Context)
**Feature:** [e.g., P1-1 Repository as Truth]
**Current State:** [What exists now based on files checked]
**Missing Capability:** [What is missing]
**Remediation Level:** [Light | Medium | Heavy]
---
(Repeat for all gaps found)
```

## 3. Constraints Auditor (Pillar 2)
**Task:** Audit the mechanical constraints preventing agent drift.
**Prompt:**

```markdown
Perform a gap analysis on Pillar 2: Architectural Constraints (P2-1 Automated Linters, P2-2 Dependency Enforcement, P2-3 AI Auditors, P2-4 Bounded Autonomy, P2-5 Upstream Intake Gate).
Action Space limit: You must use `Glob` and `Read` exclusively to search for `.husky/`, linting scripts in `package.json`, pre-commit hooks, and explicit CI layout verifications in `.github/workflows/`.

<scratchpad>
Analyze your read results. Are constraints structurally mapped and enforced, or are they fragile prose? Validate here.
</scratchpad>

Format your response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Pillar 2 (Constraints)
**Feature:** [e.g., P2-1 Automated Linters]
**Current State:** [What exists now based on files checked]
**Missing Capability:** [What is missing]
**Remediation Level:** [Light | Medium | Heavy]
```

## 4. Entropy Auditor (Pillar 3)
**Task:** Assess garbage collection and maintenance loops.
**Prompt:**

```markdown
Perform a gap analysis on Pillar 3: Entropy Management (Scheduled Cleanups, Documentation Sync, Pattern Auditing, Consolidation Loop).
Action Space limit: Use `Grep` and `Read` exclusively to look for scheduled cron jobs in `.github/workflows/`, automated doc-sync scripts, or pattern auditing tests.

<scratchpad>
Consider the lifecycle. Does the project actively combat contextual decay? Note missing automation links here before grading.
</scratchpad>

Format your response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Pillar 3 (Entropy)
**Feature:** [e.g., P3-1 Scheduled Cleanups]
**Current State:** [What exists now based on files checked]
**Missing Capability:** [What is missing]
**Remediation Level:** [Light | Medium | Heavy]
```

## 5. Aggregator & Scorer
**Task:** Compile clues, score them, and create the implementation plan.
**Prompt:**

```markdown
Review the compiled HE-CLUES output from the previous auditors. Using `references/gap-scoring.md` and `references/dependencies.md`, score each gap across the 6 dimensions to calculate Priority Scores.

<scratchpad>
Mathematically score each feature based on the 6 dimensions. Determine the critical path dependencies. Reason about whether a Light or Heavy remediation is required for Tier 1 items.
</scratchpad>

Group the results into execution Tiers (Tier 1 Immediate, Tier 2 Mid-term, Tier 3 Long-term) based on your scoring. 

Finally, output `HE-IMPLEMENTATION-PLAN.md` strictly following the format found in `templates/implementation-plan.md`. Do not invent new structures.
```
