# AI Render Core — Summary

Date: 2026-05-24  
Branch: `develop`

## What shipped

Extended `@truongdq01/renderer` into **AI Render Core**: validated `ScreenSchema` → RNUI preview + lazy-load plan + TSX export. No chat UI, no AI APIs, no drag-and-drop.

## Files added/changed

### New

| Path | Purpose |
| ---- | ------- |
| `packages/renderer/src/propGuards.ts` | Safe prop filtering via component-schema metadata |
| `packages/renderer/src/componentMap.ts` | Sync MVP component map |
| `packages/renderer/src/lazyComponentMap.ts` | Dynamic import loaders |
| `packages/renderer/src/RNUISchemaRenderer.tsx` | Main preview component + aliases |
| `packages/renderer/src/validation-panel.tsx` | RNUI Card/Alert validation errors |
| `apps/example/app/components/AIRenderer.tsx` | Example “AI Render Preview” screen |
| `docs/src/content/docs/guides/ai-renderer.md` | Public docs |
| `.planning/ai-render-core-investigation.md` | Investigation notes |
| `.planning/ai-render-followups.md` | Deferred work |

### Updated

- `packages/renderer/src/*` — resolve-props, render-node, export-tsx, types, index, web-preview, tests
- `apps/example/package.json`, `apps/example/app/index.tsx`
- `docs/astro.config.mjs`, `docs/.../component-schema.md`

## Renderer API

| Export | Role |
| ------ | ---- |
| `RNUISchemaRenderer` | Validate + render preview (or error panel) |
| `renderSchemaToElement` | Imperative element factory |
| `renderNode` / `RenderSchemaNode` | Recursive node renderer |
| `validateBeforeRender` | Validate + lazy plan |
| `createDefaultComponentMap` | Sync MVP map |
| `createLazyComponentMap` | Web builder lazy loaders |
| `createLazyLoadPlan` | Alias for `getLazyLoadPlan` |
| `exportSchemaToTsx` | Alias for `exportScreenSchemaToTsx` |
| `guardNodeProps` | Prop guard utility |

Legacy: `ScreenSchemaRenderer`, `prepareScreenRender`, `exportScreenSchemaToTsx`.

### Main component

```tsx
<RNUISchemaRenderer
  schema={schema}
  mode="preview"
  onAction={(action) => {}}
  requireWebPreview={false}
/>
```

## Supported components (MVP)

Screen (→ Stack), Stack, Box, Card, Paper, Typography, Button, Input, TextField, Badge, Chip, Alert, Avatar, Divider, Switch, Checkbox.

## Validation behavior

- Runs `validateScreenSchema` before render
- Invalid schema → `SchemaValidationPanel` (Card + Alert + error paths) — no throw in preview
- `requireWebPreview: true` by default; example app uses `false` for native flexibility

## Lazy-load plan

- `createLazyLoadPlan(schema)` returns unique component types + import metadata
- `loadComponentsForPlan` resolves dynamic imports for future web builder code-splitting
- Example app displays unique types; static map used for native preview

## TSX export

- Deterministic imports from `@truongdq01/ui`
- Actions → `handleX` TODO stubs
- Native-only nodes → JSX comments
- String children from props or node children

## Example screen

`apps/example/app/components/AIRenderer.tsx` — list entry **AIRenderer** (“AI Render Preview”)

## Docs

- [AI Render Core](/guides/ai-renderer/) — new guide
- Component schema doc cross-linked

## Tests added

21 tests in `packages/renderer/src/__tests__/renderer.test.ts`:

- Prop guards, action objects, Button label mapping
- Invalid schema rejection, lazy plan uniqueness
- TSX export, native-only comments, string children
- `shouldWrapStringChild` for layout safety

## Commands run

```bash
bun install          # pass
bun run build        # pass
bun run typecheck    # pass
bun run lint         # pass (after biome format on renderer)
bun run test         # pass
bun run docs:build   # pass
bun run component-schema:check  # pass
bun run ai:check     # pass
bun run surface:audit # pass
```

## Known limitations

- No chat UI, real AI, drag-and-drop, or props inspector
- Native-only components show fallback placeholders only
- Web builder still uses direct `RenderSchemaNode` (follow-up)
- `strict` prop on renderer reserved, not fully enforced on warnings
- RN JSX component tests limited in bun

## Next phase recommendation

Wire `apps/web/builder` to `RNUISchemaRenderer` + `onAction`, add mock-AI schema repair loop, and optional Vite lazy loading via `loadComponentsForPlan` — still without real LLM APIs.

See `.planning/ai-render-followups.md`.
