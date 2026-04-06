# Prevention Checklist

> Cross-cutting concern: comprehensive checklist of all prevention items across the framework. Each prevention maps to a broken link in the Principle-to-Practice Chain.

## Prevention-to-Chain Mappings

```json
[
  { "prevention_item": "P0-2 State & File Conflicts",      "broken_principle": "EP-2 Persistence",              "failure_level": "L4 omission — locking actions not taken" },
  { "prevention_item": "P0-3 Cascading Hallucinations",    "broken_principle": "EP-3 Verify before completion",  "failure_level": "L4 omission — no verification protocol" },
  { "prevention_item": "P0-4 Premature Exits",             "broken_principle": "EP-4 Tasks must be completed",   "failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P0-5 Quadratic Overhead",          "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L3 failure — wrong topology choice" },
  { "prevention_item": "P0-5 Supervisor Bottlenecks",      "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L3 failure — wrong orchestration pattern" },
  { "prevention_item": "P0-9 Manual CLI Execution",        "broken_principle": "EP-9 Standard operations",       "failure_level": "L4 omission — wrappers not used" },
  { "prevention_item": "P0-11 IDE-Locked Rules",           "broken_principle": "EP-10 Portability",              "failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P1-1 Human-Only Docs",             "broken_principle": "EP-11 Repo as truth",            "failure_level": "L1 violation — knowledge outside repo" },
  { "prevention_item": "P1-1 Human-Only Format",           "broken_principle": "EP-11 Repo as truth",            "failure_level": "L3 failure — wrong documentation format" },
  { "prevention_item": "P1-2,3 Context Rot",               "broken_principle": "EP-12 Finite attention",         "failure_level": "L4 omission — compaction not active" },
  { "prevention_item": "P1-7,8 Attention Drift",           "broken_principle": "EP-2 Persistence",               "failure_level": "L4 omission — no anchoring actions" },
  { "prevention_item": "P1-1,7 Inconsistent Context",      "broken_principle": "EP-11 Repo as truth",            "failure_level": "L3 failure — no single shared source" },
  { "prevention_item": "P1-10 Unrecorded Requirements",    "broken_principle": "EP-14 Clarity before commitment","failure_level": "L4 omission — ledger not maintained" },
  { "prevention_item": "P1-11 Ambiguous Inputs",           "broken_principle": "EP-14 Clarity before commitment","failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P1-12 Monolithic Skills",          "broken_principle": "EP-12 Finite attention",         "failure_level": "L4 omission — skill not modularized" },
  { "prevention_item": "P2-1 Unenforced Rules",            "broken_principle": "EP-15 Mechanical enforcement",   "failure_level": "L4 omission — no sensor for guide" },
  { "prevention_item": "P2-4 Prompt Injections",           "broken_principle": "EP-17 Capabilities ∝ risk",      "failure_level": "L4 omission — guardrails not deployed" },
  { "prevention_item": "P2-4 Emergent Behaviors",          "broken_principle": "EP-17 Capabilities ∝ risk",      "failure_level": "L3 failure — access controls insufficient" },
  { "prevention_item": "P0-7 Opaque Decisions",            "broken_principle": "EP-7 Traceability",              "failure_level": "L4 omission — audit trails not wired" },
  { "prevention_item": "P2-4 Anthropomorphization",        "broken_principle": "EP-17 Capabilities ∝ risk",      "failure_level": "L2 drift — outcome not tracked" },
  { "prevention_item": "P2-5 Unregistered Work",           "broken_principle": "EP-14 Clarity before commitment","failure_level": "L4 omission — intake gate missing" },
  { "prevention_item": "P0-6 Over-Engineering",            "broken_principle": "EP-6 Scaffolding temporary",     "failure_level": "L1 violation — principle directly broken" },
  { "prevention_item": "P3-1,3 Codebase Entropy",          "broken_principle": "EP-18 Entropy countering",       "failure_level": "L4 omission — GC not scheduled" },
  { "prevention_item": "P0-5 Runaway Costs",               "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L2 drift — cost/benefit not measured" },
  { "prevention_item": "P2-3 Evaluation Overfitting",      "broken_principle": "EP-16 Not own reviewer",         "failure_level": "L3 failure — static benchmarks only" },
  { "prevention_item": "P3-2,4 Doc Disconnects",           "broken_principle": "EP-19 Docs with code",           "failure_level": "L4 omission — sync not automated" },
  { "prevention_item": "Reward: Performative Oversight",    "broken_principle": "EP-7 Traceability",              "failure_level": "L2 drift — oversight adds delay not insight" },
  { "prevention_item": "Reward: Vanity Metrics",           "broken_principle": "EP-8 Measure for improvement",   "failure_level": "L2 drift — wrong metrics tracked" },
  { "prevention_item": "Reward: Success Gaming",           "broken_principle": "EP-16 Review",                   "failure_level": "L3 failure — weak assertion design" },
  { "prevention_item": "Reward: Conflicting Signals",      "broken_principle": "EP-5 Bounded coordination",      "failure_level": "L3 failure — reward misalignment" },
  { "prevention_item": "Reward: Unaudited Correlation",    "broken_principle": "EP-8 Measure for improvement",   "failure_level": "L4 omission — no value correlation audit" }
]
```

## Failure Level Classification

- **L1 violation:** Principle directly broken — most severe
- **L2 drift:** Outcome not tracked or wrong metrics — insidious, hard to detect
- **L3 failure:** Wrong design decision — incorrect topology, format, or controls
- **L4 omission:** Concrete action not taken — most common, fixable by implementing the action

## Usage

This checklist is used during the **Inspect** phase of harness audits. For each prevention item, verify that the corresponding feature's L4 actions are implemented.
