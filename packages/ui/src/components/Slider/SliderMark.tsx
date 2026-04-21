import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SliderMarkProps } from './types';

/**
 * A single step-mark dot rendered on the slider track.
 */
export function SliderMark({
  mark,
  min,
  max,
  isActive,
  thumbH,
  trackPad,
}: SliderMarkProps) {
  const {
    components: { slider },
    tokens,
  } = useTheme();

  const markPct = (mark - min) / (max - min);

  const dotStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      left: `${markPct * 100}%` as unknown as number,
      width: 4,
      height: 4,
      borderRadius: 2,
      marginLeft: -2,
      backgroundColor: isActive
        ? slider.track.bgOn
        : tokens.color.border.strong,
      top: (thumbH - 4) / 2 + trackPad,
    }),
    [
      markPct,
      isActive,
      slider.track.bgOn,
      tokens.color.border.strong,
      thumbH,
      trackPad,
    ]
  );

  return <View style={dotStyle} />;
}
