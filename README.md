# Harness Engineering Lab

A framework-first repository for **Harness Engineering** and the live-linked **`harnessing-agents` skill** that applies it in real projects.

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
├── framework/               ← Core framework definitions & operational guides
│   ├── features/            ← 32 core feature definitions (P0-1 to P3-4)
│   ├── principles/          ← 19 engineering principles (EP-1 to EP-19)
│   └── cross-cutting/       ← Systemic risks and evaluation frameworks
├── .agent/skills/
│   └── harnessing-agents/   ← Live-linked skill that audits and improves target projects
├── docs/                    ← Non-core support material (not part of the active project surface)
├── .agent/workflows/        ← Agent workflow definitions (/polish, /reconcile, etc.)
└── tmp/                     ← Working documents and drafts
```

### `framework/`

The canonical framework definitions and operational guides. This is the single source of truth for the methodology that the live-linked skill loads and applies:

- **HE Index.md** — The Directed Acyclic Graph (DAG) index for the entire framework
- **HE Principle Practice Chain.md** — The 5-level Principle-to-Practice Chain methodology
- **HE Harnessing Protocol.md** — Step-by-step procedure for applying harness engineering
- **features/** — 32 modular feature files (L1→L5 chains)
- **principles/** — 19 modular engineering principle files (EP-1 to EP-19)
- **cross-cutting/** — Reward Engineering, Token Economics, Prevention Checklist

### `.agent/skills/harnessing-agents/`

The live-linked skill surface. Target projects are currently harnessed by symlinking this skill into their agentic environment and running it there. This repository also self-hosts by running the same skill against itself to set up and improve its own harness. Because the skill shares core files under `framework/`, changes in either place immediately affect linked downstream environments.

- **SKILL.md** — Skill entry point and routing surface
- **references/** — Audit and scoring references used by the skill
- **templates/** — Output templates written into a target project's `.harness/` directory

### Versioning

HELab is the canonical version source for the current live-linked skill model.

- **`package.json`** — Canonical HELab version.
- **`.agent/skills/harnessing-agents/SKILL.md`** — Mirrored skill metadata version for downstream visibility.
- **`npm run sync:skill-version`** — Syncs the root version into the skill metadata.

The skill does not currently have an independent release boundary. If a HELab change affects the skill surface or the shared `framework/` files it loads, that is also a downstream skill change.

### `docs/`

Support material only. Content under `docs/` is not part of the active project surface and should not be treated as authoritative over `framework/`.

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

The framework scales naturally from a single agent to multi-agent systems. All 32 features are defined once and describe their multi-agent behavior inline. Key multi-agent capabilities include:

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

This repository is a framework and harness repository. See individual source documents for attribution where applicable.
