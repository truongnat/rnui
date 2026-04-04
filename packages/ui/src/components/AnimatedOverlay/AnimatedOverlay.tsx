import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { useReduceMotionEnabled } from "@truongdq01/headless";

/**
 * Animation types for overlay transitions
 */
export type OverlayAnimationType = "scale" | "slideUp" | "slideDown" | "fade" | "none";

/**
 * Props for the AnimatedOverlay component
 */
export interface AnimatedOverlayProps {
  /** Whether the overlay is visible */
  visible: boolean;
  /** Animation type for enter/exit transitions */
  animationType?: OverlayAnimationType;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Whether to use spring animation instead of timing */
  useSpring?: boolean;
  /** Spring configuration for spring animations */
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  /** Children to render inside the overlay */
  children: React.ReactNode;
  /** Custom styles for the overlay container */
  style?: any;
  /** Accessibility label for the overlay */
  accessibilityLabel?: string;
  /** Callback when animation starts */
  onAnimationStart?: (entering: boolean) => void;
  /** Callback when animation ends */
  onAnimationEnd?: (entering: boolean) => void;
  /** Test ID for testing */
  testID?: string;
}

/**
 * AnimatedOverlay provides consistent, smooth overlay animations for modals, dialogs, and other floating UI.
 * Supports multiple animation types with reduced motion detection and accessibility features.
 *
 * This primitive ensures all overlays in the design system use the same motion language,
 * providing a cohesive user experience across different components.
 *
 * @param props - AnimatedOverlay configuration props
 * @returns Animated overlay component with consistent motion
 *
 * @example
 * ```tsx
 * <AnimatedOverlay
 *   visible={isOpen}
 *   animationType="scale"
 *   duration={300}
 *   accessibilityLabel="Settings dialog"
 * >
 *   <ModalContent />
 * </AnimatedOverlay>
 * ```
 */
export function AnimatedOverlay({
  visible,
  animationType = "scale",
  duration = 300,
  useSpring = false,
  springConfig = {},
  children,
  style,
  accessibilityLabel = "Overlay content",
  onAnimationStart,
  onAnimationEnd,
  testID = "animated-overlay",
}: AnimatedOverlayProps) {
  const reducedMotion = useReduceMotionEnabled();

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateY = useSharedValue(20);

  // Animation configuration
  const animationConfig = useSpring ? {
    damping: springConfig.damping ?? 15,
    stiffness: springConfig.stiffness ?? 100,
    mass: springConfig.mass ?? 1,
  } : {
    duration: reducedMotion ? 0 : duration,
    easing: Easing.out(Easing.cubic),
  };

  // Create animated style based on animation type
  const animatedStyle = useAnimatedStyle(() => {
    let transform: any[] = [];

    switch (animationType) {
      case "scale":
        transform = [{ scale: scale.value }];
        break;
      case "slideUp":
        transform = [{ translateY: translateY.value }];
        break;
      case "slideDown":
        transform = [{ translateY: translateY.value }];
        break;
      case "fade":
        // No transform for fade-only
        break;
      case "none":
        // No animations - use shared value for consistency
        return {
          opacity: opacity.value,
        };
    }

    return {
      opacity: opacity.value,
      transform,
    };
  });

  // Animation trigger function
  const animate = useCallback((entering: boolean) => {
    onAnimationStart?.(entering);

    const targetOpacity = entering ? 1 : 0;
    const targetScale = entering ? 1 : 0.9;
    const targetTranslateY = entering ?
      0 :
      animationType === "slideUp" ? 20 : -20;

    const animateValue = (value: any, target: number) => {
      return useSpring ?
        withSpring(target, animationConfig) :
        withTiming(target, animationConfig);
    };

    if (animationType === "none") {
      // Immediate value setting for no animation
      opacity.value = targetOpacity;
    } else {
      opacity.value = animateValue(opacity, targetOpacity);
      scale.value = animateValue(scale, targetScale);

      if (animationType === "slideUp" || animationType === "slideDown") {
        translateY.value = animateValue(translateY, targetTranslateY);
      }
    }

    // Call completion callback after animation
    if (!reducedMotion) {
      setTimeout(() => {
        onAnimationEnd?.(entering);
      }, duration);
    } else {
      onAnimationEnd?.(entering);
    }
  }, [
    animationType,
    duration,
    useSpring,
    animationConfig,
    onAnimationStart,
    onAnimationEnd,
    reducedMotion,
    opacity,
    scale,
    translateY
  ]);

  // Trigger animation when visibility changes
  useEffect(() => {
    animate(visible);
  }, [visible, animate]);

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        style,
      ]}
      accessible={false}
      testID={testID}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Base styles for overlay positioning
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Ensure content can be properly sized
    alignItems: "center",
    justifyContent: "center",
  },
});