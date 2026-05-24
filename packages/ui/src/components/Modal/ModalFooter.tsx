import { StyleSheet, View } from 'react-native';
import type { ModalFooterProps } from './types';

/**
 * Layout helper that renders an action area at the bottom of the modal.
 */
export function ModalFooter({ children }: ModalFooterProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});
