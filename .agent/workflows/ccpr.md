---
description: Comment, Commit, Push, GitHub Release — runs git comment, commit, push, then creates a GitHub Release with the gh command to finalize and share work.
---

# /ccpr — Comment, Commit, Push, Github Release

Run this workflow to finalize work: execute git comment (generating a message), commit, and push, then create a GitHub Release using the `gh` command. This extends `/ccp` with release steps.

**Usage:** `/ccpr <release-tag>` (e.g., `/ccpr v1.2.0`)

## Steps

1. **Review changes** — Run `git status` and `git diff --stat` to understand what has changed.
// turbo

2. **Stage all changes** — Run `git add -A` to stage everything.

3. **Generate commit message** — Based on the diff summary, write a concise, conventional-commit-style message. Format: `<type>(<scope>): <summary>`. Use multi-line body if the change spans multiple concerns.

4. **Commit** — Run `git commit -m "<message>"` with the generated message.

5. **Push to remote** — Run `git push` to push to the current tracking branch. If the push fails (e.g., no upstream set), run `git push -u origin <current-branch>` instead.

6. **Create release tag** — Run `git tag -a <release-tag> -m "Release <release-tag>"` to create an annotated tag.

7. **Push tag to remote** — Run `git push origin <release-tag>` to push the tag to the remote repository.

8. **Write release notes** — Review the git log since the last tag (`git log $(git describe --tags --abbrev=0 HEAD~1 2>/dev/null || git rev-list --max-parents=0 HEAD)..HEAD --oneline`) and the diff summary. Write a human-readable release note in markdown with:
   - A one-line summary of the release theme
   - **What's New** — new features, capabilities, or workflows added
   - **Changed** — modifications to existing behavior, renamed/restructured items
   - **Fixed** — bug fixes, lint fixes, and corrections
   - **Infrastructure** — tooling, CI, dictionary, or config changes
   Omit any section that has no entries. Save the notes to a temp file at `/tmp/release-notes.md`.

9. **Create GitHub Release** — Run `gh release create <release-tag> --title "<release-tag>" --notes-file /tmp/release-notes.md` to create the GitHub Release with the authored notes. This step is **MANDATORY** and must not be skipped.

## Notes

- The `<release-tag>` argument is **required**. If not provided, ask the user for it before proceeding.
- If there are no changes to commit, skip steps 2–5 and proceed directly to tagging (steps 6–9).
- If the tag already exists, inform the user and ask how to proceed (skip, overwrite with `-f`, or use a different tag).
- Do NOT force-push unless the user explicitly requests it.
- **CRITICAL:** Steps 6, 7, 8, and 9 are ALL required. A tag without a GitHub Release is incomplete. A release without authored notes is unacceptable.
