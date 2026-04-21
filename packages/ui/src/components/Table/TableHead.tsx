import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { View } from 'react-native';
import type { TableHeadProps } from './types';

/**
 * Sticky header section wrapper. Applies header background from theme.
 */
export function TableHead({ children }: TableHeadProps) {
  const {
    components: { table },
  } = useTheme();

  return <View style={table.header}>{children}</View>;
}
