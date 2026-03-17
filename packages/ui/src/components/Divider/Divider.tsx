import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";

export interface DividerProps {
  /** Label shown centered in the divider */
  label?: string;
  orientation?: "horizontal" | "vertical";
  /** Use a stronger border color */
  emphasis?: boolean;
  /** Extra vertical margin around horizontal dividers */
  spacing?: "none" | "sm" | "md" | "lg";
}

export function Divider({
  label,
  orientation = "horizontal",
  emphasis = false,
  spacing = "md",
}: DividerProps) {
  const tokens = useTokens();

  const lineColor = emphasis
    ? tokens.color.border.strong
    : tokens.color.border.default;

  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: tokens.spacing[4],
    lg: tokens.spacing[6],
  }[spacing];

  if (orientation === "vertical") {
    return (
      <View
        style={{
          width: 1,
          alignSelf: "stretch",
          backgroundColor: lineColor,
          marginHorizontal: tokens.spacing[2],
        }}
      />
    );
  }

  if (label) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: tokens.spacing[3],
          marginVertical: verticalMargin,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: lineColor }} />
        <Text
          style={{
            fontSize: tokens.fontSize.xs,
            fontWeight: tokens.fontWeight.medium,
            color: tokens.color.text.tertiary,
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {label}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: lineColor }} />
      </View>
    );
  }

  return (
    <View
      style={{
        height: 1,
        backgroundColor: lineColor,
        marginVertical: verticalMargin,
      }}
    />
  );
}