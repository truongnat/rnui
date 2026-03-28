---
sidebar_position: 25
---

# Chip

Chips are compact elements that represent an input, attribute, or action. They can display icons, avatars, and delete actions.

## Usage

```tsx
import { Chip } from "@truongdq01/ui";

<Chip label="React Native" variant="solid" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | **Required.** Chip text content |
| `variant` | `"solid" \| "outlined" \| "subtle"` | `"solid"` | Visual style variant |
| `color` | `"default" \| "primary" \| "secondary" \| "error" \| "info" \| "success" \| "warning"` | `"default"` | Semantic color |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height and padding |
| `avatar` | `ReactNode` | — | Avatar element (left side) |
| `icon` | `ReactNode` | — | Icon element (left side) |
| `deleteIcon` | `ReactNode` | — | Custom delete icon |
| `onDelete` | `() => void` | — | Callback when delete pressed |
| `onClick` | `() => void` | — | Callback when chip pressed |
| `disabled` | `boolean` | `false` | Disable interactions |
| `clickable` | `boolean` | `false` | Enable click behavior |

## Variants

```tsx
<Chip label="Solid" variant="solid" />
<Chip label="Outlined" variant="outlined" />
<Chip label="Subtle" variant="subtle" />
```

## Colors

```tsx
<Chip label="Default" color="default" />
<Chip label="Primary" color="primary" />
<Chip label="Secondary" color="secondary" />
<Chip label="Success" color="success" />
<Chip label="Error" color="error" />
<Chip label="Info" color="info" />
<Chip label="Warning" color="warning" />
```

## Sizes

```tsx
<Chip label="Small" size="sm" />
<Chip label="Medium" size="md" />
<Chip label="Large" size="lg" />
```

## With Avatar

```tsx
import { Avatar } from "@truongdq01/ui";

<Chip
  label="John Doe"
  avatar={<Avatar src="https://example.com/avatar.jpg" size="sm" />}
/>
```

## With Icon

```tsx
import { Star, Heart } from "lucide-react-native";

<Chip label="Favorite" icon={<Star size={16} />} />
<Chip label="Liked" icon={<Heart size={16} />} color="error" />
```

## Deletable Chip

```tsx
function DeletableChip() {
  const [visible, setVisible] = React.useState(true);
  
  return visible ? (
    <Chip
      label="Dismissible"
      onDelete={() => setVisible(false)}
    />
  ) : null;
}
```

## Clickable Chip

```tsx
<Chip
  label="Filter: Active"
  clickable
  onClick={() => setFilter(filter === "active" ? "all" : "active")}
/>
```

## Use Cases

### Tags / Labels

```tsx
<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Chip label="React" size="sm" />
  <Chip label="TypeScript" size="sm" />
  <Chip label="React Native" size="sm" />
  <Chip label="UI/UX" size="sm" />
</View>
```

### Filters

```tsx
const [activeFilter, setActiveFilter] = useState("all");

<View style={{ flexDirection: 'row', gap: 8 }}>
  <Chip
    label="All"
    variant={activeFilter === "all" ? "solid" : "outlined"}
    onClick={() => setActiveFilter("all")}
  />
  <Chip
    label="Active"
    variant={activeFilter === "active" ? "solid" : "outlined"}
    onClick={() => setActiveFilter("active")}
  />
  <Chip
    label="Completed"
    variant={activeFilter === "completed" ? "solid" : "outlined"}
    onClick={() => setActiveFilter("completed")}
  />
</View>
```

### Status Indicators

```tsx
<Chip label="Online" color="success" size="sm" />
<Chip label="Away" color="warning" size="sm" />
<Chip label="Offline" color="default" size="sm" />
```

## Best Practices

### ✅ Do
- Use for tags, filters, and status indicators
- Keep labels concise (1-3 words)
- Use appropriate colors for semantic meaning
- Provide delete functionality for removable items

### ❌ Don't
- Don't use for long text (use badges or labels instead)
- Don't use too many chips in a row (consider wrapping)
- Don't mix too many colors (stick to semantic meaning)

## Accessibility

```tsx
<Chip
  label="Filter applied"
  accessibilityLabel="Filter: Active projects"
  accessibilityHint="Double tap to remove filter"
/>
```

## Related Components

- [`Badge`](./badge.md) - Simple status indicator
- [`Avatar`](./avatar.md) - User image for chips
- [`Icon`](./icon.md) - Icons for chips
- [`Button`](./button.md) - For actions instead of chips
