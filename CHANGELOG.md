# RNUI Changelog

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
