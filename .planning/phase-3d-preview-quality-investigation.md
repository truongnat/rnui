# Phase 3D — Preview quality investigation

## Current builder layout issues

- Login schema is flat: title + inputs stacked on Screen root with no Card/Paper grouping.
- Weak vertical rhythm — `spacing: md` only, no section breaks or hero area.
- No secondary actions (forgot password, sign up link).
- Dashboard/settings/profile/form templates are demo-minimal, not production-like.

## Phone frame issues

- `.phone-shell` uses heavy `#111` fill + thick padding — reads as a black slab.
- Inner `.phone-screen` hardcodes `#faf8ff` instead of RNUI `color.bg.default`.
- Notch is a thin bar, not a subtle dynamic island.
- No safe-area inset at top for preview content.
- Frame shadow is acceptable but border weight is high.

## Login schema / template issues

- No Card wrapper for the form cluster.
- Typography hierarchy stops at h4 + body2 with no visual grouping.
- Inputs render as dark blocks (see contrast section) — not a schema issue alone.

## Input color / contrast in RN Web preview

**Root cause: `ThemeProvider` defaults to `colorScheme="system"`.**

On macOS/iOS dark mode, `useColorScheme()` returns `'dark'`, so RNUI dark tokens apply inside the phone frame while the CSS phone background stays light (`#faf8ff`). Input `backgroundColor` becomes dark `surface.default` from dark theme → **dark navy blocks on a light canvas**.

Not a token bug, not a schema bug, not RN Web CSS alone — **preview host must force light scheme** (or sync frame background with active scheme).

Secondary: Reanimated mock `interpolateColor` always returns `output[0]` — acceptable for borders at rest; not the dark-block cause.

## Renderer / mapping

- `Screen` → `Stack` with padding via `resolve-props.ts` — OK.
- No default screen background in renderer; host must set canvas.
- Builder uses slim `previewComponentMap` + `RenderSchemaNode` (not full barrel) — keep pattern.

## Files to change

| Area | Files |
| ---- | ----- |
| Schemas | `.ai/examples/schemas/*.json`, `packages/component-schema/src/examples.ts` |
| Preview host | `packages/renderer/src/web-preview.tsx`, `packages/renderer/src/types.ts` |
| Builder preview | `apps/web/src/components/builder/PreviewPanel.tsx`, `builder.css` |
| Mock AI | `apps/web/src/lib/ai/mockProvider.ts` |
| Builder UX | `ChatPanel.tsx`, `SchemaPanel.tsx`, `builder-state.ts` |
| Reanimated mock | `apps/web/src/mocks/reanimated.ts` (interpolateColor fidelity) |
| Tests | `apps/web/src/__tests__/builder.test.ts`, `packages/component-schema/src/__tests__/schema.test.ts` |
| Docs | `docs/src/content/docs/guides/web-builder.md`, `screen-renderer.md` |
