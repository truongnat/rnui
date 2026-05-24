# Professional UI Reference Notes

Design quality references for RNUI reset. **Conceptual only** — no source copied from third-party libraries.

---

## What RNUI should copy conceptually

### shadcn/ui
- Clean white/zinc surfaces on tinted canvas
- 1px subtle borders define edges; shadow is optional
- Restrained radius (md/lg for cards, not pill-everything)
- Status uses muted fill + semantic border + readable text
- Focus rings visible but not neon

### Radix UI Themes
- Neutral surface scale with clear steps (1–12 mental model)
- Accent color used sparingly for actions and selection
- Accessible contrast baked into token pairs
- Component states are predictable across families

### Tamagui
- Cross-platform token scales: space, radius, size
- Variants derive from shared recipes, not one-off styles
- Press/hover/focus states share timing and opacity patterns

### React Native Paper
- Mobile-native control heights (44px touch targets)
- Elevation discipline — higher surfaces get shadow, not every element
- Material states: ripple/pressed feedback without layout shift

### NativeBase / Gluestack
- Token-driven component families share bg/border/text
- Theme swap changes semantic colors, not component code
- Consistent spacing rhythm (4px base)

### iOS Human Interface
- Soft app canvas, elevated cards, inset grouped lists
- Restrained depth — blur/glass optional, never required
- Typography hierarchy via weight/size, not excessive color

---

## What RNUI should avoid

- Bootstrap-style heavy black drop shadows
- White-on-white surfaces with no border
- Pastel status fills that vanish on white/card
- Pill buttons as the default for every action
- Neon dark-mode glow borders
- Glass/blur as the only visibility mechanism
- Per-component random hex values bypassing semantic tokens
- Demo-only wrapper backgrounds that hide weak components
- Fixing invisibility by increasing shadow only

---

## Surface rules

| Layer | Role |
| ----- | ---- |
| App canvas | Tinted `bg.default` — never pure white page |
| Base surface | `surface.default` — cards, inputs, panels |
| Raised | `surface.raised` — nested card, toast, snackbar |
| Sunken | `surface.sunken` — inset wells, disabled, flat paper |
| Overlay | `surface.overlay` — modal, sheet, menu shell |
| Glass | Translucent fill + mandatory `glassBorder` |
| Disabled | Distinct from normal — sunken or muted, not identical |

**Rule:** Every shell visible with `shadow.none` via fill + border.

---

## Spacing rules

- 4px base grid (`spacing[1]` = 4)
- Card padding: sm 12 / md 16 / lg 24
- Form field gap: md (16) between fields, sm (8) label-to-control
- Section spacing on screens: lg+ between QA blocks
- Touch targets ≥ 44px for md controls (button, input, checkbox hit area)

---

## Radius rules

| Token | Use |
| ----- | --- |
| `xs` | Tooltip, small chips |
| `sm` | Checkbox, menu item, badge inner |
| `md` | Inputs, menus, list inset |
| `lg` | Buttons, alerts, segmented control |
| `xl` | Cards, modals, dialogs, toast |
| `2xl` | Hero cards (rare) |
| `full` | Avatar, icon-only FAB, pills when intentional |

Buttons default to `lg` (rounded-lg), not pill. Cards/dialogs use `xl`.

---

## Border rules

| Token | Use |
| ----- | --- |
| `subtle` | Dividers, table row hairlines — still perceivable |
| `default` | Component shells (card, menu, list inset) |
| `strong` | Emphasis separators, sheet handle |
| `input` | Form controls |
| `focus` | Focus ring color |
| Status `*-border` | Alert, badge, chip edges |

Never fully transparent on component outlines.

---

## Shadow / elevation rules

- Light: tinted indigo shadow, opacity 0.04–0.10
- Dark: soft black, opacity 0.20–0.35 (not 0.5+)
- `sm` — buttons, cards default
- `md` — toast, app bar (optional if border present)
- `lg` — modal, menu
- `xl` — bottom sheet only
- No-shadow test must pass for all surface components

---

## Status color rules

Each severity: **bg + border + text + icon + emphasis**

- Light: `-100` bg, `-300` border, `-800` text (not `-50` washout)
- Dark: ~20% alpha bg, `-700` border, `-400` text
- Visible on app, white, card, glass, dark panels
- Not neon, not invisible pastel

---

## Component state rules

| State | Standard |
| ----- | -------- |
| Default | Token fill + border |
| Hover (web) | `bg.hover` or subtle fill shift |
| Pressed | Darker fill / opacity, no layout shift |
| Focused | `border.focus` ring |
| Disabled | Reduced opacity + sunken/muted fill |
| Loading | Spinner in-place, opacity on label |
| Selected | Brand subtle fill + border or indicator |
| Error | `border.error` + error text token |
| Success | Status success tokens |

---

## RNUI application priority

1. Fix semantic neutral foundation
2. Fix shared component token recipes
3. Audit script guardrail
4. Native QA matrix (SurfaceVisibility)
5. Brand themes inherit fixes via semantic structure
