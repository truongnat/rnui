import React from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { usePressable, useComponentTokens } from "@truongdq01/headless";
import type { UsePressableOptions } from "@truongdq01/headless";

export interface PressableProps extends UsePressableOptions {
  children: React.ReactNode | ((state: { isPressed: boolean }) => React.ReactNode);
  style?: object | object[];
}

export function Pressable({ children, style, testID, ...hookOptions }: PressableProps) {
  const { pressable } = useComponentTokens();
  const { gesture, animatedStyle, accessibilityProps, isPressed, onPress } = usePressable({
    ...hookOptions,
    testID,
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[(pressable as any).container, style, animatedStyle] as any}
        {...accessibilityProps}
        {...({ onPress } as any)}
      >
        {typeof children === "function" ? children({ isPressed }) : children}
      </Animated.View>
    </GestureDetector>
  );
}
