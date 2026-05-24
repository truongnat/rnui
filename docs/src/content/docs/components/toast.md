---
title: Toast
---

# Toast

Transient notifications powered by `useToast` and rendered by `ToastContainer`.

Use **Toast** for non-blocking feedback (saved, error, undo). For bottom bar actions, see [`Snackbar`](./snackbar.md).

## Usage

```tsx
import { ToastContainer, useToast, Button } from '@truongdq01/ui';

function Example() {
  const toast = useToast();

  return (
    <>
      <ToastContainer position="bottom" />
      <Button
        label="Show toast"
        onPress={() =>
          toast.success('Profile saved', {
            action: { label: 'Undo', onPress: () => {} },
          })
        }
      />
    </>
  );
}
```

Mount **`ToastContainer`** once near the app root (inside `ThemeProvider` + `SafeAreaProvider`).

## Visual defaults

- **Surface** — elevated card (`surface.raised`) with subtle border and soft shadow
- **Status variants** — semantic fill + left accent border (success, error, warning, info)
- **Action label** — `brand.text` token for readable contrast (not muted brand)

Verify on device — CSS docs previews approximate tokens only.

## ToastContainer props

| Prop                | Type              | Default    | Description              |
| ------------------- | ----------------- | ---------- | ------------------------ |
| `position`          | `"top" \| "bottom"` | `"bottom"` | Screen edge for toasts |
| `horizontalPadding` | `number`          | `16`       | Side padding from edges  |

## useToast API

- `show({ message, variant, duration, persistent, action, icon })`
- `success(message, options)` · `error` · `warning` · `info`
- `dismiss(id)` · `dismissAll()`

### Action button

```tsx
toast.show({
  message: 'Item archived',
  persistent: true,
  action: {
    label: 'Undo',
    onPress: () => restoreItem(),
  },
});
```

### Custom icon

```tsx
import { Bell } from 'lucide-react-native';

toast.show({
  message: 'New notification',
  icon: <Bell />,
});
```

## Example app

Native demos: **`apps/example` → Toast screen**.

See [Example app guide](/guides/example/) and [Visual Baseline](/components/visual-baseline/).

## Related

- [Snackbar](./snackbar.md) — modal bottom bar with optional action
- [Alert](./alert.md) — inline contextual feedback
