---
title: AI Render Core
description: ScreenSchema validation, RNUI preview rendering, lazy-load planning, and TSX export
---

**AI Render Core** is `@truongdq01/renderer` — the runtime layer that turns validated `ScreenSchema` JSON into live RNUI previews and exportable TSX. It powers the example app preview screen and will back the web chat builder in a later phase.

## Flow

```text
ScreenSchema JSON
  → validateBeforeRender() / validateScreenSchema()
  → createLazyLoadPlan() / getLazyLoadPlan()
  → createDefaultComponentMap() or loadComponentsForPlan()
  → RNUISchemaRenderer (preview)
  → exportSchemaToTsx()
```

## Quick start

```tsx
import { loginScreenSchemaExample } from '@truongdq01/component-schema';
import {
  RNUISchemaRenderer,
  exportSchemaToTsx,
  validateBeforeRender,
} from '@truongdq01/renderer';
import { ThemeProvider } from '@truongdq01/headless';

const prepared = validateBeforeRender(loginScreenSchemaExample);

<ThemeProvider>
  <RNUISchemaRenderer
    schema={loginScreenSchemaExample}
    onAction={(action) => console.log(action.name)}
  />
</ThemeProvider>

const tsx = exportSchemaToTsx(loginScreenSchemaExample);
```

For react-native-web panes, use `WebPreviewHost` (includes `ThemeProvider`).

## Public API

| Export | Purpose |
| ------ | ------- |
| `RNUISchemaRenderer` | Main preview component |
| `renderSchemaToElement(schema, options)` | Imperative React element factory |
| `renderNode` / `RenderSchemaNode` | Low-level node renderer |
| `validateBeforeRender(schema)` | Validate + lazy-load plan |
| `createDefaultComponentMap(ui)` | Sync MVP component map |
| `createLazyComponentMap()` | Dynamic import loaders |
| `createLazyLoadPlan(schema)` | Alias for `getLazyLoadPlan` |
| `exportSchemaToTsx(schema)` | Generate TSX source string |
| `guardNodeProps(type, props)` | Safe prop filtering |

Legacy names `ScreenSchemaRenderer`, `exportScreenSchemaToTsx`, and `prepareScreenRender` remain exported for backward compatibility.

## Supported MVP components

Web-preview-safe components mapped first:

`Screen`, `Stack`, `Box`, `Card`, `Paper`, `Typography`, `Button`, `Input`, `TextField`, `Badge`, `Chip`, `Alert`, `Avatar`, `Divider`, `Switch`, `Checkbox`

`Screen` is virtual — it renders as:

```tsx
<Stack spacing="md" style={{ flex: 1, padding: 16 }}>
  {/* screen children */}
</Stack>
```

## Unsupported / native-only behavior

If a schema node references a native-only or unknown component, the renderer **does not crash**. Instead it shows:

```text
Unsupported in web preview: ComponentName
```

When available, the component-schema `support.reason` is appended. TSX export emits a JSX comment instead of executable code.

## Safe prop rules

The renderer never passes arbitrary schema props directly:

- Only props declared in `ComponentSchema` are forwarded
- `style`, functions, and dangerous keys (`__proto__`, `constructor`, etc.) are blocked
- Unknown props are ignored with warnings
- Object props are rejected unless the schema allows them

## Action rules

Schema buttons reference actions by id — not raw JavaScript:

```json
{
  "type": "Button",
  "props": {
    "label": "Continue",
    "variant": "solid",
    "action": { "type": "event", "name": "continue" }
  }
}
```

At render time this becomes:

```tsx
onPress={() => onAction?.({ name: 'continue', sourceNodeId: node.id })}
```

String action ids (`"action": "signIn"`) are also supported. Pass legacy handlers via `actions={{ signIn: () => {} }}` or prefer `onAction`.

## Example schema

See `.ai/examples/schemas/login.schema.json` or `loginScreenSchemaExample` from `@truongdq01/component-schema`.

## Example TSX export

```tsx
import React from 'react';
import { ThemeProvider } from '@truongdq01/headless';
import { Stack, Typography, Button } from '@truongdq01/ui';

export function LoginScreen() {
  const handleSignIn = () => {
    // TODO: wire signIn
  };

  return (
    <ThemeProvider>
      <Stack spacing="md" style={{ flex: 1, padding: 16 }}>
        <Typography variant="h4">Welcome back</Typography>
        <Button label="Sign in" onPress={handleSignIn} />
      </Stack>
    </ThemeProvider>
  );
}
```

## Example app

Open **AI Render Preview** in the RNUI example app (`apps/example/app/components/AIRenderer.tsx`):

```bash
cd apps/example && bun run start
```

Navigate to **AIRenderer** from the component list.

## Known limitations

- No drag-and-drop editor, props inspector, or AI API integration in this phase
- Complex native components (Modal, BottomSheet, FlashList, etc.) render fallbacks only
- TSX export uses TODO handler stubs — not wired business logic
- Web builder code-splitting is prepared via `createLazyComponentMap` but not fully exercised in the example app

## Related docs

- [Component schema](/guides/component-schema/)
- [Screen renderer (Phase 3B)](/guides/screen-renderer/)
- [Web builder](/guides/web-builder/)
