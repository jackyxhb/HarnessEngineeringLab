# Feature Chain: Pillars 2-3 — Constraints & Entropy
Assessment chain: **What to Do** → **Don't Do** → **Options**. See also: `features-foundation.md` (P0) · `features-pillar1.md` (P1).

## Pillar 2: Architectural Constraints (Constrain)

### P2-1. Automated Linters

#### What to Do
Deterministic rules and pre-commit hooks that automatically flag and reject non-compliant code so the agent doesn't waste tokens exploring dead ends.

#### Don't Do
_(No direct prevention entry — P2-1 is a mechanical enforcement tool. Its absence means agents waste tokens producing non-compliant code that must be rewritten.)_

#### Options
- **Action:** Mechanically enforce what good code looks like to save tokens and prevent dead-end exploration.
- **Tool:** Custom deterministic linters.
- **Tool:** Pre-commit hooks that automatically flag and reject non-compliant code before it enters the repository.

#### Remediation Tiers
- [Tier 1] Add blocking hooks for format/lint checks.

---

### P2-2. Dependency Enforcement

#### What to Do
Structural tests that mechanically restrict which architectural layers the agent can import from or modify. Use deterministic structural tests instead of verbal PR instructions.

#### Don't Do
_(No direct prevention entry — P2-2 is a mechanical enforcement tool. Its absence means agents freely violate layer boundaries with no automated feedback.)_

#### Options
- **Action:** Mechanically restrict which architectural layers an agent can import from or modify.
- **Tool:** Structural testing frameworks (e.g., ArchUnit).

#### Remediation Tiers
- [Tier 1] Fail CI pipelines automatically for layer boundary violations.

---

### P2-3. AI Auditors & Collaboration Channels

#### What to Do
Deploying secondary LLM-based agents to review the primary agent's output for compliance and security. In MAS, moves beyond simple cooperative review to include Competition (adversarial debate) and Coopetition (negotiating and compromising). Designing agents to actively challenge each other prevents anchoring bias.

#### Don't Do
**Prevent Evaluation Overfitting:** You must prevent the system from overfitting to static benchmarks. Utilize dynamic benchmarking and "Agent-as-a-Judge" frameworks to continuously create challenging, evolving evaluation instances.

**Prevent Agent Gaming (Cross-Cutting):** Don't allow agents to game their own success criteria (e.g., passing tests by weakening assertions).

#### Options
- **Action:** Deploy secondary LLM-based agents to review the primary agent's output for compliance and security.
- **Action:** Structure interactions to actively prevent anchoring bias.
- **Tool:** Cooperative channels (assembly line review).
- **Tool:** Competitive channels (adversarial debate/competing hypotheses to find root causes).
- **Tool:** Coopetition channels (negotiating and compromising).

#### Remediation Tiers
- [Tier 1] Deploy secondary LLMs for QA validation prior to merge.

---

### P2-4. Bounded Autonomy & Access Control

#### What to Do
Defining explicit scope boundaries and access controls for how far an agent can go without human escalation, preventing unconstrained autonomous drift. In MAS, enforcing real-time guardrails and strict permissions so a compromised agent cannot expose restricted data or hijack peers.

#### Don't Do
**Prevent Prompt Injections and Data Leakage:** You must prevent malicious inputs from manipulating agent instructions to steal API keys or expose PII. Prevent this using real-time guardrails and bounded autonomy.

**Prevent Malicious Emergent Behaviors:** In autonomous swarms, you must prevent agents from executing "bot muggings," planting logic bombs, or deploying cryptographic evasion. Requires strict access controls and continuous monitoring.

**Prevent Anthropomorphization and Over-Reliance:** You must prevent users from placing undue trust in agents by treating them as human entities, which obscures actual technical limits.

#### Options
- **Action:** Limit agent actions to prevent prompt injection and data exfiltration across the network.
- **Action:** Block malicious queries before they reach downstream agents.
- **Tool:** Real-time guardrails and network isolation.
- **Tool:** Risk-based boundaries (e.g., requiring human approval for financial transactions or system modifications).

#### Remediation Tiers
- [Tier 1] Apply least-privilege principles universally.

---

### P2-5. Upstream Intake Gate

#### What to Do
Mechanically enforcing that all requirement-like artifacts (user stories, functional scenarios, feature requests) are captured in the Requirements Ledger before planning and execution proceed. In MAS, a swarm-wide constraint ensuring all agents check the shared Requirements Ledger before claiming work.

#### Don't Do
**Prevent Unregistered Work:** You must prevent agents from starting planning or execution on requirements that have not been formally captured in the Requirements Ledger. Prevent this by implementing an Upstream Intake Gate that validates ledger entries exist before workflows proceed.

#### Options
- **Action:** Enforce a mandatory validation step before any planning or execution workflow: verify the requirement is recorded in the Requirements Ledger (P1-10).
- **Action:** If an agent discovers an implicit requirement mid-task, pause and sync it to the ledger before continuing.
- **Tool:** Ledger-check steps in planning workflows and meta-docs.
- **Tool:** Pre-commit hooks or workflow gates that reject plans without matching ledger entries.

#### Remediation Tiers
- [Tier 1] Add a mandatory ledger-check step to all planning workflows.
- [Tier 2] Implement workflow gates that reject plans without matching ledger entries.

---

## Pillar 3: Entropy Management (Maintain)

### P3-1. Scheduled Cleanups

#### What to Do
Dedicated cleanup agents running on daily or weekly schedules to catch code that slipped past earlier checks. In MAS, also reconcile overlapping or conflicting code changes made by concurrent agent teams.

#### Don't Do
**Prevent Codebase Entropy:** You must prevent the natural accumulation of dead code, documentation drift, and circular dependencies generated by AI. Prevent this by deploying scheduled cleanup agents (garbage collection).

#### Options
- **Action:** Catch constraint violations and reconcile overlapping or conflicting code changes from concurrent agent teams.
- **Tool:** Dedicated background cleanup agents running on specific daily/weekly schedules or via event-based triggers.

#### Remediation Tiers
- [Tier 1] Schedule weekly sweeps targeting dead code and stale branches.

---

### P3-2. Documentation Sync

#### What to Do
Agents that actively verify and update project documentation so it matches the current, living state of the code.

#### Don't Do
**Prevent Documentation Disconnects:** (shared with P3-4) You must prevent core system counts and architectural records from drifting out of sync. Documentation must match the living code.

#### Options
- **Action:** Prevent documentation drift by actively verifying that READMEs and API docs match the living state of the code.
- **Tool:** Dedicated documentation consistency agents.

#### Remediation Tiers
- [Tier 1] CI checks marking docs older than related source file changes.

---

### P3-3. Pattern Auditing

#### What to Do
Agents that track and resolve circular dependencies, dead code, or deviations from established coding patterns. System sweeps to ensure long-term codebase health as AI generates high volumes of code.

#### Don't Do
**Prevent Codebase Entropy:** (shared with P3-1) Dead code, circular dependencies, and pattern deviations accumulate as AI generates high volumes of code. Prevent this with automated pattern enforcement.

#### Options
- **Action:** Run system sweeps to ensure long-term codebase health as AI generates high volumes of code.
- **Tool:** Pattern enforcement and dependency auditing agents configured to hunt down dead code and circular dependencies.

#### Remediation Tiers
- [Tier 1] Run static analysis tools scanning for known circular patterns.

---

### P3-4. Consolidation Loop

#### What to Do
Agents that auto-update core system counts, track issue history, maintain changelogs, and prompt for ADRs to keep central knowledge synchronized with the codebase. In MAS, a full pipeline auto-updating CLAUDE.md, configs, and changelogs as features land.

#### Don't Do
**Prevent Documentation Disconnects:** You must prevent core system counts and architectural records from drifting out of sync. Implement a "Consolidation Loop" that auto-updates CLAUDE.md, prompts for ADRs on new patterns, accumulates changelogs, and updates configs as features land.

#### Options
- **Action:** Auto-update core documentation (e.g., CLAUDE.md system counts), accumulate changelogs, update config files, and track issue history as features land.
- **Action:** Prompt for Architectural Decision Record (ADR) creation when new architectural patterns are introduced.
- **Tool:** Automated consolidation pipelines and background documentation agents.

#### Remediation Tiers
- [Tier 1] Automate base system count and knowledge tree updates.
