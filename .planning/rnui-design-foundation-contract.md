# RNUI Design Foundation Contract

**Source of truth** for all visual fixes in RNUI. Components and tokens must comply.

Related: `.planning/professional-ui-reference-notes.md` · enforcement: `scripts/audit-surface-contrast.mjs`

---

## A. Surface hierarchy

| Token | Purpose |
| ----- | ------- |
| `color.bg.default` | App/page canvas — tinted, never identical to card fill |
| `color.surface.default` | Primary component surface |
| `color.surface.raised` | Elevated / nested surfaces |
| `color.surface.sunken` | Inset wells, flat paper, disabled fields |
| `color.surface.overlay` | Modal, dialog, sheet, menu panel |
| `color.surface.glass` | Translucent overlay fill |
| `color.surface.disabled` | Non-interactive muted surface |

### Rules

1. Surface must be visible **without shadow** (fill contrast and/or 1px border).
2. Shadow enhances depth only — never the primary recognition cue.
3. Nested surfaces must remain distinguishable:

| Nesting | Requirement |
| ------- | ----------- |
| Card on app bg | White/tinted fill + `border.default` |
| Card in Card | Inner `surface.raised` + border |
| Input in Card | `surface.default` + `border.input` |
| Badge in Card | Fill + border (neutral uses sunken fill) |
| FormGroup in Card | Grouped shell border |
| Menu/Popover on surface | `surface.overlay` + `border.default` |

---

## B. Border hierarchy

| Token | Purpose |
| ----- | ------- |
| `border.subtle` | Dividers, internal row lines — still visible |
| `border.default` | Component shell outline |
| `border.strong` | Emphasis, handles |
| `border.input` | Form control edge |
| `border.focus` | Focus state |
| Status borders | Per-severity semantic border |

### Rules

- Perceptible but soft (~gray-200/300 light, muted violet-gray dark).
- Default border must not disappear on white/card.
- Focus visible, not harsh neon.

---

## C. Radius scale

| Token | Components |
| ----- | ---------- |
| `sm` | Menu items, small controls |
| `md` | List inset, select menu |
| `lg` | Button, input, alert, segmented control |
| `xl` | Card, modal, dialog, toast, paper |
| `2xl` | Rare hero surfaces |
| `full` | Avatar, FAB, intentional pills only |

- Buttons: `radius.lg` default (not pill).
- Cards/dialogs: `radius.xl` premium corners.
- Inputs align with button `lg`.

---

## D. Shadow / elevation

| Level | Use |
| ----- | --- |
| `none` | No-shadow QA, flat variants |
| `sm` | Card, paper default, button solid |
| `md` | Toast, select menu |
| `lg` | Modal, dialog, menu |
| `xl` | Bottom sheet |

### Rules

- No heavy Bootstrap black shadows.
- No neon dark-mode glow.
- Soft mobile-native elevation.
- **No-shadow visibility test required** for all surface components.

---

## E. Typography

- Hierarchy via size + weight, not excessive font sizes.
- Headings: semibold/medium, not ultra-bold stacks.
- Body: 16/14 mobile-friendly with 1.5 line-height.
- `text.primary`: readable slate, not harsh `#000`.
- `text.secondary/tertiary`: clear steps for labels/captions.

---

## F. Status surfaces

Required per severity: **bg, text, border, icon, emphasis**

- Visible on app, white, card, glass, dark.
- Light: saturated enough to read, not neon.
- Dark: ~20% alpha fill + `-700` border.
- Badge/Chip/Alert/Toast/Snackbar all comply.

---

## G. Component states

| State | Token pattern |
| ----- | ------------- |
| Default | Base fill + border |
| Hover | `bg.hover` / subtle fill |
| Pressed | Darker brand/status or opacity |
| Focused | `border.focus` |
| Disabled | Opacity + sunken/muted fill |
| Loading | In-place spinner, no layout shift |
| Selected | `brand.subtle` + indicator/border |
| Error | `border.error` + error text |
| Success | Status success tokens |

Touch targets ≥ 44px for md+ interactive controls.

---

## Component family checklist

| Family | Key contract |
| ------ | ------------ |
| Layout (Card, Paper, Divider) | Fill + border, nested raised |
| Actions (Button, Toggle) | Outline/ghost visible, disabled readable |
| Forms (Input, FormGroup) | Visible in card, grouped border |
| Status (Badge, Alert, Toast) | bg + border + text |
| Overlay (Modal, Menu, Select) | Panel border + fill |
| Data (List, Table, Tabs) | Row separation without shadow only |

---

## QA

- Native: `SurfaceVisibility` example screen
- Automated: `bun run surface:audit`
- Docs CSS preview is approximate — native app is truth
