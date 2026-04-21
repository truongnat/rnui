---
title: EmptyState
---

# EmptyState

Empty states provide a consistent layout for blank screens or empty lists.

## Usage

```tsx
import { EmptyState } from '@truongdq01/ui';

<EmptyState
  title="No messages"
  description="Start a conversation to see messages here."
  action={{ label: 'New message', onPress: () => {} }}
/>;
```

## Props

| Prop              | Type               | Default | Description                             |
| ----------------- | ------------------ | ------- | --------------------------------------- |
| `icon`            | `ReactNode`        | -       | Optional icon or illustration           |
| `title`           | `string`           | -       | Main heading                            |
| `description`     | `string`           | -       | Supporting text                         |
| `action`          | `EmptyStateAction` | -       | Primary action button                   |
| `secondaryAction` | `EmptyStateAction` | -       | Secondary action                        |
| `compact`         | `boolean`          | `false` | Tighter spacing for inline empty states |

### EmptyStateAction

| Prop      | Type                          | Description   |
| --------- | ----------------------------- | ------------- |
| `label`   | `string`                      | Button text   |
| `onPress` | `() => void`                  | Click handler |
| `variant` | `"solid", "outline", "ghost"` | Button style  |
