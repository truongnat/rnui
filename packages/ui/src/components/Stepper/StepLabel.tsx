import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { StepLabelProps } from './types';

/**
 * Title and optional subtitle text for a Step.
 */
export function StepLabel({ children, subtitle, style }: StepLabelProps) {
  const {
    components: { stepper },
  } = useTheme();

  const labelStyle = useMemo(
    () => [styles.label, { color: stepper.step.pending.color }, style],
    [stepper, style]
  );

  return (
    <View>
      <Text style={labelStyle}>{children}</Text>
      {subtitle != null && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
});
