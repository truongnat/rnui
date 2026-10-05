import { Pressable, View, type ViewProps } from 'react-native';
import { Star } from 'lucide-react-native';
import { cn } from '@/lib/utils';

export interface RatingProps extends ViewProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: number;
  /** Read-only display mode. */
  readonly?: boolean;
  className?: string;
}

const STAR_COLOR = '#f59e0b';
const STAR_EMPTY = '#d6d3d1';

export function Rating({
  value = 0,
  onChange,
  max = 5,
  size = 24,
  readonly = false,
  className,
  ...props
}: RatingProps) {
  return (
    <View
      accessibilityRole={readonly ? undefined : 'adjustable'}
      className={cn('flex-row gap-1 self-start', className)}
      {...props}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(value);
        const star = (
          <Star
            size={size}
            color={filled ? STAR_COLOR : STAR_EMPTY}
            fill={filled ? STAR_COLOR : 'transparent'}
          />
        );
        return readonly ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: star positions are stable
          <View key={i}>{star}</View>
        ) : (
          <Pressable
            // biome-ignore lint/suspicious/noArrayIndexKey: star positions are stable
            key={i}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${i + 1} of ${max}`}
            onPress={() => onChange?.(i + 1)}
          >
            {star}
          </Pressable>
        );
      })}
    </View>
  );
}
