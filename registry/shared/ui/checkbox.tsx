import { Check } from 'lucide-react-native';
import { useContext, useState } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
} from 'react-native';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

export interface CheckboxProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Mirrors shadcn `aria-invalid` — destructive border. Auto-detected from FormField error. */
  invalid?: boolean;
  className?: string;
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  invalid,
  className,
  disabled,
  style,
  onPress,
  ...props
}: CheckboxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const colors = useThemeColor();
  const field = useContext(FormFieldContext);
  const isInvalid = invalid ?? !!field?.error;

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) {
      setUncontrolledChecked(next);
    }
    onCheckedChange?.(next);
    onPress?.(e);
  };

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      className={cn(
        'h-5 w-5 items-center justify-center rounded-[4px] border',
        checked
          ? 'border-primary bg-primary'
          : 'border-input bg-background dark:bg-input/30',
        isInvalid && 'border-destructive',
        disabled && 'opacity-50',
        className
      )}
      style={(state) => [
        { borderCurve: 'continuous' },
        checked && {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        },
        isInvalid && { borderColor: colors.destructive },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      {checked && (
        <Check
          size={14}
          color={colors.primaryForeground}
          strokeWidth={3}
        />
      )}
    </Pressable>
  );
}
