import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens, useIconStyle } from "@rnui/headless";

export interface ChipProps {
  label: React.ReactNode;
  variant?: "filled" | "outlined";
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "sm" | "md";
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  clickable?: boolean;
}

export function Chip({
  label,
  variant = "filled",
  color = "default",
  size = "md",
  avatar,
  icon,
  deleteIcon,
  onDelete,
  onClick,
  disabled = false,
  clickable = false,
}: ChipProps) {
  const tokens = useTokens();
  const { size: iconSize, color: iconColor } = useIconStyle("list");

  const palette = {
    default: { bg: tokens.color.bg.muted, text: tokens.color.text.primary, border: tokens.color.border.default },
    primary: { bg: tokens.color.brand.subtle, text: tokens.color.brand.text, border: tokens.color.brand.default },
    secondary: { bg: tokens.color.brand.muted, text: tokens.color.brand.text, border: tokens.color.brand.default },
    success: { bg: tokens.color.success.bg, text: tokens.color.success.text, border: tokens.color.success.border },
    error: { bg: tokens.color.error.bg, text: tokens.color.error.text, border: tokens.color.error.border },
    info: { bg: tokens.color.info.bg, text: tokens.color.info.text, border: tokens.color.info.border },
    warning: { bg: tokens.color.warning.bg, text: tokens.color.warning.text, border: tokens.color.warning.border },
  } as const;

  const colors = palette[color];

  const container = {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    gap: tokens.spacing[1],
    paddingHorizontal: size === "sm" ? tokens.spacing[2] : tokens.spacing[3],
    height: size === "sm" ? 28 : 34,
    borderRadius: 999,
    backgroundColor: variant === "filled" ? colors.bg : "transparent",
    borderWidth: variant === "outlined" ? 1 : 0,
    borderColor: colors.border,
    opacity: disabled ? tokens.opacity[60] : 1,
  };

  const renderIcon = (node: React.ReactNode) => {
    if (!node) return null;
    if (React.isValidElement(node)) {
      return React.cloneElement(node as React.ReactElement, {
        size: (node.props as any)?.size ?? iconSize,
        color: (node.props as any)?.color ?? iconColor,
      } as any);
    }
    return node;
  };

  const content = (
    <View style={container}>
      {avatar}
      {renderIcon(icon)}
      <Text style={{ color: colors.text, fontSize: tokens.fontSize.sm, fontWeight: tokens.fontWeight.medium }}>
        {label}
      </Text>
      {onDelete && (
        <Pressable onPress={onDelete} hitSlop={8}>
          {deleteIcon ?? <Text style={{ color: colors.text, fontSize: 12 }}>x</Text>}
        </Pressable>
      )}
    </View>
  );

  if (onClick || clickable) {
    return (
      <Pressable onPress={onClick} disabled={disabled}>
        {content}
      </Pressable>
    );
  }

  return content;
}
