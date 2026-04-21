import type React from 'react';

export interface MenuProps {
  open: boolean;
  onClose?: () => void;
  anchorEl?: {
    pageX: number;
    pageY: number;
    width: number;
    height: number;
  } | null;
  children?: React.ReactNode;
}

export interface MenuItemProps {
  children?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  destructive?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export interface MenuDividerProps {
  style?: object;
}

export interface MenuGroupProps {
  title?: string;
  children?: React.ReactNode;
}
