import React from 'react';

/** The edge from which the drawer slides in. */
export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';

/**
 * Props for the root Drawer component.
 */
export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  anchor?: DrawerAnchor;
  children?: React.ReactNode;
  /** Accessibility label for the drawer container */
  accessibilityLabel?: string;
  /** Accessibility label for the backdrop dismiss button */
  backdropAccessibilityLabel?: string;
}

/**
 * Props for the DrawerBackdrop sub-component.
 */
export interface DrawerBackdropProps {
  /** Animated style driving backdrop opacity */
  animatedStyle: object;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/**
 * Props for the DrawerContent sub-component.
 */
export interface DrawerContentProps {
  children?: React.ReactNode;
  /** Animated style driving panel translation */
  animatedStyle: object;
  /** Absolute position style for the panel */
  containerStyle: object;
  accessibilityLabel?: string;
}

/**
 * Props for the DrawerHeader layout helper.
 */
export interface DrawerHeaderProps {
  /** Title text or node */
  title?: React.ReactNode;
  /** Optional trailing element (e.g. close icon) */
  trailing?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * Props for the DrawerFooter layout helper.
 */
export interface DrawerFooterProps {
  children?: React.ReactNode;
}
