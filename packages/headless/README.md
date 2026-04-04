# @truongdq01/headless

Headless primitives for RNUI — logic, state, and accessibility hooks. No styles.

## Overview

This package provides the engine behind the RNUI components. It handles gestures, animations, and accessibility using **React Native Reanimated** and **Gesture Handler**. Use this package if you want to build custom-styled components with consistent logic.

## Key Hooks

- `usePressable`: Enhanced press interactions with gesture and feedback support.
- `useDisclosure`: State management for modals, drawers, and popovers.
- `useTheme`: Context hook to access design tokens.
- `useControllableState`: Manage both controlled and uncontrolled states.

## Installation

```bash
bun add @truongdq01/headless
```

## Usage

```tsx
import { usePressable, useTheme } from "@truongdq01/headless";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";

function MyCustomButton({ onPress, children }) {
  const { tokens } = useTheme();
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress,
    feedbackMode: "scale",
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

### Subpath Imports

```tsx
// Import hooks riêng lẻ (tree-shakable)
import { usePressable, useDisclosure } from "@truongdq01/headless/hooks";

// Import theme utilities
import { ThemeProvider, useTheme } from "@truongdq01/headless/theme";

// Import motion presets
import { timingPresets } from "@truongdq01/headless/motion";
```

## Peer Dependencies

- `react` (>=19.2.0)
- `react-native` (>=0.83.2)
- `react-native-gesture-handler` (>=2.30.0)
- `react-native-reanimated` (>=4.2.0)
- `react-native-worklets` (>=0.7.0)
