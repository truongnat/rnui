# Getting started

## Requirements

- React Native **0.83+** (New Architecture required)
- `react-native-reanimated` **3.0+**
- `react-native-gesture-handler` **2.0+**
- `react-native-safe-area-context` **4.0+**
- Bun **1.1+**

## Install

```bash
# In your React Native / Expo project
bun add @rnui/ui react-native-reanimated react-native-gesture-handler react-native-safe-area-context
```

## Wrap your app

```tsx title="app/_layout.tsx"
import { ThemeProvider } from "@rnui/ui";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout({ children }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider colorScheme="system">
          {children}
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

## Use a component

```tsx
import { Button, Input, Card } from "@rnui/ui";

export default function Screen() {
  return (
    <Card padding="md">
      <Input label="Email" placeholder="you@example.com" />
      <Button label="Sign in" onPress={handleSignIn} />
    </Card>
  );
}
```

## Use headless only

If you want full control over styling, import from `@rnui/headless`:

```tsx
import { usePressable, useTheme } from "@rnui/headless";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";

function MyButton({ label, onPress }) {
  const { tokens } = useTheme();
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress,
    feedbackMode: "scale",
    accessibilityLabel: label,
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[{ padding: tokens.spacing[4], borderRadius: tokens.radius.md,
          backgroundColor: tokens.color.brand.default }, animatedStyle]}
        {...accessibilityProps}
      >
        <Text style={{ color: "#fff" }}>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
```

## Custom brand theme

```tsx
<ThemeProvider
  colorScheme="system"
  override={{
    light: {
      color: {
        brand: {
          default: "#7C3AED",  // violet-600
          hover:   "#6D28D9",
          active:  "#5B21B6",
          subtle:  "#EDE9FE",
          muted:   "#DDD6FE",
          text:    "#5B21B6",
        },
      },
    },
    dark: {
      color: {
        brand: {
          default: "#A78BFA",
          hover:   "#C4B5FD",
          active:  "#DDD6FE",
          subtle:  "#2E1065",
          muted:   "#4C1D95",
          text:    "#C4B5FD",
        },
      },
    },
  }}
>
  <App />
</ThemeProvider>
```