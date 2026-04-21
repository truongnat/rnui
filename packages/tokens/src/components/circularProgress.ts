import type { SemanticTokens } from '../semantic';

export function circularProgressTokens(t: SemanticTokens) {
  return {
    color: t.color.brand.default,
    trackColor: t.color.bg.muted,
    size: {
      sm: 24,
      md: 40,
      lg: 56,
    },
    thickness: {
      sm: 2,
      md: 4,
      lg: 6,
    },
  } as const;
}
