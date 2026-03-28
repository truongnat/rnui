# List

High-performance list built on FlashList, with optional swipe actions and section headers.

## Usage

```tsx
import { List, ListItem, SectionHeader } from "@truongdq01/ui";
import { Mail, ChevronRight } from "lucide-react-native";

const items = [
  { id: "1", title: "Inbox", subtitle: "5 unread" },
  { id: "2", title: "Archive", subtitle: "Updated yesterday" },
];

<SectionHeader title="Today" />
<List
  data={items}
  keyExtractor={(item) => item.id}
  estimatedItemSize={64}
  renderItem={(item, index) => (
    <ListItem
      title={item.title}
      subtitle={item.subtitle}
      leading={<Mail />}
      trailing={<ChevronRight />}
      showSeparator={index < items.length - 1}
    />
  )}
/>
```

## List Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `T[]` | -- | Array of items |
| `renderItem` | `(item: T, index: number) => ReactElement` | -- | Render each row |
| `estimatedItemSize` | `number` | `60` | FlashList estimate for perf |
| `separator` | `boolean` | `false` | Render simple separators |
| `emptyComponent` | `ReactElement` | -- | Render when data is empty |
| `isLoading` | `boolean` | `false` | Show skeleton rows |
| `loadingCount` | `number` | `5` | Skeleton row count |

`List` also accepts all `FlashList` props (e.g. `contentContainerStyle`, `refreshing`, `onEndReached`).

## ListItem Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | -- | Primary text |
| `subtitle` | `string` | -- | Secondary text |
| `leading` | `ReactNode` | -- | Leading icon or element |
| `trailing` | `ReactNode` | -- | Trailing icon or element |
| `onPress` | `() => void` | -- | Row press handler |
| `onLongPress` | `() => void` | -- | Long press handler |
| `leadingActions` | `SwipeAction[]` | `[]` | Swipe-right actions |
| `trailingActions` | `SwipeAction[]` | `[]` | Swipe-left actions |
| `disabled` | `boolean` | `false` | Disable interaction |
| `showSeparator` | `boolean` | `true` | Show bottom separator |

`SwipeAction` shape:

- `label: string`
- `color: string`
- `textColor?: string`
- `onPress: () => void`

## Swipe Actions

```tsx
<ListItem
  title="Delete me"
  trailingActions={[
    { label: "Delete", color: "#F44336", onPress: () => {} },
  ]}
/>
```
