# RNUI — AI agent instructions

RNUI is a **React Native design system and UI kit**. When working in this repository or generating app code that consumes RNUI, follow these rules.

## Start here

1. Read [`.ai/rnui.manifest.json`](.ai/rnui.manifest.json) — top-level AI entrypoint.
2. Pick components from [`.ai/component-registry.json`](.ai/component-registry.json).
3. Follow layout and styling rules in [`.ai/design-rules.md`](.ai/design-rules.md).
4. Use screen patterns from [`.ai/screen-generation.md`](.ai/screen-generation.md) and [`.ai/examples/`](.ai/examples/).
5. Copy/adapt prompts from [`.ai/prompts/`](.ai/prompts/) when the user asks for generation workflows.

## Core principles

- **Prefer existing RNUI components** before creating custom UI.
- **Never inline random colors, spacing, radius, or shadows.** Use theme tokens via `useTheme()` / `useTokens()` from `@truongdq01/headless`, or component props that map to tokens.
- **Use `ThemeProvider`** from `@truongdq01/headless` or `@truongdq01/ui` at the app root (once). Pass `withGestureRoot={false}` only if the app already wraps `GestureHandlerRootView`.
- **Import styled components from `@truongdq01/ui`.**
- Keep screens **clean, mobile-first, accessible, and production-like**.
- **Do not add new dependencies** unless truly necessary and approved.
- **Do not duplicate components** if RNUI already exports one (Button, Card, Input, Typography, Stack, etc.).
- **Do not modify package public APIs** unless explicitly requested.
- Generated code **must pass TypeScript** and run in **Expo / React Native ≥ 0.83** with **React ≥ 19**.

## Preferred import style

```tsx
import {
  ThemeProvider,
  Button,
  Card,
  Input,
  Stack,
  Box,
  Typography,
} from '@truongdq01/ui';
```

Hooks and theme utilities may also come from `@truongdq01/headless`:

```tsx
import { useTheme, useTokens, useToast } from '@truongdq01/headless';
```

Brand presets (optional):

```tsx
import { defaultTheme } from '@truongdq01/themes';
```

## Package boundaries

| Package | Responsibility | Use for |
| ------- | -------------- | ------- |
| `@truongdq01/tokens` | Design values only (primitive, semantic, component, motion) | Token definitions, low-level design math |
| `@truongdq01/headless` | Logic, state, accessibility, theme, motion hooks | `ThemeProvider`, `useTheme`, behavior hooks |
| `@truongdq01/ui` | Styled React Native components | All UI in app screens |
| `@truongdq01/themes` | Brand theme presets | Pre-built brand color sets |
| `apps/example` | Showcase and usage demos | Reference implementations |
| `docs` | Human + AI documentation | Starlight docs site |

**Do not:**

- Put styled UI in `tokens` or `headless`.
- Import app code into library packages.
- Bundle native modules into `@truongdq01/ui` (they are peers).

## Component selection

1. Check `.ai/component-registry.json` for name, status, and `usageHints`.
2. Prefer **stable** components for production screens.
3. Use **beta** / **experimental** only when needed; read `avoid` and optional peer notes.
4. See [component status](docs/src/content/docs/components/status.md) for maturity notes.

## Code quality

- TypeScript strict — no `any`, no `@ts-ignore`, no eslint-disable.
- Icon-only controls need `accessibilityLabel`.
- Touch targets ≥ 44px (use Button sizes or padding via tokens).
- Support dark mode through theme — no hardcoded light-only hex colors.
- Separate screen composition from business logic (hooks/services for data).

## When generating screens

Follow `.ai/screen-generation.md`:

1. Understand purpose.
2. Pick layout primitives (`Stack`, `Box`, `Grid`).
3. Pick RNUI components from the registry.
4. Handle loading, empty, error, and success states.
5. Compose, then add accessibility and spacing.
6. Use mock data in examples; wire real APIs in app code.

## Prompt templates

| File | Use when |
| ---- | -------- |
| `.ai/prompts/build-screen.md` | Single screen |
| `.ai/prompts/build-app-flow.md` | Multi-screen flow |
| `.ai/prompts/add-component-doc.md` | Document a component |
| `.ai/prompts/review-rnui-usage.md` | Audit RNUI usage |
| `.ai/prompts/refactor-to-rnui.md` | Migrate custom UI to RNUI |

## Validation

```bash
bun run ai:check      # verify AI metadata files exist
bun run typecheck
bun run lint
bun run build
```

## Forbidden patterns

- Random hex colors (`#3B82F6`) instead of theme semantic colors.
- Custom `Button` / `Card` / `Input` when RNUI exports them.
- Giant single-file screens with all styles inline.
- New UI libraries (NativeBase, Paper, Tamagui, etc.) without explicit approval.
- Breaking changes to exported component props without a changeset and docs update.
