---
sidebar_position: 64
---

# SegmentedControl

A horizontal segmented control for mutually exclusive option selection. Commonly used for tabs, filters, or view toggles.

## Import

```tsx
import { SegmentedControl } from "@rnui/ui";
```

## Usage

```tsx
import { SegmentedControl } from "@rnui/ui";
import { useState } from "react";

export function ViewToggle() {
  const [selected, setSelected] = useState(0);

  return (
    <SegmentedControl
      values={["Day", "Week", "Month"]}
      selectedIndex={selected}
      onChange={setSelected}
    />
  );
}
```

## With icons

```tsx
<SegmentedControl
  segments={[
    { label: "List", icon: "list" },
    { label: "Grid", icon: "grid" },
    { label: "Map", icon: "map" },
  ]}
  selectedIndex={selected}
  onChange={setSelected}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `values` | `string[]` | — | Simple string labels for each segment |
| `segments` | `{ label: string; icon?: string }[]` | — | Rich segment definitions with icons |
| `selectedIndex` | `number` | required | Currently selected segment index |
| `onChange` | `(index: number) => void` | required | Called when selection changes |
| `disabled` | `boolean` | `false` | Disable all segments |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Control size |
| `colorScheme` | `string` | `"brand"` | Active segment color |
| `style` | `ViewStyle` | — | Container style override |
