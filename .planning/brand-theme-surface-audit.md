# Brand Theme Surface Audit

**Date:** 2026-05-24  
**Scope:** Professional UI system reset  
**Brands:** default, forest, love, ocean, sunset, midnight (telegram N/A)

---

## Summary

All six brands inherit core semantic shadow + component token fixes via `buildSemanticTokens`. Light-mode brand color groups were hardened in Phase 4C; this reset validates hierarchy against the design foundation contract.

| Brand | bg.default | surface.default | surface.raised | border.default | Status |
| ----- | ---------- | --------------- | -------------- | -------------- | ------ |
| default | `#F8FAFC` | `#FFFFFF` | `#FCFCFD` | `#E2E8F0` | PASS |
| forest | `#F0FDF4` | `#FFFFFF` | `#FAFDFB` | `#A7F3D0` | PASS |
| love | `#FFF1F2` | `#FFFFFF` | `#FFFBFC` | `#FDA4AF` | PASS |
| ocean | `#F0FDFA` | `#FFFFFF` | `#F8FEFC` | `#99F6E4` | PASS |
| sunset | `#FFF7ED` | `#FFFFFF` | `#FFFCF8` | `#FED7AA` | PASS |
| midnight | `#F8FAFC` | `#FFFFFF` | `#FCFCFD` | slate borders | PASS |

---

## Checks per brand

1. `bg.default` ≠ `surface.default` (tinted canvas vs white card)
2. `surface.raised` ≠ `surface.default` (nested card step)
3. `border.default` perceptible on white card
4. Badge default uses core `surface.sunken` via component tokens (brand-agnostic)
5. Modal/dialog borders from component tokens (brand-agnostic)

---

## Scenario matrix (manual QA)

For each brand in example app theme switcher:

| Scenario | Expected |
| -------- | -------- |
| Card on app bg | White card + border on tinted canvas |
| Card in Card | Inner raised fill visible |
| Badge on Card | Sunken neutral fill + border |
| Input in Card | Input border visible |
| FormGroup grouped | Outer grouped border |

---

## Remaining risks

- Pastel brand borders (forest/ocean) may feel soft on white — device verify
- Brand dark modes unchanged; rely on core dark semantic tokens
- Status badges on strongly tinted brand cards — spot-check success/warning

---

## Files

- `packages/themes/src/brands/*.ts` — light color groups
- Automated: `bun run surface:audit` brand section
