---
title: Snackbar
---

# Snackbar

Bottom (or top) feedback bar for short messages and optional actions.

Use **Snackbar** for lightweight confirmations (“Saved”, “Undo”). For stacked transient toasts, prefer [`Toast`](./toast.md).

## Usage

```tsx
import { Snackbar, Button } from '@truongdq01/ui';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Save" onPress={() => setOpen(true)} />
      <Snackbar
        open={open}
        message="Changes saved"
        onClose={() => setOpen(false)}
        action={<Button label="Undo" variant="ghost" size="sm" onPress={handleUndo} />}
      />
    </>
  );
}
```

## Visual defaults

Snackbar uses an **elevated surface** (aligned with Toast after Phase 2B):

- Background: `surface.raised` + `border.subtle`
- Text: `text.primary`
- Action text: `brand.text`
- Soft shadow — not a heavy inverse (`bg.inverse`) slab

Confirm readability on the app background in the example app.

## Props

| Prop               | Type                                      | Default                              | Description                    |
| ------------------ | ----------------------------------------- | ------------------------------------ | ------------------------------ |
| `open`             | `boolean`                                 | —                                    | **Required.** Visible state    |
| `message`          | `ReactNode`                               | —                                    | **Required.** Message text     |
| `onClose`          | `() => void`                              | —                                    | Close / auto-hide callback     |
| `autoHideDuration` | `number \| null`                          | `4000`                               | ms until auto-hide; `null` off |
| `action`           | `ReactNode`                               | —                                    | Trailing action element        |
| `anchorOrigin`     | `{ vertical, horizontal }`                | `{ vertical: 'bottom', horizontal: 'center' }` | Screen position      |

## Best practices

- Keep messages to one short line when possible
- Use `action` for undo/retry — not a second navigation flow
- Do not rely on blur or glass behind the snackbar for contrast

## Example app

Native demos: **`apps/example` → Snackbar screen**.

See [Example app guide](/guides/example/) and [Visual Baseline](/components/visual-baseline/).

## Related

- [Toast](./toast.md) — `useToast` queue
- [Alert](./alert.md) — inline status blocks
