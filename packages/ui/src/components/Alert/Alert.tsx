import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens } from "@rnui/headless";

export type AlertSeverity = "error" | "warning" | "info" | "success";
export type AlertVariant = "standard" | "filled" | "outlined";

export interface AlertProps {
  severity?: AlertSeverity;
  variant?: AlertVariant;
  icon?: React.ReactNode | false;
  action?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface AlertTitleProps {
  children?: React.ReactNode;
}

export function Alert({
  severity = "info",
  variant = "standard",
  icon,
  action,
  onClose,
  children,
}: AlertProps) {
  const tokens = useTokens();
  const colors = tokens.color[severity];

  const bg = variant === "filled" ? colors.icon : colors.bg;
  const border = variant === "outlined" ? colors.border : "transparent";
  const textColor = variant === "filled" ? "#fff" : colors.text;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: tokens.spacing[3],
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        borderRadius: tokens.radius.md,
        backgroundColor: bg,
        borderWidth: variant === "outlined" ? 1 : 0,
        borderColor: border,
      }}
    >
      {icon !== false && (
        <Text style={{ color: textColor, fontWeight: tokens.fontWeight.semibold }}>
          i
        </Text>
      )}
      <View style={{ flex: 1 }}>
        <Text style={{ color: textColor }}>{children}</Text>
      </View>
      {action}
      {onClose && (
        <Pressable onPress={onClose} hitSlop={8}>
          <Text style={{ color: textColor }}>x</Text>
        </Pressable>
      )}
    </View>
  );
}

export function AlertTitle({ children }: AlertTitleProps) {
  const tokens = useTokens();
  return (
    <Text style={{ fontWeight: tokens.fontWeight.semibold, marginBottom: tokens.spacing[1] }}>
      {children}
    </Text>
  );
}
