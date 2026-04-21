import type React from 'react';

export interface SnackbarAnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export interface SnackbarProps {
  /** If true, the snackbar is shown */
  open: boolean;
  /** The message to display */
  message: React.ReactNode;
  /** Duration in ms before auto-hiding. Use null to disable. */
  autoHideDuration?: number | null;
  /** Callback on close */
  onClose?: () => void;
  /** Action element (e.g. Button) */
  action?: React.ReactNode;
  /** Position on screen */
  anchorOrigin?: SnackbarAnchorOrigin;
}

export interface SnackbarContentProps {
  message: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  textColor: string;
}

export interface SnackbarIconProps {
  color: string;
  onClose: () => void;
}
