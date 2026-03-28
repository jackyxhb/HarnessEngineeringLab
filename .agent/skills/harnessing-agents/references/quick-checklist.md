# Quick-Start Evaluation Checklist

For teams that want a rapid gap scan without full dimension scoring. Check existing coverage. Each unchecked box maps to a Tier 1 improvement policy for that feature.

### Foundation — Can the agent execute safely?
- [ ] `F1` Bash Sandboxes: Agent runs in an isolated sandbox (not on developer's machine)
- [ ] `F2` Filesystem & Git: Agent's work is Git-tracked and rollback-able
- [ ] `F3` Self-Verification: Agent runs tests and reads its own error logs before completing
- [ ] `F4` Ralph Loops: Long tasks survive context window resets
- [ ] `F5` Orchestration: Agent can spawn sub-agents to hand off work seamlessly
- [ ] `F6` Rippable Middleware: Extraneous logic can be disabled cleanly
- [ ] `F7` Escalation: Stuck agents escalate to humans automatically
- [ ] `F8` Harness Versioning: Agent configurations, prompts, and tools are tracked in source control

### Pillar 1 (Inform) — Does the agent know what it needs to know?
- [ ] `P1-1` Repository as Truth: All project rules are in the repo, not in human heads
- [ ] `P1-2` Context Compaction: Context window doesn't suddenly degrade on long tasks
- [ ] `P1-3` Tool Offloading: Full tool output saves to disk, only passing token-efficient chunks
- [ ] `P1-4` Progressive Skills: Tools are loaded on-demand by subagents, not all-at-once
- [ ] `P1-5` Observability: Agent can access real-time CI/CD status natively
- [ ] `P1-6` Web Search/MCP: Search capabilities exist beyond model cutoffs natively
- [ ] `P1-7` Planning & State: Master task tracking occurs continuously
- [ ] `P1-8` Context Anchoring: Critical decisions are recorded to persistent memory files
- [ ] `P1-9` Branch-Based Memory: Objectives are decomposed into concurrent branches with commit memory

### Pillar 2 (Constrain) — Is the agent mechanically prevented from bad output?
- [ ] `P2-1` Automated Linters: Pre-commit hooks reject style and type violations mechanically
- [ ] `P2-2` Dependency Enforcement: Import boundaries are enforced by explicit CI verification checks
- [ ] `P2-3` AI Auditors: Secondary agent or process reviews the first agent's output natively
- [ ] `P2-4` Bounded Autonomy: Agent actions are bounded by explicit limits (e.g., human-in-the-loop)

### Pillar 3 (Maintain) — Does the system clean up after itself?
- [ ] `P3-1` Scheduled Cleanups: Automated sweeps run on a schedule to fight entropy
- [ ] `P3-2` Documentation Sync: Documentation is validated against code passively
- [ ] `P3-3` Pattern Auditing: Dead code and circular dependencies are detected automatically
- [ ] `P3-4` Consolidation Loop: Core system meta-docs stay synced without prompting
