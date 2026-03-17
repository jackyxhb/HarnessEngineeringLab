# Harness Engineering Lab

A knowledge base and research repository for **Harness Engineering** — the AI-first development methodology where humans design environments and agents write the code.

> *"The discipline shows up in the scaffolding, not the code."*

## What is Harness Engineering?

Harness Engineering is the practice of designing the infrastructure, constraints, and feedback loops that surround an AI model to channel its power productively. If the model provides the raw intelligence, the harness is the system that makes that intelligence useful and capable of doing actual work.

The core philosophy: **Humans steer, agents execute.** Engineers stop writing code and instead design verifiable constraints, build automated feedback loops, and orchestrate environments where AI writes the code for them.

## The 3-Pillar + 1-Foundation Framework

All harness engineering concepts are organized under a unified framework:

| Layer | Role | Key Question |
|---|---|---|
| **Foundation: Infrastructure** (Execute) | Execution engine and orchestration | *Where does the agent run safely?* |
| **Pillar 1: Context Engineering** (Inform) | Memory, knowledge, and real-time data | *What does the agent know?* |
| **Pillar 2: Architectural Constraints** (Constrain) | Mechanical enforcement of boundaries | *What can the agent do?* |
| **Pillar 3: Entropy Management** (Maintain) | Long-term codebase health | *How does the system stay healthy?* |

## Repository Structure

```
HarnessEngineeringLab/
├── origins/                 ← Source articles and reference material
├── HESkill/                 ← Core framework definitions (SAS & MAS)
├── comments/                ← Analysis, principles, and commentary
├── CaseStudy/               ← Real-world case studies
├── HESamples/               ← Sample implementations
└── tmp/                     ← Working documents and drafts
```

### `origins/`

Original source articles that form the foundation of this research, including OpenAI's harness engineering methodology and derived requirements.

### `HESkill/`

The canonical framework definitions:

- **Core Features for SAS.md** — Framework applied to Single Agent Systems
- **Core Features for MAS.md** — Framework adapted for Multi-Agent Systems
- **HE Prevention Checklist.md** — Critical risks and failure modes to prevent

### `comments/`

Supporting analysis and commentary documents covering:

- **Concepts & Philosophy** — Key concepts, key points, introduction, big picture
- **Architecture & Principles** — Robust agent principles, function areas, mature features
- **Multi-Agent** — MAS integration, critical enhancements, degradation factors
- **Practical Guidance** — Landing pathway, assessment sheet, build guide, maturity indicators
- **Context** — Theory vs practice comparisons

## Key Concepts

- **Repository as Truth** — All project knowledge lives in the codebase, not in human heads
- **Self-Verification Loops** — Agents run tests, read logs, and fix their own mistakes
- **Ralph Loops** — Force agents to complete long-horizon tasks across context windows
- **Rippable Middleware** — Composable layers that can be removed as models improve
- **Context Compaction** — Prevent "context rot" by intelligently managing the context window
- **Boring Technologies** — Mainstream, well-documented tools that agents model accurately

## SAS vs MAS

The framework scales from single to multi-agent systems. Key MAS additions include:

- **Inter-Agent Communication** — Messaging bus for P2P, broadcast, and idle notifications
- **File Locking** — Prevent race conditions when multiple agents share a workspace
- **Collective Verification** — Consensus protocols to prevent cascading hallucinations
- **Bounded Autonomy** — Access controls to contain compromised agents
- **Diverse Collaboration** — Competition and coopetition beyond simple cooperation

## Maturity Levels

| Level | Scope | Setup Time |
|---|---|---|
| **Basic** | Single developer | 1–2 hours |
| **Team** | 3–10 developers | 1–2 days |
| **Production** | Engineering organisation | 1–2 weeks |

## License

This repository is a research and knowledge base. See individual source documents for attribution.
