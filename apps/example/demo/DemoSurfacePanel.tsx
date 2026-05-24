import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@truongdq01/headless';
import { Typography } from '@truongdq01/ui';

export type DemoSurfaceKind = 'white' | 'app' | 'card' | 'glass' | 'dark';

const SURFACE_BG: Record<
  DemoSurfaceKind,
  (t: ReturnType<typeof useTheme>['tokens']) => string
> = {
  white: () => '#FFFFFF',
  app: (t) => t.color.bg.default,
  card: (t) => t.color.surface.raised,
  glass: (t) => t.color.surface.glass,
  dark: (t) => t.color.bg.inverse,
};

export function DemoSurfacePanel({
  label,
  surface,
  children,
}: {
  label: string;
  surface: DemoSurfaceKind;
  children: React.ReactNode;
}) {
  const { tokens } = useTheme();
  const backgroundColor = SURFACE_BG[surface](tokens);
  const isDark = surface === 'dark';

  return (
    <View style={{ gap: tokens.spacing[1] }}>
      <Typography variant="caption" color="tertiary">
        {label}
      </Typography>
      <View
        style={[
          styles.panel,
          {
            backgroundColor,
            borderColor: isDark
              ? tokens.color.border.strong
              : tokens.color.border.subtle,
            borderRadius: tokens.radius.md,
            padding: tokens.spacing[3],
            gap: tokens.spacing[2],
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
