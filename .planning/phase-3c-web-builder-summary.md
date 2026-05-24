# Phase 3C — Web Builder MVP

**Status:** Complete  
**Branch:** `develop`  
**Date:** 2026-05-24

## Goal

Ship `apps/web/builder` — three-panel UI for ScreenSchema iteration: mock chat, live preview, schema/code + repair loop. **No real AI API** in this phase.

## App location

`apps/web/builder` (`@truongdq01/builder`, private)

```bash
bun run builder:dev
bun run builder:build
```

## Panels

| Panel | Implementation |
| ----- | -------------- |
| Chat | `generateMockSchema()` — keyword → example schema |
| Preview | `ThemeProvider` + `RenderSchemaNode` + slim component map |
| Schema & Code | JSON editor, validation tab, read-only TSX export |

## Stack

- Vite 6 + React 19 + TypeScript
- react-native-web (RNUI preview)
- Workspace deps: `@truongdq01/component-schema`, `@truongdq01/renderer`, `@truongdq01/ui`, `@truongdq01/headless`, `@truongdq01/tokens`
- Native module mocks (Reanimated, Gesture Handler, Worklets, DateTimePicker, FlashList, expo-blur)
- `lucide-react` aliased as `lucide-react-native` for Icon web support
- Slim component imports + TextField web stub

## Renderer tweak

- `WebPreviewHost` accepts `withGestureRoot?: boolean` (default `false` for web)

## Repair loop UX

1. Chat generates schema (or user edits JSON)
2. Validate → errors in Validation tab
3. Invalid schema blocks preview
4. "Invalid demo" preset injects broken schema for testing

## Docs

- `docs/src/content/docs/guides/web-builder.md`
- Root scripts: `builder:dev`, `builder:build`
- Workspaces: `apps/web/*`

## Verification

```bash
bun install
bun run build
cd apps/web/builder && bun run build   # OK
```

## Known limitations

- Mock AI only — no OpenAI/Anthropic integration
- Preview uses web stubs for TextField (no Select mode)
- Reanimated/gesture mocks — press animations simplified on web
- Builder not in turbo `typecheck` yet (standalone `tsc`)
- No auth, persistence, or deploy config

## Next phase ideas

- Real AI API + schema repair prompt
- Save/load projects
- Deploy builder to static hosting
- E2E tests with Playwright
