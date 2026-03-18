import React from "react";
import { Modal as RNModal, View, Pressable, StyleSheet } from "react-native";
import { useTokens } from "@rnui/headless";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  keepMounted?: boolean;
  hideBackdrop?: boolean;
  disableAutoFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  BackdropComponent?: React.ComponentType<any>;
  BackdropProps?: object;
  contentStyle?: object;
}

export function Modal({
  open,
  onClose,
  children,
  keepMounted = false,
  hideBackdrop = false,
  disableEscapeKeyDown = false,
  BackdropComponent,
  BackdropProps,
  contentStyle,
}: ModalProps) {
  const tokens = useTokens();

  if (!open && !keepMounted) return null;

  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={handleRequestClose}
    >
      <View style={styles.container}>
        {!hideBackdrop && (
          BackdropComponent ? (
            <BackdropComponent {...BackdropProps} />
          ) : (
            <Pressable
              style={[StyleSheet.absoluteFill, { backgroundColor: tokens.color.bg.overlay }]}
              onPress={onClose}
            />
          )
        )}
        <View style={[styles.content, { backgroundColor: tokens.color.surface.overlay }, contentStyle]}>
          {children}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    minWidth: 280,
    maxWidth: "90%",
    borderRadius: 16,
    padding: 16,
  },
});
