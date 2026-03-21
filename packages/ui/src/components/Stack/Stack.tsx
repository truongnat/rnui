import React from "react";
import { View, type ViewStyle } from "react-native";
import { useComponentTokens } from "@rnui/headless";

export interface StackProps {
  children?: React.ReactNode;
  direction?: "column" | "column-reverse" | "row" | "row-reverse";
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  divider?: React.ReactNode;
  alignItems?: ViewStyle["alignItems"];
  justifyContent?: ViewStyle["justifyContent"];
  flexWrap?: ViewStyle["flexWrap"];
  style?: ViewStyle | ViewStyle[];
}

export function Stack({
  children,
  direction = "column",
  spacing = "sm",
  divider,
  alignItems,
  justifyContent,
  flexWrap,
  style,
}: StackProps) {
  const { stack } = useComponentTokens();
  const gap = typeof spacing === "number" ? spacing : stack.gap[spacing];

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
