# Phase 3C — Web Builder MVP Summary

**Status:** Complete  
**Branch:** `develop`  
**Date:** 2026-05-24

## App path

`apps/web` — package `@truongdq01/web` (Next.js 15)

```bash
bun run web:dev      # http://localhost:3000/builder
bun run web:build
```

Legacy Vite app `apps/web/builder` removed; root `builder:dev` aliases to `web:dev`.

## Routes

| Route | Description |
| ----- | ----------- |
| `/` | Placeholder landing with link to builder |
| `/builder` | Three-panel MVP |

## Builder flow

1. User enters prompt → **Generate**
2. `MockAIProvider.generateSchema()` returns example ScreenSchema
3. `validateScreenSchema` + `getLazyLoadPlan` update state
4. **WebPreviewHost** renders RNUI preview in phone frame
5. User can **Validate**, **Export TSX**, **Repair schema**, **Reset**
6. Manual JSON edits in Schema tab → Validate

## Mock AI behavior

- Keyword routing: login, settings, profile, dashboard, form
- Default: **dashboard**
- `invalid` / `repair` → broken schema for repair-loop demo
- `repairSchema()` → login template replacement
- `AIProvider` interface ready for real API swap

## React Native Web config

- Next.js webpack: `react-native` → `react-native-web`
- Native mocks (reanimated, gesture-handler, worklets, etc.)
- `transpilePackages` for workspace packages
- Slim `previewComponentMap` (16 MVP components)
- `__DEV__` defined for RN branches

## Preview behavior

- Phone shell (~390px wide, 680–760px min height)
- `WebPreviewHost` always mounted — invalid schema shows renderer validation panel
- Action log for button `onAction` / legacy action map
- Disclaimer about RN Web approximation

## Schema editor

- Textarea JSON (pretty-printed)
- Validate parses JSON safely (no crash on invalid)
- Tabs: Schema JSON, Validation, Export TSX, Lazy-load plan
- Copy schema / Copy TSX (clipboard with graceful fallback)

## TSX export

- `exportSchemaToTsx` from `@truongdq01/renderer`
- Read-only TSX tab + Export TSX button
- TODO handler stubs in output

## Tests

`apps/web/src/__tests__/builder.test.ts` — mock provider routing, invalid JSON handling, TSX export guard.

## Commands run

```bash
bun install
bun run build
bun run typecheck
bun run lint
bun run test
cd apps/web && bun run build
bun run docs:build
bun run component-schema:check
bun run ai:check
```

## Known limitations

- Mock AI only
- No Monaco, drag-and-drop, auth, or code execution
- Native-only components show renderer fallbacks
- Webpack mode required (`next dev --webpack`)

## Next phase

Real `AIProvider` implementation + optional streaming — see `.planning/phase-3c-web-builder-followups.md`.
