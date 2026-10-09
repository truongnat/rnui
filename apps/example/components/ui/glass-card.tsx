import type { ComponentType, ReactNode } from 'react';
import { useMemo } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { cn } from '@/lib/utils';

type ExpoBlurViewProps = {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  style?: StyleProp<ViewStyle>;
};

// Optional peer: expo-blur enables native blur. Without it, GlassCard uses a
// translucent background fallback.
// Expo: npx expo install expo-blur
let BlurView: ComponentType<ExpoBlurViewProps> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  BlurView = require('expo-blur').BlurView;
} catch {
  // expo-blur not installed — fall back to translucent View
}

export interface GlassCardProps extends ViewProps {
  /** Blur intensity (0–100). Only effective when expo-blur is installed. */
  intensity?: number;
  /** expo-blur tint. Auto-selects from color scheme when omitted. */
  tint?: 'light' | 'dark' | 'default';
  className?: string;
  children?: ReactNode;
}

/**
 * Frosted-glass surface card.
 *
 * Uses `expo-blur` when installed for native blur; otherwise renders a
 * translucent background so it still works in bare React Native apps.
 */
export function GlassCard({
  intensity = 40,
  tint,
  className,
  style,
  children,
  ...props
}: GlassCardProps) {
  const isDark = useColorScheme() === 'dark';
  const resolvedTint = tint ?? (isDark ? 'dark' : 'light');

  const glassStyle = useMemo<ViewStyle>(
    () => ({
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.3)',
      backgroundColor: BlurView
        ? 'transparent'
        : isDark
          ? 'rgba(15,23,42,0.72)'
          : 'rgba(255,255,255,0.72)',
    }),
    [isDark]
  );

  return (
    <View
      className={cn('overflow-hidden rounded-xl', className)}
      style={[glassStyle, style]}
      {...props}
    >
      {BlurView && (
        <BlurView
          intensity={intensity}
          tint={resolvedTint}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View className="p-4" style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
