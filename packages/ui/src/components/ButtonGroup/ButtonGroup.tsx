import React from "react";
import { View } from "react-native";
import { useTokens } from "@rnui/headless";

export interface ButtonGroupProps {
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "ghost" | "destructive" | "text" | "contained" | "outlined";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function ButtonGroup({
  children,
  variant = "outlined",
  size = "md",
  orientation = "horizontal",
  disabled = false,
  fullWidth = false,
}: ButtonGroupProps) {
  const tokens = useTokens();
  const isRow = orientation === "horizontal";

  const items = React.Children.toArray(children);

  return (
    <View
      style={{
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start",
        borderRadius: tokens.radius.md,
        overflow: "hidden",
      }}
    >
      {items.map((child, i) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<any>;
        const isFirst = i === 0;
        const isLast = i === items.length - 1;
        const style = {
          borderRadius: 0,
          borderWidth: 1,
          borderColor: tokens.color.border.default,
        } as any;

        if (isRow && !isLast) {
          style.borderRightWidth = 0;
        }
        if (!isRow && !isLast) {
          style.borderBottomWidth = 0;
        }
        if (isFirst || isLast) {
          style.borderRadius = tokens.radius.md;
        }

        return React.cloneElement(element, {
          variant,
          size,
          disabled: disabled || element.props?.disabled,
          fullWidth: fullWidth || element.props?.fullWidth,
          style: [style, element.props?.style].filter(Boolean),
        });
      })}
    </View>
  );
}
