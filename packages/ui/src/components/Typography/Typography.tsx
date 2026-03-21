import React from "react";
import { Text, type TextStyle } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "overline"
  | "inherit";

export interface TypographyProps {
  children?: React.ReactNode;
  variant?: TypographyVariant;
  align?: "left" | "right" | "center" | "justify" | "inherit";
  color?: "primary" | "secondary" | "tertiary" | "disabled" | "brand" | "error" | string;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  display?: "none" | "flex" | "contents" | "block" | "inline" | "inline-flex";
  style?: TextStyle | TextStyle[];
}

export function Typography({
  children,
  variant = "body1",
  align = "left",
  color,
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  display,
  style,
}: TypographyProps) {
  const { typography } = useComponentTokens();
  const tokens = useTokens();

  const variantStyle = variant === "inherit" ? {} : typography.variants[variant as keyof typeof typography.variants] || {};
  
  const resolvedColor = color && (typography.colors as any)[color] 
    ? (typography.colors as any)[color] 
    : (color || typography.colors.primary);

  const resolvedDisplay =
    display === "block" || display === "inline" || display === "inline-flex"
      ? "flex"
      : display;

  return (
    <Text
      numberOfLines={noWrap ? 1 : undefined}
      style={[
        { color: resolvedColor, textAlign: align === "inherit" ? undefined : align },
        variantStyle,
        paragraph && { marginBottom: tokens.spacing[4] },
        gutterBottom && { marginBottom: tokens.spacing[2] },
        resolvedDisplay ? { display: resolvedDisplay } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}
