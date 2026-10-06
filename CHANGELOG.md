# RNUI Changelog

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
