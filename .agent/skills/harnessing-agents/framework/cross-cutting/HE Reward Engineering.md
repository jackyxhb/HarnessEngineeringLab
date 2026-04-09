# Reward Engineering

> Cross-cutting concern that spans all pillars. Agent reward structures can be gamed. Preventing reward-hacking is essential for reliable autonomous execution.

## L3: Design Decisions (P1-1 Alignment)

Reward engineering requires deterministic tracking of failure levels. Narrative mappings are replaced with machine-readable failure chains (L4 Prevention items).

## Chain Failure Mappings

```json
[
  { "prevention_item": "Performative Oversight", "broken_principle": "EP-7 Traceability", "failure_level": "L2 drift — oversight adds delay not insight" },
  { "prevention_item": "Vanity Metrics", "broken_principle": "EP-8 Measure for improvement", "failure_level": "L2 drift — wrong metrics tracked" },
  { "prevention_item": "Success Gaming", "broken_principle": "EP-16 Review", "failure_level": "L3 failure — weak assertion design" },
  { "prevention_item": "Conflicting Signals", "broken_principle": "EP-5 Bounded coordination", "failure_level": "L3 failure — reward misalignment" },
  { "prevention_item": "Unaudited Correlation", "broken_principle": "EP-8 Measure for improvement", "failure_level": "L4 omission — no value correlation audit" }
]
```

## Design Guidance

1. **Outcome-based rewards** — tie success metrics to actual quality, not activity proxies
2. **Adversarial testing** — periodically test whether reward criteria can be gamed
3. **Correlation audits** — regularly verify that rewarded outputs correlate with real-world value
4. **Multi-signal triangulation** — use multiple independent signals to prevent single-metric optimization

## Related Features

- [P0-3 Verification](../features/P0-03.md) — prevents success criteria gaming through robust test design
- [P0-7 Escalation Policies](../features/P0-07.md) — detects performative oversight patterns
- [P1-5 Observability](../features/P1-05.md) — provides metrics infrastructure for reward tracking
- [P2-3 AI Auditors](../features/P2-03.md) — independent review layer prevents self-gaming

Reward design only works when these features reinforce each other instead of optimizing a single proxy metric.
