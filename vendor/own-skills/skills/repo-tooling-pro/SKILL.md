---
name: repo-tooling-pro
description: |
  Repository automation for this skills template: Python scripts under scripts/ for knowledge-base batch queries (performance), skill inventory, validation, and KB build/verify — when to use them vs reading Markdown only.

  Use this skill when the user runs or wires CI for build_kb, query_kb, query_kb_batch, verify_kb, list_skills, validate_skills, analyze_skills; asks how to speed up multiple KB queries; or needs a JSON list of bundled skills — or a **report** on which skills should **link or add** helpers under `scripts/` (self-support automation). This skill (`repo-tooling-pro`) owns **script usage and performance**; other **`*-pro`** skills own domain content.

  Triggers: "scripts", "query_kb_batch", "batch query", "list_skills", "validate_skills", "analyze_skills", "skill analysis report", "script self support", "build_kb", "verify_kb", "CI skills", "RAG performance", "embeddings", "repo automation".

metadata:
  short-description: Repo tooling — KB batch query, list/validate/analyze skills, Markdown reports, scripts README
---

# Repo tooling (professional)

Official script list: **[`scripts/README.md`](../../scripts/README.md)** at repo root. This skill encodes **when** to use **batch** vs **single** query, **CI validation** of skills, and **no duplicate** model loads. Confirm **repo root** as cwd and **`config.md`** / **`config.example.md`** for KB paths.

## Related skills (this repo)

| Skill | When to combine with `repo-tooling-pro` |
|-------|----------------------------------------|
| **`skills-self-review-pro`** | Full **bundle audit** narrative — combine **`analyze_skills --markdown`** with **`SKILL_AUTHORING_RULES.md`** checklist |

## When to use

- **Multiple** KB questions in one session — **`query_kb_batch.py`**.
- **CI** — **`validate_skills.py`** after skill changes; **`verify_kb.py`** after KB build.
- **Agent inventory** — **`list_skills.py --json`**.
- **Authoring / audit** — **`analyze_skills.py`** (`--markdown` for paste-ready report; see **`skills-self-review-pro`**).
- Explaining **performance** difference vs N× `query_kb.py`.
- Trigger keywords: `query_kb_batch`, `validate_skills`, `analyze_skills`, `list_skills`, `build_kb`, …

## Workflow

1. Confirm **working directory** is repo root and **venv** has `requirements.txt` installed.
2. Apply the principles and topic summaries below; open [`scripts/README.md`](../../scripts/README.md) for exact flags.
3. Respond using **Suggested response format**; note **index missing** and **RAM** limits for huge batches.

### Operating principles

1. **Batch for many queries** — One model load; prefer **`query_kb_batch.py`** over shell loops of **`query_kb.py`**.
2. **Validate skills on change** — **`validate_skills.py`** catches `name` / folder drift.
3. **Rebuild KB when documents change** — Scripts query **stale** vectors otherwise.
4. **Scripts are not domain skills** — They support RAG and hygiene; **`react-pro`** etc. remain separate.

### KB and repo scripts (summary)

- **`query_kb_batch`**, **`list_skills`**, **`validate_skills`**, **`analyze_skills`**, pipeline **`build` → `verify`**.

Details: [references/kb-and-repo-scripts.md](references/kb-and-repo-scripts.md)

### Tips and tricks (summary)

- Golden queries file, CI hooks, `--json` output.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- OOM, cwd, missing index, template skill flags.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Slow queries, CI, or inventory need.
2. **Recommendation** — Exact script(s) and flags; batch vs single.
3. **Code** — Example command lines or `queries.txt` sample — still labeled **Code**.
4. **Residual risks** — Stale embeddings, machine limits, config path mistakes.

## Resources in this skill

- `references/` — KB batch, tips, edge cases; canonical commands in **`scripts/README.md`**.

| Topic | File |
|-------|------|
| KB & repo scripts | [references/kb-and-repo-scripts.md](references/kb-and-repo-scripts.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |
| **Canonical command list** | [`scripts/README.md`](../../scripts/README.md) |

## Quick example

**Input:** Run 20 KB queries in a script — each `query_kb.py` call is slow.  
**Expected output:** Use **`python scripts/query_kb_batch.py -f queries.txt`** (or repeated `-q`); one model load; point to **`scripts/README.md`**.

**Input:** Which bundled skills should link or add helpers under **`scripts/`** (FFmpeg, CI, repeated steps)?  
**Expected output:** Run **`python scripts/analyze_skills.py --with-references --only-actionable --markdown`**; summarize **strong** / **consider** tiers; remind that **`repo-tooling-pro`** is exempt and domain skills may add a repo script plus a one-line link in **`SKILL.md`**; point to **`skills-self-review-pro`** for the full review workflow.

## Checklist before calling the skill done

- [ ] Correct script chosen (**batch** vs **single**).
- [ ] User knows to run from **repo root** with **venv**.
- [ ] **`validate_skills`** mentioned when adding/changing skill folders.
- [ ] If the skill describes **repeatable CLI/automation** (e.g. FFmpeg), either **`analyze_skills`** was run for hygiene or **`scripts/README.md`** / a repo script is referenced.
- [ ] KB **rebuild** mentioned if `documents/` changed since last `build_kb`.
