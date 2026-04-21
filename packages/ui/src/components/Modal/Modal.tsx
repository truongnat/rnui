import { useTheme } from '@truongdq01/headless';
import React from 'react';
import {
  Pressable,
  Modal as RNModal,
  StyleSheet,
  View,
} from 'react-native';
import { ModalContent } from './ModalContent';
import type { ModalProps } from './types';

export { ModalContent } from './ModalContent';
export { ModalFooter } from './ModalFooter';
export { ModalHeader } from './ModalHeader';

/**
 * Modal — accessible overlay dialog built on React Native's Modal primitive.
 *
 * Renders a pressable backdrop (or a custom BackdropComponent) and a centered
 * ModalContent container. Supports full-screen and keep-mounted modes.
 */
export function Modal({
  open,
  onClose,
  children,
  keepMounted = false,
  hideBackdrop = false,
  disableEscapeKeyDown = false,
  accessibilityLabel = 'Modal',
  backdropAccessibilityLabel = 'Dismiss modal',
  BackdropComponent,
  BackdropProps,
  contentContainerStyle,
  fullScreen = false,
}: ModalProps) {
  const {
    components: { modal },
  } = useTheme();

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
        {!hideBackdrop &&
          (BackdropComponent ? (
            (() => {
              const el = <BackdropComponent {...BackdropProps} />;
              return React.isValidElement(el)
                ? React.cloneElement(el as React.ReactElement<any>, {
                    collapsable: false,
                  })
                : el;
            })()
          ) : (
            <Pressable
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: modal.overlay.backgroundColor },
              ]}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={backdropAccessibilityLabel}
              accessibilityHint="Closes the modal"
            />
          ))}

        <ModalContent
          fullScreen={fullScreen}
          style={contentContainerStyle}
          accessibilityLabel={accessibilityLabel}
        >
          {children}
        </ModalContent>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
