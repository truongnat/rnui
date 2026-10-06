import { useMemo, useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export interface CalendarProps extends ViewProps {
  /** Currently selected day (1-31) of the visible month. */
  selected?: Date;
  onSelect?: (date: Date) => void;
  /** Controlled visible month — any date within it. */
  month?: Date;
  onMonthChange?: (date: Date) => void;
  className?: string;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function Calendar({
  selected,
  onSelect,
  month,
  onMonthChange,
  className,
  ...props
}: CalendarProps) {
  const today = useMemo(() => new Date(), []);
  const [innerMonth, setInnerMonth] = useState(month ?? selected ?? today);
  const visible = month ?? innerMonth;
  const iconColor = useIconColor('foreground');

  const shiftMonth = (delta: number) => {
    const next = new Date(visible.getFullYear(), visible.getMonth() + delta, 1);
    if (!month) setInnerMonth(next);
    onMonthChange?.(next);
  };

  const cells = useMemo(() => {
    const first = new Date(visible.getFullYear(), visible.getMonth(), 1);
    const daysInMonth = new Date(
      visible.getFullYear(),
      visible.getMonth() + 1,
      0
    ).getDate();
    const leading = first.getDay();
    const out: (Date | null)[] = Array.from({ length: leading }, () => null);
    for (let d = 1; d <= daysInMonth; d++) {
      out.push(new Date(visible.getFullYear(), visible.getMonth(), d));
    }
    return out;
  }, [visible]);

  const monthLabel = visible.toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View
      className={cn(
        'w-full max-w-sm rounded-md border border-border bg-card p-3',
        className
      )}
      {...props}
    >
      <View className="mb-2 flex-row items-center justify-between">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous month"
          onPress={() => shiftMonth(-1)}
          className="rounded-md p-1.5 active:bg-accent"
        >
          <ChevronLeft size={18} color={iconColor} />
        </Pressable>
        <Text className="text-sm font-medium text-foreground">
          {monthLabel}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next month"
          onPress={() => shiftMonth(1)}
          className="rounded-md p-1.5 active:bg-accent"
        >
          <ChevronRight size={18} color={iconColor} />
        </Pressable>
      </View>
      <View className="flex-row">
        {WEEKDAYS.map((d) => (
          <View key={d} className="flex-1 items-center py-1">
            <Text className="text-xs text-muted-foreground">{d}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {cells.map((date, i) => {
          if (!date) {
            // biome-ignore lint/suspicious/noArrayIndexKey: leading blanks are positional
            return <View key={i} className="w-[14.285%] p-0.5" />;
          }
          const isSelected = selected && sameDay(date, selected);
          const isToday = sameDay(date, today);
          return (
            <View key={date.getTime()} className="w-[14.285%] p-0.5">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={date.toDateString()}
                accessibilityState={{ selected: !!isSelected }}
                onPress={() => onSelect?.(date)}
                className={cn(
                  'aspect-square items-center justify-center rounded-md',
                  isSelected && 'bg-primary',
                  !isSelected && isToday && 'border border-border',
                  !isSelected && 'active:bg-accent'
                )}
              >
                <Text
                  className={cn(
                    'text-sm',
                    isSelected
                      ? 'font-medium text-primary-foreground'
                      : 'text-foreground'
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
