# Checkbox

Checkboxes support controlled or uncontrolled state, indeterminate state, and optional label/description.

## Usage

```tsx
import { Checkbox } from "@rnui/ui";

<Checkbox label="Accept terms" defaultChecked />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | - | Primary label |
| `description` | `string` | - | Secondary text below label |
| `size` | `"sm" | "md" | "lg"` | `"md"` | Checkbox size |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial value |
| `checked` | `boolean` | - | Controlled value |
| `onChange` | `(checked: boolean) => void` | - | Change handler |
| `disabled` | `boolean` | `false` | Disable interaction |
| `indeterminate` | `boolean` | `false` | Show mixed state |
