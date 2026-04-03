# Observability

Quality signals, observable fields, and audit definitions for the HarnessEngineeringLab repository. Implements **Practice 4: Build Observability In From Day 1**.

---

## Observable Quality Signals

These are the minimum fields that must remain observable at all times. A harness is only healthy when all signals are green.

| Signal | Target | Source | Frequency | Alert Threshold |
| --- | --- | --- | --- | --- |
| `he_lint_violations` | `0` | `node scripts/he-lint.js` | Every commit + weekly | `> 0` |
| `markdownlint_violations` | `0` | `npx markdownlint` | Every commit + weekly | `> 0` |
| `spellcheck_violations` | `0` | `npx cspell` | Every commit + weekly | `> 0` |
| `feature_count` | `30` | `he-lint.js` number-bias check | Every commit | `≠ 30` |
| `anchor_count` | `≥ 5` | `ANCHORS.md` heading count | Weekly | `< 5` |
| `stale_tmp_files` | `0` | `audit.sh` find check | Weekly | `> 0` |
| `harness_structural_integrity` | `PASS` | `scripts/harness/audit.sh` | Weekly | `FAIL` |
| `ci_workflow_pass_rate` | `100%` | GitHub Actions history | Per push/PR | `< 100%` |

---

## Harness File Existence Checks

The following files must always exist. A missing file is a harness failure (`FAIL`).

| File | Practice | Purpose |
| --- | --- | --- |
| `CLAUDE.md` | P2 — Compact Docs | Agent interface contract |
| `ANCHORS.md` | P1-8 — Context Anchoring | Persistent strategic decisions |
| `PLANS.md` | P1-7 — Planning | Active task state |
| `docs/ARCHITECTURE.md` | P2-1 — Automated Linters | Module boundary spec |
| `docs/OBSERVABILITY.md` | P1-5 — Observability | This file |
| `scripts/he-lint.js` | P2-1 — Automated Linters | HE consistency checker |
| `scripts/harness/audit.sh` | P3-1 — Scheduled Cleanups | Structural audit |
| `.github/workflows/he-lint.yml` | P2-1 — Automated Linters | CI gate |
| `.github/workflows/he-weekly-gc.yml` | P3-1 — Scheduled Cleanups | Weekly entropy scan |
| `.husky/pre-commit` | P2-1 — Automated Linters | Pre-commit gate |
| `framework/HE Core Features.md` | P1-1 — Repository as Truth | Canonical feature definitions |

---

## Alerting

### Pre-commit (Local)

Runs `lint-staged` via Husky on every commit attempt. If `he-lint.js`, `markdownlint`, or `cspell` report violations, the commit is blocked.

**Recoverable:** Fix the reported violations, then re-commit.

### CI Gate (`he-lint.yml`)

Runs on every push to `main` and every pull request. Blocks merge if:

- `markdownlint` reports violations
- `cspell` reports unknown words
- `he-lint.js` reports structural violations

**Alert channel:** GitHub Actions status check. Pull requests cannot be merged until resolved.

### Weekly Entropy Scan (`he-weekly-gc.yml`)

Runs every Monday at 09:00 UTC. On failure, automatically opens a GitHub issue titled:

```text
Weekly Entropy Report — YYYY-MM-DD
```

Issue body includes full `he-lint.js` output with per-violation fix instructions. Assign to the repository owner for triage.

**Alert channel:** GitHub Issues.

### Local Audit (`npm run audit`)

Run manually or in CI to check structural integrity. Produces per-check `[OK]` / `[WARNING]` / `[FAIL]` lines with a final verdict. A `FAIL` result means the harness is degraded and must be repaired before agent runs.

---

## Interpreting He-Lint Output

`he-lint.js` emits structured console output:

```text
[HE-LINT] <filename>:<line|ALL> -> <violation message>
  ↳ Fix: <actionable fix instruction>
```

- `line` — violation on a specific line; open the file and fix that line.
- `ALL` — orphan concept violation spanning the whole file; add the referenced source link.
- `↳ Fix:` — always present; follow the exact instruction before re-running.

Exit code `0` = clean; `1` = violations present.

---

## Anchor Freshness

Anchors in `ANCHORS.md` should be reviewed when:

- A canonical framework definition changes
- A new pillar or feature is added
- A DO NOT rule is added to `CLAUDE.md`

Stale anchors (no review in >90 days, or referencing deleted content) should be pruned via `/anchor` workflow.

---

## Correlation

For tracing a specific agent run back to its observations:

1. Every significant agent operation should reference the relevant workflow name (e.g., `/polish`, `/reconcile`) in its commit message.
2. Commit style is `feat:` or `docs:` prefix + descriptive body. This makes CI history scannable for semantic change types.
3. The weekly GC issue body includes a timestamp and full lint output, providing a durable point-in-time snapshot of harness health.
