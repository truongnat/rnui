# AI Render Core — Follow-ups

## Phase next (recommended)

1. **Wire web builder to `RNUISchemaRenderer`** — replace direct `RenderSchemaNode` usage in `PreviewPanel` with the full renderer (validation panel, `onAction`, unsupported fallbacks).
2. **Mock AI only** — keep `mock-ai.ts`; no real API until schema + preview loop is stable.
3. **Lazy imports in builder** — use `loadComponentsForPlan` + Vite dynamic imports for smaller bundles.
4. **Schema repair loop** — validate → show errors in chat → re-prompt (still mock).

## Not in scope until later

- Drag-and-drop canvas editor
- Props inspector / visual property panel
- SEO marketing landing
- Executing AI-generated TSX at runtime
- Expanding schema to all 77 components
- Real OpenAI / Claude / Gemini integration

## Technical debt

- Builder imports renderer via deep relative paths — switch to package exports.
- Bun test runner cannot easily mount RN JSX components — add RN testing library or web-only render tests.
- `strict` flag on `RNUISchemaRenderer` reserved but not fully wired to fail on prop warnings.
- Dashboard schema `Stack wrap` prop may be stripped if not in Button/Stack schema enum — verify token props in registry.

## UX improvements

- Copy-to-clipboard for exported TSX in example app
- Syntax-highlighted TSX block in AIRenderer demo
- Show prop guard warnings in dev panel
