# HE-CLUES Template

Repeat this block for each gap found. Use filesystem tools to verify — do not assume.

---

**Area:** [Foundation | Pillar 1 | Pillar 2 | Pillar 3]
**Feature:** [Feature ID and name, e.g., P0-1 Bash Sandboxes]
**Current State:** [What exists now, based on files checked with Glob/Grep/Read]
**Missing Capability:** [What is missing per the feature definition in references/features-*.md]
**Severity:** [Critical — blocks functionality | Important — causes friction | Enhancement — nice to have]
**Remediation Level:** [Light — meta-doc update | Medium — add feature/hook | Heavy — architectural change]

---

## Example Entry

**Area:** Foundation
**Feature:** P0-3 Self-Verification
**Current State:** Test suite exists (`pytest.ini`, `tests/`), but no pre-completion gate — agent can finalize tasks without passing tests.
**Missing Capability:** Wire test execution into the task completion flow; pipe error logs back into agent context.
**Severity:** Critical
**Remediation Level:** Medium

---
