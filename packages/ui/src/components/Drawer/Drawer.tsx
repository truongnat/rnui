import React from "react";
import { Modal, View, Pressable, type ViewStyle, Dimensions } from "react-native";
import { useTokens } from "@rnui/headless";

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  variant?: "temporary" | "persistent" | "permanent";
  width?: number;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function Drawer({
  open,
  onClose,
  anchor = "left",
  variant = "temporary",
  width = Math.min(320, Dimensions.get("window").width * 0.8),
  children,
  style,
}: DrawerProps) {
  const tokens = useTokens();

  if (variant === "permanent") {
    return (
      <View
        style={[
          {
            width,
            backgroundColor: tokens.color.surface.default,
            borderRightWidth: anchor === "left" ? 1 : 0,
            borderLeftWidth: anchor === "right" ? 1 : 0,
            borderColor: tokens.color.border.default,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1, flexDirection: anchor === "right" ? "row-reverse" : "row" }}>
        <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)" }} onPress={onClose} />
        <View
          style={[
            {
              width,
              backgroundColor: tokens.color.surface.default,
              borderRightWidth: anchor === "left" ? 1 : 0,
              borderLeftWidth: anchor === "right" ? 1 : 0,
              borderColor: tokens.color.border.default,
            },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}
