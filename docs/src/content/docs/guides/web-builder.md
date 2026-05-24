---
title: Web builder (Phase 3C)
description: Next.js ScreenSchema builder — mock chat, RN Web preview, validation, TSX export
---

Phase 3C ships **`apps/web`** (`@truongdq01/web`) — a Next.js app with a `/builder` route for iterating on `ScreenSchema` JSON before wiring a real AI API.

## Run locally

```bash
bun install
bun run build          # build workspace packages first
bun run web:dev        # http://localhost:3000/builder
```

From the app directory:

```bash
cd apps/web
bun run dev
```

Production build:

```bash
bun run web:build
# or: cd apps/web && bun run build
```

Routes:

| Route | Purpose |
| ----- | ------- |
| `/` | Minimal placeholder landing |
| `/builder` | Main MVP — chat, preview, schema/code panels |

## Layout

| Panel | Purpose |
| ----- | ------- |
| **Chat** | Mock AI prompts → generates ScreenSchema from templates |
| **Preview** | Phone frame + `WebPreviewHost` (react-native-web) |
| **Schema & Code** | JSON editor, validation, TSX export, lazy-load plan |

## Flow

```text
prompt → MockAIProvider.generateSchema()
      → validateScreenSchema()
      → WebPreviewHost / RNUISchemaRenderer
      → exportSchemaToTsx()
```

Repair loop: **Repair schema** (chat) or edit JSON → **Validate** → preview updates.

## Mock AI (MVP only)

No external AI API. Keyword routing:

| Prompt keywords | Schema |
| --------------- | ------ |
| login / sign-in | Login |
| settings / notifications | Settings |
| profile / avatar | Profile card |
| dashboard / stats | Dashboard |
| form / submit | Contact form |
| *(default)* | Dashboard |
| invalid / repair | Broken schema for repair testing |

`repairSchema()` replaces invalid schemas with the login template for MVP repair-loop demos.

## React Native Web notes

The builder configures Next.js webpack aliases:

- `react-native` → `react-native-web`
- Mocks for Reanimated, Gesture Handler, Worklets, FlashList, expo-blur, etc.
- Slim RNUI component map (16 web-preview MVP components)
- `TextField` web stub wrapping `Input`

**Disclaimer shown in preview:** Web preview approximates React Native rendering. Verify final UI in the iOS/Android example app.

Native-only components (Modal, BottomSheet, etc.) render fallback placeholders — they are not polyfilled in this phase.

## MVP limitations

- Mock AI only — no OpenAI/Anthropic/Gemini
- Textarea JSON editor (no Monaco)
- No auth, persistence, drag-and-drop, or props inspector
- Does not execute generated TSX at runtime
- No streaming chat

## Related

- [AI Render Core](/guides/ai-renderer/)
- [Component schema](/guides/component-schema/)

## Next steps

See `.planning/phase-3c-web-builder-followups.md` — real AI provider, project persistence, Playwright E2E, Vite lazy imports via `loadComponentsForPlan`.
