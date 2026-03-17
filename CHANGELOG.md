# Changelog

All notable changes to this project will be documented here.
This project follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Packages

#### `@rnui/tokens` v0.0.1
- Primitive token system: color palette (9 ramps × 7 stops), spacing (4px base), radius, typography, opacity, z-index, elevation
- Semantic tokens: light + dark mode mappings for bg, surface, text, border, brand, feedback colors, shadows
- Component tokens: Button, Input, Card, Badge, Toast — resolved per color scheme
- Motion tokens: spring configs (snappy, bouncy, gentle, stiff), duration presets, easing curves, press feedback, enter/exit animation names

#### `@rnui/headless` v0.0.1
- `ThemeProvider` — React Context, deep-merge override, runtime scheme switching
- `useTheme()` — full theme access
- `useTokens()` — semantic tokens shorthand
- `useComponentTokens()` — component tokens shorthand
- `useIsDark()` — boolean dark mode check
- `usePressable` — Reanimated 3 + Gesture Handler, UI-thread press/scale/opacity feedback, haptic, a11y
- `useDisclosure` — open/close/toggle, controlled + uncontrolled, a11y props
- `useField` — value, error, touched, sync/async validation, reset
- `useCheckbox` — checked, indeterminate, disabled, controlled/uncontrolled
- `useSwitch` — on/off, controlled/uncontrolled
- `useSelect` — single + multi select, open/close, displayLabel
- `useRadioGroup` — selected value, getItemProps
- `useSlider` — UI-thread pan, step snapping, spring thumb
- `useListItem` — swipe-to-reveal (leading + trailing), velocity snap/dismiss
- `useToast` — singleton store via useSyncExternalStore, queue, auto-dismiss, persistent
- `useBottomSheet` — snap points, pan gesture, backdrop opacity, velocity dismiss

#### `@rnui/ui` v0.0.1
**Primitive components**
- `Button` — solid/outline/ghost/destructive, sm/md/lg, loading, disabled, leading/trailing icon slots
- `Input` — sm/md/lg, label, error, helper text, leading/trailing element slots
- `TextArea` — auto-grow, min/max lines, char counter, all Input states
- `Card` — pressable (scale feedback) or static, padding presets
- `Badge` — default/brand/success/warning/error/info variants
- `Checkbox` — animated fill, indeterminate, sm/md/lg, label + description
- `Switch` — animated thumb via interpolateColor, sm/md/lg
- `RadioGroup` + `RadioItem` — vertical/horizontal, spring dot animation
- `Slider` — track/fill/thumb, step marks, range labels, value label, disabled
- `Avatar` — initials with deterministic color, image, status dot, xs–xl, circle/rounded
- `AvatarGroup` — stacked with overflow count

**Complex components**
- `Select` — trigger + BottomSheet dropdown, searchable, single/multi, option disabled
- `List` + `ListItem` + `SectionHeader` — FlashList wrapper, swipe actions, skeleton loading
- `BottomSheet` — multi snap points, pan gesture, backdrop, `forwardRef` imperative API
- `ToastContainer` + `ToastItem` — queue, auto-dismiss progress bar, enter/exit animation, action button

**Testing**
- Unit tests: `packages/tokens`, `packages/headless` (hooks + ThemeProvider)
- Performance regression: Reassure tests for all interactive components
- E2E: Detox test suite covering Button, Input, Checkbox, Switch, Toast, BottomSheet, Select, Theme switching