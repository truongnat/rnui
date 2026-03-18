import React from "react";
import { Text, type TextStyle } from "react-native";
import { useTokens } from "@rnui/headless";

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
  color?: string;
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
  const tokens = useTokens();

  const variantStyles: Record<TypographyVariant, TextStyle> = {
    h1: { fontSize: tokens.fontSize["4xl"], fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize["4xl"] * tokens.lineHeight.tight },
    h2: { fontSize: tokens.fontSize["3xl"], fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize["3xl"] * tokens.lineHeight.tight },
    h3: { fontSize: tokens.fontSize["2xl"], fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize["2xl"] * tokens.lineHeight.snug },
    h4: { fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold, lineHeight: tokens.fontSize.xl * tokens.lineHeight.snug },
    h5: { fontSize: tokens.fontSize.lg, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.lg * tokens.lineHeight.normal },
    h6: { fontSize: tokens.fontSize.md, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.md * tokens.lineHeight.normal },
    subtitle1: { fontSize: tokens.fontSize.md, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.md * tokens.lineHeight.normal },
    subtitle2: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium, lineHeight: tokens.fontSize.sm * tokens.lineHeight.normal },
    body1: tokens.text.md,
    body2: tokens.text.sm,
    caption: tokens.text.xs,
    button: { fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.semibold, textTransform: "uppercase" },
    overline: { fontSize: tokens.fontSize.xs, fontWeight: tokens.fontWeight.semibold, textTransform: "uppercase", letterSpacing: tokens.letterSpacing.wide },
    inherit: {},
  };

  const resolvedDisplay =
    display === "block" || display === "inline" || display === "inline-flex"
      ? "flex"
      : display;

  return (
    <Text
      numberOfLines={noWrap ? 1 : undefined}
      style={[
        { color: color ?? tokens.color.text.primary, textAlign: align === "inherit" ? undefined : align },
        variantStyles[variant],
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
