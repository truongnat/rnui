---
sidebar_position: 23
---

# Stack

A layout component for arranging items vertically or horizontally with consistent spacing.

## Usage

```tsx
import { Stack } from "@rnui/ui";

<Stack direction="vertical" gap={16}>
  <Button label="Item 1" />
  <Button label="Item 2" />
  <Button label="Item 3" />
</Stack>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Stack items |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Arrangement direction |
| `gap` | `number` | `8` | Spacing between items |
| `align` | `"flex-start" \| "center" \| "flex-end" \| "stretch"` | — | Cross-axis alignment |
| `justify` | `"flex-start" \| "center" \| "flex-end" \| "space-between"` | — | Main-axis alignment |
| `wrap` | `boolean` | `false` | Wrap items to next line |
| `style` | `StyleProp<ViewStyle>` | — | Additional container styles |

## Examples

### Vertical Stack (Default)

```tsx
<Stack gap={16}>
  <Input label="Name" />
  <Input label="Email" />
  <Button label="Submit" />
</Stack>
```

### Horizontal Stack

```tsx
<Stack direction="horizontal" gap={12}>
  <Button label="Cancel" variant="outline" />
  <Button label="Save" />
</Stack>
```

### Centered Stack

```tsx
<Stack 
  direction="horizontal" 
  gap={16}
  justify="center"
  align="center"
>
  <Icon name="star" />
  <Icon name="heart" />
  <Icon name="check" />
</Stack>
```

### Space Between

```tsx
<Stack 
  direction="horizontal"
  justify="space-between"
  align="center"
>
  <Typography variant="body2">Items: 3</Typography>
  <Button label="View All" size="sm" />
</Stack>
```

### Wrapped Stack

```tsx
<Stack 
  direction="horizontal" 
  gap={8}
  wrap
>
  {tags.map(tag => (
    <Chip key={tag} label={tag} size="sm" />
  ))}
</Stack>
```

## Use Cases

### Form Layout

```tsx
<Stack gap={20}>
  <Stack gap={12}>
    <Input label="First Name" />
    <Input label="Last Name" />
  </Stack>
  
  <Input label="Email" />
  
  <Stack direction="horizontal" gap={12}>
    <Button label="Cancel" variant="outline" style={{ flex: 1 }} />
    <Button label="Submit" style={{ flex: 1 }} />
  </Stack>
</Stack>
```

### Card Actions

```tsx
<Card>
  <CardContent>
    <Typography variant="h6">Card Title</Typography>
    <Typography variant="body2">Card description</Typography>
  </CardContent>
  
  <Stack direction="horizontal" gap={8} style={{ padding: 16, borderTopWidth: 1 }}>
    <Button label="Cancel" variant="ghost" />
    <Button label="Confirm" />
  </Stack>
</Card>
```

### Toolbar

```tsx
<Stack 
  direction="horizontal" 
  justify="space-between"
  align="center"
  style={{ paddingVertical: 12 }}
>
  <Typography variant="h6">Title</Typography>
  <Stack direction="horizontal" gap={8}>
    <IconButton icon={<Icon name="search" />} />
    <IconButton icon={<Icon name="moreVertical" />} />
  </Stack>
</Stack>
```

### Badge List

```tsx
<Stack direction="horizontal" gap={8} wrap>
  <Badge label="React" />
  <Badge label="TypeScript" />
  <Badge label="React Native" />
  <Badge label="UI/UX" />
  <Badge label="Mobile" />
</Stack>
```

## Gap Values

Use consistent spacing from the theme:

```tsx
<Stack gap={4}>  {/* 4px - Tight */}
<Stack gap={8}>  {/* 8px - Default */}
<Stack gap={12}> {/* 12px - Comfortable */}
<Stack gap={16}> {/* 16px - Spacious */}
<Stack gap={24}> {/* 24px - Section gap */}
```

## Responsive Stack

```tsx
function ResponsiveStack({ children }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 640;
  
  return (
    <Stack 
      direction={isMobile ? "vertical" : "horizontal"}
      gap={isMobile ? 12 : 16}
      justify={isMobile ? "stretch" : "space-between"}
    >
      {children}
    </Stack>
  );
}
```

## Best Practices

### ✅ Do
- Use for consistent spacing between items
- Choose direction based on content flow
- Use appropriate gap values from theme
- Combine with flex for responsive layouts

### ❌ Don't
- Don't use for complex grid layouts (use Grid)
- Don't nest stacks too deeply
- Don't mix with manual margins on children

## Accessibility

Stack is a layout primitive and doesn't require special ARIA attributes. Ensure child elements have proper accessibility props.

## Related Components

- [`Box`](./box.md) - General purpose container
- [`Grid`](./grid.md) - Grid-based layouts
- [`Divider`](./divider.md) - Visual separators
- [`Card`](./card.md) - Content containers
