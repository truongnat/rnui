import React from 'react';
import { Text, type TextStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export interface AnimatedHelperTextProps {
  text: string | undefined;
  isError: boolean;
  style: TextStyle | TextStyle[];
}

/**
 * Subtle enter/exit for helper and error copy under fields (Reanimated layout animations).
 * Uses RN `Text` inside an `Animated.View` so test queries and a11y stay straightforward.
 */
export function AnimatedHelperText({
  text,
  isError,
  style,
}: AnimatedHelperTextProps) {
  if (!text) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(100)}
    >
      <Text
        style={style}
        accessibilityRole={isError ? 'alert' : undefined}
        accessibilityLiveRegion={isError ? 'polite' : undefined}
      >
        {text}
      </Text>
    </Animated.View>
  );
}
