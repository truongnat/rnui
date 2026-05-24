# Phase 3A follow-ups (component schema)

Items discovered during Phase 3A that are intentionally out of scope for this phase.

## Renderer (Phase 3B)

- `packages/renderer` consuming `ScreenSchema` + `getLazyLoadPlan()`
- Lazy import map keyed by `import.lazyKey`
- react-native-web preview host
- TSX export from validated schema

## Schema coverage gaps

- **Screen** is a virtual root type; lazy import maps to `Stack` — renderer must treat `Screen` as layout wrapper.
- **Chip `label`** is `React.ReactNode` in `@truongdq01/ui` but schema exposes string-only for AI safety.
- **Alert** title/content patterns may need compound-child schema once renderer supports node trees.
- **TextField** vs **Input** — document when AI should prefer each; align with actual public APIs over time.
- Expand web-preview registry as more components are verified on react-native-web.

## Automation

- Wire `component-schema:check` into CI after `component-schema:generate` in build pipeline.
- Optional: fail `ai:check` if generated JSON is stale vs registry (git diff check).
- Optional: derive prop enums from TypeScript types (codegen) to reduce manual drift.

## Native-only components

- Revisit `webPreview: false` entries when renderer adds native preview path or polyfills.
- **Tabs**, **Select** — may become partial web preview with simplified stubs.

## Docs

- Link component schema guide from Starlight AI usage page.
- Per-component schema pages in docs (generated from registry JSON).
