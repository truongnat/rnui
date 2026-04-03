import React, { useMemo } from "react";
import { View, StyleSheet, type ViewProps, type StyleProp, type ViewStyle } from "react-native";
import { primitive } from "@truongdq01/tokens";

let ExpoLinearGradient: React.ComponentType<any> | null = null;
try {
  ExpoLinearGradient = require("expo-linear-gradient").LinearGradient;
} catch {
  // expo-linear-gradient not installed — render solid fallback
}

type GradientPreset = keyof typeof primitive.gradient;

export interface GradientProps extends ViewProps {
  /** Named gradient preset from primitive tokens. */
  preset?: GradientPreset;
  /** Custom color stops (overrides preset). */
  colors?: readonly string[];
  /** Start point {x, y} — 0‒1 range. Default {x:0, y:0}. */
  start?: { x: number; y: number };
  /** End point {x, y} — 0‒1 range. Default {x:1, y:1}. */
  end?: { x: number; y: number };
  /** Extra styles for the container. */
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Gradient({
  preset,
  colors: colorsProp,
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  children,
  ...rest
}: GradientProps) {
  const resolvedColors = useMemo(() => {
    if (colorsProp && colorsProp.length >= 2) return colorsProp;
    if (preset && primitive.gradient[preset]) return primitive.gradient[preset];
    return primitive.gradient.brand;
  }, [colorsProp, preset]);

  if (ExpoLinearGradient) {
    return (
      <ExpoLinearGradient
        colors={resolvedColors as string[]}
        start={start}
        end={end}
        style={[styles.fill, style]}
        {...rest}
      >
        {children}
      </ExpoLinearGradient>
    );
  }

  return (
    <View style={[{ backgroundColor: resolvedColors[0] as string }, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
