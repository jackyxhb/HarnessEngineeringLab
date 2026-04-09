# Token Economics

> Cross-cutting concern for managing the cost-effectiveness of agent operations. Token usage must scale sublinearly with task complexity.

## L3: Design Decisions (P1-1 Alignment)

Token economics are managed through a structured manifest of cost tiers. This allows agents to choose the most cost-effective operation for any given task priority.

## Cost Tiers Manifest

```json
[
  { "tier": 1, "action_type": "Pre-commit lint", "example": "npm run smoke", "latency": "< 2s",  "cost": "~0 tokens" },
  { "tier": 2, "action_type": "Full quality gate", "example": "npm run check", "latency": "< 30s", "cost": "~0 tokens" },
  { "tier": 3, "action_type": "On-demand audit",   "example": "npm run audit", "latency": "< 60s", "cost": "~0 tokens" },
  { "tier": 4, "action_type": "LLM-based review",  "example": "Agent-as-reviewer", "latency": "Variable", "cost": "High token cost" }
]
```

## Gap Signals (Economic)

```json
[
  { "signal": "Linear scaling", "description": "Token costs scale linearly or quadratically with team/task size" },
  { "signal": "Opaque consumption", "description": "No visibility into per-task token consumption" },
  { "signal": "Swarm over-deployment", "description": "Agent swarms deployed for simple, single-session tasks" },
  { "signal": "Blind configuration", "description": "No cost comparison between different harness configurations" }
]
```

## Related Features

- [P0-5 Orchestration Logic](../features/P0-05.md) — topology selection affects token usage
- [P0-9 Smart Command Wrappers](../features/P0-09.md) — shift-left cost stratification
- [P1-2 Context Compaction](../features/P1-02.md) — reduces per-session token consumption
- [P1-3 Tool Offloading](../features/P1-03.md) — prevents tool outputs from wasting tokens
- [P1-4 Progressive Skills](../features/P1-04.md) — loads only needed capabilities
- [P1-12 Skill Engineering](../features/P1-12.md) — modular skills reduce mandatory-read budgets
