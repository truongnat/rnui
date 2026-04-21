import type React from 'react';
import type { ViewStyle } from 'react-native';

export interface AppBarProps {
  children?: React.ReactNode;
  color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent';
  variant?: 'elevation' | 'outlined';
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
  elevation?: 0 | 1 | 2 | 3 | 4;
  style?: ViewStyle | ViewStyle[];
}

export interface ToolbarProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export interface AppBarTitleProps {
  children?: React.ReactNode;
  subtitle?: string;
  style?: ViewStyle | ViewStyle[];
}

export interface AppBarLeadingProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export interface AppBarTrailingProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}
