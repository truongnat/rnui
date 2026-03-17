import React from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { usePressable } from "@rnui/headless";
import type { UsePressableOptions } from "@rnui/headless";

export interface PressableProps extends UsePressableOptions {
  children: React.ReactNode | ((state: { isPressed: boolean }) => React.ReactNode);
  style?: object | object[];
}

export function Pressable({ children, style, ...hookOptions }: PressableProps) {
  const { gesture, animatedStyle, accessibilityProps, isPressed } = usePressable(hookOptions);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, animatedStyle]} {...accessibilityProps}>
        {typeof children === "function" ? children({ isPressed }) : children}
      </Animated.View>
    </GestureDetector>
  );
}
