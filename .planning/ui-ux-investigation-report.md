# RNUI UX/UI Investigation Report

**Date:** 2026-05-23  
**Branch:** develop  
**Scope:** Read-only investigation — Modal screenshot symptoms, runtime Text warning, token/component quality, example app & docs  
**Skill lens:** ui-ux-pro-max (hierarchy, spacing, contrast, touch targets, mobile-native quality)

---

## 1. Executive Summary

RNUI’s **example app Modal screen** (`apps/example/app/components/Modal.tsx`) reproduces the reported screenshot symptoms. The most severe issue is a **confirmed runtime bug**: `Alert` renders string children inside a `<View>` (`AlertContent.tsx`), which triggers React Native’s *“Text strings must be rendered within a `<Text>` component”* warning and causes alert copy to **not appear** — leaving a large blue info panel with only an icon.

Secondary issues are **structural Modal layout problems**, not just token polish:

- `modal.container` token has **no default padding**; the Basic Modal demo adds only vertical padding.
- `AnimatedOverlay` uses `absoluteFill`, so **`modal.overlay.padding` is ineffective** for inset from screen edges.
- `overflow: 'hidden'` + **scale entrance animation** can clip title text at the left edge during/open animation.
- Backdrop uses **`color.bg.overlay` at ~42% opacity**, which reads heavy/muddy over the demo page.
- **Weak CTA hierarchy**: dismiss action is `ghost` while open trigger is `solid`.

A **Visual Foundation Pass** already softened semantic tokens (backgrounds, borders, shadows, button radius, badge borders, toast surfaces) and improved docs staging (`ComponentPreview`, visual-baseline page). Those changes **do not fix** Modal padding architecture or the Alert string-child bug. **Dialog / AlertDialog** are better reference implementations (explicit `padding: spacing[6]`).

---

## 2. Reproduction Notes

### Primary reproduction (matches screenshot)

1. Run the example app (Expo): `apps/example`
2. Navigate to **Components → Modal** (`apps/example/app/components/Modal.tsx`)
3. Tap **“Launch Basic Modal”**
4. Observe:
   - Modal sheet nearly full width with content flush to horizontal edges
   - Title **“Information Dialog”** may clip at left (especially during scale-in)
   - Info **Alert** shows blue background + icon only (no message text)
   - Yellow/red RN warning toast: *Text strings must be rendered within a `<Text>` component*
   - **“Close Dialog”** ghost button feels secondary vs solid open button
   - Backdrop dims underlying page heavily

### Secondary reproductions

| Screen | Path | Issue |
|--------|------|-------|
| Alert (contrast) | `apps/example/app/components/Alert.tsx` | Uses `AlertTitle` + `Typography` — **works**; shows Modal demo is miscomposed |
| Login AI example | `.ai/examples/login-screen.tsx` | `{errorMessage}` string passed to `<Alert>` — same Text bug |
| Storybook | `apps/storybook/stories/Feedback.stories.tsx` | Raw strings in `<Alert>` — same bug |
| Dialog | `apps/example/app/components/Dialog.tsx` | Better padding; use as comparison baseline |
| AlertDialog | `apps/example/app/components/AlertDialog.tsx` | Structured actions + Typography description |

### Docs

- Modal docs: `docs/src/content/docs/components/modal.md` — examples manually add `padding: 24` inline (acknowledges missing default padding).
- Visual baseline: `docs/src/content/docs/components/visual-baseline.mdx` — CSS/HTML demos; **does not** reflect native Modal/Alert runtime behavior.

---

## 3. Screenshot-Based Findings

| Symptom | Investigation finding |
|---------|----------------------|
| **Clipped modal title** | Title is `Typography variant="h3"` inside a `View` with **no horizontal padding**. Parent `modal.container` has `overflow: 'hidden'` and `AnimatedOverlay` applies **scale 0.9→1** transform; combined effect clips left edge. `ModalHeader` (which has `paddingHorizontal: 16`) is **not used** in demo. |
| **Edge-to-edge modal width** | `modal.container.width: '100%'` + `ModalContent` `maxWidth: '90%'` → ~90% screen width. `AnimatedOverlay` is `absoluteFill` and **ignores** `modal.overlay.padding`. Inner content has **no horizontal padding**. |
| **Poor padding** | `packages/tokens/src/components/modal.ts` — `container` has **zero padding**. Demo: `paddingVertical: spacing[2]` only. Dialog token includes `padding: spacing[6]`. |
| **Heavy backdrop** | `color.bg.overlay` = `rgba(15,23,42,0.42)` applied full-screen via `Pressable` + outer `View`. No blur; flat dim reads muddy over `DemoPage` content. |
| **Empty info alert** | **Confirmed bug:** demo passes **string child** to `Alert`. `AlertContent` renders `{children}` in `<View>` — RN does not render raw strings; only icon + blue `info.bg` visible. |
| **Weak button hierarchy** | Open: `variant="solid"`. Close: `variant="ghost"`. No footer row; no primary/secondary pairing. Ghost brand-violet text on white modal lacks weight for primary dismiss. |
| **Text warning toast** | Same root cause as empty alert — string in `View` inside `Alert` within open Modal. |

---

## 4. Root Cause Candidates

### Token-level

- `modal.container` — no padding; `width: '100%'`; `shadow.xl` (still heavy elevation)
- `modal.overlay.padding` — defined but **not honored** by layout (see implementation)
- `color.bg.overlay` — 42% opacity may be too strong for premium feel
- Visual Foundation Pass improved `button`, `badge`, `alert`, `toast` tokens — **partially addresses** harsh buttons globally, but Modal demo composition still undermines perception

### Component implementation

- **`AlertContent`** — no string→`Text` coercion (unlike `ModalContent`, `ModalHeader`, `Button`)
- **`AnimatedOverlay`** — `absoluteFillObject` bypasses parent overlay padding
- **`Modal` vs `Dialog`** — inconsistent layout defaults
- **`ModalContent`** — `overflow: 'hidden'` + scale animation clipping

### Demo / example composition

- Basic Modal demo skips `ModalHeader` / `ModalFooter` compound pattern
- Alert used with raw string instead of `Typography` or `AlertTitle`
- Misleading copy: *“uses a Portal”* — Modal uses RN `Modal`, not a Portal primitive (`grep Portal` in ui package ≈ Popper only)

### Runtime React Native

- Raw string children in `View` — **hard RN constraint**; causes warning + invisible text
- Whitespace text nodes in lists (fixed in `List.tsx` for Drawer) — not the Modal path

---

## 5. Confirmed Bugs

| Severity | Location | Issue | User impact |
|----------|----------|-------|-------------|
| **Critical** | `packages/ui/src/components/Alert/AlertContent.tsx:12` | String/number `children` rendered inside `<View>` without `<Text>` | Alert message invisible; RN warning toast; broken forms (login example) |
| **Critical** | `apps/example/app/components/Modal.tsx:36-38` | String child passed to `<Alert>` | Direct trigger of screenshot symptoms on Modal screen |
| **High** | `packages/tokens/src/components/modal.ts:14-21` | `modal.container` has no padding | Content flush to edges unless every consumer adds manual padding |
| **High** | `packages/ui/src/components/AnimatedOverlay/AnimatedOverlay.tsx:199-208` | `absoluteFillObject` on overlay container | Negates `modal.overlay.padding`; sheet can visually touch viewport |
| **High** | `packages/ui/src/components/Modal/ModalContent.tsx:44-48` + `AnimatedOverlay` scale | `overflow: 'hidden'` + scale transform | Title/content clipping at edges during animation |
| **Medium** | `docs/src/content/docs/components/modal.md:35` vs `Modal/types.ts:21` | Docs prop `contentStyle`; implementation `contentContainerStyle` | Consumers copy wrong prop; custom padding ignored |
| **Medium** | `packages/ui/src/components/Modal/__tests__/Modal.test.tsx:46,519,574` | Tests use nonexistent `contentStyle` prop | False confidence in layout/padding behavior |
| **Medium** | `.ai/examples/login-screen.tsx:61-63` | Dynamic string in `<Alert>` | AI agents copying pattern propagate Text bug |
| **Low** | `apps/example/app/components/Modal.tsx:33` | Claims Portal usage | Documentation/copy inaccuracy |

---

## 6. Design Quality Issues

| Component | Current behavior | Why it looks bad | Recommended direction |
|-----------|------------------|------------------|------------------------|
| **Modal** | 90% width, no inner padding, xl shadow | Feels like a system alert slab, not iOS sheet/dialog | Default horizontal padding (20–24); max-width ~340–400; softer shadow; optional `ModalHeader/Footer` in demos |
| **Backdrop** | Flat 42% dark overlay | Muddy, web-like | Lighter overlay (28–35%) or subtle blur on iOS; preserve contrast |
| **Button (in modal)** | Solid open / ghost close | Inverted hierarchy | Primary solid “Close” or outline + solid pair in `ModalFooter` |
| **Alert (in modal)** | Icon + empty blue row | Broken trust in status UI | Fix Text wrapping; apply `alert.message` typography + severity text color to string content |
| **Dialog** | 80–90% width, spacing[6] padding | Acceptable but wide on phone | Compare as gold standard; align Modal defaults |
| **Typography in modal** | h3 without header slot | Title competes with body; clips | Use `ModalHeader` + semibold title token |
| **Docs modal examples** | Inline `padding: 24`, hardcoded white | Implies library doesn’t provide layout | After fix, show token-native composition |

---

## 7. Token Problems

### Semantic (`packages/tokens/src/semantic.ts`)

| Token | Current (light) | Problem |
|-------|-----------------|--------|
| `color.bg.overlay` | `rgba(15,23,42,0.42)` | Heavy dim; muddy over content |
| `color.bg.default` | `#F3F1F8` | Improved in Foundation Pass — OK |
| `color.text.primary` | `gray[900]` | Still strong; acceptable with softer bg |
| `shadow.xl` | opacity up to 0.12 | Used on modal container — can feel bootstrap-heavy on sheet |

### Component tokens

| File | Token / key | Problem |
|------|-------------|--------|
| `components/modal.ts` | `container` | No `padding`; `width: '100%'`; spreads `shadow.xl` |
| `components/modal.ts` | `overlay.padding` | Unused in rendered layout |
| `components/dialog.ts` | `container.padding` | `spacing[6]` — **good reference** |
| `components/alert.ts` | `container` | Row layout + `padding[4]` OK; content styling not applied to children |
| `components/button.ts` | `variant.solid` | Foundation Pass: `radius.lg`, `shadow.sm` — improved |
| `components/toast.ts` | `variant.*` | Foundation Pass: elevated surface — improved |
| `components/badge.ts` | `variant.*.border` | Foundation Pass: visible borders — improved |
| `components/chip.ts` | `variant.solid` | Uses `bg.muted` — can still read as gray slab on some surfaces |
| `components/paper.ts` | default | `borderWidth: 0` — flat unless elevation prop set |

---

## 8. Component-by-Component Review

### Modal

- **Problems:** No default padding; overlay padding ignored; scale clip; heavy shadow/backdrop; demo miscomposed.
- **Root cause:** Token + AnimatedOverlay layout + example composition.
- **Fix direction:** Add container padding to token or `ModalContent`; inset AnimatedOverlay (respect overlay padding); reduce shadow; use compound header/footer in demos.
- **Risk:** Medium — layout changes affect all Modal consumers.

### Dialog

- **Problems:** Width 80–90% can feel wide; actions row uses `row-reverse` (acceptable).
- **Root cause:** Mostly sizing choices.
- **Fix direction:** Optional `maxWidth` cap on small phones; align with Modal tokens.
- **Risk:** Low.

### AlertDialog

- **Problems:** Generally sound; built on Dialog.
- **Root cause:** N/A for screenshot issues.
- **Fix direction:** Keep as reference pattern.
- **Risk:** Low.

### Button

- **Problems:** Ghost dismiss in Modal feels weak; solid brand `#7C3AED` can feel loud on small CTAs; Foundation Pass improved radius/shadow.
- **Root cause:** Demo hierarchy + brand saturation.
- **Fix direction:** Modal footer patterns; optional softer solid default or outline primary for dismiss.
- **Risk:** Low for demo; medium for token tweaks.

### Alert

- **Problems:** **String children broken**; `AlertContent` doesn’t apply severity text styles; icon-only appearance when text fails; close button always rendered slot (null if no onClose — OK in Modal demo).
- **Root cause:** `AlertContent.tsx` missing Text wrapper + no typography/color passthrough.
- **Fix direction:** Mirror `ModalContent` plain-text guard; wrap with styled `Text` using `alert.message` + severity color.
- **Risk:** Low — bug fix + visual improvement.

### Toast

- **Problems:** Foundation Pass improved; action label uses `brand.muted` (low contrast on some surfaces).
- **Root cause:** Minor token choice.
- **Fix direction:** Use `brand.text` for action label.
- **Risk:** Low.

### Badge

- **Problems:** Foundation Pass added borders; `accent` variant exists in tokens but not in public `BadgeVariant` type.
- **Root cause:** API/type drift.
- **Fix direction:** Optional type extension (API change — separate decision).
- **Risk:** Low.

### Chip

- **Problems:** Solid default uses `bg.muted`; colored chips OK.
- **Root cause:** Token mapping.
- **Fix direction:** Softer solid fill + border (partially done in Foundation Pass).
- **Risk:** Low.

### Card

- **Problems:** Foundation Pass improved border/shadow; Card doesn’t coerce string children (consumers must use Typography).
- **Root cause:** Composition responsibility.
- **Fix direction:** Document pattern; no change required if demos use Typography.
- **Risk:** Low.

### Paper

- **Problems:** Default flat (no border); elevation optional.
- **Root cause:** Design choice.
- **Fix direction:** Demos should set elevation/outlined variant.
- **Risk:** Low.

### Input / TextField

- **Problems:** Foundation Pass: 48px height, soft borders — good. TextField inherits input tokens.
- **Root cause:** N/A for Modal screenshot.
- **Fix direction:** Maintain; verify focus ring doesn’t layout-shift.
- **Risk:** Low.

### Typography

- **Problems:** Foundation Pass lightened display/h1; h3 in modal title OK if padded.
- **Root cause:** Missing modal header padding.
- **Fix direction:** Use with `ModalHeader`; ensure line heights on small screens.
- **Risk:** Low.

---

## 9. Text Rendering Warning Investigation

### Warning

`Text strings must be rendered within a <Text> component.`

### Primary source (confirmed)

```
apps/example/app/components/Modal.tsx:36-38
  <Alert severity="info" variant="standard">
    Modals can contain alerts and other interactive components.
  </Alert>
```

↓

```
packages/ui/src/components/Alert/Alert.tsx:79
  <AlertContent>{children}</AlertContent>

packages/ui/src/components/Alert/AlertContent.tsx:12
  return <View style={styles.contentContainer}>{children}</View>;
```

When `children` is a string, React Native requires `<Text>`.

### Other occurrences (same pattern)

| File | Pattern |
|------|---------|
| `.ai/examples/login-screen.tsx:61-63` | `<Alert>{errorMessage}</Alert>` |
| `.ai/examples/form-screen.tsx:62` | `<Alert severity="success">Thanks — ...</Alert>` |
| `apps/storybook/stories/Feedback.stories.tsx:47-50` | Raw strings in Alert |
| `apps/storybook/stories/MUIExtras.stories.tsx:255` | Raw string in Alert |

### Components with plain-text guards (good patterns to copy)

- `ModalContent.tsx` — `isPlainText` → wrap in `Text`
- `ModalHeader.tsx` — title string → `Text`
- `Button.tsx` — label/children string → `Text`
- `MenuItem.tsx`, `AppBarTitle.tsx`, `ToggleButton.tsx` — similar guards

### Recommended fix direction (later)

1. **AlertContent**: wrap string/number children in `Text` with `alert.message` style + inherited severity color.
2. **Audit** example app + `.ai/examples` + storybook for raw Alert strings.
3. **Add test**: `<Alert>message</Alert>` renders text without warning.
4. Optional: dev-only warning if Alert receives string child before fix lands everywhere.

### Not the Modal root cause

Modal title uses `Typography` (Text-based) — clipping is layout/animation, not Text warning. Warning correlates with **Alert string child** inside the open modal.

---

## 10. Priority Fix Plan

### Phase 1: Critical runtime / layout fixes

1. Fix `AlertContent` string rendering (+ tests).
2. Update `apps/example/app/components/Modal.tsx` — `Typography` or `AlertTitle` in Alert; add horizontal padding or use `ModalHeader`/`ModalFooter`.
3. Fix Modal layout: container padding + AnimatedOverlay inset (respect overlay padding).
4. Reduce clipping: review `overflow: 'hidden'` vs scale animation.
5. Fix docs/tests prop name `contentStyle` → `contentContainerStyle`.
6. Patch `.ai/examples` Alert string usage.

### Phase 2: Core visual foundation

*(Mostly completed in Visual Foundation Pass — verify on device)*

- Semantic soft bg/borders/shadows
- Button `radius.lg`, lighter shadows
- Badge/Chip/Alert/Toast visible surfaces
- Modal overlay opacity tuning (`bg.overlay`)
- Modal shadow downshift (`xl` → `md` or `lg`)

### Phase 3: Demo / docs cleanup

- Modal demo: realistic dialog composition (header, body, footer actions).
- Convert `modal.md` examples to token-based padding (no hardcoded `#fff`).
- Add native Modal/Alert snippet to visual baseline or example-only QA page.
- Align storybook Alert stories with Typography children.
- Remove inaccurate “Portal” copy in Modal demo.

---

## 11. Files to Change Later

### Critical path

- `packages/ui/src/components/Alert/AlertContent.tsx`
- `packages/ui/src/components/Alert/__tests__/Alert.test.tsx`
- `apps/example/app/components/Modal.tsx`
- `packages/tokens/src/components/modal.ts`
- `packages/ui/src/components/Modal/ModalContent.tsx`
- `packages/ui/src/components/AnimatedOverlay/AnimatedOverlay.tsx` (or Modal overlay structure)

### Examples & docs

- `.ai/examples/login-screen.tsx`
- `.ai/examples/form-screen.tsx`
- `apps/storybook/stories/Feedback.stories.tsx`
- `docs/src/content/docs/components/modal.md`
- `packages/ui/src/components/Modal/__tests__/Modal.test.tsx`

### Optional polish

- `packages/tokens/src/semantic.ts` (`color.bg.overlay`, modal shadow)
- `packages/ui/src/components/Toast/ToastItem.tsx` (action label color)
- `apps/example/app/components/Dialog.tsx` (width tuning)

---

## 12. Questions / Unknowns

1. **Exact iOS simulator / device** — not confirmed in this pass; clipping severity may vary by RN version and screen width.
2. **Whether Visual Foundation Pass is on the tested build** — tokens in repo are updated; example app may not have been rebuilt on device after pass.
3. **Popup vs Toast vs Modal** — screenshot shows RN dev warning toast; distinct from `Toast` component (verify users don’t confuse).
4. **Safe area on modal** — Modal does not apply `useSafeAreaInsets`; full-screen modal demo uses manual padding only.
5. **Keyboard avoidance** — not observed in Basic Modal; unknown for form-in-modal scenarios.
6. **Alternate brand themes** — Modal/Alert appearance on forest/love/ocean brands not spot-checked.
7. **react-native-web** — docs CSS demos don’t exercise native Modal/Alert paths.

---

*Investigation only — no code fixes applied in this pass.*
