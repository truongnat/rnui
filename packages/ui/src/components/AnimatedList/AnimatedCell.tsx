import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { BaseAnimationBuilder } from 'react-native-reanimated';
import type { AnimatedCellProps } from './types';

export function AnimatedCell<T>({
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

const styles = StyleSheet.create({
  itemWrapper: {
    overflow: 'hidden',
  },
});
