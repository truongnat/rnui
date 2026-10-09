import type { ComponentType, ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/lib/utils';

// Optional peer: expo-linear-gradient enables real gradients. Without it,
// Gradient renders a solid background using the first color.
// Expo: npx expo install expo-linear-gradient
let ExpoLinearGradient: ComponentType<Record<string, unknown>> | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ExpoLinearGradient = require('expo-linear-gradient').LinearGradient;
} catch {
  // expo-linear-gradient not installed — solid fallback below
}

export interface GradientProps extends ViewProps {
  /** Color stops. Requires at least 2 for a real gradient. */
  colors?: readonly string[];
  /** Start point {x, y} — 0–1 range. Default {x:0, y:0}. */
  start?: { x: number; y: number };
  /** End point {x, y} — 0–1 range. Default {x:1, y:1}. */
  end?: { x: number; y: number };
  /** Color stop positions (0–1), same length as `colors`. expo-linear-gradient only. */
  locations?: readonly number[];
  className?: string;
  children?: ReactNode;
}

const DEFAULT_COLORS = ['#18181b', '#71717a'] as const;

/**
 * Linear gradient container. Uses `expo-linear-gradient` when installed and
 * falls back to a solid background (first color) otherwise.
 */
export function Gradient({
  colors = DEFAULT_COLORS,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  locations,
  className,
  style,
  children,
  ...props
}: GradientProps) {
  if (ExpoLinearGradient && colors.length >= 2) {
    const LinearGradient = ExpoLinearGradient;
    return (
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        locations={locations}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </LinearGradient>
    );
  }

  return (
    <View
      className={cn(className)}
      style={[{ backgroundColor: colors[0] }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
