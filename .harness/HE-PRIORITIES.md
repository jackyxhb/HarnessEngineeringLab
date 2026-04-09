# HE-PRIORITIES.md

## Gap Scoring Results

Scored the identified gaps across 6 evaluation dimensions (Maturity, Effectiveness, Risk, Cost, Scalability, Human Role) using the rubric from `references/he-scoring.md`.

### Individual Feature Scores

#### P0-4 Ralph Loops
- **Maturity:** 2 (Basic - partially implemented in workflows)
- **Effectiveness:** 2 (Not fully achieving 100% completion)
- **Risk:** 3 (Prevents some premature exits)
- **Cost:** 2 (Moderate implementation cost)
- **Scalability:** 3 (Scales for decomposed tasks)
- **Human Role:** 3 (Human monitors long tasks)
- **Composite Score:** 2.5
- **Impact Weight:** 1 (0 downstream dependencies)
- **Cascade Length:** 2 (Moderate failure propagation)
- **Priority Score:** 5.0

#### P1-5 Observability / Dashboards
- **Maturity:** 2 (Basic logging and audits exist)
- **Effectiveness:** 2 (Partial visibility, no real-time dashboards)
- **Risk:** 2 (Some blind execution occurs)
- **Cost:** 3 (Higher cost for dashboard implementation)
- **Scalability:** 2 (Limited to current workflows)
- **Human Role:** 2 (Increased human review burden)
- **Composite Score:** 2.17
- **Impact Weight:** 2 (2 downstream dependencies: P0-7, P0-8)
- **Cascade Length:** 2 (Important for system health)
- **Priority Score:** 11.32

#### P3-1 Scheduled Cleanups
- **Maturity:** 1 (Ad-hoc manual cleanups)
- **Effectiveness:** 1 (Entropy accumulates without schedule)
- **Risk:** 2 (Codebase quality degrades over time)
- **Cost:** 1 (Low implementation cost)
- **Scalability:** 2 (Manual process doesn't scale)
- **Human Role:** 4 (Human performs cleanups)
- **Composite Score:** 1.83
- **Impact Weight:** 1 (0 downstream dependencies)
- **Cascade Length:** 1 (Localized entropy issues)
- **Priority Score:** 3.17

## Execution Tiers

Based on priority scores and the tier definitions:

- **Tier 1 (Critical - Immediate):** P1-5 Observability / Dashboards (Priority: 11.32)
- **Tier 2 (Important - Mid-term):** P0-4 Ralph Loops (Priority: 5.0)
- **Tier 3 (Enhancement - Long-term):** P3-1 Scheduled Cleanups (Priority: 3.17)

## Cross-Cutting Perspectives

Applied systemic perspectives from `framework/cross-cutting/HE Cross Cutting Perspectives.md`:

1. **Human Role Optimization:** Human is bottleneck for reviews and cleanups; agents need more autonomy in observability and task completion.
2. **SAS→MAS Readiness:** Good for MAS, but observability gaps limit multi-agent coordination visibility.
3. **Agent Legibility:** Codebase is legible, but lack of automated signals makes agent understanding harder.
4. **Entropy Trajectory:** Entropy is managed manually but trends toward accumulation without scheduling.

These perspectives amplify the P1-5 gap as Tier 1 due to systemic observability weaknesses.
