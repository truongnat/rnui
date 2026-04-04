import React, { useMemo } from "react";
import { Modal, View, Pressable, StyleSheet } from "react-native";
import { useComponentTokens, useTokens } from "@truongdq01/headless";
import { Typography } from "../Typography";
import { AnimatedOverlay } from "../AnimatedOverlay";

/**
 * Props for the Dialog component
 */
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

/**
 * Dialog component that displays modal content with backdrop and accessibility support.
 *
 * @param props - Dialog configuration props
 * @returns React element or null if not open
 *
 * @example
 * ```tsx
 * <Dialog
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <Text>Are you sure?</Text>
 * </Dialog>
 * ```
 */
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

  const styles = useMemo(() => StyleSheet.create({
    titleContainer: {
      marginBottom: tokens.spacing[4],
    },
    contentContainer: {},
    contentWithActions: {
      marginBottom: tokens.spacing[6],
    },
    contentWithoutActions: {
      marginBottom: tokens.spacing[2],
    },
  }), [tokens]);

  if (!open) return null;

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose}>
      <AnimatedOverlay visible={open} animationType="scale">
        <View style={modal.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={backdropAccessibilityLabel}
            accessibilityHint="Closes the dialog"
            importantForAccessibility="no-hide-descendants"
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
              <View style={styles.titleContainer}>
                {typeof title === "string" ? (
                  <Typography variant="h5" as="h2" style={dialog.title}>
                    {title}
                  </Typography>
                ) : title}
              </View>
            )}
            <View style={[styles.contentContainer, actions ? styles.contentWithActions : styles.contentWithoutActions]}>
              {children}
            </View>
            {actions && (
              <View style={dialog.actions}>
                {actions}
              </View>
            )}
          </View>
        </View>
      </AnimatedOverlay>
    </Modal>
  );
}


