import type React from 'react';

export type TooltipPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: TooltipPlacement;
}

export interface TriggerRect {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

export interface TooltipContentProps {
  title: React.ReactNode;
  top: number;
  left: number;
  animStyle: object;
  onLayout: (e: import('react-native').LayoutChangeEvent) => void;
}

export interface TooltipArrowProps {
  placement: TooltipPlacement;
  color: string;
}
