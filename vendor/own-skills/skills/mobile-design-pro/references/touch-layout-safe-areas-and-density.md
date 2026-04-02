# Touch, layout, safe areas, and density

Mobile-first design constraints that **web habits** often get wrong.

## Touch targets and spacing

- **Minimum tap size** — Aim **44×44 pt** (iOS HIG) / **48×48 dp** (Material touch target) for **interactive** elements; if visual is smaller, expand **hitSlop** / invisible padding.
- **Spacing between tappable items** — Avoid accidental taps; **8pt+** between dense icon buttons where possible.
- **Thumb reach** — Primary actions in **bottom half** for one-handed use; destructive actions harder to hit accidentally (edges, confirm).

## Safe area and device hardware

- **Notch, Dynamic Island, punch-hole** — Content and **gestures** must not collide with system UI; respect **safe area insets** (not only padding “for looks”).
- **Home indicator** — Bottom inset for swipe home; don’t place critical buttons flush against it without margin.
- **Landscape** — Short vertical space; **toolbars** and **split** layouts; avoid assuming portrait-only forever.

## Keyboard and forms

- **Keyboard pushes content** — Plan **scroll** and **focus** order; primary submit near thumb or sticky footer when keyboard open.
- **Input types** — Use **email**, **numeric**, **tel** keyboards to reduce errors (implementation: **`react-native-pro`** / **`flutter-pro`**).
- **Avoid keyboard overlap** — Critical CTAs visible above keyboard or in **toolbar** accessory when appropriate.

## Density and readability

- **Small screens** — Fewer fields per screen; **progressive disclosure** vs cramming.
- **Dynamic Type / font scale** — UI must **reflow**; no clipped text at **large accessibility** sizes (test 200%+).
- **Line length** — Shorter lines on mobile; avoid tiny text for legal-only (offer **expand**).

## Performance perception

- **Skeletons** and **optimistic UI** — Feel faster than blank screens; match layout to reduce **CLS**-like jumps in native (layout thrash).

## References

- [Apple Human Interface Guidelines — Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Material Design — Understanding layout](https://m3.material.io/foundations/layout/understanding-layout/overview)
