# BottomSheet

Gesture-driven sheet with multi snap points, velocity-based dismiss, and an imperative ref API. All gesture and animation logic runs on the UI thread.

## Usage

```tsx
import { useRef } from 'react';
import { BottomSheet, Button, type BottomSheetRef } from '@truongdq01/ui';

function Screen() {
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <>
      <Button label="Open sheet" onPress={() => sheetRef.current?.open()} />

      <BottomSheet ref={sheetRef} snapPoints={['50%', '90%']}>
        <View style={{ padding: 24 }}>
          <Text>Sheet content</Text>
        </View>
      </BottomSheet>
    </>
  );
}
```

## Props

| Prop                   | Type                      | Default    | Description                                   |
| ---------------------- | ------------------------- | ---------- | --------------------------------------------- |
| `snapPoints`           | `SnapPoint[]`             | `["50%"]`  | Array of heights as `%` strings or px numbers |
| `initialSnapIndex`     | `number`                  | last index | Which snap to open at                         |
| `onClose`              | `() => void`              | —          | Called when sheet fully closes                |
| `onSnapChange`         | `(index: number) => void` | —          | Called when snap point changes                |
| `enableDismissOnSwipe` | `boolean`                 | `true`     | Swipe-down past lowest point dismisses        |
| `enableBackdrop`       | `boolean`                 | `true`     | Dim backdrop behind sheet                     |
| `showHandle`           | `boolean`                 | `true`     | Show pill-shaped drag handle                  |
| `borderRadius`         | `number`                  | `20`       | Top corners radius                            |

## Ref API

```tsx
const sheetRef = useRef<BottomSheetRef>(null);

sheetRef.current?.open(); // open at default snap
sheetRef.current?.open(1); // open at snap index 1
sheetRef.current?.snapTo(0); // animate to snap index 0
sheetRef.current?.close(); // animate closed
```

## Snap points

```tsx
// Percentage strings
<BottomSheet snapPoints={["30%", "60%", "90%"]} />

// Pixel values
<BottomSheet snapPoints={[250, 500]} />

// Mixed
<BottomSheet snapPoints={["40%", 600]} />
```

## Headless usage

```tsx
import { useBottomSheet } from '@truongdq01/headless';

const {
  open,
  close,
  snapTo,
  sheetAnimatedStyle,
  backdropAnimatedStyle,
  panGesture,
  backdropTapGesture,
} = useBottomSheet({ snapPoints: ['50%', '90%'] });
```
