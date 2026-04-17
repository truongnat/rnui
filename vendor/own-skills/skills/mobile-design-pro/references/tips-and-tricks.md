# Mobile design tips and tricks

## Onboarding

- **Short** — Value in first screen; defer account creation if possible (**progressive**).
- **Permissions** — Request **in context** (camera when user taps scan), not on launch in a block.

## Content

- **Scannable** — Headings, bullets, **one idea** per screen for critical flows (checkout, verify).
- **Offline** — Clear **cached** vs **live** state; **retry** without losing input.

## Feedback

- **Haptics** — Light confirmation for success; don’t overuse (**accessibility**: respect reduce motion / system settings where applicable).
- **Toasts / snackbars** — Short; **undo** for destructive when feasible.

## Gestures

- **Pull-to-refresh** + **infinite scroll** — “End of list” state; **loading** at bottom for pagination.

## Biometrics and security

- **Face ID / fingerprint** — Faster than password; **fallback** path always visible (PIN).
- **Sensitive screens** — **Screenshot** blocking only when policy requires (UX cost).

## Dark mode on mobile

- Follow **`design-system-pro`** deep dive; test **OLED** black vs gray and **system** appearance.

## Review checklist (quick)

- [ ] Tap targets and spacing sanity pass on **real device**.
- [ ] **Large text** mode doesn’t break layouts.
- [ ] **RTL** mirror if you ship Arabic/Hebrew (see edge cases).
