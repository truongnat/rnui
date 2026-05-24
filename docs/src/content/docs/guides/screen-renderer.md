---
title: ScreenSchema renderer
description: Validate ScreenSchema, lazy-load RNUI components, preview on web, and export TSX
---

Phase 3B adds `@truongdq01/renderer` — the runtime layer between validated `ScreenSchema` JSON and RNUI components.

## Flow

```text
ScreenSchema JSON
  → prepareScreenRender() / validateScreenSchema()
  → getLazyLoadPlan()
  → createDefaultComponentMap() or loadComponentsForPlan()
  → ScreenSchemaRenderer / WebPreviewHost
  → exportScreenSchemaToTsx()
```

## Quick start

```tsx
import { loginScreenSchemaExample } from '@truongdq01/component-schema';
import { WebPreviewHost, exportScreenSchemaToTsx } from '@truongdq01/renderer';

// Preview (react-native-web — alias react-native in bundler)
<WebPreviewHost schema={loginScreenSchemaExample} />

// Export TSX for app code
const tsx = exportScreenSchemaToTsx(loginScreenSchemaExample);
```

## API overview

| Export | Purpose |
| ------ | ------- |
| `prepareScreenRender(schema)` | Validate + return lazy-load plan |
| `createDefaultComponentMap(ui)` | Sync map keyed by schema `lazyKey` |
| `createLazyComponentMap()` | Dynamic `import('@truongdq01/ui')` loaders |
| `loadComponentsForPlan(plan)` | Resolve lazy map for a schema |
| `ScreenSchemaRenderer` | Render tree (wrap with `ThemeProvider` yourself) |
| `WebPreviewHost` | `ThemeProvider` + flex container + renderer |
| `exportScreenSchemaToTsx(schema)` | Generate `.tsx` source string |
| `RenderSchemaNode` | Low-level node renderer |

## Virtual Screen type

`Screen` in ScreenSchema is **not** a RNUI export. The renderer maps it to:

```tsx
<Stack spacing="md" style={{ flex: 1, padding: 16 }}>
  {/* screen children */}
</Stack>
```

Padding presets: `none` → 0, `sm` → 12, `md` → 16, `lg` → 24.

## Action props

Schema buttons may use `action: "signIn"` instead of functions. Pass handlers at render time:

```tsx
<WebPreviewHost
  schema={loginScreenSchemaExample}
  actions={{ signIn: () => console.log('sign in') }}
/>
```

TSX export generates `handleSignIn` stubs with TODO comments.

## Web preview setup

`WebPreviewHost` targets **react-native-web**. Configure your bundler (Vite, Webpack, Expo web):

- Alias `react-native` → `react-native-web`
- Include `@truongdq01/ui` and `@truongdq01/headless` peer deps

### Preview environment (Phase 3D)

`WebPreviewHost` defaults to **`colorScheme="light"`** so web previews stay readable regardless of OS dark mode. It wraps content in a flex container with `tokens.color.bg.default` as the canvas background.

```tsx
<WebPreviewHost
  schema={loginScreenSchemaExample}
  colorScheme="light"
  withGestureRoot={false}
/>
```

Pass `colorScheme="dark"` or `"system"` when you intentionally want to preview dark tokens.

Native-only components render a dashed placeholder — not a crash.

## Schema quality matters

Polished previews depend on **good ScreenSchema templates**, not just the renderer:

- Use Card/Paper groups, Typography hierarchy, and spacing on `Screen`.
- Avoid sparse single-column dumps of inputs without structure.
- See `.ai/examples/schemas/` and [Web builder](/guides/web-builder/) template guidance.

## Next: Web builder

`apps/web` at `/builder` — template chips, chat panel, preview panel, schema/code panel — builds on this package.

See also: [Component schema](/guides/component-schema/), `.ai/screen-schema-guide.md`.
