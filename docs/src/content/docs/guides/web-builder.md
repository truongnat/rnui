---
title: Web builder (Phase 3D)
description: Next.js ScreenSchema builder — polished templates, RN Web preview, validation, TSX export
---

Phase 3D extends **`apps/web`** (`@truongdq01/web`) — a Next.js app with a `/builder` route for iterating on production-quality `ScreenSchema` JSON before wiring a real AI API.

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
| `/builder` | Main builder — templates, preview, schema/code panels |

## Layout

| Panel | Purpose |
| ----- | ------- |
| **Chat** | Template chips (instant load) + mock AI prompts |
| **Preview** | Device frame + `WebPreviewHost` (react-native-web, light theme) |
| **Schema & Code** | JSON editor, validation, TSX export, lazy-load plan |

## Preview quality (Phase 3D)

- **Light theme by default** — preview ignores OS dark mode so inputs and surfaces match the phone canvas.
- **RNUI app background** — `WebPreviewHost` sets `color.bg.default` on the preview canvas.
- **Polished device frame** — lighter bezel, dynamic island, scrollable inner screen (~390×760px).
- **Template schemas** — login, dashboard, settings, profile, and form fixtures use Card/Paper, hierarchy, and spacing.

**Disclaimer shown in preview:** Web preview approximates React Native rendering. Verify final UI in the iOS/Android example app.

## Template chips

Click a chip to **load the schema immediately** (no mock AI delay):

| Chip | Schema |
| ---- | ------ |
| Login | Card-wrapped sign-in form |
| Dashboard | Greeting, stats, chips, activity |
| Settings | Profile + preferences + sign out |
| Profile Card | Avatar, stats, actions |
| Contact Form | Card form with labeled inputs |

## Mock AI (MVP only)

No external AI API. Keyword routing when using the chat form:

| Prompt keywords | Schema |
| --------------- | ------ |
| login / sign-in | Login |
| settings / notifications | Settings |
| profile / avatar | Profile card |
| dashboard / home / stats | Dashboard |
| form / submit / payment / checkout | Contact form |
| *(default)* | Dashboard |
| invalid / repair | Broken schema for repair testing |

### Recommended prompts

- `Build a polished login screen using Card, Typography, Input, and Button.`
- `Build a settings screen using profile card, preference rows, and switches.`

`repairSchema()` replaces invalid schemas with the login template for repair-loop demos.

## Schema template guidance

Good ScreenSchema screens for AI/mock generation:

1. **Screen root** with `padding` + `spacing` — avoid empty flat lists.
2. **Card or Paper** to group related content (forms, settings rows).
3. **Typography hierarchy** — h3/h4 title + body2 subtitle before fields.
4. **webPreview-safe components only** — see [component schema](/guides/component-schema/).
5. **No inline style props** — use component props and token-backed variants.

Fixtures live in `.ai/examples/schemas/*.json` and `@truongdq01/component-schema` examples.

## Flow

```text
template chip / prompt → MockAIProvider.generateSchema()
                      → validateScreenSchema()
                      → WebPreviewHost (colorScheme: light)
                      → exportSchemaToTsx()
```

Repair loop: **Repair schema** (chat) or edit JSON → **Validate** → preview updates.

## React Native Web notes

The builder configures Next.js webpack aliases:

- `react-native` → `react-native-web`
- Mocks for Reanimated, Gesture Handler, Worklets, FlashList, expo-blur, etc.
- Slim RNUI component map (17 web-preview MVP components)
- `TextField` web stub wrapping `Input`

Native-only components (Modal, BottomSheet, etc.) render fallback placeholders — they are not polyfilled in this phase.

## Web preview limitations

- Gesture-driven press feedback is mocked — buttons may not animate on web.
- Reanimated-driven input focus rings are approximated.
- Not a pixel-perfect substitute for iOS/Android — always verify in `apps/example`.
- Generated TSX is **not executed** in the builder.

## MVP limitations

- Mock AI only — no OpenAI/Anthropic/Gemini
- Textarea JSON editor (no Monaco)
- No auth, persistence, drag-and-drop, or props inspector

## Related

- [ScreenSchema renderer](/guides/screen-renderer/)
- [AI Render Core](/guides/ai-renderer/)
- [Component schema](/guides/component-schema/)

## Next steps

See `.planning/phase-3d-preview-quality-followups.md` — real AI provider, theme toggle in builder, Playwright E2E.
