import React from "react";
import { View } from "react-native";
import { useTokens, useComponentTokens } from "@rnui/headless";

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
  const { buttonGroup } = useComponentTokens();
  const isRow = orientation === "horizontal";

  const items = React.Children.toArray(children);

  return (
    <View
      style={{
        ...buttonGroup.container,
        flexDirection: isRow ? "row" : "column",
        alignSelf: fullWidth ? "stretch" : "flex-start",
      }}
    >
      {items.map((child, i) => {
        if (!React.isValidElement(child)) return child;
        const element = child as React.ReactElement<any>;
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        const borderStyle = isRow
          ? {
              borderRightWidth: isLast ? 0 : buttonGroup.divider.width,
              borderRightColor: buttonGroup.divider.backgroundColor,
            }
          : {
              borderBottomWidth: isLast ? 0 : buttonGroup.divider.width,
              borderBottomColor: buttonGroup.divider.backgroundColor,
            };

        const radiusStyle = isFirst
          ? isRow
            ? { borderTopLeftRadius: buttonGroup.container.borderRadius, borderBottomLeftRadius: buttonGroup.container.borderRadius }
            : { borderTopLeftRadius: buttonGroup.container.borderRadius, borderTopRightRadius: buttonGroup.container.borderRadius }
          : isLast
          ? isRow
            ? { borderTopRightRadius: buttonGroup.container.borderRadius, borderBottomRightRadius: buttonGroup.container.borderRadius }
            : { borderBottomLeftRadius: buttonGroup.container.borderRadius, borderBottomRightRadius: buttonGroup.container.borderRadius }
          : { borderRadius: 0 };

        return React.cloneElement(element, {
          variant,
          size,
          disabled: disabled || element.props?.disabled,
          fullWidth: fullWidth || element.props?.fullWidth,
          style: [
            { borderRadius: 0, borderWidth: 0 },
            borderStyle,
            radiusStyle,
            element.props?.style,
          ].filter(Boolean),
        });
      })}
    </View>
  );
}
