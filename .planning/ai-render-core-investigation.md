# AI Render Core — Investigation

Date: 2026-05-24  
Branch: `develop`

## Goal

Build the rendering layer that takes a validated `ScreenSchema` and renders a live RNUI preview + TSX export — foundation for the web chat builder (not built in this phase).

## Existing schema capabilities

**Package:** `@truongdq01/component-schema`

| Capability | Status |
| ---------- | ------ |
| `ComponentSchema` registry (77 components) | ✅ |
| Web-preview subset (`web-preview.ts`) | ✅ 16 MVP components |
| Native-only metadata + reasons | ✅ |
| `validateScreenSchema` / `validateComponentProps` | ✅ |
| Dangerous key rejection in validation | ✅ |
| `getLazyLoadPlan` / `getSchemaComponentTypes` | ✅ |
| Example fixtures (`examples.ts` + `.ai/examples/schemas/*.json`) | ✅ Login, Settings, Profile, Dashboard, Form |
| Generated JSON (`.ai/generated/component-schema.json`) | ✅ |

## Web-preview safe MVP components

From `web-preview-components.json` / `createDefaultComponentMap`:

Screen (virtual → Stack), Stack, Box, Card, Paper, Typography, Button, Input, TextField, Badge, Chip, Alert, Avatar, Divider, Switch, Checkbox.

## Renderer status before this phase

Phase 3B already shipped `@truongdq01/renderer` with:

- `ScreenSchemaRenderer`, `RenderSchemaNode`, `WebPreviewHost`
- `prepareScreenRender`, `createDefaultComponentMap`, `createLazyComponentMap`
- `exportScreenSchemaToTsx`
- Basic tests (resolve props, export, lazy plan)
- Web builder (`apps/web/builder`) using `RenderSchemaNode` directly

**Gaps vs AI Render Core spec:**

| Gap | Resolution |
| --- | ---------- |
| Public name `RNUISchemaRenderer` | Added + legacy alias |
| `propGuards.ts` safe prop filtering | Added |
| Split `componentMap.ts` / `lazyComponentMap.ts` | Extracted from `component-loader.ts` |
| Action object `{ type: "event", name }` + `onAction` | Added in `resolve-props.ts` |
| RNUI validation error panel | `SchemaValidationPanel` |
| Native-only fallback message + reason | Updated `render-node.tsx` |
| Layout raw string → Typography wrap | `shouldWrapStringChild` + render logic |
| `validateBeforeRender`, `exportSchemaToTsx` aliases | Added |
| Example app screen | `apps/example/app/components/AIRenderer.tsx` |
| Dedicated docs | `guides/ai-renderer.md` |

## Missing / deferred

- Full code-splitting in example app (lazy map exists; static map used on native)
- Chat UI, real AI APIs, drag-and-drop editor
- Props inspector
- Schema expansion beyond MVP 16 components
- React component integration tests in bun (RN JSX parse limits)

## react-native-web risks

| Risk | Mitigation |
| ---- | ---------- |
| Peer dependency optional | `react-native-web` optional in renderer `peerDependenciesMeta` |
| Native-only components crash web | Fallback placeholder + validation `requireWebPreview` option |
| Raw strings in View crash RN | Wrap in Typography when layout disallows string children |
| Arbitrary props / XSS-like keys | `guardNodeProps` + schema validation |
| Theme/context missing | Example + `WebPreviewHost` wrap `ThemeProvider` |
| Monorepo import paths in builder | Builder still uses direct path imports (pre-existing) |

## Files added/changed (this phase)

**Added**

- `packages/renderer/src/propGuards.ts`
- `packages/renderer/src/componentMap.ts`
- `packages/renderer/src/lazyComponentMap.ts`
- `packages/renderer/src/RNUISchemaRenderer.tsx`
- `packages/renderer/src/validation-panel.tsx`
- `apps/example/app/components/AIRenderer.tsx`
- `docs/src/content/docs/guides/ai-renderer.md`
- `.planning/ai-render-core-investigation.md` (this file)
- `.planning/ai-render-core-summary.md`
- `.planning/ai-render-followups.md`

**Changed**

- `packages/renderer/src/component-loader.ts` — re-exports split modules, `validateBeforeRender`
- `packages/renderer/src/resolve-props.ts` — guards, action objects, label-from-children
- `packages/renderer/src/render-node.tsx` — fallbacks, string wrap, `renderNode` alias
- `packages/renderer/src/export-tsx.ts` — action objects, native-only comments, alias
- `packages/renderer/src/types.ts` — `RendererAction`, `RNUISchemaRendererProps`
- `packages/renderer/src/index.ts` — public API exports
- `packages/renderer/src/web-preview.tsx` — uses `RNUISchemaRenderer`
- `packages/renderer/src/__tests__/renderer.test.ts` — expanded coverage
- `apps/example/package.json`, `apps/example/app/index.tsx`
- `docs/astro.config.mjs`, `docs/.../component-schema.md`

## Dependency direction

```
component-schema  ←  renderer  ←  apps/example / apps/web/builder
       ↑
      ui (no reverse dependency)
```

No circular dependencies.
