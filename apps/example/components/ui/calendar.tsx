import { useMemo, useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Animated, {
  FadeIn,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';

export interface DateRange {
  start?: Date;
  end?: Date;
}
export type CalendarViewMode = 'month' | 'week';
export interface CalendarProps extends ViewProps {
  mode?: 'single' | 'range';
  view?: CalendarViewMode;
  onViewChange?: (view: CalendarViewMode) => void;
  showViewToggle?: boolean;
  showOutsideDays?: boolean;
  selected?: Date;
  onSelect?: (date: Date) => void;
  selectedRange?: DateRange;
  onSelectRange?: (range: DateRange) => void;
  month?: Date;
  onMonthChange?: (date: Date) => void;
  className?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
function startOfDay(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
}
function sameDay(a?: Date, b?: Date): boolean {
  return !!a && !!b && startOfDay(a) === startOfDay(b);
}

export function Calendar({
  mode = 'single',
  view,
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
  const [innerView, setInnerView] = useState<CalendarViewMode>('month');
  const currentView = view ?? innerView;
  const [innerMonth, setInnerMonth] = useState(
    month ?? selected ?? selectedRange?.start ?? today
  );
  const visible = month ?? innerMonth;
  const [weekAnchor, setWeekAnchor] = useState(
    month ?? selected ?? selectedRange?.start ?? today
  );
  const displayedWeek =
    month &&
    (month.getFullYear() !== weekAnchor.getFullYear() ||
      month.getMonth() !== weekAnchor.getMonth())
      ? month
      : weekAnchor;
  const colors = useThemeColor();
  const iconColor = useIconColor('foreground');

  const changeMonth = (date: Date) => {
    if (!month) setInnerMonth(date);
    onMonthChange?.(date);
  };
  const switchView = (next: CalendarViewMode) => {
    if (next === 'week') {
      const candidate = selected ?? selectedRange?.start;
      setWeekAnchor(
        candidate &&
          candidate.getMonth() === visible.getMonth() &&
          candidate.getFullYear() === visible.getFullYear()
          ? candidate
          : visible
      );
    }
    setInnerView(next);
    onViewChange?.(next);
  };
  const navigate = (delta: number) => {
    if (currentView === 'week') {
      const next = new Date(displayedWeek);
      next.setDate(next.getDate() + delta * 7);
      setWeekAnchor(next);
      if (
        next.getMonth() !== visible.getMonth() ||
        next.getFullYear() !== visible.getFullYear()
      ) {
        changeMonth(new Date(next.getFullYear(), next.getMonth(), 1));
      }
    } else {
      const next = new Date(
        visible.getFullYear(),
        visible.getMonth() + delta,
        1
      );
      changeMonth(next);
      setWeekAnchor(next);
    }
  };
  const weeks = useMemo(() => {
    const anchor = currentView === 'week' ? displayedWeek : visible;
    const year = anchor.getFullYear();
    const m = anchor.getMonth();
    const offset =
      currentView === 'week' ? anchor.getDay() : new Date(year, m, 1).getDay();
    const firstDay =
      currentView === 'week' ? anchor.getDate() - offset : 1 - offset;
    const count =
      currentView === 'week'
        ? 7
        : Math.ceil((offset + new Date(year, m + 1, 0).getDate()) / 7) * 7;
    const result: Date[][] = [];
    for (let row = 0; row < count; row += 7) {
      const week: Date[] = [];
      for (let day = 0; day < 7; day++) {
        week.push(new Date(year, m, firstDay + row + day));
      }
      result.push(week);
    }
    return result;
  }, [currentView, visible, displayedWeek]);
  const headerTitle =
    currentView === 'week'
      ? `${new Date(displayedWeek.getFullYear(), displayedWeek.getMonth(), displayedWeek.getDate() - displayedWeek.getDay()).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} – ${new Date(displayedWeek.getFullYear(), displayedWeek.getMonth(), displayedWeek.getDate() - displayedWeek.getDay() + 6).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}`
      : visible.toLocaleDateString(undefined, {
          month: 'long',
          year: 'numeric',
        });
  const selectDate = (date: Date) => {
    if (
      date.getMonth() !== visible.getMonth() ||
      date.getFullYear() !== visible.getFullYear()
    ) {
      changeMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
    setWeekAnchor(date);
    if (mode === 'single') {
      onSelect?.(date);
    } else {
      const { start, end } = selectedRange ?? {};
      onSelectRange?.(
        !start || end || startOfDay(date) < startOfDay(start)
          ? { start: date }
          : { start, end: date }
      );
    }
  };

  return (
    <View
      className={cn(
        'w-full rounded-xl border border-border bg-card p-3',
        className
      )}
      {...props}
    >
      <View className="mb-2 flex-row items-center gap-2">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Previous ${currentView}`}
          onPress={() => navigate(-1)}
          className="h-14 w-14 items-center justify-center rounded-lg active:opacity-60"
        >
          <ChevronLeft size={20} color={iconColor} />
        </Pressable>
        <Text
          accessibilityRole="header"
          accessibilityLiveRegion="polite"
          className="min-w-0 flex-1 text-center text-base font-semibold leading-6"
        >
          {headerTitle}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Next ${currentView}`}
          onPress={() => navigate(1)}
          className="h-14 w-14 items-center justify-center rounded-lg active:opacity-60"
        >
          <ChevronRight size={20} color={iconColor} />
        </Pressable>
      </View>
      {showViewToggle ? (
        <View className="mb-3 flex-row rounded-lg bg-muted p-1">
          {(['month', 'week'] as const).map((option) => (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: currentView === option }}
              onPress={() => switchView(option)}
              className="min-h-14 flex-1 items-center justify-center rounded-md px-3 py-2 active:opacity-70"
              style={{
                backgroundColor:
                  currentView === option ? colors.card : 'transparent',
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{
                  color:
                    currentView === option
                      ? colors.foreground
                      : colors.mutedForeground,
                }}
              >
                {option === 'month' ? 'Month' : 'Week'}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      <View className="mb-1 flex-row">
        {WEEKDAYS.map((day) => (
          <View key={day} className="min-w-0 flex-1 items-center py-2">
            <Text className="text-sm font-medium text-muted-foreground">
              {day}
            </Text>
          </View>
        ))}
      </View>
      <Animated.View
        key={`${currentView}-${headerTitle}`}
        entering={FadeIn.duration(160).reduceMotion(ReduceMotion.System)}
        layout={LinearTransition.duration(200).reduceMotion(
          ReduceMotion.System
        )}
      >
        {weeks.map((week) => (
          <View key={week[0]?.getTime()} className="flex-row">
            {week.map((date, column) => {
              const outside =
                currentView === 'month' &&
                date.getMonth() !== visible.getMonth();
              if (outside && !showOutsideDays)
                return (
                  <View
                    key={date.getTime()}
                    className="min-h-14 min-w-0 flex-1 py-0.5"
                  />
                );
              const start =
                mode === 'range' && sameDay(date, selectedRange?.start);
              const end = mode === 'range' && sameDay(date, selectedRange?.end);
              const endpoint =
                mode === 'single' ? sameDay(date, selected) : start || end;
              const between =
                mode === 'range' &&
                selectedRange?.start &&
                selectedRange.end &&
                startOfDay(date) > startOfDay(selectedRange.start) &&
                startOfDay(date) < startOfDay(selectedRange.end);
              const joinsPrevious =
                !!selectedRange?.start &&
                !start &&
                (end || !!between) &&
                column > 0 &&
                (showOutsideDays ||
                  currentView === 'week' ||
                  week[column - 1]?.getMonth() === visible.getMonth());
              const joinsNext =
                !!selectedRange?.end &&
                !end &&
                (start || !!between) &&
                column < 6 &&
                (showOutsideDays ||
                  currentView === 'week' ||
                  week[column + 1]?.getMonth() === visible.getMonth());
              const isToday = sameDay(date, today);
              return (
                <View key={date.getTime()} className="min-w-0 flex-1 py-0.5">
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${date.toDateString()}${isToday ? ', today' : ''}${start ? ', range start' : end ? ', range end' : ''}`}
                    accessibilityState={{ selected: endpoint || !!between }}
                    onPress={() => selectDate(date)}
                    className={cn(
                      'min-h-14 items-center justify-center rounded-lg py-2 active:opacity-70',
                      joinsPrevious && 'rounded-l-none',
                      joinsNext && 'rounded-r-none'
                    )}
                    style={{
                      backgroundColor: endpoint
                        ? colors.primary
                        : between
                          ? colors.accent
                          : 'transparent',
                      borderWidth: !endpoint && !between && isToday ? 1 : 0,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      className="text-sm leading-5"
                      style={{
                        color: endpoint
                          ? colors.primaryForeground
                          : outside
                            ? colors.mutedForeground
                            : colors.foreground,
                        fontWeight: endpoint || isToday ? '600' : '400',
                      }}
                    >
                      {date.getDate()}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}
