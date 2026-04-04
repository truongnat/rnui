import { useState, useCallback, useMemo } from 'react';

export interface DatePickerPreset {
  label: string;
  value: () => Date;
}

export interface UseDatePickerOptions {
  defaultDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  presets?: DatePickerPreset[];
  mode?: 'date' | 'time' | 'datetime';
  range?: boolean;
  onDateChange?: (date: Date | [Date, Date] | null) => void;
}

export interface UseDatePickerReturn {
  selectedDate: Date | null;
  selectedRange: [Date, Date] | null;
  displayDate: Date;
  setSelectedDate: (date: Date | null) => void;
  setSelectedRange: (range: [Date, Date] | null) => void;
  setDisplayDate: (date: Date) => void;
  applyPreset: (preset: DatePickerPreset) => void;
  clear: () => void;
  isDateDisabled: (date: Date) => boolean;
  monthDays: Date[];
  currentMonth: number;
  currentYear: number;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  goToMonth: (month: number, year: number) => void;
}

const DEFAULT_PRESETS: DatePickerPreset[] = [
  { label: 'Today', value: () => new Date() },
  {
    label: 'Last 7 days',
    value: () => {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      return d;
    },
  },
  {
    label: 'Last 30 days',
    value: () => {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      return d;
    },
  },
  {
    label: 'Last 90 days',
    value: () => {
      const d = new Date();
      d.setDate(d.getDate() - 90);
      return d;
    },
  },
];

export function useDatePicker(
  options: UseDatePickerOptions = {}
): UseDatePickerReturn {
  const {
    defaultDate,
    minDate,
    maxDate,
    presets = DEFAULT_PRESETS,
    mode = 'date',
    range = false,
    onDateChange,
  } = options;

  const [selectedDate, setSelectedDateState] = useState<Date | null>(
    defaultDate || null
  );
  const [selectedRange, setSelectedRangeState] = useState<[Date, Date] | null>(
    null
  );
  const [displayDate, setDisplayDate] = useState<Date>(
    defaultDate || new Date()
  );

  const setSelectedDate = useCallback(
    (date: Date | null) => {
      setSelectedDateState(date);
      if (date) setDisplayDate(date);
      onDateChange?.(date);
    },
    [onDateChange]
  );

  const setSelectedRange = useCallback(
    (rangeVal: [Date, Date] | null) => {
      setSelectedRangeState(rangeVal);
      if (rangeVal) setDisplayDate(rangeVal[0]);
      onDateChange?.(rangeVal);
    },
    [onDateChange]
  );

  const applyPreset = useCallback(
    (preset: DatePickerPreset) => {
      const date = preset.value();
      if (range) {
        const end = new Date();
        setSelectedRange([date, end]);
      } else {
        setSelectedDate(date);
      }
    },
    [range, setSelectedDate, setSelectedRange]
  );

  const clear = useCallback(() => {
    if (range) {
      setSelectedRange(null);
    } else {
      setSelectedDate(null);
    }
  }, [range, setSelectedDate, setSelectedRange]);

  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    },
    [minDate, maxDate]
  );

  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();

  const monthDays = useMemo(() => {
    const days: Date[] = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Add previous month's trailing days to fill first week
    const firstDayOfWeek = firstDay.getDay();
    const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Monday start

    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth, -i);
      days.push(d);
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }

    // Add next month's leading days to fill last week
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(currentYear, currentMonth + 1, i));
    }

    return days;
  }, [currentMonth, currentYear]);

  const goToPreviousMonth = useCallback(() => {
    setDisplayDate(new Date(currentYear, currentMonth - 1, 1));
  }, [currentYear, currentMonth]);

  const goToNextMonth = useCallback(() => {
    setDisplayDate(new Date(currentYear, currentMonth + 1, 1));
  }, [currentYear, currentMonth]);

  const goToMonth = useCallback((month: number, year: number) => {
    setDisplayDate(new Date(year, month, 1));
  }, []);

  return {
    selectedDate,
    selectedRange,
    displayDate,
    setSelectedDate,
    setSelectedRange,
    setDisplayDate,
    applyPreset,
    clear,
    isDateDisabled,
    monthDays,
    currentMonth,
    currentYear,
    goToPreviousMonth,
    goToNextMonth,
    goToMonth,
  };
}
