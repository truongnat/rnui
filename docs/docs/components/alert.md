# Alert

Alerts provide contextual feedback messages for typical user actions.

## Basic Usage

```tsx
import { Alert, AlertTitle } from "@truongdq01/ui";

<Alert severity="success">
  <AlertTitle>Success</AlertTitle>
  Your changes have been saved.
</Alert>
```

## Variants

```tsx
<Alert variant="standard" severity="info">Standard info</Alert>
<Alert variant="filled" severity="error">Filled error</Alert>
<Alert variant="outlined" severity="warning">Outlined warning</Alert>
```

## Advanced Usage (Headless)

Use the `useAlert` hook to manage the open state and accessibility properties automatically.

```tsx
import { Alert, Button, useAlert } from "@truongdq01/ui";

const MyAlert = () => {
  const { isOpen, close, getAlertProps, getCloseButtonProps } = useAlert({
    onClose: () => console.log("Alert closed"),
  });

  if (!isOpen) return <Button label="Reset Alert" onPress={() => location.reload()} />;

  return (
    <Alert 
      severity="info" 
      onClose={close}
      {...getAlertProps()}
    >
      This alert is managed by a headless hook.
    </Alert>
  );
};
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `severity` | `error \| warning \| info \| success` | `info` | The severity of the alert |
| `variant` | `standard \| filled \| outlined` | `standard` | The visual variant |
| `onClose` | `() => void` | - | Callback when close icon is pressed |
| `icon` | `ReactNode \| false` | - | Custom icon or hide icon |
| `action` | `ReactNode` | - | Action element (e.g. Button) |
