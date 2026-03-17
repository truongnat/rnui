import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { useComponentTokens } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export type BadgeVariant = "default" | "brand" | "success" | "warning" | "error" | "info";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

// ─── Component ────────────────────────────────────────────────────

export function Badge({ label, variant = "default" }: BadgeProps) {
  const { badge } = useComponentTokens();

  const containerStyle = useMemo(() => [
    badge.base,
    { backgroundColor: badge.variant[variant].bg },
  ], [badge, variant]);

  const textStyle = useMemo(() => [
    badge.text,
    { color: badge.variant[variant].text },
  ], [badge, variant]);

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}