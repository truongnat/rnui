import type { SemanticTokens } from '../semantic';

export function stackTokens(t: SemanticTokens) {
  return {
    gap: {
      xs: t.spacing[1],
      sm: t.spacing[2],
      md: t.spacing[4],
      lg: t.spacing[6],
      xl: t.spacing[8],
    },
  } as const;
}
