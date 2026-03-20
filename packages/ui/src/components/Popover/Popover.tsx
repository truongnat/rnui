import React, { useMemo, useState } from "react";
import { Modal, View, Pressable, StyleSheet, Dimensions, type LayoutChangeEvent } from "react-native";
import { useTokens } from "@rnui/headless";

export type PopoverOriginVertical = "top" | "center" | "bottom" | number;
export type PopoverOriginHorizontal = "left" | "center" | "right" | number;

export interface PopoverOrigin {
  vertical: PopoverOriginVertical;
  horizontal: PopoverOriginHorizontal;
}

export interface PopoverProps {
  open: boolean;
  anchorEl?: { x: number; y: number; width?: number; height?: number } | null;
  anchorPosition?: { top: number; left: number };
  onClose?: () => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  elevation?: number;
  PaperProps?: { style?: object };
  marginThreshold?: number;
  children?: React.ReactNode;
}

const defaultOrigin: PopoverOrigin = { vertical: "bottom", horizontal: "left" };
const defaultTransform: PopoverOrigin = { vertical: "top", horizontal: "left" };

function resolveOrigin(value: PopoverOriginVertical | PopoverOriginHorizontal, size: number) {
  if (typeof value === "number") return value;
  if (value === "center") return size / 2;
  if (value === "bottom" || value === "right") return size;
  return 0;
}

export function Popover({
  open,
  anchorEl,
  anchorPosition,
  onClose,
  anchorOrigin = defaultOrigin,
  transformOrigin = defaultTransform,
  PaperProps,
  marginThreshold = 12,
  children,
}: PopoverProps) {
  const tokens = useTokens();
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  if (!open) return null;

  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const anchorX = anchorPosition?.left ?? anchorRect.x;
  const anchorY = anchorPosition?.top ?? anchorRect.y;
  const anchorWidth = anchorRect.width ?? 0;
  const anchorHeight = anchorRect.height ?? 0;

  const anchorOffsetX = resolveOrigin(anchorOrigin.horizontal, anchorWidth);
  const anchorOffsetY = resolveOrigin(anchorOrigin.vertical, anchorHeight);
  const transformOffsetX = resolveOrigin(transformOrigin.horizontal, contentSize.width);
  const transformOffsetY = resolveOrigin(transformOrigin.vertical, contentSize.height);

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const position = useMemo(() => {
    let left = anchorX + anchorOffsetX - transformOffsetX;
    let top = anchorY + anchorOffsetY - transformOffsetY;

    left = Math.max(marginThreshold, Math.min(left, screenWidth - contentSize.width - marginThreshold));
    top = Math.max(marginThreshold, Math.min(top, screenHeight - contentSize.height - marginThreshold));

    return { left, top };
  }, [anchorX, anchorY, anchorOffsetX, anchorOffsetY, transformOffsetX, transformOffsetY, contentSize, screenWidth, screenHeight, marginThreshold]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== contentSize.width || height !== contentSize.height) {
      setContentSize({ width, height });
    }
  };

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View
        onLayout={handleLayout}
        style={[
          styles.paper,
          {
            backgroundColor: tokens.color.surface.overlay,
            borderColor: tokens.color.border.default,
            shadowColor: tokens.color.text.primary,
            // Hide until measured to prevent position flash
            opacity: contentSize.width === 0 ? 0 : 1,
          },
          position,
          PaperProps?.style,
        ]}
      >
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  paper: {
    position: "absolute",
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
});
