# RNUI — Claude Code instructions

This repository is **RNUI**, an AI-native React Native design system. Read the full agent guide at [`AGENTS.md`](../AGENTS.md) and the AI manifest at [`.ai/rnui.manifest.json`](../.ai/rnui.manifest.json).

## Quick rules

- RNUI is a React Native design system and UI kit.
- Always prefer existing RNUI components before creating new custom components.
- Never inline random colors, spacing, radius, or shadows — use tokens/theme.
- Use `ThemeProvider` from `@truongdq01/headless` or `@truongdq01/ui`.
- Use components from `@truongdq01/ui`.
- Keep screens clean, mobile-first, accessible, and production-like.
- Do not add new dependencies unless truly necessary.
- Do not create duplicate components if RNUI already has one.
- Do not modify package public APIs unless explicitly requested.
- Generated code must pass TypeScript and target Expo / React Native ≥ 0.83.

## Preferred imports

```tsx
import { ThemeProvider, Button, Card, Input, Stack, Typography } from '@truongdq01/ui';
```

## AI metadata

| Path | Purpose |
| ---- | ------- |
| `.ai/rnui.manifest.json` | Entrypoint |
| `.ai/component-registry.json` | Component catalog |
| `.ai/package-map.json` | Package boundaries |
| `.ai/design-rules.md` | Layout and styling rules |
| `.ai/screen-generation.md` | Screen workflow |
| `.ai/prompts/` | Copyable prompts |
| `.ai/examples/` | Reference screens |

## Package boundaries

- **tokens** — design values only
- **headless** — logic, state, accessibility, theme
- **ui** — styled components
- **themes** — brand presets
- **example** — showcase app
- **docs** — documentation

## Before finishing

```bash
bun run ai:check && bun run typecheck && bun run lint
```

Do not commit or push unless the user asks.
