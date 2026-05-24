# RNUI ScreenSchema Guide

ScreenSchema is the JSON contract between AI and the future RNUI builder renderer.

## Structure

```json
{
  "id": "login",
  "name": "Login",
  "version": "1",
  "description": "Optional screen description",
  "actions": [{ "id": "signIn", "description": "Submit credentials" }],
  "root": {
    "type": "Screen",
    "props": { "padding": "md", "spacing": "md" },
    "children": []
  }
}
```

### ComponentNode

```json
{
  "id": "optional-node-id",
  "type": "Button",
  "props": { "label": "Continue", "variant": "solid", "action": "continue" },
  "children": []
}
```

- `type` must exist in component registry
- `props` validated per component schema
- `children` is `ComponentNode[]` or string (when allowed)

## Validation rules

Run validation before preview or export:

```ts
import { validateScreenSchema } from '@truongdq01/component-schema';

const result = validateScreenSchema(schema, { requireWebPreview: true });
```

Rules enforced:

- `version` must be `"1"`
- `root.type` must be registered
- props must match component schema
- no functions in props
- no dangerous keys (`__proto__`, `constructor`, `style`, `sx`)
- max depth **12**, max nodes **120** (defaults)
- optional `requireWebPreview: true` for web builder MVP

## Lazy-load plan

After validation, derive imports:

```ts
import { getLazyLoadPlan } from '@truongdq01/component-schema';

const plan = getLazyLoadPlan(schema);
// plan.components → [{ type, import: { named, from, lazyKey }, webPreview }]
```

Builder uses `@truongdq01/renderer`:

1. `prepareScreenRender(schema)` or `validateScreenSchema(schema)`
2. `getLazyLoadPlan(schema)`
3. `createDefaultComponentMap()` or `loadComponentsForPlan(plan)`
4. `<WebPreviewHost schema={schema} />` or `<ScreenSchemaRenderer />`
5. `exportScreenSchemaToTsx(schema)` for code export

## Repair loop (AI workflow)

```
User prompt
  → AI generates ScreenSchema JSON
  → validateScreenSchema()
  → if invalid: feed errors[] back to AI (schema-only repair)
  → repeat until valid
  → preview / export TSX
```

Repair **only the schema** — do not patch TSX until schema validates.

## Example schemas

See `.ai/examples/schemas/`:

- `login.schema.json`
- `settings.schema.json`
- `profile-card.schema.json`
- `dashboard.schema.json`
- `form.schema.json`

All examples use web-preview-safe components only.

## Export to TSX

Use `@truongdq01/renderer`:

```ts
import { exportScreenSchemaToTsx } from '@truongdq01/renderer';

const tsx = exportScreenSchemaToTsx(schema);
```

Rules:

- Map `Screen` → `Stack` with flex 1 + padding
- Map `action` props → `onPress` handlers from action registry
- Use `@truongdq01/ui` imports from lazy plan
- Never export raw style objects from schema props
