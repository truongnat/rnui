# Slider

A gesture-driven slider with optional value display, range labels, and step marks.

## Usage

```tsx
import { Slider } from '@truongdq01/ui';

<Slider label="Volume" defaultValue={40} showValue showRange />;
```

## Props

| Prop           | Type                        | Default            | Description                |
| -------------- | --------------------------- | ------------------ | -------------------------- |
| `label`        | `string`                    | -                  | Label above the slider     |
| `showValue`    | `boolean`                   | `false`            | Show current value text    |
| `formatValue`  | `(value: number) => string` | `(v) => String(v)` | Format displayed value     |
| `showRange`    | `boolean`                   | `false`            | Show min/max labels        |
| `showMarks`    | `boolean`                   | `false`            | Show step marks            |
| `min`          | `number`                    | `0`                | Minimum value              |
| `max`          | `number`                    | `100`              | Maximum value              |
| `step`         | `number`                    | `1`                | Step interval              |
| `defaultValue` | `number`                    | `min`              | Uncontrolled initial value |
| `value`        | `number`                    | -                  | Controlled value           |
| `onChange`     | `(value: number) => void`   | -                  | Change handler             |
| `onChangeEnd`  | `(value: number) => void`   | -                  | Called when drag ends      |
| `disabled`     | `boolean`                   | `false`            | Disable interaction        |
