import { createContext, useContext, type ReactNode } from 'react';

export interface BreadcrumbContextValue {
  separator: ReactNode;
}

export const BreadcrumbContext = createContext<BreadcrumbContextValue>({
  separator: '/',
});

export function useBreadcrumbContext(): BreadcrumbContextValue {
  return useContext(BreadcrumbContext);
}
