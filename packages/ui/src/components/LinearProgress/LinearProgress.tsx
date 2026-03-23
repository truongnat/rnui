import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useTokens, useComponentTokens } from "@truongnat/headless";

export type LinearProgressVariant = "indeterminate" | "determinate" | "buffer" | "query";
export type LinearProgressColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"
  | "brand"
  | "accent"
  | "inherit";

export interface LinearProgressProps {
  value?: number;
  variant?: LinearProgressVariant;
  valueBuffer?: number;
  color?: LinearProgressColor;
  trackColor?: string;
  thickness?: number;
  style?: any;
}

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function LinearProgress({
  value = 0,
  variant = "indeterminate",
  valueBuffer = 0,
  color = "primary",
  trackColor,
  thickness,
  style,
}: LinearProgressProps) {
  const tokens = useTokens();
  const { linearProgress } = useComponentTokens();
  const progressValue = clamp(value);

  const barColor = {
    primary: linearProgress.indicator.backgroundColor,
    brand: linearProgress.variant.brand.indicator.backgroundColor,
    accent: linearProgress.variant.accent.indicator.backgroundColor,
    success: linearProgress.variant.success.indicator.backgroundColor,
    error: linearProgress.variant.error.indicator.backgroundColor,
    secondary: tokens.color.text.secondary,
    info: tokens.color.info.icon,
    warning: tokens.color.warning.icon,
    inherit: tokens.color.text.primary,
  }[color] || linearProgress.indicator.backgroundColor;

  const containerStyle = [
    styles.container,
    linearProgress.track,
    { height: thickness ?? linearProgress.track.height, backgroundColor: trackColor ?? linearProgress.track.backgroundColor },
    style,
  ];

  const determinateStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue}%`,
    };
  }, [progressValue]);

  const bufferValue = clamp(valueBuffer);

  return (
    <View style={containerStyle}>
      {variant === "indeterminate" || variant === "query" ? (
        <Animated.View
          style={[
            styles.indeterminateBar,
            {
              backgroundColor: barColor,
            },
          ]}
        />
      ) : (
        <>
          {variant === "buffer" && (
            <View style={[styles.bufferBar, { width: `${bufferValue}%`, backgroundColor: trackColor ?? tokens.color.bg.muted }]} />
          )}
          <Animated.View
            style={[
              styles.determinateBar,
              { backgroundColor: barColor },
              determinateStyle,
            ]}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 999,
    overflow: "hidden",
  },
  determinateBar: {
    height: "100%",
  },
  indeterminateBar: {
    height: "100%",
    width: "40%",
  },
  bufferBar: {
    position: "absolute",
    height: "100%",
    left: 0,
    top: 0,
  },
});
