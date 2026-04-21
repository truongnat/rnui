import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the main Accordion item component.
 */
export interface AccordionProps {
  /** Unique identifier for the accordion within a group */
  id?: string;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Initial expansion state when uncontrolled */
  defaultExpanded?: boolean;
  /** Whether the component is interactive */
  disabled?: boolean;
  /** Callback fired when expansion state changes */
  onChange?: (expanded: boolean) => void;
  /** Content nodes */
  children?: React.ReactNode;
  /** Whether the accordion has a border. Defaults to true. */
  bordered?: boolean;
  /** Custom corner radius for the individual accordion */
  radius?: number;
  /** Style for the accordion container */
  style?: StyleProp<ViewStyle>;
  /** @internal Indicates if the item is first in its group */
  isFirst?: boolean;
  /** @internal Indicates if the item is last in its group */
  isLast?: boolean;
}

/**
 * Props for the AccordionGroup component.
 */
export interface AccordionGroupProps {
  /** Unique identifier for the accordion group */
  id?: string;
  /** Array of Accordion children */
  children?: React.ReactNode;
  /** How many items can be expanded at once */
  variant?: 'single' | 'multiple';
  /** Array of IDs for currently expanded accordions (controlled) */
  expandedIds?: string[];
  /** IDs of accordions to expand by default (uncontrolled) */
  defaultExpandedIds?: string[];
  /** Callback fired when individual accordions are toggled */
  onChange?: (ids: string[]) => void;
  /** Whether the entire group is enclosed in a bordered container */
  bordered?: boolean;
  /** Custom corner radius for the group container and inherited by items */
  radius?: number;
  /** Style for the group container */
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for the AccordionSummary component.
 */
export interface AccordionSummaryProps {
  /** Summary text or nodes */
  children?: React.ReactNode;
  /** Custom icon to display on the right, rotates automatically */
  expandIcon?: React.ReactNode;
}

/**
 * Props for the AccordionDetails component.
 */
export interface AccordionDetailsProps {
  /** Collapsible content nodes */
  children?: React.ReactNode;
}

/**
 * Props for the AccordionActions component.
 */
export interface AccordionActionsProps {
  /** Action buttons or nodes shown at the bottom when expanded */
  children?: React.ReactNode;
}
