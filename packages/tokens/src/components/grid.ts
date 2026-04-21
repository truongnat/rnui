import type { SemanticTokens } from '../semantic';

export function gridTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
    },
    gap: {
      sm: t.spacing[2],
      md: t.spacing[4],
      lg: t.spacing[6],
    },
  } as const;
}
