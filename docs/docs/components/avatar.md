# Avatar

The `Avatar` component displays a user image, initials, or a fallback icon. Use `AvatarGroup` to show multiple users with overlap.

## Usage

```tsx
import { Avatar, AvatarGroup } from "@truongdq01/ui";

<Avatar initials="AN" />
<Avatar src="https://i.pravatar.cc/150?img=1" size="lg" status="online" />

<AvatarGroup
  size="md"
  avatars={[
    { initials: "AN" },
    { initials: "BT" },
    { initials: "CL" },
    { initials: "DP" },
  ]}
/>
```

## Avatar Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | - | Image URI |
| `initials` | `string` | - | Fallback initials if no image |
| `fallbackIcon` | `ReactNode` | - | Custom fallback icon when no image or initials |
| `size` | `"xs" | "sm" | "md" | "lg" | "xl"` | `"md"` | Avatar size preset |
| `status` | `"online" | "offline" | "busy" | "away"` | - | Optional status dot |
| `shape` | `"circle" | "rounded"` | `"circle"` | Avatar shape |
| `accessibilityLabel` | `string` | - | Accessibility label |

## AvatarGroup Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `avatars` | `AvatarProps[]` | - | List of avatars to render |
| `max` | `number` | `4` | Max visible avatars before overflow |
| `size` | `"xs" | "sm" | "md" | "lg" | "xl"` | `"md"` | Size for all avatars |
| `overlap` | `number` | - | Custom overlap spacing |
