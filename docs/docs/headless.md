# Headless API

All hooks live in `@rnui/headless`. `@rnui/ui` re-exports everything, so you only need one install.

## ThemeProvider

```tsx
import { ThemeProvider } from "@rnui/ui";

<ThemeProvider
  colorScheme="system"          // "light" | "dark" | "system"
  override={{ light: { ... }, dark: { ... } }}
>
  <App />
</ThemeProvider>
```

## Theme hooks

```tsx
const { tokens, components, colorScheme, setColorScheme } = useTheme();
const tokens = useTokens();               // semantic tokens only
const { button, input } = useComponentTokens();  // component recipes
const isDark = useIsDark();               // boolean
```

## usePressable

```tsx
const { gesture, animatedStyle, accessibilityProps, isPressed } = usePressable({
  onPress,
  onLongPress,
  longPressMinDuration: 500,
  disabled: false,
  feedbackMode: "scale",         // "scale" | "scaleSubtle" | "opacity" | "none"
  accessibilityLabel: "Button",
  accessibilityHint: "Saves changes",
  accessibilityRole: "button",
  haptic: true,
});
```

## useDisclosure

```tsx
const { isOpen, open, close, toggle, triggerProps, contentProps } = useDisclosure({
  defaultOpen: false,
  isOpen: controlled,           // optional controlled value
  onOpen: () => {},
  onClose: () => {},
});
```

## useField

```tsx
const { value, error, touched, isValidating, onChange, onBlur, reset, setError, inputProps } =
  useField({
    defaultValue: "",
    validate: async (v) => v.length < 3 ? "Too short" : undefined,
    validateOnChange: false,
  });
```

## useCheckbox

```tsx
const { isChecked, isIndeterminate, isDisabled, toggle, accessibilityProps } = useCheckbox({
  defaultChecked: false,
  checked: controlled,
  onChange: (v) => {},
  disabled: false,
  indeterminate: false,
});
```

## useSwitch

```tsx
const { isOn, isDisabled, toggle, accessibilityProps } = useSwitch({
  defaultOn: false,
  on: controlled,
  onChange: (v) => {},
  disabled: false,
});
```

## useSelect

```tsx
const { selected, isOpen, open, close, toggle, selectOption, clearSelection, isSelected, displayLabel, triggerProps } =
  useSelect({
    options: [{ label: "A", value: "a" }, ...],
    defaultValue: "a",
    value: controlled,
    onChange: (v) => {},
    multiple: false,
    disabled: false,
    placeholder: "Select…",
  });
```

## useRadioGroup

```tsx
const { selectedValue, select, isSelected, isDisabled, getItemProps } = useRadioGroup({
  defaultValue: "a",
  value: controlled,
  onChange: (v) => {},
  disabled: false,
});

// Use getItemProps to wire up each radio item:
const { onPress, accessibilityRole, accessibilityState } = getItemProps("a");
```

## useSlider

```tsx
const { currentValue, thumbAnimatedStyle, fillAnimatedStyle, trackAnimatedStyle, panGesture, onTrackLayout, percentage } =
  useSlider({
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
    value: controlled,
    onChange: (v) => {},
    onChangeEnd: (v) => {},
    disabled: false,
  });
```

## useListItem

```tsx
const { itemAnimatedStyle, trailingActionsStyle, leadingActionsStyle, gesture, accessibilityProps, isRevealed, close } =
  useListItem({
    onPress,
    onLongPress,
    trailingActions: [{ label: "Delete", color: "#ef4444", onPress: handleDelete }],
    leadingActions:  [{ label: "Star",   color: "#f59e0b", onPress: handleStar   }],
    disabled: false,
  });
```

## useToast

```tsx
const { toasts, show, dismiss, dismissAll, success, error, warning, info } = useToast();

// Imperative (works outside React):
import { showToast, dismissToast, dismissAllToasts } from "@rnui/headless";
showToast({ message: "Saved!", variant: "success", duration: 3500 });
```

## useBottomSheet

```tsx
const {
  isOpen, open, close, snapTo, currentSnapIndex,
  sheetAnimatedStyle, backdropAnimatedStyle,
  panGesture, backdropTapGesture,
} = useBottomSheet({
  snapPoints: ["50%", "90%"],
  initialSnapIndex: 0,
  onClose: () => {},
  onSnapChange: (i) => {},
  enableDismissOnSwipe: true,
  enableBackdrop: true,
});
```