import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import type { DrawerBackdropProps } from './types';

/**
 * Animated semi-transparent overlay behind the drawer panel.
 * Pressing it calls onPress (typically onClose).
 */
export function DrawerBackdrop({
  animatedStyle,
  onPress,
  accessibilityLabel = 'Dismiss drawer',
}: DrawerBackdropProps) {
  const {
    components: { drawer },
  } = useTheme();

  return (
    <Animated.View style={[StyleSheet.absoluteFill, drawer.overlay, animatedStyle]}>
      <Pressable
        style={styles.fill}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint="Closes the drawer"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
