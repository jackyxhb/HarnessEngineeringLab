# Reward Engineering

> Cross-cutting concern that spans all pillars. Agent reward structures can be gamed. Preventing reward-hacking is essential for reliable autonomous execution.

## Prevention Items

- **`P0-7, P2-4` Prevent Performative Oversight:** You must prevent human-in-the-loop processes that create delay without adding genuine insight.
- **`P1-5` Prevent Vanity Metric Optimization:** You must prevent agents from optimizing for vanity metrics (e.g., lines of code, PRs merged) rather than actual quality outcomes.
- **`P0-3, P2-3` Prevent Success Criteria Gaming:** You must prevent agents from gaming their own success criteria (e.g., passing tests by weakening assertions).
- **`P0-5` Prevent Conflicting Reward Signals:** You must prevent reward signals that conflict with each other across agents, causing adversarial drift.
- **`P1-5` Prevent Unaudited Reward Correlation:** You must prevent reward-aligned outputs from going unaudited for correlation with real-world value.

## Chain Failure Mappings

| Prevention Item | Broken Principle | Failure Level |
| ----------------- | ----------------- | --------------- |
| Performative Oversight | EP-7 Traceability | L2 drift — oversight adds delay not insight |
| Vanity Metrics | EP-8 Measure for improvement | L2 drift — wrong metrics tracked |
| Success Gaming | EP-16 Review | L3 failure — weak assertion design |
| Conflicting Signals | EP-5 Bounded coordination | L3 failure — reward misalignment |
| Unaudited Correlation | EP-8 Measure for improvement | L4 omission — no value correlation audit |

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

## References

- `references/OpenAI-Harness-Engineering.md`
