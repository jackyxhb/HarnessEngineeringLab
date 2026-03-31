# HE-IMPLEMENTATION-PLAN

**Project Scope:** [Project name, SAS/MAS scale, complexity level (text/docs, scripted ops, simple app, complex system, enterprise)]

## Tier 1 (Immediate Execution)

### 1-1. [Feature ID] [Feature Name]
- **Remediation Level:** [Light (meta-doc) | Medium (feature/hook) | Heavy (architecture)]
- **Dependencies:** [Features that must be in place first, or "None"]
- **Action Items:**
  - `[target file/command]` — [Specific executable action]
  - `[target file/command]` — [Specific executable action]
- **Verification:** [How to confirm the change works]

### 1-2. [Feature ID] [Feature Name]
...

---

## Tier 2 (Mid-term Execution)

### 2-1. [Feature ID] [Feature Name]
- **Remediation Level:** [Light | Medium | Heavy]
- **Dependencies:** [Prerequisites]
- **Action Items:**
  - `[target file/command]` — [Specific executable action]
- **Verification:** [How to confirm]

---

## Tier 3 (Long-term Backlog)

### 3-1. [Feature ID] [Feature Name]
- **Reason Deferred:** [Why this can wait]
- **Action Items:**
  - `[target file/command]` — [Specific executable action]

---

## Example Entry

### 1-1. P0-3 Self-Verification
- **Remediation Level:** Medium
- **Dependencies:** P0-1 Bash Sandboxes (must have execution environment)
- **Action Items:**
  - `.github/workflows/ci.yml` — Add `pytest --tb=short` step gating PR merges
  - `CLAUDE.md` — Add instruction: "Run tests before finalizing any task"
- **Verification:** Submit a PR with a failing test; confirm CI blocks the merge.
