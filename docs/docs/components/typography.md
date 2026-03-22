---
sidebar_position: 15
---

# Typography

Typography component for consistent text styling with predefined variants.

## Usage

```tsx
import { Typography } from "@rnui/ui";

<Typography variant="h1">Heading 1</Typography>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Text content |
| `variant` | `TypographyVariant` | `"body1"` | Text style variant |
| `align` | `"left" \| "right" \| "center" \| "justify" \| "inherit"` | `"left"` | Text alignment |
| `color` | `"primary" \| "secondary" \| "tertiary" \| "disabled" \| "brand" \| "error" \| string` | `"primary"` | Text color |
| `gutterBottom` | `boolean` | `false` | Add margin bottom |
| `noWrap` | `boolean` | `false` | Truncate to single line |
| `paragraph` | `boolean` | `false` | Add paragraph margin |
| `display` | `"none" \| "flex" \| "contents" \| "block" \| "inline" \| "inline-flex"` | — | CSS display property |
| `style` | `TextStyle` | — | Additional inline styles |

## Variants

### Headings

```tsx
<Typography variant="h1">Heading 1 - 2.5rem / 32px</Typography>
<Typography variant="h2">Heading 2 - 2rem / 28px</Typography>
<Typography variant="h3">Heading 3 - 1.75rem / 24px</Typography>
<Typography variant="h4">Heading 4 - 1.5rem / 20px</Typography>
<Typography variant="h5">Heading 5 - 1.25rem / 18px</Typography>
<Typography variant="h6">Heading 6 - 1rem / 16px</Typography>
```

### Subtitles

```tsx
<Typography variant="subtitle1">Subtitle 1 - 1rem / 16px, Medium weight</Typography>
<Typography variant="subtitle2">Subtitle 2 - 0.875rem / 14px, Medium weight</Typography>
```

### Body Text

```tsx
<Typography variant="body1">Body 1 - 1rem / 16px, Regular weight (default)</Typography>
<Typography variant="body2">Body 2 - 0.875rem / 14px, Regular weight</Typography>
```

### Special

```tsx
<Typography variant="caption">Caption - 0.75rem / 12px, Regular weight</Typography>
<Typography variant="button">Button - 0.875rem / 14px, Medium weight</Typography>
<Typography variant="overline">Overline - 0.75rem / 12px, Uppercase</Typography>
<Typography variant="inherit">Inherit - Inherits parent styles</Typography>
```

## Alignment

```tsx
<Typography align="left">Left aligned text</Typography>
<Typography align="center">Center aligned text</Typography>
<Typography align="right">Right aligned text</Typography>
<Typography align="justify">Justified text</Typography>
```

## Colors

```tsx
<Typography color="primary">Primary text color</Typography>
<Typography color="secondary">Secondary text color</Typography>
<Typography color="tertiary">Tertiary text color</Typography>
<Typography color="disabled">Disabled text color</Typography>
<Typography color="brand">Brand color</Typography>
<Typography color="error">Error color</Typography>
<Typography color="#FF5733">Custom hex color</Typography>
```

## Text Truncation

```tsx
// Single line with ellipsis
<Typography noWrap>
  This is a very long text that will be truncated with an ellipsis if it exceeds the container width
</Typography>
```

## Spacing

```tsx
// Add margin bottom
<Typography gutterBottom>Text with bottom margin</Typography>

// Paragraph spacing
<Typography paragraph>First paragraph</Typography>
<Typography paragraph>Second paragraph</Typography>
```

## Display Property

```tsx
<Typography display="block">Block level text</Typography>
<Typography display="inline">Inline text</Typography>
<Typography display="inline-flex">Inline flex container</Typography>
```

## Common Patterns

### Page Title

```tsx
<Typography variant="h1" align="center" gutterBottom>
  Welcome to RNUI
</Typography>
<Typography variant="subtitle1" align="center" color="secondary">
  A beautiful UI component library
</Typography>
```

### Card Content

```tsx
<Card>
  <Typography variant="h6" gutterBottom>Card Title</Typography>
  <Typography variant="body2" color="secondary">
    Card description text goes here.
  </Typography>
</Card>
```

### Form Label

```tsx
<Typography variant="subtitle2" gutterBottom>
  Email Address
</Typography>
<Input placeholder="name@example.com" />
```

### Error Message

```tsx
<Typography variant="caption" color="error">
  Please enter a valid email address
</Typography>
```

### Caption / Helper Text

```tsx
<Input label="Password" />
<Typography variant="caption" color="tertiary">
  Must be at least 8 characters
</Typography>
```

## Best Practices

### ✅ Do
- Use semantic heading hierarchy (h1 → h2 → h3)
- Keep body text at readable size (16px minimum)
- Use appropriate line height for readability
- Maintain color contrast for accessibility

### ❌ Don't
- Don't skip heading levels (h1 → h3)
- Don't use tiny text (< 12px)
- Don't use low contrast colors for body text
- Don't use too many font variants on one page

## Accessibility

```tsx
<Typography 
  variant="h2" 
  accessibilityRole="header"
  accessibilityLevel={2}
>
  Section Title
</Typography>

<Typography 
  variant="body1"
  accessibilityRole="text"
>
  Descriptive text content
</Typography>
```

## Typography Scale Reference

| Variant | Font Size | Line Height | Weight | Use Case |
|---------|-----------|-------------|--------|----------|
| h1 | 2.5rem (40px) | 1.2 | 700 | Page titles |
| h2 | 2rem (32px) | 1.2 | 600 | Section headers |
| h3 | 1.75rem (28px) | 1.3 | 600 | Subsections |
| h4 | 1.5rem (24px) | 1.3 | 600 | Card titles |
| h5 | 1.25rem (20px) | 1.4 | 600 | Group headers |
| h6 | 1rem (16px) | 1.4 | 600 | Item headers |
| subtitle1 | 1rem (16px) | 1.5 | 500 | Secondary headings |
| subtitle2 | 0.875rem (14px) | 1.5 | 500 | Small subtitles |
| body1 | 1rem (16px) | 1.6 | 400 | Body text (default) |
| body2 | 0.875rem (14px) | 1.6 | 400 | Secondary body |
| caption | 0.75rem (12px) | 1.5 | 400 | Captions, hints |
| button | 0.875rem (14px) | 1.5 | 500 | Button text |
| overline | 0.75rem (12px) | 1.5 | 500 | Labels, overlines |

## Related Components

- [`Text`](https://reactnative.dev/docs/text) - React Native Text component
- [`Icon`](./icon.md) - Icons to pair with text
- [`Link`](./link.md) - Clickable text links
