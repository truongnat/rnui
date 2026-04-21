import type React from 'react';

/**
 * Props for the root Tabs component (context provider + container).
 */
export interface TabsProps<T = string> {
  /** Optional ID forwarded to the container view. */
  id?: string;
  /** Controlled active tab value. */
  value?: T;
  /** Initial active tab value (uncontrolled). */
  defaultValue?: T;
  /** Callback fired when the active tab changes. */
  onChange?: (value: T) => void;
  /** Visual layout variant. */
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  /** Whether to center the tab list horizontally. */
  centered?: boolean;
  /** Axis the tabs are laid out on. */
  orientation?: 'horizontal' | 'vertical';
  /** Tab list and panel children. */
  children?: React.ReactNode;
}

/**
 * Props for an individual Tab button.
 */
export interface TabProps<T = string> {
  /** Optional ID forwarded to the pressable. */
  id?: string;
  /** Value that identifies this tab. */
  value: T;
  /** Text label rendered inside the button. */
  label?: string;
  /** Leading icon node. */
  icon?: React.ReactNode;
  /** Whether the tab is non-interactive. */
  disabled?: boolean;
}

/**
 * Props for a TabPanel (content region paired with a tab value).
 */
export interface TabPanelProps<T = string> {
  /** The tab value this panel is associated with. */
  value: T;
  /** Panel content — rendered only when this panel is active. */
  children?: React.ReactNode;
}

/**
 * Props for the TabList container (scrollable tab bar wrapper).
 */
export interface TabListProps {
  /** Tab button children. */
  children?: React.ReactNode;
}

/**
 * Shape of the value stored in TabsContext.
 */
export interface TabsContextValue<T = string> {
  getTabProps: (
    value: T,
    disabled?: boolean
  ) => {
    onPress: () => void;
    accessibilityRole: 'tab';
    accessibilityState: { selected: boolean; disabled: boolean };
  };
  isSelected: (value: T) => boolean;
  orientation: 'horizontal' | 'vertical';
  variant: 'standard' | 'scrollable' | 'fullWidth';
  centered: boolean;
}
