import type { ColorScheme } from '@truongdq01/tokens';
import { createContext, useContext } from 'react';

export interface DemoThemeContextValue {
  schemePreference: ColorScheme | 'system';
  setSchemePreference: (scheme: ColorScheme | 'system') => void;
}

export const DemoThemeContext = createContext<DemoThemeContextValue | null>(
  null
);

export function useDemoThemePreference(): DemoThemeContextValue {
  const ctx = useContext(DemoThemeContext);
  if (!ctx) {
    throw new Error(
      '[RNUI Example] useDemoThemePreference must be used inside DemoThemeContext.Provider'
    );
  }
  return ctx;
}
