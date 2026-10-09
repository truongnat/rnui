import { Pressable, View, type ViewProps } from 'react-native';
import { Star } from 'lucide-react-native';
import { cn, useThemeColor } from '@/lib/utils';

export interface RatingProps extends ViewProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  /** Read-only display mode. */
  readonly?: boolean;
  /** Filled star color — defaults to amber (conventional rating color). */
  color?: string;
  /** Empty star color — defaults to `border` theme token. */
  emptyColor?: string;
  disabled?: boolean;
  className?: string;
}

export function Rating({
  value = 0,
  onChange,
  max = 5,
  size = 24,
  readonly = false,
  color = '#f59e0b',
  emptyColor,
  disabled = false,
  className,
  ...props
}: RatingProps) {
  const colors = useThemeColor();
  const empty = emptyColor ?? colors.border;
  const interactive = !readonly && !disabled;

  return (
    <View
      accessibilityRole={interactive ? 'adjustable' : undefined}
      accessibilityValue={{ min: 0, max, now: Math.round(value) }}
      className={cn(
        'flex-row gap-1 self-start',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(value);
        const star = (
          <Star
            size={size}
            color={filled ? color : empty}
            fill={filled ? color : 'transparent'}
          />
        );
        return interactive ? (
          <Pressable
            // biome-ignore lint/suspicious/noArrayIndexKey: star positions are stable
            key={i}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${i + 1} of ${max}`}
            onPress={() => onChange?.(i + 1)}
          >
            {star}
          </Pressable>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: star positions are stable
          <View key={i}>{star}</View>
        );
      })}
    </View>
  );
}
