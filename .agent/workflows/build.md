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

```json
[
  { "file_type": "SKILL.md (entry point)", "max_lines": 200, "rationale": "Agent reads this first on every invocation" },
  { "file_type": "Reference files (`references/`)", "max_lines": 215, "rationale": "Agent reads 1–2 per action path. Budget raised from 200: features-pillar1.md carries 11 P1 features vs 10 at design time" },
  { "file_type": "Template files (`templates/`)", "max_lines": 150, "rationale": "Copy-paste targets must be compact" },
  { "file_type": "Per-action-path total", "max_lines": 270, "rationale": "SKILL.md + 1 reference = agent's full read budget" }
]
```

**Hard rule:** If any file exceeds its budget, split by concern before proceeding.

### Folder Structure

```text
harnessing-agents/
├── SKILL.md                        # Entry point: framework + decision tree + principles
├── references/                     # Deep-dive procedural and specification docs
│   ├── workflow.md                 # 3-step audit: Inspect → Plan → Execute
│   ├── agent-prompts.md            # Ready-to-use dispatch prompts (parallel agents)
│   ├── gap-scoring.md              # 6 evaluation dimensions + priority formula
│   ├── quick-checklist.md          # 29-item yes/no fast gap scan
│   ├── dimensions.md               # 4 scoping dimensions + decision matrix
│   ├── features-foundation.md      # Foundation features P0-1–P0-10 (gap signals, policies)
│   ├── features-pillar1.md         # Pillar 1 features P1-1 to P1-10 (gap signals, policies)
│   ├── features-pillar2-3.md       # Pillar 2–3 features P2-1 to P3-4 (gap signals, policies)
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

```json
[
  {
    "layer": "Foundation",
    "role": "Execution engine & orchestration",
    "features": ["P0-1–P0-10: Bash Sandboxes", "Filesystem Git & File Locking", "Verification (Self & Collective)", "Ralph Loops", "Orchestration Logic", "Rippable Middleware", "Escalation Policies & Audit Trails", "Harness Versioning", "Smart Command Wrappers", "Inter-Agent Communication (The Mailbox)"]
  },
  {
    "layer": "P1: Context Engineering",
    "role": "Memory, knowledge, real-time data",
    "features": ["P1-1 to P1-11: Repository as Truth", "Context Compaction & Memory Management", "Tool Offloading", "Progressive Skills", "Observability / Dashboards", "Web Search & MCP Integration", "Planning Task Lists & Blackboards", "Context Anchoring", "Branch-Based Cognitive Memory", "Requirements Ledger", "Socratic Questioning"]
  },
  {
    "layer": "P2: Architectural Constraints",
    "role": "Mechanical enforcement of boundaries",
    "features": ["P2-1 to P2-5: Automated Linters", "Dependency Enforcement", "AI Auditors & Collaboration Channels", "Bounded Autonomy & Access Control", "Upstream Intake Gate"]
  },
  {
    "layer": "P3: Entropy Management",
    "role": "Long-term codebase health",
    "features": ["P3-1 to P3-4: Scheduled Cleanups", "Documentation Sync", "Pattern Auditing", "Consolidation Loop"]
  }
]
```

**30 features total.** Every gap signal, improvement policy, and dependency must trace to a feature ID.

### Feature Specification Format

Each of the 30 features must include:

- **Feature ID** and name
- **Gap signals** — observable indicators that this feature is missing or weak
- **Tiered improvement policies** — Tier 1 (achievable today) → Tier 2 (intermediate) → Tier 3 (vision)
- **Dependencies** — bidirectional: "Depends On" + "Depended On By"
- **SAS→MAS evolution** — how the feature scales from single to multi-agent

### MAS Extensions

Multi-agent behavior is described inline within each of the 30 features — no separate extensions exist.

---

## 4 Scoping Dimensions

Every audit and every build must be scoped across all four dimensions:

```json
[
  { "dimension": "Feature Tree", "options": ["Which of 30 features: Present-Effective", "Present-Weak", "Absent-Do", "Absent-Don't"], "effect": "Determines content coverage" },
  { "dimension": "Agent Scale", "options": "SAS · Small Group (2–5) · Enterprise · Scaled-Swarm", "effect": "Determines MAS depth" },
  { "dimension": "Project Complexity", "options": "Pure text/meta · Script-heavy · Simple software · Complicated systems · Large-scale enterprise", "effect": "Determines tier ceiling" },
  { "dimension": "Remediation Level", "options": "Light (revise meta docs) · Medium (add new features) · Heavy (reform architecture)", "effect": "Determines action intensity" }
]
```

**"Don't" decisions must be documented** — explicitly exclude features with recorded reasoning, not silent omission.

---

## Decision Tree (SKILL.md Must Include)

SKILL.md must contain a fast-path routing table as the agent's first decision after reading:

```json
[
  { "goal": "Quick gap check", "start_here": "`references/quick-checklist.md`", "time": "5 min" },
  { "goal": "Full audit (Inspect → Plan → Execute)", "start_here": "`references/workflow.md`", "time": "30–60 min" },
  { "goal": "Score and prioritize specific gaps", "start_here": "`references/gap-scoring.md`", "time": "15 min" },
  { "goal": "Look up a feature's signals + policies", "start_here": ["`references/features-foundation.md`", "`references/features-pillar1.md`", "`references/features-pillar2-3.md`"], "time": "2 min" },
  { "goal": "Scope an audit before starting", "start_here": "`references/dimensions.md`", "time": "5 min" }
]
```

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

```json
[
  { "perspective": "A. Feedback Loop Chain", "checks": "Unbroken links: code → verification → audit → humans → harness improvement" },
  { "perspective": "B. Token Economics", "checks": "Balance of \"token savers\" vs \"token spenders\" across features" },
  { "perspective": "C. Failure Cascade Map", "checks": "Longest chains = highest priority; no single points of failure" },
  { "perspective": "D. SAS→MAS Readiness", "checks": "Each feature has a documented evolution path" },
  { "perspective": "E. Human Role Progression", "checks": "Code Writer → Harness Builder → Architect → Overseer" }
]
```

---

## Multi-Agent Coordination Pattern

### Exclusive-Scope Parallel Dispatch

For inspection and execution phases, dispatch agents with non-overlapping scopes:

```json
[
  { "agent": "Foundation Agent", "scope": "Infrastructure layer", "features": "P0-1–P0-10" },
  { "agent": "Context Agent", "scope": "P1: Context Engineering", "features": "P1-1 to P1-11" },
  { "agent": "Constraint Agent", "scope": "P2: Architectural Constraints", "features": "P2-1 to P2-5" },
  { "agent": "Entropy Agent", "scope": "P3: Entropy Management", "features": "P3-1 to P3-4" }
]
```

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

- **2a. Feature files** — Build `features-foundation.md` (P0-1–P0-10) and `features-pillar1.md` (P1-1 to P1-10) and `features-pillar2-3.md` (P2-1 to P3-4) from framework sources. Each feature includes gap signals, tiered policies, dependencies, SAS→MAS evolution. Cross-reference header in each file pointing to its companions.
- **2b. Scoring framework** — Build `gap-scoring.md` with 6 evaluation dimensions, priority formula, 5 cross-cutting perspectives. Disambiguate from scoping dimensions.
- **2c. Quick checklist** — Extract `quick-checklist.md` as 29-item yes/no fast scan (one per feature) with pointers to full scoring.
- **2d. Scoping dimensions** — Build `dimensions.md` with 4 dimensions, decision matrix, scope calibration guidance.
- **2e. Dependency map** — Build `dependencies.md` as consolidated bidirectional table from all 30 features.
- **2f. Templates** — Extract all output formats into `templates/` as copy-paste ready files with clear placeholders. Enforce optimization by requiring agents to use `Remediation Level: [Light | Medium | Heavy]` natively instead of abstract logic in findings.
- **2g. Workflow** — Build `workflow.md` with 3-step audit (Inspect → Plan → Execute), agent coordination patterns, user confirmation gate. *Enforce Trajectory Reduction: Instruct agents to flush memory/raw file content after completing Inspect phase.*
- **2h. Agent prompts** — Build `agent-prompts.md` with dispatch prompts. **Crucial Optimization:** Explicitly limit the Action Space by commanding subagents to *only* use `Glob`, `Grep`, and `Read` for structural read-checks. Second, enforce ReAct structuring: require agents to use `<scratchpad>` or `<thought>` tags to deliberate findings *before* generating their HE-CLUES output.

**Gate:** Every reference file ≤ 200 lines. Every template ≤ 150 lines. No file duplicates content from another.

### Phase 3 — Cross-Reference Wiring

1. Verify all internal references point to existing files (zero dangling refs)
2. Verify bidirectional: if A references B, B should reference A where appropriate
3. Verify naming consistency — no terminology conflicts (e.g., "Assessment" vs "Scoping" vs "Evaluation" must each have exactly one meaning)
4. Update SKILL.md references section to list all files

**Gate:** `grep` for stale filenames returns zero hits. Terminology audit shows zero conflicts.

### Phase 4 — Verification & Metrics

Run all verification criteria — build fails if any check fails:

```json
[
  { "check": "Line budgets", "method": "`wc -l` every file", "pass_criteria": ["SKILL.md ≤ 200", "references ≤ 215", "templates ≤ 150"] },
  { "check": "Per-action-path budget", "method": "SKILL.md + heaviest reference", "pass_criteria": "≤ 290 lines total" },
  { "check": "Decision tree validity", "method": "Each row's file exists", "pass_criteria": "Zero broken routes" },
  { "check": "Template self-containment", "method": "Copy each template in isolation", "pass_criteria": ["Clear placeholders", "no external dependencies"] },
  { "check": "Stale references", "method": "`grep` for deleted/renamed filenames", "pass_criteria": "Zero hits" },
  { "check": "Terminology consistency", "method": "`grep` for known conflict terms", "pass_criteria": "Each term has exactly one meaning" },
  { "check": "Cross-reference completeness", "method": "All file pairs checked", "pass_criteria": "Zero dangling refs" },
  { "check": "Feature coverage", "method": "Count unique feature IDs across all files", "pass_criteria": "30 features covered" },
  { "check": "Framework alignment", "method": "Diff skill content against `framework/`", "pass_criteria": "Zero contradictions" }
]
```

### Phase 5 — Critical Deployment Process (Places)

Once the skill successfully passes all verification gates, you must formally deploy it across the agent network.

**The deployment pipeline:**
1. **Source of Truth Sync:** Natively write or transfer all compiled folders (`references/`, `templates/`) and `SKILL.md` directly into the workspace at `/Users/macbook1/work/HE/HELab/.agent/skills/harnessing-agents/`.
2. **Global Sync:** Ensure the global pointer natively symlinks to the workspace:

   ```bash
   ln -sfn /Users/macbook1/work/HE/HELab/.agent/skills/harnessing-agents ~/.agents/skills/harnessing-agents
   ```

3. **Verify Deployment:** Confirm the skill is accessible from the project:

   ```bash
   ls .agent/skills/harnessing-agents/SKILL.md
   ```

**Gate:** The deployment is successful only if a directory read on `.agent/skills/harnessing-agents` resolves valid files.

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

```json
[
  { "term": "Scoping Dimensions (4)", "meaning": "Scope the overall audit", "used_in": "`dimensions.md`" },
  { "term": "Evaluation Dimensions (6)", "meaning": "Score individual features", "used_in": "`gap-scoring.md`" },
  { "term": "Feature ID", "meaning": ["`P0-1`–`P0-10`", "`P1-1`–`P3-4`"], "used_in": "All feature references" },
  { "term": "CLUE-[N]", "meaning": "Audit finding with bidirectional backlinks", "used_in": ["`HE-CLUES.md`", "templates"] },
  { "term": "HE-* prefix", "meaning": "Harness Engineering generic doc", "used_in": "File naming" },
  { "term": "MAS-* prefix", "meaning": "Multi-Agent specific doc", "used_in": "File naming" }
]
```

**File naming in workspace:** Title Case, max 5 words, `HE` or `MAS` prefix per CLAUDE.md conventions.

---

## Maturity Levels

The built skill must support all three maturity targets:

```json
[
  { "level": "Basic", "scope": "Single developer", "time": "1–2 hours", "key_features": ["CLAUDE.md", "pre-commit hooks", "test suite", "clean structure"] },
  { "level": "Team", "scope": "3–10 developers", "time": "1–2 days", "key_features": ["AGENTS.md", "CI-enforced constraints", "docs-as-code"] },
  { "level": "Production", "scope": "Engineering org", "time": "1–2 weeks", "key_features": ["Custom middleware", "entropy agents", "observability", "A/B testing"] }
]
```

---

## Template Design Rules

1. **Self-contained** — Every template works when copied in isolation; no implicit context.
2. **Clear placeholders** — Use `[PLACEHOLDER]` syntax; never leave ambiguous blanks.
3. **Backlinks** — Every template entry links back to originating feature spec or clue ID.
4. **Minimal prose** — Tables and checklists over paragraphs. Prose only for disambiguation.
5. **Verification checklist at bottom** — Every template includes its own pass/fail checks:
   - `□ Implements policy from features-foundation.md, features-pillar1.md, or features-pillar2-3.md`
   - `□ Tier assignment matches implementation-plan.md`
   - `□ No new gaps introduced (vs. quick-checklist.md)`

---

## Sustainability: Split & Extract Patterns

When content grows beyond budgets during future iterations:

```json
[
  { "signal": "File exceeds line budget", "action": "Split by concern (e.g., foundation vs pillars)" },
  { "signal": "Output format buried in prose", "action": "Extract to `templates/` as copy-paste file" },
  { "signal": "Naming conflict between docs", "action": "Rename immediately; disambiguate in both files" },
  { "signal": "Duplicate content across files", "action": "Consolidate to one source, replace others with pointers" },
  { "signal": "Feature added to framework", "action": "Add to appropriate features file, update dependencies, update checklist" }
]
```

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
- Read `framework/HE Core Features.md` as the primary input.
- Read `framework/HE Gap Evaluation Framework.md` for scoring methodology.
- Read `framework/HE Enhancement Options.md` for improvement policies.
- Read `framework/HE Prevention Checklist.md` for failure prevention signals.
- Cross-validate all built content against these sources before finalizing.
