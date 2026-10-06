import { createContext, useContext } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { cn } from '@/lib/utils';

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
  className?: string;
}

export function RadioGroupItem({
  value,
  className,
  disabled,
  ...props
}: RadioGroupItemProps) {
  const group = useContext(RadioGroupContext);
  const checked = group.value === value;

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => group.onValueChange?.(value)}
      className={cn(
        'h-5 w-5 items-center justify-center rounded-full border border-primary',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {checked && <View className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </Pressable>
  );
}
