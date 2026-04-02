---
name: bug-discovery-pro
description: |
  Professional defect discovery: deep repository analysis, triage of bug candidates (not false “100%” guarantees), finding related failures via blast-radius and call-graph reasoning, and integration with GitNexus (knowledge graph, query, impact, API shape) when available.

  Use this skill when the user hunts bugs, traces regressions, asks what else could break, wants a structured **candidate** list with confidence, or uses **GitNexus** MCP (`query`, `context`, `impact`, `api_impact`, `shape_check`, `detect_changes`) after indexing. This skill does **not** claim exhaustive detection — combine with tests, runtime evidence, and **`security-pro`** for vulns.

  Use **with** **`testing-pro`** (repro, coverage gaps), **`security-pro`** (abuse and trust boundaries), and **external GitNexus Cursor skills** (`gitnexus-cli`, `gitnexus-debugging`, `gitnexus-exploring`, `gitnexus-impact-analysis`) for CLI and deeper graph usage. This skill (`bug-discovery-pro`) owns **bug-hunting workflow and graph-assisted discovery**; stack **`*-pro`** skills own framework fixes.

  Triggers: "bug", "bugs", "find bug", "regression", "root cause", "blast radius", "who calls", "impact", "GitNexus", "knowledge graph", "related bug", "deep scan repo", "candidate defect", "shape mismatch", "API consumers", "stale index".

metadata:
  short-description: Bug discovery — deep scan, GitNexus graph, candidates, related impact
---

# Bug discovery (professional)

No tool yields **100%** of all bugs — treat outputs as **candidates** with **evidence** and **confidence**. This skill encodes **triage discipline**, **graph-assisted exploration** (GitNexus when installed), and **related-defect** analysis via **impact** and **API consumer** paths. Confirm **repro** (or logs), **indexed** graph freshness, and **repo** identity in multi-repo setups.

**GitNexus:** Index the codebase first ( **`gitnexus-cli`** skill or org pipeline), then use MCP tools on the **`user-gitnexus`** server per [references/gitnexus-graph-workflow.md](references/gitnexus-graph-workflow.md).

## Related skills (this repo)

| Skill | When to combine with `bug-discovery-pro` |
|-------|------------------------------------------|
| **`testing-pro`** | Repro, flaky tests, coverage, CI signals |
| **`security-pro`** | Vulnerability-class issues, threat-relevant bugs |
| **`content-analysis-pro`** | Parse **logs**, **build output**, or **crash dumps** as attached text |

**External (Cursor):** **`gitnexus-cli`** (index/analyze), **`gitnexus-debugging`**, **`gitnexus-exploring`**, **`gitnexus-impact-analysis`** — use their `SKILL.md` for tool-specific steps; **`bug-discovery-pro`** ties them into a **bug-hunting** narrative.

## When to use

- **Root-cause** and **related** breakage analysis (shared code paths).
- **Deep repo** exploration when grep is not enough — **execution flows** and **impact**.
- **API** response vs consumer **shape** mismatches (with `shape_check` / `api_impact`).
- **Pre-commit** / **pre-PR** “what did I break?” (`detect_changes`).
- Honest **candidate** lists — not a promise of total bug enumeration.
- Trigger keywords: `bug`, `regression`, `GitNexus`, `impact`, `blast radius`, `related`, …

## Workflow

1. Confirm **symptom**, **repro** or **logs**, **branch**, and whether **GitNexus** index exists for this repo.
2. Apply the principles and topic summaries below; open `references/` when you need depth; run MCP tools **after** reading schemas; defer **framework fixes** to the right **`*-pro`** skill.
3. Respond using **Suggested response format**; note **stale graph**, **false positives**, and **untested** paths.

### Operating principles

1. **Candidates, not certainty** — Label confidence; prove or falsify with tests/runtime.
2. **Repro first** — Smallest failing case wins; **bisect** when useful.
3. **Graph augments reading** — GitNexus **does not** replace reading suspicious code.
4. **Related bugs** — Use **`impact`** / **`api_impact`** to widen regression surface.
5. **Index currency** — Re-index after large refactors before trusting **impact**.
6. **Security** — Do not treat graph output as **pen-test**; use **`security-pro`** for abuse models.

### GitNexus graph workflow (summary)

- Preconditions: **indexed** repo; tool order **`query`** → **`context`** → **`impact`** / **`api_impact`** / **`shape_check`** / **`detect_changes`**.

Details: [references/gitnexus-graph-workflow.md](references/gitnexus-graph-workflow.md)

### Bug candidates and confidence (summary)

- Why **100%** is impossible; **related bug** meanings; triage vocabulary; handoff to **`testing-pro`** / **`security-pro`**.

Details: [references/bug-candidates-and-confidence.md](references/bug-candidates-and-confidence.md)

### Tips and tricks (summary)

- Repro, bisect, **`query`** hints, **`impact`** d=1 priority, IDE fallback without graph.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Stale graph, name collisions, dynamic imports, monorepo **`repo`**, shape_check false positives.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Symptom, scope, and whether GitNexus is available.
2. **Recommendation** — Search order (repro → query → context → impact); which **Related skill** fixes code.
3. **Code** — Candidate list table, **repro** steps, or **graph-assisted** checklist — not a fabricated stack trace.
4. **Residual risks** — Uncovered paths, index age, false positives, missing tests.

## Resources in this skill

- `references/` — GitNexus workflow, confidence model, tips, edge cases.
- **MCP:** read tool schemas under your IDE’s GitNexus MCP folder before calling tools.

| Topic | File |
|-------|------|
| GitNexus workflow | [references/gitnexus-graph-workflow.md](references/gitnexus-graph-workflow.md) |
| Candidates & confidence | [references/bug-candidates-and-confidence.md](references/bug-candidates-and-confidence.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Intermittent 500 on `/api/orders` after deploy — find related risk.  
**Expected output:** **`api_impact`** on route (if indexed); **`shape_check`** for mismatches; **`impact`** on handler symbol; list **candidates** and **tests** to add; no claim of finding “all” bugs.

## Checklist before calling the skill done

- [ ] **Repro** or **log evidence** referenced where possible.
- [ ] **GitNexus** steps skipped or noted if index unavailable.
- [ ] **Candidates** labeled; **no false 100%** claim.
- [ ] **Related** code paths considered via **impact** or equivalent.
- [ ] Fix implementation **delegated** to appropriate **`*-pro`** skill when coding.
