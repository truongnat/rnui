import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { TableFooterProps } from './types';

/**
 * Footer section rendered below the body rows with a top border divider.
 */
export function TableFooter({ children }: TableFooterProps) {
  const {
    components: { table },
  } = useTheme();

  const footerStyle = StyleSheet.flatten([
    styles.footer,
    { borderTopColor: table.container.borderColor },
  ]);

  return <View style={footerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
  },
});
