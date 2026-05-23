---
title: GlassCard
---

# GlassCard

Frosted-glass surface with optional native blur.

## Optional dependency

`GlassCard` uses [`expo-blur`](https://docs.expo.dev/versions/latest/sdk/blur-view/) when it is installed in your app. If `expo-blur` is not present, the component falls back to a **translucent background** — no crash, but no native blur effect.

Expo:

```bash
npx expo install expo-blur
```

Bare React Native: install and configure `expo-blur` per Expo docs, or use the fallback appearance.

## Usage

```tsx
import { GlassCard } from '@truongdq01/ui';
import { Text } from 'react-native';

<GlassCard intensity={40} style={{ padding: 16 }}>
  <Text>Content on glass</Text>
</GlassCard>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `intensity` | `number` | `40` | Blur strength (0–100). Only applies when `expo-blur` is installed. |
| `tint` | `'light' \| 'dark' \| 'default'` | theme-based | `expo-blur` tint. |
| `borderRadius` | `number` | `radius.xl` | Corner radius. |
| `style` | `StyleProp<ViewStyle>` | — | Outer container style. |
| `children` | `ReactNode` | — | Card content. |

Inherits [`View`](https://reactnative.dev/docs/view) props except where overridden above.

## Status

See [Component status](/components/status/) — **beta** (optional native module).
