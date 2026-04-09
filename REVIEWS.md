# HELab Reviews

Canonical machine-readable review ledger for HELab's review-required surfaces.

- **Purpose:** Provide the self-hosted audit trail required by P2-3 generator/evaluator separation.
- **Approving identities must differ:** `generator` and `reviewer` cannot be the same string.
- **Scope rule:** Every approving record must list the reviewed files or directories in `scope_paths`.
- **Required by gate:** If a review-required surface changes, update this file before merge.

```json
{
  "reviews": [
    {
      "id": "HE-REV-2026-04-09-001",
      "date": "2026-04-09",
      "status": "request-changes",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R007"],
      "scope_paths": [
        "AGENTS.md",
        "ANCHORS.md",
        "PLANS.md",
        "README.md",
        "RELEASES.md",
        "REQUIREMENTS.md",
        "REVIEWS.md",
        "scripts/harness/audit.sh",
        "scripts/he-lint.js"
      ],
      "change_summary": "Initial review of the P2-3 independent-review gate implementation before approval.",
      "findings": [
        {
          "severity": "critical",
          "path": "scripts/he-lint.js",
          "summary": "git change detection did not explicitly cover staged changes during review gating.",
          "status": "fixed"
        },
        {
          "severity": "moderate",
          "path": "scripts/he-lint.js",
          "summary": "scope_paths validation did not reject malformed directory entries without trailing slashes.",
          "status": "fixed"
        }
      ]
    },
    {
      "id": "HE-REV-2026-04-09-002",
      "date": "2026-04-09",
      "status": "approved-with-findings",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R007"],
      "scope_paths": [
        "AGENTS.md",
        "ANCHORS.md",
        "PLANS.md",
        "README.md",
        "RELEASES.md",
        "REQUIREMENTS.md",
        "REVIEWS.md",
        "scripts/harness/audit.sh",
        "scripts/he-lint.js"
      ],
      "change_summary": "Second-pass approval for the P2-3 independent-review gate after staged-change detection and scope-path validation were fixed.",
      "findings": [
        {
          "severity": "info",
          "path": "REVIEWS.md",
          "summary": "Approval requires a second review record rather than reusing the original request-changes entry.",
          "status": "accepted"
        }
      ]
    },
    {
      "id": "HE-REV-2026-04-09-003",
      "date": "2026-04-09",
      "status": "request-changes",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        "AGENTS.md",
        "ANCHORS.md",
        "PLANS.md",
        "README.md",
        "RELEASES.md",
        "REQUIREMENTS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Initial independent review of the mission codification that makes target-project delivery effectiveness the repository's primary success criterion.",
      "findings": [
        {
          "severity": "critical",
          "path": "REVIEWS.md",
          "summary": "Review-required surfaces changed without a corresponding review record for the mission-codification patch.",
          "status": "fixed"
        },
        {
          "severity": "medium",
          "path": "PLANS.md",
          "summary": "The active plan cited HE-R001 and HE-R002 instead of the newly added HE-R008 requirement.",
          "status": "fixed"
        }
      ]
    },
    {
      "id": "HE-REV-2026-04-09-004",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        "AGENTS.md",
        "ANCHORS.md",
        "PLANS.md",
        "README.md",
        "RELEASES.md",
        "REQUIREMENTS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Second-pass approval of the mission codification that makes target-project delivery effectiveness the primary repository success criterion.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-005",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R002", "HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/",
        "framework/HE Harnessing Protocol.md",
        "README.md",
        "RELEASES.md",
        "PLANS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the skill-side P2-3 target-project delivery patch that adds a reusable review-ledger template, a target-project remediation reference, and explicit execution guidance for mounting the review gate in external repositories.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-006",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R004", "HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        ".agent/skills/harnessing-agents/references/he-full-audit.md",
        ".agent/skills/harnessing-agents/references/he-subagent-prompts.md",
        "README.md",
        "RELEASES.md",
        "PLANS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the feature-lookup path hardening patch that forces canonical feature resolution through `framework/HE Index.md` and binds requirement traceability to the root `REQUIREMENTS.md` ledger.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-007",
      "date": "2026-04-09",
      "status": "approved-with-findings",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R004", "HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        "README.md",
        "RELEASES.md",
        "PLANS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the Mode 3 state-aware follow-up rules that prevent duplicate HELab implementation suggestions, unnecessary requirement suggestions, and guessed target-project names during feature lookup.",
      "findings": [
        {
          "severity": "medium",
          "path": ".agent/skills/harnessing-agents/SKILL.md",
          "summary": "The follow-up rules are strong behavioral guidance but are not mechanically enforced by a repository gate.",
          "status": "accepted"
        }
      ]
    },
    {
      "id": "HE-REV-2026-04-09-008",
      "date": "2026-04-09",
      "status": "approved-with-findings",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R004", "HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        "README.md",
        "RELEASES.md",
        "PLANS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the stronger Mode 3 output contract that requires Feature, Chain, Current State, and Next Valid Actions sections so feature lookup responses cannot stop at a chain-only answer.",
      "findings": [
        {
          "severity": "info",
          "path": ".agent/skills/harnessing-agents/SKILL.md",
          "summary": "The output contract is enforced through skill instructions rather than a parser or repository gate, which is appropriate for the current live-linked skill surface.",
          "status": "accepted"
        },
        {
          "severity": "info",
          "path": "README.md",
          "summary": "The deterministic response shape is now documented publicly; future downstream validation can measure compliance in external Mode 3 runs.",
          "status": "accepted"
        }
      ]
    },
    {
      "id": "HE-REV-2026-04-09-009",
      "date": "2026-04-09",
      "status": "approved-with-findings",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R004", "HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        ".agent/skills/harnessing-agents/templates/HE-FEATURE-LOOKUP.md",
        "README.md",
        "RELEASES.md",
        "PLANS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the Mode 3 template hardening patch that adds a dedicated feature-lookup template, binds feature mode to that template, and rejects field/value summary output as the default final response shape.",
      "findings": [
        {
          "severity": "info",
          "path": ".agent/skills/harnessing-agents/templates/HE-FEATURE-LOOKUP.md",
          "summary": "The dedicated template materially improves compliance by prohibiting table-only answers and requiring Current State plus Next Valid Actions, even though enforcement remains instruction-based.",
          "status": "accepted"
        },
        {
          "severity": "info",
          "path": ".agent/skills/harnessing-agents/SKILL.md",
          "summary": "Mode 3 enforcement remains contract-based rather than parser-based, which is appropriate for the current live-linked skill surface and was kept in scope deliberately.",
          "status": "accepted"
        }
      ]
    },
    {
      "id": "HE-REV-2026-04-09-010",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R002", "HE-R004", "HE-R008"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/",
        "AGENTS.md",
        "ANCHORS.md",
        "PLANS.md",
        "README.md",
        "RELEASES.md",
        "REQUIREMENTS.md",
        "REVIEWS.md",
        "scripts/harness/audit.sh",
        "scripts/he-lint.js"
      ],
      "change_summary": "Approved the bundled skill-runtime migration and Mode 3 canonical-fidelity hardening that ship a synchronized framework mirror inside the live-linked skill, enforce bundle drift checks, and require canonical feature metadata plus workspace-grounded state in feature lookups.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-011",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R002"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/",
        "PLANS.md",
        "RELEASES.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the rename of the review-ledger template to `templates/HE-REVIEWS.md` so the skill template surface follows the established Harness Engineering naming convention while preserving the mounted target-project output name `REVIEWS.md`.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-012",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R001", "HE-R002"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/",
        "PLANS.md",
        "RELEASES.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the rename of the P2-3 target-project review reference to `references/he-p2-3-review-mount-pattern.md` so the skill surface uses a more clearly instructional naming pattern without changing the reference semantics.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-013",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R005", "HE-R006"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        "PLANS.md",
        "RELEASES.md",
        "REVIEWS.md",
        "package.json"
      ],
      "change_summary": "Approved the HELab 4.0.0 release-cut patch that bumps the canonical root version, syncs the mirrored skill version, and converts the accumulated Unreleased notes into the `4.0.0 - 2026-04-09` release section while reopening `Unreleased` for future work.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-014",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R003", "HE-R008", "HE-R009"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        ".agent/skills/harnessing-agents/references/he-feature-implementation-guide-pattern.md",
        ".agent/skills/harnessing-agents/references/he-full-audit.md",
        ".agent/skills/harnessing-agents/references/he-p0-3-verification-mount-pattern.md",
        ".agent/skills/harnessing-agents/references/he-p1-10-requirements-ledger-mount-pattern.md",
        "ANCHORS.md",
        "PLANS.md",
        "RELEASES.md",
        "REQUIREMENTS.md",
        "REVIEWS.md"
      ],
      "change_summary": "Approved the HE-R009 delivery batch that adds the canonical feature implementation-guide pattern, ships the first concrete target-project execution guides for P0-3 and P1-10, and updates the skill/audit flow to prefer guide-backed execution over abstract feature-only remediation.",
      "findings": []
    },
    {
      "id": "HE-REV-2026-04-09-015",
      "date": "2026-04-09",
      "status": "approved",
      "generator": "GitHub Copilot",
      "reviewer": "Explore subagent",
      "review_type": "agent",
      "requirement_ids": ["HE-R003", "HE-R008", "HE-R009"],
      "scope_paths": [
        ".agent/skills/harnessing-agents/SKILL.md",
        ".agent/skills/harnessing-agents/references/he-full-audit.md",
        ".agent/skills/harnessing-agents/references/he-p0-1-bash-sandbox-mount-pattern.md",
        ".agent/skills/harnessing-agents/references/he-p1-7-planning-mount-pattern.md",
        ".agent/skills/harnessing-agents/references/he-p2-5-intake-gate-mount-pattern.md",
        ".agent/skills/harnessing-agents/templates/HE-IMPLEMENTATION-PLAN.md",
        "PLANS.md",
        "RELEASES.md",
        "REVIEWS.md",
        "tmp/Target Proof Repo/"
      ],
      "change_summary": "Approved the HE-R009 tranche-two batch that ships concrete execution guides for P0-1, P1-7, and P2-5, tightens the implementation-plan template to require explicit guide lookup when available, and proves the shipped P0-3/P1-10 guide layer against a synthetic target repository under tmp/.",
      "findings": []
    }
  ]
}
```
