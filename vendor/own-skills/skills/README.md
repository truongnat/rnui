# skills

Each **skill** is a subdirectory with a required `SKILL.md` (frontmatter `name` and `description`). Optional: `references/`, `scripts/`, `assets/`.

## Before creating a new skill (mandatory)

1. Read **[SKILL_AUTHORING_RULES.md](SKILL_AUTHORING_RULES.md)** end-to-end.
2. Do **not** add a new folder under `skills/` unless every **mandatory** rule in that document is satisfied. If not, extend an existing `*-pro` skill or add `references/` instead.
3. Cursor: project rule **`.cursor/rules/skills-authoring.mdc`** applies when editing skills.

- **Template:** copy [`examples/skill-template/`](examples/skill-template/) and rename the folder; align with `SKILL_AUTHORING_RULES.md`.

## Bundle audit (maintainers)

From **repo root** (venv active), generate a **full** Markdown report (tier counts, all skills, manual checklist):

```bash
python scripts/validate_skills.py
python scripts/analyze_skills.py --self-review
```

Skill **`skills-self-review-pro`** describes the workflow. Repo scripts index: **[`../scripts/README.md`](../scripts/README.md)**.

## Bundled examples

| Directory | Description |
|-----------|-------------|
| [react-pro](react-pro/) | React (web) — components, hooks, UI/a11y, SSR, edge cases |
| [nextjs-pro](nextjs-pro/) | Next.js — App Router, RSC, caching, middleware |
| [react-native-pro](react-native-pro/) | React Native / Expo — UI/UX, performance, edge cases |
| [flutter-pro](flutter-pro/) | Flutter — Material 3, multi-platform edge cases |
| [javascript-pro](javascript-pro/) | JavaScript — architecture, async behavior, tips/tricks, edge cases |
| [performance-tuning-pro](performance-tuning-pro/) | Performance tuning — profiling, bottlenecks, optimization, edge cases |
| [clean-code-architecture-pro](clean-code-architecture-pro/) | Clean code/architecture — boundaries, coupling, refactoring, maintainability |
| [cli-pro](cli-pro/) | CLI — argv design, help/exit codes, pipes/TTY, completions, cross-platform tools |
| [api-design-pro](api-design-pro/) | API design — contracts, versioning, consistency, idempotency, edge cases |
| [graphql-pro](graphql-pro/) | GraphQL — schema design, resolvers, performance, security, edge cases |
| [websocket-pro](websocket-pro/) | WebSocket — reliability, lifecycle, scaling, security, edge cases |
| [microservices-pro](microservices-pro/) | Microservices — boundaries, communication, resilience, operations, edge cases |
| [stream-rtc-pro](stream-rtc-pro/) | Stream/RTC — signaling, media QoS, scaling, security, edge cases |
| [nestjs-pro](nestjs-pro/) | NestJS — API/DX, PostgreSQL RLS integration |
| [postgresql-pro](postgresql-pro/) | PostgreSQL — schema, SQL, migrations, RLS, ops |
| [testing-pro](testing-pro/) | Testing & automation — pyramid, CI, unit/integration/e2e, flakiness |
| [security-pro](security-pro/) | Cross-platform security — threat model, auth, secrets, tips, edge cases |
| [electron-pro](electron-pro/) | Electron — main/preload/renderer, IPC, packaging, updates |
| [tauri-pro](tauri-pro/) | Tauri — Rust commands, capabilities, webview, bundle |
| [deployment-pro](deployment-pro/) | Deployment — methods, CI/CD flows, release strategies, rollback |
| [seo-pro](seo-pro/) | SEO — lifecycle, technical crawl, on-page, CWV, edge cases |
| [design-system-pro](design-system-pro/) | Design system — baseline, guidelines, data UI, platforms, themes |
| [mobile-design-pro](mobile-design-pro/) | Mobile design — touch, safe area, navigation, iOS/Android UX |
| [business-analysis-pro](business-analysis-pro/) | Business analysis — requirements, SA-style reasoning, BRD-style reports |
| [content-analysis-pro](content-analysis-pro/) | Content analysis — docs, images, video, structured reports |
| [data-analysis-pro](data-analysis-pro/) | Data analysis — EDA, pandas, viz, Parquet/SQLite, Excel charts & validation |
| [image-processing-pro](image-processing-pro/) | Image processing — Pillow, resize, crop, formats, compositing |
| [web-research-pro](web-research-pro/) | Web research — sources, citations, recency, stale docs |
| [market-research-pro](market-research-pro/) | Market research — TAM/SAM/SOM, competitors, ICP, positioning |
| [strategic-consulting-pro](strategic-consulting-pro/) | Strategic consulting — options, prioritization, scenarios, decision memos |
| [code-packaging-pro](code-packaging-pro/) | Code packaging — pyproject, Docker, GitHub Actions, build & publish |
| [caching-pro](caching-pro/) | Caching strategy — patterns, TTL/invalidation, consistency, observability |
| [network-infra-pro](network-infra-pro/) | Network/infra — topology, traffic, reliability, and operational diagnostics |
| [planning-pro](planning-pro/) | Planning — scope, breakdown, dependencies, estimates, and risk checkpoints |
| [algorithm-pro](algorithm-pro/) | Algorithms — deep modeling, correctness proofs, complexity, optimization |
| [feedback-pro](feedback-pro/) | Feedback — deep evidence, severity calibration, action/closure tracking |
| [auth-pro](auth-pro/) | Authentication/authorization — methods, policies, token/session lifecycle |
| [self-improve-agent-pro](self-improve-agent-pro/) | Agent self-improvement — diagnosis, iteration loops, measurable uplift |
| [git-operations-pro](git-operations-pro/) | Git — commits, branches, PRs, collaboration |
| [sql-data-access-pro](sql-data-access-pro/) | SQL data access — SQLite, safety, export, PG handoff |
| [bug-discovery-pro](bug-discovery-pro/) | Bug discovery — deep scan, GitNexus graph, candidates, impact |
| [skills-self-review-pro](skills-self-review-pro/) | Skills self-review — gap reports, authoring cross-check, `analyze_skills` |
| [repo-tooling-pro](repo-tooling-pro/) | Repo scripts — KB batch query, list/validate/analyze skills, performance |

To use with Cursor: copy or symlink a skill folder into `.cursor/skills/<name>/` (see root [`AGENTS.md`](../AGENTS.md)).
