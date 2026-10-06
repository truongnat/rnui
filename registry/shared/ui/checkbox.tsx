import { Check } from 'lucide-react-native';
import { Pressable, type PressableProps } from 'react-native';
import { cn, useIconColor } from '@/lib/utils';

export interface CheckboxProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const iconColor = useIconColor('onPrimary');

  return (
    <Pressable
      hitSlop={10}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        'h-5 w-5 items-center justify-center rounded border border-primary',
        checked && 'bg-primary',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {checked && <Check size={14} color={iconColor} strokeWidth={3} />}
    </Pressable>
  );
}
