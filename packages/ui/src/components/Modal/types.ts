import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the root Modal component.
 */
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
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Whether the modal should take up the full screen */
  fullScreen?: boolean;
}

/**
 * Props for the ModalContent sub-component.
 */
export interface ModalContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Whether the content should fill the full screen */
  fullScreen?: boolean;
  accessibilityLabel?: string;
}

/**
 * Props for the ModalHeader layout helper.
 */
export interface ModalHeaderProps {
  /** Title text or node */
  title?: React.ReactNode;
  /** Optional trailing element (e.g. close button) */
  trailing?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Props for the ModalFooter layout helper.
 */
export interface ModalFooterProps {
  children?: React.ReactNode;
}
