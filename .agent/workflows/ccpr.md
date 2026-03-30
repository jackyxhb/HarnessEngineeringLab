---
description: Comment, Commit, Push, Release — runs /ccp then creates and pushes a release tag
---

# /ccpr — Comment, Commit, Push, Release

Run this workflow to finalize work and tag a release. This extends `/ccp` with a release tagging step.

**Usage:** `/ccpr <release-tag>` (e.g., `/ccpr v1.2.0`)

## Steps

1. **Review changes** — Run `git status` and `git diff --stat` to understand what has changed.
// turbo

2. **Stage all changes** — Run `git add -A` to stage everything.

3. **Generate commit message** — Based on the diff summary, write a concise, conventional-commit-style message. Format: `<type>(<scope>): <summary>`. Use multi-line body if the change spans multiple concerns.

4. **Commit** — Run `git commit -m "<message>"` with the generated message.

5. **Push to remote** — Run `git push` to push to the current tracking branch. If the push fails (e.g., no upstream set), run `git push -u origin <current-branch>` instead.

6. **Create release tag** — Run `git tag -a <release-tag> -m "Release <release-tag>"` to create an annotated tag with the user-provided release tag.

7. **Push tag to remote** — Run `git push origin <release-tag>` to push the tag to the remote repository.

## Notes

- The `<release-tag>` argument is **required**. If not provided, ask the user for it before proceeding.
- If there are no changes to commit, skip steps 2–5 and proceed directly to tagging (steps 6–7).
- If the tag already exists, inform the user and ask how to proceed (skip, overwrite with `-f`, or use a different tag).
- Do NOT force-push unless the user explicitly requests it.
