import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { useTokens, useComponentTokens } from "@truongdq01/headless";

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
  size?: number | "sm" | "md" | "lg" | "small" | "medium" | "large";
  color?: CircularProgressColor;
  thickness?: number;
  value?: number;
  variant?: CircularProgressVariant;
  showLabel?: boolean;
  style?: any;
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function CircularProgress({
  size = "md",
  color = "primary",
  thickness,
  value = 0,
  variant = "indeterminate",
  showLabel = false,
  style,
}: CircularProgressProps) {
  const tokens = useTokens();
  const { circularProgress } = useComponentTokens();

  const sizeMap: Record<string, number> = {
    sm: circularProgress.size.sm,
    md: circularProgress.size.md,
    lg: circularProgress.size.lg,
    small: circularProgress.size.sm,
    medium: circularProgress.size.md,
    large: circularProgress.size.lg,
  };

  const resolvedSize = typeof size === "number" ? size : sizeMap[size] || circularProgress.size.md;
  const resolvedColor = {
    primary: circularProgress.color,
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
