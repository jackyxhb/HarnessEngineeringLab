# Subagent Dispatch Prompts

These 5 ready-to-use prompts are optimized for delegating Harness Engineering gap analysis to parallel subagents. Each auditor uses the **3-Step Assessment Chain** (What to Do → Don't Do → Options) from the feature reference files.

> **CRITICAL ACTION SPACE RULE FOR ALL AGENTS:** Subagents are explicitly restricted to `Glob`, `Grep`, and `Read`. You MUST use these structural read-checks before drawing conclusions.
> **CRITICAL MULTI-SHOT LOOP:** All agents must frame their thinking using a `<scratchpad>` or `<thought>` tag *before* generating their final output templates to eliminate zero-shot hallucination.

---

## 1. Foundation Auditor
**Task:** Assess the structural execution environment using the 3-step chain.
**Prompt:**

```markdown
Perform a gap analysis on the project's Foundation features (P0-1 through P0-11).

**Reference:** Read `references/features-foundation.md` for the 3-step chain per feature:
- **What to Do:** The feature definition — what must exist
- **Don't Do:** The prevention failure — what anti-pattern to look for
- **Options:** The actions and tools — what to recommend

Action Space limit: Restrict your checks to `.github/workflows/`, `.agent/workflows/`, `CLAUDE.md`, `AGENTS.md`, and CI test scripts using only `Glob`, `Grep`, and `Read`.

<scratchpad>
For each feature (P0-1 through P0-11):
1. Check "What to Do" — does the target project implement this?
2. Check "Don't Do" — is the prevention failure currently active?
3. Check "Options" — which actions/tools should be recommended?
Map findings to files you actually read.
</scratchpad>

Format your final response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Foundation
**Feature:** [e.g., P0-3 Collective Verification]
**Current State:** [What exists now based on files checked]
**Prevention Active:** [Which "Don't Do" failure is happening, or "None"]
**Recommended Options:** [Specific actions/tools from the "Options" section]
**Severity:** [Critical | Important | Enhancement]
**Remediation Level:** [Light | Medium | Heavy]
---
(Repeat for all features)
```

## 2. Context Engineering Auditor (Pillar 1)
**Task:** Evaluate how the system informs the agent using the 3-step chain.
**Prompt:**

```markdown
Perform a gap analysis on Pillar 1: Context Engineering (P1-1 through P1-11).

**Reference:** Read `references/features-pillar1.md` for the 3-step chain per feature:
- **What to Do:** The feature definition
- **Don't Do:** The prevention failure to look for
- **Options:** The actions and tools to recommend

Action Space limit: Restrict scans to `CLAUDE.md`, `.cursorrules`, `.agent/` workflows, `AGENTS.md`, `ANCHORS.md`, and `REQUIREMENTS.md` using only `Glob`, `Grep`, and `Read`.

<scratchpad>
For each feature (P1-1 through P1-11):
1. Check "What to Do" — does the target project implement this?
2. Check "Don't Do" — is the prevention failure currently active?
3. Check "Options" — which actions/tools should be recommended?
Map findings to files you actually read.
</scratchpad>

Format your response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Pillar 1 (Context)
**Feature:** [e.g., P1-1 Repository as Truth]
**Current State:** [What exists now based on files checked]
**Prevention Active:** [Which "Don't Do" failure is happening, or "None"]
**Recommended Options:** [Specific actions/tools from the "Options" section]
**Severity:** [Critical | Important | Enhancement]
**Remediation Level:** [Light | Medium | Heavy]
---
(Repeat for all features)
```

## 3. Constraints Auditor (Pillar 2)
**Task:** Audit the mechanical constraints using the 3-step chain.
**Prompt:**

```markdown
Perform a gap analysis on Pillar 2: Architectural Constraints (P2-1 through P2-5).

**Reference:** Read `references/features-pillar2-3.md` (Pillar 2 section) for the 3-step chain per feature:
- **What to Do:** The feature definition
- **Don't Do:** The prevention failure to look for
- **Options:** The actions and tools to recommend

Action Space limit: Use `Glob`, `Grep`, and `Read` to search `.husky/`, linting scripts in `package.json`, pre-commit hooks, explicit CI verifications in `.github/workflows/`, and `REQUIREMENTS.md`.

<scratchpad>
For each feature (P2-1 through P2-5):
1. Check "What to Do" — does the target project implement this?
2. Check "Don't Do" — is the prevention failure currently active?
3. Check "Options" — which actions/tools should be recommended?
Map findings to files you actually read.
</scratchpad>

Format your response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Pillar 2 (Constraints)
**Feature:** [e.g., P2-1 Automated Linters]
**Current State:** [What exists now based on files checked]
**Prevention Active:** [Which "Don't Do" failure is happening, or "None"]
**Recommended Options:** [Specific actions/tools from the "Options" section]
**Severity:** [Critical | Important | Enhancement]
**Remediation Level:** [Light | Medium | Heavy]
```

## 4. Entropy Auditor (Pillar 3)
**Task:** Assess garbage collection and maintenance loops using the 3-step chain.
**Prompt:**

```markdown
Perform a gap analysis on Pillar 3: Entropy Management (P3-1 through P3-4).

**Reference:** Read `references/features-pillar2-3.md` (Pillar 3 section) for the 3-step chain per feature:
- **What to Do:** The feature definition
- **Don't Do:** The prevention failure to look for
- **Options:** The actions and tools to recommend

Action Space limit: Use `Glob`, `Grep`, and `Read` to search `.github/workflows/` for scheduled cron jobs, automated doc-sync scripts, pattern auditing tests, and consolidation pipelines.

<scratchpad>
For each feature (P3-1 through P3-4):
1. Check "What to Do" — does the target project implement this?
2. Check "Don't Do" — is the prevention failure currently active?
3. Check "Options" — which actions/tools should be recommended?
Map findings to files you actually read.
</scratchpad>

Format your response strictly using the HE-CLUES template format:

# HE-CLUES
**Area:** Pillar 3 (Entropy)
**Feature:** [e.g., P3-1 Scheduled Cleanups]
**Current State:** [What exists now based on files checked]
**Prevention Active:** [Which "Don't Do" failure is happening, or "None"]
**Recommended Options:** [Specific actions/tools from the "Options" section]
**Severity:** [Critical | Important | Enhancement]
**Remediation Level:** [Light | Medium | Heavy]
```

## 5. Aggregator & Scorer
**Task:** Compile clues, score them, and create the implementation plan.
**Prompt:**

```markdown
Review the compiled HE-CLUES output from the previous auditors. Using `references/gap-scoring.md` and `references/dependencies.md`, score each gap across the 6 dimensions to calculate Priority Scores.

For each gap, verify:
1. The "Prevention Active" field — prioritize features where prevention failures are currently active
2. The "Recommended Options" field — ensure the implementation plan includes the specific actions/tools listed
3. The cascade dependencies — features with more downstream dependents get higher impact weight

<scratchpad>
Mathematically score each feature based on the 6 dimensions. Determine the critical path dependencies. Features with active prevention failures should be weighted higher. Reason about whether a Light or Heavy remediation is required for Tier 1 items.
</scratchpad>

Group the results into execution Tiers (Tier 1 Immediate, Tier 2 Mid-term, Tier 3 Long-term) based on scoring.

Finally, output `HE-IMPLEMENTATION-PLAN.md` strictly following the format found in `templates/implementation-plan.md`. Each action item must reference the specific "Options" (actions/tools) from the feature chain. Do not invent new structures.
```
