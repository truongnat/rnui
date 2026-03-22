---
sidebar_position: 22
---

# Box

A versatile container component with MUI-style `sx` prop for rapid styling.

## Usage

```tsx
import { Box } from "@rnui/ui";

<Box style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
  <Text>Content</Text>
</Box>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Container content |
| `style` | `StyleProp<ViewStyle>` | — | Inline styles |
| `sx` | `ViewStyle` | — | MUI-style prop for quick styling |
| `flex` | `number` | — | Flex grow/shrink value |
| `testID` | `string` | — | Test identifier |

All `ViewProps` from React Native are supported.

## Examples

### Basic Container

```tsx
<Box style={{ padding: 16 }}>
  <Typography variant="body1">Box content</Typography>
</Box>
```

### With SX Prop

```tsx
<Box
  sx={{
    padding: 4,
    backgroundColor: 'brand.default',
    borderRadius: 3,
    marginVertical: 2,
  }}
>
  <Text style={{ color: 'white' }}>Styled with sx prop</Text>
</Box>
```

### Flex Container

```tsx
<Box
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  <Text>Left</Text>
  <Text>Right</Text>
</Box>
```

### Flex Item

```tsx
<Box flex={1}>
  <Text>This box takes available space</Text>
</Box>
```

### Card-like Container

```tsx
<Box
  style={{
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }}
>
  <Typography variant="h6" gutterBottom>Card Title</Typography>
  <Typography variant="body2">Card content goes here.</Typography>
</Box>
```

## Use Cases

### Layout Wrapper

```tsx
<Box style={{ flex: 1, padding: 16 }}>
  <AppBar title="My App" />
  <Box style={{ flex: 1 }}>
    {/* Main content */}
  </Box>
  <BottomNavigation />
</Box>
```

### Spacing Element

```tsx
<Box style={{ height: 16 }} /> {/* Spacer */}

<Box style={{ flex: 1 }} /> {/* Flexible spacer */}
```

### Row Layout

```tsx
<Box style={{ flexDirection: 'row', gap: 8 }}>
  <Avatar src="..." />
  <Box style={{ flex: 1 }}>
    <Typography variant="subtitle1">User Name</Typography>
    <Typography variant="caption">user@example.com</Typography>
  </Box>
  <Icon name="chevronRight" />
</Box>
```

### Centered Content

```tsx
<Box
  style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <Icon name="loading" size={48} />
  <Typography variant="body2" style={{ marginTop: 16 }}>
    Loading...
  </Typography>
</Box>
```

## Best Practices

### ✅ Do
- Use for layout containers and spacing
- Combine with `sx` for quick prototyping
- Use semantic components when possible (Card, Paper)
- Keep styling consistent with theme tokens

### ❌ Don't
- Don't overuse for simple View containers
- Don't nest too deeply (consider Grid or Flex)
- Don't use for complex styling (create custom component)

## Related Components

- [`Stack`](./stack.md) - Vertical/horizontal stacking
- [`Grid`](./grid.md) - Grid-based layouts
- [`Paper`](./paper.md) - Elevated container
- [`Card`](./card.md) - Pre-styled content card
