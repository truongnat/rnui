# RNUI

RNUI provides a comprehensive set of UI components for React Native applications, built with:

- **Design Tokens**: Primitive → Semantic → Component tokens
- **Headless Hooks**: Reusable logic and state management
- **Styled Components**: Pre-built UI components with theming
- **Motion Presets**: Animation configurations
- **Multi-brand Support**: Theme customization

## Packages

| Package                | Version | Status   | Description                                            |
| ---------------------- | ------- | -------- | ------------------------------------------------------ |
| `@truongdq01/tokens`   | 1.0.3   | ✅ Built | Design tokens (primitive, semantic, component, motion) |
| `@truongdq01/headless` | 1.0.3   | ✅ Built | Theme provider and headless hooks                      |
| `@truongdq01/ui`       | 1.0.3   | ✅ Built | 62+ styled components                                  |
| `@truongdq01/themes`   | 1.0.3   | ✅ Built | Multi-brand theme presets                              |
| `@truongdq01/example`  | 0.0.2   | ✅ Ready | React Native / Expo Example App Showcase               |

## Requirements

- React Native ≥ 0.83 (New Architecture required)
- react-native-reanimated ≥ 4.2.0
- react-native-gesture-handler ≥ 2.30.0
- react-native-worklets ≥ 0.7.0
- react-native-safe-area-context ≥ 5.6.0

## Getting Started (Development)

```bash
# Clone the repository
git clone https://github.com/your-org/rnui.git
cd rnui

# Install dependencies (requires Bun)
bun install

# Build all packages
bun run build
```

## Running the Example App

The example app is a showcase of all RNUI components running on iOS/Android via Expo.

```bash
# Start the Expo development server
cd apps/example
bun run start

# Or to run specifically on iOS / Android simulators:
bun run ios
bun run android
```

The app includes:

- A kitchen sink showcase of components.
- Dedicated screens demonstrating isolated usage for each UI component.

## Running the Documentation Site

The documentation site has been migrated to a high-performance **Astro Starlight** setup.

```bash
# From the root directory, start docs using Astro:
bun run docs

# The documentation will be available at http://localhost:4321
```

## Scripts

```bash
# Development
bun run dev          # Watch mode across packages
bun run build        # Build all packages
bun run typecheck    # TypeScript checking
bun run lint         # Run Biome linter across all packages
bun run test         # Run tests
bun run clean        # Clean build artifacts

# Publishing
bun run changeset    # Create version changeset
bun run version-packages  # Update versions
bun run release      # Build and publish
```

## Architecture

### Styled Components

```tsx
import { Button, Input, Card } from '@truongdq01/ui';
import { ThemeProvider } from '@truongdq01/headless';

function Form() {
  return (
    <ThemeProvider>
      <Card>
        <Input label="Email" placeholder="your@email.com" />
        <Button label="Submit" variant="solid" />
      </Card>
    </ThemeProvider>
  );
}
```

### Headless Hooks

```tsx
import { usePressable } from '@truongdq01/headless';

function MyComponent() {
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress: handlePress,
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

## Components Archive (62+ Core Components)

- **Primitives**: Button, Input, Card, Badge, Checkbox, Switch
- **Complex**: Select, List, BottomSheet, Modal, Toast
- **Layout**: Box, Stack, Grid, Divider
- **Navigation**: Tabs, AppBar, BottomNavigation
- **Feedback**: Alert, Snackbar, CircularProgress
- **Data Display**: Table, Avatar, Typography
- **Forms**: TextField, Radio, Slider, Rating

## License

MIT © 2026 RNUI Project
