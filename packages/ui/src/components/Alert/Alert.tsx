import React, { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useComponentTokens, useTokens, useAlert } from "@rnui/headless";
import { Icon } from "../Icon";

export type AlertSeverity = "error" | "warning" | "info" | "success";
export type AlertVariant = "standard" | "filled" | "outlined";

export interface AlertProps {
  /** Severity of the alert */
  severity?: AlertSeverity;
  /** Visual variant */
  variant?: AlertVariant;
  /** Custom icon or false to hide */
  icon?: React.ReactNode | false;
  /** Action element (e.g. Button) */
  action?: React.ReactNode;
  /** Callback on close button press */
  onClose?: () => void;
  /** Content of the alert */
  children?: React.ReactNode;
}

export interface AlertTitleProps {
  children?: React.ReactNode;
}

const SEVERITY_ICONS: Record<AlertSeverity, string> = {
  info: "info",
  success: "checkCircle",
  warning: "warning",
  error: "error",
};

export function Alert({
  severity = "info",
  variant = "standard",
  icon,
  action,
  onClose,
  children,
}: AlertProps) {
  const { alert } = useComponentTokens();
  const tokens = useTokens();
  const { isOpen, getAlertProps, getCloseButtonProps } = useAlert({ onClose });
  const severityTokens = alert.variant[severity];

  if (!isOpen) return null;

  const containerStyle = useMemo(() => {
    const base = [alert.container];
    if (variant === "filled") {
      base.push({
        backgroundColor: severityTokens.icon,
        borderColor: "transparent",
        borderWidth: 0,
      } as any);
    } else if (variant === "outlined") {
      base.push({
        backgroundColor: "transparent",
        borderColor: severityTokens.border,
        borderWidth: 1,
      } as any);
    } else {
      base.push({
        backgroundColor: severityTokens.bg,
        borderColor: "transparent",
        borderWidth: 0,
      } as any);
    }
    return base;
  }, [alert, severityTokens, variant]);

  const textColor = variant === "filled" ? "#FFFFFF" : severityTokens.text;
  const iconColor = variant === "filled" ? "#FFFFFF" : severityTokens.icon;

  return (
    <View style={containerStyle as any} {...getAlertProps()}>
      {icon !== false && (
        <View style={{ marginTop: 2 }}>
          {icon ?? (
            <Icon size={20} color={iconColor}>
              {SEVERITY_ICONS[severity]}
            </Icon>
          )}
        </View>
      )}
      <View style={{ flex: 1 }}>
        {children}
      </View>
      {action}
      {onClose && (
        <Pressable hitSlop={8} style={{ marginTop: 2 }} {...getCloseButtonProps()}>
          <Icon size={18} color={textColor || tokens.color.text.inverse} name={"close" as any} />
        </Pressable>
      )}
    </View>
  );
}

export function AlertTitle({ children }: AlertTitleProps) {
  const { alert } = useComponentTokens();
  // We can't easily get the parent Alert's severity here without context,
  // but we can use a generic color or inherit from View style.
  // For now, let's use a standard bold style.
  return (
    <Text style={alert.title}>
      {children}
    </Text>
  );
}
