# HE-CLUES Template

Repeat this block for each gap found. Use filesystem tools to verify — do not assume. Each entry maps to the **Principle-to-Practice Chain** (L1 Principle → L2 Enhancement → L3 Design → L4 Actions/Prevention → L5 Gaps/Measurement) defined per-feature in `framework/features/P*.md`.

---

**Area:** [Foundation | Pillar 1 | Pillar 2 | Pillar 3]
**Feature:** [Feature ID and name, e.g., P0-3 Collective Verification]
**Governed By:** [EP-N — Engineering Principle name, from `framework/HE Index.md`]
**Current State:** [What exists now, based on files checked with Glob/Grep/Read]
**Prevention Active:** [Which "Don't Do" failure is currently happening, or "None". Quote the specific anti-pattern from the feature reference.]
**Recommended Options:** [Specific actions and tools from the "Options" section of the feature reference]
**Severity:** [Critical — blocks functionality | Important — causes friction | Enhancement — nice to have]
**Remediation Level:** [Light — meta-doc update | Medium — add feature/hook | Heavy — architectural change]

---

## Example Entry

**Area:** Foundation
**Feature:** P0-3 Collective Verification (Self-Verification)
**Governed By:** EP-3 — Deterministic Verification
**Current State:** Test suite exists (`test.config`, `tests/`), but no pre-completion gate — agent can finalize tasks without passing tests.
**Prevention Active:** "Prevent Cascading Hallucinations" — one agent's error can corrupt downstream decisions because there is no verification gate before committing work.
**Recommended Options:**
- **Action:** Ground solutions in tests before agents complete a task.
- **Tool:** Task completion hooks (e.g., `TaskCompleted` exiting with code 2 to prevent completion on failure).
- **Tier 1:** Make test passes a gating criteria for task finalization.
**Severity:** Critical
**Remediation Level:** Medium

---
