import React from 'react';
import Animated from 'react-native-reanimated';
import type { SliderThumbProps } from './types';

/**
 * Animated draggable knob rendered on the slider track.
 * Accepts an optional custom renderer via `thumbRenderer`.
 */
export function SliderThumb({
  animatedStyle,
  thumbShellStyle,
  kind,
  value,
  thumbRenderer,
}: SliderThumbProps) {
  const custom = thumbRenderer?.({ kind, value });
  return (
    <Animated.View style={[thumbShellStyle, animatedStyle]}>
      {custom ?? null}
    </Animated.View>
  );
}
