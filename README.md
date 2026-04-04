# RNUI

A React Native UI component library with design tokens, headless hooks, and styled components.

## Status

🚧 **Development Phase** - Not yet published to npm  
📦 **Packages Built** - Ready for testing  
🧪 **Test Coverage** - ~15%  
📚 **Documentation** - In progress

## Overview

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

## Usage Examples

```tsx
// Option A — use styled components out of the box
import { Button } from '@truongdq01/ui';
<Button label="Save" variant="solid" onPress={save} />;

// Option B — headless only, bring your own styles
import { usePressable } from '@truongdq01/headless';
const { gesture, animatedStyle, accessibilityProps } = usePressable({
  onPress: save,
});
```

## Requirements

- React Native ≥ 0.83 (New Architecture required)
- react-native-reanimated ≥ 4.2.0
- react-native-gesture-handler ≥ 2.30.0
- react-native-worklets ≥ 0.7.0
- react-native-safe-area-context ≥ 5.6.0

## Installation (Development)

Since packages are not yet published to npm, install from source:

```bash
# Clone the repository
git clone https://github.com/your-org/rnui.git
cd rnui

# Install dependencies
bun install

# Build all packages
bun run build
```

## Development Setup

```bash
# Install Bun (recommended)
curl -fsSL https://bun.sh/install | bash

# Clone and setup
git clone https://github.com/your-org/rnui.git
cd rnui
bun install

# Build packages
bun run build

# Run type checking
bun run typecheck

# Run tests
bun run test
```

## Usage (Local Development)

```tsx
import { ThemeProvider } from '@truongdq01/headless';
import { Button, Card } from '@truongdq01/ui';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Button label="Hello RNUI" />
      </Card>
    </ThemeProvider>
  );
}
```

## Architecture

### Design Tokens

```tsx
import { tokens } from '@truongdq01/tokens';

// Access primitive tokens
const spacing = tokens.spacing[4];

// Access semantic tokens
const primaryColor = tokens.color.brand.default;

// Access component tokens
const buttonPadding = tokens.component.button.padding.md;
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

### Theme Override (Brand Customization)

```tsx
import { usePressable, useTheme } from '@truongdq01/headless';
import Animated from 'react-native-reanimated';
import { GestureDetector } from 'react-native-gesture-handler';

function MyButton({ onPress, children }) {
  const { tokens } = useTheme();
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress,
    feedbackMode: 'scale',
    accessibilityLabel: 'My button',
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

### Styled Components
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle} {...accessibilityProps}>
        Press me
      </Animated.View>
    </GestureDetector>
  );
}
```

### Styled Components

```tsx
import { Button, Input, Card } from '@truongdq01/ui';

function Form() {
  return (
    <Card>
      <Input label="Email" placeholder="your@email.com" />
      <Button label="Submit" variant="solid" />
    </Card>
  );
}
```

## Components

### Core Components (62+)

- **Primitives**: Button, Input, Card, Badge, Checkbox, Switch
- **Complex**: Select, List, BottomSheet, Modal, Toast
- **Layout**: Box, Stack, Grid, Divider
- **Navigation**: Tabs, AppBar, BottomNavigation
- **Feedback**: Alert, Snackbar, CircularProgress
- **Data Display**: Table, Avatar, Typography
- **Forms**: TextField, Radio, Slider, Rating

### Features

- Full TypeScript support
- Accessibility (WCAG 2.1 compliant)
- Dark mode support
- Motion/animation presets
- Multi-brand theming
- 120+ icons (Lucide React Native)

## Development Status

### ✅ Completed

- 62 UI components implemented
- Design token system (primitive → semantic → component)
- Headless hooks library (19 hooks)
- Theme provider with brand customization
- Motion presets and animations
- Icon library integration
- TypeScript definitions
- Build system (Turborepo + tsup)

### 🚧 In Progress

- Publishing to npm
- Comprehensive test suite (currently ~15% coverage)
- Documentation website
- Storybook integration
- E2E testing (Detox)
- Performance optimization

### 📋 Planned

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

## Scripts

```bash
# Development
bun run dev          # Watch mode across packages
bun run build        # Build all packages
bun run typecheck    # TypeScript checking
bun run test         # Run tests
bun run clean        # Clean build artifacts

# Publishing
bun run changeset    # Create version changeset
bun run version-packages  # Update versions
bun run release      # Build and publish
```

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork and clone the repository
2. Install dependencies: `bun install`
3. Build packages: `bun run build`
4. Make changes in relevant packages
5. Run tests: `bun run test`
6. Submit a pull request

### Development Workflow

- Use GitNexus for code intelligence and impact analysis
- Run type checking before committing
- Follow existing code patterns and conventions
- Update documentation for new features

## License

MIT © 2026 RNUI Project

## Support

- **Issues**: [GitHub Issues](https://github.com/your-org/rnui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/rnui/discussions)
- **Documentation**: See `docs/` folder (coming soon)

---

_This project is in active development. APIs may change before v1.0.0 release._
