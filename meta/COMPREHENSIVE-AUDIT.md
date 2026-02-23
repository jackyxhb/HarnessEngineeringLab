# COMPREHENSIVE-AUDIT.md — Full Coverage Audit of Meta Docs vs Source Article

> **Purpose**: Paragraph-by-paragraph audit of `origins/OpenAI-Harness-Engineering.md`  
> against all five meta docs (`AGENTS.md`, `ARCHITECTURE.md`, `KNOWLEDGE.md`, `QUALITY.md`, `OBSERVABILITY.md`).  
> Records every requirement, piece of advice, and potential insight — both covered and missed.  
> Supersedes the earlier `GAPS-AND-MISSED-INSIGHTS.md` which drove the first round of improvements.

Audit date: 2026-02-24  
Source: *Harness engineering: leveraging Codex in an agent-first world* — Ryan Lopopolo, OpenAI, February 11, 2026

---

## Overall Coverage Assessment

After the first audit round and subsequent updates, the five meta docs now cover **~85-90%** of the source article's substance. The remaining gaps fall into three categories:

1. **Strategic lessons and caveats** — wisdom about *when* and *why* to adopt these patterns
2. **Subtle framing insights** — restatements that shift how engineers think about their role
3. **Minor specifics** — small details, named references, and directory-level entries

---

## Section-by-Section Cross-Reference

### ✅ Fully Covered Sections

These sections from the source article are comprehensively represented across the meta docs:

| Article Section | Primary Meta Doc(s) | Notes |
|---|---|---|
| Core philosophy — "Humans steer. Agents execute." | `AGENTS.md` | Core philosophy section + human role |
| Every line of code is agent-generated | `AGENTS.md` | "What Agents Can Touch" table |
| Monolithic AGENTS.md anti-pattern | `KNOWLEDGE.md` | Anti-patterns section with 4 failure modes |
| Progressive disclosure | `KNOWLEDGE.md` | Core concept + context injection strategy |
| Knowledge structure + docs/ directory | `KNOWLEDGE.md` | Full directory layout documented |
| Plans as first-class artifacts | `KNOWLEDGE.md` | Execution plans section with lifecycle |
| Doc gardening agent | `KNOWLEDGE.md` | Maintenance practices + freshness signals |
| Layered domain architecture (Types → Config → ... → UI) | `ARCHITECTURE.md` | Layer model + rules + responsibilities table |
| Cross-cutting via Providers only | `ARCHITECTURE.md` | Explicit rule with forbidden examples |
| Custom linters with remediation error messages | `ARCHITECTURE.md` + `QUALITY.md` | Both docs cover this |
| "Parse at the boundary" | `ARCHITECTURE.md` + `QUALITY.md` | Golden principle #2 |
| "Boring, composable technologies" + training-set rationale | `ARCHITECTURE.md` | Dependency philosophy section |
| Reimplement vs wrap decision rule + p-limit example | `ARCHITECTURE.md` | Decision table + example |
| Per-worktree app isolation | `ARCHITECTURE.md` + `OBSERVABILITY.md` | Both architectural and observability angles |
| Chrome DevTools Protocol integration | `OBSERVABILITY.md` | CDP capabilities table + UI validation loop |
| Observability stack (Vector → Victoria Logs/Metrics/Traces) | `OBSERVABILITY.md` | Full stack diagram + signal types |
| LogQL / PromQL / TraceQL query access | `OBSERVABILITY.md` | Signal types table + SLO-style goals |
| Ephemeral stack teardown per worktree | `OBSERVABILITY.md` | Lifecycle summary |
| Video recording as validation artifact | `OBSERVABILITY.md` | Dedicated section with before/after pattern |
| Golden principles (shared > hand-rolled, structured logging, naming, file sizes) | `QUALITY.md` | 7 golden principles documented |
| Entropy problem + "AI slop" Friday cleanup anecdote | `QUALITY.md` | Entropy section with anecdote |
| Continuous garbage collection agents | `QUALITY.md` | GC agents table with cadence |
| Quality scorecard per domain | `QUALITY.md` | Dimensions table |
| Merge philosophy (corrections cheap, waiting expensive) | `QUALITY.md` | Full section with blocking rules |
| Taste feedback loop (reviews → docs → lint → CI) | `QUALITY.md` + `KNOWLEDGE.md` | Decision encoding ladder in KNOWLEDGE |
| Ralph Wiggum Loop (iterate until satisfied) | `AGENTS.md` | PR loop section |
| Human review is optional | `AGENTS.md` | Explicit callout in PR section |
| Full autonomy loop (11 steps) | `AGENTS.md` | Full table with all 11 steps |
| Escalation criteria | `AGENTS.md` + `OBSERVABILITY.md` | Both docs cover escalation |
| Human role: prioritise, translate, validate, encode | `AGENTS.md` | "The Human Role" section |
| "What the agent can't see doesn't exist" | `AGENTS.md` | Agent Limits section |
| All tooling must be scriptable | `AGENTS.md` | "Everything Must Be Scriptable" section |
| Long-running agent runs (6+ hours) | `KNOWLEDGE.md` | Long-running task design section |
| Throughput baseline (3.5 PRs/eng/day) | `QUALITY.md` | Throughput and velocity health signals |
| Velocity increases with team growth | `QUALITY.md` | Health signals table |
| Human QA bottleneck pattern | `QUALITY.md` | QA at Scale section with progression stages |
| Open questions / what we're still learning | `AGENTS.md` | "What We're Still Learning" section |
| Core beliefs document | `KNOWLEDGE.md` | Named as required artifact |
| Domain index as maintained artifact | `ARCHITECTURE.md` | Table with required columns |

---

## 🔴 Remaining Gaps — Strategic Lessons Not Captured

These are the most valuable remaining gaps: hard-won strategic insights that would help teams adopt these patterns.

### Gap 1: Architecture Earlier Than You Think

**Source article (L149):**

> "This is the kind of architecture you usually postpone until you have hundreds of engineers. With coding agents, it's an early prerequisite: the constraints are what allows speed without decay or architectural drift."

**Why it matters:** Teams starting agent-first development will instinctively postpone architecture (as they do in human-first development). This inverts the usual timing — rigid architecture is a **precondition**, not a luxury. None of the meta docs capture this timing argument.

**Suggested location:** `ARCHITECTURE.md` — add as a callout in the opening section explaining *why* architecture must be explicit from day one.

---

### Gap 2: The "Underspecified Environment" Lesson

**Source article (L36):**

> "Early progress was slower than we expected, not because Codex was incapable, but because the environment was underspecified. The agent lacked the tools, abstractions, and internal structure required to make progress toward high-level goals."

**Why it matters:** This is a critical onboarding lesson. New teams will blame the agent when progress is slow, when the real bottleneck is the environment. This reframes "the agent is broken" into "the environment needs investment."

**Suggested location:** `AGENTS.md` — add to Core Philosophy or as a new "Getting Started" callout. Could also work as a note in `ARCHITECTURE.md`.

---

### Gap 3: The "10× Speed" Estimate

**Source article (L10):**

> "We estimate that we built this in about 1/10th the time it would have taken to write the code by hand."

**Why it matters:** This is the headline ROI claim. While individual velocity metrics are in `QUALITY.md`, the overall magnitude of the speedup is not captured. It frames the entire approach as a 10× multiplier, not a marginal improvement.

**Suggested location:** `QUALITY.md` — in the throughput/velocity section, as context for the baseline metrics.

---

### Gap 4: "Discipline Shows Up in the Scaffolding, Not the Code"

**Source article (L229):**

> "Building software still demands discipline, but the discipline shows up more in the scaffolding rather than the code."

**Why it matters:** This is the article's single clearest summary of the paradigm shift. It tells engineers: your job hasn't become easier — it's moved. The quality of your work now lives in the tooling, abstractions, and feedback loops, not in the application code itself. Not captured in any meta doc.

**Suggested location:** `AGENTS.md` — Core Philosophy section, or as an opening epigraph.

---

### Gap 5: Multi-Agent Interoperability

**Source article (L136):**

> "Pulling more of the system into a form the agent can inspect, validate, and modify directly increases leverage—not just for Codex, but for other agents (e.g. Aardvark) that are working on the codebase as well."

**Why it matters:** Legibility investments pay dividends across all agents, not just one. This is a subtle but important multiplier argument — the return on legibility investment increases with the number of agents. No meta doc addresses multi-agent interoperability.

**Suggested location:** `ARCHITECTURE.md` — in the dependency philosophy or a new brief callout about designing for agent diversity.

---

### Gap 6: Non-Generalizability Disclaimer

**Source article (L209):**

> "This behavior depends heavily on the specific structure and tooling of this repository and should not be assumed to generalize without similar investment—at least, not yet."

**Why it matters:** The article is explicitly cautious about overgeneralising. Full autonomy is repository-specific and requires significant prior investment. Without this caveat, the meta docs could create unrealistic expectations.

**Suggested location:** `AGENTS.md` — in the "Full Autonomy Loop" section, as a note/callout.

---

## 🟡 Remaining Gaps — Reframing and Nuance

These are important framing insights that add depth but are less critical than the strategic gaps above.

### Gap 7: "Rules Feel Pedantic in Human Workflows — They're Multipliers for Agents"

**Source article (L153):**

> "In a human-first workflow, these rules might feel pedantic or constraining. With agents, they become multipliers: once encoded, they apply everywhere at once."

**Not captured.** This reframes enforcement culture. Engineers accustomed to human-first norms will resist strict linting and file-size limits as "overkill." This quote explains why the math changes.

**Suggested location:** `QUALITY.md` — in the Taste Invariants section.

---

### Gap 8: "Technical Debt Is a High-Interest Loan"

**Source article (L220):**

> "Technical debt is like a high-interest loan: it's almost always better to pay it down continuously in small increments than to let it compound and tackle it in painful bursts."

**Partially covered.** `QUALITY.md` covers continuous GC and the Friday cleanup anecdote. But this specific framing — debt as a compound-interest problem — is a powerful motivational statement that would strengthen the GC section.

**Suggested location:** `QUALITY.md` — add as a callout in the Continuous Garbage Collection section.

---

### Gap 9: Initial Bootstrapping Pattern

**Source article (L21-26):**

> "The initial scaffold—repository structure, CI configuration, formatting rules, package manager setup, and application framework—was generated by Codex CLI using GPT-5, guided by a small set of existing templates. Even the initial AGENTS.md file that directs agents how to work in the repository was itself written by Codex."

**Not captured.** The meta docs describe how to maintain an agent-first repo but not how to **start one from scratch**. The bootstrapping approach — using the agent itself, guided by templates — is a practical pattern worth documenting.

**Suggested location:** `KNOWLEDGE.md` or `AGENTS.md` — a brief "Bootstrapping" section.

---

### Gap 10: "Design Environments, Specify Intent, Build Feedback Loops"

**Source article (L14):**

> "...what changes when a software engineering team's primary job is no longer to write code, but to design environments, specify intent, and build feedback loops that allow Codex agents to do reliable work."

**Partially implicit.** The three verbs — design environments, specify intent, build feedback loops — constitute the most concise description of the new engineering role. While AGENTS.md's "Human Role" section covers similar ground, this specific three-part framing is cleaner and more memorable.

**Suggested location:** `AGENTS.md` — Core Philosophy or Human Role.

---

### Gap 11: Platform-Specific Reliability Requirements

**Source article (L151):**

> "...platform-specific reliability requirements with custom lints"

**Not captured.** The article mentions that reliability requirements vary by platform and are enforced via custom lints. None of the meta docs address platform-specific enforcement.

**Suggested location:** `QUALITY.md` — as a note in the taste invariants table.

---

## 🟢 Minor / Low-Priority Gaps

These are details from the article that are absent but have minor practical impact:

| # | Detail | Where in Article | Note |
|---|---|---|---|
| 12 | `QUALITY_SCORE.md`, `RELIABILITY.md`, `SECURITY.md`, `DESIGN.md`, `FRONTEND.md`, `PLANS.md`, `PRODUCT_SENSE.md` as separate docs in the `docs/` directory | L100-106 | Our KNOWLEDGE.md references the docs/ structure but doesn't replicate these exact filenames |
| 13 | "human taste is captured once, then enforced continuously on every line of code" | L220 | ✅ Captured as QUALITY.md epigraph, but the "captured once" emphasis could be strengthened |
| 14 | The Aardvark agent as a named example of multi-agent collaboration | L136 | Named reference; not critical to capture |
| 15 | Link to Ralph Wiggum Loop origin (ghuntley.com/loop/) | L40 | Reference link; not critical |
| 16 | Link to "parse, don't validate" blog post (Lexi Lambda) | L141 | Reference link; useful but not critical |
| 17 | Link to ARCHITECTURE.md best practices (matklad) | L111 | Reference link; useful but not critical |
| 18 | Link to execution plans cookbook article | L113 | Reference link; useful |
| 19 | The "emoji preferences" detail as an onboarding analogy | L132 | Tone — not critical |

---

## Advice Catalogue — All Prescriptive Statements from the Article

Every actionable piece of advice from the source article, with coverage status:

| # | Advice | Covered? | Where |
|---|---|---|---|
| 1 | "Humans steer. Agents execute." | ✅ | `AGENTS.md` core philosophy |
| 2 | "No manually-written code" | ✅ | `AGENTS.md` core philosophy |
| 3 | "Give the agent a map, not a 1,000-page manual" | ✅ | `KNOWLEDGE.md` epigraph |
| 4 | Work depth-first: unlock building blocks, don't skip the foundation | ✅ | `AGENTS.md` starting a task |
| 5 | "What capability is missing?" — the correct response to failure | ✅ | `AGENTS.md` core philosophy |
| 6 | Iterate until satisfied, not until a fixed count of passes | ✅ | `AGENTS.md` Ralph Wiggum Loop |
| 7 | Human review is optional — push toward agent-to-agent | ✅ | `AGENTS.md` PR section |
| 8 | Make the app bootable per git worktree | ✅ | `ARCHITECTURE.md` + `OBSERVABILITY.md` |
| 9 | Wire Chrome DevTools Protocol into agent runtime | ✅ | `OBSERVABILITY.md` |
| 10 | Expose logs/metrics/traces to the agent via queryable APIs | ✅ | `OBSERVABILITY.md` |
| 11 | Treat AGENTS.md as table of contents, ~100 lines | ✅ | `KNOWLEDGE.md` |
| 12 | Enforce knowledge base freshness mechanically (linters, CI) | ✅ | `KNOWLEDGE.md` doc gardening |
| 13 | Use progressive disclosure: small stable entry point → deeper sources | ✅ | `KNOWLEDGE.md` |
| 14 | Optimize for agent legibility first, not human preference | ✅ | `AGENTS.md` + `ARCHITECTURE.md` |
| 15 | What the agent can't access in-context doesn't exist | ✅ | `AGENTS.md` agent limits |
| 16 | Encode all decisions (Slack, meetings, chats) into the repo | ✅ | `KNOWLEDGE.md` decision encoding ladder |
| 17 | Favour boring, composable, well-documented technologies | ✅ | `ARCHITECTURE.md` |
| 18 | Reimplement opaque dependencies; wrap transparent ones | ✅ | `ARCHITECTURE.md` decision table |
| 19 | Enforce invariants, not implementations | ✅ | `QUALITY.md` epigraph |
| 20 | Parse data at the boundary — never YOLO-probe shapes | ✅ | `ARCHITECTURE.md` + `QUALITY.md` |
| 21 | Use layered architecture with strict forward-only dependencies | ✅ | `ARCHITECTURE.md` |
| 22 | Cross-cutting through Providers only | ✅ | `ARCHITECTURE.md` |
| 23 | Lint error messages must include remediation instructions | ✅ | `ARCHITECTURE.md` + `QUALITY.md` |
| 24 | Enforce boundaries centrally, allow autonomy locally | ✅ | `ARCHITECTURE.md` epigraph |
| 25 | Human taste → review comments → doc updates → lint rules | ✅ | `QUALITY.md` taste feedback loop |
| 26 | PRs should be short-lived; corrections are cheap, waiting is expensive | ✅ | `QUALITY.md` merge philosophy |
| 27 | Flakes get follow-up runs, not blocking | ✅ | `QUALITY.md` |
| 28 | When agent struggles, identify gap → encode → agent writes the fix | ✅ | `AGENTS.md` human role |
| 29 | All tooling must be scriptable, no copy-paste intermediation | ✅ | `AGENTS.md` tooling principle |
| 30 | Encode "golden principles" directly into the repository | ✅ | `QUALITY.md` golden principles |
| 31 | Run background cleanup agents on a regular cadence | ✅ | `QUALITY.md` GC agents |
| 32 | Pay down tech debt continuously, not in bursts | ✅ (concept) | `QUALITY.md` |
| 33 | Establish a core-beliefs.md document | ✅ | `KNOWLEDGE.md` |
| 34 | Architecture is an early prerequisite, not a later luxury | ❌ | **Gap 1** |
| 35 | Expect slow early progress — it means the environment is underspecified | ❌ | **Gap 2** |
| 36 | Rules feel pedantic for humans but are multipliers for agents | ❌ | **Gap 7** |
| 37 | Discipline now shows up in the scaffolding, not the code | ❌ | **Gap 4** |
| 38 | Legibility investments benefit all agents, not just one | ❌ | **Gap 5** |
| 39 | Full autonomy is repo-specific; don't assume generalisability | ❌ | **Gap 6** |
| 40 | Design environments, specify intent, build feedback loops | ❌ (partially implicit) | **Gap 10** |

---

## Summary Statistics

| Category | Count |
|---|---|
| Total prescriptive statements audited | 40 |
| ✅ Fully covered | 33 (82.5%) |
| ❌ Not covered (gaps identified) | 7 (17.5%) |
| Strategic gaps (🔴) | 6 |
| Framing/nuance gaps (🟡) | 5 |
| Minor/low-priority gaps (🟢) | 8 |

---

## Recommended Actions

### Must-Do (High Value, Low Effort)

1. Add **Gap 1** (architecture timing) as a callout to `ARCHITECTURE.md` opening
2. Add **Gap 2** (underspecified environment) as a caution to `AGENTS.md` core philosophy
3. Add **Gap 4** (discipline in scaffolding) as a principle to `AGENTS.md`
4. Add **Gap 6** (non-generalizability) as a note under the Full Autonomy Loop in `AGENTS.md`

### Should-Do (Medium Value)

1. Add **Gap 5** (multi-agent interop) to `ARCHITECTURE.md`
2. Add **Gap 7** (rules = multipliers) to `QUALITY.md`
3. Add **Gap 8** (tech debt as high-interest loan) to `QUALITY.md`
4. Add **Gap 10** (3-verb engineer role) to `AGENTS.md`

### Nice-to-Have (Low Value)

1. Add **Gap 3** (10× speed claim) to `QUALITY.md`
2. Add **Gap 9** (bootstrapping pattern) to `KNOWLEDGE.md`
3. Add **Gap 11** (platform-specific reliability) to `QUALITY.md`
4. Add reference links for named concepts (Ralph Wiggum Loop, "Parse don't validate", matklad ARCHITECTURE.md)
