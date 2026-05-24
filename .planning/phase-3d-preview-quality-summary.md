# Phase 3D — Preview quality summary

## Builder preview changes

- `PreviewPanel` uses `WebPreviewHost` with **`colorScheme="light"`** (fixes dark inputs on light frame).
- Scrollable `phone-screen-inner` wrapper; improved validation error panel in preview.
- Template chips load schemas **instantly** via `applyExampleTemplate()` (no mock AI round-trip).

## Phone frame changes

- Lighter bezel gradient, subtle border, layered shadow, dynamic island (`phone-island`).
- Inner screen 32px radius, ~390×760px, overflow scroll.
- Canvas background aligned to RNUI `#F3F1F8` (also set via theme inside preview).

## Input contrast — root cause

**OS dark mode + `ThemeProvider colorScheme="system"`** applied dark surface tokens to Input while the CSS phone frame stayed light. Fixed by forcing light scheme in preview host, not by login-only schema hacks.

## Schemas upgraded

All five fixtures in `.ai/examples/schemas/`:

| Schema | Improvements |
| ------ | ------------- |
| Login | Card form, h3 title, ghost forgot-password, footer caption |
| Dashboard | Greeting row, stat Papers, chips, activity Paper, CTA |
| Settings | Profile Card, preferences Card, destructive sign out |
| Profile | Hero Card, stats row, edit/share buttons |
| Form | Card with Inputs, helper Alert, submit |

`packages/component-schema/src/examples.ts` now imports JSON fixtures (single source of truth).

## Mock provider changes

- Richer `reasoningSummary` strings mentioning components used.
- Payment/checkout keywords map to form template.
- Default remains dashboard for vague prompts.

## Docs

- `docs/src/content/docs/guides/web-builder.md` — Phase 3D, templates, preview quality, prompt examples.
- `docs/src/content/docs/guides/screen-renderer.md` — WebPreviewHost light default, schema quality note.

## Tests added

- `apps/web/src/__tests__/builder.test.ts` — all example schemas validate, login has Card, template load, payment routing, filename helper.

## Commands run

```bash
bun run --filter @truongdq01/component-schema test
# (full suite pending in verification step)
```

## Remaining limitations

- No theme toggle in builder UI (always light preview).
- Button press uses gesture mock — limited web interactivity.
- TextField multiline not in Input schema props (form uses single-line Input for message).
- No real AI API, Monaco editor, or E2E.

## Next recommended phase

- Real `AIProvider` with schema-aware system prompt referencing template patterns.
- Optional preview theme toggle (light/dark).
- Playwright smoke test for `/builder` template chips.
- Renderer subpath exports for safer `WebPreviewHost` import in Next.js.
