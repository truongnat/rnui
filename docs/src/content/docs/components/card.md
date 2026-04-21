---
title: Card
---

# Card

Cards are surface containers with consistent padding, radius, and optional press feedback.

## Usage

```tsx
import { Card } from '@truongdq01/ui';
import { Text, View } from 'react-native';

<Card>
  <Text style={{ fontWeight: '600' }}>Team updates</Text>
  <Text>All systems operational.</Text>
</Card>;
```

## Pressable Card

```tsx
<Card onPress={() => console.log('pressed')} accessibilityLabel="Open card">
  <Text>Tap me</Text>
</Card>
```

## Props

| Prop                 | Type         | Default | Description               |
| -------------------- | ------------ | ------- | ------------------------- | ------- | ------ | -------------------- |
| `children`           | `ReactNode`  | -       | Card content              |
| `onPress`            | `() => void` | -       | Make card pressable       |
| `padding`            | `"sm"        | "md"    | "lg"                      | "none"` | `"md"` | Inner padding preset |
| `accessibilityLabel` | `string`     | -       | Required when pressable   |
| `style`              | `object`     | -       | Additional style override |
