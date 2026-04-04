# RNUI — Project Gaps & TODO

> Scanned: 2026-04-03 | Updated by: Kilo
> Previous scan: 2026-03-20

---

## ✅ Resolved (Previously Critical)

### 1. Packages published to npm ✅

- `@truongdq01/tokens` — v1.0.3 ✅ PUBLISHED
- `@truongdq01/headless` — v1.0.3 ✅ PUBLISHED
- `@truongdq01/ui` — v1.0.3 ✅ PUBLISHED
- `@truongdq01/themes` — v1.0.3 ✅ PUBLISHED

All packages available at: https://www.npmjs.com/package/@truongdq01/ui

### 2. CI runs on `master` branch ✅

CI workflow updated to trigger on `master` and `develop` branches.
File: `.github/workflows/ci.yml` — confirmed working.

### 3. Token coverage: 100% ✅

All 62 components have dedicated token functions in `@truongdq01/tokens`.
Previously reported 49 missing — all have been implemented.

### 4. Changeset system working ✅

CHANGELOG.md exists with v0.1.0 and v1.0.3 entries.
Version history tracked via npm releases.

---

## ⚠️ Current Gaps

### 1. Headless hooks coverage (35/62 components) ✅

Hooks existing (35):
`useAccordion, useAlert, useAutocomplete, useBottomNavigation, useBottomSheet,
useCarousel, useCheckbox, useDatePicker, useDisclosure, useDrawer, useField,
useIconStyle, useListItem, useMenu, useModal, useMotionPreference, useMemoStyles,
useOTPInput, usePagination, usePersistedColorScheme, usePressable, useRadioGroup,
useRating, useScrollHeader, useSegmentedControl, useSelect, useSkeleton, useSlider,
useStepper, useSwitch, useTable, useTabs, useTimeline, useToast, useToggleGroup`

**Newly added hooks (2026-04-03):**

- `useDatePicker` — calendar logic, presets, month navigation, range selection ✅
- `useTimeline` — step state, expand/collapse, navigation ✅
- `useSkeleton` — loading state, stagger delay ✅

**Components missing dedicated hooks (27):**
Most remaining components are either visual-only (Avatar, Badge, Icon), layout-only (Box, Stack, Grid), or compose existing hooks (Button → usePressable, Dialog → useModal, Snackbar → useToast).

**No critical missing hooks remain.**

---

### 2. Storybook coverage (25/62 components = 40%) ✅ UPDATED

New stories added (2026-04-03):

- `Forms.stories.tsx` — Checkbox, Radio, Switch, Slider, Input, TextArea, TextField, FormControl, FormField, Select
- `MissingComponents.stories.tsx` — Divider, EmptyState, FormField, Modal, Popover, Popper, Skeleton

**Components with stories (25):**
Accordion, AnimatedList, Badge, BottomSheet, Button, Card, Carousel,
Checkbox, Chip, CircularProgress, ComplexComponents, DataDisplay,
DatePicker, Divider, Drawer, EmptyState, Feedback, FormControls, Forms,
Image, InputsExtra, Layout, List, MissingComponents, MUIExtras,
Navigation, OTPInput, Pressable, SegmentedControl, Skeleton, Slider,
Snackbar, Switch, Toast, Utility

**Components still needing individual stories (~37):**
Alert, AppBar, Avatar, AvatarGroup, Box, Breadcrumbs, ButtonGroup,
Dialog, Fab, FormControl, FormField, Grid, Icon, ImageList, Input,
LinearProgress, Link, Menu, Modal, Pagination, Paper, Popover, Popper,
Radio, Rating, Select, SpeedDial, Stack, Stepper, Table, Tabs,
TextArea, TextField, Timeline, ToggleButton, Tooltip, Typography

Note: Many of these are covered in grouped stories (FormControls, Feedback, DataDisplay, Navigation, Layout, InputsExtra, ComplexComponents).

**Effort to complete:** ~4-6h for comprehensive individual stories

---

### 3. Documentation: COMPLETE ✅

All component documentation exists:

- ✅ All 62 components have doc files in `docs/docs/components/`
- ✅ Previously "missing" 5 docs verified: animated-list, carousel, date-picker, otp-input, segmented-control

**No documentation gaps remain.**

---

### 4. UI Bugs Status from UI_REPORT.md

**Already Fixed:**

- ✅ OTPInput border color — uses `filled.borderColor` correctly
- ✅ OTPInput useState — example uses `useState("")` properly
- ✅ Theme switching — `setColorScheme` wired to buttons
- ✅ SegmentedControl state — example uses `useState`
- ✅ Carousel colors — uses theme colors

**Remaining UI Improvements (from IMPROVEMENT_PLAN.md):**

- Input focus speed (reduce 200ms → 120ms)
- FormField semantic padding (label hierarchy)
- TextArea counter position
- Toast animation smoothness
- DatePicker calendar grid (XL effort)
- Slider vertical + range mode
- EmptyState visual presets
- Skeleton presets expansion

---

## ✅ Current Strengths

- **62 components** fully implemented
- **100% token coverage** — all components have token functions
- **35 headless hooks** — covers all complex components
- **CI/CD pipeline** — working on master/develop
- **NPM publishing** — v1.0.3 released
- **Monorepo** — Bun + Turborepo setup
- **Storybook** — 25 story files with on-device controls (40% coverage)
- **Dark mode** — full support with semantic tokens
- **Testing** — Jest + Detox E2E setup
- **Documentation** — all 62 components documented

---

## 🎯 Updated Priority Roadmap

| Priority | Task                                           | Effort | Status  |
| -------- | ---------------------------------------------- | ------ | ------- |
| 🟡 P1    | Individual Storybook stories (~37 components)  | M      | Pending |
| 🟢 P2    | Input focus speed optimization (200ms → 120ms) | S      | Planned |
| 🟢 P2    | Toast animation smoothness                     | S      | Planned |
| 🟢 P2    | DatePicker calendar grid redesign              | XL     | Planned |
| 🟢 P2    | Slider vertical + range mode                   | L      | Planned |
| 🟢 P2    | EmptyState visual presets                      | M      | Planned |
| 🟢 P2    | Skeleton presets expansion                     | M      | Planned |

---

_Last updated: 2026-04-03_
