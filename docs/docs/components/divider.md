# Divider

Dividers separate content vertically or horizontally, with optional label text.

## Usage

```tsx
import { Divider } from "@rnui/ui";

<Divider />
<Divider label="OR" />
<Divider orientation="vertical" />
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | - | Centered label for horizontal divider |
| `orientation` | `"horizontal" | "vertical"` | `"horizontal"` | Divider direction |
| `emphasis` | `boolean` | `false` | Stronger border color |
| `spacing` | `"none" | "sm" | "md" | "lg"` | `"md"` | Vertical spacing for horizontal divider |
