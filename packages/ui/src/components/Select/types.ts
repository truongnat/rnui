import type { SelectOption, UseSelectOptions } from '@truongdq01/headless';
import type React from 'react';

/**
 * A single option entry in the Select list.
 */
export type SelectOptionType<T = string> = SelectOption<T>;

/**
 * Props for the root Select component.
 */
export interface SelectProps<T = string> extends UseSelectOptions<T> {
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  error?: string;
  onClearError?: () => void;
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  renderOption?: (
    option: SelectOption<T>,
    ctx: { selected: boolean }
  ) => React.ReactNode;
  id?: string;
}

/**
 * Props for the SelectTrigger sub-component.
 */
export interface SelectTriggerProps {
  id: string;
  displayLabel: string;
  placeholder: string;
  isOpen: boolean;
  error?: string;
  label?: string;
  onPress: () => void;
  accessibilityLabel: string;
}

/**
 * Props for the SelectDropdown sub-component.
 */
export interface SelectDropdownProps<T = string> {
  sheetRef: React.RefObject<any>;
  searchable: boolean;
  options: SelectOption<T>[];
  isOpen: boolean;
  loading: boolean;
  loadingMore: boolean;
  filtered: SelectOption<T>[];
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
  onEndReached: () => void;
  renderItem: (info: { item: SelectOption<T> }) => React.ReactElement | null;
  listEmpty: React.ReactNode;
  accessibilityLabel: string;
}

/**
 * Props for the SelectOption sub-component.
 */
export interface SelectOptionProps<T = string> {
  option: SelectOption<T>;
  selected: boolean;
  onSelect: (value: T) => void;
  renderOption?: (
    option: SelectOption<T>,
    ctx: { selected: boolean }
  ) => React.ReactNode;
}

/**
 * Props for the SelectPlaceholder sub-component.
 */
export interface SelectPlaceholderProps {
  loading: boolean;
  query: string;
  optionCount: number;
}
