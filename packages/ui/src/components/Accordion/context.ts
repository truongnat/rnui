import type { CollapsibleGroupControl } from '@truongdq01/headless';
import { createContext } from 'react';

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
} | null>(null);

/**
 * Context for the AccordionGroup.
 * Manages the state of multiple accordions and provides shared styling/behavior.
 */
export const AccordionGroupContext = createContext<
  | (CollapsibleGroupControl & {
      /** Expansion mode: single or multiple */
      variant: 'single' | 'multiple';
      /** Whether the group is wrapped in a shared bordered container */
      bordered: boolean;
      /** Inherited corner radius for the group envelope */
      radius: number;
      /**
       * Whether items render seamlessly inside one clipped envelope (`true`)
       * or as separate rounded cards with gaps (`false`).
       */
      attached: boolean;
    })
  | null
>(null);
