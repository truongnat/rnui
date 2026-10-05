import { useState } from 'react';
import {
  Modal,
  Pressable,
  useColorScheme,
  type PressableProps,
} from 'react-native';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import { Calendar } from '@/components/ui/calendar';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface DatePickerProps
  extends Omit<PressableProps, 'children' | 'onChange'> {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: (date: Date) => string;
  className?: string;
}

const defaultFormat = (d: Date) =>
  d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pick a date',
  format = defaultFormat,
  className,
  disabled,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const iconColor = useColorScheme() === 'dark' ? '#a8a29e' : '#78716c';

  return (
    <>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={cn(
          'h-11 flex-row items-center justify-between rounded-md border border-input bg-background px-3',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <Text
          className={cn(
            'text-sm',
            value ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {value ? format(value) : placeholder}
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
          className="flex-1 items-center justify-center bg-black/50 p-6"
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Calendar
              selected={value}
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
