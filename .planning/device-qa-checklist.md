# Device QA Checklist — RNUI Example App

**Use when:** After overlay, status-surface, or token changes (Phases 2A–4B).  
**Where:** `apps/example` on iOS simulator/device and at least one Android emulator.  
**Results log:** `.planning/device-qa-results.md`

---

## Setup

```bash
cd apps/example
bun install   # from repo root if needed
bun run ios   # or: bun run android / bun run start
```

Toggle **light / dark** in system settings between passes. Use **Switch → Appearance** screen for in-app dark mode toggle.

---

## Overlays (Phase 2A / 4B)

| Platform | Screen | Expected result | Status | Notes |
|----------|--------|-----------------|--------|-------|
| iOS | Modal → Basic | Visible edge inset; title not clipped on open | ☐ | |
| iOS | Modal → Form | Keyboard does not cover footer actions | ☐ | |
| iOS | Modal → Fullscreen | No host inset; content fills screen | ☐ | |
| iOS | Dialog → Confirmation | Centered; inset from edges; actions visible | ☐ | |
| iOS | Dialog → Form | Input focus + keyboard avoidance | ☐ | |
| iOS | AlertDialog → Destructive | Same inset as Dialog; buttons not clipped on notch | ☐ | |
| Android | Modal → Basic | Edge inset; backdrop dismiss | ☐ | |
| Android | Modal → Form | Keyboard does not cover actions | ☐ | |
| Android | Dialog → Confirmation | Centered; actions visible | ☐ | |
| Android | Dialog → Form | Keyboard avoidance | ☐ | |
| Android | AlertDialog → Destructive | Buttons not clipped | ☐ | |

---

## Toast / Snackbar (Phase 2B / 4B)

| Platform | Screen | Expected result | Status | Notes |
|----------|--------|-----------------|--------|-------|
| iOS | SurfaceVisibility → Toast triggers | Default/success/warning/error/info readable; border visible | ☐ | |
| iOS | SurfaceVisibility → Undo toast | Action label contrast on variant bg | ☐ | |
| iOS | SurfaceVisibility → Snackbar | Simple + Undo; elevated surface not shadow-only | ☐ | |
| iOS | Toast screen | All variant buttons | ☐ | |
| iOS | Snackbar screen | Undo action contrast | ☐ | |
| Android | SurfaceVisibility → Toast/Snackbar | Safe area; positioning | ☐ | |
| Light | Toast/Snackbar | Status colors readable | ☐ | |
| Dark | Toast/Snackbar | Backdrop + surface readable | ☐ | |

---

## Status surfaces (Phase 2B)

| Platform | Screen | Expected result | Status | Notes |
|----------|--------|-----------------|--------|-------|
| iOS | Alert → Surface visibility | 4 severities × 5 panels; text + border visible | ☐ | |
| iOS | Alert → Standard | Title + body share severity color | ☐ | |
| iOS | Alert → Filled / Outlined | Filled inverse text; outlined border on app bg | ☐ | |
| iOS | Badge | Default + accent on app bg | ☐ | |
| iOS | Chip | Solid + outlined on tinted canvas | ☐ | |

---

## Surface matrix (Phase 4B)

| Platform | Screen | Expected result | Status | Notes |
|----------|--------|-----------------|--------|-------|
| iOS | SurfaceVisibility → App/Card/White/Glass | NoShadowRow visible without shadow | ☐ | |
| iOS | SurfaceVisibility → Dark panel | Full stack on inverse bg | ☐ | |
| iOS | SurfaceVisibility | Paper flat + elevation none | ☐ | |
| iOS | SurfaceVisibility | Alert standard/outlined/filled in matrix | ☐ | |
| iOS | FormField → Grouped (iOS) | Outer grouped card border on white/card | ☐ | |
| Android | SurfaceVisibility | Same panels | ☐ | |
| Light/Dark | SurfaceVisibility | Borders readable both modes | ☐ | |

---

## Cross-cutting

| Check | Status | Notes |
|-------|--------|-------|
| Safe area — no content under notch / home indicator on overlays | ☐ | |
| Dark mode — overlay backdrop + surfaces readable | ☐ | |
| Back button (Android) — dismisses Modal/Dialog where `onClose` set | ☐ | |
| VoiceOver / TalkBack — backdrop dismiss labels (spot-check) | ☐ | |

---

## Alternate brand themes

If testing themed builds, spot-check **Badge**, **Chip**, and **FormField grouped** on forest / love / ocean canvases.

---

## Docs cross-check

After native pass, confirm [Visual Baseline](/components/visual-baseline/) CSS staging still matches intent (not pixel-perfect native).

Related: [visual-quality-checklist.md](./visual-quality-checklist.md), [phase-4b-device-surface-plan.md](./phase-4b-device-surface-plan.md)
