import React from "react";
import { View, type ViewStyle } from "react-native";
import { useComponentTokens } from "@rnui/headless";

export interface BoxProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  sx?: ViewStyle | ViewStyle[];
  flex?: number;
}

export function Box({ children, style, sx, flex }: BoxProps) {
  const { box } = useComponentTokens();
  const merged = [
    box.defaults,
    flex !== undefined ? { flex } : null,
    sx,
    style
  ];

  return (
    <View style={merged as ViewStyle[]}>
      {children}
    </View>
  );
}
