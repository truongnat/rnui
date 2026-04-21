import { useTheme } from '@truongdq01/headless';
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AccordionContext } from './context';
import type { AccordionActionsProps } from './types';

/**
 * AccordionActions displays a footer with buttons or links when the accordion is expanded.
 * It is typically used for secondary interactions like 'Cancel' or 'Apply'.
 */
export function AccordionActions({ children }: AccordionActionsProps) {
  const ctx = useContext(AccordionContext);
  const { tokens } = useTheme();

  // Actions are only visible when the accordion is expanded
  if (!ctx || !ctx.expanded) return null;

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: tokens.spacing[4],
          paddingVertical: tokens.spacing[3],
          backgroundColor: tokens.color.bg.subtle,
          gap: tokens.spacing[2],
          borderTopColor: tokens.color.border.subtle,
        }
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
});
