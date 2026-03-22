---
description: Create, review, and prune persistent strategic anchor records
---

# /anchor — Context Anchoring Maintenance Workflow

Run this workflow whenever defining a new strategic architectural decision or when prompted points of ambiguity arise that require a permanent record. It ensures the agents maintain alignment across sessions via P1-8 Context Anchoring.

## Phase 1: Determine Action Type

Identify which action the user is requesting: **Add**, **Review**, or **Prune**.

### Sub-workflow: Add
Use when creating a new strategic record.
1. Determine the exact subject of the decision.
2. Formulate the record using the mandatory template: Wait, read `ANCHORS.md` to find the highest existing anchor ID `A{N}` and increment it for the new entry.
3. Draft the anchor containing exactly 5 fields:
   - **What:** Action or decision taken.
   - **Why:** Strategic rationale behind it.
   - **Target:** The system, architecture, or workflow affected.
   - **Background:** Relevant context.
   - **Date:** Today's date (YYYY-MM-DD).
4. Present the drafted anchor to the user for approval.
5. If approved, append it to the Active Anchors section of `ANCHORS.md`.

### Sub-workflow: Review
Use when auditing anchors against actual project state.
1. Read `ANCHORS.md`.
2. Check if any anchor contradicts current project documentation or current strategy.
3. Check for overlapping boundaries between anchors.
4. Recommend modifications or suggest moving stale anchors to the "prune" list.

### Sub-workflow: Prune
Use when retiring an anchor that is superseded by a newer decision.
1. Identify the targeted anchor ID (e.g., A2).
2. Move it from the "Active Anchors" section of `ANCHORS.md` to a new "Archived Anchors" section at the bottom of the document.
3. In its new location, append a `- **Superseded By:** A{X}` line to link it to the current strategic path (if applicable).
4. Do NOT reuse the archived anchor ID. Numbering continues sequentially.

## Phase 2: Verification

1. Ensure `ANCHORS.md` retains valid formatting (headers, bolding).
2. Use `git diff` or similar tools to verify only the intended sections were updated.
3. Remind the user that the updated Context Anchor will automatically load on the next working session via `CLAUDE.md`.
