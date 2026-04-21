import type {
  Brand,
  ComponentTokens,
  SemanticTokens,
} from '@truongdq01/tokens';
import { useContext, useMemo } from 'react';
import { ThemeContext } from './context';
import type { Theme } from './types';

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      '[RNUI] useTheme must be used inside <ThemeProvider>. ' +
        'Wrap your app root with <ThemeProvider>.'
    );
  }
  return ctx;
}

export function useTokens(): SemanticTokens {
  return useTheme().tokens;
}

export function useTokenSelector<T>(
  selector: (tokens: SemanticTokens) => T
): T {
  const tokens = useTokens();
  return useMemo(() => selector(tokens), [tokens, selector]);
}

export function useComponentTokens(): ComponentTokens {
  return useTheme().components;
}

export function useIsDark(): boolean {
  return useTheme().colorScheme === 'dark';
}

export function useActiveBrand(): Brand | undefined {
  return useTheme().brand;
}

export function useBrandSwitch(): (brand: Brand | undefined) => void {
  return useTheme().setBrand;
}
