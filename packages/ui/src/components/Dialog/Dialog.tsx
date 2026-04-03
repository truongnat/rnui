import React from "react";
import { Modal, View, Pressable, StyleSheet, Text } from "react-native";
import { useComponentTokens, useTokens } from "@truongdq01/headless";

export interface DialogProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  fullWidth?: boolean;
  /** Accessibility label for the dialog container */
  accessibilityLabel?: string;
  /** Accessibility label for the backdrop dismiss button */
  backdropAccessibilityLabel?: string;
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  fullWidth = false,
  accessibilityLabel = "Dialog",
  backdropAccessibilityLabel = "Dismiss dialog",
}: DialogProps) {
  const { dialog, modal } = useComponentTokens();
  const tokens = useTokens();

  if (!open) return null;

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <View style={modal.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={backdropAccessibilityLabel}
          accessibilityHint="Closes the dialog"
        />
        <View
          accessibilityViewIsModal
          accessibilityRole="none"
          accessibilityLabel={accessibilityLabel}
          style={[
            modal.container,
            {
              padding: tokens.spacing[6],
              width: fullWidth ? "90%" : "80%",
            },
          ] as any}
        >
          {title && (
            <View style={{ marginBottom: tokens.spacing[4] }}>
              {typeof title === "string" ? (
                <Text style={{ fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold, color: tokens.color.text.primary }}>
                  {title}
                </Text>
              ) : title}
            </View>
          )}
          <View style={{ marginBottom: actions ? tokens.spacing[6] : 0 }}>
            {children}
          </View>
          {actions && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: tokens.spacing[2] }}>
              {actions}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
