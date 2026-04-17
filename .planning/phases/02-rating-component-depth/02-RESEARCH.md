# Phase 2 — Technical research (Rating depth)

**Date:** 2026-04-02  
**Source:** `2-CONTEXT.md`, React Native Accessibility docs, existing repo patterns (`Button`, `Pressable`, `useReduceMotionEnabled`).

## RESEARCH COMPLETE

### RN accessibility — adjustable rating

- **`accessibilityRole="adjustable"`** pairs with **`accessibilityValue`** (`{ min, max, now }` on iOS; Android may stringify — verify in implementation).
- To avoid **five duplicate “button”** announcements, set **`accessible={false}`** on each star `Pressable` and expose **one** semantic node on the wrapper (`2-CONTEXT.md` D-20).
- **`onAccessibilityAction`**: handle `increment` / `decrement` (and optionally `activate`) so SR users can change value without relying on per-star buttons. Clamp to `[0, max]` and snap steps using **`effectivePrecision`** from `useRating` (same as tap).
- **`AccessibilityInfo.announceForAccessibility(string)`** after user-driven changes only (tap or accessibility action), not on every controlled `value` prop update from parent — use handlers + optional guard to avoid duplicate announces (`2-CONTEXT.md` D-22). Fixed English string acceptable with `// TODO i18n` per CONTEXT.

### Animation

- **Reanimated 3** `useSharedValue` + `withSpring` (or `withTiming`) on the pressed star index; reset on release or after short delay — match existing **`spring`** / **`motionEasing`** imports where other components do (`2-CONTEXT.md` D-23).
- Call **`useReduceMotionEnabled()`** from `@truongdq01/headless`; when `true`, **skip** spring and keep scale `1` (`2-CONTEXT.md` D-23–D-24).

### Variants (RATE-03)

- **`showValue`** + **`valuePosition`**: layout row `View` — stars + `Typography` or `Text` with fixed format `"${ratingValue}"` or `"${ratingValue}/${max}"` (pick one in implementation; document in props JSDoc).
- **`compact`**: reduce gap via **`rating.container`** gap override or new token key under `ratingTokens` (e.g. `compactGap`) — prefer token extension in `packages/tokens/src/component.ts` if spacing is shared.
- **`iconNames`**: `{ filled, empty, half }` all **`IconName`**; default `{ star, star, starHalf }` — document that empty uses same glyph as filled with **empty** color from tokens (`2-CONTEXT.md` D-27).

### Performance

- **`React.memo(Rating)`** with **custom `arePropsEqual`** only if needed; default shallow compare is enough if `onChange` stability is documented (`2-CONTEXT.md` D-25). Export memoized component as `Rating` (named export).

### Testing

- Extend **`packages/ui/src/components/Rating/__tests__/Rating.test.tsx`**: mock `AccessibilityInfo.announceForAccessibility`, assert wrapper `accessibilityRole` / `accessibilityValue`, `accessible={false}` on stars (query `UNSAFE_getByType` or `getAllByRole` count).
- **`bun tsc --noEmit`** in `packages/ui` + targeted `jest` for Rating.

---

## Validation Architecture

**Goal:** Every executor task has an automated or explicitly manual verification path (Nyquist Dimension 8).

| Dimension | How this phase satisfies it                                                                                                               |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Automated | `jest` Rating tests + `tsc`; `rg` for required strings (`accessibilityRole`, `announceForAccessibility`, `memo(`).                        |
| Manual    | Optional SR device spot-check — document in `02-VALIDATION.md` manual table; not blocking CI.                                             |
| Sampling  | After each task: `cd packages/ui && bun tsc --noEmit && npx jest --config jest.config.js src/components/Rating/__tests__/Rating.test.tsx` |

**Feedback loop:** Fail fast on `tsc` before `jest`. No watch mode in CI commands.
