import { useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppBarContext, type AppBarTone } from './context';
import type { AppBarProps, ToolbarProps } from './types';

function resolveTone(color: AppBarProps['color']): AppBarTone {
  return color === 'primary' || color === 'secondary' ? 'inverse' : 'default';
}

export function AppBar({
  children,
  color = 'primary',
  variant = 'elevation',
  position = 'relative',
  elevation = 2,
  style,
}: AppBarProps) {
  const {
    components: { appBar },
    tokens,
  } = useTheme();

  const shadows = useMemo(
    () => [
      tokens.shadow.none,
      tokens.shadow.sm,
      tokens.shadow.md,
      tokens.shadow.lg,
      tokens.shadow.xl,
    ],
    [tokens]
  );

  const bgMap: Record<string, string> = useMemo(
    () => ({
      default: appBar.container.backgroundColor,
      inherit: 'transparent',
      primary: tokens.color.brand.default,
      secondary: tokens.color.brand.muted,
      transparent: 'transparent',
    }),
    [appBar, tokens]
  );

  const containerStyle = useMemo(
    () => ({
      backgroundColor: bgMap[color],
      borderBottomWidth: variant === 'outlined' ? 1 : 0,
      borderBottomColor: tokens.color.border.default,
      zIndex: appBar.container.zIndex,
    }),
    [bgMap, color, variant, tokens, appBar]
  );

  const positionStyle = useMemo(
    () =>
      position === 'absolute' || position === 'fixed'
        ? styles.absolutePosition
        : null,
    [position]
  );

  return (
    <AppBarContext.Provider value={resolveTone(color)}>
      <View
        style={[
          containerStyle,
          variant === 'elevation' ? shadows[elevation] : null,
          positionStyle,
          style,
        ]}
      >
        {children}
      </View>
    </AppBarContext.Provider>
  );
}

export function Toolbar({ children, style }: ToolbarProps) {
  const {
    components: { appBar },
    tokens,
  } = useTheme();

  const toolbarStyle = useMemo(
    () => ({
      paddingHorizontal: appBar.container.paddingHorizontal,
      gap: tokens.spacing[3],
    }),
    [appBar, tokens]
  );

  return <View style={[styles.toolbar, toolbarStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  absolutePosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  toolbar: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
