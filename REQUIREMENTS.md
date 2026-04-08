# Requirements Ledger

Canonical requirements ledger for the self-hosted Harness Engineering repository and the live-linked `harnessing-agents` skill it ships for target-project use.

```json
{
  "requirements": [
    {
      "id": "HE-R001",
      "title": "Framework canonical source with skill delivery",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "Canonical Harness Engineering truth lives in framework/. The live-linked harnessing-agents skill in .agent/skills/harnessing-agents/ derives from that framework and applies it to target projects and to this repository itself. Content under docs/ is support material only and must not override framework definitions unless the user explicitly asks to maintain it.",
      "acceptance_criteria": [
        "Active harness tooling validates framework/, the released skill surface, and root harness files as the active product surface.",
        "The skill surface stays consistent with the framework definitions it loads.",
        "Support material under docs/ is treated as optional and non-authoritative by default.",
        "Anchors and workflow instructions do not route agents through docs/ as canonical truth."
      ],
      "status": "active",
      "source": "User scope decision recorded on 2026-04-09"
    },
    {
      "id": "HE-R002",
      "title": "Dual-mode skill contract",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "This repository both ships the harnessing-agents skill for target-project use and self-hosts by running that same skill on itself. The framework defines the method; the skill is the live-linked delivery mechanism that applies it in agentic environments.",
      "acceptance_criteria": [
        "Root governance docs describe the repository as both a framework source and a released skill workspace.",
        "Local implementation claims are backed by mechanical checks or clearly framed as skill behavior in target projects.",
        "Target-project language refers to running the harnessing-agents skill, not merely reading the framework docs.",
        "Strategic anchors reflect the dual-mode contract."
      ],
      "status": "active",
      "source": "User intent decision recorded on 2026-04-09"
    },
    {
      "id": "HE-R003",
      "title": "Requirements-gated planning",
      "applies_to": ["self-hosted"],
      "narrative": "Multi-step work in this repository must be authorized by requirement IDs recorded in this ledger, and active plans must cite those IDs before planning or execution proceeds. This is the self-hosted intake gate for maintaining the framework and released skill.",
      "acceptance_criteria": [
        "REQUIREMENTS.md exists at the repo root and contains machine-readable requirement entries.",
        "Active plans in PLANS.md include a Requirement IDs field.",
        "The active-plan Requirement IDs resolve to entries in this ledger through he-lint validation."
      ],
      "status": "active",
      "source": "Framework self-hosting remediation on 2026-04-09"
    },
    {
      "id": "HE-R004",
      "title": "Canonical content integrity",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "Canonical framework files and live-linked skill files must remain machine-readable and free of malformed bullets, orphan rows, and other parse-breaking corruption.",
      "acceptance_criteria": [
        "Malformed feature-file content is corrected when discovered.",
        "Released skill docs and references remain readable and consistent with framework updates.",
        "Markdownlint, cspell, and he-lint continue to pass after canonical edits.",
        "No canonical feature file contains stray table rows or merged bullet text that changes meaning."
      ],
      "status": "active",
      "source": "Framework-only critique findings on 2026-04-09"
    },
    {
      "id": "HE-R005",
      "title": "Live-linked version consistency",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "The current harnessing-agents skill is a live-linked HELab component, not an independently packaged release. The canonical version source is the root package.json version, and the skill metadata version in .agent/skills/harnessing-agents/SKILL.md must mirror it so linked downstream environments do not observe ambiguous version state.",
      "acceptance_criteria": [
        "A deterministic repository command syncs the root version into the skill metadata.",
        "The repository fails validation when package.json and the skill metadata version diverge.",
        "Root governance docs describe the skill as live-linked rather than independently released.",
        "Version guidance tells maintainers to treat HELab as the canonical version source until a separate release boundary exists."
      ],
      "status": "active",
      "source": "User clarification about the live-linked skill model on 2026-04-09"
    }
  ]
}
```
