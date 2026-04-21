import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { TooltipArrowProps } from './types';

/**
 * Triangle pointer that visually connects the tooltip bubble to its trigger.
 * Currently renders a simple downward-pointing arrow for 'top' placements.
 */
export function TooltipArrow({ placement, color }: TooltipArrowProps) {
  const isTop = placement.startsWith('top');
  const isBottom = placement.startsWith('bottom');

  if (!isTop && !isBottom) return null;

  const arrowStyle = isTop
    ? [styles.arrowDown, { borderTopColor: color }]
    : [styles.arrowUp, { borderBottomColor: color }];

  return <View style={arrowStyle} />;
}

const styles = StyleSheet.create({
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
  },
  arrowUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    alignSelf: 'center',
  },
});
