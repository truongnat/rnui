import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StepConnectorProps } from './types';

/**
 * Connecting line drawn between two adjacent steps.
 * Changes colour based on completed/active state.
 */
export function StepConnector({
  orientation = 'horizontal',
  completed = false,
}: StepConnectorProps) {
  const {
    components: { stepper },
  } = useTheme();

  const lineStyle = useMemo(() => {
    const color = completed
      ? stepper.step.completed.color
      : stepper.step.pending.color;

    if (orientation === 'horizontal') {
      return [styles.horizontal, { backgroundColor: color }];
    }
    return [styles.vertical, { backgroundColor: color }];
  }, [orientation, completed, stepper]);

  return <View style={lineStyle} />;
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    height: 1,
    alignSelf: 'center',
    marginHorizontal: 4,
  },
  vertical: {
    width: 1,
    minHeight: 16,
    alignSelf: 'center',
    marginVertical: 2,
    marginLeft: 11,
  },
});
