# RadioGroup

`RadioGroup` renders a list of options using the `RadioItem` component with shared selection state.

## Usage

```tsx
import { RadioGroup } from '@truongdq01/ui';

<RadioGroup
  label="Plan"
  options={[
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
  ]}
  defaultValue="free"
/>;
```

## Props

| Prop           | Type                                                                      | Default       | Description                |
| -------------- | ------------------------------------------------------------------------- | ------------- | -------------------------- | ---------------- | ---------- |
| `options`      | `{ label: string; value: T; description?: string; disabled?: boolean }[]` | -             | Options to render          |
| `label`        | `string`                                                                  | -             | Group label                |
| `direction`    | `"vertical"                                                               | "horizontal"` | `"vertical"`               | Layout direction |
| `size`         | `"sm"                                                                     | "md"          | "lg"`                      | `"md"`           | Radio size |
| `defaultValue` | `T`                                                                       | -             | Uncontrolled initial value |
| `value`        | `T`                                                                       | -             | Controlled value           |
| `onChange`     | `(value: T) => void`                                                      | -             | Change handler             |
| `disabled`     | `boolean`                                                                 | `false`       | Disable all items          |
