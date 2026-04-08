# Reviews Ledger

Canonical machine-readable review ledger for the target project's review-required surfaces.

- **Purpose:** Store independent review records required by P2-3 AI Auditors & Collaboration Channels.
- **Approving identities must differ:** `generator` and `reviewer` must not be the same string.
- **Scope rule:** Every approving record must list the reviewed files or directories in `scope_paths`.
- **Use with:** the target project's canonical agent contract and repo-native review gate.

```json
{
  "reviews": []
}
```
