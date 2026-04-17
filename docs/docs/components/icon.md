---
sidebar_position: 35
---

# Icon

Standardized icon component using Lucide React Native with 70+ icons available.

## Usage

```tsx
import { Icon } from "@truongdq01/ui";

<Icon name="star" />
<Icon name="heart" size={24} color="#FF6B6B" />
```

## Props

| Prop       | Type                                                                                        | Default       | Description                     |
| ---------- | ------------------------------------------------------------------------------------------- | ------------- | ------------------------------- |
| `name`     | `IconName`                                                                                  | —             | Icon name (or use children)     |
| `children` | `IconName \| ReactNode`                                                                     | —             | Icon name as children           |
| `size`     | `number \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "small" \| "medium" \| "large"` | `"md"`        | Icon size                       |
| `color`    | `string`                                                                                    | `theme color` | Icon color (hex or theme token) |
| `style`    | `StyleProp<ViewStyle>`                                                                      | —             | Additional container styles     |

### Size Presets

| Size            | Value          |
| --------------- | -------------- |
| `xs`            | 12px           |
| `sm` / `small`  | 16px           |
| `md` / `medium` | 20px (default) |
| `lg` / `large`  | 24px           |
| `xl`            | 32px           |
| `2xl`           | 48px           |

## Available Icons (70+)

### Navigation & Actions (30 icons)

```tsx
<Icon name="home" />
<Icon name="user" />
<Icon name="settings" />
<Icon name="search" />
<Icon name="bell" />
<Icon name="menu" />
<Icon name="moreVertical" />
<Icon name="moreHorizontal" />
<Icon name="plus" />
<Icon name="minus" />
<Icon name="edit" />
<Icon name="trash" />
<Icon name="share" />
<Icon name="download" />
<Icon name="upload" />
<Icon name="refresh" />
<Icon name="externalLink" />
<Icon name="layout" />
<Icon name="grid" />
<Icon name="list" />
```

### Arrows (10 icons)

```tsx
<Icon name="chevronUp" />
<Icon name="chevronDown" />
<Icon name="chevronLeft" />
<Icon name="chevronRight" />
<Icon name="arrowUp" />
<Icon name="arrowDown" />
<Icon name="arrowLeft" />
<Icon name="arrowRight" />
<Icon name="arrowUp" />
<Icon name="arrowDown" />
```

### Feedback & Status (15 icons)

```tsx
<Icon name="star" />
<Icon name="heart" />
<Icon name="check" />
<Icon name="checkCircle" />
<Icon name="info" />
<Icon name="warning" />
<Icon name="error" />
<Icon name="close" />
<Icon name="closeCircle" />
<Icon name="eye" />
<Icon name="eyeOff" />
<Icon name="thumbsUp" />
<Icon name="thumbsDown" />
<Icon name="starHalf" />
<Icon name="flame" />
```

### Commerce & Data (15 icons)

```tsx
<Icon name="shoppingCart" />
<Icon name="creditCard" />
<Icon name="package" />
<Icon name="box" />
<Icon name="layers" />
<Icon name="file" />
<Icon name="copy" />
<Icon name="mail" />
<Icon name="phone" />
<Icon name="message" />
<Icon name="send" />
<Icon name="calendar" />
<Icon name="clock" />
<Icon name="mapPin" />
<Icon name="zap" />
```

### Media (12 icons)

```tsx
<Icon name="camera" />
<Icon name="image" />
<Icon name="video" />
<Icon name="lock" />
<Icon name="unlock" />
```

## Examples

### Basic Icons

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Icon name="star" />
  <Icon name="heart" />
  <Icon name="check" />
  <Icon name="info" />
</View>
```

### Different Sizes

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
  <Icon name="star" size="xs" />
  <Icon name="star" size="sm" />
  <Icon name="star" size="md" />
  <Icon name="star" size="lg" />
  <Icon name="star" size="xl" />
  <Icon name="star" size="2xl" />
</View>
```

### Custom Colors

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Icon name="heart" color="#EF4444" />
  <Icon name="star" color="#F59E0B" />
  <Icon name="check" color="#10B981" />
  <Icon name="info" color="#3B82F6" />
</View>
```

### With Buttons

```tsx
import { Icon, Button } from "@truongdq01/ui";

<Button
  label="Save"
  leadingIcon={<Icon name="check" size={16} />}
/>

<Button
  label="Share"
  variant="outline"
  trailingIcon={<Icon name="share" size={16} />}
/>
```

### Icon Buttons

```tsx
import { Icon, Pressable } from "@truongdq01/ui";

<Pressable>
  <Icon name="settings" size={24} />
</Pressable>

<Pressable>
  <Icon name="heart" size={24} color="#EF4444" />
</Pressable>
```

### Navigation Icons

```tsx
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
  <View style={{ alignItems: 'center' }}>
    <Icon name="home" size={24} />
    <Text>Home</Text>
  </View>
  <View style={{ alignItems: 'center' }}>
    <Icon name="search" size={24} />
    <Text>Search</Text>
  </View>
  <View style={{ alignItems: 'center' }}>
    <Icon name="user" size={24} />
    <Text>Profile</Text>
  </View>
</View>
```

### Status Icons

```tsx
<View style={{ flexDirection: 'row', gap: 12 }}>
  <Icon name="checkCircle" size={20} color="#10B981" />
  <Text>Completed</Text>
</View>

<View style={{ flexDirection: 'row', gap: 12 }}>
  <Icon name="warning" size={20} color="#F59E0B" />
  <Text>Pending</Text>
</View>

<View style={{ flexDirection: 'row', gap: 12 }}>
  <Icon name="closeCircle" size={20} color="#EF4444" />
  <Text>Error</Text>
</View>
```

## Using with Lucide Directly

You can also import icons directly from `lucide-react-native`:

```tsx
import { Star, Heart, Check } from 'lucide-react-native';

<View style={{ flexDirection: 'row', gap: 16 }}>
  <Star size={24} color="#F59E0B" />
  <Heart size={24} color="#EF4444" />
  <Check size={24} color="#10B981" />
</View>;
```

## Best Practices

### ✅ Do

- Use consistent icon sizes within a context
- Choose semantically appropriate icons
- Provide accessibility labels for icon-only buttons
- Use theme colors for consistency

### ❌ Don't

- Don't mix icon styles (stick to Lucide)
- Don't use too many different icons on one screen
- Don't rely on color alone to convey meaning
- Don't use icons without labels for critical actions

## Accessibility

```tsx
<Pressable
  accessibilityLabel="Settings"
  accessibilityHint="Double tap to open settings"
>
  <Icon name="settings" size={24} />
</Pressable>

<Pressable
  accessibilityLabel="Add to favorites"
  accessibilityRole="button"
>
  <Icon name="heart" size={24} />
</Pressable>
```

## Icon Naming Convention

Icons use camelCase naming:

- `chevronDown` not `chevron-down`
- `checkCircle` not `check_circle`
- `moreHorizontal` not `more-horizontal`

## Troubleshooting

### Icon Not Showing

1. Check icon name spelling (camelCase)
2. Verify icon is in the available list above
3. Ensure size and color are valid values

### Wrong Icon Displayed

- Double-check the icon name matches the list
- Some icons have similar names (e.g., `close` vs `closeCircle`)

## Related Components

- [`Button`](./button.md) - Add icons to buttons
- [`Chip`](./chip.md) - Icons in chips
- [`Avatar`](./avatar.md) - Icons as avatars
- [`Badge`](./badge.md) - Icons with badges

## Resources

- [Lucide React Native Documentation](https://lucide.dev/)
- [Lucide Icon Search](https://lucide.dev/icons/) - Browse all available icons
