import type { UsePressableOptions } from '@truongdq01/headless';
import { usePressable, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export interface PressableProps extends UsePressableOptions {
  children:
    | React.ReactNode
    | ((state: { isPressed: boolean }) => React.ReactNode);
  style?: object | object[];
}

export function Pressable({
  children,
  style,
  testID,
  ...hookOptions
}: PressableProps) {
  const {
    components: { pressable },
  } = useTheme();
  const { gesture, animatedStyle, accessibilityProps, isPressed } =
    usePressable({
      ...hookOptions,
      testID,
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[pressable.container, style, animatedStyle]}
        {...accessibilityProps}
      >
        {typeof children === 'function' ? children({ isPressed }) : children}
      </Animated.View>
    </GestureDetector>
  );
}
