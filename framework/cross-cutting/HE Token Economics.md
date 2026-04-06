# Token Economics

> Cross-cutting concern for managing the cost-effectiveness of agent operations. Token usage must scale sublinearly with task complexity.

## Core Principles

1. **Cost-aware orchestration** — choose topologies that minimize redundant token consumption
2. **Context efficiency** — keep context windows lean through compaction, offloading, and progressive skills
3. **Shift-left cost stratification** — run cheap checks first, expensive checks last
4. **Bounded concurrency** — avoid agent swarms for tasks a single agent can handle

## Cost Tiers

| Tier | Action Type | Example | Cost |
| ------ | ------------ | --------- | ------ |
| 1 | Pre-commit lint | `npm run smoke` | < 2s, ~0 tokens |
| 2 | Full quality gate | `npm run check` | < 30s, ~0 tokens |
| 3 | On-demand audit | `npm run audit` | < 60s, ~0 tokens |
| 4 | LLM-based review | Agent-as-reviewer | High token cost |

## Gap Signals

- Token costs scale linearly or quadratically with team size
- No visibility into per-task token consumption
- Agent swarms deployed for simple, single-session tasks
- No cost comparison between different harness configurations

## Related Features

- [P0-5 Orchestration Logic](../features/P0-05.md) — topology selection affects token usage
- [P0-9 Smart Command Wrappers](../features/P0-09.md) — shift-left cost stratification
- [P1-2 Context Compaction](../features/P1-02.md) — reduces per-session token consumption
- [P1-3 Tool Offloading](../features/P1-03.md) — prevents tool outputs from wasting tokens
- [P1-4 Progressive Skills](../features/P1-04.md) — loads only needed capabilities
- [P1-12 Skill Engineering](../features/P1-12.md) — modular skills reduce mandatory-read budgets
