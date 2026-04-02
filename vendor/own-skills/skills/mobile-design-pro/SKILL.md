---
name: mobile-design-pro
description: |
  Professional mobile product design: touch targets, safe areas, thumb reach, one-handed use, screen density, mobile navigation patterns, iOS vs Android conventions, keyboards and forms, accessibility on small screens, and platform-specific UX edge cases.

  Use this skill when the user designs or reviews **mobile-native** UX (phone/tablet), touch and gesture patterns, bottom navigation vs tabs, sheets and modals, onboarding and permissions, offline states, foldables, or asks how iOS HIG differs from Material on mobile.

  Use **with** **`design-system-pro`** (tokens, brand, dark mode), **`react-native-pro`** or **`flutter-pro`** (implementation: SafeArea, navigation APIs, keyboard avoiding). This skill (`mobile-design-pro`) owns **mobile-specific UX and layout rules**; framework skills own **code and APIs**.

  Triggers: "mobile design", "mobile UX", "iOS HIG", "Material Design mobile", "touch target", "safe area", "notch", "bottom navigation", "thumb zone", "one-handed", "mobile keyboard", "gesture", "bottom sheet", "mobile onboarding", "tablet layout", "foldable", "mobile a11y", "VoiceOver", "TalkBack", "dynamic type".

metadata:
  short-description: Mobile design — touch, safe area, navigation, iOS/Android, edge cases
---

# Mobile design (professional)

Use [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) and [Material Design](https://m3.material.io/) for platform **truth**; this skill encodes **mobile-first constraints**, **touch ergonomics**, and **iOS vs Android** behavioral differences. Confirm **phone vs tablet**, **primary platform** (or unified), and **implementation stack** (RN, Flutter, native).

## Related skills (this repo)

| Skill | When to combine with `mobile-design-pro` |
|-------|------------------------------------------|
| **`design-system-pro`** | Tokens, typography scale, themes, cross-platform brand |
| **`react-native-pro`** | RN/Expo: SafeAreaView, navigation, KeyboardAvoidingView, platform files |
| **`flutter-pro`** | Material/Cupertino widgets, `SafeArea`, `MediaQuery` |
| **`testing-pro`** | Maestro/Detox flows, screenshot tests per device class |
| **`design-system-pro`** | **Responsive web** breakpoints, `@media`, `prefers-reduced-motion`, webfont loading — not the same as native safe-area work |

**Boundary:** **`mobile-design-pro`** = **what** the mobile experience should be; **`react-native-pro`** / **`flutter-pro`** = **how** to build it. **`design-system-pro`** owns **CSS/web responsive** and **web** a11y baselines when the surface is the **browser**.

## When to use

- **Layout and touch** — Targets, spacing, **thumb-friendly** primary actions, safe areas, keyboard overlap.
- **Navigation** — Tabs, stacks, sheets, **back** behavior expectations per platform.
- **Patterns** — Onboarding, permissions timing, pull-to-refresh, empty/offline/error.
- **Inclusivity** — Dynamic type, screen readers, RTL, reduce motion.
- **Form factors** — Tablet split view, **foldable** hinge, landscape.
- Trigger keywords: `mobile UX`, `safe area`, `touch target`, `HIG`, `Material`, `bottom sheet`, `gesture`, …

## Workflow

1. Confirm device classes (phone/tablet), platform priorities, and stack (**RN/Flutter/native**).
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **API-level** answers to **`react-native-pro`** / **`flutter-pro`**.
3. Respond using **Suggested response format**; note **iOS vs Android** deltas and **accessibility** residual risk.

### Operating principles

1. **Touch first** — Fingers are imprecise; **generous** targets and spacing beat pixel-perfect tight UI.
2. **Respect safe areas and system UI** — Notch, home indicator, status bar — content and gestures must fit.
3. **Platform-appropriate** — Follow HIG/Material unless a **documented** branded exception.
4. **One task per screen** (for critical flows) — Reduce cognitive load on small displays.
5. **Accessibility is default** — Scalable type, labels, focus order, not only color.
6. **Real devices** — Figma is not enough; **test** on actual phones and **large font** modes.

### Touch, layout, and safe areas (summary)

- **44/48pt** targets, **hitSlop**, **thumb zone**; **notch** and **keyboard**; **dynamic type** and density; forms with mobile keyboards.

Details: [references/touch-layout-safe-areas-and-density.md](references/touch-layout-safe-areas-and-density.md)

### Navigation and platform patterns (summary)

- **iOS vs Android** back, tabs, toolbars, sheets; **master-detail** on tablets; **gesture** discoverability.

Details: [references/navigation-and-platform-ios-android.md](references/navigation-and-platform-ios-android.md)

### Web responsive vs native mobile (summary)

- **Browser** layouts use breakpoints and CSS media queries; **native** apps use platform navigation and safe areas — do not conflate. For **web** WCAG contrast, motion preferences, and **`@media`** examples, use **`design-system-pro`**.

Details: [../design-system-pro/references/a11y-responsive-and-web-typography.md](../design-system-pro/references/a11y-responsive-and-web-typography.md)

### Tips and tricks (summary)

- Onboarding brevity, **in-context** permissions, haptics discipline, offline clarity, dark mode on mobile.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- RTL, foldables, split screen, **store** compliance touchpoints, deep link cold start, screen reader order.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Screen, flow, or pattern (e.g. “checkout on small phone”).
2. **Recommendation** — Mobile UX pattern + platform note (iOS/Android); cite **Related skill** for code.
3. **Code** — Layout **rules**, spacing sketch, or checklist — not full RN/Flutter components unless paired with **`react-native-pro`** / **`flutter-pro`**.
4. **Residual risks** — Gesture discovery, a11y at large text, tablet/fold assumptions untested.

## Resources in this skill

- `references/` — touch/layout, navigation/platforms, tips, edge cases.

| Topic | File |
|-------|------|
| Touch, safe area, density | [references/touch-layout-safe-areas-and-density.md](references/touch-layout-safe-areas-and-density.md) |
| Navigation & iOS/Android | [references/navigation-and-platform-ios-android.md](references/navigation-and-platform-ios-android.md) |
| Web responsive (cross-skill) | [`design-system-pro` / a11y & responsive](../design-system-pro/references/a11y-responsive-and-web-typography.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Primary “Save” button at top-right on a 6" phone — users miss it one-handed.  
**Expected output:** Move **primary** action to **bottom** toolbar or sticky footer; keep top for **destructive** secondary; cite **thumb reach**; implementation details in **`react-native-pro`**.

## Checklist before calling the skill done

- [ ] **Touch** targets and spacing justified for real fingers.
- [ ] **Safe area** / keyboard / **system** gestures considered.
- [ ] **iOS vs Android** behavior called out where it diverges.
- [ ] **Accessibility** (dynamic type, SR) not ignored.
- [ ] Code-level work **delegated** to **`react-native-pro`** / **`flutter-pro`** when applicable.
