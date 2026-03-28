# Skeleton

Skeletons provide loading placeholders with optional shimmer.

## Usage

```tsx
import { Skeleton, SkeletonText, SkeletonCard, SkeletonListItem } from "@truongdq01/ui";

<Skeleton width="100%" height={16} />
<SkeletonText lines={3} />
<SkeletonCard />
<SkeletonListItem />
```

## Skeleton Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `number \| string` | `"100%"` | Width of the skeleton block |
| `height` | `number` | `16` | Height of the skeleton block |
| `borderRadius` | `number` | - | Override corner radius |
| `animate` | `boolean` | `true` | Enable shimmer animation |

## SkeletonText Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `lines` | `number` | `3` | Number of lines |
| `lastLineWidth` | `string` | `"60%"` | Width of the last line |
