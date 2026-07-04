---
title: DatePicker
sidebar_position: 62
---

# DatePicker

Cross-platform date picker with calendar, spinner/native styles, date, time, and datetime modes.

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
    <DatePicker date={date} onChange={setDate} placeholder="Select a date" />
  );
}
```

### Date time

```tsx
import { DatePicker } from '@truongdq01/ui';
import { useState } from 'react';

export function MyDateTimePicker() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <DatePicker
      date={date}
      onChange={setDate}
      mode="datetime"
      minuteInterval={15}
    />
  );
}
```

## Props

| Prop          | Type                                | Default         | Description                  |
| ------------- | ----------------------------------- | --------------- | ---------------------------- |
| Prop          | Type                                | Default         | Description                    |
| ------------- | ----------------------------------- | --------------- | ------------------------------ |
| `date`        | `Date \| null`                      | —               | Selected date                  |
| `onChange`    | `(date: Date \| null) => void`      | —               | Called when selection changes  |
| `mode`        | `"date" \| "time" \| "datetime"`    | `"date"`        | Picker mode                    |
| `minimumDate` | `Date`                              | —               | Minimum selectable date        |
| `maximumDate` | `Date`                              | —               | Maximum selectable date        |
| `placeholder` | `string`                            | `"Select date"` | Input placeholder text         |
| `pickerStyle` | `"calendar" \| "spinner" \| "native"` | `"calendar"`    | Calendar sheet or native style |
| `locale`      | `string`                            | —               | Locale for month/day names     |

For form-style wrappers, prefer [`DateInput`](./date-input.md), [`DateRangeInput`](./date-range-input.md), or [`DateTimeInput`](./date-time-input.md).
