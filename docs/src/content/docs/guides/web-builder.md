---
title: Web builder (Phase 3C)
description: RNUI ScreenSchema builder — mock chat, live preview, schema repair loop
---

Phase 3C adds **`apps/web/builder`** — a Vite + react-native-web app for iterating on `ScreenSchema` JSON before wiring a real AI API.

## Run locally

```bash
bun install
bun run build          # build packages first
bun run builder:dev    # http://localhost:5173
```

Production build:

```bash
bun run builder:build
```

## Layout

| Panel | Purpose |
| ----- | ------- |
| **Chat** | Mock AI prompts → generates ScreenSchema from templates |
| **Preview** | Live RNUI render via `RenderSchemaNode` + react-native-web |
| **Schema & Code** | Edit JSON, validate, view TSX export |

## Mock AI (MVP)

No external AI API in this phase. Prompt keywords map to example schemas:

- login / sign-in
- settings / notifications
- profile / avatar
- dashboard / stats
- form / submit
- **invalid** — intentional broken schema for repair-loop testing

## Repair loop

1. Generate or edit schema JSON
2. Click **Validate** (or generate from chat)
3. Fix errors listed in **Validation** tab
4. Preview unlocks when schema is valid

## Web stack notes

The builder uses:

- `react-native` → `react-native-web` alias
- Mocks for Reanimated, Gesture Handler, Worklets, native-only modules
- Slim UI imports (16 web-preview components) — avoids full `@truongdq01/ui` barrel
- `TextField` web stub wrapping `Input` (skips Select/BottomSheet native deps)

## Next steps

- Wire real AI API (schema-only generation + repair)
- Persist projects / export to repo
- Share preview URL / embed

See also: [Component schema](/guides/component-schema/), [Screen renderer](/guides/screen-renderer/).
