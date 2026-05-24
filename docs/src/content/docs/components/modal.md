---
title: Modal
sidebar_position: 47
---

# Modal

Modals are overlay containers for focused tasks and important content that requires user attention.

Use **Modal** for short forms, multi-section content, or custom layouts. For simple yes/no decisions, prefer [`Dialog`](./dialog.md) or [`AlertDialog`](./alert-dialog.md).

## Usage

```tsx
import {
  Modal,
  ModalHeader,
  ModalFooter,
  Button,
  Typography,
} from '@truongdq01/ui';

<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader title="Modal Title" />
  <Typography variant="body2" color="secondary">
    Modal content
  </Typography>
  <ModalFooter>
    <Button label="Close" onPress={() => setIsOpen(false)} />
  </ModalFooter>
</Modal>;
```

## Layout defaults

Centered modals apply token-driven layout automatically:

- **Host inset** — horizontal and vertical margin from screen edges (`modal.hostInset`)
- **Safe area** — host padding respects notch and home indicator (via safe-area insets)
- **Container** — internal padding, rounded corners, `maxWidth: 400`, soft elevation
- **Keyboard** — iOS uses `KeyboardAvoidingView` padding behavior for form content

`fullScreen` skips host inset; the consumer controls insets inside the surface.

## Props

| Prop                         | Type                   | Default           | Description                                         |
| ---------------------------- | ---------------------- | ----------------- | --------------------------------------------------- |
| `open`                       | `boolean`              | —                 | **Required.** Modal open state                      |
| `onClose`                    | `() => void`           | —                 | Callback when closing                               |
| `children`                   | `ReactNode`            | —                 | Modal content                                       |
| `fullScreen`                 | `boolean`              | `false`           | Full-screen surface (no host inset)                 |
| `keepMounted`                | `boolean`              | `false`           | Keep in DOM when closed                             |
| `hideBackdrop`               | `boolean`              | `false`           | Hide backdrop overlay                               |
| `disableAutoFocus`           | `boolean`              | `false`           | Disable auto focus                                  |
| `disableEscapeKeyDown`       | `boolean`              | `false`           | Disable ESC key close                               |
| `accessibilityLabel`         | `string`               | `"Modal"`         | Accessibility label for modal content               |
| `backdropAccessibilityLabel` | `string`               | `"Dismiss modal"` | Accessibility label for the backdrop dismiss button |
| `BackdropComponent`          | `ComponentType`        | —                 | Custom backdrop component                           |
| `BackdropProps`              | `object`               | —                 | Props for backdrop                                  |
| `contentContainerStyle`      | `StyleProp<ViewStyle>` | —                 | Override container surface styles (padding, bg, etc.) |

## Examples

### Basic Modal

```tsx
function BasicModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open Modal" onPress={() => setOpen(true)} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Modal Title" />
        <Typography variant="body2" color="secondary">
          Click outside or use the backdrop dismiss action to close.
        </Typography>
        <ModalFooter>
          <Button label="Close" onPress={() => setOpen(false)} />
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Form Modal

```tsx
function FormModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <>
      <Button label="Add User" onPress={() => setOpen(true)} />

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader title="Add New User" />
        <Input label="Name" value={name} onChangeText={setName} />
        <ModalFooter>
          <Button label="Cancel" variant="outline" onPress={() => setOpen(false)} />
          <Button label="Save" onPress={handleSave} />
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Custom surface

Use `contentContainerStyle` to override the default container tokens (background, padding, radius):

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  contentContainerStyle={{ backgroundColor: tokens.color.brand.default }}
>
  {/* branded content */}
</Modal>
```

### Without Backdrop

```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)} hideBackdrop>
  <Typography>Content without backdrop</Typography>
</Modal>
```

## Best Practices

### Do

- Use for focused tasks requiring attention
- Compose with `ModalHeader`, `ModalFooter`, and typography components
- Keep content concise and scannable
- Provide clear close mechanism

### Don't

- Don't use for simple confirmations (use `Dialog` / `AlertDialog`)
- Don't put too much content (use `Drawer` for complex flows)
- Don't nest modals
- Don't wrap content in manual `#fff` boxes — the container already provides padding and surface

## Accessibility

```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  accessibilityLabel="Add user form"
>
  {/* content */}
</Modal>
```

## Keyboard / Back button

- **iOS:** Form content shifts with the keyboard via `KeyboardAvoidingView` (`padding` behavior).
- **Android:** Hardware back triggers `onRequestClose` (respects `disableEscapeKeyDown`).

## Example app

Native reference: **`apps/example/app/components/Modal.tsx`** — basic, form, full-screen, and custom surface demos.

Run `cd apps/example && bun run ios` and verify inset, safe area, and keyboard behavior. See [Example app guide](/guides/example/) and [Visual Baseline → Native QA](/components/visual-baseline/#native-overlay-qa).

## Related Components

- [`Dialog`](./dialog.md) — Pre-styled confirmation/information dialogs
- [`AlertDialog`](./alert-dialog.md) — Opinionated alert with built-in actions
- [`Drawer`](./drawer.md) — Side panel overlays
- [`BottomSheet`](./bottom-sheet.md) — Mobile-optimized bottom sheets
