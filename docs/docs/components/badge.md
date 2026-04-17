# Badge

Compact status label with variants and an optional icon.

## Usage

```tsx
import { Badge } from "@truongdq01/ui";
import { Check } from "lucide-react-native";

<Badge label="Active" variant="success" />
<Badge label="Synced" variant="brand" icon={<Check />} />
```

## Props

| Prop      | Type        | Default | Description                |
| --------- | ----------- | ------- | -------------------------- | --------- | ------- | ------- | ----------- | ------------ |
| `label`   | `string`    | --      | Badge text                 |
| `variant` | `"default"  | "brand" | "success"                  | "warning" | "error" | "info"` | `"default"` | Visual style |
| `icon`    | `ReactNode` | --      | Optional icon before label |

## Variants

Use the `variant` prop to match semantic intent:

- `default`
- `brand`
- `success`
- `warning`
- `error`
- `info`
