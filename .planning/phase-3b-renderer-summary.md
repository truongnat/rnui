# Phase 3B — ScreenSchema Renderer

**Status:** Complete  
**Branch:** `develop`  
**Date:** 2026-05-24

## Goal

Turn validated `ScreenSchema` JSON into RNUI component trees — lazy-load map, runtime render, TSX export. **No builder UI** (Phase 3C).

## Package added

**`@truongdq01/renderer`** (`packages/renderer/`)

| Module | Purpose |
| ------ | ------- |
| `prepareScreenRender()` | Validate schema + return lazy-load plan |
| `createDefaultComponentMap()` | Sync map of 16 web-preview components |
| `createLazyComponentMap()` | Dynamic `import('@truongdq01/ui')` loaders |
| `loadComponentsForPlan()` | Resolve lazy map from plan |
| `resolveNodeRender()` | Screen → Stack, action → onPress, children props |
| `RenderSchemaNode` | Recursive schema → React tree |
| `ScreenSchemaRenderer` | Validated render entry |
| `WebPreviewHost` | ThemeProvider + flex container (react-native-web target) |
| `exportScreenSchemaToTsx()` | Generate `.tsx` source from schema |

## Dependencies

- **Depends on:** `@truongdq01/component-schema`
- **Peers:** `@truongdq01/ui`, `@truongdq01/headless`, `react`, `react-native`, `react-native-web` (optional)

## Render flow

```text
ScreenSchema
  → prepareScreenRender({ requireWebPreview: true })
  → getLazyLoadPlan() (via component-schema)
  → createDefaultComponentMap() | loadComponentsForPlan()
  → RenderSchemaNode / ScreenSchemaRenderer
  → exportScreenSchemaToTsx() (optional)
```

## Virtual Screen mapping

`Screen` → `<Stack spacing={…} style={{ flex: 1, padding: N }}>`  
Padding: `none=0`, `sm=12`, `md=16`, `lg=24`.

## Action props

Schema `action: "signIn"` on Button → runtime `onPress` via `actions` prop; TSX export generates `handleSignIn` stubs.

## Native-only placeholder

Components with `webPreview: false` render a dashed message instead of crashing preview.

## Docs

- `docs/src/content/docs/guides/screen-renderer.md`
- Updated `.ai/screen-schema-guide.md`, `component-schema.md`, `rnui.manifest.json`

## Tests

10 tests in `packages/renderer/src/__tests__/renderer.test.ts` (pure modules — no full RN mount in bun).

## Commands run

```bash
bun install
bun run build
bun run typecheck
bun run lint
bun run test
bun run docs:build
```

## Known limitations

- No live react-native-web demo app yet — `WebPreviewHost` requires bundler alias setup
- TSX export uses simplified prop formatting (no stateful form wiring)
- Switch `on` in schema exported as boolean prop, not full controlled-state boilerplate
- `ScreenSchemaRenderer` tests skipped in bun due to RN flow parse (integration tests deferred to Phase 3C app)

## Next: Phase 3C

`apps/web/builder`:

- Chat panel (AI generates ScreenSchema)
- Preview panel (`WebPreviewHost`)
- Schema / code panel (`exportScreenSchemaToTsx`)
- Repair loop UI (validation errors → AI)
