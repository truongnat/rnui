import { useReduceMotionEnabled } from '@truongdq01/headless';
import { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  type WithTimingConfig,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  overlayFadeIn,
  overlayFadeOut,
  overlayPopIn,
  overlayPopOut,
  overlaySlideIn,
  overlaySlideOut,
} from '../../motion/overlayTiming';
import type { AnimatedOverlayProps } from './types';

function buildTimingConfig(
  entering: boolean,
  animationType: AnimatedOverlayProps['animationType'],
  reducedMotion: boolean
): WithTimingConfig {
  if (reducedMotion) {
    return { duration: 0 };
  }

  const isSlide = animationType === 'slideUp' || animationType === 'slideDown';

  if (isSlide) {
    const preset = entering ? overlaySlideIn : overlaySlideOut;
    return { duration: preset.duration, easing: preset.easing };
  }

  const preset = entering ? overlayPopIn : overlayPopOut;
  return { duration: preset.duration, easing: preset.easing };
}

/**
 * AnimatedOverlay provides consistent, smooth overlay animations for modals, dialogs, and other floating UI.
 * Uses design-system timing presets (no spring bounce).
 */
export function AnimatedOverlay({
  visible: visibleProp,
  isVisible,
  animationType = 'scale',
  duration: durationOverride,
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

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.96);
  const translateY = useSharedValue(20);
  const backdropAlpha = useSharedValue(0);

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

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropAlpha.value * backdropOpacity,
  }));

  const animate = useCallback(
    (entering: boolean) => {
      onAnimationStart?.(entering);

      const targetOpacity = entering ? 1 : 0;
      const targetScale = entering ? 1 : 0.96;
      const targetTranslateY = entering
        ? 0
        : animationType === 'slideUp'
          ? 20
          : -20;

      const contentTiming = buildTimingConfig(
        entering,
        animationType,
        reducedMotion
      );
      const backdropTiming: WithTimingConfig = reducedMotion
        ? { duration: 0 }
        : {
            duration:
              durationOverride ??
              (entering ? overlayFadeIn.duration : overlayFadeOut.duration),
            easing: entering ? overlayFadeIn.easing : overlayFadeOut.easing,
          };

      const onFinished = (finished?: boolean) => {
        'worklet';
        if (finished && onAnimationEnd) {
          scheduleOnRN(onAnimationEnd, entering);
        }
      };

      backdropAlpha.value = withTiming(entering ? 1 : 0, backdropTiming);

      if (animationType === 'none') {
        opacity.value = targetOpacity;
        scale.value = targetScale;
        translateY.value = targetTranslateY;
        onAnimationEnd?.(entering);
        return;
      }

      if (animationType === 'fade') {
        opacity.value = withTiming(targetOpacity, contentTiming, onFinished);
        return;
      }

      opacity.value = withTiming(targetOpacity, contentTiming);
      if (animationType === 'slideUp' || animationType === 'slideDown') {
        translateY.value = withTiming(
          targetTranslateY,
          contentTiming,
          onFinished
        );
      } else {
        scale.value = withTiming(targetScale, contentTiming, onFinished);
      }
    },
    [
      animationType,
      reducedMotion,
      durationOverride,
      onAnimationStart,
      onAnimationEnd,
      opacity,
      scale,
      translateY,
      backdropAlpha,
    ]
  );

  useEffect(() => {
    animate(visible);
  }, [visible, animate]);

  return (
    <Animated.View
      style={[styles.container, style]}
      pointerEvents={visible ? 'auto' : 'none'}
      testID={testID}
    >
      {showBackdrop ? (
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
      ) : null}
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
