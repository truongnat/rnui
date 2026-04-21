import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SnackbarIcon } from './SnackbarIcon';
import type { SnackbarContentProps } from './types';

/**
 * Renders the message text, optional action, and optional close icon
 * inside the Snackbar container.
 */
export function SnackbarContent({
  message,
  action,
  onClose,
  textColor,
}: SnackbarContentProps) {
  return (
    <>
      <Text style={[styles.message, { color: textColor }]}>{message}</Text>
      {action}
      {onClose && <SnackbarIcon color={textColor} onClose={onClose} />}
    </>
  );
}

const styles = StyleSheet.create({
  message: {
    flex: 1,
  },
});
