import { useTheme } from '@truongdq01/headless';
import React from 'react';
import Animated from 'react-native-reanimated';
import type { DrawerContentProps } from './types';

/**
 * Animated slide-in panel that holds the drawer's children.
 * Translation and positioning are provided by the parent Drawer orchestrator.
 */
export function DrawerContent({
  children,
  animatedStyle,
  containerStyle,
  accessibilityLabel = 'Drawer',
}: DrawerContentProps) {
  const {
    components: { drawer },
  } = useTheme();

  return (
    <Animated.View
      accessibilityViewIsModal
      accessibilityRole="none"
      accessibilityLabel={accessibilityLabel}
      style={[drawer.container, containerStyle, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
}
