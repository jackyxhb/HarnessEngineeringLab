# Quick-Start Evaluation Checklist

For teams that want a rapid gap scan without full dimension scoring. Check existing coverage. Each unchecked box maps to a Tier 1 improvement policy for that feature.

### Foundation — Can the agent execute safely?
- [ ] `P0-1` Bash Sandboxes: Agent runs in an isolated sandbox (not on developer's machine)
- [ ] `P0-2` Filesystem & Git: Agent's work is Git-tracked and rollback-able
- [ ] `P0-3` Verification (Self & Collective): Agent runs tests and reads its own error logs before completing
- [ ] `P0-4` Ralph Loops: Long tasks survive context window resets
- [ ] `P0-5` Orchestration: Agent can spawn sub-agents to hand off work seamlessly
- [ ] `P0-6` Rippable Middleware: Extraneous logic can be disabled cleanly
- [ ] `P0-7` Escalation Policies & Audit Trails: Stuck agents escalate to humans automatically
- [ ] `P0-8` Harness Versioning: Agent configurations, prompts, and tools are tracked in source control
- [ ] `P0-9` Smart Command Wrappers: Common tasks are executed via intelligent wrappers (ccp, ccpr, reconcile)
- [ ] `P0-10` Inter-Agent Communication: Agents communicate via a dedicated messaging bus (P2P, broadcast, idle notifications)

### Pillar 1 (Inform) — Does the agent know what it needs to know?
- [ ] `P1-1` Repository as Truth: All project rules are in the repo, not in human heads
- [ ] `P1-2` Context Compaction & Memory Management: Context window doesn't suddenly degrade on long tasks
- [ ] `P1-3` Tool Offloading: Full tool output saves to disk, only passing token-efficient chunks
- [ ] `P1-4` Progressive Skills: Tools are loaded on-demand by subagents, not all-at-once
- [ ] `P1-5` Observability: Agent can access real-time CI/CD status natively
- [ ] `P1-6` Web Search/MCP: Search capabilities exist beyond model cutoffs natively
- [ ] `P1-7` Planning, Task Lists & Blackboards: Master task tracking occurs continuously
- [ ] `P1-8` Context Anchoring: Critical decisions are recorded to persistent memory files
- [ ] `P1-9` Branch-Based Memory: Objectives are decomposed into concurrent branches with commit memory
- [ ] `P1-10` Requirements Ledger: All user stories and requirements are recorded in a unified ledger before planning
- [ ] `P1-11` Socratic Questioning: All unclear inputs are interrogated via structured Socratic questioning before planning or execution begins

### Pillar 2 (Constrain) — Is the agent mechanically prevented from bad output?
- [ ] `P2-1` Automated Linters: Pre-commit hooks reject style and type violations mechanically
- [ ] `P2-2` Dependency Enforcement: Import boundaries are enforced by explicit CI verification checks
- [ ] `P2-3` AI Auditors & Collaboration Channels: Secondary agent or process reviews the first agent's output natively
- [ ] `P2-4` Bounded Autonomy & Access Control: Agent actions are bounded by explicit limits (e.g., human-in-the-loop)
- [ ] `P2-5` Upstream Intake Gate: Requirements are validated in the ledger before planning proceeds

### Pillar 3 (Maintain) — Does the system clean up after itself?
- [ ] `P3-1` Scheduled Cleanups: Automated sweeps run on a schedule to fight entropy
- [ ] `P3-2` Documentation Sync: Documentation is validated against code passively
- [ ] `P3-3` Pattern Auditing: Dead code and circular dependencies are detected automatically
- [ ] `P3-4` Consolidation Loop: Core system meta-docs stay synced without prompting
