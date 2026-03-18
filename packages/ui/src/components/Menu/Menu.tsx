import React from "react";
import { Modal, View, Pressable, Text } from "react-native";
import { useTokens } from "@rnui/headless";

export interface MenuProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface MenuItemProps {
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function Menu({ open, onClose, children }: MenuProps) {
  const tokens = useTokens();

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }} onPress={onClose} />
      <View
        style={{
          position: "absolute",
          top: 80,
          right: 24,
          minWidth: 180,
          backgroundColor: tokens.color.surface.default,
          borderRadius: tokens.radius.md,
          borderWidth: 1,
          borderColor: tokens.color.border.default,
          overflow: "hidden",
          ...tokens.shadow.md,
        }}
      >
        {children}
      </View>
    </Modal>
  );
}

export function MenuItem({ children, onPress, disabled = false, selected = false }: MenuItemProps) {
  const tokens = useTokens();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        backgroundColor: selected ? tokens.color.brand.subtle : "transparent",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text style={{ color: tokens.color.text.primary, fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular }}>
        {children}
      </Text>
    </Pressable>
  );
}
