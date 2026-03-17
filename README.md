# RNUI — React Native UI Framework

A high-performance, dual-layer UI design system for React Native (iOS + Android).

## Architecture

```
@rnui/tokens      Raw → semantic → component design tokens + motion presets
@rnui/headless    Logic, state, accessibility hooks. Zero styles.
@rnui/ui          Styled components. Wraps headless. Uses tokens.
```

**Dual-layer** means you choose your level:

```tsx
// Option A — use styled components out of the box
import { Button } from "@rnui/ui";
<Button label="Save" variant="solid" onPress={save} />

// Option B — headless only, bring your own styles
import { usePressable } from "@rnui/headless";
const { gesture, animatedStyle, accessibilityProps } = usePressable({ onPress: save });
```

## Requirements

- React Native ≥ 0.83 (New Architecture required)
- react-native-reanimated ≥ 3.0
- react-native-gesture-handler ≥ 2.0

## Getting started

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

## Usage

Wrap your app root in `ThemeProvider`:

```tsx
import { ThemeProvider } from "@rnui/ui";

export default function App() {
  return (
    <ThemeProvider colorScheme="system">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Theme override (brand customization)

```tsx
import { ThemeProvider } from "@rnui/ui";
import { primitive } from "@rnui/tokens";

const brandOverride = {
  light: {
    color: {
      brand: {
        default: "#E11D48",   // rose-600
        hover:   "#BE123C",
        active:  "#9F1239",
        subtle:  "#FFF1F2",
        muted:   "#FFE4E6",
        text:    "#9F1239",
      },
    },
  },
};

<ThemeProvider override={brandOverride}>
  <App />
</ThemeProvider>
```

### Headless example

```tsx
import { usePressable, useTheme } from "@rnui/headless";
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

## Package scripts

```bash
bun turbo build        # Build all packages
bun turbo dev          # Watch mode across all packages
bun turbo test         # Run all tests
bun turbo typecheck    # TypeScript check all packages
bun turbo lint         # Lint all packages
bun run changeset      # Create a new changeset for release
```

## Packages

| Package | Description |
|---|---|
| `@rnui/tokens` | Design tokens: primitive, semantic, component, motion |
| `@rnui/headless` | ThemeProvider, useTheme, usePressable, useDisclosure, useField |
| `@rnui/ui` | Button, Input, Card, Badge + all headless re-exports |

## Roadmap

- [ ] Toast / Snackbar with queue
- [ ] BottomSheet (Reanimated + gesture)
- [ ] Select / Dropdown
- [ ] Checkbox, Radio, Switch
- [ ] List with FlashList
- [ ] Reassure perf regression tests
- [ ] Detox E2E suite