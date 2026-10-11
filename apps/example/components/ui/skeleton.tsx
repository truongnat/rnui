import { useEffect } from 'react';
import { AppState, type ViewProps } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends ViewProps {
  className?: string;
}

export function Skeleton({ className, style, ...props }: SkeletonProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    const updatePulse = (active: boolean) => {
      cancelAnimation(opacity);
      opacity.value = 1;
      if (active) {
        opacity.value = withRepeat(
          withTiming(0.5, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          -1,
          true,
          undefined,
          ReduceMotion.System
        );
      }
    };
    updatePulse(AppState.currentState === 'active');
    const subscription = AppState.addEventListener('change', (state) =>
      updatePulse(state === 'active')
    );
    return () => {
      subscription.remove();
      cancelAnimation(opacity);
    };
  }, [opacity]);

  const pulseStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      className={cn('rounded-md bg-muted', className)}
      style={[pulseStyle, style]}
      {...props}
    />
  );
}
