import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";

export interface IconProps {
  children?: React.ReactNode;
  color?: string;
  size?: number | "small" | "medium" | "large";
  fontSize?: "inherit" | "small" | "medium" | "large";
}

export interface SvgIconProps {
  children: React.ReactElement;
  color?: string;
  fontSize?: "inherit" | "small" | "medium" | "large";
}

const SIZE_MAP = { small: 16, medium: 20, large: 24 } as const;

export function Icon({ children, color, size, fontSize = "medium" }: IconProps) {
  const tokens = useTokens();
  
  // Handle numeric size or size string
  let resolvedSize: number | undefined;
  if (typeof size === "number") {
    resolvedSize = size;
  } else if (size && size !== "inherit") {
    resolvedSize = SIZE_MAP[size] || SIZE_MAP[fontSize];
  } else {
    resolvedSize = SIZE_MAP[fontSize];
  }

  // If children is a lucide icon component, clone it with proper props
  if (React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      size: resolvedSize || 20,
      color: color ?? tokens.color.text.primary,
    } as any);
  }

  // Fallback for text content
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: color ?? tokens.color.text.primary, fontSize: resolvedSize }}>
        {children}
      </Text>
    </View>
  );
}

export function SvgIcon({ children, color, fontSize = "medium" }: SvgIconProps) {
  const tokens = useTokens();
  const size = fontSize === "inherit" ? undefined : SIZE_MAP[fontSize];
  if (!React.isValidElement(children)) return null;
  return React.cloneElement(children, {
    color: (children.props as any)?.color ?? color ?? tokens.color.text.primary,
    size: (children.props as any)?.size ?? size,
  } as any);
}
