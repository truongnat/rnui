# RNUI Component Schema Guide

Machine-readable contracts for RNUI components live in `@truongdq01/component-schema`. AI agents and the future web builder use these schemas **before** generating UI — not after.

## What is a ComponentSchema?

Each RNUI component can have a `ComponentSchema` describing:

- **Identity:** name, package, category, status
- **Support:** native vs web preview (`support.webPreview`)
- **Import:** lazy-load key and named export for renderer
- **Props:** allowed props, types, enums, AI safety flags
- **Children:** whether nested nodes or text are allowed
- **Examples:** ScreenSchema + TSX reference
- **Avoid:** anti-patterns for AI generation

Generated JSON for agents: `.ai/generated/component-schema.json`

## How AI should choose components

1. Read `.ai/generated/web-preview-components.json` for MVP web preview.
2. Prefer **stable** components with `safeForAI: true` props.
3. Use layout primitives (`Screen`, `Stack`, `Card`) before custom boxes.
4. Use semantic props (`variant`, `severity`, `spacing`) — never raw hex colors.
5. If a component is native-only, say so explicitly — do not silently substitute.

## Web preview safe vs native-only

| Tier | Meaning |
|------|---------|
| `support.webPreview: true` | Safe for ScreenSchema + react-native-web preview MVP |
| `support.webPreview: false` | Native-only — builder shows limitation message |

Native-only examples: `Modal`, `Dialog`, `BottomSheet`, `Select`, `Toast`, `Tabs`.

## Prop safety rules

- **Allowed in ScreenSchema JSON:** strings, numbers, booleans, enums, action ids
- **Not allowed:** functions (`onPress`, `onChange`), raw `style`, `sx`, arbitrary objects
- **Actions:** use `action: "signIn"` referencing `ScreenSchema.actions[]`
- **Children:** use `ComponentNode[]` or string props like `Typography.children`

## Children rules

- `Stack`, `Card`, `Screen` → node children
- `Typography`, `Alert` → string via `children` prop or text child
- `Button` → prefer `label` prop, not string children
- `Divider`, `Input` → no children

## Anti-patterns

- Do not pass arbitrary `style` or hex colors
- Do not embed JavaScript functions in JSON
- Do not use native-only components in web preview schemas
- Do not invent props not listed in schema
- Do not use raw `TextInput` / `TouchableOpacity` when RNUI exports exist

## Related files

- Package: `packages/component-schema`
- ScreenSchema guide: `.ai/screen-schema-guide.md`
- Examples: `.ai/examples/schemas/*.schema.json`
- Human docs: `docs/src/content/docs/guides/component-schema.md`
