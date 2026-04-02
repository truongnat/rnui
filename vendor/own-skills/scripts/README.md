# Scripts (repo tooling)

All runtime tooling is now implemented in TypeScript and compiled to `dist/tools.js`.

## Primary entrypoints

- Install/uninstall bundle CLI: `node dist/own-skills.js` (or `npx github:truongnat/skills`).
- Tool command runner: `node dist/tools.js <command> ...`.

## Command map

| Command | Purpose |
|---|---|
| `node dist/tools.js list-skills [--json]` | Inventory bundled skills |
| `node dist/tools.js validate-skills` | Validate SKILL frontmatter `name` vs folder |
| `node dist/tools.js analyze-skills [--markdown --only-actionable]` | Skill gap heuristics report |
| `node dist/tools.js build-skill-index [--with-embeddings]` | Build `skill_index.json` (+ optional embeddings) |
| `node dist/tools.js install-skill <path> [--project-dir ...] [--all-ides]` | Install one skill into target project |
| `node dist/tools.js verify-bundle-install [--project-dir ...]` | Verify full bundle installation |
| `node dist/tools.js build-kb` | Build KB embeddings + manifest |
| `node dist/tools.js query-kb "..." -k 5` | Query KB (single query) |
| `node dist/tools.js query-kb-batch -q "..." -q "..."` | Query KB for multiple prompts |
| `node dist/tools.js verify-kb` | Verify KB artifacts |

## npm aliases

`package.json` exposes shortcuts:

- `npm run list-skills`
- `npm run validate-skills`
- `npm run analyze-skills`
- `npm run build-skill-index`
- `npm run install-skill`
- `npm run verify-bundle-install`
- `npm run build-kb`
- `npm run query-kb`
- `npm run query-kb-batch`
- `npm run verify-kb`

## Build

```bash
npm install
npm run build
```

For agent-oriented guidance on usage strategy, see bundled skills `repo-tooling-pro` and `skills-self-review-pro`.
