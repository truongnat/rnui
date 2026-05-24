---
title: Example app
description: Run the RNUI example app to validate overlays, status surfaces, and demos on real devices.
---

# Example app

The monorepo includes **`apps/example`** — an Expo Router app with one screen per component. Use it for **native visual QA**; docs previews are CSS staging and do not replace simulator/device checks.

## Run locally

From the repository root:

```bash
bun install
cd apps/example
bun run ios      # iOS simulator (dev client)
# or
bun run android  # Android emulator
# or
bun run start    # Expo Go / dev client picker
```

Requirements match [Getting started](/getting-started/): React Native 0.83+, Reanimated, Gesture Handler, Safe Area Context.

## What to verify

### Overlays (Modal / Dialog / AlertDialog)

| Screen | What to check |
| ------ | ------------- |
| **Modal** | Host inset, form modal keyboard, full-screen mode |
| **Dialog** | Confirmation + form-in-dialog layouts |
| **AlertDialog** | Standard + destructive confirmations |

See [Modal](/components/modal/), [Dialog](/components/dialog/), [AlertDialog](/components/alert-dialog/).

### Status & feedback

| Screen | What to check |
| ------ | ------------- |
| **Alert** | Compound `AlertTitle` + `Typography` severity colors |
| **Toast** | Action label contrast; status variants |
| **Snackbar** | Elevated surface on app background |
| **Badge** / **Chip** | Visible fills on default app canvas |

### High-traffic patterns

- **Button**, **Input**, **Form**, **Card** — copy and spacing agents should mirror
- **BottomSheet**, **Drawer** — gesture and safe-area behavior

## Device QA checklist

Full pass/fail checklist (iPhone + Android, light + dark): see the repo file `.planning/device-qa-checklist.md` or the [Visual Baseline → Native QA](/components/visual-baseline/#native-overlay-qa) section.

## For AI agents

When generating UI:

1. Prefer patterns from **example app source** (`apps/example/app/components/*.tsx`) over inventing layout.
2. Use compound helpers (`ModalHeader`, `ModalFooter`, `AlertTitle`) — not manual white boxes or hardcoded padding.
3. Confirm overlays and status surfaces on the example app before claiming “production ready.”

## Related

- [Visual Baseline](/components/visual-baseline/) — token-aligned CSS reference
- [Component Status](/components/status/) — stability matrix
- [AI usage](/guides/ai-usage/) — agent guidelines
