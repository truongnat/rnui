import { createContext, useContext } from 'react';

export type SchemePreference = 'light' | 'dark' | 'system';

export interface DemoThemeContextValue {
  schemePreference: SchemePreference;
  setSchemePreference: (scheme: SchemePreference) => void;
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
