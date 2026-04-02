# Commits and branching

## Conventional Commits (overview)

- **Format:** `<type>(<scope>): <description>` — common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`.
- **Breaking changes:** `!` after type/scope or **footer** `BREAKING CHANGE:` with migration notes.
- **Why:** Readable history, changelog generation, safer bisect.

## Branching models (pick one per repo; document in README)

| Model | When |
|-------|------|
| **Trunk-based** | Small PRs, short-lived branches, `main` always releasable |
| **Git Flow** | Release branches + hotfixes — heavier; still common in regulated orgs |
| **GitHub Flow** | Feature branch → PR → merge to `main` — default for many web apps |

## Merge vs rebase

- **Merge** — preserves branch topology; good for shared branches and audit.
- **Rebase** — linear history on **private** branches before PR; **never** rebase commits others have pulled without coordination.

## Useful reads

- `git log --oneline --graph -n 20` — quick shape.
- `git bisect` when hunting regressions — pair with **Conventional** messages to spot suspect ranges faster.
