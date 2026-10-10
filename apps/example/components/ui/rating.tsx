import { useState } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { Star } from 'lucide-react-native';
import { cn, useThemeColor } from '@/lib/utils';

export interface RatingProps extends ViewProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  /** Read-only display mode. */
  readonly?: boolean;
  /** Filled star color — defaults to amber (#f59e0b). */
  color?: string;
  /** Empty star color — defaults to `border` theme token. */
  emptyColor?: string;
  disabled?: boolean;
  className?: string;
}

export function Rating({
  value: controlledValue,
  defaultValue = 0,
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
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const colors = useThemeColor();
  const empty = emptyColor ?? colors.border;
  const interactive = !readonly && !disabled;

  const handleSelect = (starVal: number) => {
    if (!interactive) return;
    const next = value === starVal ? 0 : starVal;
    if (!isControlled) {
      setUncontrolledValue(next);
    }
    onChange?.(next);
  };

  return (
    <View
      accessibilityRole={interactive ? 'adjustable' : undefined}
      accessibilityValue={{ min: 0, max, now: Math.round(value) }}
      className={cn(
        'flex-row items-center gap-1 self-start',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {Array.from({ length: max }).map((_, i) => {
        const starVal = i + 1;
        const filled = starVal <= Math.round(value);
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
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${starVal} of ${max}`}
            onPress={() => handleSelect(starVal)}
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
