import { useTheme } from '@truongdq01/headless';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { CalendarGrid } from '../DatePicker';
import {
  addMonths,
  compareDay,
  endOfMonth,
  startOfMonth,
} from '../DatePicker/calendarUtils';
import type { CalendarProps, CalendarRangeValue } from './types';

function buildNextRange(
  current: CalendarRangeValue,
  nextDate: Date
): CalendarRangeValue {
  const { start, end } = current;

  if (!start || end) {
    return { start: nextDate, end: null };
  }

  if (compareDay(nextDate, start) < 0) {
    return { start: nextDate, end: start };
  }

  return { start, end: nextDate };
}

function isMonthBeforeMin(monthDate: Date, minimumDate?: Date): boolean {
  if (!minimumDate) return false;
  return compareDay(endOfMonth(monthDate), minimumDate) < 0;
}

function isMonthAfterMax(monthDate: Date, maximumDate?: Date): boolean {
  if (!maximumDate) return false;
  return compareDay(startOfMonth(monthDate), maximumDate) > 0;
}

export function Calendar({
  selectionMode = 'single',
  value = null,
  range = { start: null, end: null },
  onChange,
  onRangeChange,
  minimumDate,
  maximumDate,
  dateConstraints,
  onUnavailableDatePress,
  initialMonth,
  numberOfMonths = 1,
  locale,
  style,
  testID,
}: CalendarProps) {
  const { tokens } = useTheme();
  const { width } = useWindowDimensions();

  const referenceDate = useMemo(() => {
    if (selectionMode === 'range') {
      return range.start ?? range.end ?? initialMonth ?? new Date();
    }

    return value ?? initialMonth ?? new Date();
  }, [initialMonth, range.end, range.start, selectionMode, value]);

  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(referenceDate)
  );

  useEffect(() => {
    setVisibleMonth((current) => {
      const next = startOfMonth(referenceDate);
      if (
        current.getFullYear() === next.getFullYear() &&
        current.getMonth() === next.getMonth()
      ) {
        return current;
      }
      return next;
    });
  }, [referenceDate]);

  const months = useMemo(
    () =>
      Array.from({ length: numberOfMonths }, (_, index) =>
        addMonths(visibleMonth, index)
      ),
    [numberOfMonths, visibleMonth]
  );

  const canGoPrev = !isMonthBeforeMin(addMonths(visibleMonth, -1), minimumDate);
  const canGoNext = !isMonthAfterMax(
    addMonths(visibleMonth, numberOfMonths),
    maximumDate
  );
  const layoutDirection =
    numberOfMonths === 2 && width >= 720 ? 'row' : 'column';

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          gap: tokens.spacing[4],
        },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: layoutDirection,
          gap: tokens.spacing[4],
        }}
      >
        {months.map((monthDate, index) => (
          <View key={monthDate.toISOString()} style={styles.monthPanel}>
            <CalendarGrid
              month={monthDate.getMonth()}
              year={monthDate.getFullYear()}
              selectedDate={selectionMode === 'single' ? value : null}
              selectionMode={selectionMode}
              selectedRangeStart={
                selectionMode === 'range' ? range.start : null
              }
              selectedRangeEnd={selectionMode === 'range' ? range.end : null}
              onSelectDate={(nextDate) => {
                if (selectionMode === 'range') {
                  onRangeChange?.(buildNextRange(range, nextDate));
                  return;
                }

                onChange?.(nextDate);
              }}
              onMonthChange={(month, year) =>
                setVisibleMonth(new Date(year, month, 1))
              }
              onPreviousMonth={() =>
                setVisibleMonth((current) => addMonths(current, -1))
              }
              onNextMonth={() =>
                setVisibleMonth((current) => addMonths(current, 1))
              }
              hidePreviousNavigation={index > 0}
              hideNextNavigation={index < months.length - 1}
              disablePreviousNavigation={!canGoPrev}
              disableNextNavigation={!canGoNext}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              dateConstraints={dateConstraints}
              onUnavailableDatePress={onUnavailableDatePress}
              locale={locale}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  monthPanel: {
    flex: 1,
    minWidth: 0,
  },
});
