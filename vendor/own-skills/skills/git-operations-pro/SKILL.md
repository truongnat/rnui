---
name: git-operations-pro
description: |
  Professional Git workflow: conventional commits, branch strategies, merge vs rebase discipline, pull requests, useful log/diff/bisect patterns, and safe collaboration — without replacing CI/CD or deployment orchestration.

  Use this skill when the user asks about **commit conventions**, **branch naming**, **feature vs trunk flow**, **resolving conflicts**, **review hygiene**, **git log** interpretation, **revert vs reset**, or **what not to commit** — high-frequency in day-to-day coding sessions.

  Use **with** **`testing-pro`** for what runs in **CI**; **`security-pro`** for **secrets** and leaked keys; **`deployment-pro`** for **release** paths — not branch topology. This skill (`git-operations-pro`) owns **VCS** workflow; **`code-packaging-pro`** owns **artifact** build YAML when the task is “workflow file” not “merge strategy”.

  Triggers: "git", "commit", "conventional commits", "branch", "merge", "rebase", "pull request", "PR", "conflict", "git log", "bisect", "revert", "cherry-pick", "stash", "force push", "trunk", "Git Flow", "CODEOWNERS".

metadata:
  short-description: Git — commits, branches, PRs, collaboration, safety
---

# Git operations (professional)

Use official [Git documentation](https://git-scm.com/doc) for exact flags; this skill encodes **team-friendly** defaults, **branch** clarity, and **safety** around history and secrets. Confirm **repo policy** (merge vs squash, rebase allowed, protected branches).

## Related skills (this repo)

| Skill | When to combine with `git-operations-pro` |
|-------|------------------------------------------|
| **`testing-pro`** | **CI** runs tests on PR — **not** the same as local commit style |
| **`security-pro`** | **Secrets**, **signing**, **supply chain**; never commit credentials |
| **`deployment-pro`** | **Tag** / **release** cadence vs **Git** tags; **promotion** after merge |
| **`code-packaging-pro`** | **GitHub Actions** YAML — **when** the ask is **workflow** syntax, not **merge** strategy |

**Boundary:** **`git-operations-pro`** = **version control** habits; **`deployment-pro`** = **where** code runs after merge.

## When to use

- **Commit messages** — Conventional Commits, **scope**, **breaking** notation.
- **Branches** — Naming, short-lived, **trunk** vs **long-lived** release branches.
- **PRs** — Size, review, **draft**, **description** template.
- **Recovery** — **Revert** on shared `main`, **reset** only on private branches.
- **Inspection** — `log`, `blame`, **bisect** for regressions.
- Trigger keywords: `git`, `commit`, `branch`, `merge`, `rebase`, `PR`, `conflict`, …

## Workflow

1. Confirm **branch protection**, **merge strategy** (merge/squash/rebase), and **team** conventions.
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **runtime** release to **`deployment-pro`**.
3. Respond using **Suggested response format**; note **history rewrite** and **secret** risks.

### Operating principles

1. **Small, reviewable commits** — Easier bisect and safer rollback.
2. **No secrets in Git** — **Env** and **vault** patterns (**`security-pro`**).
3. **Shared history is immutable** — Prefer **revert** on `main`; avoid **force** without policy.
4. **Branch** purpose is obvious — **Ticket**/`feat-`/`fix-` prefixes when the team uses them.
5. **Merge** or **rebase** per policy — **Rebase** private branches; **don’t** rewrite others’ bases casually.
6. **PR description** — **What** + **Why** + **How to test**; link **issue**.

### Commits and branching (summary)

- **Conventional Commits**, **branching** models, **merge vs rebase** basics.

Details: [references/commits-and-branching.md](references/commits-and-branching.md)

### Collaboration and safety (summary)

- **PRs**, review, **hooks**, **CI** pointer; **secrets**; boundary vs **`deployment-pro`**.

Details: [references/collaboration-and-safety.md](references/collaboration-and-safety.md)

### Tips and tricks (summary)

- **Stash**, **patch** stage, **restore**.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **Force push**, **LFS**, **line endings**, case-only renames.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Commit style, branch conflict, or PR practice.
2. **Recommendation** — Commands + **policy** note (protected branch, squash).
3. **Code** — **Git** command examples or **commit message** template — still labeled **Code**.
4. **Residual risks** — History rewrite, **leaked** secrets, **wrong** merge base.

## Resources in this skill

- `references/` — commits, collaboration, tips, edge cases.

| Topic | File |
|-------|------|
| Commits & branching | [references/commits-and-branching.md](references/commits-and-branching.md) |
| Collaboration & safety | [references/collaboration-and-safety.md](references/collaboration-and-safety.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** “We merged `main` into feature branch and have 50 conflicts — shortcut?”  
**Expected output:** Prefer **abort** merge, **rebase** or **recreate** branch from latest `main` if policy allows; **avoid** mass manual resolution without understanding; **no** force to `main`.

## Checklist before calling the skill done

- [ ] **Convention** matches **team** (Conventional vs internal).
- [ ] **Protected** branches and **force** rules respected.
- [ ] **Secrets** not embedded in **commands** or **hooks** output.
- [ ] **Deployment** concerns (**K8s**, **rollback**) **not** conflated with **Git** mechanics.
