import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, AccessibilityInfo } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  cancelAnimation,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { useTokens } from "@truongdq01/headless";

export interface MarqueeProps {
  /** Content to scroll */
  children: React.ReactNode;
  /** Speed of animation (pixels per second) */
  speed?: number;
  /** Direction of scroll */
  direction?: "left" | "right" | "up" | "down";
  /** Whether to pause on hover/press (for web compatibility) */
  pauseOnHover?: boolean;
  /** Whether to pause on press */
  pauseOnPress?: boolean;
  /** Whether to repeat infinitely */
  loop?: boolean;
  /** Delay before starting animation */
  delay?: number;
  /** Gradient fade edges */
  fadeEdges?: boolean;
  /** Custom gradient colors for fade */
  fadeColor?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Marquee component for scrolling text or content horizontally/vertically.
 * Uses React Native Reanimated for smooth GPU-accelerated animations.
 */
export function Marquee({
  children,
  speed = 50,
  direction = "left",
  pauseOnHover = false,
  pauseOnPress = false,
  loop = true,
  delay = 0,
  fadeEdges = true,
  fadeColor,
  accessibilityLabel = "Scrolling content",
  testID = "marquee",
}: MarqueeProps) {
  const tokens = useTokens();
  const containerRef = useRef<View>(null);
  const contentRef = useRef<Animated.View>(null);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isPaused = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    if (direction === "left" || direction === "right") {
      return {
        transform: [{ translateX: translateX.value }],
      };
    } else {
      return {
        transform: [{ translateY: translateY.value }],
      };
    }
  });

  const startAnimation = (containerWidth: number, contentWidth: number) => {
    if (contentWidth <= containerWidth) return; // No need to scroll

    const distance = contentWidth - containerWidth;
    const duration = (distance / speed) * 1000; // Convert to milliseconds

    const startValue = direction === "left" ? 0 : -distance;
    const endValue = direction === "left" ? -distance : 0;

    if (direction === "left" || direction === "right") {
      translateX.value = startValue;
    } else {
      translateY.value = startValue;
    }

    const animation = withTiming(endValue, {
      duration,
      easing: Easing.linear,
    });

    const repeatedAnimation = loop
      ? withRepeat(
          withSequence(
            withTiming(endValue, { duration, easing: Easing.linear }),
            withTiming(startValue, { duration: 0 }), // Reset instantly
          ),
          -1, // Infinite
          false,
        )
      : animation;

    if (delay > 0) {
      setTimeout(() => {
        if (direction === "left" || direction === "right") {
          translateX.value = repeatedAnimation;
        } else {
          translateY.value = repeatedAnimation;
        }
      }, delay);
    } else {
      if (direction === "left" || direction === "right") {
        translateX.value = repeatedAnimation;
      } else {
        translateY.value = repeatedAnimation;
      }
    }
  };

  const pauseAnimation = () => {
    isPaused.value = true;
    cancelAnimation(translateX);
    cancelAnimation(translateY);
  };

  const resumeAnimation = () => {
    isPaused.value = false;
    // Re-measure and restart animation
    measureAndStart();
  };

  const measureAndStart = () => {
    containerRef.current?.measure((x, y, width, height) => {
      contentRef.current?.measure((cx, cy, cWidth, cHeight) => {
        if (direction === "left" || direction === "right") {
          startAnimation(width, cWidth);
        } else {
          startAnimation(height, cHeight);
        }
      });
    });
  };

  useEffect(() => {
    // Start animation after layout
    const timeout = setTimeout(measureAndStart, 100);
    return () => {
      clearTimeout(timeout);
      cancelAnimation(translateX);
      cancelAnimation(translateY);
    };
  }, [children, speed, direction, loop]);

  const handlePressIn = () => {
    if (pauseOnPress) {
      pauseAnimation();
    }
  };

  const handlePressOut = () => {
    if (pauseOnPress) {
      resumeAnimation();
    }
  };

  const fadeGradient = fadeColor || tokens.color.surface.default;

  return (
    <View
      ref={containerRef}
      style={styles.container}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="text"
      testID={testID}
    >
      {fadeEdges && (
        <>
          <View
            style={[
              styles.fadeLeft,
              { backgroundColor: fadeGradient },
              direction === "up" || direction === "down" ? styles.fadeTop : undefined,
            ]}
          />
          <View
            style={[
              styles.fadeRight,
              { backgroundColor: fadeGradient },
              direction === "up" || direction === "down" ? styles.fadeBottom : undefined,
            ]}
          />
        </>
      )}
      <Animated.View
        ref={contentRef}
        style={[
          animatedStyle,
          direction === "up" || direction === "down" ? styles.vertical : styles.horizontal,
        ]}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
        accessible={false} // Let parent handle accessibility
      >
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
  },
  horizontal: {
    flexDirection: "row",
  },
  vertical: {
    flexDirection: "column",
  },
  fadeLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    zIndex: 1,
  },
  fadeRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    zIndex: 1,
  },
  fadeTop: {
    left: 0,
    right: 0,
    top: 0,
    height: 20,
    width: undefined,
  },
  fadeBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 20,
    width: undefined,
  },
});