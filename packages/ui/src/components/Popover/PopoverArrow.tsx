import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { PopoverArrowProps } from './types';

/**
 * Optional directional arrow that visually connects a Popover to its anchor.
 */
export function PopoverArrow({ direction, color }: PopoverArrowProps) {
  const arrowStyle = styles[direction];
  const colorStyle =
    direction === 'up' || direction === 'down'
      ? direction === 'up'
        ? { borderBottomColor: color }
        : { borderTopColor: color }
      : direction === 'left'
        ? { borderRightColor: color }
        : { borderLeftColor: color };

  return <View style={[arrowStyle, colorStyle]} />;
}

const styles = StyleSheet.create({
  up: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  down: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  left: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  right: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});
