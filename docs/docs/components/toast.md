# Toast

Transient notifications powered by `useToast` and rendered by `ToastContainer`.

## Usage

```tsx
import { ToastContainer, useToast, Button } from "@rnui/ui";

function Example() {
  const toast = useToast();

  return (
    <>
      <ToastContainer position="top" />
      <Button label="Show toast" onPress={() => toast.success("Saved!")} />
    </>
  );
}
```

## ToastContainer Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `"top" | "bottom"` | `"bottom"` | Screen edge for toasts |
| `horizontalPadding` | `number` | `16` | Side padding from edges |

## useToast

`useToast` returns helper methods to create and dismiss toasts:

- `show({ message, variant, duration, persistent, action, icon })`
- `success(message, options)`
- `error(message, options)`
- `warning(message, options)`
- `info(message, options)`
- `dismiss(id)` and `dismissAll()`

### Custom Icon

```tsx
import { Bell } from "lucide-react-native";

toast.show({
  message: "New notification",
  icon: <Bell />,
});
```
