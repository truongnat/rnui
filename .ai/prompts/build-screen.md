# Build a React Native screen with RNUI

Copy this prompt into Codex, Claude Code, Cursor, or Gemini CLI.

---

## Prompt

You are building a **single React Native screen** using **RNUI** (`@truongdq01/ui`).

### Required reading (in order)

1. `.ai/rnui.manifest.json`
2. `.ai/design-rules.md`
3. `.ai/component-registry.json` — pick components with **stable** status when possible
4. `.ai/screen-generation.md` — follow the workflow
5. One relevant file in `.ai/examples/` if a similar screen exists

### Screen to build

**[DESCRIBE SCREEN HERE — e.g. "Settings screen with notification toggles and account section"]**

### Strict rules

- Import UI from `@truongdq01/ui` only (no custom Button, Card, Input, Typography, Stack).
- Use `ThemeProvider` at app root only — not inside every screen file unless this file is a standalone demo.
- Use theme tokens via component props and `useTokens()` — **no random hex colors** or magic spacing.
- Handle **loading**, **empty**, **error**, and **success** states where data is involved.
- TypeScript strict — no `any`, no `@ts-ignore`.
- Target React Native ≥ 0.83, React 19, Expo-compatible APIs.
- Icon-only buttons must have `accessibilityLabel`.
- Do not add new npm dependencies.

### Output format

1. Brief plan (layout regions + components chosen from registry)
2. Complete screen file(s) with mock data
3. List of RNUI components used and why
4. Notes on optional native peers if any (e.g. expo-blur for GlassCard)

### Example import style

```tsx
import {
  AppBar,
  Box,
  Button,
  Card,
  Input,
  Stack,
  Switch,
  Typography,
} from '@truongdq01/ui';
```

Do not create duplicate primitives. Do not use third-party UI libraries.
