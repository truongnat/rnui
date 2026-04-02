import React from "react";
import { Text, type TextStyle, type AccessibilityRole } from "react-native";
import { useComponentTokens, useTokens } from "@truongdq01/headless";

export type TypographyVariant =
  | "display"
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
  | "label"
  | "code"
  | "inherit";

/** Semantic role hint — RN maps to `accessibilityRole` / `accessibilityLevel` (IMPROVEMENT_PLAN Issue #2) */
export type TypographyAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";

export interface TypographyProps {
  children?: React.ReactNode;
  variant?: TypographyVariant;
  /** Maps to accessibility props (RN has no DOM elements) */
  as?: TypographyAs;
  align?: "left" | "right" | "center" | "justify" | "inherit";
  color?: "primary" | "secondary" | "tertiary" | "disabled" | "brand" | "error" | string;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  display?: "none" | "flex" | "contents" | "block" | "inline" | "inline-flex";
  style?: TextStyle | TextStyle[];
}

function accessibilityForAs(as: TypographyAs | undefined): { accessibilityRole?: AccessibilityRole } {
  if (!as || as === "span") return {};
  if (as === "p" || as === "label") {
    return { accessibilityRole: "text" };
  }
  if (as === "h1" || as === "h2" || as === "h3" || as === "h4" || as === "h5" || as === "h6") {
    return { accessibilityRole: "header" };
  }
  return {};
}

function TypographyInner({
  children,
  variant = "body1",
  as,
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

  const variantStyle =
    variant === "inherit" ? {} : typography.variants[variant as keyof typeof typography.variants] || {};

  const presetColors = typography.colors;
  const resolvedColor =
    color != null &&
    color !== "" &&
    typeof color === "string" &&
    Object.prototype.hasOwnProperty.call(presetColors, color)
      ? presetColors[color as keyof typeof presetColors]
      : color || presetColors.primary;

  const resolvedDisplay =
    display === "block" || display === "inline" || display === "inline-flex"
      ? "flex"
      : display;

  const sans = tokens.fontFamily?.sans;
  const sansFont =
    sans != null && sans !== "" ? { fontFamily: sans } : null;

  const skipSans = variant === "code";

  const a11y = accessibilityForAs(as);

  return (
    <Text
      {...a11y}
      numberOfLines={noWrap ? 1 : undefined}
      style={[
        { color: resolvedColor, textAlign: align === "inherit" ? undefined : align },
        variantStyle,
        !skipSans && sansFont,
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

export const Typography = React.memo(TypographyInner);
