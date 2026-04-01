# HE-IMPLEMENTATION-PLAN

**Project Scope:** [Project name, SAS/MAS scale, complexity level (text/docs, scripted ops, simple app, complex system, enterprise)]

## Tier 1 (Immediate Execution)

### 1-1. [Feature ID] [Feature Name]
- **Remediation Level:** [Light (meta-doc) | Medium (feature/hook) | Heavy (architecture)]
- **Prevention Active:** [Which "Don't Do" anti-pattern this resolves, or "N/A"]
- **Dependencies:** [Features that must be in place first, or "None"]
- **Action Items** _(from the feature's "Options" section):_
  - `[target file/command]` — [Specific executable action from Options]
  - `[target file/command]` — [Specific executable action from Options]
- **Remediation Tier:** [Tier 1 or Tier 2 action from the feature reference]
- **Verification:** [How to confirm the change works]

### 1-2. [Feature ID] [Feature Name]
...

---

## Tier 2 (Mid-term Execution)

### 2-1. [Feature ID] [Feature Name]
- **Remediation Level:** [Light | Medium | Heavy]
- **Prevention Active:** [Which "Don't Do" anti-pattern this resolves, or "N/A"]
- **Dependencies:** [Prerequisites]
- **Action Items** _(from the feature's "Options" section):_
  - `[target file/command]` — [Specific executable action from Options]
- **Remediation Tier:** [Tier 1 or Tier 2 action from the feature reference]
- **Verification:** [How to confirm]

---

## Tier 3 (Long-term Backlog)

### 3-1. [Feature ID] [Feature Name]
- **Reason Deferred:** [Why this can wait]
- **Action Items** _(from the feature's "Options" section):_
  - `[target file/command]` — [Specific executable action from Options]

---

## Example Entry

### 1-1. P0-3 Collective Verification (Self-Verification)
- **Remediation Level:** Medium
- **Prevention Active:** "Prevent Cascading Hallucinations" — no verification gate before committing work
- **Dependencies:** P0-1 Bash Sandboxes (must have execution environment)
- **Action Items** _(from P0-3 Options):_
  - `.github/workflows/ci.yml` — Add test execution as gating criteria (Tool: Test execution suites)
  - `CLAUDE.md` — Add instruction: "Run tests before finalizing any task" (Tool: Pre-completion checklists)
- **Remediation Tier:** Tier 1 — Make test passes a gating criteria for task finalization
- **Verification:** Submit a PR with a failing test; confirm CI blocks the merge.
