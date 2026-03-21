import React from "react";
import { View, type ViewStyle } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";

export interface PaperProps {
  children?: React.ReactNode;
  variant?: "elevation" | "outlined" | "flat";
  elevation?: "none" | "sm" | "md" | "lg";
  square?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export function Paper({
  children,
  variant = "elevation",
  elevation = "sm",
  square = false,
  style,
}: PaperProps) {
  const { paper } = useComponentTokens();
  const tokens = useTokens();

  return (
    <View
      style={[
        paper.container,
        square && { borderRadius: tokens.radius.none },
        variant === "outlined" && paper.variant.outlined,
        variant === "flat" && paper.variant.flat,
        variant === "elevation" && paper.elevation[elevation],
        style,
      ]}
    >
      {children}
    </View>
  );
}
