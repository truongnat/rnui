# Button

The `Button` component wraps `usePressable` from the headless layer. All animation runs on the UI thread via Reanimated 3.

## Usage

```tsx
import { Button } from "@rnui/ui";

<Button label="Save changes" variant="solid" onPress={handleSave} />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Button text (required) |
| `variant` | `"solid" \| "outline" \| "ghost" \| "destructive"` | `"solid"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height and padding preset |
| `onPress` | `() => void` | — | Press callback |
| `onLongPress` | `() => void` | — | Long press callback |
| `loading` | `boolean` | `false` | Show spinner, disable press |
| `disabled` | `boolean` | `false` | Disable interaction and dim |
| `leadingIcon` | `ReactNode` | — | Slot before label |
| `trailingIcon` | `ReactNode` | — | Slot after label |
| `feedbackMode` | `"scale" \| "scaleSubtle" \| "opacity" \| "none"` | `"scale"` | Press animation |
| `fullWidth` | `boolean` | `false` | Fill container width |
| `accessibilityLabel` | `string` | `label` | Override a11y label |
| `accessibilityHint` | `string` | — | Screen reader hint |

## Variants

```tsx
<Button label="Primary"     variant="solid"       onPress={() => {}} />
<Button label="Secondary"   variant="outline"     onPress={() => {}} />
<Button label="Tertiary"    variant="ghost"       onPress={() => {}} />
<Button label="Delete"      variant="destructive" onPress={() => {}} />
```

## Sizes

```tsx
<Button label="Small"  size="sm" onPress={() => {}} />
<Button label="Medium" size="md" onPress={() => {}} />  {/* default */}
<Button label="Large"  size="lg" onPress={() => {}} />
```

## Loading state

```tsx
<Button label="Saving…" loading={isSaving} onPress={save} />
```

## With icons

```tsx
import { PlusIcon } from "your-icon-lib";

<Button
  label="Add item"
  leadingIcon={<PlusIcon size={16} color="#fff" />}
  onPress={addItem}
/>
```

## Headless usage

```tsx
import { usePressable } from "@rnui/headless";
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
      <Animated.View style={[myStyle, animatedStyle]} {...accessibilityProps}>
        <Text>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
```