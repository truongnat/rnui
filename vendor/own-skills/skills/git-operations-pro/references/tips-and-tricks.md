# Tips and tricks

- **`git stash push -m "msg"`** — named stash; **`git stash list`** before pop.
- **Partial stage:** `git add -p` for hunks; reduces accidental huge commits.
- **Restore file:** `git restore <path>` (modern) vs `checkout --` (legacy mental model).
- **Submodule / subtree** — document which pattern the repo uses; both confuse newcomers.
