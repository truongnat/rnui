import { usePressable, useReduceMotionEnabled, useTheme } from '@truongdq01/headless';
import React, { useContext, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '../Icon';
import { AccordionContext } from './context';
import type { AccordionSummaryProps } from './types';

/**
 * AccordionSummary acts as the interactive header for an Accordion item.
 * It displays the title and an optional expansion icon (chevron).
 */
export function AccordionSummary({
  children,
  expandIcon,
}: AccordionSummaryProps) {
  const { components: { accordion } } = useTheme();
  const ctx = useContext(AccordionContext);
  const reduceMotion = useReduceMotionEnabled();

  // Pressable logic for toggle functionality
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress: ctx?.toggle ?? (() => {}),
    disabled: ctx?.disabled ?? false,
    feedbackMode: 'opacity',
  });

  // Animation state for the chevron rotation
  const rotation = useSharedValue(ctx?.expanded ? 1 : 0);

  useEffect(() => {
    if (!ctx) return;
    const target = ctx.expanded ? 1 : 0;
    rotation.value = reduceMotion
      ? target
      : withTiming(target, { duration: 300 });
  }, [ctx?.expanded, reduceMotion, rotation, ctx]);

  // Animated style for consistent chevron rotation
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotation.value, [0, 1], [0, 180], Extrapolation.CLAMP)}deg`,
      },
    ],
  }));

  // Early return if used outside Accordion (hooks called above)
  if (!ctx) return null;

  const containerStyle = [
    accordion.summary as any,
    animatedStyle,
    styles.container,
  ] as any;

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={containerStyle}
        {...accessibilityProps}
        accessibilityState={{ expanded: ctx.expanded }}
      >
        <Text style={[accordion.title, styles.title]}>{children}</Text>
        <Animated.View
          style={[
            iconStyle,
            {
              width: accordion.icon.size,
              height: accordion.icon.size,
            },
            styles.iconWrapper
          ]}
        >
          {expandIcon ?? (
            <Icon
              size={accordion.icon.size}
              color={accordion.icon.color}
              name="chevronDown"
            />
          )}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
