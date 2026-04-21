import type React from 'react';
import type {
  ListRenderItem,
  StyleProp,
  ViewStyle,
} from 'react-native';

/**
 * Internal context value shared from List root to child components.
 */
export interface ListContextValue {
  dense?: boolean;
  disablePadding?: boolean;
}

export interface ListProps {
  id?: string;
  children?: React.ReactNode;
  dense?: boolean;
  disablePadding?: boolean;
  subheader?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export interface ListItemProps {
  id?: string;
  children?: React.ReactNode;
  label?: string;
  secondaryAction?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  divider?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface ListItemContentProps {
  id?: string;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
}

export interface ListItemLeadingProps {
  id?: string;
  children: React.ReactNode;
}

export interface ListItemTrailingProps {
  id?: string;
  children: React.ReactNode;
}

export interface ListDividerProps {
  inset?: boolean;
}

export interface ListSubheaderProps {
  id?: string;
  children: React.ReactNode;
}

export interface ListDataProps<T> extends Omit<ListProps, 'children'> {
  id?: string;
  data: T[];
  renderItem: ListRenderItem<T>;
  estimatedItemSize: number;
  keyExtractor?: (item: T, index: number) => string;
}

/** @deprecated Use ListItemContent instead */
export type ListItemTextProps = ListItemContentProps;

/** @deprecated Use ListItemLeading instead */
export interface ListItemIconProps {
  id?: string;
  children: React.ReactNode;
}
