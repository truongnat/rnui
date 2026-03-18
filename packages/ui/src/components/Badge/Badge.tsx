import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { useComponentTokens, useIconStyle } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export type BadgeVariant = "default" | "brand" | "success" | "warning" | "error" | "info";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────

export function Badge({ label, variant = "default", icon }: BadgeProps) {
  const { badge } = useComponentTokens();
  const { size: iconSize } = useIconStyle("list"); // Use standard small icon size

  const containerStyle = useMemo(() => [
    badge.base,
    {
      backgroundColor: badge.variant[variant].bg,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      gap: 4,
    },
  ], [badge, variant]);

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