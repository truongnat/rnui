import React from "react";
import { View, type ViewStyle } from "react-native";
import { useComponentTokens, useTokens } from "@truongdq01/headless";

export interface AppBarProps {
  children?: React.ReactNode;
  color?: "default" | "inherit" | "primary" | "secondary" | "transparent";
  variant?: "elevation" | "outlined";
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
  elevation?: 0 | 1 | 2 | 3 | 4;
  style?: ViewStyle | ViewStyle[];
}

export function AppBar({
  children,
  color = "primary",
  variant = "elevation",
  position = "relative",
  elevation = 2,
  style,
}: AppBarProps) {
  const { appBar } = useComponentTokens();
  const tokens = useTokens();
  const shadows = [tokens.shadow.none, tokens.shadow.sm, tokens.shadow.md, tokens.shadow.lg, tokens.shadow.xl];

  const bgMap: Record<string, string> = {
    default: appBar.container.backgroundColor,
    inherit: "transparent",
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    transparent: "transparent",
  };

  return (
    <View
      style={[
        {
          backgroundColor: bgMap[color],
          borderBottomWidth: variant === "outlined" ? 1 : 0,
          borderBottomColor: tokens.color.border.default,
          zIndex: appBar.container.zIndex,
        },
        variant === "elevation" ? shadows[elevation] : null,
        position === "absolute" || position === "fixed"
          ? { position: "absolute", top: 0, left: 0, right: 0 }
          : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface ToolbarProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function Toolbar({ children, style }: ToolbarProps) {
  const { appBar } = useComponentTokens();
  const tokens = useTokens();
  return (
    <View
      style={[
        {
          minHeight: 56,
          paddingHorizontal: appBar.container.paddingHorizontal,
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
