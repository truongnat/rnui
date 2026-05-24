# Phase 2C — Core Components Visual Polish — Summary

**Date:** 2026-05-24  
**Branch:** develop (uncommitted)  
**Scope:** Button, Input, TextField, Card, Paper, Typography, Stack, Box, Switch, Checkbox

---

## Visual problems found

- Input/Button height mismatch in forms (48 vs 44)
- Paper invisible on app background (no default border/shadow)
- Typography headings too heavy for mobile
- Checkbox below 44dp touch target
- Card raw string children crash RN
- Examples were generic component dumps

## Token changes

| Component | Change |
|-----------|--------|
| **Button** | Medium weight on solid/accent; lg 52dp; outline border `default`; destructive pressed `error.emphasis` |
| **Input** | Heights 36/44/52; radius `lg`; unified disabled; helper `secondary`; label medium weight |
| **Paper** | Default border + `shadow.sm`; radius `xl` |
| **Checkbox** | Larger boxes (20/24/28); 44dp touch container tokens |
| **Typography (semantic)** | h1 600; h2–h6 500 |
| **Typography (component)** | Removed uppercase from `button` variant |

## Component changes

| Component | Change |
|-----------|--------|
| **Card** | String/number children wrapped in `Text`; pressable uses `ViewAnimatedStyle` |
| **Checkbox** | 44×44 touch wrapper; token-based checkmark weight |

## Examples updated

- **Button** — Pro workspace hero CTA card
- **Input** — Sign-in form in Card
- **TextField** — Profile setup copy
- **Card** — Payment method hero
- **Paper** — Account profile surface
- **Typography** — Order confirmation article block
- **Switch** — Notification preferences list
- **Checkbox** — Checkout consent

## Docs

- `visual-baseline.mdx` — 44px input note
- `input.mdx` — size table + accessibility
- `button.mdx` — lg 52px + radius guidance

## Tests

- `tokens.test.ts` — button lg 52; input height alignment
- `Card.test.tsx` — string children wrap

## Verification

| Command | Result |
|---------|--------|
| `bun run build` | Run after pull |
| `bun run typecheck` | Run after pull |
| `bun run lint` | Run after pull |
| `bun run test` | Run after pull |
| `bun run docs:build` | Run after pull |

## Manual QA

1. **Button screen** — hero card CTA; md buttons feel 44dp
2. **Input screen** — sign-in card; field + button aligned height
3. **Paper screen** — profile block visible on app bg without custom bg
4. **Checkbox** — tap target comfortable; checked state clear
5. **Typography** — headings not overly bold on device
6. **Dark mode** — Paper/Card/Input borders readable

## Remaining / deferred

- TextField public `variant` still unused (document only)
- Stack/Box — token-only; no component code changes needed
- UI lint warnings batch (engineering debt)
- Status surfaces (Phase 2B) — regression spot-check only

See `.planning/phase-2c-core-components-investigation.md`.
