# Agent Project Build Guide

How to Construct an Agent Project for a Specific Industry? Example domain: Job seekers find matched job descriptions, then tailor their CV/Cover Letter for applications.

---

## Phase 1: Define the Domain Model

Before writing any code, map the **business domain** clearly:

| Domain Object            | What It Represents                                         |
| ------------------------ | ---------------------------------------------------------- |
| **Job Seeker Profile**   | Skills, experience, education, preferences, target roles   |
| **Job Description**      | Role requirements, company info, keywords, qualifications  |
| **CV/Resume**            | The candidate's base document (master version)             |
| **Cover Letter**         | Personalised letter per application                        |
| **Match Score**          | How well a profile fits a job description                  |
| **Tailored Application** | The output: CV + cover letter customised for a specific JD |

---

## Phase 2: Design the Agent Loop

The core agent workflow follows a **pipeline**:

```
1. INGEST     → Parse job descriptions (from URLs, PDFs, pasted text)
2. ANALYSE    → Extract key requirements, skills, keywords, culture signals
3. MATCH      → Score the JD against the seeker's profile
4. TAILOR CV  → Rewrite/reorder CV sections to emphasise matched skills
5. WRITE CL   → Generate a cover letter aligned to JD + company culture
6. REVIEW     → Self-review for accuracy, tone, and completeness
7. OUTPUT     → Deliver the tailored application package
```

---

## Phase 3: Build the Scaffolding (Applying Harness Engineering)

### 3a. Repository Structure

```
project/
├── AGENTS.md              ← Entry point: how agents work here
├── meta/
│   ├── ARCHITECTURE.md    ← Domain model, layer rules
│   ├── KNOWLEDGE.md       ← Where to find what
│   └── QUALITY.md         ← Taste invariants for output quality
├── docs/
│   ├── design-docs/       ← Why decisions were made
│   ├── product-specs/     ← Acceptance criteria per feature
│   └── references/        ← LLM-friendly docs for dependencies
├── templates/
│   ├── cv-master.md       ← The seeker's master CV
│   ├── cv-tailored.md     ← Template for tailored output
│   └── cover-letter.md    ← Template for cover letters
├── data/
│   ├── job-descriptions/  ← Ingested JDs (structured)
│   ├── profiles/          ← Seeker profiles
│   └── applications/      ← Generated tailored applications
├── skills/
│   ├── parse-jd/          ← Skill: extract structured data from JDs
│   ├── match-profile/     ← Skill: score profile vs JD
│   ├── tailor-cv/         ← Skill: rewrite CV for a specific JD
│   └── write-cover/       ← Skill: generate cover letter
├── src/                   ← Application code (layered architecture)
└── tests/                 ← Test suites per skill
```

### 3b. Make Knowledge Agent-Legible

- **Master CV** lives in the repo as structured markdown — not a PDF
- **Job descriptions** are parsed into structured format (title, company, requirements, keywords, culture signals)
- **Past applications** are stored as reference — the agent learns from what worked

### 3c. Define Taste Invariants (Quality Gates)

| Rule                                                     | Enforcement                  |
| -------------------------------------------------------- | ---------------------------- |
| CV must not exceed 2 pages                               | Lint check on output         |
| No fabricated skills or experience                       | Validation against master CV |
| Cover letter must reference specific company details     | Output review check          |
| Keywords from JD must appear naturally in CV             | Keyword coverage score       |
| Tone must be professional and authentic                  | Style guide + self-review    |
| No generic/template phrases ("I am passionate about...") | Banned phrases list          |

### 3d. Build Feedback Loops

- **After each application**: Did you get an interview? Feed results back
- **After each interview**: What questions came up? Update the profile
- **Pattern detection**: Which tailoring strategies correlate with callbacks?

---

## Phase 4: Implementation Steps

| Step | What to Build                                                | Why                                                |
| ---- | ------------------------------------------------------------ | -------------------------------------------------- |
| 1    | **JD Parser** — extract structured data from job postings    | Everything downstream depends on structured input  |
| 2    | **Profile Schema** — structured representation of the seeker | The agent needs a typed, validated source of truth |
| 3    | **Matching Engine** — score JD vs profile                    | Prioritise which jobs to apply for                 |
| 4    | **CV Tailoring Skill** — rewrite CV sections per JD          | Core value proposition                             |
| 5    | **Cover Letter Skill** — generate personalised letters       | Second deliverable                                 |
| 6    | **Self-Review Agent** — validate output quality              | Catches hallucinations and quality issues          |
| 7    | **Application Tracker** — log all applications and outcomes  | Closes the feedback loop                           |

---

## Phase 5: What Makes This "Agent-First"

The key shift from a regular app to an **agent-first** system:

1. **The agent does the work** — it doesn't just suggest, it produces the final output
2. **Human reviews, not writes** — the seeker approves or adjusts, not drafts from scratch
3. **Knowledge compounds** — each application improves the system (better templates, better matching, better phrasing)
4. **Skills are composable** — the JD parser, matcher, and tailorer are independent, reusable components
5. **Quality is enforced mechanically** — not by human proofreading every time

---

## The Key Insight

> The agent doesn't replace the job seeker's judgment — it replaces the **repetitive, time-consuming work** of reading JDs, identifying matches, and rewriting documents. The human's job becomes: **choose which opportunities to pursue, review the output, and feed back what works.**

This is the same "humans steer, agents execute" principle — applied to recruitment.
