import {
  durationScale,
  motionEasing,
  useReduceMotionEnabled,
  useTheme,
} from '@truongdq01/headless';
import { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
 * The content is measured off-layout (absolutely positioned) so height animations are
 * smooth and jump-free — including the first render when `defaultExpanded` is set.
 */
export function AccordionDetails({ children }: AccordionDetailsProps) {
  const {
    components: { accordion },
  } = useTheme();
  const ctx = useContext(AccordionContext);
  const reduceMotion = useReduceMotionEnabled();

  const [contentHeight, setContentHeight] = useState(0);
  const animHeight = useSharedValue(0);
  // Skip the enter animation on the very first measured pass to avoid a flash.
  const settledRef = useRef(false);

  const expanded = ctx?.expanded ?? false;

  useEffect(() => {
    const target = expanded ? contentHeight : 0;

    if (!settledRef.current) {
      animHeight.value = target;
      if (contentHeight > 0) settledRef.current = true;
      return;
    }

    animHeight.value = reduceMotion
      ? target
      : withTiming(target, {
          // Astryx: layout-rearranging transition → medium tier + ease-standard.
          duration: durationScale.medium,
          easing: motionEasing.standard,
        });
  }, [expanded, contentHeight, reduceMotion, animHeight]);

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
    <Animated.View style={animStyle} pointerEvents={expanded ? 'auto' : 'none'}>
      <View
        onLayout={(e) => {
          const h = e.nativeEvent.layout.height;
          setContentHeight((prev) => (h > 0 && h !== prev ? h : prev));
        }}
        style={[accordion.details, styles.contentWrapper]}
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
