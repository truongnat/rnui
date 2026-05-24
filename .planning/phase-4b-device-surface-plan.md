# Phase 4B — Device QA + Surface Hardening Plan

**Date:** 2026-05-24  
**Branch:** `develop`  
**Sources:**
- `.planning/phase-4a-quality-gate-audit.md`
- `.planning/design-quality-audit.md` (surface/token context — no broad redesign in 4B)
- `.planning/device-qa-checklist.md`

---

## Baseline (Phase 4A)

Engineering gates green: build, typecheck, lint, test, docs, schema, AI checks pass. Remaining work is **device QA + surface hardening** before builder/product expansion.

**Design-quality-audit context (2026-05-23):** Documents pre–surface-contrast-pass issues (generic bg, heavy shadows, badge/toast surfaces). Phase 2B/4B token fixes address many items. **4B does not reopen** broad token redesign from that doc.

---

## Selected scope (in phase)

| ID | Item | Status |
|----|------|--------|
| P0-1 | Device QA — overlays | Checklist + results doc (manual) |
| P0-2 | Device QA — Toast/Snackbar | Triggers on SurfaceVisibility (manual) |
| P0-4 | Extend SurfaceVisibility matrix | **Implemented** |
| P1-1 | FormGroup grouped border | **Implemented** |
| P1-3 | Alert surface matrix | **Implemented** |
| P1-6 | Dialog example token cleanup | **Implemented** |
| P1-7 | TextField KeyboardAvoidingView | **Implemented** |

## Out of scope

- P0-3 Toast schema import drift → Phase 4C
- P1-2 Brand theme surface audit → Phase 4D
- P1-4 / P1-5 Schema drift + CI → Phase 4C
- Real AI API, SEO landing, schema expansion to 77 components
- Lint warning triage, wide semantic token changes
- Public API changes

---

## Files changed

```
apps/example/app/components/SurfaceVisibility.tsx
apps/example/app/components/Alert.tsx
apps/example/app/components/Dialog.tsx
apps/example/app/components/TextField.tsx
packages/tokens/src/components/formGroup.ts
packages/tokens/src/__tests__/tokens.test.ts
.planning/device-qa-checklist.md
.planning/device-qa-results.md
.planning/phase-4b-device-surface-summary.md
```

---

## Manual QA steps (from device-qa-checklist)

### Setup

```bash
cd apps/example
bun run ios   # or: bun run android / bun run start
```

Toggle light/dark via system settings or **Switch → Appearance**.

### Overlays

| Platform | Screen | Expected | Status |
|----------|--------|----------|--------|
| iOS | Modal → Basic | Edge inset; title not clipped | ☐ |
| iOS | Modal → Form | Keyboard does not cover footer | ☐ |
| iOS | Modal → Fullscreen | Fills screen | ☐ |
| iOS | Dialog → Confirmation | Centered; actions visible | ☐ |
| iOS | Dialog → Form | KAV with focused input | ☐ |
| iOS | AlertDialog → Destructive | Buttons not clipped on notch | ☐ |
| Android | Modal → Basic | Edge inset; backdrop dismiss | ☐ |
| Android | Modal → Form | Keyboard does not cover actions | ☐ |
| Android | Dialog → Confirmation | Actions visible | ☐ |
| Android | Dialog → Form | Keyboard avoidance | ☐ |
| Android | AlertDialog → Destructive | Buttons not clipped | ☐ |

### Toast / Snackbar

| Platform | Screen | Expected | Status |
|----------|--------|----------|--------|
| iOS | SurfaceVisibility → Toast | All variants + Undo; border visible | ☐ |
| iOS | SurfaceVisibility → Snackbar | Simple + Undo; action contrast | ☐ |
| iOS | Toast / Snackbar screens | Full variant coverage | ☐ |
| Android | SurfaceVisibility | Safe area + positioning | ☐ |
| Light/Dark | Toast/Snackbar | Readable on both | ☐ |

### Status surfaces

| Platform | Screen | Expected | Status |
|----------|--------|----------|--------|
| iOS | Alert → Surface visibility | 4 severities × 5 panels | ☐ |
| iOS | Badge / Chip | Default + accent on app bg | ☐ |

### Surface matrix

| Platform | Screen | Expected | Status |
|----------|--------|----------|--------|
| iOS | SurfaceVisibility | All panels; no-shadow row | ☐ |
| iOS | SurfaceVisibility | Paper flat + elevation none | ☐ |
| iOS | SurfaceVisibility | Alert standard/outlined/filled | ☐ |
| iOS | SurfaceVisibility → Dark | Full stack | ☐ |
| iOS | FormField → Grouped | Outer border on white/card | ☐ |
| Light/Dark | SurfaceVisibility | Borders readable | ☐ |

### Cross-cutting

- ☐ Safe area on overlays
- ☐ Dark mode backdrop + surfaces
- ☐ Android back dismisses Modal/Dialog
- ☐ VoiceOver / TalkBack spot-check

**Results:** Record in `.planning/device-qa-results.md`. Do not mark pass unless verified on simulator/device.

---

## Implementation notes

- Toast/Snackbar: global overlays — SurfaceVisibility uses trigger buttons + QA copy.
- FormGroup: `borderWidth: 1`, `borderColor: border.default` on grouped card.
- Surface rule: visibility via fill + border, not shadow/blur/glass tricks.

---

## Verification commands

```bash
bun run build
bun run typecheck
bun run lint
bun run test
bun run docs:build
bun run component-schema:check
bun run ai:check
```
