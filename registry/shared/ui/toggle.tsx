import { Pressable, type PressableProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const toggleVariants = tv({
  base: 'flex-row items-center justify-center gap-2 rounded-md active:bg-accent',
  variants: {
    variant: {
      default: 'bg-transparent',
      outline: 'border border-input bg-transparent',
    },
    size: {
      default: 'h-10 px-3',
      sm: 'h-9 px-2.5',
      lg: 'h-11 px-5',
    },
    pressed: {
      true: 'bg-accent',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

export interface ToggleProps extends PressableProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function Toggle({
  pressed = false,
  onPressedChange,
  variant = 'default',
  size = 'default',
  className,
  disabled,
  ...props
}: ToggleProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: pressed, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onPressedChange?.(!pressed)}
      className={cn(
        toggleVariants({ variant, size, pressed }),
        disabled && 'opacity-50',
        className
      )}
      {...props}
    />
  );
}
