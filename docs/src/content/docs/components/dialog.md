---
title: Dialog
---

# Dialog

Centered modal dialog for information, confirmations, and short input flows.

Use **Dialog** when the user must read content and choose an action. For opinionated OK/Cancel alerts, use [`AlertDialog`](./alert-dialog.md). For custom multi-section layouts, use [`Modal`](./modal.md).

## Usage

```tsx
import { Dialog, Button, Typography } from '@truongdq01/ui';

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  actions={
    <>
      <Button label="Cancel" variant="outline" onPress={() => setOpen(false)} />
      <Button label="Confirm" onPress={handleConfirm} />
    </>
  }
>
  <Typography variant="body1" color="secondary">
    Are you sure you want to proceed?
  </Typography>
</Dialog>;
```

## Layout defaults

Dialog shares overlay layout principles with Modal:

- **Host inset** — margin from screen edges (same rhythm as Modal)
- **Safe area** — respects notch and home indicator
- **Container** — padded surface, `maxWidth: 400`, soft elevation (`shadow.lg`)
- **Keyboard** — iOS keyboard avoidance for form content

Pass `fullWidth` to expand within the host inset (still never flush to screen edges).

## Props

| Prop                         | Type        | Default            | Description                          |
| ---------------------------- | ----------- | ------------------ | ------------------------------------ |
| `open`                       | `boolean`   | —                  | **Required.** Dialog open state      |
| `onClose`                    | `() => void`| —                  | Callback when closing                |
| `title`                      | `ReactNode` | —                  | Dialog title                         |
| `children`                   | `ReactNode` | —                  | Body content                         |
| `actions`                    | `ReactNode` | —                  | Footer actions (buttons)             |
| `fullWidth`                  | `boolean`   | `false`            | Expand width within host inset       |
| `accessibilityLabel`         | `string`    | `"Dialog"`         | Accessibility label for dialog       |
| `backdropAccessibilityLabel` | `string`    | `"Dismiss dialog"` | Backdrop dismiss button label        |

## Examples

### Information dialog

```tsx
<Dialog open={open} onClose={() => setOpen(false)} title="Update Available">
  <Typography variant="body1" color="secondary">
    A new version is ready to install.
  </Typography>
  <Button label="Got it" onPress={() => setOpen(false)} fullWidth />
</Dialog>
```

### Confirmation with actions

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Discard changes?"
  actions={
    <>
      <Button label="Keep Editing" variant="ghost" onPress={() => setOpen(false)} />
      <Button label="Discard" variant="destructive" onPress={handleDiscard} />
    </>
  }
>
  <Typography variant="body1" color="secondary">
    Unsaved changes will be lost.
  </Typography>
</Dialog>
```

### Form in dialog

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Rename Project"
  actions={
    <>
      <Button label="Cancel" variant="outline" onPress={() => setOpen(false)} />
      <Button label="Save" onPress={handleSave} />
    </>
  }
>
  <Input label="Project name" value={name} onChangeText={setName} />
</Dialog>
```

## Best Practices

### Do

- Keep copy short and scannable
- Put primary/secondary actions in the `actions` slot
- Use `AlertDialog` for standard OK/Cancel patterns

### Don't

- Don't nest dialogs
- Don't overload with long scrollable content (use Modal or Drawer)
- Don't add manual white boxes or hardcoded padding — the container handles it

## Example app

Native reference: **`apps/example/app/components/Dialog.tsx`** — basic, confirmation, form-in-dialog, and long content.

See [Example app guide](/guides/example/).

## Related Components

- [`AlertDialog`](./alert-dialog.md) — Built-in confirm/cancel buttons
- [`Modal`](./modal.md) — Flexible overlay with compound helpers
