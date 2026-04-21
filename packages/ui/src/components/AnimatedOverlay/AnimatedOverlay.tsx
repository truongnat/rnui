import { useReduceMotionEnabled } from '@truongdq01/headless';
import { useCallback, useEffect, useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type WithSpringConfig,
  type WithTimingConfig,
} from 'react-native-reanimated';
import type { AnimatedOverlayProps } from './types';

/**
 * AnimatedOverlay provides consistent, smooth overlay animations for modals, dialogs, and other floating UI.
 * Supports multiple animation types with reduced motion detection and accessibility features.
 */
export function AnimatedOverlay({
  visible: visibleProp,
  isVisible,
  animationType = 'scale',
  duration = 300,
  useSpring = false,
  springConfig = {},
  children,
  style,
  backdropStyle,
  backdropOpacity = 0.5,
  backdropColor = '#000',
  showBackdrop = true,
  onBackdropPress,
  accessibilityLabel = 'Overlay content',
  onAnimationStart,
  onAnimationEnd,
  testID = 'animated-overlay',
}: AnimatedOverlayProps) {
  const reducedMotion = useReduceMotionEnabled();
  const visible = isVisible ?? visibleProp ?? false;

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateY = useSharedValue(20);
  const backdropAlpha = useSharedValue(0);

  // Animation configuration
  const springConfiguration = useMemo<WithSpringConfig>(() => {
    if (springConfig.dampingRatio !== undefined) {
      return {
        dampingRatio: springConfig.dampingRatio,
        mass: springConfig.mass ?? 1,
      } as WithSpringConfig;
    }
    return {
      stiffness: springConfig.stiffness ?? 100,
      damping: springConfig.damping ?? 10,
      mass: springConfig.mass ?? 1,
    } as WithSpringConfig;
  }, [springConfig]);

  const timingConfiguration = useMemo<WithTimingConfig>(() => ({
    duration: reducedMotion ? 0 : duration,
    easing: Easing.out(Easing.cubic),
  }), [reducedMotion, duration]);

  // Create animated styles
  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropAlpha.value * backdropOpacity,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const transform = [];

    if (animationType === 'scale') {
      transform.push({ scale: scale.value });
    } else if (animationType === 'slideUp' || animationType === 'slideDown') {
      transform.push({ translateY: translateY.value });
    }

    return {
      opacity: opacity.value,
      transform,
    };
  });

  // Animation trigger function
  const animate = useCallback(
    (entering: boolean) => {
      onAnimationStart?.(entering);

      const targetOpacity = entering ? 1 : 0;
      const targetScale = entering ? 1 : 0.9;
      const targetTranslateY = entering
        ? 0
        : animationType === 'slideUp'
          ? 20
          : -20;

      const onFinished = (finished?: boolean) => {
        'worklet';
        if (finished && onAnimationEnd) {
          runOnJS(onAnimationEnd)(entering);
        }
      };

      // Backdrop animation (always fade)
      backdropAlpha.value = withTiming(entering ? 1 : 0, timingConfiguration);

      if (animationType === 'none') {
        opacity.value = targetOpacity;
        scale.value = targetScale;
        translateY.value = targetTranslateY;
        onAnimationEnd?.(entering);
      } else {
        if (useSpring) {
          opacity.value = withSpring(targetOpacity, springConfiguration);
          if (animationType === 'slideUp' || animationType === 'slideDown') {
            translateY.value = withSpring(targetTranslateY, springConfiguration, onFinished);
          } else {
            scale.value = withSpring(targetScale, springConfiguration, onFinished);
          }
        } else {
          opacity.value = withTiming(targetOpacity, timingConfiguration);
          if (animationType === 'slideUp' || animationType === 'slideDown') {
            translateY.value = withTiming(targetTranslateY, timingConfiguration, onFinished);
          } else {
            scale.value = withTiming(targetScale, timingConfiguration, onFinished);
          }
        }
      }
    },
    [
      animationType,
      useSpring,
      springConfiguration,
      timingConfiguration,
      onAnimationStart,
      onAnimationEnd,
      opacity,
      scale,
      translateY,
      backdropAlpha,
    ]
  );

  // Trigger animation when visibility changes
  useEffect(() => {
    animate(visible);
  }, [visible, animate]);

  return (
    <Animated.View
      style={[styles.container, style]}
      pointerEvents={visible ? 'auto' : 'none'}
      testID={testID}
    >
      {showBackdrop && (
        <Pressable
          onPress={onBackdropPress}
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel="Close overlay"
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: backdropColor },
              backdropAnimatedStyle,
              backdropStyle,
            ]}
          />
        </Pressable>
      )}
      <Animated.View
        style={[contentAnimatedStyle, styles.content]}
        accessible={false}
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
