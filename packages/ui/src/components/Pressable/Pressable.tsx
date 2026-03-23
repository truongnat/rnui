import React from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { usePressable, useComponentTokens } from "@truongnat/headless";
import type { UsePressableOptions } from "@truongnat/headless";

export interface PressableProps extends UsePressableOptions {
  children: React.ReactNode | ((state: { isPressed: boolean }) => React.ReactNode);
  style?: object | object[];
}

export function Pressable({ children, style, ...hookOptions }: PressableProps) {
  const { pressable } = useComponentTokens();
  const { gesture, animatedStyle, accessibilityProps, isPressed } = usePressable(hookOptions);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[(pressable as any).container, style, animatedStyle] as any} {...accessibilityProps}>
        {typeof children === "function" ? children({ isPressed }) : children}
      </Animated.View>
    </GestureDetector>
  );
}
