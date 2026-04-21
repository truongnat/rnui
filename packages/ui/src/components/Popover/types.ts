import type React from 'react';
import type { LayoutChangeEvent } from 'react-native';

export type PopoverOriginVertical = 'top' | 'center' | 'bottom' | number;
export type PopoverOriginHorizontal = 'left' | 'center' | 'right' | number;

export interface PopoverOrigin {
  vertical: PopoverOriginVertical;
  horizontal: PopoverOriginHorizontal;
}

export interface PopoverProps {
  open: boolean;
  anchorEl?: { x: number; y: number; width?: number; height?: number } | null;
  anchorPosition?: { top: number; left: number };
  onClose?: () => void;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  elevation?: number;
  PaperProps?: { style?: object };
  marginThreshold?: number;
  children?: React.ReactNode;
}

export interface PopoverContentProps {
  children?: React.ReactNode;
  top: number;
  left: number;
  visible: boolean;
  paperStyle?: object;
  onLayout: (e: LayoutChangeEvent) => void;
}

export interface PopoverArrowProps {
  direction: 'up' | 'down' | 'left' | 'right';
  color: string;
}
