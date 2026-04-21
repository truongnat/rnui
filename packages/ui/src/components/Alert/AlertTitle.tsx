import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import type { AlertTitleProps } from './types';

/**
 * AlertTitle provides a bold header section inside an Alert.
 * It is typically used for a summary or category before the main message.
 */
export function AlertTitle({ children, style }: AlertTitleProps) {
  const {
    components: { alert },
  } = useTheme();

  return (
    <Text style={[alert.title, style]}>
      {children}
    </Text>
  );
}
