# Professional UI System Reset — Summary

**Date:** 2026-05-24  
**Branch:** develop  
**Status:** Complete (engineering gates; device QA pending)

---

## Goal

Establish a professional design-system foundation comparable in discipline to shadcn/ui, Radix Themes, Tamagui, and mobile-native patterns — fixing visibility at the token layer, not per-component shadow hacks.

---

## Design foundation changes

| Document | Purpose |
| -------- | ------- |
| `.planning/professional-ui-reference-notes.md` | External quality references (conceptual) |
| `.planning/rnui-design-foundation-contract.md` | Source of truth for surfaces, borders, radius, shadow, states |
| `.planning/rnui-token-contract-audit.md` | PASS/WEAK/FAIL audit before fixes |

---

## Semantic token changes

**Light:**
- `text.primary` → `gray[800]` (softer than harsh black)
- `surface.overlay` → `#FAFAFE` (aligned with raised)
- Shadow `lg`/`xl` opacity slightly reduced

**Dark:**
- Surface steps retained (`#1E1E30` / `#2E2E48` / `#0A0A14`)
- Shadow opacity reduced (0.22–0.34 vs 0.35–0.50) — no heavy glow

---

## Component family changes

| Family | Files | Key fix |
| ------ | ----- | ------- |
| Status | `badge.ts`, `chip.ts` | Neutral default/solid → `surface.sunken` + border |
| Overlay | `modal.ts`, `dialog.ts`, `bottomSheet.ts` | `border.default` on panels |
| Navigation | `appBar.ts` | Bottom border + `shadow.sm` (was md-only) |
| Feedback | `emptyState.ts` | Icon wrap sunken + border |
| Data | `table.ts`, `pagination.ts`, `select.ts` | Stronger row/menu/pagination borders |
| Prior 4C | paper, menu, popover, list, skeleton, segmentedControl | Already hardened |

---

## Surface audit result

```
bun run surface:audit — PASS
Core: 0 critical failures
Dark: warnings on low luminance delta (borders carry hierarchy)
Brands: 6 themes checked for bg/surface/raised collapse
```

---

## SurfaceVisibility updates

Expanded QA lab (`apps/example/app/components/SurfaceVisibility.tsx`):

1. Neutral — Card nested, Paper variants, Divider
2. Forms — error/disabled, FormGroup, Checkbox, Switch
3. Actions — solid/outline/ghost/destructive/disabled/loading, Toggle, SegmentedControl
4. Status — Badge/Chip/Alert, Skeleton, EmptyState
5. Navigation — AppBar outlined
6. Data — List+Avatar, Pagination outlined, Tabs
7. Dark panel — Card, Badge, Chip, Input, Button, Alert
8. Toast/Snackbar triggers

---

## Docs updates

- `docs/src/content/docs/components/visual-baseline.mdx` — Design Foundation Contract, family checklist, native app as truth

---

## Tests updated

`packages/tokens/src/__tests__/tokens.test.ts`:
- text.primary gray[800]
- badge/chip sunken neutral fills
- modal/dialog/toast/snackbar borders
- alert + status full token sets
- emptyState iconWrap border

---

## Commands run

| Command | Result |
| ------- | ------ |
| `bun run build` | PASS |
| `bun run typecheck` | PASS |
| `bun run lint` | PASS |
| `bun run test` | PASS |
| `bun run docs:build` | PASS |
| `bun run component-schema:check` | PASS |
| `bun run ai:check` | PASS |
| `bun run surface:audit` | PASS |

---

## Remaining weak components

| Component | Risk |
| --------- | ---- |
| Tooltip | Inverse fill only (acceptable) |
| Button ghost on glass | Relies on brand text color |
| Dark nested surfaces | Low luminance delta — border-dependent |
| Table on very small screens | Row density not token issue |
| Rare/experimental components | Not in QA matrix |

**Rule enforced:** Invisible without shadow → fix fill/border/tokens, not shadow.

---

## Manual QA checklist

- [ ] SurfaceVisibility — light mode (all panels)
- [ ] SurfaceVisibility — dark mode
- [ ] Card inside Card
- [ ] Input inside Card
- [ ] FormGroup grouped
- [ ] Badge/Chip on Card
- [ ] Alert on app/card/glass/dark
- [ ] Toast/Snackbar triggers
- [ ] Menu/Select/Popover (example screens)
- [ ] Brand theme spot-check (6 brands)

Record in `.planning/device-qa-results.md`
