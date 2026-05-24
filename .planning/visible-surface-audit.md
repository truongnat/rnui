# Visible Surface Audit

**Date:** 2026-05-23  
**Updated:** Phase 2B — Status Surface System

## Definition — visible surface rule

A **status surface** must be visible directly on normal UI backgrounds without relying on:

- iOS liquid glass or blur
- Notification-shade transparency blending
- Dark overlay stacking
- Screen brightness tricks
- Accidental contrast from parent transparency

Every status component should provide:

| Requirement | Detail |
| ----------- | ------ |
| **Background** | Soft but visible — at least one step above page/card (`surface.raised`, semantic status `-100` tints light; ~20% alpha dark) |
| **Border / ring** | 1px hairline at semantic `-200`/`-300` (light) or `-700` (dark) — not the same color as fill |
| **Text** | Semantic text tokens; WCAG AA on the fill |
| **Icon** | Aligned with severity / variant when present |
| **Interaction** | Clear disabled / pressed opacity when applicable |

## Status variants to verify

For each component, spot-check these intents in **light and dark**:

- `default` / neutral
- `brand`
- `accent` (Badge public API; Chip token only — see investigation)
- `success`
- `warning`
- `error`
- `info`

## Test surfaces

Verify on each surface:

| Surface | Light reference | Dark reference |
| ------- | --------------- | -------------- |
| White | `#FFFFFF` | `#FFFFFF` (spot-check) |
| App background | `color.bg.default` | `color.bg.default` |
| Card | `color.surface.raised` | `color.surface.raised` |
| Glass | `color.surface.glass` | `color.surface.glass` |
| Dark panel | — | `color.bg.inverse` or `color.surface.default` |

Docs baseline: [Visual Baseline](/components/visual-baseline/) — `VisibleSurfaceDemo` matrix.  
Example app: Badge and Chip screens include native surface panels via `DemoSurfacePanel`.

## Components in Phase 2B scope

| Component | Surface pattern | Phase 2B status |
| --------- | --------------- | --------------- |
| **Alert** | Standard: severity bg + 1px border; compound title/body inherit severity text | Done |
| **Toast** | Elevated card + status icon; action uses `brand.text` | Done |
| **Snackbar** | `surface.raised` + border + `text.primary` (distinct from Toast, not `bg.inverse` slab) | Done |
| **Badge** | All variants: bg + text + border; default → `surface.raised` | Done |
| **Chip** | Solid default → `surface.raised` + `border.subtle`; status via `color` prop | Done |

## Token strategy

Prefer **semantic status tokens** (`success.bg`, `success.text`, `success.border`, `success.icon`) over per-component hex. When fills would become too loud if saturated further, strengthen **border** instead of bg.

## Fixes applied

### Visual Foundation Pass
- Strengthen light semantic status backgrounds and borders
- Dark status backgrounds → ~20% alpha; borders → `-700` stops
- Badge tokens: all variants get `bg`, `text`, `border` (incl. accent)
- Chip tokens: visible borders on solid/subtle/accent
- Alert standard variant: 1px severity border
- Toast: soft elevated surface

### Phase 2B
- Alert: `AlertTextColorProvider` — `AlertTitle` / nested `Typography` inherit severity color
- Toast: `toast.action` token (`brand.text`)
- Snackbar: elevated surface (was `bg.inverse` heavy bar)
- Badge: `accent` exposed on public `BadgeVariant`
- Chip: solid variant raised surface; icon color aligns with chip text

## Remaining review (Phase 2C+)

- **Chip `variant="accent"`** — token exists; not on public `ChipVariant` (document only unless API approved)
- **Filled Alert** — intentionally saturated; unchanged
- **Alternate brand themes** (forest, love, ocean) — spot-check on tinted canvases
- **Snackbar status variants** — optional future enhancement (neutral default only today)

See [phase-2-visual-followups.md](./phase-2-visual-followups.md).
