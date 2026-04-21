import { useId, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { AnimatedOverlay } from '../AnimatedOverlay';
import { Typography } from '../Typography';

/**
 * Props for the Dialog component
 */
export interface DialogProps {
  /** Unique identifier for the dialog */
  id?: string;
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
  id: idProp,
  open,
  onClose,
  title,
  children,
  actions,
  fullWidth = false,
  accessibilityLabel = 'Dialog',
  backdropAccessibilityLabel = 'Dismiss dialog',
}: DialogProps) {
  const id = useId(idProp, 'dialog');
  const {
    components: { dialog, modal },
    tokens,
  } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
      }),
    [tokens]
  );

  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const overlayStyle = useMemo(() => {
    // Keep the modal mounted for exit animation, but hide the dimmed backdrop immediately on close.
    // This avoids a perceived "delay" where the screen looks blocked until the animation ends.
    return [
      modal.overlay,
      !open && { backgroundColor: 'transparent' },
    ];
  }, [modal.overlay, open]);

  if (!mounted) return null;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      {/* Static dimmed background (no animation) */}
      <View style={overlayStyle} pointerEvents={open ? 'auto' : 'none'}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={backdropAccessibilityLabel}
          accessibilityHint="Closes the dialog"
          importantForAccessibility="no-hide-descendants"
        />

        {/* Animated surface only (backdrop remains static) */}
        <AnimatedOverlay
          visible={open}
          animationType="scale"
          useSpring
          duration={220}
          showBackdrop={false}
          onAnimationEnd={(entering) => {
            if (!entering) setMounted(false);
          }}
        >
          <View
            nativeID={id}
            accessibilityViewIsModal
            accessibilityRole="none"
            accessibilityLabel={accessibilityLabel}
            style={[
              modal.container,
              {
                padding: tokens.spacing[6],
                width: fullWidth ? '90%' : '80%',
                maxWidth: '92%',
                alignSelf: 'center',
              },
            ]}
          >
            {title && (
              <View style={[styles.titleContainer, { width: '100%' }]}>
                {typeof title === 'string' ? (
                  <Typography
                    id={`${id}-title`}
                    variant="h5"
                    as="h2"
                    style={[dialog.title, { width: '100%' }]}
                  >
                    {title}
                  </Typography>
                ) : (
                  title
                )}
              </View>
            )}
            <View
              nativeID={`${id}-content`}
              style={[
                styles.contentContainer,
                { width: '100%' },
                actions
                  ? styles.contentWithActions
                  : styles.contentWithoutActions,
              ]}
            >
              {children}
            </View>
            {actions && (
              <View
                nativeID={`${id}-actions`}
                style={[
                  dialog.actions,
                  { width: '100%', flexWrap: 'wrap' },
                ]}
              >
                {actions}
              </View>
            )}
          </View>
        </AnimatedOverlay>
      </View>
    </Modal>
  );
}
