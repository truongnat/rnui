import { useTheme } from '@truongdq01/headless';
import React, { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  Modal as RNModal,
  StyleSheet,
  View,
} from 'react-native';
import {
  getOverlayKeyboardBehavior,
  overlayHostStyles,
  useOverlayHostPadding,
} from '../AnimatedOverlay/overlayHostLayout';
import { AnimatedOverlay } from '../AnimatedOverlay';
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

  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const hostPadding = useOverlayHostPadding(modal.hostInset, fullScreen);
  const keyboardBehavior = getOverlayKeyboardBehavior();

  const hostStyle = useMemo(
    () => [overlayHostStyles.host, hostPadding],
    [hostPadding]
  );

  if (!mounted && !keepMounted) return null;

  const handleRequestClose = () => {
    if (!disableEscapeKeyDown) {
      onClose?.();
    }
  };

  const handleAnimationEnd = (entering: boolean) => {
    if (!entering && !keepMounted) {
      setMounted(false);
    }
  };

  return (
    <RNModal
      visible={mounted || keepMounted}
      transparent
      animationType="none"
      onRequestClose={handleRequestClose}
    >
      <View style={overlayHostStyles.overlayRoot}>
        {!hideBackdrop &&
          (BackdropComponent ? (
            (() => {
              const el = <BackdropComponent {...BackdropProps} />;
              return React.isValidElement(el)
                ? React.cloneElement(
                    el as React.ReactElement<{ collapsable?: boolean }>,
                    {
                      collapsable: false,
                    }
                  )
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

        <AnimatedOverlay
          visible={open}
          animationType="scale"
          showBackdrop={false}
          onAnimationEnd={handleAnimationEnd}
        >
          <KeyboardAvoidingView
            style={hostStyle}
            behavior={keyboardBehavior}
            pointerEvents="box-none"
          >
            <ModalContent
              fullScreen={fullScreen}
              style={contentContainerStyle}
              accessibilityLabel={accessibilityLabel}
            >
              {children}
            </ModalContent>
          </KeyboardAvoidingView>
        </AnimatedOverlay>
      </View>
    </RNModal>
  );
}
