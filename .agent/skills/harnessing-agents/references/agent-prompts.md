# Subagent Dispatch Prompts

These 5 ready-to-use prompts are optimized for delegating Harness Engineering gap analysis to parallel subagents using state-of-the-art LLM Action Space optimization.

> **CRITICAL ACTION SPACE RULE FOR ALL AGENTS:** Subagents are explicitly restricted to `list_dir`, `grep_search`, and `view_file`. You MUST use these structural read-checks before drawing conclusions.
> **CRITICAL MULTI-SHOT LOOP:** All agents must frame their thinking using a `<scratchpad>` or `<thought>` tag *before* generating their final output templates to eliminate zero-shot hallucination.

---

## 1. Foundation Auditor
**Task:** Assess the structural execution environment of the agent harness.
**Prompt:**

```markdown
Perform a gap analysis on the project's Foundation features (Bash Sandboxes, Filesystem & Git, Self-Verification, Ralph Loops, Orchestration, Rippable Middleware, Escalation, Harness Versioning). 
Action Space limit: Explicitly restrict your checks to `.github/workflows/`, `AGENTS.md`, and CI test scripts using only `list_dir` and `view_file`.

<scratchpad>
Deliberate your findings here. Map out exactly what files you read, what properties exist, and what the true gap is based on the Foundation criteria.
</scratchpad>

Format your final response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Foundation
**Feature:** [e.g., F1 Bash Sandboxes]
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
Perform a gap analysis on Pillar 1: Context Engineering (Repository as Truth, Context Compaction, Tool Offloading, Progressive Skills, Observability, Web Search/MCP, Planning & State Files, Context Anchoring, Branch-Based Memory).
Action Space limit: Explicitly limit your scans to `.cursorrules`, `.windsurfrules`, `.agents/` workflows, and `AGENTS.md` using only `grep_search` and `view_file`.

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
Perform a gap analysis on Pillar 2: Architectural Constraints (Automated Linters, Dependency Enforcement, AI Auditors, Bounded Autonomy).
Action Space limit: You must use `list_dir` and `view_file` exclusively to search for `.husky/`, linting scripts in `package.json`, pre-commit hooks, and explicit CI layout verifications in `.github/workflows/`.

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
Action Space limit: Use `grep_search` and `view_file` exclusively to look for scheduled cron jobs in `.github/workflows/`, automated doc-sync scripts, or pattern auditing tests.

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
