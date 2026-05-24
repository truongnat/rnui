# RNUI Phase 4A Quality Gate Audit

**Date:** 2026-05-24  
**Branch:** `develop` (up to date with `origin/develop`)  
**Latest commit:** `b78351d` — feat(design-system): surface contrast, core polish, floating label, and schema pipeline  
**Auditor mode:** Read-only — no source fixes applied

---

## 1. Executive Summary

RNUI passes the **engineering quality gate** on `develop`: build, typecheck, lint, tests, docs build, component-schema generate/check, and AI metadata check all succeed. This is a major improvement over prior planning notes that cited builder/typecheck blockers — those are resolved.

**Remaining work is primarily visual/device QA and schema/docs drift**, not CI blockers.

| Area | Verdict |
|------|---------|
| Build / typecheck / test | **PASS** |
| Lint | **PASS** (70 warnings in `@truongdq01/ui`, 2 in renderer — non-blocking) |
| Docs + schema pipeline | **PASS** |
| Default theme surface contrast | **Mostly fixed** — border + fill, not shadow-dependent |
| Example app demo quality | **Strong** — production-like screens + `SurfaceVisibility` hub |
| Device overlay QA | **NOT VERIFIED** — requires iOS/Android simulator pass |
| Component schema coverage | **MVP complete** (32/77 components) with known drift |
| Brand theme surface contrast | **NOT VERIFIED** — Forest/Love/Ocean may regress on white canvas |

**Recommended next phase:** **Phase 4B — Device QA + Surface Hardening** (overlays, Toast/Snackbar no-shadow matrix, brand themes, FormGroup grouped inputs) before expanding builder/product work.

---

## 2. Commands Run

All commands run from repo root on 2026-05-24 unless noted.

| Command | Exit | Result |
|---------|------|--------|
| `git fetch && git pull origin develop` | 0 | Already up to date |
| `bun install` | 0 | 1553 packages, no changes |
| `bun run build` | 0 | 8 tasks (tokens, headless, ui, themes, component-schema, renderer, builder, docs) |
| `bun run typecheck` | 0 | 14 tasks pass |
| `bun run lint` | 0 | Pass; `@truongdq01/ui` 70 warnings, `@truongdq01/renderer` 2 warnings |
| `bun run test` | 0 | See test summary below |
| `bun run docs:build` | 0 | 93 static pages |
| `bun run component-schema:generate` | 0 | Wrote 32 schemas to `.ai/generated/` |
| `bun run component-schema:check` | 0 | 32 components, 16 web-preview safe |
| `bun run ai:check` | 0 | 14 required AI files present |
| `schema:check` | N/A | Script does not exist at root |

### Test summary

| Package | Pass | Skip | Fail |
|---------|------|------|------|
| `@truongdq01/ui` | 469 | 2 | 0 |
| `@truongdq01/headless` | 151 | 1 | 0 |
| `@truongdq01/component-schema` | 12 | 0 | 0 |
| `@truongdq01/renderer` | 10 | 0 | 0 |
| `@truongdq01/themes` | 11 | 0 | 0 |
| **Total** | **653** | **3** | **0** |

### Lint warning categories (`@truongdq01/ui`, 70 total)

Primary rules (non-exhaustive — output truncated at 50 diagnostics):

- `lint/suspicious/noExplicitAny` — Form, Gradient, Timeline, ChipLabel, etc.
- `lint/suspicious/noArrayIndexKey` — Carousel pagination dots
- Other style/suspicious rules across ~362 files

Lint **errors: 0**. Warnings are tracked in `.planning/engineering-debt.md` as low-priority triage.

### Build notes

- Turbo warnings: `no output files found for task *#test` — turbo.json outputs config only, not a failure.
- Headless build logs unused external imports in dist bundle — informational.

---

## 3. Current Repo Health

### Git state

- Branch: `develop`, synced with `origin/develop`
- Uncommitted: only `.agents/skills/ui-ux-pro-max/scripts/__pycache__/*.pyc` (not product code)

### Recent commits (relevant phases)

| Commit | Summary |
|--------|---------|
| `b78351d` | Surface contrast, core polish, floating label, schema pipeline |
| `55ce99e` | Status surface QA, ViewAnimatedStyle typing, green CI |
| `b618d20` | Phase 1–2 visual polish (overlays, status, docs) |
| `89abfc8` | AI-native metadata, agent instructions |

### Package structure (10 workspace packages)

| Package | Role | Build | Tests |
|---------|------|-------|-------|
| `@truongdq01/tokens` | Design tokens | ✅ | via ui/headless |
| `@truongdq01/headless` | Theme, hooks | ✅ | 151 pass |
| `@truongdq01/ui` | Styled components (77 exports) | ✅ | 469 pass |
| `@truongdq01/themes` | Brand presets | ✅ | 11 pass |
| `@truongdq01/component-schema` | AI screen schema | ✅ | 12 pass |
| `@truongdq01/renderer` | Schema → React | ✅ | 10 pass |
| `@truongdq01/builder` | Web builder MVP | ✅ | — |
| `@truongdq01/example` | Demo app | typecheck ✅ | — |
| `docs` | Starlight site | ✅ 93 pages | — |
| `@truongdq01/storybook` | Storybook | in scope | — |

### Generated AI / schema artifacts

| Path | Status |
|------|--------|
| `.ai/generated/component-schema.json` | Present — 32 components |
| `.ai/generated/web-preview-components.json` | 16 components |
| `.ai/generated/native-only-components.json` | 16 components |
| `.ai/examples/schemas/*.json` | 5 example schemas (login, form, dashboard, settings, profile-card) |
| `.ai/component-registry.json` | 77 components |
| `.ai/rnui.manifest.json` | AI entrypoint |

### Planning reports reviewed

- Phase 2A (modal/dialog), 2B (status surfaces), 2C (core components) — marked complete
- Surface contrast fix summary — token changes applied; manual QA checklist unchecked
- Phase 3A/3B/3C — schema, renderer, web builder MVP complete
- Engineering debt — typecheck/lint errors resolved; ~71 lint warnings remain

---

## 4. Critical Runtime Issues

**None confirmed in automated tests or static analysis.**

| ID | Severity | Issue | Evidence | Status |
|----|----------|-------|----------|--------|
| CR-1 | — | Raw string in View crash | Card wraps string children (`Card.test.tsx` pass) | **Fixed** Phase 2C |
| CR-2 | — | Alert/Modal runtime warnings | No failing tests; Phase 1 fixes landed | **Likely fixed** — device verify |
| CR-3 | LOW | `&&` with potentially falsy values | Grep shows safe patterns (`!== null`, `!dot &&`, icon checks) | **No high-risk hits** |
| CR-4 | MEDIUM | Toast lazy import name | Schema/registry reference `{ Toast }` but UI exports `ToastContainer`/`ToastItem` only | **Schema/renderer drift** — fails at lazy load if used |

**Manual simulator QA:** Not executed in this audit (no iOS/Android simulator available in audit environment). Overlay, Toast, Snackbar, and keyboard behavior remain **unverified on device**.

---

## 5. Build / Typecheck / Lint / Test Issues

### Blockers

**None.** All quality gates green.

### Non-blocking issues

| ID | Category | Detail |
|----|----------|--------|
| B-1 | Lint warnings | 70 in `@truongdq01/ui` (`noExplicitAny`, `noArrayIndexKey`, …) |
| B-2 | Lint warnings | 2 in `@truongdq01/renderer` |
| B-3 | CI gap | `component-schema:check` not wired into CI pipeline (noted in phase-3 followups) |
| B-4 | CI gap | No stale-generated-json check (`ai:check` files only, not diff) |
| B-5 | Turbo config | Test tasks missing `outputs` in turbo.json (warnings only) |
| B-6 | Missing script | `schema:check` referenced in audit brief but not in root `package.json` |

Prior blockers from `surface-contrast-fix-summary.md` (builder TS18003, renderer typecheck) are **resolved** on current `develop`.

---

## 6. Visual QA Findings

Static review of example app + docs (no live simulator).

### Overall example app quality

| Aspect | Rating | Notes |
|--------|--------|-------|
| Demo realism | **Good** | Hero cards, sign-in flows, commerce copy — not raw dumps |
| Token usage | **Good** | RNUI components + theme; minor magic numbers in Dialog |
| Safe area | **Good** | `DemoPage` handles insets; overlay components use `useOverlayHostPadding` |
| Surface QA hub | **Good** | `SurfaceVisibility` screen mirrors docs `NoShadowSurfaceDemo` |
| Dark mode | **Partial** | Switch screen has in-app toggle; most screens inherit system theme |

### Per-screen summary

| Screen | Production-like | Tokens | Touch ≥44px | Dark mode | Surface matrix |
|--------|-----------------|--------|-------------|-----------|----------------|
| Button | ✅ | ✅ | ✅ (sm noted) | inherit | via SurfaceVisibility |
| Input | ✅ | ✅ | ✅ | inherit | via SurfaceVisibility |
| TextField | ✅ | ✅ | ✅ | inherit | ❌ |
| Card | ✅ | ✅ | ✅ | inherit | via SurfaceVisibility |
| Paper | ✅ | ✅ | N/A | inherit | partial (elevation none) |
| Typography | ✅ | ✅ | N/A | inherit | ❌ |
| Switch | ✅ | ✅ | ✅ | **✅ toggle** | ❌ |
| Checkbox | ✅ | ✅ | ✅ | inherit | ❌ |
| Alert | ✅ | ✅ | N/A | inherit | ⚠️ screen gap |
| Toast | triggers only | ✅ | ✅ | inherit | ❌ device |
| Snackbar | triggers only | ✅ | ✅ | inherit | ❌ device |
| Badge | ✅ | ✅ | N/A | inherit | **✅ 5-panel** |
| Chip | ✅ | ✅ | ✅ | inherit | **✅ 5-panel** |
| Modal | ✅ | ✅ | ✅ | inherit | N/A — **device** |
| Dialog | ✅ | ⚠️ `16` px | ✅ | inherit | N/A — **device** |
| AlertDialog | ✅ | ✅ | ✅ | inherit | N/A — **device** |

### Docs visual baseline

- `docs/src/content/docs/components/visual-baseline.mdx` — comprehensive; documents no-shadow rules, overlay native QA table, 44px targets
- `docs/src/components/demos/NoShadowSurfaceDemo.tsx` — CSS approximation; correctly defers to example app for native truth
- Component pages updated for button, input, badge, chip, modal, dialog, alert-dialog

---

## 7. Surface Contrast Findings

**Rule:** Visibility must not rely on shadow, blur, glass, or overlay tricks.

### Default (violet) theme — PASS with caveats

Token pass (2026-05-24) applied fill + 1px border across Card, Paper, Badge, Chip, Input, Toast, Snackbar. Automated token tests assert borders/backgrounds.

| Component | Shadow required? | Primary visibility | No-shadow viable? |
|-----------|------------------|--------------------|-------------------|
| Card | No | white fill + `border.default` on tinted canvas | ✅ |
| Paper (elevated) | No | same | ✅ |
| Paper `flat` | No | sunken fill + `border.subtle` | ✅ (weaker) |
| Badge | No | fill + border (dot: fill only) | ✅ |
| Chip | No | fill + border | ✅ |
| Input (standalone) | No | fill + `border.input` | ✅ |
| Alert standard | No | status fill + border | ✅ |
| Alert outlined | No | border only (by design) | ✅ |
| Toast | No | border + variant fill | ✅ (shadow bundled) |
| Snackbar | No | border + fill | ⚠️ border-only on white parent |
| Button outline/ghost | No | fill + border / subtle fill | ✅ |

### Residual surface risks

| ID | Severity | Issue | Affected |
|----|----------|-------|----------|
| SC-1 | **MEDIUM** | Light mode `surface.default === surface.raised === #FFFFFF` — nested surfaces rely on border only | Card on Card, Badge on Card, Snackbar on Card |
| SC-2 | **MEDIUM** | FormGroup grouped mode: outer card has no border; inner inputs transparent | Grouped form fields on white/card |
| SC-3 | **MEDIUM** | Toast/Snackbar omitted from `SurfaceVisibility` matrix | Overlay status components |
| SC-4 | **MEDIUM** | Alternate brand themes (Forest, Love, Ocean): `bg.default === surface.default === #FFFFFF` with pastel borders — not re-spot-checked | All surface components under brand switch |
| SC-5 | LOW | `visible-surface-audit.md` stale vs current badge/chip tokens | Planning docs |
| SC-6 | LOW | No public API to disable Toast/Snackbar shadow for baseline testing | ToastItem, Snackbar |
| SC-7 | INFO | Dark panel in SurfaceVisibility shows subset only (Badge/Chip) | Example app |

### SurfaceVisibility coverage

`apps/example/app/components/SurfaceVisibility.tsx` tests Card (`shadow.none`), Paper (`elevation="none"`), Badge, Chip, Alert, Input, Button variants across app/card/white/glass/dark panels. **Does not include Toast, Snackbar, Paper flat, Alert outlined/filled, or full dark-mode stack.**

---

## 8. Modal/Dialog/Overlay Findings

Phase 2A delivered shared overlay layout (`overlayHostLayout.ts`, `useOverlayHostPadding`, keyboard behavior).

| Component | Code status | Device verified |
|-----------|-------------|-----------------|
| Modal | hostInset + KAV + safe area | ❌ |
| Dialog | hostInset aligned with Modal; token `surface.overlay` | ❌ |
| AlertDialog | Inherits Dialog | ❌ |
| BottomSheet | Present in UI + example index | ❌ not in manual checklist |

### Code-level observations

- Dialog tokens: `hostInset`, `surface.overlay`, `shadow.lg`, `maxWidth: 400`
- Modal tests cover KeyboardAvoidingView, header/footer composition
- Dialog tests cover token regression, KAV, actions/form slots
- Example screens: Modal (basic/form/fullscreen), Dialog (confirmation/form/long), AlertDialog (destructive/long labels)

### Example app gaps

- Dialog example uses hardcoded `marginTop: 16`, `Stack spacing={16}` instead of theme tokens
- Fullscreen Modal intentionally skips host inset — documented

**Device checklist:** See `.planning/device-qa-checklist.md` — inset, keyboard-over-footer, notch clipping, backdrop dismiss.

---

## 9. Status Surface Findings

Phase 2B status surface work landed; Phase 2C + surface contrast pass refined tokens.

| Component | Surface pattern | Action contrast | Tests |
|-----------|-----------------|-----------------|-------|
| Alert | Status fill + border; compound `AlertTitle` inherits severity color | Custom action nodes supported | ✅ string/number children, compound color |
| Toast | Elevated container + status variants; action uses `brand.text` token | ✅ token regression test | ✅ |
| Snackbar | `surface.raised` + border; primary text; action `brand.text` | ✅ token regression test | ✅ |
| Badge | `surface.default` + `border.default`; `accent` variant public | N/A | ✅ |
| Chip | solid/outlined/subtle/accent with borders | Icon aligns with text color | ✅ |

### Gaps

- Toast/Snackbar readability on device not confirmed
- Alert example: success `onClose={() => {}}` — dismiss affordance non-functional in demo
- Alert screen lacks dedicated 5-panel surface matrix (unlike Badge/Chip)

---

## 10. Core Component Findings

Phase 2C polish applied to Button, Input, TextField, Card, Paper, Typography, Switch, Checkbox.

| Component | Key fixes | Remaining |
|-----------|-----------|-----------|
| Button | md 44dp, lg 52dp, outline border strengthened | sm 36dp shown intentionally |
| Input | Heights 36/44/52 aligned with Button; floating label layout | Grouped mode surface risk (SC-2) |
| TextField | Profile/security demos | No KeyboardAvoidingView; `variant` prop unused |
| Card | String children wrapped in Text | Glass section needs network for images |
| Paper | Default border + shadow.sm; flat variant | — |
| Typography | h1 600, h2–h6 500 | — |
| Switch | Settings list + dark mode toggle | Unused imports (Divider, Typography) |
| Checkbox | 44dp touch wrapper | — |
| Stack / Box | Token-only; no code changes needed | — |

---

## 11. Component Schema / AI Docs Findings

### Coverage

| Source | Count |
|--------|------:|
| UI exports / component-registry | 77 |
| component-schema registry | 32 (16 web-preview + 16 native-only) |
| Virtual `Screen` type | +1 (maps to Stack) |

### Checks

| Check | Result |
|-------|--------|
| Unique component names | ✅ |
| Dangerous props blocked (`style`, `sx`, functions, `__proto__`) | ✅ |
| Example schemas web-safe | ✅ (5/5) |
| `getLazyLoadPlan` conceptually sound | ✅ (Screen→Stack edge case documented) |
| Generated JSON matches source | ✅ (`component-schema:check` pass) |

### Drift issues

| ID | Severity | Issue | Files |
|----|----------|-------|-------|
| CS-1 | **HIGH** | `Toast` import `{ Toast }` — UI exports `ToastContainer`, `ToastItem` only | `native-only.ts`, `.ai/component-registry.json` |
| CS-2 | MEDIUM | `Stack.id` in schema — not in `StackProps` | `web-preview.ts` |
| CS-3 | MEDIUM | `Badge.count` schema string-only — UI accepts `number \| string` | `web-preview.ts` |
| CS-4 | MEDIUM | Native-only entries have empty `props: []` — no API guidance | `native-only.ts` |
| CS-5 | LOW | `ScreenSchema` uses `action` refs — UI uses `onPress`/`onClick` (renderer maps) | By design |
| CS-6 | LOW | Docs duplicate Phase 3C bullet | `component-schema.md` |
| CS-7 | LOW | `TextField` schema missing `placeholder` | `web-preview.ts` |
| CS-8 | INFO | 46 UI components not in schema — intentional MVP scope | — |

### Renderer / builder (Phase 3B/3C)

- `@truongdq01/renderer` — 10 tests pass; maps Screen→Stack, action→onPress
- `@truongdq01/builder` — builds; mock AI + preview + schema panel
- Not production-ready for real AI integration — MVP only

---

## 12. Docs & Example App Findings

### Strengths

- 93 doc pages build cleanly including new guides: component-schema, screen-renderer, web-builder, ai-usage
- Visual baseline doc + NoShadowSurfaceDemo align with native SurfaceVisibility
- Example index: 77 components, search, 52dp list rows, accessibility labels
- Badge/Chip/SurfaceVisibility provide best-in-class surface QA patterns

### Issues

| ID | Severity | Issue |
|----|----------|-------|
| D-1 | MEDIUM | Device-only overlay QA not documented as complete |
| D-2 | LOW | Dialog example magic numbers vs tokens |
| D-3 | LOW | TextField screen missing KAV |
| D-4 | LOW | `visible-surface-audit.md` outdated vs current tokens |
| D-5 | INFO | Docs CSS demos explicitly approximate native — correct disclaimer |
| D-6 | INFO | Card glass demo requires network images |

---

## 13. Prioritized Fix Plan

### P0 — Must fix before continuing builder/product work

| # | Title | Affected files | Why | Fix direction | Risk | Parallel |
|---|-------|----------------|-----|---------------|------|----------|
| P0-1 | **Device QA pass — overlays** | Example app Modal/Dialog/AlertDialog; `device-qa-checklist.md` | Only way to confirm safe area, keyboard, inset | Run iOS + Android checklist; file results | Low | No — sequential per platform |
| P0-2 | **Device QA pass — Toast/Snackbar** | Example Toast/Snackbar screens; root `ToastContainer` | Status overlays unverified; contrast on real bg | Trigger all variants light+dark; verify action contrast | Low | After P0-1 |
| P0-3 | **Fix Toast schema import drift** | `packages/component-schema/src/registry/native-only.ts`, `.ai/component-registry.json` | Lazy load would fail for Toast | Use `ToastContainer` or document imperative-only + remove from lazy map | Medium | Yes |
| P0-4 | **Extend SurfaceVisibility matrix** | `SurfaceVisibility.tsx`, docs demo | Toast/Snackbar/Paper flat not in no-shadow baseline | Add panels mirroring Badge/Chip pattern | Low | Yes |

### P1 — Important UI quality or DX

| # | Title | Affected files | Why | Fix direction | Risk | Parallel |
|---|-------|----------------|-----|---------------|------|----------|
| P1-1 | **FormGroup grouped border** | `packages/tokens/src/components/formGroup.ts`, FormField | Grouped inputs invisible on white/card without outer border | Add `borderWidth: 1`, `border.default` to grouped card token | Medium | Yes |
| P1-2 | **Brand theme surface audit** | `packages/themes/src/brands/*.ts` | Forest/Love/Ocean may have white-on-white | Audit borders when `bg === surface`; adjust per brand | Medium | Yes (per brand) |
| P1-3 | **Alert surface matrix on screen** | `apps/example/app/components/Alert.tsx` | Inconsistent with Badge/Chip QA | Add DemoSurfacePanel 5-panel section | Low | Yes |
| P1-4 | **Schema prop drift cleanup** | `web-preview.ts` | Stack.id, Badge.count, TextField.placeholder | Align schema with real APIs | Low | Yes |
| P1-5 | **Wire schema check into CI** | CI config, `package.json` | Prevent registry/JSON drift | Run generate + check in pipeline | Low | Yes |
| P1-6 | **Dialog example token cleanup** | `apps/example/.../Dialog.tsx` | Magic `16` breaks convention | Use `tokens.spacing[4]` | Low | Yes |
| P1-7 | **TextField KeyboardAvoidingView** | `apps/example/.../TextField.tsx` | Form fields hidden under keyboard | Match Input screen pattern | Low | Yes |

### P2 — Nice-to-have polish

| # | Title | Affected files | Why | Fix direction | Risk | Parallel |
|---|-------|----------------|-----|---------------|------|----------|
| P2-1 | Lint warning triage (`noExplicitAny`) | Form, ChipLabel, Timeline, Gradient | Project rule prefers no any | Replace with proper types in batches | Medium | Yes (by file) |
| P2-2 | Sync planning docs | `visible-surface-audit.md`, surface-contrast-fix checklist | Stale checkboxes | Update to match current tokens | Low | Yes |
| P2-3 | Toast/Snackbar shadow-off API | ToastItem, Snackbar | Easier no-shadow testing | Optional `elevation="none"` or style prop | Low | Yes |
| P2-4 | Light `surface.raised` differentiation | `semantic.ts` | Reduce white-on-white nesting | Step raised slightly above white | Medium | No — affects all components |
| P2-5 | Switch unused imports | `apps/example/.../Switch.tsx` | Lint noise | Remove unused imports | Low | Yes |
| P2-6 | Alert demo noop onClose | `apps/example/.../Alert.tsx` | Misleading dismiss UX | Wire toast or remove close | Low | Yes |

### P3 — Future product work

| # | Title | Notes |
|---|-------|-------|
| P3-1 | Real AI API for web builder | Replace mock keyword routing |
| P3-2 | Expand schema to 77 components | Codegen from TS types |
| P3-3 | Native-only web preview polyfills | Tabs, Select stubs |
| P3-4 | Per-component schema doc pages | Generated from registry JSON |
| P3-5 | Landing SEO / public release polish | From public-readiness checklist |
| P3-6 | Storybook alignment with example app | Separate track |

---

## 14. Parallelization Plan

```
Track A (Device — blocking):  P0-1 → P0-2
Track B (Schema/AI):          P0-3 ∥ P1-4 ∥ P1-5
Track C (Surface hardening):  P0-4 ∥ P1-1 ∥ P1-2 ∥ P1-3
Track D (Example polish):     P1-6 ∥ P1-7 ∥ P2-5 ∥ P2-6
Track E (Engineering):        P2-1 (batched, independent of A–D)
```

**Recommended Phase 4B scope:** Tracks A + C first (device QA + surface hardening), then B (schema drift), then D/E in parallel.

**Do not parallelize:** P0-1/P0-2 (same simulator session); P2-4 (semantic token change — wide blast radius).

---

## 15. Files Likely Needing Changes

### P0/P1 priority

```
apps/example/app/components/SurfaceVisibility.tsx
apps/example/app/components/Alert.tsx
apps/example/app/components/Dialog.tsx
apps/example/app/components/TextField.tsx
packages/component-schema/src/registry/native-only.ts
packages/component-schema/src/registry/web-preview.ts
.ai/component-registry.json
packages/tokens/src/components/formGroup.ts
packages/themes/src/brands/forest.ts
packages/themes/src/brands/love.ts
packages/themes/src/brands/ocean.ts
.planning/device-qa-checklist.md (results append)
```

### CI / automation

```
.github/workflows/* (or equivalent CI)
package.json (CI script wiring)
scripts/check-component-schema.mjs (optional stale check)
```

### Docs sync

```
.planning/visible-surface-audit.md
.planning/surface-contrast-fix-summary.md (checklist completion)
docs/src/content/docs/guides/component-schema.md
```

---

## 16. Risks / Unknowns

| Risk | Impact | Mitigation |
|------|--------|------------|
| Device QA finds overlay regressions | P0 block for builder | Dedicated 4B session with checklist |
| Brand theme contrast failures | Users switching themes see invisible UI | Per-brand audit before public launch |
| White-on-white nesting in real apps | Production screens with Card-in-Card | Consider `surface.raised` token step or nested surface variant |
| Schema Toast import breaks lazy renderer | AI-generated screens with Toast fail at runtime | Fix P0-3 before enabling Toast in schemas |
| Lint `any` cleanup touches public types | Accidental API change | Batch by component; run full test suite |
| Web builder preview ≠ native | False confidence in AI output | Document gap; require native example app verification |
| Manual QA checklist never completed | Unknown visual regressions | Mark checklist items in 4B with screenshots/sign-off |

---

## Appendix: Issue classification summary

| Class | Count | Examples |
|-------|------:|---------|
| A. Critical runtime | 0 confirmed | Toast import drift (latent) |
| B. Build/typecheck/lint/test blockers | 0 | 70 lint warnings |
| C. Visual system | 7 | SC-1–SC-7 |
| D. Schema/API drift | 8 | CS-1–CS-8 |
| E. Docs/example quality | 6 | D-1–D-6 |
| F. Future product | 6 | P3-1–P3-6 |

---

*End of Phase 4A audit. No source files were modified except this report.*
