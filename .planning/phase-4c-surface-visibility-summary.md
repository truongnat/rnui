# Phase 4C — Surface Visibility Contract Hardening Summary

**Date:** 2026-05-24  
**Branch:** develop  
**Status:** Complete (engineering gates green; device QA pending)

---

## Root cause

Surface invisibility came from **token collapse**, not missing shadows:

1. Light `surface.default === surface.raised === #FFFFFF` — nested surfaces relied on shadow.
2. Brand themes used white `bg.default === surface.default` with pastel borders.
3. Overlay panels (menu, popover) used `border.subtle` for outer shells.
4. No automated guard prevented regressions.

---

## Tokens changed

### Semantic (`packages/tokens/src/semantic.ts`)

**Light (prior partial + this pass):**
- `surface.raised` → `#FAFAFE` (≠ white default)
- `border.subtle` → `#DAD2E6`
- `surface.glassBorder` → `rgba(30,27,75,0.18)`

**Dark:**
- `surface.default` → `#1E1E30`
- `surface.raised` / `overlay` → `#2E2E48`
- `surface.sunken` → `#0A0A14`
- `glassBorder` alpha → `0.18`

### Component tokens

| File | Change |
| ---- | ------ |
| `paper.ts` | Flat variant `border.subtle` → `border.default` |
| `menu.ts` | Panel border → `border.default` |
| `popover.ts` | Panel border → `border.default` |
| `list.ts` | Inset container + `border.default` |
| `skeleton.ts` | Pulse fill → `surface.sunken` |
| `segmentedControl.ts` | Active segment + border |

---

## Components hardened

Card, Paper (flat), Badge, Chip, Input, FormGroup (grouped), Menu, Popover, List inset, SegmentedControl active, Skeleton — all enforce fill + border without shadow dependency.

---

## Brand themes checked/fixed

All six brands: **default**, **forest**, **love**, **ocean**, **sunset**, **midnight**

- Tinted `bg.default` (no longer white-on-white canvas)
- Stepped `surface.raised`
- Stronger `border.default` where pastel (forest, love, ocean, sunset)

Details: `.planning/brand-surface-visibility-audit.md`

---

## Audit script

- **File:** `scripts/audit-surface-contrast.mjs`
- **Script:** `bun run surface:audit` (requires `bun run build` first)
- **Behavior:** Parses hex/rgb/rgba, luminance delta + contrast ratio, readable tables
- **Fail:** Identical token values only
- **Warn:** Weak deltas (especially dark nested surfaces)

### Latest result

```
surface:audit — PASS
0 critical failures, 8 warnings (dark mode nested luminance — borders carry visibility)
```

---

## SurfaceVisibility matrix

**File:** `apps/example/app/components/SurfaceVisibility.tsx`

Sections A–G on app / card / white / glass panels + dark stack:

| Section | Coverage |
| ------- | -------- |
| A | Card no-shadow, nested card, Paper none/flat |
| B | Input, TextField, FormGroup grouped, disabled |
| C | Badge all variants, Chip, Alert standard/outlined/filled |
| D | Button solid/outline/ghost/destructive/disabled, ToggleButton, SegmentedControl |
| E | List inset, Tabs |
| F | Overlay navigation notes |
| G | Dark panel: Card, Badge, Chip, Input, Button, Alert |
| — | Toast/Snackbar triggers |

---

## Docs updates

- `docs/src/content/docs/components/visual-baseline.mdx` — **Surface Visibility Contract** section, shadow-not-required note on Card & Paper

---

## Contract & investigation docs

- `.planning/surface-visibility-contract.md` — hard rules
- `.planning/phase-4c-surface-visibility-investigation.md` — findings
- `.planning/brand-surface-visibility-audit.md` — per-brand notes

---

## Tests added/updated

`packages/tokens/src/__tests__/tokens.test.ts`:
- Surface hierarchy ≠ checks (light + dark)
- List inset border
- SegmentedControl active border
- Paper flat border

---

## Commands run

| Command | Result |
| ------- | ------ |
| `bun run build` | PASS |
| `bun run typecheck` | PASS |
| `bun run lint` | PASS |
| `bun run test` | PASS |
| `bun run docs:build` | PASS (via build) |
| `bun run component-schema:check` | PASS |
| `bun run ai:check` | PASS |
| `bun run surface:audit` | PASS (8 dark warnings) |

---

## Remaining risks

| Area | Risk | Mitigation |
| ---- | ---- | ---------- |
| Badge/Chip default on white card | Border-led only; may feel subtle | Device QA; consider sunken fill if fails |
| Dark nested surfaces | Low luminance delta (audit warns) | Borders + device QA |
| Tooltip | Inverse fill; no border | Acceptable — high contrast |
| Table row dividers | Still `border.subtle` internal | OK for hairlines |
| Brand theme device QA | Not run in CI | Manual per theme |
| Overlays | Modal/Menu/Select not inline in matrix | Dedicated example screens |

---

## Manual QA checklist

- [ ] SurfaceVisibility — light mode (all panels)
- [ ] SurfaceVisibility — dark mode (system toggle + dark panel)
- [ ] Card inside Card (nested raised fill)
- [ ] Badge/Chip on Card
- [ ] Input inside Card
- [ ] FormGroup grouped on white/card
- [ ] Toast/Snackbar triggers (all variants)
- [ ] Brand themes: default, forest, love, ocean, sunset, midnight

Record in `.planning/device-qa-results.md`

---

## Next recommended phase

Schema drift + CI (Toast import, component-schema check in CI) — separate from surface work.
