import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast, dismissToast } from "@rnui/headless";
import type { ToastPosition } from "@rnui/headless";
import { ToastItem } from "./ToastItem";

// ─── Props ────────────────────────────────────────────────────────

export interface ToastContainerProps {
  position?: ToastPosition;
  /** Horizontal offset from screen edges */
  horizontalPadding?: number;
}

// ─── Component ────────────────────────────────────────────────────

export function ToastContainer({
  position = "bottom",
  horizontalPadding = 16,
}: ToastContainerProps) {
  const { toasts } = useToast();
  const insets = useSafeAreaInsets();

  const positionStyle =
    position === "top"
      ? { top: insets.top + 8, left: horizontalPadding, right: horizontalPadding }
      : { bottom: insets.bottom + 8, left: horizontalPadding, right: horizontalPadding };

  if (toasts.length === 0) return null;

  return (
    <View style={[styles.container, positionStyle]} pointerEvents="box-none">
      {toasts.map((item) => (
        <ToastItem
          key={item.id}
          item={item}
          position={position}
          onDismiss={dismissToast}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999,
  },
});