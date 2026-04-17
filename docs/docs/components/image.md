---
sidebar_position: 30
---

# Image

The `Image` component provides a performant image loading experience with built-in placeholder effects and smooth fade-in animations powered by Reanimated 3.

## Usage

```tsx
import { Image } from '@truongdq01/ui';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  showPlaceholder
/>;
```

## Props

| Prop                 | Type                                                        | Default   | Description                                          |
| -------------------- | ----------------------------------------------------------- | --------- | ---------------------------------------------------- |
| `source`             | `ImageSourcePropType`                                       | —         | **Required.** Image source (URI, require, or bundle) |
| `showPlaceholder`    | `boolean`                                                   | `true`    | Show skeleton loading effect while fetching          |
| `style`              | `StyleProp<ImageStyle>`                                     | —         | Container and image style                            |
| `onLoad`             | `(e: ImageLoadEventData) => void`                           | —         | Callback when image loads successfully               |
| `onError`            | `(e: ImageErrorEventData) => void`                          | —         | Callback when image fails to load                    |
| `resizeMode`         | `"cover" \| "contain" \| "stretch" \| "repeat" \| "center"` | `"cover"` | How to resize the image                              |
| `accessibilityLabel` | `string`                                                    | —         | Alt text for screen readers                          |
| `accessibilityHint`  | `string`                                                    | —         | Additional screen reader context                     |
| `testID`             | `string`                                                    | —         | Test identifier for automation                       |

All other props from React Native's [`ImageProps`](https://reactnative.dev/docs/image#props) are supported.

## Examples

### Basic Image

```tsx
<Image
  source={{ uri: 'https://picsum.photos/400/300' }}
  style={{ width: 400, height: 300 }}
/>
```

### With Placeholder Disabled

```tsx
<Image
  source={{ uri: 'https://picsum.photos/400/300' }}
  style={{ width: 400, height: 300 }}
  showPlaceholder={false}
/>
```

### Circular Avatar

```tsx
<Image
  source={{ uri: 'https://example.com/avatar.jpg' }}
  style={{ width: 80, height: 80, borderRadius: 40 }}
/>
```

### Responsive Image

```tsx
<Image
  source={{ uri: 'https://example.com/hero.jpg' }}
  style={{ width: '100%', height: 200 }}
  resizeMode="cover"
/>
```

### With Error Handling

```tsx
<Image
  source={{ uri: 'https://invalid-url.com/image.jpg' }}
  style={{ width: 200, height: 200 }}
  onError={(e) => console.log('Image failed to load', e.nativeEvent.error)}
/>
```

## Features

### ✨ Automatic Fade-In

Images smoothly fade in over 300ms when loaded, creating a polished user experience.

### 🦴 Skeleton Placeholder

When `showPlaceholder` is enabled (default), a skeleton effect shows while the image is fetching.

### ⚡ Performance Optimized

- Uses Reanimated 3 for 60fps animations
- Animations run on the UI thread
- No jank or frame drops

## Best Practices

### Always Provide Accessibility Labels

```tsx
<Image
  source={{ uri: product.image }}
  style={{ width: 200, height: 200 }}
  accessibilityLabel={`Product: ${product.name}`}
  accessibilityHint="Tap to view product details"
/>
```

### Use Appropriate Resize Modes

| Use Case               | Resize Mode       |
| ---------------------- | ----------------- |
| Product cards, avatars | `cover` (default) |
| Full image display     | `contain`         |
| Background patterns    | `repeat`          |
| Thumbnails             | `cover`           |

### Optimize Image Sources

```tsx
// ✅ Good: Use appropriately sized images
<Image
  source={{ uri: "https://example.com/image-400x300.jpg" }}
  style={{ width: 200, height: 150 }}
/>

// ❌ Avoid: Loading large images for small displays
<Image
  source={{ uri: "https://example.com/image-2000x1500.jpg" }}
  style={{ width: 200, height: 150 }}
/>
```

## Troubleshooting

### Image Not Showing

1. Check that `source` is properly formatted
2. Verify the image URL is accessible
3. Ensure width and height are set (or parent has dimensions)
4. Check `onError` callback for loading failures

### Placeholder Not Working

- Ensure `showPlaceholder` is `true` (default)
- Check that the image is actually loading (network request)
- Verify the component has a defined size

## Related Components

- [`Avatar`](./avatar.md) - Pre-styled circular image with fallback
- [`ImageList`](./image-list.md) - Grid layout for multiple images
- [`Card`](./card.md) - Container component that often wraps images
- [`Skeleton`](./skeleton.md) - Manual loading placeholder
