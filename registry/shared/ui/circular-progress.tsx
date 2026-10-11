import { useEffect } from 'react';
import { AppState, View, type ViewProps } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  ReduceMotion,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface CircularProgressProps extends ViewProps {
  /** 0–100. Omit for an indeterminate 25% arc. */
  value?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  size = 48,
  strokeWidth = 5,
  showLabel = false,
  className,
  style,
  ...props
}: CircularProgressProps) {
  const colors = useThemeColor();

  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const pct = value == null ? 25 : Math.max(0, Math.min(100, value));
  const indeterminate = value == null;
  const fill = useSharedValue(pct / 100);
  const rotation = useSharedValue(0);

  useEffect(() => {
    fill.value = withTiming(pct / 100, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
      reduceMotion: ReduceMotion.System,
    });
  }, [fill, pct]);

  useEffect(() => {
    const updateRotation = (active: boolean) => {
      cancelAnimation(rotation);
      rotation.value = 0;
      if (active && indeterminate) {
        rotation.value = withRepeat(
          withTiming(360, { duration: 1100, easing: Easing.linear }),
          -1,
          false,
          undefined,
          ReduceMotion.System
        );
      }
    };
    updateRotation(AppState.currentState === 'active');
    const subscription = AppState.addEventListener('change', (state) =>
      updateRotation(state === 'active')
    );
    return () => {
      subscription.remove();
      cancelAnimation(rotation);
    };
  }, [indeterminate, rotation]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: c * (1 - fill.value),
  }));
  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={
        indeterminate ? undefined : { min: 0, max: 100, now: pct }
      }
      accessibilityState={{ busy: indeterminate }}
      className={cn('items-center justify-center', className)}
      style={[{ width: size, height: size }, style]}
      {...props}
    >
      <Animated.View style={rotationStyle}>
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={colors.muted}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${c} ${c}`}
            animatedProps={animatedProps}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
      </Animated.View>
      {showLabel && value != null && (
        <Text
          className={cn(
            'absolute font-semibold text-foreground',
            size >= 96 ? 'text-xl' : 'text-xs'
          )}
        >
          {Math.round(pct)}%
        </Text>
      )}
    </View>
  );
}
