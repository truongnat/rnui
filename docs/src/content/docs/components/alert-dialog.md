---
title: AlertDialog
sidebar_position: 1
---

# AlertDialog

Opinionated confirmation dialog with built-in title, description, and action buttons.

Use **AlertDialog** for urgent decisions (delete, discard, confirm). For custom body layout or action composition, use [`Dialog`](./dialog.md).

## Usage

```tsx
import { AlertDialog } from '@truongdq01/ui';

<AlertDialog
  open={open}
  title="Delete item?"
  description="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  destructive
  onConfirm={handleDelete}
  onCancel={() => setOpen(false)}
/>;
```

## Layout

AlertDialog renders through `Dialog`, inheriting host inset, safe-area margins, keyboard avoidance, and container tokens.

## Props

| Prop              | Type                                              | Default      | Description                    |
| ----------------- | ------------------------------------------------- | ------------ | ------------------------------ |
| `open`            | `boolean`                                         | —            | **Required.** Open state       |
| `title`           | `string`                                          | —            | **Required.** Alert title      |
| `description`     | `string`                                          | —            | Body message                   |
| `confirmText`     | `string`                                          | `"OK"`       | Confirm button label           |
| `cancelText`      | `string`                                          | `"Cancel"`   | Cancel button label            |
| `destructive`     | `boolean`                                         | `false`      | Destructive confirm styling    |
| `confirmVariant`  | `'solid' \| 'outline' \| 'ghost' \| 'destructive'`| —            | Override confirm button variant|
| `cancelVariant`   | `'solid' \| 'outline' \| 'ghost'`                 | `'outline'`  | Cancel button variant          |
| `onConfirm`       | `() => void`                                      | —            | Confirm handler                |
| `onCancel`        | `() => void`                                      | —            | Cancel handler (omit for single-action) |
| `onClose`         | `() => void`                                      | —            | Passed to underlying Dialog    |
| `fullWidth`       | `boolean`                                         | `false`      | Expand within host inset       |

Also accepts Dialog accessibility props (`accessibilityLabel`, `backdropAccessibilityLabel`).

## Examples

### Standard confirmation

```tsx
<AlertDialog
  open={open}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  onConfirm={handleConfirm}
  onCancel={() => setOpen(false)}
/>
```

### Destructive action

```tsx
<AlertDialog
  open={open}
  title="Delete Item?"
  description="This will permanently delete this item."
  confirmText="Delete"
  destructive
  onConfirm={handleDelete}
  onCancel={() => setOpen(false)}
/>
```

### Single action (no cancel)

```tsx
<AlertDialog
  open={open}
  title="Session Expired"
  description="Please sign in again to continue."
  confirmText="Sign In"
  onConfirm={handleSignIn}
/>
```

## Best Practices

- Use for irreversible or high-stakes decisions
- Keep descriptions to one or two sentences
- Use `destructive` for delete/remove flows
- Prefer `Dialog` when you need custom body content or more than two actions

## Example app

Native reference: **`apps/example/app/components/AlertDialog.tsx`** — standard, destructive, and custom label variants.

See [Example app guide](/guides/example/).

## Related Components

- [`Dialog`](./dialog.md) — Flexible dialog with custom actions
- [`Modal`](./modal.md) — Multi-section overlay tasks
