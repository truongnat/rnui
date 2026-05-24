# RNUI Token Contract Audit

**Date:** 2026-05-24  
**Baseline:** Post Phase 4C + professional UI reset  
**Contract:** `.planning/rnui-design-foundation-contract.md`

Legend: **PASS** · **WEAK** · **FAIL**

---

## Semantic tokens — light mode

| Group | Status | Notes |
| ----- | ------ | ----- |
| bg | PASS | `#F3F1F8` canvas ≠ white surface |
| surface | PASS | default/raised/sunken stepped; overlay → raised tint |
| text | WEAK→PASS | primary softened to gray[800] (was harsh 900) |
| border | PASS | default `#CDC4DE`, subtle `#DAD2E6`, input `#C2B8D0` |
| brand | PASS | violet 600 default, subtle/muted for fills |
| accent | PASS | amber CTA distinct from brand |
| status | WEAK | `-100` fills border-dependent on white; borders at `-300` OK |
| shadow | PASS | soft indigo tint, low opacity |

## Semantic tokens — dark mode

| Group | Status | Notes |
| ----- | ------ | ----- |
| bg | PASS | `#12121C` not pure black |
| surface | WEAK | Luminance delta small; borders carry hierarchy |
| text | PASS | gray[50] primary |
| border | PASS | `#454560` default, `#505070` input |
| status | PASS | rgba 0.2 + `-700` borders |
| shadow | WEAK→PASS | opacity reduced from 0.35–0.5 to 0.20–0.35 |

---

## Shared scales

| Group | Status | Notes |
| ----- | ------ | ----- |
| radius | PASS | lg buttons, xl cards — aligned |
| typography | PASS | mobile line-heights, weight hierarchy |
| spacing | PASS | 4px base, md=16 |

---

## Component tokens — by family

### Family A: Layout

| Component | Status | Issue / fix |
| --------- | ------ | ----------- |
| card | PASS | fill + border + optional sm shadow |
| paper | PASS | flat uses sunken + default border |
| divider | PASS | border.subtle (strengthened semantic) |
| box/stack/grid | PASS | layout only |

### Family B: Actions

| Component | Status | Issue / fix |
| --------- | ------ | ----------- |
| button solid | PASS | brand fill + sm shadow |
| button outline | PASS | surface + border.default |
| button ghost | PASS | brand text + pressed subtle |
| button disabled | WEAK | opacity 50 — acceptable with border variants |
| toggleButton | PASS | shared button patterns |
| fab/speedDial | PASS | solid + shadow |

### Family C: Forms

| Component | Status | Issue / fix |
| --------- | ------ | ----------- |
| input | PASS | surface + border.input |
| textField/textArea | PASS | extends input |
| formGroup grouped | PASS | border.default shell |
| checkbox | PASS | border.default, 44px hit area |
| switch | PASS | muted track off |
| slider/otp | PASS | uses semantic borders |

### Family D: Status / Feedback

| Component | Status | Issue / fix |
| --------- | ------ | ----------- |
| badge default | FAIL→PASS | bg → surface.sunken (was white on white) |
| chip solid | FAIL→PASS | bg → surface.sunken |
| alert | PASS | severity bg+border+text |
| toast/snackbar | PASS | border + raised/status fill |
| skeleton | PASS | surface.sunken pulse |
| emptyState | WEAK→PASS | icon wrap sunken + border |
| progress | PASS | brand/status colors |

### Family E: Overlay / Navigation

| Component | Status | Issue / fix |
| --------- | ------ | ----------- |
| modal | FAIL→PASS | add border.default |
| dialog | FAIL→PASS | add border.default |
| bottomSheet | FAIL→PASS | add top border |
| menu/popover | PASS | border.default |
| select menu | WEAK→PASS | explicit borderWidth |
| tabs | PASS | border.default container |
| appBar | WEAK→PASS | bottom border, shadow sm |
| tooltip | PASS | inverse fill (high contrast) |

### Family F: Data display

| Component | Status | Issue / fix |
| --------- | ------ | ----------- |
| list inset | PASS | raised + border |
| table | WEAK→PASS | row borders → border.default |
| pagination | WEAK→PASS | default item surface + border |
| timeline/breadcrumbs | PASS | subtle separators OK |

---

## Brand themes

| Brand | bg vs surface | Status |
| ----- | ------------- | ------ |
| default | tinted bg, stepped raised | PASS (Phase 4C) |
| forest | tinted green canvas | PASS |
| love | rose canvas | PASS |
| ocean | teal canvas | PASS |
| sunset | warm canvas | PASS |
| midnight | slate canvas light mode | PASS |
| telegram | N/A | — |

---

## Equal / near-equal pairs (pre-fix)

| Pair | Was | Fix |
| ---- | --- | --- |
| surface.default === surface.raised | FAIL | raised `#FAFAFE` |
| bg.default === surface.default (brands) | FAIL | tinted bg |
| badge default on white card | FAIL | sunken fill |
| modal/dialog no border | FAIL | border.default |
| dark shadow opacity 0.5 | WEAK | reduced |

---

## Shadow-dependent components (watch list)

Components that include shadow but pass no-shadow via border:

- Card, Paper, Button solid, Toast, Snackbar, Menu, Modal, Dialog, AppBar

All have border and/or fill contract after this reset.

---

## Files to change (this reset)

1. `packages/tokens/src/semantic.ts`
2. `packages/tokens/src/components/badge.ts`, `chip.ts`, `modal.ts`, `dialog.ts`, `bottomSheet.ts`, `appBar.ts`, `emptyState.ts`, `pagination.ts`, `select.ts`, `table.ts`
3. `scripts/audit-surface-contrast.mjs` — brand section
4. `apps/example/app/components/SurfaceVisibility.tsx`
5. `docs/src/content/docs/components/visual-baseline.mdx`
6. `packages/tokens/src/__tests__/tokens.test.ts`
