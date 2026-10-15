# RNUI Changelog

## [Unreleased] — v2 registry-only model

BREAKING: legacy npm packages `@truongdq01/ui|headless|tokens|themes` removed.
RNUI is now a single shadcn-compatible registry (`registry/shared/ui`),
served via `npx shadcn add` for `nativewind` + `uniwind` variants.
Internal packages renamed: `@rnui/component-schema`, `@rnui/renderer`,
`@rnui/cli`. 83 components; renderer emits `@/components/ui/*` imports.

## [Unreleased] — registry

### Added

- **toast**: Sonner-style API — `toast.success/error/info/warning/loading/
message/promise/dismiss`, `action`/`cancel`/`icon`/`id`/`duration` options,
  `ToastProvider` `position` + `richColors`.
- **dropdown-menu / context-menu**: `*CheckboxItem`, `*RadioItem`,
  `*Shortcut`, item `inset` + `destructive`; anchored content flips above the
  trigger when it overflows the screen bottom.
- **popover / dropdown-menu / context-menu / tooltip triggers**: `asChild`
  prop (clone child, merged refs + handlers) — fixes nested-Pressable
  triggers swallowing presses.
- **dialog**: `DialogClose` primitive + built-in corner close button
  (`showClose` prop).
- **alert-dialog**: `AlertDialogAction`/`AlertDialogCancel` auto-close via
  context (onPress runs first, then `onOpenChange(false)`).
- **sheet**: `showOverlay` prop to hide the dimmed backdrop.
- **inputs** (`input`, `textarea`, `input-otp`, `select`, `date-picker`):
  `invalid` + `disabled` props, focus ring, auto FormField error/id wiring.
- **button**: `TextClassContext` label inheritance for composite children,
  `icon-sm`/`icon-lg` sizes, `invalid` prop.
- **slider**: `defaultValue`, `onSlidingStart`/`onSlidingComplete`, `invalid`.
- **switch**: `size` (`sm`/`default`) + `invalid`. **checkbox/radio-group/
  chip/toggle/rating/label**: `invalid`/`disabled`/`color` props, FormField
  error wiring.
- **utils**: `useThemeColor()`, `TextClassContext`, `FormFieldContext`,
  `composeRefs()` in `lib/utils`.

### Fixed

- **sheet**: keep the backdrop static, remove it immediately on close, and open
  at the requested snap point so the 50% detent stays visible.

- **Calendar**: remove the fixed width cap and percentage-wrapped date cells
  that left a right-side gutter and moved Saturday into the next row. Use
  explicit seven-column weeks aligned with weekday headings and hidden outside
  dates; enlarge mobile controls and weekday labels, and round range bands at
  visible row boundaries.
- **CodeBlock**: replace monochrome token emphasis with light/dark syntax colors
  for supported source languages. Preserve source indentation/newlines, selectable
  monospace text and exact clipboard contents rather than rewriting code.
  Header visibility is independent of syntax language via `showHeader`; the
  headerless demo retains TSX highlighting without a title/language/copy bar.

- **Context menu / mobile demo**: separate long-press item actions from visible
  tap overflow menus; preserve primary tap behavior and target the correct object.
  Share preference state between both entry points, remove unavailable demo actions,
  enlarge menu touch rows and labels, and use readable destructive foreground colors.
  Preserve callback trigger styles and composed press/hover handlers. Forward content
  props to its measured surface; use a separate accessibility action and escape dismissal.
  Document the custom implementation rather than describing it as an OS-native menu.

- **Popover content / demo**: apply caller `ViewProps` to the measured surface
  so width/padding overrides no longer spill outside its painted boundary.
  Preserve window-size caps, add semantic panel elevation and enlarge trigger
  hit areas without replacing caller/child hit slop. Replace the inert
  “View Profile” demo button with live account preferences and a working reset.

- **safe-area ownership**: Modal/Dialog/AlertDialog, Sheet, Drawer and Popper
  now measure their native presentation root instead of inheriting potentially
  consumed screen insets. Bottom surfaces protect lateral content as well as
  the home/navigation area; Sheet uses a consistent edge-to-edge native host.
  Drawer reserves its actual exposed edge and mirrors its slide in RTL. AppBar, TabBar,
  BottomNavigation and floating actions now respect lateral cutouts; long
  floating FAB labels are bounded and SpeedDial actions can scroll within the
  top-safe available height. Embedded previews opt out of window padding.
- **feedback hosts**: Toast and the screen-edge Snackbar demo measure local
  safe bounds, retaining caller-relative anchors without double-insetting an
  already-safe parent. Snackbar itself remains a local positioning widget.
  Registry peer metadata now includes safe-area dependencies for every
  importing edge component and Badge dependencies for navigation chrome.
- **Button / FAB caller styles**: resolve root styles as arrays rather than
  NativeWind Pressable style callbacks, which discarded caller styles and
  FAB's background/dimensions. Press/hover state and forwarded handlers are
  preserved; floating FAB alignment stays physically right in RTL layouts.
- **Drawer demo Log Out**: use the filled destructive Button variant with its
  paired foreground instead of an outline background and destructive text.
- **carousel pagination / automatic loop**: active dots stay circular with
  uniform scale and a 220ms ease-out transition; short dot groups remain
  centered. Added optional `autoPlay`, `autoPlayInterval` (3000ms), and `loop`
  (all automatic behavior defaults off). Duplicate edge slides preserve
  scroll continuity across both boundaries, including narrow-card viewports.
  Automatic paging pauses for dragging, background, reduced motion and
  screen readers, and stops at the last slide without `loop`. The hero demo
  exposes pause/resume and disables autoplay when hidden or unfocused;
  consumers likewise gate `autoPlay` with screen/viewport visibility.
- **chip selected colors**: resolve the root style as a static array instead
  of a NativeWind Pressable style callback, which left selected chips on the
  secondary background while labels used primary-foreground. Explicit press
  state preserves caller style callbacks, pressed feedback, and disabled
  opacity in light and dark modes.
- **focused core audit**: disabled chips dim correctly; removable labels and
  removal have independent accessible 44pt actions. Carousel measures the
  actual list and dot-rail viewports, realigns on resize, and respects reduced
  motion for pagination.
- **modal / drawer / anchored overlays**: narrowed modal surfaces no longer
  intercept surrounding-space dismissal. Slotted popover/context-menu
  triggers preserve child handlers/styles/state, reject disabled activation
  and stale measurements, and track the active anchor on resize. Context-menu
  checkbox callbacks no longer replace toggling or the close policy; Popper
  constrains the actual surface to safe-area bounds.
- **calendar**: controlled month changes update the visible week; a one-day
  range retains its rounded selection marker.
- **code-block**: use Menlo on iOS and lightweight syntax emphasis for JS/TS,
  JSON and CSS, preserving source text and whitespace exactly. Ignore stale
  clipboard results after source changes/unmount and prevent concurrent copy
  requests.
- **feedback / status**: readable semantic surfaces and labels, interruptible
  toast/snackbar presence, animated progress and loading states, and working
  dismiss/undo demos. Promise toasts dismissed while pending stay dismissed;
  the demo uses a Hermes-compatible Promise constructor.
- **overlays / dialogs**: retain native presentation through exit, cancel
  interrupted transitions, respect reduced motion, and align sheets, drawers,
  and anchored menus with measured content and safe areas.
- **data display**: improve typography, row hierarchy, calendar/accordion
  transitions, and functional list/chat/empty-state demos. Tables scroll at
  large text sizes; sorting fades without animating column measurements.
- **media**: reset image/avatar loading and fallback state when sources
  change, size carousel pages from their container, and add accessible
  controls. Marquee and loading loops stop when the app is backgrounded;
  marquee uses manual scrolling for reduced motion and screen readers.
- **core showcase**: consistent section spacing and responsive content width,
  actionable examples instead of inert controls, and synchronized registry
  sources, demo copies, dependencies, and NativeWind/Uniwind artifacts.
- **Hermes OOM on interaction**: var-backed classes toggled dynamically
  (`shadow-sm`, `bg-primary`…) triggered a css-interop upgrade warning that
  stringified props and killed the JS thread. Dynamic state colours now go
  through the `style` prop (`useThemeColor`) or mount/unmount indicator views.
- **TextInput `disabled`**: `disabled:` class never fired (RN uses
  `editable`) — now mapped to `editable={false}` + opacity.
- **checkbox/radio-group**: unchecked border was `border-primary` (looked
  active) — now `border-input`.
- **tooltip**: hardcoded `-40px` offset replaced by measured content height;
  flips below the trigger near the top edge.
- **input-otp**: dynamic `border-ring` class replaced by style-prop colour.

## [0.1.0] - 2026-03-20

### 🎉 Major Release - Production Ready

#### Fixed

- **Badge**: Added proper padding with size variants (`sm`, `md`, `lg`)
- **Chip**: Improved styling with better avatar/deleteIcon support, added `lg` size
- **Tooltip**: Removed flicker animation, simplified to fade-only, better positioning
- **Input**: Auto-clear error on first keystroke with `onClearError` callback
- **Select**: Clear error on selection with `onClearError` callback
- **Autocomplete**: Fixed re-selection issue, toggle deselect in single mode
- **Carousel**: Added auto-play mode with `autoPlay` and `autoPlayInterval` props
- **Snackbar**: Smoother animation with scale + spring configuration
- **TextField**: Added password type with show/hide toggle button
- **Icon**: Expanded library from 20 to 120+ icons
- **Timeline**: Enhanced design with status variants, better dots/connectors
- **DatePicker**: Added preset buttons (Today, Last 7/30/90 days), clear button

#### Added

- **Carousel**: Auto-play functionality with customizable interval
- **TextField**: `type` prop for password/email/number inputs
- **Icon**: 100+ new icons from lucide-react-native
  - Navigation & Actions (30 icons)
  - Feedback & Status (15 icons)
  - Commerce & Data (15 icons)
  - Communication (10 icons)
  - Media Controls (12 icons)
  - Weather & Nature (10 icons)
  - Locks & Security (8 icons)
  - Arrows (10 icons)
  - UI Elements (10 icons)
  - Tools (10 icons)
  - Social (6 icons)
- **Timeline**: `status` prop (pending/active/completed/error), `variant` prop
- **DatePicker**: Quick preset buttons, clearable option, `onPresetChange` callback

#### Changed

- **Tooltip**: Simplified animation pipeline, removed complex scale/translate
- **Timeline**: Improved dot sizing (16px), added shadows, better spacing
- **DatePicker**: Better UX with one-tap preset selection

#### Technical

- Fixed TypeScript build configuration for all packages
- Updated tsup config for proper type generation
- Added `tsconfig.types.json` for declaration files
- Fixed component exports across all packages

---

## [0.0.1] - 2026-03-20

### Initial Release

#### Packages

- **@truongdq01/tokens**: Design tokens (primitive, semantic, component, motion)
- **@truongdq01/headless**: Headless hooks (ThemeProvider, usePressable, useDisclosure, etc.)
- **@truongdq01/ui**: 62 UI components
- **@truongdq01/themes**: Multi-brand plugin system

#### Components (62)

Accordion, Alert, AnimatedList, AppBar, Autocomplete, Avatar, Badge, BottomNavigation,
BottomSheet, Box, Breadcrumbs, Button, ButtonGroup, Card, Carousel, Checkbox, Chip,
CircularProgress, DatePicker, Dialog, Divider, Drawer, EmptyState, Fab, FormControl,
FormField, Grid, Icon, Image, ImageList, Input, LinearProgress, Link, List, Menu,
Modal, OTPInput, Pagination, Paper, Popover, Popper, Pressable, Radio, Rating,
SegmentedControl, Select, Skeleton, Slider, Snackbar, SpeedDial, Stack, Stepper,
Switch, Table, Tabs, TextArea, TextField, Timeline, Toast, ToggleButton, Tooltip,
Typography
