import { createContext, useContext } from 'react';
import type { ListContextValue } from './types';

/**
 * Context providing List configuration (dense, disablePadding)
 * to all descendant ListItem and ListItemContent components.
 */
export const ListContext = createContext<ListContextValue | null>(null);

export function useListContext(): ListContextValue | null {
  return useContext(ListContext);
}
