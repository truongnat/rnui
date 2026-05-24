---
title: Alert
---

# Alert

Alerts provide contextual feedback for user actions — info, success, warning, and error.

Use **Alert** for inline status on a screen. For blocking decisions, prefer [`Dialog`](./dialog.md) or [`AlertDialog`](./alert-dialog.md).

## Basic usage

Compound children inherit **severity text color** automatically — no manual color on `AlertTitle` or body `Typography`.

```tsx
import { Alert, AlertTitle, Typography } from '@truongdq01/ui';

<Alert severity="success">
  <AlertTitle>Success</AlertTitle>
  <Typography variant="body2">Your changes have been saved.</Typography>
</Alert>;
```

Plain string/number children are wrapped in `Text` internally (React Native requirement).

## Variants

```tsx
<Alert variant="standard" severity="info">
  <AlertTitle>Info</AlertTitle>
  Standard fill + 1px severity border
</Alert>

<Alert variant="filled" severity="error">
  <Typography variant="body2" color="inverse">
    Filled — use inverse text on saturated background
  </Typography>
</Alert>

<Alert variant="outlined" severity="warning">
  <Typography variant="body2">Outlined — transparent fill, severity border</Typography>
</Alert>
```

## Props

| Prop       | Type                                  | Default    | Description                         |
| ---------- | ------------------------------------- | ---------- | ----------------------------------- |
| `severity` | `error \| warning \| info \| success` | `info`     | Severity (color + default icon)     |
| `variant`  | `standard \| filled \| outlined`      | `standard` | Visual variant                      |
| `onClose`  | `() => void`                          | —          | Shows close control when set        |
| `icon`     | `ReactNode \| false`                  | —          | Custom icon or hide icon            |
| `action`   | `ReactNode`                           | —          | Trailing action (e.g. Button)       |
| `children` | `ReactNode`                           | —          | Message or compound layout          |

## Color inheritance

| Child | Behavior |
| ----- | -------- |
| `AlertTitle` | Inherits severity text color from parent |
| `Typography` without `color` | Cloned with severity color |
| `Typography` with explicit `color` | Preserved (e.g. `color="brand"`) |
| Plain string / number | Wrapped in `Text` with severity color |

## Advanced (headless)

```tsx
import { useAlert } from '@truongdq01/headless';
import { Alert, Button } from '@truongdq01/ui';

const MyAlert = () => {
  const { isOpen, close, getAlertProps } = useAlert({
    onClose: () => console.log('closed'),
  });

  if (!isOpen) return <Button label="Show" onPress={() => {}} />;

  return (
    <Alert severity="info" onClose={close} {...getAlertProps()}>
      Managed by useAlert
    </Alert>
  );
};
```

## Example app

Native demos: **`apps/example` → Alert screen** — standard, filled, outlined, and action variants.

See [Example app guide](/guides/example/) and [Visual Baseline](/components/visual-baseline/#native-overlay-qa).

## Related

- [Toast](./toast.md) — transient notifications
- [Snackbar](./snackbar.md) — bottom feedback bar
- [Visual Baseline](/components/visual-baseline/) — visible-surface matrix
