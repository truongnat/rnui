import type { SemanticTokens } from '@truongdq01/tokens';
import { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTokens } from '../theme';

export function useMemoStyles<T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (tokens: SemanticTokens) => T
): T {
  const tokens = useTokens();

  // Ref: factory identity changes every render if inline; we only depend on `tokens`.
  const factoryRef = useRef(styleFactory);
  factoryRef.current = styleFactory;

  return useMemo(() => {
    const rawStyles = factoryRef.current(tokens);
    return StyleSheet.create(rawStyles) as T;
  }, [tokens]);
}
