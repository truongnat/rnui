import { Pressable, type PressableProps } from 'react-native';
import { X } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';
import { tv } from 'tailwind-variants';

const chip = tv({
  base: 'h-8 flex-row items-center gap-1.5 self-start rounded-full border px-3',
  variants: {
    variant: {
      filled: 'border-transparent bg-secondary',
      outlined: 'border-border bg-transparent',
    },
  },
  defaultVariants: { variant: 'filled' },
});

export interface ChipProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: 'filled' | 'outlined';
  selected?: boolean;
  /** Show a trailing remove (x) affordance. */
  onRemove?: () => void;
  className?: string;
}

export function Chip({
  label,
  variant = 'filled',
  selected = false,
  onRemove,
  className,
  disabled,
  style,
  ...props
}: ChipProps) {
  const iconColor = useIconColor();
  const colors = useThemeColor();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      className={cn(chip({ variant }), disabled && 'opacity-50', className)}
      style={(state) => [
        { borderCurve: 'continuous' },
        selected &&
          variant === 'filled' && {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
          },
        selected && variant === 'outlined' && { borderColor: colors.primary },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      <Text
        className="text-sm text-foreground"
        style={
          selected && variant === 'filled'
            ? { color: colors.primaryForeground }
            : undefined
        }
      >
        {label}
      </Text>
      {onRemove && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          onPress={onRemove}
          hitSlop={6}
        >
          <X
            size={14}
            color={
              selected && variant === 'filled'
                ? colors.primaryForeground
                : iconColor
            }
          />
        </Pressable>
      )}
    </Pressable>
  );
}
