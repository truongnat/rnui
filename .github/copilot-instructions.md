# GitHub Copilot — RNUI instructions

RNUI is an **AI-native React Native design system**. Copilot should generate code that uses RNUI correctly.

## Entrypoint

Start from [`.ai/rnui.manifest.json`](../.ai/rnui.manifest.json), then [`.ai/component-registry.json`](../.ai/component-registry.json) and [`.ai/design-rules.md`](../.ai/design-rules.md).

## Rules

1. RNUI is a React Native design system and UI kit.
2. Always prefer existing RNUI components before creating custom components.
3. Never inline random colors, spacing, radius, or shadows — use theme tokens.
4. Use `ThemeProvider` from `@truongdq01/headless` or `@truongdq01/ui`.
5. Import components from `@truongdq01/ui`.
6. Keep screens clean, mobile-first, accessible, and production-like.
7. Do not add new dependencies unless truly necessary.
8. Do not duplicate Button, Card, Input, Typography, Stack, or other RNUI primitives.
9. Do not modify package public APIs unless explicitly requested.
10. Generated code must pass TypeScript and target Expo / React Native ≥ 0.83, React ≥ 19.

## Preferred import style

```tsx
import { ThemeProvider, Button, Card, Input, Stack, Typography } from '@truongdq01/ui';
```

## Package boundaries

- `@truongdq01/tokens` — design values only
- `@truongdq01/headless` — theme, hooks, accessibility, logic
- `@truongdq01/ui` — styled components
- `@truongdq01/themes` — brand presets
- `apps/example` — showcases
- `docs` — documentation

## Examples and prompts

- Reference screens: [`.ai/examples/`](../.ai/examples/)
- Prompt templates: [`.ai/prompts/`](../.ai/prompts/)
- Full agent guide: [`AGENTS.md`](../AGENTS.md)

## Anti-patterns

- Custom Button/Card/Input when RNUI exports them
- Hardcoded `#RRGGBB` colors
- One giant component with all inline styles
- Unsupported third-party UI libraries without approval
