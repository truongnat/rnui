import { createContext, useContext } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

interface RadioGroupContextValue {
  value: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: '',
});

export interface RadioGroupProps extends ViewProps {
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  value = '',
  onValueChange,
  className,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <View
        accessibilityRole="radiogroup"
        className={cn('gap-3', className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends Omit<PressableProps, 'children'> {
  value: string;
  /** Mirrors shadcn `aria-invalid` — destructive border. Auto-detected from FormField error. */
  invalid?: boolean;
  className?: string;
}

export function RadioGroupItem({
  value,
  invalid,
  className,
  disabled,
  style,
  ...props
}: RadioGroupItemProps) {
  const group = useContext(RadioGroupContext);
  const field = useContext(FormFieldContext);
  const colors = useThemeColor();
  const checked = group.value === value;
  const isInvalid = invalid ?? !!field?.error;

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => group.onValueChange?.(value)}
      className={cn(
        'h-5 w-5 items-center justify-center rounded-full border border-input bg-background dark:bg-input/30',
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
      {checked && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </Pressable>
  );
}
