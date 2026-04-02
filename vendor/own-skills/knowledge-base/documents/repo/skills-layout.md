| Field | Value |
|-------|-------|
| title | Skills directory layout |
| summary | Flat `skills/` tree: one folder per bundled skill plus `examples/skill-template` |
| tags | repo, skills, convention |
| updated | 2026-04-01 |

# Skills directory layout (current)

All skills live directly under **`skills/`**. There is no `public/` vs `private/` split; add sensitive skills in a private fork or `.gitignore` if needed.

**Maintenance:** When bundled skills change, update this file in the **same change** as `skills/README.md` — see `skills/SKILL_AUTHORING_RULES.md` §8.

```
skills/
  README.md
  SKILL_AUTHORING_RULES.md
  examples/
    skill-template/
  react-pro/
  nextjs-pro/
  react-native-pro/
  flutter-pro/
  javascript-pro/
  performance-tuning-pro/
  clean-code-architecture-pro/
  cli-pro/
  api-design-pro/
  graphql-pro/
  websocket-pro/
  microservices-pro/
  stream-rtc-pro/
  nestjs-pro/
  postgresql-pro/
  sql-data-access-pro/
  testing-pro/
  security-pro/
  electron-pro/
  tauri-pro/
  deployment-pro/
  seo-pro/
  design-system-pro/
  mobile-design-pro/
  business-analysis-pro/
  content-analysis-pro/
  data-analysis-pro/
  image-processing-pro/
  web-research-pro/
  market-research-pro/
  strategic-consulting-pro/
  code-packaging-pro/
  caching-pro/
  network-infra-pro/
  planning-pro/
  algorithm-pro/
  feedback-pro/
  auth-pro/
  self-improve-agent-pro/
  git-operations-pro/
  bug-discovery-pro/
  skills-self-review-pro/
  repo-tooling-pro/
```

Each skill requires **`SKILL.md`** with YAML frontmatter (`name`, `description`, optional `metadata.short-description`). Optional folders: `references/`, `scripts/`, `assets/`.

Cross-references between skills use sibling paths, e.g. from `nestjs-pro` to PostgreSQL RLS docs: `../postgresql-pro/references/row-level-security.md`.

For Cursor: copy or symlink `skills/<name>/` to `.cursor/skills/<name>/` (see project `AGENTS.md`).
