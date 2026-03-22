---
sidebar_position: 55
---

# Tooltip

Tooltips display informative text when users interact with the trigger element. They appear on hover or long-press.

## Usage

```tsx
import { Tooltip, Button } from "@rnui/ui";

<Tooltip title="Save your changes">
  <Button label="Save" />
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Content to display in tooltip |
| `children` | `ReactElement` | — | **Required.** Trigger element |
| `open` | `boolean` | — | Controlled open state |
| `onOpen` | `() => void` | — | Callback when tooltip opens |
| `onClose` | `() => void` | — | Callback when tooltip closes |
| `placement` | `TooltipPlacement` | `"top"` | Position relative to trigger |

### TooltipPlacement Options

```typescript
type TooltipPlacement =
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end";
```

## Placement

```tsx
<Tooltip title="Top" placement="top">
  <Button label="Top" />
</Tooltip>

<Tooltip title="Bottom" placement="bottom">
  <Button label="Bottom" />
</Tooltip>

<Tooltip title="Left" placement="left">
  <Button label="Left" />
</Tooltip>

<Tooltip title="Right" placement="right">
  <Button label="Right" />
</Tooltip>

<Tooltip title="Top Start" placement="top-start">
  <Button label="Top Start" />
</Tooltip>

<Tooltip title="Top End" placement="top-end">
  <Button label="Top End" />
</Tooltip>
```

## Controlled Open

```tsx
function ControlledTooltip() {
  const [open, setOpen] = useState(false);
  
  return (
    <Tooltip
      title="This tooltip is controlled"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Button label="Hover me" />
    </Tooltip>
  );
}
```

## With Complex Content

```tsx
<Tooltip
  title={
    <View>
      <Text style={{ fontWeight: '600' }}>Keyboard Shortcuts</Text>
      <Text>⌘ + S: Save</Text>
      <Text>⌘ + P: Print</Text>
    </View>
  }
>
  <Button label="Help" />
</Tooltip>
```

## Common Patterns

### Icon with Tooltip

```tsx
import { Info, HelpCircle } from "lucide-react-native";

<Tooltip title="Learn more about this feature">
  <Pressable>
    <Info size={20} />
  </Pressable>
</Tooltip>

<Tooltip title="Need help?">
  <Pressable>
    <HelpCircle size={20} />
  </Pressable>
</Tooltip>
```

### Disabled Button Explanation

```tsx
<Tooltip title="Upgrade to Pro to unlock this feature">
  <View>
    <Button label="Export PDF" disabled />
  </View>
</Tooltip>
```

### Form Field Help

```tsx
<Tooltip title="Password must be at least 8 characters">
  <Pressable>
    <Info size={16} />
  </Pressable>
</Tooltip>
```

## Interaction Modes

### Hover (Desktop)
- Tooltip appears on hover
- Disappears when mouse leaves

### Long Press (Mobile)
- Tooltip appears after 400ms long press
- Tap outside to dismiss

## Accessibility

```tsx
<Tooltip
  title="Required field"
  onOpen={() => console.log("Tooltip opened")}
  onClose={() => console.log("Tooltip closed")}
>
  <Button 
    label="Submit" 
    accessibilityLabel="Submit form"
    accessibilityHint="Double tap to submit"
  />
</Tooltip>
```

## Best Practices

### ✅ Do
- Keep tooltip text concise (1-2 sentences)
- Use for supplementary information only
- Place on interactive elements
- Use appropriate placement to avoid screen edges

### ❌ Don't
- Don't put critical information in tooltips
- Don't nest tooltips
- Don't use for long explanations (use help text instead)
- Don't auto-dismiss too quickly

## Performance Notes

- Tooltip uses Reanimated 3 for smooth fade animations
- Position calculation happens on open
- Modal-based for proper layering

## Troubleshooting

### Tooltip Not Appearing

1. Ensure children is a valid React element
2. Check that trigger has measurable dimensions
3. Verify placement doesn't push tooltip off-screen

### Tooltip Position Wrong

- Try different placement values
- Ensure trigger element has proper layout
- Check for parent overflow: hidden

## Related Components

- [`Popover`](./popover.md) - Rich content overlay
- [`Dialog`](./dialog.md) - Modal dialogs
- [`Button`](./button.md) - Common trigger element
