# Surface Layering Rules

Hard rules for RNUI surface hierarchy. **Shadow may enhance depth; it must never be required for visibility.**

## 1. No-shadow visibility

Every surface component (Card, Paper, Badge, Chip, Alert, Input, Button variants, Toast, Snackbar) must remain recognizable when `shadow.none` / `elevation="none"` is applied.

## 2. Separation hierarchy (in order)

1. **Background contrast** — component fill differs from parent (`surface.default` on `bg.default`, `surface.sunken` for inset)
2. **Subtle border** — 1px `border.default` or semantic status border
3. **Spacing** — padding/gap between grouped surfaces
4. **Radius** — continuous corners for mobile-native feel
5. **Content hierarchy** — typography weight/color before more chrome
6. **Shadow** (optional) — `shadow.sm` and up for elevation cues only

## 3. Semantic token roles

| Token | Role |
| ----- | ---- |
| `color.bg.default` | App/page canvas — tinted, never pure white |
| `color.surface.default` | Primary component surface — clean white (light) |
| `color.surface.raised` | Elevated surface — same or one step above default |
| `color.surface.sunken` | Inset wells, disabled inputs, Paper flat |
| `color.border.subtle` | Hairlines inside components |
| `color.border.default` | Component outline vs background |
| `color.border.input` | Field border — visible, not heavy outline |

## 4. Status surfaces

Must read on: app bg, white/card, glass-like, dark panel.

Each status variant needs: **bg + border + text** (and icon when used). Do not rely on blur, glass, or notification-shade blending.

## 5. Neutral surfaces

- Default Badge/Chip must not look like disabled gray text.
- Neutral fills use `surface.default` + `border.default`, not transparent-on-tinted.

## 6. Dark mode

- Avoid invisible borders (`border.subtle` must still read).
- Avoid harsh neon outlines — use muted violet-gray borders.
- Status fills stay ~20% alpha with `-700` borders.

## 7. Component defaults

| Component | Default visibility strategy |
| --------- | --------------------------- |
| Card | `surface.default` + `border.default` + optional `shadow.sm` |
| Paper | Same; `flat` → `surface.sunken` + border |
| Badge/Chip | Fill + 1px border all variants |
| Input | `surface.default` + `border.input` |
| Button outline | `surface.default` + `border.default` |
| Button ghost | Brand text + pressed `brand.subtle` fill |
| Toast/Snackbar | Status or raised fill + `border.default` + optional shadow |

## 8. QA

- Docs: [Visual Baseline — No-shadow matrix](/components/visual-baseline/)
- Example app: `SurfaceVisibility` screen
- Manual: disable shadow in simulator, verify on `bg.default` and card surfaces
