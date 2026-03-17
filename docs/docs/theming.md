# Theming

## Token architecture

RNUI uses a three-tier token system:

```
Primitive tokens
  └─ raw values (hex colors, px numbers, font weights)
  └─ never used directly in components

Semantic tokens
  └─ maps primitives to intent (bg.default, text.secondary, brand.default)
  └─ separate definitions for light and dark mode
  └─ what components use via useTokens()

Component tokens
  └─ per-component style recipes derived from semantic tokens
  └─ recomputed when scheme changes
  └─ consumed via useComponentTokens()
```

## Accessing tokens in custom components

```tsx
import { useTokens, useComponentTokens, useIsDark } from "@rnui/ui";

function MyComponent() {
  const tokens = useTokens();         // semantic tokens
  const { button } = useComponentTokens(); // component recipes
  const isDark = useIsDark();

  return (
    <View style={{ backgroundColor: tokens.color.surface.default,
      borderRadius: tokens.radius.lg, padding: tokens.spacing[4] }}>
      <Text style={{ color: tokens.color.text.primary, fontSize: tokens.fontSize.md }}>
        Hello
      </Text>
    </View>
  );
}
```

## Dark mode

```tsx
// System-aware (recommended)
<ThemeProvider colorScheme="system">

// Force light
<ThemeProvider colorScheme="light">

// Toggle at runtime
const { setColorScheme } = useTheme();
setColorScheme("dark");
setColorScheme("system"); // returns to following OS preference
```

## Brand override

Any semantic token can be overridden per color scheme:

```tsx
const brandTheme = {
  light: {
    color: {
      brand: { default: "#059669", hover: "#047857", active: "#065F46",
               subtle: "#ECFDF5", muted: "#D1FAE5", text: "#065F46" },
    },
  },
  dark: {
    color: {
      brand: { default: "#34D399", hover: "#6EE7B7", active: "#A7F3D0",
               subtle: "#022C22", muted: "#064E3B", text: "#A7F3D0" },
    },
  },
};

<ThemeProvider override={brandTheme}>
  <App />
</ThemeProvider>
```

## Motion tokens

```tsx
import { spring, duration, pressFeedback } from "@rnui/tokens";

// Use in custom Reanimated animations
const style = useAnimatedStyle(() => ({
  transform: [{ scale: withSpring(isPressed ? 0.96 : 1, spring.snappy) }],
}));
```

Available spring configs: `snappy`, `bouncy`, `gentle`, `stiff`.