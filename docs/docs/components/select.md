# Select

Bottom-sheet select with optional search and multi-select.

## Usage

```tsx
import { Select } from "@rnui/ui";

const options = [
  { label: "React Native", value: "rn" },
  { label: "Flutter", value: "flutter" },
  { label: "Native", value: "native" },
];

<Select
  label="Framework"
  options={options}
  value={"rn"}
  onChange={(val) => console.log(val)}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | -- | Field label |
| `placeholder` | `string` | `"Select..."` | Placeholder text |
| `searchable` | `boolean` | `false` | Enable search input |
| `error` | `string` | -- | Error message |
| `options` | `SelectOption[]` | -- | Option list |
| `value` | `T | T[]` | -- | Controlled value |
| `defaultValue` | `T | T[]` | -- | Uncontrolled default value |
| `onChange` | `(value: T | T[]) => void` | -- | Selection change |
| `multiple` | `boolean` | `false` | Allow multi-select |
| `disabled` | `boolean` | `false` | Disable interaction |

## Searchable

```tsx
<Select
  label="Country"
  searchable
  options={[
    { label: "Vietnam", value: "vn" },
    { label: "Japan", value: "jp" },
    { label: "Singapore", value: "sg" },
  ]}
/>
```

## Multiple

```tsx
const [tags, setTags] = useState<string[]>(["design"]);

<Select
  label="Tags"
  multiple
  value={tags}
  onChange={(val) => setTags(val as string[])}
  options={[
    { label: "Design", value: "design" },
    { label: "Engineering", value: "engineering" },
    { label: "Docs", value: "docs" },
  ]}
/>
```
