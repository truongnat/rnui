import React from "react";
import { View, type ViewStyle } from "react-native";
import { useComponentTokens } from "@truongdq01/headless";

export interface GridProps {
  children?: React.ReactNode;
  container?: boolean;
  size?: number | "auto" | "grow";
  columns?: number;
  spacing?: "sm" | "md" | "lg" | number;
  rowSpacing?: "sm" | "md" | "lg" | number;
  columnSpacing?: "sm" | "md" | "lg" | number;
  direction?: ViewStyle["flexDirection"];
  wrap?: ViewStyle["flexWrap"];
  offset?: number;
  style?: ViewStyle | ViewStyle[];
}

export function Grid({
  children,
  container = false,
  size,
  columns = 12,
  spacing = 0,
  rowSpacing,
  columnSpacing,
  direction = "row",
  wrap = "wrap",
  offset,
  style,
}: GridProps) {
  const { grid } = useComponentTokens();

  const resolveGap = (s: "sm" | "md" | "lg" | number | undefined) => {
    if (s === undefined) return undefined;
    return typeof s === "number" ? s : grid.gap[s];
  };

  const gap = resolveGap(spacing) ?? 0;
  const rowGap = resolveGap(rowSpacing) ?? gap;
  const colGap = resolveGap(columnSpacing) ?? gap;

  if (container) {
    return (
      <View
        style={[
          grid.container,
          {
            flexDirection: direction,
            flexWrap: wrap,
            rowGap,
            columnGap: colGap,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  const widthPct = typeof size === "number" ? `${(size / columns) * 100}%` : undefined;
  const widthValue = widthPct as unknown as ViewStyle["width"];
  const itemStyle: ViewStyle = {
    flexGrow: size === "grow" ? 1 : 0,
    flexBasis: size === "grow" ? 0 : size === "auto" ? undefined : (widthValue as any),
    maxWidth: size === "grow" ? undefined : size === "auto" ? undefined : (widthValue as any),
    marginLeft: offset ? (`${(offset / columns) * 100}%` as unknown as ViewStyle["marginLeft"]) : undefined,
  };

  return <View style={[itemStyle, style]}
  >{children}</View>;
}
