import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { PopoverContentProps } from './types';

/**
 * Animated panel that renders the Popover children at the computed position.
 * Hidden (opacity 0) until the layout is first measured to prevent position flash.
 */
export function PopoverContent({
  children,
  top,
  left,
  visible,
  paperStyle,
  onLayout,
}: PopoverContentProps) {
  const {
    components: { popover },
  } = useTheme();

  return (
    <View
      onLayout={onLayout}
      style={[
        popover.container,
        styles.container,
        { top, left, opacity: visible ? 1 : 0 },
        paperStyle,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
