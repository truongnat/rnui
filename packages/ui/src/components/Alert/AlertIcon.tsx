import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '../Icon';
import type { AlertSeverity } from './types';

interface AlertIconProps {
  severity: AlertSeverity;
  icon?: React.ReactNode | false;
  color: string;
}

const SEVERITY_ICONS: Record<AlertSeverity, string> = {
  info: 'info',
  success: 'checkCircle',
  warning: 'warning',
  error: 'error',
};

/**
 * Internal component to render the appropriate icon for the Alert severity.
 */
export const AlertIcon = ({ severity, icon, color }: AlertIconProps) => {
  if (icon === false) return null;

  return (
    <View style={styles.iconContainer}>
      {icon ?? (
        <Icon size={20} color={color}>
          {SEVERITY_ICONS[severity]}
        </Icon>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 2,
  },
});
