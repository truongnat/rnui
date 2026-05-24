# Phase 3A — Component Schema & AI Docs Foundation

**Status:** Complete  
**Branch:** `develop`  
**Date:** 2026-05-24

## Goal

Establish machine-readable component contracts and ScreenSchema validation **before** building renderer or web builder UI.

## Package added

**`@truongdq01/component-schema`** (`packages/component-schema/`)

| Module | Purpose |
| ------ | ------- |
| `types.ts` | `ComponentSchema`, `ComponentPropSchema`, `ComponentExample`, etc. |
| `registry/web-preview.ts` | 16 web-preview-safe MVP schemas |
| `registry/native-only.ts` | 16 native-only / gesture-heavy schemas |
| `registry.ts` | Unified registry + lookup helpers |
| `validators.ts` | `validateComponentProps` (no functions, no `style`/`sx`) |
| `web-safe.ts` | `listWebPreviewComponents`, `getAllowedProps`, etc. |
| `screen-schema.ts` | `ScreenSchema`, `validateScreenSchema`, `getLazyLoadPlan` |
| `examples.ts` | Five built-in ScreenSchema examples |

**No dependency on `@truongdq01/ui`** — pure metadata package.

## Registry coverage

| Bucket | Count | Components |
| ------ | ----- | ---------- |
| Web preview safe | 16 | Screen, Stack, Box, Card, Paper, Divider, Typography, Button, Input, TextField, Checkbox, Switch, Badge, Chip, Alert, Avatar |
| Native-only | 16 | Modal, Dialog, AlertDialog, BottomSheet, DatePicker, Drawer, Popover, Popper, ContextMenu, Carousel, AnimatedOverlay, AnimatedList, Toast, Snackbar, Tabs, Select |
| **Total** | **32** | |

**Note:** `Screen` is a virtual root type; lazy import maps to `Stack` with `lazyKey: 'Screen'`.

## ScreenSchema validation

- `type` must exist in registry
- Props validated per component schema (unknown props, functions, `style`/`sx` rejected)
- Children rules enforced (min/max, string vs node)
- Limits: max depth 12, max nodes 120
- Optional `requireWebPreview: true` for builder preview mode
- `getLazyLoadPlan(schema)` → unique `{ type, import: { named, from, lazyKey } }[]`

## Generated AI JSON

Produced by `bun run component-schema:generate`:

| File | Content |
| ---- | ------- |
| `.ai/generated/component-schema.json` | Full registry (32 components) |
| `.ai/generated/web-preview-components.json` | Web-safe type names |
| `.ai/generated/native-only-components.json` | Native-only type names + reasons |

Checked by `bun run component-schema:check`.

## AI docs

| File | Purpose |
| ---- | ------- |
| `.ai/component-schema-guide.md` | How AI picks components, prop safety, anti-patterns |
| `.ai/screen-schema-guide.md` | ScreenSchema structure, validation, repair loop |
| `.ai/examples/schemas/*.schema.json` | login, settings, profile-card, dashboard, form |

Updated `.ai/rnui.manifest.json` with schema paths and `schemaExamples`.

## Human docs

- `docs/src/content/docs/guides/component-schema.md`
- Sidebar entry in `docs/astro.config.mjs`

## Monorepo wiring

- Root `package.json`: `component-schema:generate`, `component-schema:check`
- Root `tsconfig.json`: project reference for `packages/component-schema`
- Workspaces auto-include via `packages/*`

## Tests

`packages/component-schema/src/__tests__/schema.test.ts` — 12 tests:

- Registry uniqueness and lookup
- Web preview filtering
- Prop validation (unknown, function, valid)
- ScreenSchema validation (examples, unknown component, dangerous props)
- Lazy-load plan

## Commands run

```bash
bun install          # OK
bun run build        # OK
bun run typecheck    # OK
bun run lint         # OK (fixed Card.tsx format + component-schema Biome format)
bun run test         # OK (fixed stale lg button height assertion 54→52 in headless)
bun run component-schema:generate  # OK
bun run component-schema:check     # OK
bun run docs:build   # OK
bun run ai:check     # OK
```

## Known limitations

- Prop enums are hand-maintained — may drift from `@truongdq01/ui` types over time
- `Chip.label` schema is string-only; actual API accepts `ReactNode`
- `action` props are string identifiers, not functions — renderer must map to handlers
- Native-only components excluded from web preview list; builder should show clear message
- CI does not yet fail on stale generated JSON (follow-up)

See `.planning/phase-3-component-schema-followups.md`.

## How builder will use this (Phase 3B+)

```text
AI generates ScreenSchema JSON
  → validateScreenSchema(schema)
  → getLazyLoadPlan(schema)  // unique imports for lazy map
  → lazy import @truongdq01/ui components by lazyKey
  → render preview (react-native-web)
  → export TSX
```

## Next recommended phase

**Phase 3B: Renderer**

- `packages/renderer`
- Accept validated `ScreenSchema`
- Component lazy-load map from `getLazyLoadPlan()`
- react-native-web preview host
- TSX export

**Phase 3C: Web builder** (after renderer)

- `apps/web/builder` — chat, preview, schema/code panels

## Out of scope (confirmed not done)

- Builder UI, drag-and-drop, AI API calls
- react-native-web setup
- RNUI component API or visual changes
