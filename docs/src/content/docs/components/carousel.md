---
title: Carousel
sidebar_position: 61
---

# Carousel

A swipeable content strip for featured cards, media, and step-through content. RNUI `Carousel` defaults to snap scrolling, edge fades, and navigation controls so the interaction remains obvious on touch devices.

## Import

```tsx
import { Carousel } from '@truongdq01/ui';
```

## Usage

```tsx
import { Carousel } from '@truongdq01/ui';

const slides = [
  { id: '1', title: 'Slide One' },
  { id: '2', title: 'Slide Two' },
  { id: '3', title: 'Slide Three' },
];

export function MyCarousel() {
  return (
    <Carousel
      data={slides}
      accessibilityLabel="Featured stories"
      renderItem={(item) => <MySlideCard title={item.title} />}
    />
  );
}
```

## Props

| Prop                | Type                                 | Default  | Description                                                 |
| ------------------- | ------------------------------------ | -------- | ----------------------------------------------------------- |
| `data`              | `T[]`                                | required | Array of slide data                                         |
| `renderItem`        | `(item: T, index: number) => ReactNode` | required | Render function for each slide                           |
| `accessibilityLabel`| `string`                             | —        | Describe the carousel content for screen readers            |
| `itemWidth`         | `number`                             | viewport | Width of each slide                                         |
| `gap`               | `number`                             | `0`      | Space between slides                                        |
| `height`            | `number`                             | `200`    | Carousel viewport height (ignored when `autoHeight`)        |
| `autoHeight`        | `boolean`                            | `false`  | Size the viewport to the tallest slide (for variable-length text). Avoid percentage heights inside slides. |
| `showPagination`    | `boolean`                            | `true`   | Show pagination dots                                        |
| `showNavigation`    | `boolean`                            | `true`   | Show previous and next icon buttons                         |
| `fadeEdges`         | `boolean`                            | `true`   | Gradient edge fades (auto-hidden in full-bleed / paged mode) |
| `edgeColor`         | `string`                             | surface  | Color the edge fades blend into (match the parent background) |
| `snap`              | `boolean`                            | `true`   | Enable snap offsets for slide-by-slide paging               |
| `loop`              | `boolean`                            | `false`  | Loop back to the first slide                                |
| `onIndexChange`     | `(index: number) => void`            | —        | Called when the active slide changes after momentum stops   |
| `autoPlay`          | `boolean`                            | `false`  | Auto-advance slides. Available for compatibility, discouraged by default |
| `autoPlayInterval`  | `number`                             | `3000`   | Interval in ms when `autoPlay` is enabled                   |
| `keyExtractor`      | `(item: T, index: number) => string` | index  | Stable React key per slide                                  |
| `accessibilityHint` | `string`                             | —        | Extra context for assistive technologies                    |

## Patterns

### Featured cards

```tsx
<Carousel
  data={stories}
  accessibilityLabel="Featured stories"
  renderItem={(story) => <StoryCard story={story} />}
/>
```

### Continuous content rail

```tsx
<Carousel
  data={products}
  accessibilityLabel="Recommended products"
  itemWidth={280}
  gap={16}
  snap={false}
  showPagination={false}
  renderItem={(product) => <ProductCard product={product} />}
/>
```

## Best Practices

- Always provide `accessibilityLabel` because the carousel itself is an interactive region.
- Keep snap enabled for hero or step-by-step content where one slide should be read at a time.
- Turn snap off for lighter horizontal rails that behave more like scannable lists.
- For a card rail, set `itemWidth` smaller than the viewport so the next card peeks and slides snap to center.
- Navigation buttons and edge fades auto-hide at the first and last slide (opacity only — layout never shifts).
- Set `edgeColor` to match the surface behind the carousel so fades blend seamlessly.
- Pagination dots are tappable; users can jump straight to a slide.
- Use `autoPlay` sparingly. Astryx guidance prefers user-controlled movement by default.
