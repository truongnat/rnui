import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomSheet, useTokens, useComponentTokens } from "@rnui/headless";
import type { UseBottomSheetOptions, SnapPoint } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export interface BottomSheetProps extends UseBottomSheetOptions {
  children: React.ReactNode;
  /** Show the pill-shaped drag handle at top */
  showHandle?: boolean;
  /** Horizontal border radius on the sheet. If not provided, uses theme token. */
  borderRadius?: number;
}

export interface BottomSheetRef {
  open: (snapIndex?: number) => void;
  close: () => void;
  snapTo: (index: number) => void;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

// ─── Component ────────────────────────────────────────────────────

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  function BottomSheet(
    {
      children,
      snapPoints = ["50%"] as SnapPoint[],
      initialSnapIndex,
      onClose,
      onSnapChange,
      enableDismissOnSwipe = true,
      enableBackdrop = true,
      showHandle = true,
      borderRadius,
    },
    ref
  ) {
    const { bottomSheet } = useComponentTokens();
    const insets = useSafeAreaInsets();
    const [mounted, setMounted] = useState(false);

    const handleClose = React.useCallback(() => {
      setMounted(false);
      onClose?.();
    }, [onClose]);

    const {
      open: baseOpen,
      close: baseClose,
      snapTo,
      sheetAnimatedStyle,
      backdropAnimatedStyle,
      panGesture,
      backdropTapGesture,
    } = useBottomSheet({
      snapPoints,
      initialSnapIndex,
      onClose: handleClose,
      onSnapChange,
      enableDismissOnSwipe,
      enableBackdrop,
    });

    const open = React.useCallback((idx?: number) => {
      setMounted(true);
      requestAnimationFrame(() => {
        baseOpen(idx);
      });
    }, [baseOpen]);

    // Expose imperative API via ref
    useImperativeHandle(ref, () => ({ open, close: baseClose, snapTo }), [open, baseClose, snapTo]);

    return (
      <Modal visible={mounted} transparent animationType="none" onRequestClose={baseClose}>
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          {/* Backdrop */}
          {enableBackdrop && (
            <GestureDetector gesture={backdropTapGesture}>
              <Animated.View
                style={[
                  StyleSheet.absoluteFill,
                  bottomSheet.backdrop,
                  backdropAnimatedStyle,
                ] as any}
              />
            </GestureDetector>
          )}

          {/* Sheet */}
          <Animated.View
            style={[
              styles.sheet,
              bottomSheet.container,
              {
                borderTopLeftRadius: borderRadius ?? bottomSheet.container.borderTopLeftRadius,
                borderTopRightRadius: borderRadius ?? bottomSheet.container.borderTopRightRadius,
                paddingBottom: insets.bottom + 8,
              },
              sheetAnimatedStyle,
            ] as any}
          >
            {/* Drag handle area — full-width tap target */}
            <GestureDetector gesture={panGesture}>
              <View style={styles.handleArea}>
                {showHandle && (
                  <View
                    style={[
                      styles.handle,
                      bottomSheet.handle,
                    ]}
                  />
                )}
              </View>
            </GestureDetector>

            {/* Content */}
            <View style={{ flex: 1 }}>{children}</View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: SCREEN_HEIGHT,
  },
  handleArea: {
    width: "100%",
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
});