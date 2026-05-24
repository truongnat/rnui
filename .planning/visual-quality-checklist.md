# RNUI Visual Quality Checklist

Use before merging UI/token changes and before release.  
**Visual Foundation Pass (2026-05-23):** items marked `[x]` were addressed in that pass; unmarked items still need ongoing review.

## Token consistency

- [x] Light/dark semantic colors use shared structure (no orphan keys)
- [x] Components consume semantic tokens only (no primitive hex in components)
- [x] Brand/accent used intentionally, not as default fill for neutral UI
- [x] Shadows use soft opacity; dark mode avoids neon glow on everyday surfaces
- [x] Glass/surface tokens defined for light and dark

**Action:** Re-run token snapshot tests after any semantic edit.

## Core components

- [x] Button: solid / outline / ghost / destructive visually distinct; `radius.lg` default
- [x] Card/Paper: readable on app background; border + shadow not competing
- [x] Input/TextField: 44–48px touch height, clear focus/error/disabled
- [x] Typography: hierarchy without overly heavy display/h1
- [x] Badge/Chip: visible fills + 1px borders on all variants
- [x] Switch/Checkbox: clear on/off; disabled opacity consistent
- [x] Alert/Toast/Snackbar: status clear; elevated surfaces (Phase 2B)
- [x] Snackbar visible-surface audit — elevated card, not inverse slab

**Action:** Spot-check filled Alert variants on device.

## Light / dark mode

- [x] Dark app background avoids pure `#000` (deep slate `#12121C`)
- [x] Borders visible in dark without harsh lines
- [ ] Both schemes tested on real device or simulator
- [ ] Primary text ≥ 4.5:1 on surfaces (automated contrast pass)

## Accessibility

- [x] Default button/input heights ≥ 44px
- [ ] Icon-only controls have `accessibilityLabel` (per-screen audit)
- [x] Color paired with text/icon for status (badge label, alert title)
- [x] Focus/error borders perceivable on input tokens

## Docs preview

- [x] `ComponentPreview` wraps demos with 24–32px padding and mobile stage (~400px)
- [x] Preview CSS uses RNUI token values (marketing indigo/pink removed from `custom.css`)
- [x] Hero example first, variants grouped below in demos
- [x] Light/dark Starlight: preview shell remains legible

**Action:** Open [Visual Baseline](/components/visual-baseline/) after token changes; run [Example app](/guides/example/) for native overlay QA.

## Native / device QA (Phase 2C)

- [x] Example app guide documents overlay + status screen checks
- [x] Visual baseline links native QA checklist
- [x] Device QA checklist in `.planning/device-qa-checklist.md`
- [ ] Both schemes tested on real device or simulator (manual)
- [ ] Primary text ≥ 4.5:1 on surfaces (automated contrast pass)

## Mobile sizing

- [x] Default control heights feel native (44px buttons, 48px inputs)
- [x] Radius consistent (`lg`/`xl` for surfaces; buttons not pill by default)
- [x] Spacing follows 4/8dp rhythm in demo layouts

## States

- [x] Button solid shadow reduced (not bootstrap-heavy)
- [x] Disabled opacity ~45% on switch/checkbox demos
- [ ] Loading states balanced (spinner not clipped) — per-component QA

## Empty / loading / error

- [ ] Empty states use semantic muted colors
- [ ] Skeleton/loading not overly contrasted
- [ ] Error text includes recovery context where applicable

## AI-generated usage

- [x] Examples use real product copy (no lorem)
- [x] Demos use Stack/Card/Button/Input patterns agents can copy
- [x] No emoji-as-icons in documented examples

## Quick verification commands

```bash
bun run build
bun run typecheck
bun run lint
bun run docs:build
```

Then review `/components/visual-baseline/` in the built docs.
