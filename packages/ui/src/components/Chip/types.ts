import type React from 'react';

export type ChipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

export type ChipVariant = 'solid' | 'outlined' | 'subtle';
export type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps {
  id?: string;
  label: React.ReactNode;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  clickable?: boolean;
}

export interface ChipLabelProps {
  children: React.ReactNode;
  color: string;
  fontSize: number;
  fontWeight: string | number;
}

export interface ChipAvatarProps {
  children: React.ReactNode;
  size: ChipSize;
  spacing: number;
}

export interface ChipIconProps {
  children: React.ReactNode;
  iconSize: number;
  iconColor: string;
}

export interface ChipDeleteButtonProps {
  deleteIcon?: React.ReactNode;
  onDelete: () => void;
  textColor: string;
  spacing: number;
  radius: number;
}

export interface ChipColorTokens {
  bg: string;
  text: string;
  border: string;
}
