import type { SemanticTokens } from '../semantic';

export function animatedListTokens(t: SemanticTokens) {
  return {
    container: {
      flex: 1,
    },
    item: {
      paddingVertical: t.spacing[2],
    },
  } as const;
}
