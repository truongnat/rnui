---
sidebar_position: 62
---

# DatePicker

A fully customizable date picker with calendar view, range selection, and theme support.

## Import

```tsx
import { DatePicker } from '@truongdq01/ui';
```

## Usage

### Single date

```tsx
import { DatePicker } from '@truongdq01/ui';
import { useState } from 'react';

export function MyDatePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker value={date} onChange={setDate} placeholder="Select a date" />
  );
}
```

### Date range

```tsx
import { DatePicker } from '@truongdq01/ui';
import { useState } from 'react';

export function MyRangePicker() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <DatePicker
      mode="range"
      startDate={range.start}
      endDate={range.end}
      onRangeChange={setRange}
    />
  );
}
```

## Props

| Prop          | Type                                | Default         | Description                  |
| ------------- | ----------------------------------- | --------------- | ---------------------------- |
| `value`       | `Date \| null`                      | —               | Selected date (single mode)  |
| `onChange`    | `(date: Date) => void`              | —               | Called when date is selected |
| `mode`        | `"single" \| "range" \| "multiple"` | `"single"`      | Selection mode               |
| `minDate`     | `Date`                              | —               | Minimum selectable date      |
| `maxDate`     | `Date`                              | —               | Maximum selectable date      |
| `placeholder` | `string`                            | `"Select date"` | Input placeholder text       |
| `format`      | `string`                            | `"MM/DD/YYYY"`  | Date display format          |
| `disabled`    | `boolean`                           | `false`         | Disable the picker           |
| `locale`      | `string`                            | `"en-US"`       | Locale for month/day names   |
