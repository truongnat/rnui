import { useIsDark, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { useMemo } from 'react';
import {
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

type ExpoBlurViewProps = {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  style?: StyleProp<ViewStyle>;
};

let BlurView: React.ComponentType<ExpoBlurViewProps> | null = null;
try {
  // Optional: expo-blur enables native blur. Without it, GlassCard uses a translucent fallback.
  // Expo: npx expo install expo-blur
  BlurView = require('expo-blur').BlurView;
} catch {
  // expo-blur not installed — fall back to translucent View
}

/**
 * Frosted-glass surface card.
 *
 * Uses `expo-blur` when installed for native blur. Without `expo-blur`, renders a
 * translucent background so the component still works in bare React Native apps.
 *
 * @example
 * npx expo install expo-blur
 */
export interface GlassCardProps extends ViewProps {
  /** Blur intensity (0–100). Only effective when expo-blur is installed. Default 40. */
  intensity?: number;
  /** expo-blur tint: "light" | "dark" | "default". Auto-selects from theme when omitted. */
  tint?: 'light' | 'dark' | 'default';
  /** Border radius override. Uses `radius.xl` by default. */
  borderRadius?: number;
  /** Inner content padding. Uses `spacing[4]` by default. */
  contentPadding?: number;
  /** Extra styles for the outer container. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function GlassCard({
  intensity = 40,
  tint,
  borderRadius,
  contentPadding,
  style,
  children,
  ...rest
}: GlassCardProps) {
  const { tokens: t } = useTheme();
  const isDark = useIsDark();

  const resolvedTint = tint ?? (isDark ? 'dark' : 'light');
  const resolvedRadius = borderRadius ?? t.radius.xl;
  const resolvedPadding = contentPadding ?? t.spacing[4];

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      borderRadius: resolvedRadius,
      borderCurve: 'continuous',
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

  const contentStyle = useMemo(
    () => ({
      padding: resolvedPadding,
    }),
    [resolvedPadding]
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
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
