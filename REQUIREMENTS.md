# Requirements Ledger

Canonical requirements ledger for the self-hosted Harness Engineering repository and the live-linked `harnessing-agents` skill it ships for target-project use.

```json
{
  "requirements": [
    {
      "id": "HE-R001",
      "title": "Framework canonical source with skill delivery",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "Canonical Harness Engineering truth lives in framework/. The live-linked harnessing-agents skill in .agent/skills/harnessing-agents/ derives from that framework and applies it to target projects and to this repository itself. The shipped skill runtime must carry a synchronized bundled mirror of framework/ so target-project execution does not depend on sibling HELab paths. Content under docs/ is support material only and must not override framework definitions unless the user explicitly asks to maintain it.",
      "acceptance_criteria": [
        "Active harness tooling validates framework/, the live-linked skill surface, and root harness files as the active product surface.",
        "The skill surface stays consistent with the framework definitions it loads.",
        "The shipped skill runtime includes a synchronized bundled mirror of framework/ for target-project execution.",
        "Canonical framework edits trigger bundle-sync validation, and merge gates fail until the shipped runtime mirror matches the root framework/.",
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
      "narrative": "This repository both ships the harnessing-agents skill for target-project use and self-hosts by running that same skill on itself. The framework defines the method; the skill is the live-linked delivery mechanism that applies it in agentic environments. The shipped skill must therefore be self-contained enough to execute against target projects without depending on sibling repository paths outside the skill payload.",
      "acceptance_criteria": [
        "Root governance docs describe the repository as both a framework source and a live-linked skill workspace.",
        "Local implementation claims are backed by mechanical checks or clearly framed as skill behavior in target projects.",
        "Target-project language refers to running the harnessing-agents skill, not merely reading the framework docs.",
        "The live-linked skill surface carries the runtime framework context it needs for target-project execution.",
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
        "Live-linked skill docs and references remain readable and consistent with framework updates.",
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
    },
    {
      "id": "HE-R006",
      "title": "Downstream change traceability",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "Because linked downstream projects consume the live-linked skill surface directly, changes to `framework/` or `.agent/skills/harnessing-agents/` must leave a durable release-notes trail in the HELab repository.",
      "acceptance_criteria": [
        "A canonical root release-notes file exists for HELab version history and unreleased downstream changes.",
        "The repository fails validation when downstream-impact surfaces change without a corresponding `RELEASES.md` update.",
        "Release workflows derive their release tag and notes from the root HELab version model rather than an independent skill release number.",
        "Documentation tells maintainers to treat live-linked framework and skill edits as downstream-facing changes."
      ],
      "status": "active",
      "source": "Follow-up hardening of the live-linked release model on 2026-04-09"
    },
    {
      "id": "HE-R007",
      "title": "Independent review gate for core harness surfaces",
      "applies_to": ["self-hosted"],
      "narrative": "Substantial changes to HELab's core harness surfaces must leave a machine-readable independent review record before merge. The implementation agent cannot be the same identity that certifies the change.",
      "acceptance_criteria": [
        "A canonical root review ledger exists and stores machine-readable review records.",
        "Validation fails when review-required surfaces change without a corresponding review-ledger update.",
        "Validation fails when an approving review record uses the same identity for both generator and reviewer.",
        "Root governance docs describe which surfaces are review-required and where the review record must be stored."
      ],
      "status": "active",
      "source": "P2-3 self-hosting hardening on 2026-04-09"
    },
    {
      "id": "HE-R008",
      "title": "Target-project delivery primacy",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "HELab exists to make the live-linked harnessing-agents skill capable of effectively applying all Harness Engineering features to target projects. Self-hosting inside HELab is a validation and proving loop for that mission, not the terminal success criterion by itself.",
      "acceptance_criteria": [
        "Root governance docs describe target-project feature application as the primary mission of the repository and skill.",
        "Self-hosted implementations are framed as proofs or hardening loops that strengthen the skill's ability to operate in target projects.",
        "The live-linked skill overview explicitly states that its success is measured by effective target-project application of the framework, not merely by internal HELab completeness.",
        "Strategic anchors preserve this priority across future sessions and architectural decisions."
      ],
      "status": "active",
      "source": "User clarification about project mission on 2026-04-09, recorded in ANCHORS.md as A16"
    },
    {
      "id": "HE-R009",
      "title": "Concrete feature implementation guides",
      "applies_to": ["target-project", "self-hosted"],
      "narrative": "The live-linked harnessing-agents skill must ship concrete implementation guidance for applying Harness Engineering features in target projects. Phase 4 execution in the full-audit workflow must be able to map a detected feature gap to actionable files, commands, templates, and verification steps without relying on agent guesswork or conceptual-only feature text.",
      "acceptance_criteria": [
        "The repository defines a canonical pattern for feature implementation guides that is distinct from the abstract L1-L5 framework feature definition.",
        "The harnessing-agents skill can route from a feature gap to concrete target-project implementation guidance without inventing filenames, workflows, or verification steps.",
        "At least one bounded delivery slice of feature implementation guides is shipped and referenced from the live-linked skill surface.",
        "Execution-oriented guidance preserves the root framework as canonical truth while adding target-project actionability rather than duplicating or mutating the framework definitions.",
        "Validation and review surfaces remain consistent with any new guide pattern introduced for target-project execution."
      ],
      "status": "active",
      "source": "Post-4.0.0 delivery-gap audit on 2026-04-09"
    },
    {
      "id": "HE-R010",
      "title": "Harness injection protocol draft",
      "applies_to": ["target-project", "self-hosted"],
      "narrative": "The live-linked harnessing-agents skill should carry a draft protocol that models target-repository harnessing through slot classes, concrete touch-points, lifecycle phases, mutation safety levels, and proof requirements. The protocol is a skill-side execution asset that governs how the skill stages, injects, verifies, and records harness changes without yet promoting the concept into canonical framework ontology.",
      "acceptance_criteria": [
        "The repository ships a durable draft reference that defines harness slots, touch-points, lifecycle phases, and safety/proof rules for target-project execution.",
        "The live-linked skill surface explicitly points agents at that draft when reasoning about target-repository mutation flow.",
        "The full-audit workflow references the draft when target-project execution moves from inspection into mutation.",
        "The draft stays framed as a skill-side protocol asset unless repeated target-project proofs justify promotion into the canonical framework."
      ],
      "status": "active",
      "source": "User-directed protocol exploration on 2026-04-09"
    },
    {
      "id": "HE-R011",
      "title": "First-mount governance execution pattern",
      "applies_to": ["target-project", "self-hosted"],
      "narrative": "The live-linked harnessing-agents skill must ship a reusable execution pattern for documentation-heavy repositories that lack a portable governance layer. The pattern should convert the first-mount governance repo profile into a deterministic initial remediation batch covering a root agent contract, requirements ledger, plans ledger, review ledger, and lightweight document-integrity verification, then prove that batch on a real target project.",
      "acceptance_criteria": [
        "The repository ships a durable execution reference for the first-mount governance repo profile that reuses existing planning, requirements, review, and intake patterns instead of improvising target-project steps.",
        "The live-linked skill surface explicitly routes matching repo profiles to that execution reference during planning or execution.",
        "A real target-project proof demonstrates the pattern on a documentation-heavy repository without expanding into unrelated application-style infrastructure.",
        "Verification for the target-project proof includes at least one deterministic command that validates the mounted governance surface.",
        "The resulting guidance remains framed as a skill-side execution capability rather than a promoted canonical framework feature."
      ],
      "status": "active",
      "source": "User-approved execution-capability tranche on 2026-04-09"
    },
    {
      "id": "HE-R012",
      "title": "Canonical terms reference",
      "applies_to": ["self-hosted", "target-project"],
      "narrative": "The canonical framework surface must include a dedicated terms reference so agents and humans can distinguish core Harness Engineering ontology from skill-side execution terminology, reducing drift and overloaded term usage across framework, governance, and delivery guidance.",
      "acceptance_criteria": [
        "A root framework terms reference exists under framework/ and is discoverable from the framework entry points.",
        "The terms reference distinguishes canonical framework terms from skill-side execution terms where their scopes differ.",
        "The terms reference includes the major concepts actively used across the framework and current delivery layer, including the new Feature Package term.",
        "The framework runtime bundle stays synchronized with the new canonical terms reference."
      ],
      "status": "active",
      "source": "User-directed terminology consolidation on 2026-04-09"
    }
  ]
}
```
