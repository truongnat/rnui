import { Pressable, StyleSheet } from 'react-native';
import { Icon } from '../Icon';
import type { SnackbarIconProps } from './types';

/**
 * Close icon button for the Snackbar.
 */
export function SnackbarIcon({ color, onClose }: SnackbarIconProps) {
  return (
    <Pressable
      onPress={onClose}
      hitSlop={8}
      style={styles.button}
      accessibilityRole="button"
      accessibilityLabel="Dismiss"
    >
      <Icon size={18} color={color} name="close" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
