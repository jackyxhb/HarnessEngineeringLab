---
description: Comment, Commit, Push — execution of git comment, commit, push commands to finish changes commit to repos.
---

# /ccp — Comment, Commit, Push

Run this workflow to finalize work: execute git comment (generating a message), stage changes, commit, and push to the remote repository.

## Steps

1. **Review changes** — Run `git status` and `git diff --stat` to understand what has changed.
// turbo

2. **Stage all changes** — Run `git add -A` to stage everything.

3. **Generate commit message** — Based on the diff summary, write a concise, conventional-commit-style message. Format: `<type>(<scope>): <summary>`. Use multi-line body if the change spans multiple concerns.

4. **Commit** — Run `git commit -m "<message>"` with the generated message.

5. **Push to remote** — Run `git push` to push to the current tracking branch.

## Notes

- If there are no changes to commit, stop and inform the user.
- If the push fails (e.g., no upstream set), run `git push -u origin <current-branch>` instead.
- Do NOT force-push unless the user explicitly requests it.
