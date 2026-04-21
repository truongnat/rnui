import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from '../Icon';
import type { StepIconProps } from './types';

/**
 * Circular indicator showing step number, checkmark (completed), or error state.
 */
export function StepIcon({
  index,
  isActive,
  isCompleted,
  activeColor,
  completedColor,
  pendingColor,
}: StepIconProps) {
  const circleStyle = useMemo(() => {
    const borderColor = isCompleted ? completedColor : isActive ? activeColor : pendingColor;
    const bgColor = isCompleted ? completedColor : isActive ? `${activeColor}20` : 'transparent';
    return [styles.circle, { backgroundColor: bgColor, borderColor }];
  }, [isActive, isCompleted, activeColor, completedColor, pendingColor]);

  const numberStyle = useMemo(
    () => [styles.number, { color: isActive ? activeColor : pendingColor }],
    [isActive, activeColor, pendingColor]
  );

  return (
    <View style={circleStyle}>
      {isCompleted ? (
        <Icon size={14} color={completedColor} name="check" />
      ) : (
        <Text style={numberStyle}>{index + 1}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  number: {
    fontSize: 12,
    fontWeight: '600',
  },
});
