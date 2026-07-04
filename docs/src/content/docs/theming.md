---
title: Theming
---

# Theming

> **Baseline:** RNUI's tokens align with the [Astryx Design System](https://astryx.atmeta.com/docs/getting-started) (color, shape, spacing, typography, motion), adapted for React Native. RNUI keeps its own token names and architecture — the alignment is additive.

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
import { useTokens, useComponentTokens, useIsDark } from '@truongdq01/ui';

function MyComponent() {
  const tokens = useTokens(); // semantic tokens
  const { button } = useComponentTokens(); // component recipes
  const isDark = useIsDark();

  return (
    <View
      style={{
        backgroundColor: tokens.color.surface.default,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing[4],
      }}
    >
      <Text
        style={{
          color: tokens.color.text.primary,
          fontSize: tokens.fontSize.md,
        }}
      >
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

## GestureHandlerRootView

`ThemeProvider` wraps children in `GestureHandlerRootView` by default (required for gesture-driven components). If your app root already includes `GestureHandlerRootView`, disable the inner wrapper:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

<GestureHandlerRootView style={{ flex: 1 }}>
  <ThemeProvider withGestureRoot={false}>
    <App />
  </ThemeProvider>
</GestureHandlerRootView>
```

## Brand override

Any semantic token can be overridden per color scheme:

```tsx
const brandTheme = {
  light: {
    color: {
      brand: {
        default: '#059669',
        hover: '#047857',
        active: '#065F46',
        subtle: '#ECFDF5',
        muted: '#D1FAE5',
        text: '#065F46',
      },
    },
  },
  dark: {
    color: {
      brand: {
        default: '#34D399',
        hover: '#6EE7B7',
        active: '#A7F3D0',
        subtle: '#022C22',
        muted: '#064E3B',
        text: '#A7F3D0',
      },
    },
  },
};

<ThemeProvider override={brandTheme}>
  <App />
</ThemeProvider>;
```

## Brand presets

`@truongdq01/themes` ships ready-made brands. Pass one to `ThemeProvider` and switch at runtime with `useBrandSwitch()`:

```tsx
import { ThemeProvider, useBrandSwitch, useActiveBrand } from '@truongdq01/ui';
import { neutralBrand, matchaBrand } from '@truongdq01/themes';

<ThemeProvider brand={neutralBrand}>
  <App />
</ThemeProvider>;

// Runtime switch
const setBrand = useBrandSwitch();
setBrand(matchaBrand);
setBrand(undefined); // back to the built-in Astryx neutral tokens
```

The built-in default tokens (no `brand`) use the Astryx **neutral** palette. These presets port the rest of the Astryx theme gallery: `neutralBrand`, `stoneBrand`, `butterBrand`, `chocolateBrand`, `matchaBrand`, `gothicBrand` (dark-first), `y2kBrand`.

## Surface hierarchy

Layer surfaces in order — each level sits visually above the previous one:

```
bg (body/canvas) → surface → surface.card → surface.popover
```

`Card` renders on `surface.card` automatically. Access levels via `tokens.color.surface.card` / `tokens.color.surface.popover`.

## Semantic radius

`tokens.radius` exposes Astryx semantic aliases alongside the t-shirt scale:

| Alias | Value | Use for |
| ----- | ----- | ------- |
| `inner` | 8 | nested elements |
| `element` | 12 | buttons, inputs, selectors |
| `container` | 16 | cards, panels, dialogs |
| `page` | 32 | page-level containers |
| `chat` | 28 | chat bubbles |

For media nested inside a padded rounded container, use `concentricRadius(outer, padding)` or read the surrounding card via `useCardSurface()`:

```tsx
import { concentricRadius, useCardSurface } from '@truongdq01/headless';

const inner = concentricRadius(tokens.radius.container, tokens.spacing[4]);
// or, inside a <Card>:
const surface = useCardSurface(); // { radius, padding, innerRadius }
```

## Data & syntax colors

For charts/visualizations use `tokens.color.data` (a categorical set plus `blue/green/orange/pink/purple/red/teal/yellow/gray` 1–5 ramps and `neutral`). For code surfaces use `tokens.color.syntax`.

## Typography scale

Standard ramp (`h1`–`h6`, `body1/2`, `caption`, `overline`, `label`, `code`) plus geometric display variants for hero/marketing/data callouts:

```tsx
<Typography variant="display1">Hero</Typography>
<Typography variant="display2">$1.2M</Typography>
<Typography variant="display3">Callout</Typography>
```

The generator lives in `@truongdq01/tokens`: `expandTypeScale({ base, ratio })` (default `{ base: 14, ratio: 1.2 }`) produces sizes via `round(base × ratio^step)` with line-heights snapped to a 4px grid.

## Motion tokens

```tsx
import { spring, duration, durationScale, pressFeedback } from '@truongdq01/tokens';
import { motionEasing, resolveDuration } from '@truongdq01/headless';

// Use in custom Reanimated animations
const style = useAnimatedStyle(() => ({
  transform: [{ scale: withSpring(isPressed ? 0.96 : 1, spring.snappy) }],
}));

// Astryx duration tiers + standard easing
withTiming(target, {
  duration: resolveDuration('medium'), // 410ms — layout-rearranging transitions
  easing: motionEasing.standard, // cubic-bezier(0.24, 1, 0.4, 1)
});
```

Available spring configs: `snappy`, `bouncy`, `gentle`, `stiff`, `elastic`. Duration tiers (`durationScale`): `fast` / `medium` / `slow`, each with `*Min` and `*Max`.

## Reduced motion

Honor the OS "reduce motion" setting for non-essential animations. `usePressable`, `Skeleton`, overlays, and `Accordion` do this already:

```tsx
import { useReducedMotion } from '@truongdq01/headless';

const reduceMotion = useReducedMotion();
animatedValue.value = reduceMotion ? target : withTiming(target);
```
