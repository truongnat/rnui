# Build a React Native screen with RNUI

Copy this prompt into Codex, Claude Code, Cursor, or Gemini CLI.

---

## Prompt

You are building a **single React Native screen** using **RNUI** — a shadcn-style registry. Components live in the app under `components/ui/` and are imported per-file from `@/components/ui/<kebab>`.

### Required reading (in order)

1. `.ai/rnui.manifest.json`
2. `.ai/design-rules.md`
3. `.ai/component-registry.json` — pick components from the registry catalog
4. `.ai/screen-generation.md` — follow the workflow
5. One relevant file in `.ai/examples/` if a similar screen exists

### Screen to build

**[DESCRIBE SCREEN HERE — e.g. "Settings screen with notification toggles and account section"]**

### Strict rules

- Import UI per-file from `@/components/ui/<kebab>` only (no custom Button, Card, Input, Text, Stack).
- Theming comes from CSS variables + semantic Tailwind classes (`bg-background`, `text-muted-foreground`) via the registry `theme` item — there is no `ThemeProvider` to wrap.
- **No random hex colors** or magic spacing; use variants, `spacing` tokens, and utility classes.
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
import { AppBar, AppBarTitle } from '@/components/ui/app-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Stack } from '@/components/ui/stack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
```

Do not create duplicate primitives. Do not use third-party UI libraries.
