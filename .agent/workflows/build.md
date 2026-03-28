# /build

**Role Directive:** Assume you are a seasoned professional AI Agent skill-creating expert. Your objective is to engineer the `harnessing-agents` skill from the canonical framework documents in this workspace.

The skill must enable any agent to mechanically assess and improve harness maturity on a target project to the highest degree — efficiently, reliably, and with the most optimized token consumption possible.

---

## Governing Principles

These principles are non-negotiable constraints on every build decision:

1. **Humans steer, agents execute** — Engineers design environments; agents write within them.
2. **Repository-first** — Anything not in the repo does not exist to the agent.
3. **Boring technologies** — Use mainstream tools agents model accurately.
4. **Rippable middleware** — Remove complexity as models improve; never over-engineer.
5. **Encode judgment once, enforce forever** — Review comment → doc → lint rule → CI check.
6. **Escalation is correct behavior** — An agent stopping to ask is success, not failure.
7. **Fix the environment, not the code** — When an agent fails, add a mechanical guardrail so it self-corrects.
8. **ReAct Loops prevent hallucination** — Agents must think explicitly (via `<scratchpad>`) before invoking tools or writing templates.
9. **Prune the Action Space** — Never give agents broad tool freedom; strictly define the exact minimum tools needed for the phase.
10. **Progressive Context/Trajectory Reduction** — Load heavy data only when triggered, and flush context (summarize & drop raw files) after finishing a phase to avoid context rot.

---

## Structural Rules

### File Budget Constraints

Every output file must obey strict line budgets to keep per-action-path cost low:

| File Type | Max Lines | Rationale |
| --- | --- | --- |
| SKILL.md (entry point) | 200 | Agent reads this first on every invocation |
| Reference files (`references/`) | 200 | Agent reads 1–2 per action path |
| Template files (`templates/`) | 150 | Copy-paste targets must be compact |
| Per-action-path total | 270 | SKILL.md + 1 reference = agent's full read budget |

**Hard rule:** If any file exceeds its budget, split by concern before proceeding.

### Folder Structure

```text
harnessing-agents/
├── SKILL.md                        # Entry point: framework + decision tree + principles
├── references/                     # Deep-dive procedural and specification docs
│   ├── workflow.md                 # 3-step audit: Inspect → Plan → Execute
│   ├── agent-prompts.md            # Ready-to-use dispatch prompts (parallel agents)
│   ├── gap-scoring.md              # 6 evaluation dimensions + priority formula
│   ├── quick-checklist.md          # 15-item yes/no fast gap scan
│   ├── dimensions.md               # 4 scoping dimensions + decision matrix
│   ├── features-foundation.md      # Foundation features F1–F8 (gap signals, policies)
│   ├── features-pillars.md         # Pillar features P1-1 to P3-4 (gap signals, policies)
│   └── dependencies.md             # Bidirectional feature dependency map
└── templates/                      # Copy-paste output standardization
    ├── he-clues.md                 # Audit finding capture format
    ├── implementation-plan.md      # Prioritized action plan + gates
    ├── change-summary.md           # Per-agent execution record + checklist
    └── assessment-report.md        # Before/after scores + next cycle
```

**Separation of concerns:**
- Workflow docs = procedures (how to run)
- Feature defs = specifications (what each feature includes)
- Scoring frameworks = evaluation (how to prioritize)
- Quick reference = minimal viable assessment (5 min path)
- Templates = output standardization (consistent capture)

Each file must be independently valuable yet explicitly cross-referenced to its neighbors.

### Frontmatter Standard

SKILL.md must include YAML frontmatter:

```yaml
---
name: harnessing-agents
version: "<semver>"
description: "<single sentence matching skill index description>"
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
---
```

Bump `version` on every build. Use semantic versioning: patch for fixes, minor for content changes, major for structural reorganization.

---

## Organizing Framework: 3-Pillar + 1-Foundation

All skill content must align to this canonical structure from `framework/`:

| Layer | Role | Features |
| --- | --- | --- |
| **Foundation** | Execution engine & orchestration | F1–F8: Bash Sandboxes, Filesystem & Git, Self-Verification, Ralph Loops, Orchestration, Rippable Middleware, Escalation Policies, Harness Versioning |
| **P1: Context Engineering** | Memory, knowledge, real-time data | P1-1 to P1-9: Repo as Truth, Context Compaction, Tool Offloading, Progressive Skills, Observability, Web Search & MCP, Planning & State Files, Context Anchoring, Branch-Based Cognitive Memory |
| **P2: Architectural Constraints** | Mechanical enforcement of boundaries | P2-1 to P2-4: Automated Linters, Dependency Enforcement, AI Auditors, Bounded Autonomy |
| **P3: Entropy Management** | Long-term codebase health | P3-1 to P3-4: Scheduled Cleanups, Documentation Sync, Pattern Auditing, Consolidation Loop |

**25 features total.** Every gap signal, improvement policy, and dependency must trace to a feature ID.

### Feature Specification Format

Each of the 25 features must include:

- **Feature ID** and name
- **Gap signals** — observable indicators that this feature is missing or weak
- **Tiered improvement policies** — Tier 1 (achievable today) → Tier 2 (intermediate) → Tier 3 (vision)
- **Dependencies** — bidirectional: "Depends On" + "Depended On By"
- **SAS→MAS evolution** — how the feature scales from single to multi-agent

### MAS Extensions

When building MAS-related content, each Foundation/Pillar gains additional features:
- Foundation: Inter-Agent Mailbox, File Locking, Collective Verification, Audit Trails
- P1: Shared Blackboards, Distributed Memory
- P2: Diverse Collaboration
- P3: Conflict Resolution

---

## 4 Scoping Dimensions

Every audit and every build must be scoped across all four dimensions:

| Dimension | Options | Effect on Build |
| --- | --- | --- |
| **Feature Tree** | Which of 25 features: Present-Effective, Present-Weak, Absent-Do, Absent-Don't | Determines content coverage |
| **Agent Scale** | SAS · Small Group (2–5) · Enterprise · Scaled-Swarm | Determines MAS depth |
| **Project Complexity** | Pure text/meta · Script-heavy · Simple software · Complicated systems · Large-scale enterprise | Determines tier ceiling |
| **Remediation Level** | Light (revise meta docs) · Medium (add new features) · Heavy (reform architecture) | Determines action intensity |

**"Don't" decisions must be documented** — explicitly exclude features with recorded reasoning, not silent omission.

---

## Decision Tree (SKILL.md Must Include)

SKILL.md must contain a fast-path routing table as the agent's first decision after reading:

| Goal | Start Here | Time |
| --- | --- | --- |
| Quick gap check | `references/quick-checklist.md` | 5 min |
| Full audit (Inspect → Plan → Execute) | `references/workflow.md` | 30–60 min |
| Score and prioritize specific gaps | `references/gap-scoring.md` | 15 min |
| Look up a feature's signals + policies | `references/features-foundation.md` or `references/features-pillars.md` | 2 min |
| Scope an audit before starting | `references/dimensions.md` | 5 min |

This table prevents the agent from reading everything before acting. Each row is a complete action path.

---

## Scoring & Prioritization Method

### 6 Evaluation Dimensions (per feature)

Each feature is scored 1–5 across:
1. Presence — Does the mechanism exist?
2. Completeness — Does it cover all relevant cases?
3. Automation — Is it mechanical or manual?
4. Integration — Is it wired into the workflow?
5. Observability — Can you see it working/failing?
6. Scalability — Will it survive 10× growth?

**Composite Score** = weighted average (weights adjustable per domain).

### Priority Calculation

```text
Priority = (5 - CompositeScore) × ImpactWeight × CascadeLength
```

- **ImpactWeight** — How many downstream features depend on this one (from `dependencies.md`)
- **CascadeLength** — Longest chain of features that break if this one fails

### 5 Cross-Cutting Verification Perspectives

After scoring, validate through these lenses:

| Perspective | Checks |
| --- | --- |
| **A. Feedback Loop Chain** | Unbroken links: code → verification → audit → humans → harness improvement |
| **B. Token Economics** | Balance of "token savers" vs "token spenders" across features |
| **C. Failure Cascade Map** | Longest chains = highest priority; no single points of failure |
| **D. SAS→MAS Readiness** | Each feature has a documented evolution path |
| **E. Human Role Progression** | Code Writer → Harness Builder → Architect → Overseer |

---

## Multi-Agent Coordination Pattern

### Exclusive-Scope Parallel Dispatch

For inspection and execution phases, dispatch agents with non-overlapping scopes:

| Agent | Scope | Features |
| --- | --- | --- |
| Foundation Agent | Infrastructure layer | F1–F8 |
| Context Agent | P1: Context Engineering | P1-1 to P1-9 |
| Constraint Agent | P2: Architectural Constraints | P2-1 to P2-4 |
| Entropy Agent | P3: Entropy Management | P3-1 to P3-4 |

**Consolidation agent** merges all findings, deduplicates, resolves conflicts, and produces the unified output document.

Each dispatch prompt (stored in `references/agent-prompts.md`) must include:
- Role definition
- Exact scan scope (feature IDs)
- Gap signals to look for
- Output format reference (template path)

---

## Build Execution: 4 Phases

### Phase 1 — Structural Foundation (do first; other phases reference this)

1. Read all canonical sources in `framework/` to establish ground truth
2. Build or update SKILL.md: frontmatter, decision tree, framework summary, principles, references list
3. Verify SKILL.md ≤ 200 lines

**Gate:** SKILL.md is complete and all other phases reference it correctly.

### Phase 2 — Content Extraction & Splitting (parallelizable)

Independent tasks — execute in parallel when possible:

- **2a. Feature files** — Build `features-foundation.md` (F1–F8) and `features-pillars.md` (P1-1 to P3-4) from framework sources. Each feature includes gap signals, tiered policies, dependencies, SAS→MAS evolution. Cross-reference header in each file pointing to its companion.
- **2b. Scoring framework** — Build `gap-scoring.md` with 6 evaluation dimensions, priority formula, 5 cross-cutting perspectives. Disambiguate from scoping dimensions.
- **2c. Quick checklist** — Extract `quick-checklist.md` as 15-item yes/no fast scan with pointers to full scoring.
- **2d. Scoping dimensions** — Build `dimensions.md` with 4 dimensions, decision matrix, scope calibration guidance.
- **2e. Dependency map** — Build `dependencies.md` as consolidated bidirectional table from all 25 features.
- **2f. Templates** — Extract all output formats into `templates/` as copy-paste ready files with clear placeholders. Enforce optimization by requiring agents to use `Remediation Level: [Light | Medium | Heavy]` natively instead of abstract logic in findings.
- **2g. Workflow** — Build `workflow.md` with 3-step audit (Inspect → Plan → Execute), agent coordination patterns, user confirmation gate. *Enforce Trajectory Reduction: Instruct agents to flush memory/raw file content after completing Inspect phase.*
- **2h. Agent prompts** — Build `agent-prompts.md` with dispatch prompts. **Crucial Optimization:** Explicitly limit the Action Space by commanding subagents to *only* use `list_dir`, `grep_search`, and `view_file` for structural read-checks. Second, enforce ReAct structuring: require agents to use `<scratchpad>` or `<thought>` tags to deliberate findings *before* generating their HE-CLUES output.

**Gate:** Every reference file ≤ 200 lines. Every template ≤ 150 lines. No file duplicates content from another.

### Phase 3 — Cross-Reference Wiring

1. Verify all internal references point to existing files (zero dangling refs)
2. Verify bidirectional: if A references B, B should reference A where appropriate
3. Verify naming consistency — no terminology conflicts (e.g., "Assessment" vs "Scoping" vs "Evaluation" must each have exactly one meaning)
4. Update SKILL.md references section to list all files

**Gate:** `grep` for stale filenames returns zero hits. Terminology audit shows zero conflicts.

### Phase 4 — Verification & Metrics

Run all verification criteria — build fails if any check fails:

| Check | Method | Pass Criteria |
| --- | --- | --- |
| Line budgets | `wc -l` every file | SKILL.md ≤ 200, references ≤ 200, templates ≤ 150 |
| Per-action-path budget | SKILL.md + heaviest reference | ≤ 270 lines total |
| Decision tree validity | Each row's file exists | Zero broken routes |
| Template self-containment | Copy each template in isolation | Clear placeholders, no external dependencies |
| Stale references | `grep` for deleted/renamed filenames | Zero hits |
| Terminology consistency | `grep` for known conflict terms | Each term has exactly one meaning |
| Cross-reference completeness | All file pairs checked | Zero dangling refs |
| Feature coverage | Count unique feature IDs across all files | 25 features covered |
| Framework alignment | Diff skill content against `framework/` | Zero contradictions |

### Phase 5 — Critical Deployment Process (Places)

Once the skill successfully passes all verification gates, you must formally deploy it across the agent network.

**The deployment pipeline:**
1. **Source of Truth Sync:** Natively write or transfer all compiled folders (`references/`, `templates/`) and `SKILL.md` directly into the workspace at `/Users/macbook1/work/HE/HELab/.agent/skills/harnessing-agents/`.
2. **Global Sync:** Ensure the global pointer natively symlinks to the workspace:

   ```bash
   ln -sfn /Users/macbook1/work/HE/HELab/.agent/skills/harnessing-agents ~/.agents/skills/harnessing-agents
   ```

3. **Engine Sync:** Ensure Antigravity specifically recognizes this mapping:

   ```bash
   ln -sfn ~/.agents/skills/harnessing-agents ~/.gemini/antigravity/skills/harnessing-agents
   ```

**Gate:** The deployment is successful only if a directory read on `~/.gemini/antigravity/skills/harnessing-agents` resolves valid files.

### Before/After Metrics

Every build must produce a metrics summary:

```text
| File | Before | After | Change |
| --- | --- | --- | --- |
| (each file) | N lines | M lines | delta |
```

Plus: total files, total lines, per-action-path max, verification pass/fail.

---

## Naming & Terminology Conventions

| Term | Meaning | Used In |
| --- | --- | --- |
| **Scoping Dimensions** (4) | Scope the overall audit | `dimensions.md` |
| **Evaluation Dimensions** (6) | Score individual features | `gap-scoring.md` |
| **Feature ID** | `F1`–`F8`, `P1-1`–`P3-4` | All feature references |
| **CLUE-[N]** | Audit finding with bidirectional backlinks | `HE-CLUES.md`, templates |
| **HE-*** prefix | Harness Engineering generic doc | File naming |
| **MAS-*** prefix | Multi-Agent specific doc | File naming |

**File naming in workspace:** Title Case, max 5 words, `HE` or `MAS` prefix per CLAUDE.md conventions.

---

## Maturity Levels

The built skill must support all three maturity targets:

| Level | Scope | Time | Key Features |
| --- | --- | --- | --- |
| **Basic** | Single developer | 1–2 hours | CLAUDE.md, pre-commit hooks, test suite, clean structure |
| **Team** | 3–10 developers | 1–2 days | AGENTS.md, CI-enforced constraints, docs-as-code |
| **Production** | Engineering org | 1–2 weeks | Custom middleware, entropy agents, observability, A/B testing |

---

## Template Design Rules

1. **Self-contained** — Every template works when copied in isolation; no implicit context.
2. **Clear placeholders** — Use `[PLACEHOLDER]` syntax; never leave ambiguous blanks.
3. **Backlinks** — Every template entry links back to originating feature spec or clue ID.
4. **Minimal prose** — Tables and checklists over paragraphs. Prose only for disambiguation.
5. **Verification checklist at bottom** — Every template includes its own pass/fail checks:
   - `□ Implements policy from features-foundation.md or features-pillars.md`
   - `□ Tier assignment matches implementation-plan.md`
   - `□ No new gaps introduced (vs. quick-checklist.md)`

---

## Sustainability: Split & Extract Patterns

When content grows beyond budgets during future iterations:

| Signal | Action |
| --- | --- |
| File exceeds line budget | Split by concern (e.g., foundation vs pillars) |
| Output format buried in prose | Extract to `templates/` as copy-paste file |
| Naming conflict between docs | Rename immediately; disambiguate in both files |
| Duplicate content across files | Consolidate to one source, replace others with pointers |
| Feature added to framework | Add to appropriate features file, update dependencies, update checklist |

---

## Cascade Analysis Method

Use `dependencies.md` to determine implementation order:

1. **Identify root features** — features with zero "Depends On" entries (implement first)
2. **Rank by downstream count** — features with the most "Depended On By" entries have highest impact
3. **Map longest chains** — longest dependency chain = highest failure cascade risk
4. **Never implement a feature before its dependencies are at least Present-Weak**

---

## Source of Truth

- `framework/` in this workspace is the **canonical source**. Never contradict it.
- Read `framework/Core Features for SAS.md` and `framework/Core Features for MAS.md` as primary inputs.
- Read `framework/HE Gap Evaluation Framework.md` for scoring methodology.
- Read `framework/HE Enhancement Options.md` for improvement policies.
- Read `framework/SAS to MAS Feature Mapping.md` for scale evolution.
- Read `framework/HE Prevention Checklist.md` for failure prevention signals.
- Cross-validate all built content against these sources before finalizing.
