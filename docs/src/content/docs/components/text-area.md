---
title: TextArea
---

# TextArea

Multi-line text input with label, helper text, error state, and auto-resizing.

## Usage

```tsx
import { TextArea } from '@truongdq01/ui';

<TextArea label="Bio" placeholder="Tell us about yourself" maxLength={200} />;
```

## Props

| Prop                 | Type                     | Default | Description            |
| -------------------- | ------------------------ | ------- | ---------------------- |
| `label`              | `string`                 | -       | Field label            |
| `placeholder`        | `string`                 | -       | Placeholder text       |
| `value`              | `string`                 | `""`    | Controlled value       |
| `onChangeText`       | `(text: string) => void` | -       | Change handler         |
| `onBlur`             | `() => void`             | -       | Blur handler           |
| `onFocus`            | `() => void`             | -       | Focus handler          |
| `error`              | `string`                 | -       | Error message          |
| `helperText`         | `string`                 | -       | Hint text              |
| `minLines`           | `number`                 | `3`     | Minimum visible lines  |
| `maxLines`           | `number`                 | `8`     | Maximum visible lines  |
| `maxLength`          | `number`                 | -       | Show character counter |
| `disabled`           | `boolean`                | `false` | Disable input          |
| `autoFocus`          | `boolean`                | `false` | Auto focus on mount    |
| `accessibilityLabel` | `string`                 | -       | Accessibility label    |
