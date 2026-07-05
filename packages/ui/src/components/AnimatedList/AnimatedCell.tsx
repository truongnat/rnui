import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { type BaseAnimationBuilder } from 'react-native-reanimated';
import type { AnimatedCellProps } from './types';

function AnimatedCellInner<T>({
  info,
  renderItem,
  effectiveEntering,
  effectiveExiting,
  effectiveLayout,
  staggerEntering,
  staggerDelay,
  animatedListStyle,
  itemContainerStyle,
}: AnimatedCellProps<T>) {
  const { index } = info;

  const enteringAnim = useMemo(() => {
    if (!effectiveEntering) return undefined;

    const hasDelay = (anim: unknown): anim is BaseAnimationBuilder => {
      return (
        typeof anim === 'object' &&
        anim !== null &&
        'delay' in anim &&
        typeof (anim as Record<string, unknown>).delay === 'function'
      );
    };

    if (staggerEntering && hasDelay(effectiveEntering)) {
      return (effectiveEntering as BaseAnimationBuilder).delay(
        Math.min(index * staggerDelay, 1000)
      );
    }
    return effectiveEntering;
  }, [effectiveEntering, staggerEntering, staggerDelay, index]);

  return (
    // No explicit key here: FlashList's ViewHolder already keys each cell.
    // Adding a second key would remount this view on every recycle, firing
    // spurious entering animations while scrolling and preventing Reanimated
    // from playing exiting animations on removal.
    <Animated.View
      entering={enteringAnim}
      exiting={effectiveExiting}
      layout={effectiveLayout}
      style={[animatedListStyle, itemContainerStyle, styles.itemWrapper]}
    >
      {renderItem(info)}
    </Animated.View>
  );
}

export const AnimatedCell = memo(AnimatedCellInner) as typeof AnimatedCellInner;

const styles = StyleSheet.create({
  itemWrapper: {
    overflow: 'hidden',
  },
});
