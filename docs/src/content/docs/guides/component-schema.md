---
title: Component Schema
description: Machine-readable RNUI component contracts for AI and the future web builder.
---

# Component Schema

RNUI exposes **machine-readable component contracts** so AI agents and tooling can generate screens safely — without guessing props or importing the wrong components.

## Why schemas exist

The future builder flow:

```
Chat prompt → ScreenSchema JSON → validate → lazy-load RNUI → web preview → export TSX
```

Phase 3A implements the **schema layer**. Phase 3B adds **`@truongdq01/renderer`** — validate, lazy-load, preview, export TSX. The web builder UI (Phase 3C) is not included yet.

Package: `@truongdq01/component-schema`

## ComponentSchema example

Each component has metadata like:

```json
{
  "name": "Button",
  "package": "@truongdq01/ui",
  "category": "actions",
  "status": "stable",
  "support": { "native": true, "webPreview": true },
  "import": { "named": "Button", "from": "@truongdq01/ui", "lazyKey": "Button" },
  "props": [
    { "name": "label", "type": "string", "safeForAI": true },
    { "name": "variant", "type": "enum", "enumValues": ["solid", "outline", "ghost"], "safeForAI": true },
    { "name": "action", "type": "action", "safeForAI": true }
  ]
}
```

AI-readable exports: `.ai/generated/component-schema.json`

## ScreenSchema example

```json
{
  "id": "login",
  "name": "Login",
  "version": "1",
  "root": {
    "type": "Screen",
    "props": { "padding": "md", "spacing": "md" },
    "children": [
      { "type": "Typography", "props": { "variant": "h4", "children": "Welcome back" } },
      { "type": "Button", "props": { "label": "Sign in", "variant": "solid", "action": "signIn" } }
    ]
  },
  "actions": [{ "id": "signIn" }]
}
```

Validate with:

```ts
import { validateScreenSchema, getLazyLoadPlan } from '@truongdq01/component-schema';

const result = validateScreenSchema(schema);
const plan = getLazyLoadPlan(schema);
```

## Web preview vs native-only

| Support | Meaning |
|---------|---------|
| `webPreview: true` | Included in MVP web builder preview |
| `webPreview: false` | Native-only — builder shows a limitation message |

Web-preview MVP includes layout, typography, button, form, status, and avatar primitives. Overlays (`Modal`, `BottomSheet`, `Dialog`) are documented but excluded from web preview.

## Safe props for AI

Allowed in ScreenSchema JSON:

- Token enums (`variant`, `severity`, `spacing`)
- Strings, numbers, booleans
- Action references (`action: "submit"`)

Not allowed:

- Functions (`onPress`, `onChange`)
- Raw `style` / hex colors
- Unsupported or native-only components (when `requireWebPreview: true`)

## Related guides

- [AI usage](/guides/ai-usage/)
- `.ai/component-schema-guide.md` (agent reference)
- `.ai/screen-schema-guide.md` (ScreenSchema + repair loop)

## Next phases

- **Phase 3B:** `@truongdq01/renderer` — validate schema, lazy-load, react-native-web preview, TSX export ([guide](/guides/screen-renderer/))
- **Phase 3C:** `apps/web/builder` — chat + preview + schema/code panels
- **Phase 3C:** `apps/web/builder` — chat + preview + code panels
