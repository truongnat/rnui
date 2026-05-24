import { useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { DrawerFooterProps } from './types';

/**
 * Optional layout helper that renders an action area at the bottom of the drawer.
 */
export function DrawerFooter({ children }: DrawerFooterProps) {
  const { tokens } = useTheme();

  const containerStyle = useMemo(
    () => ({
      paddingHorizontal: tokens.spacing[4],
      paddingTop: tokens.spacing[3],
      paddingBottom: tokens.spacing[2],
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: tokens.color.border.subtle,
    }),
    [tokens]
  );

  return <View style={containerStyle}>{children}</View>;
}
