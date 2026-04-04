import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTokens } from '@truongdq01/headless';

let BlurView: React.ComponentType<any> | null = null;
try {
  BlurView = require('expo-blur').BlurView;
} catch {
  // expo-blur not installed — fall back to translucent View
}

export interface GlassCardProps extends ViewProps {
  /** Blur intensity (0–100). Only effective when expo-blur is installed. Default 40. */
  intensity?: number;
  /** expo-blur tint: "light" | "dark" | "default". Auto-selects from theme when omitted. */
  tint?: 'light' | 'dark' | 'default';
  /** Border radius override. Uses `radius.xl` by default. */
  borderRadius?: number;
  /** Extra styles for the outer container. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function GlassCard({
  intensity = 40,
  tint,
  borderRadius,
  style,
  children,
  ...rest
}: GlassCardProps) {
  const t = useTokens();
  const isDark = t.color.bg.default !== '#F8FAFC';

  const resolvedTint = tint ?? (isDark ? 'dark' : 'light');
  const resolvedRadius = borderRadius ?? t.radius.xl;

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      borderRadius: resolvedRadius,
      overflow: 'hidden' as const,
      borderWidth: 1,
      borderColor:
        t.color.surface.glassBorder ??
        (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.3)'),
    }),
    [resolvedRadius, t.color.surface.glassBorder, isDark]
  );

  const fallbackStyle = useMemo<ViewStyle>(
    () => ({
      ...StyleSheet.absoluteFillObject,
      backgroundColor:
        t.color.surface.glass ??
        (isDark ? 'rgba(15,23,42,0.72)' : 'rgba(255,255,255,0.72)'),
    }),
    [t.color.surface.glass, isDark]
  );

  return (
    <View style={[containerStyle, style]} {...rest}>
      {BlurView ? (
        <BlurView
          intensity={intensity}
          tint={resolvedTint}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <View style={fallbackStyle} />
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
