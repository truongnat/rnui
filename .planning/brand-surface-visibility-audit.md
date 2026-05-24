# Brand Surface Visibility Audit

**Date:** 2026-05-24  
**Brands:** default, forest, love, ocean, sunset, midnight  
**Check scenarios:** bg vs surface, card on app, badge/chip on card, input in card, formGroup in card

---

## Summary

| Brand | bg vs surface (before) | raised step (before) | border strength | Action taken |
| ----- | ---------------------- | -------------------- | --------------- | ------------ |
| default | Collapsed (`#FFF`/`#FFF`) | Collapsed | OK (`#E2E8F0`) | Tint bg, step raised |
| forest | Collapsed | Collapsed | Weak pastel | Tint bg, step raised, strengthen border |
| love | Collapsed | Collapsed | Weak (`#FECDD3`) | Tint bg, step raised, strengthen border |
| ocean | Collapsed | Collapsed | Weak (`#CCFBF1`) | Tint bg, step raised, strengthen border |
| sunset | Collapsed | Collapsed | Weak (`#FFEDD5`) | Tint bg, step raised, strengthen border |
| midnight | Collapsed | Collapsed | OK slate borders | Tint bg, step raised |

No brand personality overhaul — single-step hierarchy and border darkening only.

---

## Per-brand detail

### default

- **Before:** `bg.default` `#FFFFFF`, `surface.raised` `#FFFFFF`
- **After:** `bg.default` `#F8FAFC`, `surface.raised` `#FCFCFD`
- **Card on app:** White card on cool gray canvas + `#E2E8F0` border — pass
- **Badge on card:** Default variant border-dependent — monitor on device
- **Input in card:** `border.input` unchanged — pass
- **FormGroup:** Uses semantic `border.default` — pass

### forest

- **Before:** White canvas, `#D1FAE5` border (very faint)
- **After:** `bg.default` `#F0FDF4`, `surface.raised` `#FAFDFB`, `border.default` `#A7F3D0`
- **Risk:** Green tint may reduce badge contrast — verify success badge on card

### love

- **Before:** White canvas, `#FECDD3` border
- **After:** `bg.default` `#FFF1F2`, `surface.raised` `#FFFBFC`, `border.default` `#FDA4AF`
- **Risk:** Rose borders stronger; default badge still border-led on white card

### ocean

- **Before:** White canvas, `#CCFBF1` border
- **After:** `bg.default` `#F0FDFA`, `surface.raised` `#F8FEFC`, `border.default` `#99F6E4`
- **Risk:** Teal subtle borders — OK for inputs; check info badge on card

### sunset

- **Before:** White canvas, `#FFEDD5` border
- **After:** `bg.default` `#FFF7ED`, `surface.raised` `#FFFCF8`, `border.default` `#FED7AA`
- **Risk:** Warm canvas helps card separation; warning badges may blend — device check

### midnight

- **Before:** White light mode (despite dark preview), collapsed raised
- **After:** `bg.default` `#F8FAFC`, `surface.raised` `#FCFCFD`
- **Dark mode:** Unchanged — already strong separation (`#0D0D1A` bg vs `#1A1A28` surface)

---

## Scenarios not auto-tested

Brand theme switching in example app — manual QA recommended per theme:

1. SurfaceVisibility on app bg
2. Card nested in Card
3. Badge default + success on card panel
4. Input + FormGroup grouped inside Card

---

## Files changed

- `packages/themes/src/brands/default.ts`
- `packages/themes/src/brands/forest.ts`
- `packages/themes/src/brands/love.ts`
- `packages/themes/src/brands/ocean.ts`
- `packages/themes/src/brands/sunset.ts`
- `packages/themes/src/brands/midnight.ts`

---

## Remaining brand risks

- **Neutral Badge/Chip** on white `surface.default` still relies on border — consider sunken fill in a future pass if device QA fails.
- **telegram** brand not present in repo — N/A.
- Brand **dark mode** palettes were not modified; light-mode collapse was the primary regression.
