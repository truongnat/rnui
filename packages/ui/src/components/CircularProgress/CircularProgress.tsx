import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useTokens } from "@rnui/headless";

export type CircularProgressVariant = "indeterminate" | "determinate";
export type CircularProgressColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "inherit";

export interface CircularProgressProps {
  size?: number | "small" | "medium" | "large";
  color?: CircularProgressColor;
  thickness?: number;
  value?: number;
  variant?: CircularProgressVariant;
  showLabel?: boolean;
  style?: object;
}

const sizeMap: Record<"small" | "medium" | "large", number> = {
  small: 20,
  medium: 32,
  large: 48,
};

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function CircularProgress({
  size = "medium",
  color = "primary",
  thickness: _thickness,
  value = 0,
  variant = "indeterminate",
  showLabel = false,
  style,
}: CircularProgressProps) {
  const tokens = useTokens();

  const resolvedSize = typeof size === "number" ? size : sizeMap[size];
  const resolvedColor = {
    primary: tokens.color.brand.default,
    secondary: tokens.color.text.secondary,
    success: tokens.color.success.icon,
    error: tokens.color.error.icon,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary,
  }[color];

  const progressValue = clamp(value);

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator
        size={resolvedSize}
        color={resolvedColor}
        animating={variant === "indeterminate"}
      />
      {variant === "determinate" && showLabel && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.labelContainer}>
            <Text style={{ fontSize: tokens.fontSize.xs, color: tokens.color.text.secondary }}>
              {Math.round(progressValue)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
