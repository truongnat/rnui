import { Check } from 'lucide-react-native';
import { useContext } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { cn, FormFieldContext, useIconColor, useThemeColor } from '@/lib/utils';

export interface CheckboxProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Mirrors shadcn `aria-invalid` — destructive border. Auto-detected from FormField error. */
  invalid?: boolean;
  className?: string;
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  invalid,
  className,
  disabled,
  style,
  ...props
}: CheckboxProps) {
  const iconColor = useIconColor('onPrimary');
  const colors = useThemeColor();
  const field = useContext(FormFieldContext);
  const isInvalid = invalid ?? !!field?.error;

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        'h-5 w-5 items-center justify-center rounded-[4px] border border-input bg-background dark:bg-input/30',
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
      {checked && <Check size={14} color={iconColor} strokeWidth={3} />}
    </Pressable>
  );
}
