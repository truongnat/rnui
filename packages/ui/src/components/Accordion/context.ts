import { createContext } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Context for the individual Accordion item.
 * Provides expansion state and toggling logic to Accordion children (Summary, Details, Actions).
 */
export const AccordionContext = createContext<{
  /** Current expansion state */
  expanded: boolean;
  /** Function to toggle expansion */
  toggle: () => void;
  /** Whether interaction is disabled */
  disabled: boolean;
  /** Position information within a group */
  isFirst: boolean;
  /** Position information within a group */
  isLast: boolean;
} | null>(null);

/**
 * Context for the AccordionGroup.
 * Manages the state of multiple accordions and provides shared styling/behavior.
 */
export const AccordionGroupContext = createContext<{
  /** Check if a specific accordion ID is expanded */
  isExpanded: (id: string) => boolean;
  /** Toggle the expansion state of a specific accordion by ID */
  toggleId: (id: string) => void;
  /** Expansion mode: single or multiple */
  variant: 'single' | 'multiple';
  /** Whether the group has a shared border */
  bordered: boolean;
  /** Inherited corner radius for items */
  radius?: number;
  /** Whether items are currently inside a group */
  inGroup: boolean;
  /** Group container styles for reference by items */
  groupStyle?: StyleProp<ViewStyle>;
} | null>(null);
