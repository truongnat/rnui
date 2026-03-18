import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens } from "@rnui/headless";

export interface SnackbarProps {
  open: boolean;
  message: React.ReactNode;
  autoHideDuration?: number | null;
  onClose?: () => void;
  action?: React.ReactNode;
  anchorOrigin?: { vertical: "top" | "bottom"; horizontal: "left" | "center" | "right" };
}

export function Snackbar({
  open,
  message,
  autoHideDuration = 4000,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
}: SnackbarProps) {
  const tokens = useTokens();

  useEffect(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);

  if (!open) return null;

  const posStyle = {
    top: anchorOrigin.vertical === "top" ? 24 : undefined,
    bottom: anchorOrigin.vertical === "bottom" ? 24 : undefined,
    left: anchorOrigin.horizontal === "left" ? 24 : anchorOrigin.horizontal === "center" ? 0 : undefined,
    right: anchorOrigin.horizontal === "right" ? 24 : undefined,
    alignSelf: anchorOrigin.horizontal === "center" ? "center" : undefined,
  } as const;

  return (
    <View
      style={{
        position: "absolute",
        ...posStyle,
        backgroundColor: tokens.color.bg.inverse,
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        borderRadius: tokens.radius.md,
        flexDirection: "row",
        alignItems: "center",
        gap: tokens.spacing[3],
        ...tokens.shadow.md,
      }}
    >
      <Text style={{ color: tokens.color.text.inverse, flex: 1 }}>{message}</Text>
      {action}
      {onClose && (
        <Pressable onPress={onClose} hitSlop={8}>
          <Text style={{ color: tokens.color.text.inverse }}>x</Text>
        </Pressable>
      )}
    </View>
  );
}
