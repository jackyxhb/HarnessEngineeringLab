# HE Skill Creation Standard

## Overview

This document codifies the **6 Mandatory Principles** for professional skill creation in Harness Engineering projects. Every skill shipped from this repository — especially the primary `harnessing-agents` skill — **must satisfy all 6 principles before merge**. These principles are enforced mechanically via linting, review gates, and AGENTS.md rules.

**Governing principle:** A professional skill scales across codebases of any size, chains cleanly with other skills, and preserves tokens by progressive disclosure instead of upfront context bloat.

---

## The 6 Mandatory Principles

### 1. Metadata Clarity (Non-Negotiable)

Every skill **must** have a YAML header with these exact fields:

```yaml
---
name: {kebab-case-name}
version: "{semantic.version}"
description: "{One-sentence mission}. Use when {problem}. Keywords: {routing keywords}."
user-invocable: true | false
allowed-tools:
  - {Tool1}
  - {Tool2}
---
```

**Rationale:**
- Automation discovers skills by parsing this header
- Users understand scope and tools without reading the full skill
- Version sync gates depend on this structure
- Tool declarations prevent unintended permissions requests

**Enforcement:**
- `npm run check` will fail if any skill metadata is missing or malformed
- Missing `allowed-tools` triggers a review gate (requires explicit approval to add new tools)

**Example:** `harnessing-agents` SKILL.md → YAML frontmatter (top of file)

---

### 2. Dual-Mode Routing (Smart Dispatch)

Every skill **must** define exactly two operating modes:
- **Mode 1 (Default):** Full assessment, comprehensive, takes time
- **Mode 2 (Targeted):** Focused response, keyword-triggered, fast

Routes via keyword detection. If no keyword matches, **default to Mode 1**.

**Routing table** (required in skill doc):

| Keyword | Mode | What It Does | Time |
| --- | --- | --- | --- |
| (none, or explicit default) | Full | [description] | [time estimate] |
| `keyword2` | Targeted | [description] | [time estimate] |

**Rationale:**
- Prevents users from waiting 30 minutes when they need 2 minutes
- Allows rapid feedback loops during development
- Each mode has a clear audience and time commitment

**Enforcement:**
- Skills must document both modes explicitly
- If only one mode exists, document it as `[DEFAULT ONLY]` with justification (rare)
- Missing mode documentation blocks merge

**Example:** `harnessing-agents` SKILL.md → `## How to Use (2 Modes)` section (keywords: `full`, `feature`)

---

### 3. Mechanical Phases (Not Improvisation)

Every skill **must** define 3–5 **sequential, named phases** that govern execution. Phases must be:
- **Named explicitly** (e.g., Scope, Scan, Report)
- **Documented step-by-step** (what input? what check? what output?)
- **No free-form reasoning** — each phase has a fixed structure

**Example phase structure:**

```markdown
### Phase 1: Scope
- Input: target repository path
- Check: detect file types, count files
- Output: scope summary (stored in scratchpad, not written yet)

### Phase 2: Analyze
- Input: scope from Phase 1
- Check: [mechanical checks using Glob/Grep/Bash]
- Output: findings list

### Phase 3: Report
- Input: findings from Phase 2
- Check: aggregate and prioritize
- Output: write to `.harness/REPORT.md`
```

**Rationale:**
- Prevents hallucination by enforcing mechanical progression
- Other agents can predict skill behavior from phase documentation
- Easier to debug failures ("failed in Phase 2, step 3")

**Enforcement:**
- Phase definitions are part of skill review (required in REVIEWS.md)
- Skill execution must follow documented phases without deviation
- Reviewers verify phases are mechanical, not conversational

**Example:** `harnessing-agents` SKILL.md → `### Mode 1: Full Audit` section (6-phase lifecycle: Scope → Gap Analysis → Scoring → Planning → Execution → Verification)

---

### 4. Output Templates (Machine-Readable)

Every skill **must** produce output in one of these formats:
- Markdown with fixed structure (tables, sections in order)
- JSON with schema validation
- Combination of both

**Templates must:**
- Be **exact shapes** — not optional sections, not reordered fields
- Go to **one dedicated directory** (`.harness/`, `.audit/`, `.verify/`, etc. — **never root**)
- Be **machine-parseable** (other skills will parse them)
- Include **generated metadata** (timestamp, workspace, version)

**Example template structure:**

```markdown
# HE Audit Report

Generated: {ISO timestamp}
Repository: {absolute path}
Skill version: {version from SKILL.md}

## Phase 1: Scope
- Total files: N
- Languages: [list]

## Phase 2: Findings
- [structured table or JSON list]

## Phase 3: Recommendations
- Quick wins: [list]
- Follow-up skill: {skill name}
```

**Rationale:**
- Downstream skills can parse output reliably
- Templates prevent "I'll just write prose" drift
- Single output directory keeps target projects clean

**Enforcement:**
- Template files must exist under `templates/` for each output type
- Skill code must reference templates by exact filename
- Output location must use the declared directory (`.harness/`, etc.)
- Review gate checks that all outputs match template structure

**Example:** `harnessing-agents` SKILL.md → `## Core Templates` section and `templates/HE-CLUES.md`

---

### 5. Progressive Context Loading (Token Efficiency)

Every skill **must** load context in this order:
1. Read an **index** (the smallest, fastest reference)
2. Identify **what's needed** from the index
3. Load **only those specific files**
4. Flush completed work before the next phase

**Forbidden patterns:**
- ❌ Pre-reading all files in a directory
- ❌ Full-tree traversal before narrowing scope
- ❌ Keeping all intermediate work in active memory
- ❌ Re-reading the same file multiple times

**Allowed patterns:**
- ✅ `bash find . -type f -name "*.py" | head -20` (sample, not full scan)
- ✅ `grep -r "pattern" . --include="*.py"` (directed search)
- ✅ Read index → identify 3 features → load 3 files only
- ✅ Flush raw content after summarizing to template

**Rationale:**
- Scales to 100K-file repositories without token explosion
- Prevents hallucination from information overload
- Respects user's time and API costs

**Enforcement:**
- Skill review includes context-loading audit (manual check)
- Pre-merge testing runs on repos of varying sizes
- Recommended max mandatory-read per action path: ~200 lines (per P1-12)

**Example:** `harnessing-agents` SKILL.md → `## Context & Action Space Optimization` section, plus the navigation-protocol paragraph in `### Mode 2: Feature Lookup`

---

### 6. State-Aware Actions (No Duplicate Work)

Every skill **must** check existing work before suggesting next steps. Before proposing any action:

1. **Inspect current state** — read REQUIREMENTS.md, PLANS.md, REVIEWS.md (for HELab workspace)
2. **Ground suggestions in reality** — "This feature is already implemented. Suggested next: refine delivery pattern."
3. **Never invent context** — if the user didn't name a target project, don't guess; use `this workspace` or `HELab`
4. **Be precise with project names** — if the user said "Repo A", use "Repo A" only; don't create variations

**Required checks before suggesting work:**

```text
If workspace is HELab:
  → Read REQUIREMENTS.md: is there an existing requirement for this feature?
  → Read PLANS.md: is this feature already planned or in progress?
  → Read REVIEWS.md: has this feature been recently hardened or reviewed?
  
  IF yes to any → do NOT suggest "implement this"
  INSTEAD → suggest refinement, verification, or external application

If user did NOT name a target project:
  → Use "this workspace" or "HELab"
  → Do NOT invent a project name
  
If user DID name target project:
  → Use that EXACT name throughout
  → Do NOT create variations or nicknames
```

**Rationale:**
- Prevents duplicate work and wasted cycles
- Respects the user's actual workspace state
- Builds trust (avoids "you already told me this")
- Anchors suggestions in observable fact

**Enforcement:**
- Skill review includes state-awareness audit (manual check)
- Suggested actions must cite the state they checked (e.g., "per PLANS.md, feature X is in progress")
- Escalation if state cannot be determined

**Example:** `harnessing-agents` SKILL.md → `### Mode 2: Feature Lookup` → `#### Mode 2 Output Contract` subsection

---

## Applying the 6 Principles to `harnessing-agents`

The `harnessing-agents` skill **is the reference implementation** of all 6 principles. Any deviation must be:
1. **Documented in ANCHORS.md** with explicit rationale
2. **Reviewed and approved** in REVIEWS.md by a different reviewer
3. **Reflected in AGENTS.md** as an exception rule with consequences

**Current status:** `harnessing-agents` v4.1.0 satisfies all 6 principles. This is the standard all future skills must match.

---

## Checklist: Before Skill Merge

Use this checklist to verify a skill is ready for merge:

- [ ] **Metadata:** YAML header present, all fields filled (name, version, description, allowed-tools)
- [ ] **Routing:** 2 modes defined, routing table present, default mode specified
- [ ] **Phases:** 3–5 named phases, each with step-by-step documentation, no free-form reasoning
- [ ] **Templates:** Exist in `templates/` directory, output location declared (`.harness/`, `.audit/`, etc.), exact structure documented
- [ ] **Context loading:** No pre-reading all files, index-first approach documented, max mandatory-read per path ~200 lines
- [ ] **State awareness:** Checks REQUIREMENTS.md / PLANS.md / REVIEWS.md before suggesting work, no invented project names, exact names used
- [ ] **Review:** Independent reviewer (different identity from author) has approved in REVIEWS.md

---

## Governance

**Where these principles live:**
- **Framework source:** This file (`framework/HE Skill Creation Standard.md`) — canonical, read-only
- **Bundled skill mirror:** `.agent/skills/harnessing-agents/framework/HE Skill Creation Standard.md` — must stay byte-for-byte synchronized
- **Enforcement:** AGENTS.md `## DO NOT` section includes skill-specific rules
- **Verification:** `npm run check` lints metadata; manual review gates check phases, templates, context loading, state awareness

**Update process:**
- If these principles need refinement, update this file in the root `framework/`
- Sync changes to `.agent/skills/harnessing-agents/framework/` (via `npm run sync:skill-framework`)
- Update REVIEWS.md with independent approval
- Record decision in ANCHORS.md
- Increment `package.json` version

**Escalation:**
- If a new skill or skill change violates these principles, escalate to user review instead of self-certifying
- If a principle needs clarification or exception, propose via AGENTS.md DO NOT rules

---
