import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import type { SliderTrackProps } from './types';

/**
 * Renders the background track rail, the filled (active) track, and
 * provides the onLayout measurement surface. Children (thumbs, marks) are
 * overlaid inside the measurement View.
 */
export function SliderTrack({
  isVertical,
  sliderHeight,
  trackThickness,
  thumbW,
  thumbH,
  trackPad,
  fillAnimatedStyle,
  trackAnimatedStyle,
  onTrackLayout,
  children,
}: SliderTrackProps) {
  const {
    components: { slider },
  } = useTheme();

  const outerPaddingStyle = useMemo(
    () => ({
      paddingVertical: isVertical ? 0 : trackPad,
      paddingHorizontal: isVertical ? trackPad : 0,
    }),
    [isVertical, trackPad]
  );

  const measureViewStyle = useMemo(() =>
    isVertical
      ? {
          width: thumbW + trackPad * 2,
          height: sliderHeight,
          justifyContent: 'center' as const,
        }
      : { height: thumbH + trackPad * 2, justifyContent: 'center' as const },
    [isVertical, thumbW, thumbH, trackPad, sliderHeight]
  );

  const railStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      ...(isVertical
        ? {
            top: 0,
            bottom: 0,
            left: '50%' as unknown as number,
            marginLeft: -trackThickness / 2,
            width: trackThickness,
          }
        : { left: 0, right: 0, height: trackThickness }),
      borderRadius: slider.track.borderRadius,
      backgroundColor: slider.track.bgOff,
      overflow: 'hidden' as const,
    }),
    [isVertical, trackThickness, slider.track.borderRadius, slider.track.bgOff]
  );

  const fillStyle = useMemo(
    () => ({
      height: isVertical ? ('100%' as const) : slider.track.height,
      backgroundColor: slider.track.bgOn,
      borderRadius: slider.track.borderRadius,
    }),
    [isVertical, slider.track.height, slider.track.bgOn, slider.track.borderRadius]
  );

  return (
    <Animated.View style={[outerPaddingStyle, trackAnimatedStyle] as any}>
      <View
        style={measureViewStyle}
        onLayout={(e) =>
          onTrackLayout(
            isVertical
              ? e.nativeEvent.layout.height
              : e.nativeEvent.layout.width
          )
        }
      >
        <View style={railStyle}>
          <Animated.View style={[fillStyle, fillAnimatedStyle] as any} />
        </View>
        {children}
      </View>
    </Animated.View>
  );
}
