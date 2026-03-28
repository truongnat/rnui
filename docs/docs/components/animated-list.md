---
sidebar_position: 60
---

# AnimatedList

A performant animated list component built on top of FlashList with enter/exit animations powered by Reanimated 3.

## Import

```tsx
import { AnimatedList } from "@truongdq01/ui";
```

## Usage

```tsx
import { AnimatedList } from "@truongdq01/ui";

const data = [
  { id: "1", title: "Item One" },
  { id: "2", title: "Item Two" },
  { id: "3", title: "Item Three" },
];

export function MyList() {
  return (
    <AnimatedList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ListItem title={item.title} />}
      enterAnimation="fadeSlideUp"
      exitAnimation="fadeOut"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | required | Array of items to render |
| `renderItem` | `(info: { item: T }) => ReactNode` | required | Render function for each item |
| `keyExtractor` | `(item: T) => string` | required | Key extractor function |
| `enterAnimation` | `"fadeSlideUp" \| "fadeSlideDown" \| "fadeIn" \| "scaleIn"` | `"fadeSlideUp"` | Enter animation preset |
| `exitAnimation` | `"fadeOut" \| "scaleOut" \| "slideLeft"` | `"fadeOut"` | Exit animation preset |
| `staggerDelay` | `number` | `50` | Delay between each item animation in ms |
| `estimatedItemSize` | `number` | `64` | Estimated item height for FlashList |

## Notes

- Requires `react-native-reanimated >= 3.0`
- Built on FlashList for optimal scroll performance
- Animations run on the UI thread (no JS bridge)
