import React from "react";
import { View, type ViewStyle } from "react-native";
import { useTokens } from "@rnui/headless";

export interface PaperProps {
  children?: React.ReactNode;
  variant?: "elevation" | "outlined";
  elevation?: 0 | 1 | 2 | 3 | 4;
  square?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export function Paper({
  children,
  variant = "elevation",
  elevation = 1,
  square = false,
  style,
}: PaperProps) {
  const tokens = useTokens();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];

  return (
    <View
      style={[
        {
          backgroundColor: tokens.color.surface.default,
          borderRadius: square ? tokens.radius.none : tokens.radius.lg,
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor: tokens.color.border.default,
        },
        variant === "elevation" ? shadows[elevation] : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
