# Cascade Analysis

> **Source:** `framework/HE Design Decisions.md` (feature definitions), `framework/HE Principle Map.md` (EP-N mappings)

Use this lookup to determine a feature's **Impact Weight** (how many downstream systems rely on it) when calculating Priority Scores in `references/gap-scoring.md`.

## Feature Inter-dependencies

When a Foundation or Pillar feature breaks, calculate how many explicitly dependent features fail with it.

```json
[
  { "id": "P0-1",  "ep": "EP-1",  "name": "Bash Sandboxes",                    "downstream": ["P0-3", "P1-3", "P1-6"],                  "weight": 3 },
  { "id": "P0-2",  "ep": "EP-2",  "name": "Filesystem, Git & File Locking",    "downstream": ["P1-8", "P1-9", "P1-10", "P3-2", "P3-4"], "weight": 5 },
  { "id": "P0-3",  "ep": "EP-3",  "name": "Verification (Self & Collective)",  "downstream": ["P2-1", "P2-2"],                          "weight": 2 },
  { "id": "P0-4",  "ep": "EP-4",  "name": "Ralph Loops",                       "downstream": ["P1-9"],                                  "weight": 1 },
  { "id": "P0-5",  "ep": "EP-5",  "name": "Orchestration Logic",               "downstream": ["P2-3", "P0-6"],                          "weight": 2 },
  { "id": "P0-6",  "ep": "EP-6",  "name": "Rippable Middleware",                "downstream": ["P0-4"],                                  "weight": 1 },
  { "id": "P0-7",  "ep": "EP-7",  "name": "Escalation & Audit Trails",         "downstream": [],                                        "weight": 1 },
  { "id": "P0-8",  "ep": "EP-8",  "name": "Harness Versioning",                "downstream": [],                                        "weight": 1 },
  { "id": "P0-9",  "ep": "EP-9",  "name": "Smart Command Wrappers",            "downstream": ["P0-3", "P1-9"],                          "weight": 2 },
  { "id": "P0-10", "ep": "EP-5",  "name": "Inter-Agent Communication",         "downstream": ["P2-3"],                                  "weight": 1 },
  { "id": "P0-11", "ep": "EP-10", "name": "Portable Agent Surface",            "downstream": ["P1-1"],                                  "weight": 1 },
  { "id": "P1-1",  "ep": "EP-11", "name": "Repository as Truth",               "downstream": ["P2-2", "P2-3", "P1-8"],                  "weight": 3 },
  { "id": "P1-2",  "ep": "EP-12", "name": "Context Compaction",                "downstream": [],                                        "weight": 1 },
  { "id": "P1-3",  "ep": "EP-12", "name": "Tool Offloading",                   "downstream": [],                                        "weight": 1 },
  { "id": "P1-4",  "ep": "EP-12", "name": "Progressive Skills",                "downstream": [],                                        "weight": 1 },
  { "id": "P1-5",  "ep": "EP-8",  "name": "Observability / Dashboards",        "downstream": ["P0-8"],                                  "weight": 1 },
  { "id": "P1-6",  "ep": "EP-13", "name": "Web Search & MCP",                  "downstream": [],                                        "weight": 1 },
  { "id": "P1-7",  "ep": "EP-2",  "name": "Planning & Blackboards",            "downstream": ["P0-4", "P1-4"],                          "weight": 2 },
  { "id": "P1-8",  "ep": "EP-2",  "name": "Context Anchoring",                 "downstream": ["P1-7"],                                  "weight": 1 },
  { "id": "P1-9",  "ep": "EP-2",  "name": "Branch-Based Cognitive Memory",     "downstream": [],                                        "weight": 1 },
  { "id": "P1-10", "ep": "EP-11", "name": "Requirements Ledger",               "downstream": ["P2-5", "P1-7"],                          "weight": 2 },
  { "id": "P1-11", "ep": "EP-14", "name": "Socratic Questioning",              "downstream": ["P1-10", "P1-8", "P1-7"],                 "weight": 3 },
  { "id": "P1-12", "ep": "EP-12", "name": "Skill Engineering",                 "downstream": ["P1-4", "P1-2", "P1-3", "P1-7"],          "weight": 4 },
  { "id": "P2-1",  "ep": "EP-15", "name": "Automated Linters",                 "downstream": ["P3-3"],                                  "weight": 1 },
  { "id": "P2-2",  "ep": "EP-15", "name": "Dependency Enforcement",            "downstream": [],                                        "weight": 1 },
  { "id": "P2-3",  "ep": "EP-16", "name": "AI Auditors",                       "downstream": [],                                        "weight": 1 },
  { "id": "P2-4",  "ep": "EP-17", "name": "Bounded Autonomy",                  "downstream": ["P0-7"],                                  "weight": 1 },
  { "id": "P2-5",  "ep": "EP-14", "name": "Upstream Intake Gate",              "downstream": [],                                        "weight": 1 },
  { "id": "P3-1",  "ep": "EP-18", "name": "Scheduled Cleanups",                "downstream": [],                                        "weight": 1 },
  { "id": "P3-2",  "ep": "EP-19", "name": "Documentation Sync",                "downstream": [],                                        "weight": 1 },
  { "id": "P3-3",  "ep": "EP-18", "name": "Pattern Auditing",                  "downstream": [],                                        "weight": 1 },
  { "id": "P3-4",  "ep": "EP-19", "name": "Consolidation Loop",                "downstream": [],                                        "weight": 1 }
]
```

When calculating the final priority score, multiply `(5 - Composite Score) × Impact Weight × Cascade Length`.
