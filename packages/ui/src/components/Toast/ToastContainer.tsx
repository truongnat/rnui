import React from "react";
import { StyleSheet } from "react-native";
import Animated, { LinearTransition as RawLinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast, dismissToast } from "@truongdq01/headless";
import type { ToastPosition } from "@truongdq01/headless";
import { ToastItem } from "./ToastItem";

// ─── Props ────────────────────────────────────────────────────────

export interface ToastContainerProps {
  position?: ToastPosition;
  /** Horizontal offset from screen edges */
  horizontalPadding?: number;
}

const layoutTransition =
  typeof RawLinearTransition?.duration === "function"
    ? RawLinearTransition.duration(280)
    : undefined;

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
    <Animated.View
      layout={layoutTransition}
      style={[styles.container, positionStyle]}
      pointerEvents="box-none"
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      {toasts.map((item) => (
        <ToastItem
          key={item.id}
          item={item}
          position={position}
          onDismiss={dismissToast}
        />
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999,
    gap: 8,
  },
});