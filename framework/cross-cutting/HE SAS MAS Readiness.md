# SAS→MAS Readiness

> Cross-cutting concern for scaling from Single-Agent Systems (SAS) to Multi-Agent Systems (MAS). Every feature has both SAS and MAS dimensions.

## Scaling Perspective

Each of the 32 features can be evaluated on a SAS→MAS readiness continuum:

| Feature | SAS Implementation | MAS Extension |
| --------- | ------------------- | --------------- |
| P0-1 Bash Sandboxes | Single isolated sandbox | Per-agent sandbox pool |
| P0-2 Filesystem & Git | Single branch | Per-agent worktrees, file locking |
| P0-3 Verification | Self-verification | Collective verification, consensus |
| P0-4 Ralph Loops | Single-agent reinjection | Cross-agent task handoff |
| P0-5 Orchestration | N/A (single agent) | Topology selection, routing |
| P0-10 Mailbox | N/A | Peer-to-peer, broadcast messaging |
| P1-1 Repository as Truth | Single-agent context | Shared context, consistency |
| P1-7 Planning | Personal task list | Shared blackboard, task claiming |
| P1-8 Anchoring | Personal anchor file | Shared anchor files |
| P2-3 AI Auditors | Self-review (limited) | Generator/evaluator separation |
| P2-4 Access Control | Flat permissions | Role-based tiered permissions |
| P3-1 Cleanups | Single-agent cleanup | Coordinated GC across agents |

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
