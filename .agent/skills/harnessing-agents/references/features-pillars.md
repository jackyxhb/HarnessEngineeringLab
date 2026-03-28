# Core Features: Pillars 1-3

These features form the cognitive and structural environment on top of the foundation.

## Pillar 1: Context Engineering (Inform)

### P1-1. Repository as Truth
* **Guideline:** Encoding all project rules directly into the codebase.
* **Expectations:** Maintain `AGENTS.md`, `.cursorrules`, and architectural design docs inside the repo.
* **Remediation:**
  * [Tier 1] Create base context files in the root folder.
  * [Tier 2] Cross-link design docs for discoverability.

### P1-2. Context Compaction
* **Guideline:** Summarizing older context to prevent the context window from filling up with noise.
* **Expectations:** Keep short-term memory lean; actively summarize history at intervals.
* **Remediation:**
  * [Tier 1] Implement conversation history summarization.
  * [Tier 2] Separate short/long-term memory stores.

### P1-3. Tool Offloading
* **Guideline:** Keeping ONLY contextual insights in memory, whilst storing full raw output to disk.
* **Expectations:** Offload unedited tool logs to the filesystem.
* **Remediation:**
  * [Tier 1] Strip outputs (head/tail tokens) and save full results to filesystem.

### P1-4. Progressive Skills
* **Guideline:** Loading specific tool logic into context via progressive disclosure only when required.
* **Expectations:** Load relevant skill front-matter ONLY when assigned tasks require that role.
* **Remediation:**
  * [Tier 1] Organize tools into role-based skill modules handled dynamically.

### P1-5. Observability / Dashboards
* **Guideline:** Dynamic Context showing real-time CI/CD pipeline statuses, application logs, and metrics.
* **Expectations:** Expose raw status indicators to the runtime context.
* **Remediation:**
  * [Tier 1] Expose logs and metrics to the runtime context. Focus on traces.

### P1-6. Web Search & MCP Integration
* **Guideline:** Leveraging search/MCP servers for real-time information outside model knowledge cut-offs.
* **Expectations:** Connect web capabilities with caching to prevent token waste.
* **Remediation:**
  * [Tier 1] Provide a Web Search tool and MCP. Add caching layer.

### P1-7. Planning & State Files
* **Guideline:** Filesystem tracking to persist task decomposition across sessions and coordinate MAS teammates.
* **Expectations:** Centralized Blackboards or JSON state files to decompose massive goals.
* **Remediation:**
  * [Tier 1] Define and trace task plans on disk strictly.

### P1-8. Context Anchoring
* **Guideline:** Syncing critical decision points, strategy, and reasoning to persistent memory files.
* **Expectations:** Record what, why, target, background to structured anchor records at major decision points.
* **Remediation:**
  * [Tier 1] Create memory anchor files with structured records for re-injection later.

### P1-9. Branch-Based Cognitive Memory
* **Guideline:** Using Git branches and clear commit structures as cognitive milestones when breaking down tasks.
* **Expectations:** Decompose massive objectives concurrently and use branches as memory bounds.
* **Remediation:**
  * [Tier 1] Require agents to spawn branches for multi-prompt sub-tasks.

## Pillar 2: Architectural Constraints (Constrain)

### P2-1. Automated Linters
* **Guideline:** Pre-commit hooks mechanically rejecting non-compliant code.
* **Expectations:** Linter output must contain clear remediation guidance.
* **Remediation:**
  * [Tier 1] Add blocking hooks for format/lint checks.

### P2-2. Dependency Enforcement
* **Guideline:** Structurally testing imports to physically enforce architecture.
* **Expectations:** Use deterministic structural tests instead of verbal PR instructions.
* **Remediation:**
  * [Tier 1] Fail CI pipelines automatically for layer boundary violations.

### P2-3. AI Auditors
* **Guideline:** Secondary LLMs for PR generation and compliance review in assembly lines.
* **Expectations:** Adversarial debate and coopetition rather than self-scoring.
* **Remediation:**
  * [Tier 1] Deploy secondary LLMs for QA validation prior to merge.

### P2-4. Bounded Autonomy & Access Control
* **Guideline:** Real-time guardrails and network isolation limiting agent actions in wider networks.
* **Expectations:** High-risk functions trigger manual human escalation loops.
* **Remediation:**
  * [Tier 1] Apply least-privilege principles universally.

## Pillar 3: Entropy Management (Maintain)

### P3-1. Scheduled Cleanups
* **Guideline:** Garbage Collection agents resolving technical debt passively.
* **Expectations:** Configure sweepers to find dead code, duplicate imports, and unused logic.
* **Remediation:**
  * [Tier 1] Schedule weekly sweeps targeting dead code and stale branches.

### P3-2. Documentation Sync
* **Guideline:** Maintaining consistency between documentation and the living codebase.
* **Expectations:** Agents perform passive synchronization upon project merges.
* **Remediation:**
  * [Tier 1] CI checks marking docs older than related source file changes.

### P3-3. Pattern Auditing
* **Guideline:** System sweeps tracking architectural drift to verify patterns stay consistent.
* **Expectations:** Keep a pattern registry, sweeping project surfaces for compliance.
* **Remediation:**
  * [Tier 1] Run static analysis tools scanning for known circular patterns.

### P3-4. Consolidation Loop
* **Guideline:** Updating core instructions (CLAUDE.md) alongside the repository knowledge tree.
* **Expectations:** Automatically draft ADRs on core architectural updates, recording changelogs.
* **Remediation:**
  * [Tier 1] Automate base system count and knowledge tree updates.
