import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { useComponentTokens, useIconStyle } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export type BadgeVariant = "default" | "brand" | "success" | "warning" | "error" | "info";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────

export function Badge({ label, variant = "default", size = "md", icon }: BadgeProps) {
  const { badge } = useComponentTokens();
  const { size: iconSize } = useIconStyle("list");

  const containerStyle = useMemo(() => [
    badge.base,
    badge.size[size],
    {
      backgroundColor: badge.variant[variant].bg,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 4,
    },
  ], [badge, variant, size]);

  const textStyle = useMemo(() => [
    badge.text,
    { color: badge.variant[variant].text },
  ], [badge, variant]);

  const iconColor = String(badge.variant[variant].text);

  // Helper to clone icon with standardized props
  const renderIcon = (el: React.ReactNode) => {
    if (!el) return null;
    if (React.isValidElement(el)) {
      return React.cloneElement(el as React.ReactElement, {
        size: (el.props as any)?.size ?? (iconSize * 0.8),
        color: (el.props as any)?.color ?? iconColor,
      } as any);
    }
    return el;
  };

  return (
    <View style={containerStyle}>
      {renderIcon(icon)}
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}