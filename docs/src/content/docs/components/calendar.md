---
title: Calendar
---

# Calendar

`Calendar` exposes RNUI's standalone month-grid picker for booking flows, schedule planners, date filters, and any UI where users need surrounding dates for context.

## Usage

```tsx
import { Calendar } from '@truongdq01/ui';
import { useState } from 'react';

export function BookingCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());

  return <Calendar value={date} onChange={setDate} />;
}
```

## Props

| Prop                     | Type                                         | Default      | Description                                               |
| ------------------------ | -------------------------------------------- | ------------ | --------------------------------------------------------- |
| `selectionMode`          | `"single" \| "range"`                        | `"single"`   | Choose one day or a start/end range                       |
| `value`                  | `Date \| null`                               | `null`       | Controlled selected date in single mode                   |
| `range`                  | `{ start: Date \| null; end: Date \| null }` | empty range  | Controlled selected range in range mode                   |
| `onChange`               | `(date: Date \| null) => void`               | —            | Called when a single date is selected                     |
| `onRangeChange`          | `(range) => void`                            | —            | Called when range selection changes                       |
| `minimumDate`            | `Date`                                       | —            | Earliest selectable day                                   |
| `maximumDate`            | `Date`                                       | —            | Latest selectable day                                     |
| `dateConstraints`        | `(date) => boolean \| { disabled, reason? }` | —            | Disable custom dates such as weekends or blackout periods |
| `onUnavailableDatePress` | `(date, reason?) => void`                    | —            | Optional callback when users tap an unavailable day       |
| `initialMonth`           | `Date`                                       | today        | Month shown before a controlled selection exists          |
| `numberOfMonths`         | `1 \| 2`                                     | `1`          | Show one or two visible months                            |
| `locale`                 | `string`                                     | runtime      | Locale for month title and weekday labels                 |

## Examples

### Single date

```tsx
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  minimumDate={new Date()}
/>
```

### Range selection

```tsx
<Calendar
  selectionMode="range"
  range={travelDates}
  onRangeChange={setTravelDates}
/>
```

### Constraints

```tsx
<Calendar
  dateConstraints={(date) =>
    date.getDay() === 0 || date.getDay() === 6
      ? { disabled: true, reason: 'Weekends are unavailable' }
      : false
  }
  onUnavailableDatePress={(_, reason) => {
    if (reason) {
      console.log(reason);
    }
  }}
/>
```

### Two visible months

```tsx
<Calendar
  selectionMode="range"
  range={travelDates}
  onRangeChange={setTravelDates}
  numberOfMonths={2}
/>
```

## Best Practices

- Use `minimumDate` and `maximumDate` to keep bookings or reports inside a valid window.
- Use `selectionMode="range"` when the user needs a start and end date together.
- Return a `reason` from `dateConstraints` for dates users may try to tap.
- Prefer text input or `DatePicker` for far-past dates such as birth dates.

## Related Components

- [`DatePicker`](./date-picker.md)
- [`Icon Button`](./icon-button.mdx)
- [`Tooltip`](./tooltip.md)
