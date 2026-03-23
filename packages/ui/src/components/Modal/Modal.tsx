import React from "react";
import { Modal as RNModal, View, Pressable, StyleSheet } from "react-native";
import { useComponentTokens } from "@truongnat/headless";

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
  const { modal } = useComponentTokens();

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
      <View style={[styles.overlay, modal.overlay]}>
        {!hideBackdrop && (
          BackdropComponent ? (
            <BackdropComponent {...BackdropProps} />
          ) : (
            <Pressable
              style={[StyleSheet.absoluteFill, { backgroundColor: modal.overlay.backgroundColor }]}
              onPress={onClose}
            />
          )
        )}
        <View style={[styles.content, modal.container, contentStyle]}>
          {children}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    minWidth: 280,
    maxWidth: "90%",
  },
});
