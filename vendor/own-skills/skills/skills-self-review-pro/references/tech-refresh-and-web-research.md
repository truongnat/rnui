# Tech refresh, web research, and skill improvement

## Why

Self-review scripts only check **heuristic** automation keywords and **repo** script references. **Stack** skills (`react-pro`, `nextjs-pro`, …) need **periodic** alignment with **current** framework docs and practices.

## Workflow (combine skills)

1. Run **`python scripts/analyze_skills.py --self-review`** (local bundle state).
2. For each **domain** skill you maintain, use **`web-research-pro`** to verify **official** docs and **release notes** (version the user/project targets).
3. Prefer **Context7 MCP** (or project `plugin-context7`) for **library** API references when available — official docs over random blogs.
4. Record **conclusions** in **`knowledge-base/documents/repo/activity-log.md`** or a short note under `documents/repo/` (update **`INDEX.md`**).

## What to look for

- **Breaking** changes, deprecations, new defaults (e.g. React Compiler, Next.js caching).
- **Security** advisories relevant to the stack (**`security-pro`**).
- **Lint / format** ecosystem shifts only if they affect skill guidance.

## Limits

- Do not **rewrite** all skills on every session — batch by **milestone** or **major** upstream releases.
- **Cite** doc URLs and **versions** in activity log entries.
