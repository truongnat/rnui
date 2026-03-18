import React from "react";
import { View, type ViewStyle } from "react-native";
import { useTokens } from "@rnui/headless";

export interface StackProps {
  children?: React.ReactNode;
  direction?: "column" | "column-reverse" | "row" | "row-reverse";
  spacing?: number;
  divider?: React.ReactNode;
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  flexWrap?: ViewStyle["flexWrap"];
  style?: ViewStyle | ViewStyle[];
}

export function Stack({
  children,
  direction = "column",
  spacing = 2,
  divider,
  alignItems,
  justifyContent,
  flexWrap,
  style,
}: StackProps) {
  const tokens = useTokens();
  const gap = tokens.spacing[spacing as keyof typeof tokens.spacing] ?? spacing;

  const items = React.Children.toArray(children);
  const content = divider
    ? items.flatMap((child, idx) => (idx === 0 ? [child] : [divider, child]))
    : items;

  return (
    <View
      style={[
        {
          flexDirection: direction,
          gap,
          alignItems,
          justifyContent,
          flexWrap,
        },
        style,
      ]}
    >
      {content}
    </View>
  );
}
