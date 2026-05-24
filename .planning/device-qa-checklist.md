# Device QA Checklist — RNUI Example App

**Use when:** After overlay, status-surface, or token changes (Phases 2A–2C).  
**Where:** `apps/example` on iOS simulator/device and at least one Android emulator.

---

## Setup

```bash
cd apps/example
bun install   # from repo root if needed
bun run ios   # or: bun run android / bun run start
```

Toggle **light / dark** in system settings between passes.

---

## Overlays (Phase 2A)

| Screen | Check |
|--------|-------|
| **Modal → Basic** | Visible edge inset; title not clipped on open animation |
| **Modal → Form** | Keyboard does not cover footer actions (iOS) |
| **Modal → Full screen** | No host inset; content fills screen |
| **Dialog → Confirmation** | Centered; inset from edges; actions visible |
| **Dialog → Form** | Input focus + keyboard avoidance |
| **AlertDialog → Destructive** | Same inset as Dialog; buttons not clipped on notch |

---

## Status surfaces (Phase 2B)

| Screen | Check |
|--------|-------|
| **Alert → Standard** | Title + body share severity color without manual props |
| **Alert → Filled / Outlined** | Filled uses inverse text; outlined border reads on app bg |
| **Toast** | Action label (“Undo”) readable on default + status variants |
| **Snackbar** | Elevated card on app bg (not heavy inverse slab) |
| **Badge** | Default + **accent** visible on `#F3F1F8` canvas |
| **Chip** | Solid default reads as raised pill, not gray slab |

---

## Cross-cutting

- [ ] **Safe area** — no content under notch / home indicator on overlay screens
- [ ] **Dark mode** — overlay backdrop + surfaces readable
- [ ] **Back button (Android)** — dismisses Modal/Dialog where `onClose` set
- [ ] **VoiceOver / TalkBack** — backdrop dismiss labels announced (spot-check)

---

## Alternate brand themes

If testing themed builds, spot-check **Badge** and **Chip** on forest / love / ocean canvases.

---

## Docs cross-check

After native pass, confirm [Visual Baseline](/components/visual-baseline/) CSS staging still matches intent (not pixel-perfect native).

Related: [visual-quality-checklist.md](./visual-quality-checklist.md)
