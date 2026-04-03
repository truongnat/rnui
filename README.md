# RNUI — React Native UI Framework

A high-performance, dual-layer UI design system for React Native (iOS + Android).

## 🎉 Latest Release: v1.0.3

**Status:** ✅ Production Ready  
**Components:** 62+  
**Icons:** 120+  
**Last Updated:** April 3, 2026

---

## Architecture

```
@truongdq01/tokens      Raw → semantic → component design tokens + motion presets
@truongdq01/headless    Logic, state, accessibility hooks. Zero styles.
@truongdq01/ui          Styled components. Wraps headless. Uses tokens.
@truongdq01/themes      Multi-brand plugin presets
```

**Dual-layer** means you choose your level:

```tsx
// Option A — use styled components out of the box
import { Button } from "@truongdq01/ui";
<Button label="Save" variant="solid" onPress={save} />

// Option B — headless only, bring your own styles
import { usePressable } from "@truongdq01/headless";
const { gesture, animatedStyle, accessibilityProps } = usePressable({ onPress: save });
```

---

## Requirements

- React Native ≥ 0.83 (New Architecture required)
- react-native-reanimated ≥ 4.2.0
- react-native-gesture-handler ≥ 2.30.0
- react-native-worklets ≥ 0.7.0
- react-native-safe-area-context ≥ 5.6.0

---

## Getting Started

```bash
# Install Bun — https://bun.sh
curl -fsSL https://bun.sh/install | bash

# Clone and install
git clone https://github.com/your-org/rnui
cd rnui
bun install

# Build all packages
bun turbo build

# Run example app
cd apps/example
bun start

# Run Storybook on device
cd apps/storybook
bun storybook
```

---

## Usage

### 1. ThemeProvider Setup

Wrap your app root in `ThemeProvider`:

```tsx
import { ThemeProvider } from "@truongdq01/ui";

export default function App() {
  return (
    <ThemeProvider colorScheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Basic Components

```tsx
import { Button, Input, Card, Badge } from "@truongdq01/ui";

function MyForm() {
  return (
    <Card>
      <Input label="Email" placeholder="name@example.com" />
      <Button label="Submit" variant="solid" onPress={handleSubmit} />
      <Badge label="New" variant="brand" />
    </Card>
  );
}
```

### 3. Theme Override (Brand Customization)

```tsx
import { ThemeProvider } from "@truongdq01/ui";
import { loveBrand } from "@truongdq01/themes";

const brandOverride = {
  light: {
    color: {
      brand: {
        default: "#E11D48",   // rose-600
        hover:   "#BE123C",
        active:  "#9F1239",
      },
    },
  },
};

<ThemeProvider brand={loveBrand} override={brandOverride}>
  <App />
</ThemeProvider>
```

### 4. Headless Example

```tsx
import { usePressable, useTheme } from "@truongdq01/headless";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";

function MyButton({ onPress, children }) {
  const { tokens } = useTheme();
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress,
    feedbackMode: "scale",
    accessibilityLabel: "My button",
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            backgroundColor: tokens.color.brand.default,
            padding: tokens.spacing[4],
            borderRadius: tokens.radius.md,
          },
          animatedStyle,
        ]}
        {...accessibilityProps}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
```

---

## Component Highlights

### ✅ Recently Enhanced (v0.1.0)

| Component | Improvement |
|-----------|-------------|
| **Badge** | Added size variants (`sm`, `md`, `lg`) with proper padding |
| **Chip** | Improved avatar/deleteIcon styling, added `lg` size |
| **Tooltip** | Fixed positioning, added outside click to close |
| **Input** | Auto-clear error on first keystroke |
| **Select** | Clear error on selection |
| **Autocomplete** | Toggle deselect in single mode |
| **Carousel** | Auto-play mode with customizable interval |
| **Snackbar** | Smoother spring animation |
| **TextField** | Password type with show/hide toggle |
| **Icon** | **120+ icons** from lucide-react-native |
| **Timeline** | Status variants (pending/active/completed/error) |
| **DatePicker** | Quick preset buttons (Today, Last 7/30/90 days) |

### 📦 All Components (62+)

**Primitive:** Button, Input, TextArea, Card, Badge, Checkbox, Switch, Radio, Slider, Avatar, Chip, Fab

**Complex:** Select, List, BottomSheet, Toast, Autocomplete, DatePicker, Carousel, OTPInput, SegmentedControl

**Layout:** Box, Stack, Grid, Paper, Divider, Skeleton, EmptyState, Image

**Navigation:** AppBar, Tabs, BottomNavigation, Breadcrumbs, Pagination, Stepper

**Feedback:** Alert, Dialog, Snackbar, Toast, CircularProgress, LinearProgress, Timeline

**Data Display:** Table, ImageList, Icon, Typography, Link

**Overlays:** Modal, Drawer, Menu, Popover, Popper, Tooltip

**Forms:** FormField, FormControl, TextField, Rating, ToggleButton, ButtonGroup, SpeedDial

---

## Package Scripts

```bash
bun turbo build        # Build all packages
bun turbo dev          # Watch mode across all packages
bun turbo test         # Run all tests
bun turbo typecheck    # TypeScript check all packages
bun turbo lint         # Lint all packages
bun run changeset      # Create a new changeset for release
```

---

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| `@truongdq01/tokens` | 1.0.3 | Design tokens: primitive, semantic, component, motion |
| `@truongdq01/headless` | 1.0.3 | ThemeProvider, hooks (usePressable, useDisclosure, etc.) |
| `@truongdq01/ui` | 1.0.3 | 62+ styled components + all headless re-exports |
| `@truongdq01/themes` | 1.0.3 | Multi-brand presets (love, ocean, forest, sunset, midnight) |

---

## Icon Library

**120+ icons** available from lucide-react-native:

```tsx
import { Icon } from "@truongdq01/ui";

// Usage
<Icon>star</Icon>
<Icon size={24} color="#FF6B6B">heart</Icon>

// Categories:
// - Navigation & Actions (30 icons)
// - Feedback & Status (15 icons)
// - Commerce & Data (15 icons)
// - Communication (10 icons)
// - Media Controls (12 icons)
// - Weather & Nature (10 icons)
// - Locks & Security (8 icons)
// - Arrows (10 icons)
// - UI Elements (10 icons)
// - Tools (10 icons)
// - Social (6 icons)
```

---

## Roadmap

### ✅ Completed (v0.1.0)
- [x] 62 UI components
- [x] 120+ icon library
- [x] Token system (primitive → semantic → component)
- [x] Headless hooks (20+)
- [x] Multi-brand theme support
- [x] Dark mode support
- [x] Auto-play Carousel
- [x] DatePicker with presets
- [x] Timeline with status variants
- [x] Password TextField toggle

### 🚧 In Progress
- [ ] E2E test suite (Detox)
- [ ] Performance regression tests (Reassure)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Documentation site (Docusaurus)

### 📋 Planned
- [ ] Virtualized List with FlashList
- [ ] Advanced DataTable component
- [ ] Drag & Drop support
- [ ] Gesture-based interactions
- [ ] Animation presets library

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions and development guidelines.

### Quick Start

```bash
# Clone repo
git clone https://github.com/your-org/rnui
cd rnui

# Install dependencies
bun install

# Build packages
bun turbo build

# Run Storybook
cd apps/storybook
bun storybook

# Run tests
bun turbo test
```

---

## License

MIT © 2026 RNUI Project

---

## Support

- **Documentation:** [rnui.dev](https://rnui.dev) (coming soon)
- **Issues:** [GitHub Issues](https://github.com/your-org/rnui/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-org/rnui/discussions)

---

*Last updated: March 20, 2026*
