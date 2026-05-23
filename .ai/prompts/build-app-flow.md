# Build a multi-screen app flow with RNUI

Copy this prompt into your AI coding agent.

---

## Prompt

You are designing a **multi-screen React Native app flow** using **RNUI**.

### Required reading

1. `.ai/rnui.manifest.json`
2. `.ai/package-map.json`
3. `.ai/component-registry.json`
4. `.ai/design-rules.md`
5. `.ai/screen-generation.md`
6. `.ai/examples/` for per-screen patterns

### App flow to build

**[DESCRIBE FLOW HERE — e.g. "Onboarding → Login → Home dashboard → Settings → Profile edit"]**

List each screen:

| Screen | Purpose | Key components |
| ------ | ------- | -------------- |
| | | |

### Strict rules

- One `ThemeProvider` at app root (`@truongdq01/ui` or `@truongdq01/headless`).
- Every screen uses RNUI components from the registry — no custom design system.
- Consistent layout: `AppBar` + body `Stack` + footer actions where needed.
- Shared patterns: same spacing scale, same button variants for primary actions.
- Navigation: use the project's existing router (Expo Router / React Navigation) — do not invent a new navigator library.
- Each screen handles loading / empty / error states for its data.
- TypeScript strict; no new dependencies without approval.
- Respect package boundaries — app code in `apps/`, not in `packages/ui`.

### Deliverables

1. Screen list with component choices per screen
2. File structure (paths under `app/` or `src/screens/`)
3. Implementation for each screen (or staged plan if too large)
4. Shared types/mock data module
5. Checklist against `.ai/design-rules.md` anti-patterns

### Primary import

```tsx
import { ThemeProvider, Button, Stack, Typography } from '@truongdq01/ui';
```

Do not duplicate RNUI primitives. Do not hardcode colors.
