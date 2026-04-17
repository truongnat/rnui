import React, { useMemo } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTokens } from '@truongdq01/headless';
import { type SemanticTokens } from '@truongdq01/tokens';
import { Dialog, DialogProps } from '../Dialog';
import { Button } from '../Button';

/**
 * Props for the AlertDialog component
 */
export interface AlertDialogProps extends Omit<DialogProps, 'actions'> {
  /** Alert title */
  title: string;
  /** Alert description/message */
  description?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button text */
  confirmText?: string;
  /** @experimental Overrides defeat auto-logic */
  cancelVariant?: 'solid' | 'outline' | 'ghost';
  /** @experimental Overrides defeat auto-logic */
  confirmVariant?: 'solid' | 'outline' | 'ghost' | 'destructive';
  /** Called when cancel is pressed */
  onCancel?: () => void;
  /** Called when confirm is pressed */
  onConfirm?: () => void;
  /** Whether the confirm action is destructive */
  destructive?: boolean;
}

/**
 * AlertDialog component for confirmation dialogs and alerts.
 * Provides a standardized alert interface with cancel/confirm actions.
 *
 * @param props - AlertDialog configuration props
 * @returns React alert dialog component
 *
 * @example
 * ```tsx
 * <AlertDialog
 *   open={isOpen}
 *   title="Delete Item"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   onConfirm={handleDelete}
 *   onCancel={() => setIsOpen(false)}
 *   destructive={true}
 * />
 * ```
 */
export function AlertDialog({
  title,
  description,
  cancelText = 'Cancel',
  confirmText = 'OK',
  cancelVariant = 'outline',
  confirmVariant,
  onCancel,
  onConfirm,
  destructive = false,
  ...dialogProps
}: AlertDialogProps) {
  const tokens = useTokens();

  const finalConfirmVariant =
    confirmVariant ?? (destructive ? 'destructive' : 'solid');

  const actions = useMemo(
    () => (
      <>
        {onCancel && (
          <Button variant={cancelVariant} onPress={onCancel}>
            {cancelText}
          </Button>
        )}
        <Button variant={finalConfirmVariant} onPress={onConfirm}>
          {confirmText}
        </Button>
      </>
    ),
    [
      cancelText,
      cancelVariant,
      confirmText,
      finalConfirmVariant,
      onCancel,
      onConfirm,
    ]
  );

  return (
    <Dialog {...dialogProps} title={title} actions={actions}>
      {description && (
        <Text
          style={[
            styles.description(tokens),
            { color: tokens.color.text.secondary },
          ]}
        >
          {description}
        </Text>
      )}
    </Dialog>
  );
}

const styles = {
  description: (tokens: SemanticTokens) => ({ marginTop: tokens.spacing[2] }),
};
