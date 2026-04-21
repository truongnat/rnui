import type { SemanticTokens } from '../semantic';
import { inputTokens } from './input';

export function textAreaTokens(t: SemanticTokens) {
  const base = inputTokens(t);
  return {
    ...base,
    container: {
      ...base.container,
      /** Multiline: column + stretch so TextInput fills height; row/center caused overlap with sibling helper */
      flexDirection: 'column' as const,
      alignItems: 'stretch' as const,
      overflow: 'hidden' as const,
      height: 'auto',
      minHeight: 100,
      paddingVertical: t.spacing[2],
      textAlignVertical: 'top' as const,
    },
  } as const;
}
