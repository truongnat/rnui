# Pressable

`Pressable` wraps the headless `usePressable` hook with gesture-driven feedback on the UI thread.

## Usage

```tsx
import { Pressable } from "@truongdq01/ui";
import { Text, View } from "react-native";

<Pressable onPress={() => {}} feedbackMode="scale">
  {({ isPressed }) => (
    <View style={{ padding: 16, opacity: isPressed ? 0.8 : 1 }}>
      <Text>Tap me</Text>
    </View>
  )}
</Pressable>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode or render function` | - | Content or render function |
| `style` | `object or object[]` | - | Style passed to the animated view |
| `onPress` | `() => void` | - | Press handler |
| `onLongPress` | `() => void` | - | Long press handler |
| `longPressMinDuration` | `number` | `500` | Long press minimum duration (ms) |
| `disabled` | `boolean` | `false` | Disable interaction |
| `feedbackMode` | `"scale", "scaleSubtle", "opacity", "none"` | `"scale"` | Visual feedback style |
| `accessibilityLabel` | `string` | - | Accessibility label |
| `accessibilityHint` | `string` | - | Accessibility hint |
| `accessibilityRole` | `AccessibilityRole` | `"button"` | Accessibility role |
| `haptic` | `boolean` | `true` | Enable haptic feedback |
