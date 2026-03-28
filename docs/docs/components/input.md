# Input

The `Input` component provides a styled text input with support for labels, error messages, helper text, and icons.

## Usage

```tsx
import { Input } from "@truongdq01/ui";
import { Mail } from "lucide-react-native";

<Input
  label="Email"
  placeholder="you@example.com"
  leadingElement={<Mail />}
  onChangeText={(text) => console.log(text)}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Input label |
| `placeholder` | `string` | — | Placeholder text |
| `value` | `string` | — | Controlled value |
| `onChangeText` | `(text: string) => void` | — | Text change callback |
| `error` | `string` | — | Error message |
| `helperText` | `string` | — | Hint text |
| `leadingElement` | `ReactNode` | — | Element at the start (e.g. icon) |
| `trailingElement` | `ReactNode` | — | Element at the end |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size preset |
| `disabled` | `boolean` | `false` | Disable input |

## Sizes

Inputs come in three standardized heights:

- **Small**: 32px
- **Medium**: 40px
- **Large**: 48px

## Standard Icons

Elements passed to `leadingElement` or `trailingElement` are automatically styled via `useIconStyle` to match the input's size and color context.

```tsx
import { Search } from "lucide-react-native";

<Input
  placeholder="Search..."
  leadingElement={<Search />}
  size="sm"
/>
```
