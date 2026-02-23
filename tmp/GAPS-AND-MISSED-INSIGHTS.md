# GAPS-AND-MISSED-INSIGHTS.md — Audit of Meta Docs vs Source Article

> **Purpose**: This file records requirements, advice, and potential from  
> `origins/OpenAI-Harness-Engineering.md` that are **absent or only partially represented**  
> in the four meta docs (`AGENTS.md`, `ARCHITECTURE.md`, `KNOWLEDGE.md`, `QUALITY.md`).  
> Use it to drive improvements to the meta docs.

Source: *Harness engineering: leveraging Codex in an agent-first world*  
— Ryan Lopopolo, OpenAI, February 11, 2026

---

## Audit Coverage Summary

| Meta Doc | Topics Covered Well | Notable Gaps |
|---|---|---|
| `AGENTS.md` | Core philosophy, task workflow, PR loop, knowledge map, agent limits | Autonomy loop, throughput metrics, human QA bottleneck |
| `ARCHITECTURE.md` | Layer model, enforcement, dependency philosophy, parse-at-boundary | Observability architecture, per-worktree isolation, concrete scale stats |
| `KNOWLEDGE.md` | Progressive disclosure, knowledge structure, doc gardening, context injection | Plans-as-first-class-artifacts detail, "Ralph Wiggum Loop", agent-to-agent review |
| `QUALITY.md` | Golden principles, entropy/GC, taste feedback loop, merge philosophy | Observability as a quality gate, per-worktree ephemeral stacks, UI/log legibility to agent |

---

## 1. Application Legibility — Largely Missing

**Source article (sections: "Increasing application legibility")**

The article dedicates a full section to making the *application itself* legible to the agent:

- **Per-worktree app instances**: The app is made bootable per git worktree so each Codex task runs against an isolated instance. No meta doc documents this pattern.
- **Chrome DevTools Protocol integration**: Codex has skills to drive the UI via CDP — DOM snapshots, screenshots, navigation, event observation. This is an agent *capability extension*, not just a quality concern.
- **UI validation loop**: Codex snapshots state before and after a UI action, observes runtime events, applies fixes, restarts, and re-runs validation in a loop. This pattern is absent from the meta docs.

**Suggested additions:**

- Document per-worktree isolation as a required engineering pattern in `ARCHITECTURE.md` or a new `OBSERVABILITY.md`.
- Add a section to `AGENTS.md` describing how to launch, drive, and validate the UI in a worktree.
- Define skills for Chrome DevTools access.

---

## 2. Observability Stack as Agent Context — Missing

**Source article (sections: "Increasing application legibility")**

The article describes a full **local, ephemeral observability stack** per worktree:

- Logs → Vector → Victoria Logs (queried via **LogQL**)
- Metrics → Victoria Metrics (queried via **PromQL**)
- Traces → Victoria Traces (queried via **TraceQL**)
- Codex can express goals like *"ensure service startup completes in under 800ms"* or *"no span in these four critical user journeys exceeds two seconds"* because it has direct query access.

**What the meta docs cover:** `QUALITY.md` mentions structured logging. Nothing mentions PromQL, LogQL, or TraceQL as agent-queryable signals. Nothing describes ephemeral teardown of the stack per worktree.

**Suggested additions:**

- New document `OBSERVABILITY.md` covering: stack components, query languages, per-worktree lifecycle, and how to express SLO-style goals as agent prompts.
- Add `OBSERVABILITY.md` to the knowledge map in `AGENTS.md`.

---

## 3. Agent-to-Agent Review — Partially Missing

**Source article (section: "Redefining the role of the engineer")**

> "We instruct Codex to review its own changes locally, request additional specific agent reviews both locally and in the cloud, respond to any human or agent given feedback, and iterate in a loop until all agent reviewers are satisfied (effectively this is a Ralph Wiggum Loop)."

**What the meta docs cover:** `AGENTS.md` describes the PR-to-completion loop (self-review, request agent review, iterate). However:

- The **"local + cloud" distinction** for agent reviews is not made explicit.
- The **Ralph Wiggum Loop** name/concept (iterate until satisfaction, not until a fixed count) is not documented.
- The principle that **human review is optional** ("Humans may review pull requests, but aren't required to") is understated — the meta docs still present humans as normal reviewers.

**Suggested addition to `AGENTS.md`:**

```markdown
### Agent Review Loop (Ralph Wiggum Loop)
Iterate until all agent reviewers are satisfied — not until a fixed number of passes.
Human review is optional and should be reserved for judgment calls.
Agent reviews run both locally and in the cloud (where available).
```

---

## 4. Full Autonomy Capability Checklist — Missing

**Source article (section: "Increasing levels of autonomy")**

The article describes what full autonomy looks like — a concrete **end-to-end capability checklist** for a single-prompt agent run. This is not documented anywhere in the meta docs:

1. Validate the current state of the codebase
2. Reproduce a reported bug
3. **Record a video demonstrating the failure**
4. Implement a fix
5. Validate the fix by driving the application
6. **Record a second video demonstrating the resolution**
7. Open a pull request
8. Respond to agent and human feedback
9. Detect and remediate build failures
10. **Escalate to a human only when judgment is required**
11. Merge the change

Items 3, 6, and 10 are entirely absent from the meta docs. Video recording of before/after states is a key validation artifact. Escalation criteria for human intervention are not defined.

**Suggested additions:**

- Add this checklist to `AGENTS.md` as "The Full Autonomy Loop."
- Define what constitutes a "judgment call" warranting human escalation.
- Document video recording as a validation artifact in `QUALITY.md` or `AGENTS.md`.

---

## 5. Long-Running Agent Runs — Not Addressed

**Source article:**

> "We regularly see single Codex runs work on a single task for upwards of six hours (often while the humans are sleeping)."

The meta docs contain no guidance on:

- How to structure tasks that are designed to run for hours unattended.
- Recovery strategies if a long agent run fails mid-task.
- How execution plans (`docs/exec-plans/`) should be structured to support resumable, multi-hour runs.
- What state should be checkpointed to the repository during a long run.

**Suggested addition to `KNOWLEDGE.md`:** A section on long-run task design — checkpointing state, designing resumable execution plans, and what to do when a run fails partway through.

---

## 6. Throughput Metrics and Velocity Baseline — Not Documented

**Source article:**

> "roughly 1,500 pull requests have been opened and merged … an average throughput of 3.5 PRs per engineer per day … throughput has *increased* as the team has grown"

> "We estimate that we built this in about 1/10th the time it would have taken to write the code by hand."

These figures establish the **operating model baseline**: what throughput looks like at target velocity, and the expectation that velocity increases rather than decreases with team growth (because agents multiply leverage).

**What's missing:** No meta doc establishes a throughput baseline, velocity expectation, or the principle that *"agent throughput growing with team size is a health signal."*

**Suggested addition to `QUALITY.md` or a new `OPERATING-MODEL.md`:** Document target PR throughput, velocity health signals, and the principle that human additions should multiply agent output.

---

## 7. Human QA Bottleneck Pattern — Partially Missing

**Source article:**

> "As code throughput increased, our bottleneck became human QA capacity."

The meta docs do not explicitly address:

- The fact that human QA **will become the bottleneck** as agent throughput scales.
- The solution pattern: make the application, logs, and metrics directly legible to the agent so QA can shift to agent-to-agent.
- The progression: manual QA → agent-assisted QA → agent-driven QA.

**Suggested addition to `AGENTS.md` or `QUALITY.md`:** A section on "QA at Scale" describing this progression and the principle that reducing human QA surface is a first-class engineering goal.

---

## 8. Technologies Favored for Agent Legibility — Partially Documented

**Source article:**

> "Technologies often described as 'boring' tend to be easier for agents to model due to composability, API stability, and representation in the training set."

> "In some cases, it was cheaper to have the agent reimplement subsets of functionality than to work around opaque upstream behavior from public libraries."

`ARCHITECTURE.md` does document "Prefer Boring, Composable Technologies" and "Own Your Utilities." However the *rationale* is incomplete:

- The phrase **"representation in the training set"** — i.e., mainstream technologies are more accurately modeled by the LLM — is not captured.
- The **cost-benefit framing**: reimplementing > wrapping opaque upstream behavior (when the upstream is opaque to the agent).

**Suggested update to `ARCHITECTURE.md`:** Strengthen the rationale with the training-data representation argument and the explicit reimplement-vs-wrap decision rule.

---

## 9. Design Docs: Core Beliefs Document — Missing

**Source article (directory listing):**

```
docs/design-docs/
├── index.md
├── core-beliefs.md   ← explicitly listed
└── ...
```

> "Design documentation is catalogued and indexed, including verification status and **a set of core beliefs that define agent-first operating principles**."

The `KNOWLEDGE.md` meta doc describes design docs in general but does not call out `core-beliefs.md` as a specific required artifact. The existence and purpose of a "core beliefs" document — capturing the fundamental operating principles of agent-first development — is not documented.

**Suggested addition to `KNOWLEDGE.md`:** Add `core-beliefs.md` as a required document with its purpose: encoding the agent-first operating principles that anchor all other design decisions.

---

## 10. Product Specs Written as Acceptance Criteria — Partially Documented

**Source article:**

> "We prioritize work, translate user feedback into acceptance criteria, and validate outcomes."

`KNOWLEDGE.md` does state: "Written in terms of acceptance criteria, not implementation details." However, the broader role of humans — specifically that *translating user feedback into acceptance criteria* is the primary human contribution — is not framed this way in any meta doc.

**Suggested update to `AGENTS.md`:** In the "What Success Looks Like" or a new "Human Role" section, make explicit that the primary human contribution is: prioritizing work, translating feedback into acceptance criteria, and validating outcomes.

---

## 11. ARCHITECTURE.md as Top-Level Map — Missing from Meta Docs

**Source article:**

> "Architecture documentation provides a top-level map of domains and package layering."

The `ARCHITECTURE.md` meta doc describes the architecture *rules* well, but positions itself structurally as a reference doc rather than a **navigational map of domains**. A domain index table is included but empty. The article implies `ARCHITECTURE.md` is itself a navigable document.

**Suggested update:** The domain index table in `ARCHITECTURE.md` should be presented as a required, actively maintained artifact — not an optional placeholder.

---

## 12. Agents Use Standard Development Tools Directly — Understated

**Source article:**

> "Codex uses our standard development tools directly (`gh`, local scripts, and repository-embedded skills) to gather context without humans copying and pasting into the CLI."

> "Agents use our standard development tools directly. They pull review feedback, respond inline, push updates, and often squash and merge their own pull requests."

`AGENTS.md` references repository-embedded tools in passing. But the principle that **agents must be able to operate standard tooling without human copy-paste intermediation** is not stated as a design goal. It implies that all tooling must be scriptable and accessible from agent context.

**Suggested addition to `AGENTS.md`:** Explicit principle: "All repository operations must be scriptable. Agents must never require a human to copy output and paste it into a prompt."

---

## 13. "What We're Still Learning" — Unknown Unknowns Not Captured

**Source article (section: "What we're still learning")**

The article explicitly documents open questions that the team does not yet have answers for:

- How **architectural coherence evolves over years** in a fully agent-generated system.
- Where **human judgment adds the most leverage** and how to encode it so it compounds.
- How the system will **evolve as models become more capable**.

None of the meta docs document these open questions. This matters because:

- It establishes epistemic humility as a team norm.
- It signals areas where humans should remain actively engaged.
- It prevents premature over-confidence in the system's maturity.

**Suggested addition:** A section in `AGENTS.md` or a new `OPEN-QUESTIONS.md` that captures active unknowns — areas where the team is still learning and human judgment is the primary instrument.

---

## Priority Recommendations

| Priority | Gap | Suggested Action |
|---|---|---|
| 🔴 High | Observability stack (LogQL/PromQL/TraceQL, per-worktree) | New `OBSERVABILITY.md`, update `AGENTS.md` |
| 🔴 High | Full autonomy capability checklist (inc. video recording, escalation criteria) | Add to `AGENTS.md` |
| 🔴 High | Per-worktree app isolation as a pattern | Document in `ARCHITECTURE.md` or `OBSERVABILITY.md` |
| 🟡 Medium | Ralph Wiggum Loop detail + human review is optional policy | Update `AGENTS.md` |
| 🟡 Medium | Long-running task design and recovery | Update `KNOWLEDGE.md` |
| 🟡 Medium | `core-beliefs.md` as a required artifact | Update `KNOWLEDGE.md` |
| 🟡 Medium | Human role: acceptance criteria translation | Update `AGENTS.md` |
| 🟢 Low | Throughput baseline and velocity health signals | New `OPERATING-MODEL.md` or update `QUALITY.md` |
| 🟢 Low | Training-data representation rationale for tech choices | Update `ARCHITECTURE.md` |
| 🟢 Low | Open questions / what we're still learning | New `OPEN-QUESTIONS.md` or update `AGENTS.md` |
| 🟢 Low | All tooling must be scriptable (no human copy-paste) | Update `AGENTS.md` |
| 🟢 Low | Domain index as actively maintained artifact | Update `ARCHITECTURE.md` |
