import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../Button';
import { Dialog, type DialogProps } from '../Dialog';
import { Typography } from '../Typography';

/**
 * Props for the AlertDialog component
 */
export interface AlertDialogProps extends Omit<DialogProps, 'actions' | 'title'> {
  /** Alert title string */
  title: string;
  /** Alert description/message */
  description?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Button variant for cancel action */
  cancelVariant?: 'solid' | 'outline' | 'ghost';
  /** Button variant for confirm action */
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
 *
 * Action button layout:
 * - With cancel button: a flex row, each button gets flex:1 (equal width).
 *   If button text is long it wraps inside the button naturally.
 * - Without cancel button: single button fills full width.
 *
 * @param props - AlertDialog configuration props
 * @returns React alert dialog component
 */
export function AlertDialog({
  id: idProp,
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
  const id = useId(idProp, 'alert-dialog');
  const {
    tokens,
    components: { dialog },
  } = useTheme();

  const finalConfirmVariant = useMemo(
    () => confirmVariant ?? (destructive ? 'destructive' : 'solid'),
    [confirmVariant, destructive]
  );

  const actionsNode = useMemo(() => {
    // Single action — fill the full width
    if (!onCancel) {
      return (
        <Button
          id={`${id}-confirm`}
          variant={finalConfirmVariant}
          onPress={onConfirm}
          style={styles.fullWidth}
        >
          {confirmText}
        </Button>
      );
    }

    // Two actions — a simple flex row, equal width, text wraps inside when long
    return (
      <View style={[styles.row, { gap: tokens.spacing[3] }]}>
        <Button
          id={`${id}-cancel`}
          variant={cancelVariant}
          onPress={onCancel}
          style={styles.flex}
        >
          {cancelText}
        </Button>
        <Button
          id={`${id}-confirm`}
          variant={finalConfirmVariant}
          onPress={onConfirm}
          style={styles.flex}
        >
          {confirmText}
        </Button>
      </View>
    );
  }, [
    id,
    confirmText,
    cancelText,
    finalConfirmVariant,
    cancelVariant,
    onConfirm,
    onCancel,
    tokens.spacing,
  ]);

  return (
    <Dialog {...dialogProps} id={id} title={title} actions={actionsNode}>
      {description && (
        <Typography
          id={`${id}-description`}
          variant="body2"
          style={[dialog.content, { marginTop: tokens.spacing[2] }]}
        >
          {description}
        </Typography>
      )}
    </Dialog>
  );
}

const styles = StyleSheet.create({
  /** Two-button row: each button takes equal width, text wraps inside when long */
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  /** Each button in the row grows to fill its half */
  flex: {
    flex: 1,
  },
  /** Single-button mode */
  fullWidth: {
    width: '100%',
  },
});