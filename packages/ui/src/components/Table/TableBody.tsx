import React from 'react';
import { View } from 'react-native';
import type { TableBodyProps } from './types';

/**
 * Body section wrapper for table data rows.
 */
export function TableBody({ children }: TableBodyProps) {
  return <View>{children}</View>;
}
