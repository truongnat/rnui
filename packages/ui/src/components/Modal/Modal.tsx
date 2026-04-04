import React from 'react';
import {
  Modal as RNModal,
  View,
  Pressable,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useComponentTokens } from '@truongdq01/headless';

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  keepMounted?: boolean;
  hideBackdrop?: boolean;
  disableAutoFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  /** Accessibility label for the modal content container */
  accessibilityLabel?: string;
  /** Accessibility label for the backdrop dismiss button */
  backdropAccessibilityLabel?: string;
  BackdropComponent?: React.ComponentType<any>;
  BackdropProps?: object;
  contentStyle?: StyleProp<ViewStyle>;
}

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
        {!hideBackdrop &&
          (BackdropComponent ? (
            (() => {
              const el = <BackdropComponent {...BackdropProps} />;
              return React.isValidElement(el)
                ? React.cloneElement(el as any, { collapsable: false })
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
        <View
          accessibilityViewIsModal
          accessibilityRole="none"
          accessibilityLabel={accessibilityLabel}
          style={[styles.content, modal.container, contentStyle]}
        >
          {children}
        </View>
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
  content: {
    minWidth: 280,
    maxWidth: '90%',
  },
});
