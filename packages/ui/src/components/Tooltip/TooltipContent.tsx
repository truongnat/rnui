import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import type { TooltipContentProps } from './types';

/**
 * Rounded bubble that displays the tooltip title text (or custom node).
 * Positioned absolutely via top/left props passed from the parent.
 */
export function TooltipContent({
  title,
  top,
  left,
  animStyle,
  onLayout,
}: TooltipContentProps) {
  const {
    components: { tooltip },
  } = useTheme();

  return (
    <Animated.View
      onLayout={onLayout}
      onStartShouldSetResponder={() => true}
      style={[tooltip.container, styles.container, { top, left }, animStyle]}
    >
      {typeof title === 'string' ? (
        <Text style={tooltip.text}>{title}</Text>
      ) : (
        title
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
