# @truongdq01/headless

## 1.0.3

### Patch Changes

- Fix build configuration and ESM/CJS exports to resolve Metro resolution errors. This ensures .mjs files are correctly generated and referenced.
- Updated dependencies
  - @truongdq01/tokens@1.0.3

## 1.0.0

### Major Changes

- adf3203: init and publish package

### Minor Changes

- 62ce838: Initial release of RNUI v0.1.0

  ### @truongdq01/tokens
  - Primitive token system: color palette (9 ramps × 7 stops), spacing, radius, typography, opacity, z-index, elevation
  - Semantic tokens: light + dark mode mappings
  - Component tokens: Button, Input, Card, Badge, Toast, Avatar, Checkbox, Switch, Radio, Slider, Chip, Fab, Dialog, Tabs, Select, Rating, Pagination, Timeline
  - Motion tokens: spring configs, duration presets, easing curves, press feedback

  ### @truongdq01/headless
  - ThemeProvider with deep-merge override and runtime scheme switching
  - Hooks: usePressable, useDisclosure, useField, useCheckbox, useSwitch, useSelect, useRadioGroup, useTabs, useToast, useSlider, useRating, usePagination, useAccordion, useModal, useDrawer, useStepper, useAutocomplete, useToggleGroup, useBottomSheet

  ### @truongdq01/ui
  - 62 production-ready components for React Native
  - New Architecture first (RN 0.83+, Reanimated 3, Gesture Handler 2)
  - Full TypeScript support
  - Dark & Light mode with system-aware theming

### Patch Changes

- Updated dependencies [62ce838]
- Updated dependencies [adf3203]
  - @truongdq01/tokens@1.0.0
