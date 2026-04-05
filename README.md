# Harness Engineering Lab

A knowledge base and research repository for **Harness Engineering** — the AI-first development methodology where humans design environments and agents write the code.

> _"The discipline shows up in the scaffolding, not the code."_

## What is Harness Engineering?

Harness Engineering is the practice of designing the infrastructure, constraints, and feedback loops that surround an AI model to channel its power productively. If the model provides the raw intelligence, the harness is the system that makes that intelligence useful and capable of doing actual work.

The core philosophy: **Humans steer, agents execute.** Engineers stop writing code and instead design verifiable constraints, build automated feedback loops, and orchestrate environments where AI writes the code for them.

## The 3-Pillar + 1-Foundation Framework

All harness engineering concepts are organized under a unified framework:

```json
[
  { "layer": "Foundation: Infrastructure (Execute)", "role": "Execution engine and orchestration", "key_question": "Where does the agent run safely?" },
  { "layer": "Pillar 1: Context Engineering (Inform)", "role": "Memory, knowledge, and real-time data", "key_question": "What does the agent know?" },
  { "layer": "Pillar 2: Architectural Constraints (Constrain)", "role": "Mechanical enforcement of boundaries", "key_question": "What can the agent do?" },
  { "layer": "Pillar 3: Entropy Management (Maintain)", "role": "Long-term codebase health", "key_question": "How does the system stay healthy?" }
]
```

## Repository Structure

```text
HarnessEngineeringLab/
├── ANCHORS.md               ← Strategic decision records (Context Anchoring)
├── references/              ← Source articles and reference material
├── framework/               ← Core framework definitions & operational guides
├── research/                ← Analysis, principles, and commentary
├── builder/                 ← Build logs for the harnessing-agents skill
├── .agent/workflows/        ← Agent workflow definitions (/polish, /reconcile, etc.)
└── tmp/                     ← Working documents and drafts
```

### `references/`

Original source articles that form the foundation of this research, including OpenAI's harness engineering methodology and derived requirements.

### `framework/`

The canonical framework definitions and operational guides (31 core features across 3 pillars + 1 foundation):

- **HE Core Features.md** — The 31 canonical features of Harness Engineering
- **HE Prevention Checklist.md** — Critical risks and failure modes to prevent (+ Reward Engineering cross-cutting)
- **HE Enhancement Options.md** — Catalogue of enhancement opportunities per feature (P0-1 through P3-4)
- **HE Execution Procedure.md** — Step-by-step procedure for applying harness engineering
- **HE Gap Evaluation Framework.md** — Gap analysis and evaluation framework for assessing HE maturity

### `research/`

Supporting analysis and commentary documents covering:

- **Concepts & Philosophy** — `HE Philosophy.md` (core methodology and shift-left execution)
- **Architecture & Principles** — `HE Architectural Principles.md` (strict boundaries), Robust agent principles
- **Multi-Agent** — MAS integration, critical enhancements, degradation factors
- **Practical Guidance** — Landing pathway, assessment sheet, build guide, maturity indicators
- **Tooling & Context** — Tools for agents, theory vs practice comparisons

### `builder/`

Build logs documenting the creation and optimization of the `harnessing-agents` skill, including the optimization plan and results summary.

## Key Concepts

- **Repository as Truth** — All project knowledge lives in the codebase, not in human heads
- **Self-Verification** — Agents run tests, read logs, and fix their own mistakes
- **Ralph Loops** — Force agents to complete long-horizon tasks across context windows
- **Rippable Middleware** — Composable layers that can be removed as models improve
- **Context Compaction** — Prevent "context rot" by intelligently managing the context window
- **Context Anchoring** — Persistent memory records ensuring agents recall long-term goals and rationale across context resets
- **Branch-Based Cognitive Memory** — Utilizing git branches for sub-task parallelization and treating succinct commits as deliberate reasoning memory trees
- **Reward Engineering** — Design reward signals that align agent output with real-world value
- **Boring Technologies** — Mainstream, well-documented tools that agents model accurately

## Scaling: Single to Multi-Agent

The framework scales naturally from a single agent to multi-agent systems. All 31 features are defined once and describe their multi-agent behavior inline. Key multi-agent capabilities include:

- **Inter-Agent Communication (P0-10)** — Messaging bus for P2P, broadcast, and idle notifications
- **File Locking (P0-2)** — Prevents race conditions when multiple agents share a workspace
- **Collective Verification (P0-3)** — Consensus protocols to prevent cascading hallucinations
- **Bounded Autonomy & Access Control (P2-4)** — Contains compromised agents
- **AI Auditors & Collaboration Channels (P2-3)** — Competition and coopetition beyond simple cooperation

## Maturity Levels

```json
[
  { "level": "Basic", "scope": "Single developer", "setup_time": "1–2 hours" },
  { "level": "Team", "scope": "3–10 developers", "setup_time": "1–2 days" },
  { "level": "Production", "scope": "Engineering organization", "setup_time": "1–2 weeks" }
]
```

## License

This repository is a research and knowledge base. See individual source documents for attribution.
