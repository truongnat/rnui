import React from "react";
import { View, Text } from "react-native";
import { useComponentTokens, useTokens } from "@truongdq01/headless";

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
  const { divider } = useComponentTokens();
  const tokens = useTokens();

  const lineColor = emphasis
    ? tokens.color.border.strong
    : divider.color;

  const verticalMargin = {
    none: 0,
    sm: tokens.spacing[2],
    md: divider.margin,
    lg: tokens.spacing[6],
  }[spacing];

  if (orientation === "vertical") {
    return (
      <View
        style={{
          width: divider.thickness,
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
        <View style={{ flex: 1, height: divider.thickness, backgroundColor: lineColor }} />
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
        <View style={{ flex: 1, height: divider.thickness, backgroundColor: lineColor }} />
      </View>
    );
  }

  return (
    <View
      style={{
        height: divider.thickness,
        backgroundColor: lineColor,
        marginVertical: verticalMargin,
      }}
    />
  );
}