# AGENTS.md

This file is the **IDE-agnostic canonical source** of all project rules for AI agents. Every agentic IDE — Claude Code, VS Code / GitHub Copilot, Cursor, Windsurf, and any future environment — must be able to discover and load these rules. IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) are thin shims that point here.

> **P0-11 Portable Agent Surface:** If a rule isn't in this file, it isn't portable. Never store project-wide rules exclusively in an IDE's proprietary memory system.

## Repository Purpose

This repository's active product surface is the **Harness Engineering framework** in `framework/` plus the live-linked **`harnessing-agents` skill** in `.agent/skills/harnessing-agents/`. It is a framework-first repository for the AI-first development methodology where humans design environments and agents write the code. This repository has a dual role: target projects are harnessed by running the `harnessing-agents` skill in their own agentic environment, and this repository self-hosts by running that same skill on itself to set up and improve its own harness. The root `framework/` stays canonical, while the shipped skill carries a synchronized runtime mirror under `.agent/skills/harnessing-agents/framework/` so target-project execution does not depend on sibling HELab paths.

The primary success criterion is **target-project delivery effectiveness**: the skill must be able to apply the full Harness Engineering feature set to external projects reliably and mechanically. Self-hosting changes inside HELab matter because they prove, refine, or unblock that target-project capability; internal completeness alone is not the goal. There is no traditional build system or application code; the deliverables are the canonical framework documents under `framework/`, the bundled runtime mirror shipped inside `.agent/skills/harnessing-agents/framework/`, the live-linked skill surface under `.agent/skills/harnessing-agents/`, and the harness files that protect them.

## Organizing Framework: 3-Pillar + 1-Foundation

All content is organized under this canonical structure. When editing or creating documents, always align to it:

```json
[
  { "layer": "Foundation: Infrastructure (Execute)", "role": "Execution engine & orchestration", "verb": "Execute" },
  { "layer": "Pillar 1: Context Engineering (Inform)", "role": "Memory, knowledge, real-time data", "verb": "Inform" },
  { "layer": "Pillar 2: Architectural Constraints (Constrain)", "role": "Mechanical enforcement of boundaries", "verb": "Constrain" },
  { "layer": "Pillar 3: Entropy Management (Maintain)", "role": "Long-term codebase health", "verb": "Maintain" }
]
```

**Foundation** features (11): Bash Sandboxes, Filesystem, Git & File Locking, Verification (Self & Collective), Ralph Loops, Orchestration Logic, Rippable Middleware, Escalation Policies & Audit Trails, Harness Versioning, Smart Command Wrappers, Inter-Agent Communication (The Mailbox), Portable Agent Surface

**Pillar 1** features (12): Repository as Truth, Context Compaction & Memory Management, Tool Offloading, Progressive Skills, Observability / Dashboards, Web Search & MCP Integration, Planning, Task Lists & Blackboards, Context Anchoring, Branch-Based Cognitive Memory, Requirements Ledger, Socratic Questioning, Skill Engineering

**Pillar 2** features (5): Automated Linters, Dependency Enforcement, AI Auditors & Collaboration Channels, Bounded Autonomy & Access Control, Upstream Intake Gate

**Pillar 3** features (4): Scheduled Cleanups, Documentation Sync, Pattern Auditing, Consolidation Loop

## Directory Layout

- `framework/` — **Canonical knowledge source.** Core framework definitions (32 features), 19 engineering principles, and enhancement options. This root surface is authoritative and must never be edited indirectly through support material or the bundled skill mirror.
- `.agent/skills/harnessing-agents/` — **Live-linked skill surface.** The skill that audits and improves target projects and that this repository also runs on itself. It ships with a synchronized runtime mirror at `.agent/skills/harnessing-agents/framework/` so target-project execution has local access to the framework context it needs.
- `.agent/workflows/` — Active agent workflow definitions that operate on the canonical framework surface.
- `scripts/` — Active harness tooling that validates and audits the canonical framework surface and live-linked skill surface.
- `docs/` — Non-core support material. It is not part of the active project surface and must not be treated as authoritative unless the user explicitly asks to work there.
- `tmp/` — Working documents and drafts.

## Centralized Logging Configuration

To implement P1-5 Observability / Dashboards, all agent actions must produce centralized, machine-readable logs.

- **Log Format:** All agent logs must be in JSON format with the following fields: `timestamp`, `agent_id`, `action`, `target`, `result`, `duration_ms`.
- **Log Location:** Logs must be written to `.harness/agent-logs.jsonl` (JSON Lines format).
- **Logging Triggers:** Log every tool use, file edit, command execution, and workflow invocation.
- **Audit Trail:** Logs must be append-only and retained for at least 30 days.

## Ralph Loops Configuration

To implement P0-4 Ralph Loops for 100% task completion:

- **Loop Budgets:** Maximum 3 reinjections per task to prevent infinite retries.
- **Escalation Thresholds:** Escalate to human review after 2 failed reinjections.
- **State Persistence:** Use `.harness/task-state.json` for cross-window state summaries.
- **Exit Interception:** Run `node scripts/exit-interceptor.js` after task completion to detect premature exits.

## Workflows

### `/polish` — Feature Polishing & Addition Workflow

Run this workflow when you encounter a new architectural requirement, a powerful organizational concept, or a "weak" existing feature that needs to be escalated or enriched. It handles both the conceptual design (polishing) and the mechanical execution of adding or updating features across the canonical definitions and `harnessing-agents` skill files.

### `/cognitive-branch` — Branch-Based Task Execution

Enforces P1-9 by breaking down complex parent tasks into isolated git sub-task tracking branches. Builds cognitive memory through explicit "approval of evidence" commit messages before recursive merging.

### `/reconcile` — Workspace Entropy Audit

Systematically audits the entire workspace for entropy: broken content, inconsistent terminology, duplication, orphan concepts, and concept chain gaps. Produces a findings report, applies approved fixes, and commits.

### `/mount` — Mount a Framework Feature

Transitions a defined HE feature from concept to live infrastructure. Designs the physical files, injects recall hooks into `AGENTS.md`, seeds historical data, and creates a dedicated maintenance workflow.

### `/revise-comments` — Consistency Check

Legacy workflow for reconciling support material against canonical `framework/` definitions. Use only when the user explicitly asks to maintain `docs/research/` or related support material.

### `/anchor` — Anchor Management

Add, review, or prune context anchor records in `ANCHORS.md` to maintain strategic continuity across sessions.

### `/ccp` — Claude Commit & Push

Intelligent commit workflow: stages changes, generates descriptive commit messages, and pushes to remote.

### `/ccpr` — Claude Commit, Push & Release

Extended commit workflow: commits, pushes, creates a pull request, and after merge creates a GitHub release with version tag and release notes.

## Task Execution & Cognitive Memory

To preserve tracking history and prevent monolithic execution failures, agents must exercise **P1-9 Branch-Based Cognitive Memory**.

- **Crucial Hook:** When given a complex feature, refactor, or multi-step objective, **do not** execute it in a single unbroken stream on `main`. You must use the `/cognitive-branch` workflow to partition the work, check out isolated sub-task tracking branches, commit incremental progress to build cognitive memory, and recursively merge back.

## Context Anchoring

To prevent strategic drift across context window resets, agents rely on **Anchors** (P1-8).

- **At Session Start:** Always read `ANCHORS.md` in the root directory to re-establish the project's strategic goals and major architectural decisions.
- **For Multi-Step Tasks:** Read `REQUIREMENTS.md` and `PLANS.md` before starting. Append a new plan entry for any task requiring more than 3 sequential steps, and cite the relevant requirement IDs.
- **When Making Decisions:** Write new anchor records to `ANCHORS.md` (using the `/anchor` workflow) when you resolve ambiguities, add new features, or alter the framework. Reference existing anchors (e.g., "per A3") in your reasoning.

## Independent Review

To self-host **P2-3 AI Auditors & Collaboration Channels**, the repository maintains a machine-readable review ledger at `REVIEWS.md`.

- **Review-required surfaces:** `framework/`, `.agent/skills/harnessing-agents/`, `.agent/workflows/`, `AGENTS.md`, `README.md`, `REQUIREMENTS.md`, `RELEASES.md`, `ANCHORS.md`, `scripts/he-lint.js`, and `scripts/harness/audit.sh`.
- **Before merge:** Any change touching a review-required surface must update `REVIEWS.md` with an approving machine-readable review record.
- **Generator/evaluator separation:** The implementation agent identity recorded in `REVIEWS.md` must not be the same as the reviewer identity that certifies the change.
- **Escalation:** If an independent reviewer cannot approve the change, record the findings in `REVIEWS.md` and escalate to the user instead of self-certifying.

## Available Tools & Commands

All available tools and scripts. Undeclared tools do not exist for agents — if a tool is useful but not listed, add it here rather than using it undocumented.

- `npm run smoke` — Fast HE consistency check (he-lint.js only). Run before any commit to verify feature IDs and pillar labels. Target runtime < 2s.
- `npm run sync:skill-version` — Copy the canonical HELab version from `package.json` into `.agent/skills/harnessing-agents/SKILL.md`.
- `npm run sync:skill-framework` — Copy the canonical root `framework/` into `.agent/skills/harnessing-agents/framework/` so the shipped skill runtime stays self-contained.
- `npm run check` — Full quality gate: markdownlint + cspell + he-lint.js. Equivalent to what CI runs. Use before pushing.
- `npm run ci` — Alias for `npm run check`. Use in automated contexts.
- `npm run audit` — Structural integrity audit: verifies the active harness files exist, workflows are registered, tmp/ is clean, and anchor count is healthy. Exit 0 = PASS.
- `node scripts/he-lint.js` — Canonical HE consistency checker for the active framework surface. Runs on `git commit` (pre-commit hook) and in CI on every push/PR.
- `/reconcile` — Manual entropy audit workflow. Run when content drift is suspected or after large structural changes. Requires agent invocation.
- `/polish` — Feature polishing + addition workflow. Use when adding or upgrading framework features.
- `/cognitive-branch` — Complex task execution with branch memory (P1-9). Use for any multi-step objective.
- `/ccp` — Intelligent commit wrapper: stages, generates message, and pushes.
- `/ccpr` — Commit + push + PR + release wrapper.
- `/anchor` — Add, review, or prune context anchor records in `ANCHORS.md`.
- `/revise-comments` — Legacy consistency check for support material. Run only when explicitly maintaining `docs/research/` against `framework/`.

## DO NOT

Explicit forbidden operations. Each entry states the action and the consequence of performing it. Each rule traces to an Engineering Principle — see `framework/HE Index.md` and `framework/principles/` for full chains.

- **`EP-11` Never edit `framework/` files to resolve a support-material inconsistency by matching the wrong definition.** Consequence: bad content enters canonical truth. Action: if support material must be kept, update it to match `framework/`; otherwise leave the support material non-authoritative.
- **`EP-14`, `EP-2` Never start multi-step planning or execution without citing requirement IDs from `REQUIREMENTS.md` in `PLANS.md`.** Consequence: unregistered work bypasses the intake gate, breaks planning traceability, and weakens self-hosted enforcement of P1-10/P2-5.
- **`EP-11` Never add a rule to this file without a concrete incident, failure, or constraint that justifies it.** Consequence: generic rules are ignored by agents trained to find mechanically-enforced constraints; the next `/reconcile` run will flag and remove them.
- **`EP-15` Never bypass pre-commit hooks with `git commit --no-verify`.** Consequence: `he-lint` violations enter the repository and CI will reject the push.
- **`EP-11` Never treat anything under `docs/` as canonical project truth.** Consequence: support material can override the framework in agent reasoning and create silent harness drift. Action: prefer `framework/` for all decisions; only edit or reference `docs/` when explicitly requested.
- **`EP-11` Never create SAS-only or MAS-only variants of core feature definitions.** Consequence: parallel files diverge and agents load contradictory definitions. All 32 features are unified through `framework/HE Index.md` and single DAG node files (per A4).
- **`EP-11` Never introduce a new workflow or script without adding it to `## Available Tools & Commands`.** Consequence: the tool is invisible to agents and effectively non-existent as a harness resource.
- **`EP-2` Never mark a `PLANS.md` entry status as `done` without moving it to the Completed Plans section.** Consequence: task history is lost; future agents cannot examine resolved blocking issues, constraints applied, or decisions made during the task — rebuilding that context costs a full conversation replay.
- **`EP-15` Never push to `main` when `npm run audit` exits with FAIL.** Consequence: a structurally degraded harness enters the main branch; missing critical files are invisible to agents until the next weekly GC remediation cycle completes.
- **`EP-15` Never change the root version in `package.json` without syncing `.agent/skills/harnessing-agents/SKILL.md`.** Consequence: external projects consuming the live-linked skill see an ambiguous version state, and `he-lint` will fail the repository until the versions match.
- **`EP-15` Never change the canonical root `framework/` without syncing `.agent/skills/harnessing-agents/framework/`.** Consequence: target projects run against a stale bundled runtime framework, and `he-lint` will fail until the bundle matches the root source.
- **`EP-15` Never change `framework/` or `.agent/skills/harnessing-agents/` without updating `RELEASES.md`.** Consequence: linked downstream consumers lose a durable record of externally visible changes, and `he-lint` will fail until the release notes are updated.
- **`EP-16` Never merge changes to review-required surfaces without updating `REVIEWS.md` with an independent approving reviewer.** Consequence: the same implementation identity silently self-certifies a core harness change, and `he-lint` will fail the repository until a separate reviewer is recorded.
- **`EP-10` Never store project-wide rules exclusively in an IDE-specific file or proprietary memory system.** Consequence: agents running in other IDEs cannot discover the rules, fragmenting the harness. All global rules must live in `AGENTS.md`; IDE-specific files are shims only (per A8).
- **`EP-15` Never deploy advisory or warning-level CI checks; all checks must be binary pass/fail.** Consequence: agents ignore warnings — only hard failures drive behavior change. Advisory warnings accumulate silently until they cascade into hard-to-diagnose failures.
- **`EP-3` Never attribute an agent failure to the agent without first diagnosing the harness (1. Is the constraint in AGENTS.md? → 2. Is there a CI gate? → 3. Does the error message include remediation?).** Consequence: skipping harness diagnosis means the root cause (missing rule, missing gate, unclear error message) persists and the same failure recurs in every future agent run.
- **`EP-9` Never choose bleeding-edge or poorly-documented technology stacks for agent-authored code without explicit justification.** Consequence: agents generate more hallucinations and incorrect patterns with novel frameworks lacking training-data representation, increasing correction overhead and token waste.

### Skill-Specific Rules (P1-12 Skill Engineering)

Enforcement for the **6 Mandatory Skill Principles** (see `framework/HE Skill Creation Standard.md`). All skills shipped from HELab — especially `harnessing-agents` — must satisfy these rules before merge.

- **`EP-12` Never ship a skill without a complete YAML metadata header.** The header must include `name`, `version`, `description`, `user-invocable`, and `allowed-tools`. Consequence: automation cannot discover the skill, users cannot understand scope, version sync gates fail, and review automation breaks. Action: validation happens in `npm run check` (pre-commit hook).

- **`EP-12` Never ship a skill with only one mode of operation.** Every skill must define 2 modes: Full (default, comprehensive) and Targeted (keyword-triggered, fast). Consequence: users cannot control depth, leading to unnecessary context load and wasted cycles. Action: document both modes with routing keywords, time estimates, and explicit output contracts in the SKILL.md metadata.

- **`EP-12` Never execute a skill without defining 3–5 mechanical, sequential phases.** Each phase must have a fixed structure (input → check → output), not free-form reasoning. Consequence: agents hallucinate or improvise execution paths, breaking reproducibility and debuggability. Action: document phases in SKILL.md before implementing; reviewers verify phases are mechanical, not conversational.

- **`EP-12` Never produce skill output as free-form prose.** All outputs must match exact templates stored in `templates/` directory and must be written to a dedicated output directory (`.harness/`, `.audit/`, etc., never root). Consequence: downstream skills cannot parse outputs, target projects get cluttered with artifacts, and findings become non-actionable. Action: define templates before coding; review gates verify output locations match declarations.

- **`EP-12` Never pre-read entire file trees or omit progressive context loading.** Skills must read an index first, identify only what's needed from the index, load specific files only, and flush completed work before the next phase. Target: max ~200 lines mandatory-read per action path. Consequence: token explosion, hallucination from information overload, and inability to scale to large repositories. Action: context-loading audit during skill review; pre-merge testing on repos of varying sizes (10 files, 1000 files, 100K files).

- **`EP-12` Never suggest next actions without checking current state.** Before proposing work, read REQUIREMENTS.md / PLANS.md / REVIEWS.md (for HELab) to confirm the work is not already done. Do not invent project names; use exact names the user provided or neutral wording (`this workspace`, `HELab`). Consequence: duplicate work, wasted cycles, erosion of user trust. Action: state-awareness audit during skill review; suggested actions must cite the state document they checked (e.g., "per PLANS.md, feature X is in progress").

- **`EP-15` Never change `framework/` or `.agent/skills/harnessing-agents/` without syncing and updating release notes.** When the Skill Creation Standard is updated, sync it to `.agent/skills/harnessing-agents/framework/` (via `npm run sync:skill-framework`) and update `RELEASES.md` with the change. Consequence: target projects run against stale standards, skill quality diverges between HELab and external delivery, and downstream change traceability is lost.

## Conventions

- **File naming:** Title Case with spaces, max 5 words. Use `HE` prefix for general docs, `MAS` for multi-agent specific content. Violation causes naming entropy that breaks cross-link validation and file-search heuristics.
- **Consistency rule:** `framework/` is the single source of truth for Harness Engineering definitions. The live-linked skill in `.agent/skills/harnessing-agents/` must derive from and stay consistent with `framework/`, and its bundled runtime mirror in `.agent/skills/harnessing-agents/framework/` must remain byte-for-byte synchronized with the root source. Never define or validate framework truth from `docs/`; support material may be stale or disposable.
- **Dual-mode contract:** This repository both ships the `harnessing-agents` skill for target-project use and self-hosts by running that same skill on itself. At present the skill is live-linked, not independently packaged, so changes to the skill surface and shared `framework/` files are effective immediately in linked external environments.
- **Runtime bundle rule:** The shipped skill must be self-contained enough to execute in target projects without depending on sibling HELab paths. Bundle the runtime framework inside `.agent/skills/harnessing-agents/framework/`, but keep the root `framework/` canonical.
- **Mission rule:** Judge repository changes by whether they improve the skill's ability to apply Harness Engineering features effectively in target projects. Self-hosted HELab implementations are proof points and hardening loops for that external delivery mission, not the end state by themselves.
- **Version rule:** `package.json` is the canonical HELab version source. `.agent/skills/harnessing-agents/SKILL.md` mirrors that version because the current skill surface is part of HELab, not an independently released artifact. Use `npm run sync:skill-version` after any root version change.
- **Release-notes rule:** `RELEASES.md` is the canonical HELab release-notes surface. Update the `Unreleased` section whenever changes to `framework/` or `.agent/skills/harnessing-agents/` alter downstream behavior for linked consumers.
- **Independent-review rule:** `REVIEWS.md` is the canonical machine-readable audit trail for review-required surfaces. Each approving record must include distinct generator and reviewer identities plus the paths covered by the review.
- **Gap evaluation:** Use `framework/HE Index.md` to navigate feature nodes for multi-dimensional assessment of harness implementations. The `framework/features/` directory provides per-feature gap signals, improvement policies, and dependency maps, while `framework/cross-cutting/` contains evaluation perspectives.
- **Unified features:** All 32 features are defined once as single files in `framework/features/`. Each feature description covers both single-agent and multi-agent behavior inline — no separate SAS/MAS documents. Creating split files causes definitions to diverge; `he-lint.js` will catch the count mismatch.
- **Commit style:** `feat:` and `docs:` prefixes with descriptive messages. Generic messages like "update docs" block downstream automation from extracting semantic change history.
- **Rule entries:** Every rule added to `AGENTS.md` must state the consequence of violation. Generic advice (e.g., "follow best practices") will be removed on the next `/reconcile` run.
- **IDE shim pattern (P0-11):** `AGENTS.md` is the canonical rule surface. IDE-specific files (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`) must be thin shims that reference `AGENTS.md` and contain only IDE-specific overrides. When rules change, update `AGENTS.md` first, then verify shims remain consistent.
- **Machine-Readability First (P1-1):** Prioritize JSON or structured code blocks over Markdown tables for all framework data (measurables, dependency graphs, scoring matrices). Consequence: Markdown tables are difficult for agents to parse deterministically; JSON allows for reliable automation and state management.
