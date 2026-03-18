# FormField

`FormField` wraps inputs with a consistent label, error, and helper text layout. `FormGroup` stacks fields with uniform spacing.

## Usage

```tsx
import { FormField, FormGroup, Input, TextArea } from "@rnui/ui";

<FormGroup gap="md">
  <FormField label="Email" required>
    <Input placeholder="you@example.com" />
  </FormField>
  <FormField label="Bio" helperText="Optional">
    <TextArea placeholder="Tell us about yourself" />
  </FormField>
</FormGroup>
```

## FormField Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | - | Field label |
| `required` | `boolean` | `false` | Show required indicator |
| `error` | `string` | - | Error text (replaces helper text) |
| `helperText` | `string` | - | Supporting hint text |
| `labelTrailing` | `ReactNode` | - | Trailing content next to label |
| `children` | `ReactNode` | - | Input element |

## FormGroup Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | - | Fields to stack |
| `gap` | `"sm" | "md" | "lg"` | `"md"` | Vertical spacing between fields |
