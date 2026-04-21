import type React from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
export type AlertVariant = 'standard' | 'filled' | 'outlined';

/**
 * Props for the Alert component.
 */
export interface AlertProps {
  /** Unique identifier for the alert component */
  id?: string;
  /** Severity of the alert (affects color and icon) */
  severity?: AlertSeverity;
  /** Visual variant: standard (default), filled, or outlined */
  variant?: AlertVariant;
  /** Custom icon node, or false to hide the icon entirely */
  icon?: React.ReactNode | false;
  /** Optional action element (typically a button) rendered on the right */
  action?: React.ReactNode;
  /** Callback fired when the close button is pressed */
  onClose?: () => void;
  /** Main message or complex nodes to display */
  children?: React.ReactNode;
  /** Optional container style override */
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for the AlertTitle component.
 */
export interface AlertTitleProps {
  /** Bold title text */
  children?: React.ReactNode;
  /** Optional title text style override */
  style?: StyleProp<TextStyle>;
}
