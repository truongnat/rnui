import { Text } from '@/components/ui/text';
import { useThemeColor } from '@/lib/utils';
import type React from 'react';
import { StyleSheet, View } from 'react-native';

export type DemoSurfaceKind = 'white' | 'app' | 'card' | 'glass' | 'dark';

export function DemoSurfacePanel({
  label,
  surface,
  children,
}: {
  label: string;
  surface: DemoSurfaceKind;
  children: React.ReactNode;
}) {
  const colors = useThemeColor();
  const backgroundColor =
    surface === 'white'
      ? '#FFFFFF'
      : surface === 'dark'
        ? '#09090b'
        : surface === 'glass'
          ? colors.muted
          : colors.background;
  const isDark = surface === 'dark';

  return (
    <View style={styles.wrap}>
      <Text variant="muted">{label}</Text>
      <View
        style={[
          styles.panel,
          {
            backgroundColor,
            borderColor: isDark ? colors.foreground : colors.border,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 4,
  },
  panel: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    padding: 12,
    gap: 8,
  },
});
