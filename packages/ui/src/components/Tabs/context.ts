import { createContext, useContext } from 'react';
import type { TabsContextValue } from './types';

/**
 * Shared context that flows from Tabs (root) down to Tab, TabList, and TabPanel.
 */
export const TabsContext = createContext<TabsContextValue<any> | null>(null);

/**
 * Typed hook for consuming TabsContext.
 * Returns null when called outside of a Tabs tree (sub-components guard against this).
 */
export function useTabsContext<T = string>(): TabsContextValue<T> | null {
  return useContext(TabsContext) as TabsContextValue<T> | null;
}
