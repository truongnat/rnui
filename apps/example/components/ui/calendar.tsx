import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View, type ViewProps } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

export interface DateRange {
  start?: Date;
  end?: Date;
}

export type CalendarViewMode = 'month' | 'week';

export interface CalendarProps extends ViewProps {
  /** Mode: 'single' for one date, 'range' for date span. Default: 'single'. */
  mode?: 'single' | 'range';
  /** View scale: 'month' for full month grid, 'week' for 7-day row. Default: 'month'. */
  view?: CalendarViewMode;
  onViewChange?: (view: CalendarViewMode) => void;
  /** Show a Segmented switch between Month and Week on header. Default: false. */
  showViewToggle?: boolean;
  /** Show trailing days of previous month and leading days of next month. Default: true. */
  showOutsideDays?: boolean;
  /** Currently selected date (single mode). */
  selected?: Date;
  onSelect?: (date: Date) => void;
  /** Currently selected range (range mode). */
  selectedRange?: DateRange;
  onSelectRange?: (range: DateRange) => void;
  /** Controlled visible month — any date within it. */
  month?: Date;
  onMonthChange?: (date: Date) => void;
  className?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function sameDay(a?: Date, b?: Date): boolean {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isDateInRange(d: Date, start?: Date, end?: Date): boolean {
  if (!start || !end) return false;
  const t = startOfDay(d).getTime();
  const s = startOfDay(start).getTime();
  const e = startOfDay(end).getTime();
  return t > s && t < e;
}

export function Calendar({
  mode = 'single',
  view: controlledView,
  onViewChange,
  showViewToggle = false,
  showOutsideDays = true,
  selected,
  onSelect,
  selectedRange,
  onSelectRange,
  month,
  onMonthChange,
  className,
  ...props
}: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [uncontrolledView, setUncontrolledView] =
    useState<CalendarViewMode>('month');
  const currentView = controlledView ?? uncontrolledView;

  const [innerMonth, setInnerMonth] = useState(
    month ?? selected ?? selectedRange?.start ?? today
  );
  const visible = month ?? innerMonth;

  // For week view: anchor date within the current week
  const [weekAnchor, setWeekAnchor] = useState<Date>(
    selected ?? selectedRange?.start ?? today
  );

  const iconColor = useIconColor('foreground');
  const colors = useThemeColor();

  const handleViewSwitch = (nextView: CalendarViewMode) => {
    setUncontrolledView(nextView);
    onViewChange?.(nextView);
  };

  const shiftNavigation = (delta: number) => {
    if (currentView === 'week') {
      const nextWeek = new Date(weekAnchor);
      nextWeek.setDate(nextWeek.getDate() + delta * 7);
      setWeekAnchor(nextWeek);
      // Sync visible month if week crossed month boundary
      if (nextWeek.getMonth() !== visible.getMonth()) {
        const nextMonth = new Date(
          nextWeek.getFullYear(),
          nextWeek.getMonth(),
          1
        );
        if (!month) setInnerMonth(nextMonth);
        onMonthChange?.(nextMonth);
      }
    } else {
      const nextMonth = new Date(
        visible.getFullYear(),
        visible.getMonth() + delta,
        1
      );
      if (!month) setInnerMonth(nextMonth);
      onMonthChange?.(nextMonth);
    }
  };

  // Month grid cells computation
  const monthCells = useMemo(() => {
    const year = visible.getFullYear();
    const m = visible.getMonth();
    const firstDay = new Date(year, m, 1);
    const daysInCurrentMonth = new Date(year, m + 1, 0).getDate();
    const leading = firstDay.getDay();

    const out: Date[] = [];

    // Leading days from previous month
    if (showOutsideDays) {
      const prevMonthLastDay = new Date(year, m, 0).getDate();
      for (let i = leading - 1; i >= 0; i--) {
        out.push(new Date(year, m - 1, prevMonthLastDay - i));
      }
    } else {
      for (let i = 0; i < leading; i++) {
        out.push(null as unknown as Date);
      }
    }

    // Days in current month
    for (let d = 1; d <= daysInCurrentMonth; d++) {
      out.push(new Date(year, m, d));
    }

    // Trailing days from next month
    if (showOutsideDays) {
      const totalCells = out.length;
      const trailing = (7 - (totalCells % 7)) % 7;
      for (let i = 1; i <= trailing; i++) {
        out.push(new Date(year, m + 1, i));
      }
    }

    return out;
  }, [visible, showOutsideDays]);

  // Week row cells computation (7 days)
  const weekCells = useMemo(() => {
    const anchor = startOfDay(weekAnchor);
    const dayOfWeek = anchor.getDay();
    const startOfWeek = new Date(anchor);
    startOfWeek.setDate(anchor.getDate() - dayOfWeek);

    const out: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      out.push(d);
    }
    return out;
  }, [weekAnchor]);

  const cells = currentView === 'week' ? weekCells : monthCells;

  // Header Title
  const headerTitle = useMemo(() => {
    if (currentView === 'week') {
      const first = weekCells[0];
      const last = weekCells[6];
      if (first.getMonth() === last.getMonth()) {
        return `${first.getDate()} - ${last.getDate()} ${first.toLocaleString(
          undefined,
          { month: 'short', year: 'numeric' }
        )}`;
      }
      return `${first.getDate()} ${first.toLocaleString(undefined, {
        month: 'short',
      })} - ${last.getDate()} ${last.toLocaleString(undefined, {
        month: 'short',
        year: 'numeric',
      })}`;
    }
    return visible.toLocaleString(undefined, {
      month: 'long',
      year: 'numeric',
    });
  }, [currentView, visible, weekCells]);

  const handleCellPress = (date: Date) => {
    if (!date) return;

    // Sync visible month and week anchor if user tapped outside day
    if (date.getMonth() !== visible.getMonth()) {
      const nextMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      if (!month) setInnerMonth(nextMonth);
      onMonthChange?.(nextMonth);
    }
    setWeekAnchor(date);

    if (mode === 'single') {
      onSelect?.(date);
      return;
    }

    // Range mode logic
    const { start, end } = selectedRange ?? {};
    if (!start || (start && end)) {
      onSelectRange?.({ start: date, end: undefined });
    } else {
      if (date.getTime() < start.getTime()) {
        onSelectRange?.({ start: date, end: undefined });
      } else {
        onSelectRange?.({ start, end: date });
      }
    }
  };

  return (
    <View
      className={cn(
        'w-full max-w-sm rounded-xl border border-border bg-card p-3 shadow-sm',
        className
      )}
      {...props}
    >
      {/* Header with Navigation and optional View Toggle */}
      <View className="mb-2 flex-row items-center justify-between">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            currentView === 'week' ? 'Previous week' : 'Previous month'
          }
          onPress={() => shiftNavigation(-1)}
          className="rounded-md p-1.5 active:bg-accent"
        >
          <ChevronLeft size={18} color={iconColor} />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Text className="text-sm font-semibold text-foreground">
            {headerTitle}
          </Text>

          {showViewToggle ? (
            <View
              style={[
                styles.viewToggle,
                { backgroundColor: colors.muted, borderColor: colors.border },
              ]}
            >
              <Pressable
                onPress={() => handleViewSwitch('month')}
                style={[
                  styles.toggleBtn,
                  currentView === 'month' && {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: currentView === 'month' ? '600' : '400',
                    color:
                      currentView === 'month'
                        ? colors.foreground
                        : colors.mutedForeground,
                  }}
                >
                  Month
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleViewSwitch('week')}
                style={[
                  styles.toggleBtn,
                  currentView === 'week' && {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: currentView === 'week' ? '600' : '400',
                    color:
                      currentView === 'week'
                        ? colors.foreground
                        : colors.mutedForeground,
                  }}
                >
                  Week
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            currentView === 'week' ? 'Next week' : 'Next month'
          }
          onPress={() => shiftNavigation(1)}
          className="rounded-md p-1.5 active:bg-accent"
        >
          <ChevronRight size={18} color={iconColor} />
        </Pressable>
      </View>

      {/* Weekdays Row */}
      <View className="flex-row mb-1">
        {WEEKDAYS.map((d) => (
          <View key={d} className="flex-1 items-center py-1">
            <Text className="text-xs font-semibold text-muted-foreground">
              {d}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid Days */}
      <View className="flex-row flex-wrap">
        {cells.map((date, i) => {
          if (!date) {
            // biome-ignore lint/suspicious/noArrayIndexKey: leading blanks are positional
            return <View key={`blank-${i}`} className="w-[14.285%] p-0.5" />;
          }

          const isOutside =
            currentView === 'month' &&
            date.getMonth() !== visible.getMonth();

          const isSingleSelected =
            mode === 'single' && selected && sameDay(date, selected);

          const isRangeStart =
            mode === 'range' &&
            selectedRange?.start &&
            sameDay(date, selectedRange.start);

          const isRangeEnd =
            mode === 'range' &&
            selectedRange?.end &&
            sameDay(date, selectedRange.end);

          const isEndpoint = isSingleSelected || isRangeStart || isRangeEnd;

          const inBetween =
            mode === 'range' &&
            isDateInRange(date, selectedRange?.start, selectedRange?.end);

          const isToday = sameDay(date, today);

          return (
            <View key={date.getTime()} className="w-[14.285%] p-0.5">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={date.toDateString()}
                accessibilityState={{ selected: !!isEndpoint }}
                onPress={() => handleCellPress(date)}
                className={cn(
                  'aspect-square items-center justify-center rounded-lg',
                  isEndpoint && 'bg-primary',
                  inBetween && 'bg-accent rounded-none',
                  isRangeStart && selectedRange?.end && 'rounded-r-none',
                  isRangeEnd && 'rounded-l-none',
                  !isEndpoint && !inBetween && isToday && 'border border-border',
                  !isEndpoint && !inBetween && 'active:bg-accent'
                )}
              >
                <Text
                  className={cn(
                    'text-sm',
                    isEndpoint
                      ? 'text-primary-foreground font-semibold'
                      : inBetween
                        ? 'text-accent-foreground font-medium'
                        : isOutside
                          ? 'text-muted-foreground/35 font-normal'
                          : isToday
                            ? 'text-foreground font-bold'
                            : 'text-foreground font-medium'
                  )}
                >
                  {date.getDate()}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewToggle: {
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 2,
    marginLeft: 6,
  },
  toggleBtn: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
  },
});
