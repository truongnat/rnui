import { useTheme } from '@truongdq01/headless';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { MenuGroupProps } from './types';

export function MenuGroup({ title, children }: MenuGroupProps) {
  const { tokens } = useTheme();

  return (
    <View style={styles.group}>
      {title ? (
        <Text
          style={[
            styles.title,
            {
              color: tokens.color.text.secondary,
              fontSize: tokens.fontSize.xs,
              paddingHorizontal: tokens.spacing[4],
              paddingVertical: tokens.spacing[2],
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'column',
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
});
