import { useTokens } from '@truongdq01/headless';
import { useCallback, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import type {
  CalendarDateConstraint,
  CalendarSelectionMode,
} from '../Calendar/types';
import { Icon } from '../Icon';
import {
  getCalendarConstraintInfo,
  isDateInRange,
  isSameDay,
  isToday,
} from './calendarUtils';

export interface CalendarGridProps {
  month: number;
  year: number;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onMonthChange: (month: number, year: number) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  selectionMode?: CalendarSelectionMode;
  selectedRangeStart?: Date | null;
  selectedRangeEnd?: Date | null;
  dateConstraints?: CalendarDateConstraint;
  onUnavailableDatePress?: (date: Date, reason?: string) => void;
  /** BCP 47 locale for month title and weekday labels (default `undefined` = runtime default). */
  locale?: string;
  /** Tap the month name in the header (e.g. open month picker). */
  onMonthTitlePress?: () => void;
  /** Tap the year number in the header (e.g. open year picker). */
  onYearTitlePress?: () => void;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
  hidePreviousNavigation?: boolean;
  hideNextNavigation?: boolean;
  disablePreviousNavigation?: boolean;
  disableNextNavigation?: boolean;
}

export function CalendarGrid({
  month,
  year,
  selectedDate,
  onSelectDate,
  onMonthChange,
  minimumDate,
  maximumDate,
  selectionMode = 'single',
  selectedRangeStart,
  selectedRangeEnd,
  dateConstraints,
  onUnavailableDatePress,
  locale,
  onMonthTitlePress,
  onYearTitlePress,
  onPreviousMonth,
  onNextMonth,
  hidePreviousNavigation = false,
  hideNextNavigation = false,
  disablePreviousNavigation = false,
  disableNextNavigation = false,
}: CalendarGridProps) {
  const t = useTokens();

  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const baseMonday = new Date(2024, 0, 8);
    return Array.from({ length: 7 }, (_, i) =>
      formatter.format(
        new Date(
          baseMonday.getFullYear(),
          baseMonday.getMonth(),
          baseMonday.getDate() + i
        )
      )
    );
  }, [locale]);

  const monthLabelOnly = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { month: 'long' }).format(
        new Date(year, month, 1)
      ),
    [locale, month, year]
  );

  const yearLabelOnly = useMemo(() => String(year), [year]);

  const goPrev = useCallback(() => {
    if (disablePreviousNavigation) return;
    if (onPreviousMonth) {
      onPreviousMonth();
      return;
    }
    if (month === 0) {
      onMonthChange(11, year - 1);
      return;
    }
    onMonthChange(month - 1, year);
  }, [disablePreviousNavigation, month, onMonthChange, onPreviousMonth, year]);

  const goNext = useCallback(() => {
    if (disableNextNavigation) return;
    if (onNextMonth) {
      onNextMonth();
      return;
    }
    if (month === 11) {
      onMonthChange(0, year + 1);
      return;
    }
    onMonthChange(month + 1, year);
  }, [disableNextNavigation, month, onMonthChange, onNextMonth, year]);

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    let startWeekday = firstDay.getDay() - 1;
    if (startWeekday < 0) startWeekday = 6;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const rows: { date: Date; inMonth: boolean }[][] = [];
    let row: { date: Date; inMonth: boolean }[] = [];

    for (let i = 0; i < startWeekday; i++) {
      const day = daysInPrevMonth - startWeekday + 1 + i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      row.push({ date: new Date(prevYear, prevMonth, day), inMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      row.push({ date: new Date(year, month, day), inMonth: true });
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }
    }

    if (row.length > 0) {
      let nextDay = 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      while (row.length < 7) {
        row.push({
          date: new Date(nextYear, nextMonth, nextDay),
          inMonth: false,
        });
        nextDay += 1;
      }
      rows.push(row);
    }

    return rows;
  }, [month, year]);

  const cellSize = 40;

  const monthTitleStyle = {
    fontSize: t.fontSize.lg,
    fontWeight: t.fontWeight.semibold,
    color: t.color.text.primary,
  } as const;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 4,
          marginBottom: t.spacing[3],
        }}
      >
        <Pressable
          onPress={goPrev}
          disabled={hidePreviousNavigation || disablePreviousNavigation}
          hitSlop={12}
          accessibilityLabel="Previous month"
          accessibilityRole="button"
          accessibilityState={{
            disabled: hidePreviousNavigation || disablePreviousNavigation,
          }}
          style={{ opacity: hidePreviousNavigation ? 0 : 1 }}
        >
          <Icon name="chevronLeft" size={22} color={t.color.text.secondary} />
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexShrink: 1,
            gap: t.spacing[1],
          }}
        >
          {onMonthTitlePress ? (
            <Pressable
              onPress={onMonthTitlePress}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Choose month"
            >
              <Text style={monthTitleStyle}>{monthLabelOnly}</Text>
            </Pressable>
          ) : (
            <Text style={monthTitleStyle}>{monthLabelOnly}</Text>
          )}

          {onYearTitlePress ? (
            <Pressable
              onPress={onYearTitlePress}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Choose year"
            >
              <Text style={monthTitleStyle}>{yearLabelOnly}</Text>
            </Pressable>
          ) : (
            <Text style={monthTitleStyle}>{yearLabelOnly}</Text>
          )}
        </View>

        <Pressable
          onPress={goNext}
          disabled={hideNextNavigation || disableNextNavigation}
          hitSlop={12}
          accessibilityLabel="Next month"
          accessibilityRole="button"
          accessibilityState={{
            disabled: hideNextNavigation || disableNextNavigation,
          }}
          style={{ opacity: hideNextNavigation ? 0 : 1 }}
        >
          <Icon name="chevronRight" size={22} color={t.color.text.secondary} />
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {weekdayLabels.map((weekday) => (
          <View
            key={weekday}
            style={{
              flex: 1,
              alignItems: 'center',
              paddingBottom: t.spacing[2],
            }}
          >
            <Text
              style={{
                fontSize: t.fontSize.xs,
                fontWeight: t.fontWeight.medium,
                color: t.color.text.tertiary,
              }}
            >
              {weekday}
            </Text>
          </View>
        ))}
      </View>

      {cells.map((row) => (
        <View key={row[0].date.toISOString()} style={{ flexDirection: 'row' }}>
          {row.map((cell) => {
            const constraint = getCalendarConstraintInfo(
              cell.date,
              minimumDate,
              maximumDate,
              dateConstraints
            );
            const selected =
              selectionMode === 'single' && selectedDate != null
                ? isSameDay(cell.date, selectedDate)
                : false;
            const rangeStart =
              selectedRangeStart != null &&
              isSameDay(cell.date, selectedRangeStart);
            const rangeEnd =
              selectedRangeEnd != null &&
              isSameDay(cell.date, selectedRangeEnd);
            const inRange =
              selectionMode === 'range' &&
              isDateInRange(
                cell.date,
                selectedRangeStart ?? null,
                selectedRangeEnd ?? null
              );
            const activeSelection = selected || rangeStart || rangeEnd;
            const today = isToday(cell.date);
            const disabled = !cell.inMonth || constraint.disabled;
            const dayTextColor = activeSelection
              ? t.color.text.inverse
              : disabled
                ? t.color.text.disabled
                : cell.inMonth
                  ? t.color.text.primary
                  : t.color.text.tertiary;

            return (
              <Pressable
                key={cell.date.toISOString()}
                onPress={() => {
                  if (disabled) {
                    onUnavailableDatePress?.(cell.date, constraint.reason);
                    return;
                  }
                  onSelectDate(cell.date);
                }}
                accessibilityRole="button"
                accessibilityLabel={cell.date.toDateString()}
                accessibilityHint={constraint.reason}
                accessibilityState={{
                  selected: activeSelection,
                  disabled,
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: cellSize,
                }}
              >
                <View
                  style={{
                    width: '100%',
                    height: cellSize,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 4,
                      bottom: 4,
                      backgroundColor:
                        cell.inMonth && inRange
                          ? t.color.brand.subtle
                          : 'transparent',
                      borderTopLeftRadius: rangeStart ? 18 : 0,
                      borderBottomLeftRadius: rangeStart ? 18 : 0,
                      borderTopRightRadius: rangeEnd ? 18 : 0,
                      borderBottomRightRadius: rangeEnd ? 18 : 0,
                    }}
                  />

                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: activeSelection
                        ? t.color.brand.default
                        : 'transparent',
                      borderWidth: today && !activeSelection ? 1.5 : 0,
                      borderColor:
                        today && !activeSelection
                          ? t.color.brand.default
                          : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: t.fontSize.sm,
                        fontWeight:
                          activeSelection || today
                            ? t.fontWeight.semibold
                            : t.fontWeight.regular,
                        color: dayTextColor,
                      }}
                    >
                      {cell.date.getDate()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
