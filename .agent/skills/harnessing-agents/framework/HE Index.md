# HE Index

The Directed Acyclic Graph (DAG) index for the Harness Engineering framework. This file is the **single entry point** for navigating all 32 features, 16 engineering principles, and cross-cutting concerns.

**Chain Model:** See [HE Principle Practice Chain.md](HE%20Principle%20Practice%20Chain.md) for the L1→L5 methodology.
**Harnessing Protocol:** See [HE Harnessing Protocol.md](HE%20Harnessing%20Protocol.md) for the step-by-step audit workflow.
**Terms Reference:** See [HE-Terms.md](HE-Terms.md) for canonical terminology and skill-side term boundaries.

> **Canonical Path Rule:** Always resolve feature file paths from the `file` field in this index — never guess filenames. Feature filenames are **zero-padded to two digits**: the feature ID `P2-3` resolves to `framework/features/P2-03.md`, not `framework/features/P2-3.md`. The same rule applies to `P0-1` → `P0-01.md`, `P1-7` → `P1-07.md`, etc. Principle files follow the same padding: `EP-3` → `framework/principles/EP-03.md`.

---

## DAG Structure

### Metadata Glossary

- **`origin`**: The first-principle or discipline (Physics, Economics, Engineering) that source-codes the rule.
- **`governs`**: The direct feature IDs (P0-1 through P3-4) that must mechanically enforce this principle.
- **`downstream`**: Features directly downstream of this node in the framework graph. This field can capture hard dependencies as well as explicit enablement, protection, maintenance, or feedback relationships declared in the feature files; changes here ripple to these targets.
- **`measurement_binding`**: Registry key in `.harness/measurement-definitions.json` used to operationalize the feature's L5 measurement section.

```json
{
  "root": "Harness Engineering",
  "chain_model": "framework/HE Principle Practice Chain.md",
  "execution_procedure": "framework/HE Harnessing Protocol.md",
  "principles": [
    {
      "id": "EP-1",
      "principle": "Isolation prevents contamination",
      "origin": "Thermodynamics, clean-room engineering",
      "file": "framework/principles/EP-01.md",
      "governs": ["P0-1"]
    },
    {
      "id": "EP-2",
      "principle": "State must outlive the session",
      "origin": "Database durability (ACID), journaling filesystems",
      "file": "framework/principles/EP-02.md",
      "governs": ["P0-2", "P1-7", "P1-8", "P1-9"]
    },
    {
      "id": "EP-3",
      "principle": "Verify before declaring completion",
      "origin": "Test-driven development, flight pre-checks",
      "file": "framework/principles/EP-03.md",
      "governs": ["P0-3"]
    },
    {
      "id": "EP-4",
      "principle": "Committed tasks must be completed",
      "origin": "Transaction guarantees, contract law",
      "file": "framework/principles/EP-04.md",
      "governs": ["P0-4"]
    },
    {
      "id": "EP-5",
      "principle": "Coordination cost must stay bounded",
      "origin": "Brooks's Law, network topology theory",
      "file": "framework/principles/EP-05.md",
      "governs": ["P0-5", "P0-10"]
    },
    {
      "id": "EP-7",
      "principle": "Every action must be traceable",
      "origin": "Financial auditing, chain of custody",
      "file": "framework/principles/EP-07.md",
      "governs": ["P0-7"]
    },
    {
      "id": "EP-8",
      "principle": "You cannot improve what you do not measure",
      "origin": "Deming, scientific method",
      "file": "framework/principles/EP-08.md",
      "governs": ["P0-8", "P1-5"]
    },
    {
      "id": "EP-9",
      "principle": "Standard operations reduce variance",
      "origin": "Manufacturing SOPs, aviation checklists",
      "file": "framework/principles/EP-09.md",
      "governs": ["P0-6", "P0-9"]
    },
    {
      "id": "EP-10",
      "principle": "Portability over proprietary convenience",
      "origin": "Open standards, POSIX, web standards",
      "file": "framework/principles/EP-10.md",
      "governs": ["P0-11"]
    },
    {
      "id": "EP-11",
      "principle": "If it's not in the repo, it doesn't exist",
      "origin": "Infrastructure as Code, GitOps",
      "file": "framework/principles/EP-11.md",
      "governs": ["P1-1", "P1-10", "P3-2", "P3-4"]
    },
    {
      "id": "EP-12",
      "principle": "Finite attention demands active management",
      "origin": "Cognitive load theory, working memory limits",
      "file": "framework/principles/EP-12.md",
      "governs": ["P1-2", "P1-3", "P1-4", "P1-6", "P1-12"]
    },
    {
      "id": "EP-14",
      "principle": "Clarity before commitment",
      "origin": "Requirements engineering, Socratic method",
      "file": "framework/principles/EP-14.md",
      "governs": ["P1-11", "P2-5"]
    },
    {
      "id": "EP-15",
      "principle": "Mechanical enforcement over advisory guidance",
      "origin": "Type systems, compiler enforcement, guardrails",
      "file": "framework/principles/EP-15.md",
      "governs": ["P2-1", "P2-2"]
    },
    {
      "id": "EP-16",
      "principle": "No author is their own best reviewer",
      "origin": "Peer review, scientific replication",
      "file": "framework/principles/EP-16.md",
      "governs": ["P2-3"]
    },
    {
      "id": "EP-17",
      "principle": "Capabilities proportional to risk",
      "origin": "Principle of least privilege, defense in depth",
      "file": "framework/principles/EP-17.md",
      "governs": ["P2-4"]
    },
    {
      "id": "EP-18",
      "principle": "Entropy requires scheduled countering",
      "origin": "Second law of thermodynamics, maintenance engineering",
      "file": "framework/principles/EP-18.md",
      "governs": ["P3-1", "P3-3"]
    }
  ],
  "features": [
    {
      "id": "P0-1",
      "name": "Bash Sandboxes",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-1",
      "L1": "Isolation prevents contamination",
      "L2": "Zero cross-contamination between agent execution environments",
      "file": "framework/features/P0-01.md",
      "downstream": ["P0-3", "P3-1"]
    },
    {
      "id": "P0-2",
      "name": "Filesystem, Git & File Locking",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-2",
      "L1": "State must outlive the session",
      "L2": "Agent work is persistent, versioned, and conflict-free",
      "file": "framework/features/P0-02.md",
      "measurement_binding": "P0-2",
      "downstream": ["P0-9", "P1-3", "P1-7", "P1-9", "P3-1"]
    },
    {
      "id": "P0-3",
      "name": "Verification (Self & Collective)",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-3",
      "L1": "Verify before declaring completion",
      "L2": "Agents autonomously detect and correct errors before human review",
      "file": "framework/features/P0-03.md",
      "measurement_binding": "P0-3",
      "downstream": ["P0-7", "P2-3"]
    },
    {
      "id": "P0-4",
      "name": "Ralph Loops",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-4",
      "L1": "Committed tasks must be completed",
      "L2": "100% task completion rate regardless of context window exhaustion",
      "file": "framework/features/P0-04.md",
      "downstream": []
    },
    {
      "id": "P0-5",
      "name": "Orchestration Logic",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-5",
      "L1": "Coordination cost must stay bounded",
      "L2": "Agent coordination overhead stays sublinear relative to team size",
      "file": "framework/features/P0-05.md",
      "measurement_binding": "P0-5",
      "downstream": []
    },
    {
      "id": "P0-6",
      "name": "Rippable Middleware",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-9",
      "L1": "Standard operations reduce variance",
      "L2": "Any harness layer can be removed without breaking the rest",
      "file": "framework/features/P0-06.md",
      "downstream": ["P0-8"],
      "measurement_binding": "P0-6"
    },
    {
      "id": "P0-7",
      "name": "Escalation Policies & Audit Trails",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-7",
      "L1": "Every action must be traceable",
      "L2": "Every agent action is attributable; stuck agents are detected and escalated within defined time bounds",
      "file": "framework/features/P0-07.md",
      "downstream": [],
      "measurement_binding": "P0-7"
    },
    {
      "id": "P0-8",
      "name": "Harness Versioning",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-8",
      "L1": "You cannot improve what you do not measure",
      "L2": "Harness configurations are reproducible and comparable with data",
      "file": "framework/features/P0-08.md",
      "downstream": [],
      "measurement_binding": "P0-8"
    },
    {
      "id": "P0-9",
      "name": "Smart Command Wrappers",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-9",
      "L1": "Standard operations reduce variance",
      "L2": "Zero variance in common CLI workflow execution",
      "file": "framework/features/P0-09.md",
      "downstream": ["P3-1", "P3-3"]
    },
    {
      "id": "P0-10",
      "name": "Inter-Agent Communication (The Mailbox)",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-5",
      "L1": "Coordination cost must stay bounded",
      "L2": "Agents can coordinate without supervisor bottleneck, with bounded overhead",
      "file": "framework/features/P0-10.md",
      "measurement_binding": "P0-10",
      "downstream": ["P0-5"]
    },
    {
      "id": "P0-11",
      "name": "Portable Agent Surface",
      "pillar": "P0",
      "pillar_name": "Foundation: Infrastructure (Execute)",
      "ep": "EP-10",
      "L1": "Portability over proprietary convenience",
      "L2": "Agent instructions are discoverable and functional from any IDE",
      "file": "framework/features/P0-11.md",
      "downstream": ["P0-6"]
    },

    {
      "id": "P1-1",
      "name": "Repository as Truth",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-11",
      "L1": "If it's not in the repo, it doesn't exist",
      "L2": "Agent context accuracy without human briefing",
      "file": "framework/features/P1-01.md",
      "measurement_binding": "P1-1",
      "downstream": ["P0-11", "P2-2", "P3-2"]
    },
    {
      "id": "P1-2",
      "name": "Context Compaction & Memory Management",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-12",
      "L1": "Finite attention demands active management",
      "L2": "Sustained reasoning quality across long tasks",
      "file": "framework/features/P1-02.md",
      "measurement_binding": "P1-2",
      "downstream": ["P0-4"]
    },
    {
      "id": "P1-3",
      "name": "Tool Offloading",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-12",
      "L1": "Finite attention demands active management",
      "L2": "Tool outputs never dominate the context window",
      "file": "framework/features/P1-03.md",
      "downstream": ["P1-2"]
    },
    {
      "id": "P1-4",
      "name": "Progressive Skills",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-12",
      "L1": "Finite attention demands active management",
      "L2": "Only task-relevant capabilities are in context at any time",
      "file": "framework/features/P1-04.md",
      "downstream": ["P0-5"]
    },
    {
      "id": "P1-5",
      "name": "Observability / Dashboards",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-8",
      "L1": "You cannot improve what you do not measure",
      "L2": "Agents and humans have real-time visibility into system behavior and health",
      "file": "framework/features/P1-05.md",
      "measurement_binding": "P1-5",
      "downstream": ["P0-7", "P0-8"]
    },
    {
      "id": "P1-6",
      "name": "Web Search & MCP Integration",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-12",
      "L1": "Finite attention demands active management",
      "L2": "Agent answers reflect current state of the world",
      "file": "framework/features/P1-06.md",
      "measurement_binding": "P1-6",
      "downstream": []
    },
    {
      "id": "P1-7",
      "name": "Planning, Task Lists & Blackboards",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-2",
      "L1": "State must outlive the session",
      "L2": "Complex tasks survive context resets and are decomposed before execution",
      "file": "framework/features/P1-07.md",
      "downstream": ["P0-4"]
    },
    {
      "id": "P1-8",
      "name": "Context Anchoring",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-2",
      "L1": "State must outlive the session",
      "L2": "Strategic goals and critical decisions persist across all context resets",
      "file": "framework/features/P1-08.md",
      "downstream": ["P0-4"]
    },
    {
      "id": "P1-9",
      "name": "Branch-Based Cognitive Memory",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-2",
      "L1": "State must outlive the session",
      "L2": "Complex objectives decompose into checkpointed sub-tasks with cognitive history that survives context resets and enables parallel execution",
      "file": "framework/features/P1-09.md",
      "downstream": ["P0-5"]
    },
    {
      "id": "P1-10",
      "name": "Requirements Ledger",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-11",
      "L1": "If it's not in the repo, it doesn't exist",
      "L2": "All requirements formally recorded before any planning or execution",
      "file": "framework/features/P1-10.md",
      "downstream": ["P1-7", "P1-8", "P2-5"]
    },
    {
      "id": "P1-11",
      "name": "Socratic Questioning",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-14",
      "L1": "Clarity before commitment",
      "L2": "Zero ambiguous inputs reaching the execution phase",
      "file": "framework/features/P1-11.md",
      "measurement_binding": "P1-11",
      "downstream": ["P1-10", "P1-8", "P2-5", "P1-7"]
    },
    {
      "id": "P1-12",
      "name": "Skill Engineering",
      "pillar": "P1",
      "pillar_name": "Pillar 1: Context Engineering (Inform)",
      "ep": "EP-12",
      "L1": "Finite attention demands active management",
      "L2": "Agent skills are modular, context-efficient, and tunable",
      "file": "framework/features/P1-12.md",
      "downstream": ["P1-4", "P1-2", "P1-3", "P1-7"]
    },

    {
      "id": "P2-1",
      "name": "Automated Linters",
      "pillar": "P2",
      "pillar_name": "Pillar 2: Architectural Constraints (Constrain)",
      "ep": "EP-15",
      "L1": "Mechanical enforcement over advisory guidance",
      "L2": "Zero style/type/structural violations reaching the main branch",
      "file": "framework/features/P2-01.md",
      "downstream": ["P3-3"]
    },
    {
      "id": "P2-2",
      "name": "Dependency Enforcement",
      "pillar": "P2",
      "pillar_name": "Pillar 2: Architectural Constraints (Constrain)",
      "ep": "EP-15",
      "L1": "Mechanical enforcement over advisory guidance",
      "L2": "Architectural boundaries mechanically enforced, not just documented",
      "file": "framework/features/P2-02.md",
      "downstream": ["P3-3"]
    },
    {
      "id": "P2-3",
      "name": "AI Auditors & Collaboration Channels",
      "pillar": "P2",
      "pillar_name": "Pillar 2: Architectural Constraints (Constrain)",
      "ep": "EP-16",
      "L1": "No author is their own best reviewer",
      "L2": "Every substantial output is independently reviewed before merging",
      "file": "framework/features/P2-03.md",
      "measurement_binding": "P2-3",
      "downstream": []
    },
    {
      "id": "P2-4",
      "name": "Bounded Autonomy & Access Control",
      "pillar": "P2",
      "pillar_name": "Pillar 2: Architectural Constraints (Constrain)",
      "ep": "EP-17",
      "L1": "Capabilities proportional to risk",
      "L2": "Agent capabilities are proportional to task risk at all times",
      "file": "framework/features/P2-04.md",
      "downstream": []
    },
    {
      "id": "P2-5",
      "name": "Upstream Intake Gate",
      "pillar": "P2",
      "pillar_name": "Pillar 2: Architectural Constraints (Constrain)",
      "ep": "EP-14",
      "L1": "Clarity before commitment",
      "L2": "No planning or execution proceeds on unrecorded requirements",
      "file": "framework/features/P2-05.md",
      "measurement_binding": "P2-5",
      "downstream": []
    },

    {
      "id": "P3-1",
      "name": "Scheduled Cleanups",
      "pillar": "P3",
      "pillar_name": "Pillar 3: Entropy Management (Maintain)",
      "ep": "EP-18",
      "L1": "Entropy requires scheduled countering",
      "L2": "Entropy never accumulates beyond one GC cycle",
      "file": "framework/features/P3-01.md",
      "measurement_binding": "P3-1",
      "downstream": []
    },
    {
      "id": "P3-2",
      "name": "Documentation Sync",
      "pillar": "P3",
      "pillar_name": "Pillar 3: Entropy Management (Maintain)",
      "ep": "EP-11",
      "L1": "If it's not in the repo, it doesn't exist",
      "L2": "Documentation always matches the current state of the code",
      "file": "framework/features/P3-02.md",
      "downstream": ["P3-4"]
    },
    {
      "id": "P3-3",
      "name": "Pattern Auditing",
      "pillar": "P3",
      "pillar_name": "Pillar 3: Entropy Management (Maintain)",
      "ep": "EP-18",
      "L1": "Entropy requires scheduled countering",
      "L2": "Coding patterns converge to canonical forms; no circular deps persist",
      "file": "framework/features/P3-03.md",
      "measurement_binding": "P3-3",
      "downstream": []
    },
    {
      "id": "P3-4",
      "name": "Consolidation Loop",
      "pillar": "P3",
      "pillar_name": "Pillar 3: Entropy Management (Maintain)",
      "ep": "EP-11",
      "L1": "If it's not in the repo, it doesn't exist",
      "L2": "Canonical governance documents auto-update when features land; redundant concepts are merged",
      "file": "framework/features/P3-04.md",
      "downstream": ["P1-1"]
    }
  ],
  "cross_cutting": [
    {
      "id": "reward-engineering",
      "name": "Reward Engineering",
      "file": "framework/cross-cutting/HE Reward Engineering.md"
    },
    {
      "id": "token-economics",
      "name": "Token Economics",
      "file": "framework/cross-cutting/HE Token Economics.md"
    },
    {
      "id": "sas-mas-readiness",
      "name": "SAS→MAS Readiness",
      "file": "framework/cross-cutting/HE SAS MAS Readiness.md"
    },
    {
      "id": "prevention-checklist",
      "name": "Prevention Checklist",
      "file": "framework/cross-cutting/HE Prevention Checklist.md"
    },
    {
      "id": "evaluation-dimensions",
      "name": "Evaluation Dimensions",
      "file": "framework/cross-cutting/HE Evaluation Dimensions.md"
    },
    {
      "id": "cross-cutting-perspectives",
      "name": "Cross-Cutting Perspectives",
      "file": "framework/cross-cutting/HE Cross Cutting Perspectives.md"
    }
  ]
}
```
