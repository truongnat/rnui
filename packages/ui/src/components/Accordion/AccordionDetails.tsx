import { useReduceMotionEnabled, useTheme } from '@truongdq01/headless';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AccordionContext } from './context';
import type { AccordionDetailsProps } from './types';

/**
 * AccordionDetails provides an animated, collapsible container for the accordion content.
 * It uses layout measurements to smoothly animate height changes.
 */
export function AccordionDetails({ children }: AccordionDetailsProps) {
  const { components: { accordion } } = useTheme();
  const ctx = useContext(AccordionContext);
  const reduceMotion = useReduceMotionEnabled();
  
  const [contentHeight, setContentHeight] = useState(0);
  const animHeight = useSharedValue(0);

  // Synchronize height animation with expansion state
  useEffect(() => {
    if (!ctx) return;
    const target = ctx.expanded ? contentHeight : 0;
    animHeight.value = reduceMotion
      ? target
      : withTiming(target, { duration: 300 });
  }, [ctx?.expanded, contentHeight, reduceMotion, animHeight, ctx]);

  // Height and opacity animation logic
  const animStyle = useAnimatedStyle(() => ({
    height: animHeight.value,
    overflow: 'hidden',
    opacity: interpolate(
      animHeight.value,
      [0, contentHeight || 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  // Early return if used outside Accordion (hooks called above)
  if (!ctx) return null;

  return (
    <Animated.View style={animStyle}>
      <View
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          // Only update if height is valid and has changed to prevent infinite loops
          if (h > 0 && h !== contentHeight) {
            setContentHeight(h);
          }
        }}
        style={[
          accordion.details,
          styles.contentWrapper,
        ]}
      >
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
