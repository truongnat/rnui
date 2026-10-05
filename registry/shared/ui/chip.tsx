import { Pressable, type PressableProps } from 'react-native';
import { X } from 'lucide-react-native';
import { useColorScheme } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { tv } from 'tailwind-variants';

const chip = tv({
  base: 'h-8 flex-row items-center gap-1.5 self-start rounded-full border px-3',
  variants: {
    variant: {
      filled: 'border-transparent bg-secondary',
      outlined: 'border-border bg-transparent',
    },
    selected: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'filled', selected: true, class: 'bg-primary' },
    { variant: 'outlined', selected: true, class: 'border-primary' },
  ],
  defaultVariants: { variant: 'filled', selected: false },
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
  ...props
}: ChipProps) {
  const dark = useColorScheme() === 'dark';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      disabled={disabled}
      className={cn(
        chip({ variant, selected }),
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          'text-sm',
          selected && variant === 'filled'
            ? 'text-primary-foreground'
            : 'text-foreground'
        )}
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
          <X size={14} color={dark ? '#a8a29e' : '#78716c'} />
        </Pressable>
      )}
    </Pressable>
  );
}
