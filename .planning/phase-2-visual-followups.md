# Phase 2 Visual Followups — Backlog

**Status:** Backlog only — scope lock for post–Phase 1 work  
**Last updated:** 2026-05-23

> **This file is a backlog only. Do not fix all items at once.**  
> Each group must be handled in a **separate focused phase** with its own investigation, implementation, and verification.

---

## How to use this file

| Rule | Why |
|------|-----|
| Pick **one branch** (2A, 2B, or 2C) per agent session | Prevents Modal + Toast + Badge + Docs churn in one PR |
| Run investigation before implementation | Phase 1 proved layout bugs need root-cause analysis first |
| Do **not** mix with engineering debt | Type/lint fixes can pull agents into API/runtime — see [engineering-debt.md](./engineering-debt.md) |
| Verify on device for overlay/safe-area work | Simulator alone missed clipping and inset issues |

**Recommended order:** **2A → 2B → 2C**

---

## Phase 2A — Modal / Dialog UX consistency

**Priority:** Highest (start here after Phase 1)  
**Goal:** Modal and Dialog feel consistent, mobile-native, and safe on real devices.

### In scope

| Item | Severity | Notes |
|------|----------|-------|
| Apply `modal.hostInset` pattern to `Dialog` | **High** | Dialog still relies on 80–90% width for edge inset; Modal uses explicit host wrapper |
| Safe-area insets on modal / sheet surfaces | **High** | Notch, Dynamic Island, home indicator — `useSafeAreaInsets` |
| Keyboard avoidance for form-in-modal | **Medium** | Login/settings forms inside Modal or Dialog |
| Review remaining `shadow.xl` on Modal/Dialog surfaces | **Low** | Phase 1 moved Modal container to `shadow.lg`; audit Dialog and related tokens |

### Out of scope (2A)

- Badge / Chip / Toast / Snackbar
- Docs rewrites (`modal.md`, visual baseline)
- Typecheck / lint / Reanimated type debt
- New public props or components (unless investigation proves minimal alias only)

### Verification (2A)

- Example app: Modal + Dialog + AlertDialog screens on iPhone-sized simulator
- No title clipping on open animation
- Form modal: keyboard does not cover primary action
- Safe area: content not under notch or home indicator

---

## Phase 2B — Status surface system

**Priority:** Medium — **after 2A is stable**  
**Goal:** Alerts, toasts, snackbars, badges, and chips read clearly on all normal backgrounds without blur/glass dependency.

### In scope

| Item | Severity | Notes |
|------|----------|-------|
| Alert compound children inherit severity text color | **Medium** | `AlertTitle` + nested `Typography` should not require manual color per severity |
| Toast action label contrast | **Medium** | `brand.muted` vs `brand.text` on elevated toast surface |
| Snackbar visible-surface audit | **Medium** | May inherit weak fills; apply visible-surface rule from [visible-surface-audit.md](./visible-surface-audit.md) |
| Badge / Chip visible surface on brand-tinted canvases | **Low** | Spot-check forest / love / ocean themes |
| Chip solid default `bg.muted` refinement | **Low** | Avoid gray slab on tinted app backgrounds |
| **`BadgeVariant` `accent` — API decision** | **Decision** | Token exists; not in public type — product/API choice, not a drive-by fix |

### Out of scope (2B)

- Modal / Dialog layout (2A)
- Docs staging (2C)
- Engineering debt

### Verification (2B)

- Visible-surface matrix: white, app bg, card, glass, dark (see visual baseline / visible-surface audit)
- WCAG spot-check on status fills + borders
- No regression to Phase 1 Alert string-child fix

---

## Phase 2C — Docs / example visual QA

**Priority:** Lower — **after core components stable (2A + 2B)**  
**Goal:** Docs and examples reflect real native quality, not CSS-only staging.

### In scope

| Item | Severity | Notes |
|------|----------|-------|
| Update `modal.md` — remove hardcoded `#fff`, manual padding hacks | **Medium** | Use `ModalHeader` / `ModalFooter` + tokens |
| Native Modal / Alert QA in visual baseline | **Medium** | Current baseline is CSS demos; add native-oriented checklist or example-app pointer |
| Device QA checklist (iPhone + Android) | **Medium** | Animation, safe area, dark mode, status surfaces |
| Visual baseline closer to production examples | **Low** | Align with example app patterns agents should copy |

### Out of scope (2C)

- Component token rewrites (2B)
- Modal implementation changes unless docs reveal a confirmed bug → new investigation

### Verification (2C)

- `bun run docs:build`
- Manual review of `/components/visual-baseline/` and Modal/Dialog docs
- Cross-link example app screens from docs where helpful

---

## Explicitly excluded from Phase 2 Visual

These belong in **[engineering-debt.md](./engineering-debt.md)** — **Phase 2D / Engineering Cleanup**, not UI polish:

- `apps/example` typecheck failures (ToggleButton, BottomSheetPanel Reanimated style types)
- `@truongdq01/ui` lint errors/warnings unrelated to visual work
- `@truongdq01/headless` theme tests expecting pre–Foundation Pass semantic values

Do not let an agent “fix while here” unless the user explicitly requests an engineering cleanup phase.

---

## Related planning files

| File | Purpose |
|------|---------|
| [phase-1-critical-ui-fixes-summary.md](./phase-1-critical-ui-fixes-summary.md) | What Phase 1 shipped |
| [ui-ux-investigation-report.md](./ui-ux-investigation-report.md) | Pre–Phase 1 findings |
| [visible-surface-audit.md](./visible-surface-audit.md) | Badge/Chip/Alert surface rule |
| [visual-quality-checklist.md](./visual-quality-checklist.md) | Ongoing QA checklist |
| [engineering-debt.md](./engineering-debt.md) | Typecheck, lint, stale tests — separate track |
