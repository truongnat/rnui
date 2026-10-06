import { Pressable, type PressableProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

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
  style,
  ...props
}: ToggleProps) {
  const colors = useThemeColor();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: pressed, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onPressedChange?.(!pressed)}
      className={cn(
        toggleVariants({ variant, size }),
        disabled && 'opacity-50',
        className
      )}
      style={(state) => [
        { borderCurve: 'continuous' },
        // pressed bg via style prop — toggling var-classes dynamically
        // triggers a css-interop upgrade warning (OOM risk).
        pressed && { backgroundColor: colors.accent },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      {typeof props.children === 'string' ? (
        <Text className="text-sm font-medium text-foreground">
          {props.children}
        </Text>
      ) : (
        props.children
      )}
    </Pressable>
  );
}
