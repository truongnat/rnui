# Surface Visibility Contract

Hard rules for RNUI surface hierarchy. **Shadow may enhance depth; it must never be required for visibility.**

Related: `.planning/surface-layering-rules.md` · enforcement: `scripts/audit-surface-contrast.mjs`

---

## Rules

### 1. App background visibility

A component surface must be recognizable on `color.bg.default` **without shadow**.

- Requires fill contrast **or** a perceivable 1px border (prefer both).
- `surface.default` must not equal `bg.default`.

### 2. White / card background visibility

A component surface must be recognizable on `#FFFFFF` / `color.surface.default` / `color.surface.raised` **without shadow**.

- Neutral components use `border.default` or `border.input`.
- Nested cards use `surface.raised` inner fill or equivalent step.

### 3. Status surface visibility

Status surfaces (Badge, Chip, Alert, Toast, Snackbar) must read on:

- App background
- White / card
- Glass-like panel
- Dark / inverse panel

Each variant needs **background + border + text** (icon when present).

### 4. Borders are never invisible

- `border.default` — component outline vs parent
- `border.subtle` — internal dividers; still perceivable (~gray-200/300 equivalent in light)
- `border.input` — visible, not harsh outline
- Fully transparent borders are forbidden on component shells

### 5. Shadow is depth enhancement only

- `shadow.none` / `elevation="none"` must not hide Card, Paper, Badge, Chip, Alert, Input, Button outline/ghost, Toast, Snackbar.
- Do not fix visibility by increasing shadow opacity alone.

### 6. Glass / translucent fallback

- `surface.glass` pairs with visible `surface.glassBorder`.
- If fill is translucent, border carries recognition.

### 7. Nested surface distinguishability

| Nesting | Requirement |
| ------- | ----------- |
| Card on app bg | White/tinted fill + border |
| Card on Card | Inner raised fill or sunken well + border |
| Badge on Card | Fill + border (default variant cannot vanish) |
| Input inside Card | `surface.default` + `border.input` |
| FormGroup inside Card | Grouped shell border + field borders |

### 8. Dark mode

- `bg.default` ≠ `surface.default`; raised/sunken hierarchy visible.
- Borders use muted violet-gray (`#454560` class), not neon outlines.
- Status fills ~20% alpha with `-700` borders; text `-400` stops.

### 9. Brand themes

- Must not regress visibility vs core theme.
- If `bg.default` is tinted, `surface.default` may stay white; if both were white, tint `bg.default` and step `surface.raised`.
- Strengthen brand-tinted borders one step toward `-300` equivalent.

---

## Quantitative checks

Automated (`bun run surface:audit`):

| Check | Threshold | Fail? |
| ----- | --------- | ----- |
| `bg.default` vs `surface.default` identical hex | equal | **Yes** |
| `surface.default` vs `surface.raised` identical hex | equal | **Yes** |
| Luminance delta bg vs surface | ≥ 0.025 | Warn |
| Luminance delta surface vs border | ≥ 0.04 | Warn |
| Status bg vs `surface.default` | ≥ 0.03 blended | Warn |
| Border alpha-only below ~0.08 on white | visual | Warn |

Manual:

- WCAG AA text on status fills (existing typography rules).
- No alpha-only fills below perceptual visibility without border backup.

---

## Component defaults (summary)

| Component | Visibility strategy |
| --------- | ------------------- |
| Card | `surface.default` + `border.default` + optional `shadow.sm` |
| Paper | Same; `flat` → `surface.sunken` + `border.default` |
| Badge / Chip | Fill + 1px border all variants |
| Input / TextField | `surface.default` + `border.input`; disabled → `surface.sunken` |
| FormGroup grouped | Outer `border.default` |
| Button outline | Fill + `border.default` |
| Button ghost | Brand text + pressed subtle fill |
| Menu / Popover | Panel `border.default` |
| List inset | Container border + raised fill |
| SegmentedControl active | Fill + border (shadow optional) |
| Toast / Snackbar | Raised/status fill + border |

---

## QA sources

1. **Example app:** `SurfaceVisibility` — sections A–G matrix
2. **Docs:** [Visual Baseline — Surface Visibility Contract](/components/visual-baseline/)
3. **CI/local:** `bun run surface:audit` after `bun run build`
4. **Device:** `.planning/device-qa-checklist.md`

---

## Anti-patterns (forbidden)

- Fixing demos with wrapper background colors
- Hiding white-on-white with shadow only
- Using `border.subtle` for outer component shells on white
- Setting brand `bg.default === surface.default === #FFFFFF` without border compensation
- Transparent neutral Badge/Chip on card surfaces
