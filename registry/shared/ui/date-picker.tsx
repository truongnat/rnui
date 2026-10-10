import { useContext, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, type PressableProps } from 'react-native';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import {
  Calendar,
  type CalendarViewMode,
  type DateRange,
} from '@/components/ui/calendar';
import { Text } from '@/components/ui/text';
import { cn, FormFieldContext, useIconColor, useThemeColor } from '@/lib/utils';

export type DateFormatPattern =
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'MM/DD/YYYY'
  | 'DD-MM-YYYY'
  | 'DD.MM.YYYY'
  | (string & {})
  | ((date: Date) => string);

export function formatDate(
  date?: Date,
  fmt?: DateFormatPattern
): string {
  if (!date) return '';
  if (typeof fmt === 'function') {
    return fmt(date);
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  switch (fmt?.toUpperCase()) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'DD-MM-YYYY':
      return `${day}-${month}-${year}`;
    case 'DD.MM.YYYY':
      return `${day}.${month}.${year}`;
    default:
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
  }
}

export interface DatePickerProps
  extends Omit<PressableProps, 'children' | 'onChange'> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: DateFormatPattern;
  view?: CalendarViewMode;
  showOutsideDays?: boolean;
  /** Mirrors shadcn `aria-invalid` — destructive trigger border. Auto-detected from FormField error. */
  invalid?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  format,
  view,
  showOutsideDays = true,
  invalid,
  className,
  disabled,
  style,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const iconColor = useIconColor();
  const colors = useThemeColor();
  const field = useContext(FormFieldContext);
  const isInvalid = invalid ?? !!field?.error;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={cn(
          'h-11 flex-row items-center justify-between rounded-md border border-input bg-background px-3 active:bg-accent/40 dark:bg-input/30',
          disabled && 'opacity-50',
          className
        )}
        style={(state) => [
          { borderCurve: 'continuous' },
          isInvalid && { borderColor: colors.destructive },
          typeof style === 'function' ? style(state) : style,
        ]}
        {...props}
      >
        <Text
          className={cn(
            'text-sm',
            value ? 'text-foreground font-medium' : 'text-muted-foreground'
          )}
        >
          {value ? formatDate(value, format) : placeholder}
        </Text>
        <CalendarIcon size={16} color={iconColor} />
      </Pressable>
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setOpen(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={styles.modalCard}
          >
            <Calendar
              mode="single"
              selected={value}
              view={view}
              showOutsideDays={showOutsideDays}
              onSelect={(d) => {
                onChange?.(d);
                setOpen(false);
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

export interface DateRangePickerProps
  extends Omit<PressableProps, 'children' | 'onChange'> {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  format?: DateFormatPattern;
  view?: CalendarViewMode;
  showOutsideDays?: boolean;
  invalid?: boolean;
  className?: string;
}

/**
 * Single input trigger for selecting a start and end date span on 1 calendar.
 */
export function DateRangePicker({
  value,
  onChange,
  placeholder = 'Pick a date range',
  format,
  view,
  showOutsideDays = true,
  invalid,
  className,
  disabled,
  style,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const iconColor = useIconColor();
  const colors = useThemeColor();
  const field = useContext(FormFieldContext);
  const isInvalid = invalid ?? !!field?.error;

  const { start, end } = value ?? {};

  const displayLabel = useMemo(() => {
    if (start && end) {
      return `${formatDate(start, format)} - ${formatDate(end, format)}`;
    }
    if (start) {
      return `${formatDate(start, format)} - Select end date`;
    }
    return placeholder;
  }, [start, end, format, placeholder]);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={cn(
          'h-11 flex-row items-center justify-between rounded-md border border-input bg-background px-3 active:bg-accent/40 dark:bg-input/30',
          disabled && 'opacity-50',
          className
        )}
        style={(state) => [
          { borderCurve: 'continuous' },
          isInvalid && { borderColor: colors.destructive },
          typeof style === 'function' ? style(state) : style,
        ]}
        {...props}
      >
        <Text
          className={cn(
            'text-sm',
            start ? 'text-foreground font-medium' : 'text-muted-foreground'
          )}
        >
          {displayLabel}
        </Text>
        <CalendarIcon size={16} color={iconColor} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setOpen(false)}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={styles.modalCard}
          >
            <Calendar
              mode="range"
              selectedRange={value}
              view={view}
              showOutsideDays={showOutsideDays}
              onSelectRange={(newRange) => {
                onChange?.(newRange);
                if (newRange.start && newRange.end) {
                  setTimeout(() => setOpen(false), 200);
                }
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
  },
});
