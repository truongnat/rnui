---
title: Carousel
sidebar_position: 61
---

# Carousel

A swipeable carousel component with gesture support, auto-play, and customizable pagination indicators.

## Import

```tsx
import { Carousel } from '@truongdq01/ui';
```

## Usage

```tsx
import { Carousel } from '@truongdq01/ui';

const slides = [
  { id: '1', image: require('./slide1.png'), title: 'Slide One' },
  { id: '2', image: require('./slide2.png'), title: 'Slide Two' },
  { id: '3', image: require('./slide3.png'), title: 'Slide Three' },
];

export function MyCarousel() {
  return (
    <Carousel
      data={slides}
      renderItem={({ item }) => (
        <Image source={item.image} style={{ width: '100%', height: 200 }} />
      )}
      autoPlay
      autoPlayInterval={3000}
      showPagination
    />
  );
}
```

## Props

| Prop               | Type                                              | Default  | Description                      |
| ------------------ | ------------------------------------------------- | -------- | -------------------------------- |
| `data`             | `T[]`                                             | required | Array of slide data              |
| `renderItem`       | `(info: { item: T, index: number }) => ReactNode` | required | Render function for each slide   |
| `autoPlay`         | `boolean`                                         | `false`  | Auto-advance slides              |
| `autoPlayInterval` | `number`                                          | `3000`   | Interval in ms between slides    |
| `showPagination`   | `boolean`                                         | `true`   | Show pagination dots             |
| `loop`             | `boolean`                                         | `true`   | Loop back to first slide         |
| `onIndexChange`    | `(index: number) => void`                         | —        | Called when active index changes |
| `paginationStyle`  | `"dots" \| "bar" \| "numbers"`                    | `"dots"` | Pagination indicator style       |

## Notes

- Built with `react-native-gesture-handler` for native swipe gestures
- Runs on UI thread for 60fps animations
