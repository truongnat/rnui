# Switch

Switches toggle a boolean state and support optional label/description.

## Usage

```tsx
import { Switch } from '@truongdq01/ui';

<Switch label="Notifications" defaultOn />;
```

## Props

| Prop          | Type                    | Default | Description                |
| ------------- | ----------------------- | ------- | -------------------------- | ------ | ----------- |
| `label`       | `string`                | -       | Primary label              |
| `description` | `string`                | -       | Secondary text             |
| `size`        | `"sm"                   | "md"    | "lg"`                      | `"md"` | Switch size |
| `defaultOn`   | `boolean`               | `false` | Uncontrolled initial state |
| `on`          | `boolean`               | -       | Controlled value           |
| `onChange`    | `(on: boolean) => void` | -       | Change handler             |
| `disabled`    | `boolean`               | `false` | Disable interaction        |
