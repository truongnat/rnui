import { useEffect } from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

export interface ProgressProps extends ViewProps {
  /** 0–100 */
  value?: number;
  className?: string;
  indicatorClassName?: string;
}

export function Progress({
  value = 0,
  className,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, value));
  const fill = useSharedValue(pct / 100);

  useEffect(() => {
    fill.value = withTiming(pct / 100, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [fill, pct]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: fill.value }],
  }));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: pct }}
      className={cn(
        'h-2 w-full overflow-hidden rounded-full bg-secondary',
        className
      )}
      {...props}
    >
      <Animated.View
        className={cn(
          'h-full w-full rounded-full bg-primary',
          indicatorClassName
        )}
        style={[{ transformOrigin: 'left' }, indicatorStyle]}
      />
    </View>
  );
}
