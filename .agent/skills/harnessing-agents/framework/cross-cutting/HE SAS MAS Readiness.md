# SAS→MAS Readiness

> Cross-cutting concern for scaling from Single-Agent Systems (SAS) to Multi-Agent Systems (MAS). Every feature has both SAS and MAS dimensions.

## L3: Design Decisions (P1-1 Alignment)

Scaling readiness is evaluated using a machine-readable matrix. This allows agents to automatically determine whether they can operate in parallel based on the project's current feature harness level.

## Scaling Perspective Matrix

```json
[
  { "feature": "P0-1 Bash Sandboxes",      "SAS_implementation": "Single isolated sandbox",      "MAS_extension": "Per-agent sandbox pool" },
  { "feature": "P0-2 Filesystem & Git",    "SAS_implementation": "Single branch",                "MAS_extension": "Per-agent worktrees, file locking" },
  { "feature": "P0-3 Verification",        "SAS_implementation": "Self-verification",            "MAS_extension": "Collective verification, consensus" },
  { "feature": "P0-4 Ralph Loops",         "SAS_implementation": "Single-agent reinjection",     "MAS_extension": "Cross-agent task handoff" },
  { "feature": "P0-5 Orchestration",      "SAS_implementation": "N/A (single agent)",           "MAS_extension": "Topology selection, routing" },
  { "feature": "P0-10 Mailbox",            "SAS_implementation": "N/A",                          "MAS_extension": "Peer-to-peer, broadcast messaging" },
  { "feature": "P1-1 Repository as Truth", "SAS_implementation": "Single-agent context",         "MAS_extension": "Shared context, consistency" },
  { "feature": "P1-7 Planning",            "SAS_implementation": "Personal task list",          "MAS_extension": "Shared blackboard, task claiming" },
  { "feature": "P1-8 Anchoring",           "SAS_implementation": "Personal anchor file",        "MAS_extension": "Shared anchor files" },
  { "feature": "P2-3 AI Auditors",         "SAS_implementation": "Self-review (limited)",        "MAS_extension": "Generator/evaluator separation" },
  { "feature": "P2-4 Access Control",      "SAS_implementation": "Flat permissions",             "MAS_extension": "Role-based tiered permissions" },
  { "feature": "P3-1 Cleanups",            "SAS_implementation": "Single-agent cleanup",         "MAS_extension": "Coordinated GC across agents" }
]
```

## Readiness Assessment Questions

1. Can multiple agents operate on the same codebase without file conflicts?
2. Is there a coordination mechanism beyond shared filesystem?
3. Can tasks be decomposed and distributed to specialized agents?
4. Do verification protocols support consensus across agents?
5. Are permissions differentiated by agent role and task risk?

## Related Features

- [P0-5 Orchestration Logic](../features/P0-05.md) — core MAS coordination
- [P0-10 Inter-Agent Communication](../features/P0-10.md) — MAS messaging
- [P0-2 Filesystem, Git & File Locking](../features/P0-02.md) — MAS conflict prevention
