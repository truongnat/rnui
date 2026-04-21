import type { SemanticTokens } from '../semantic';

export function carouselTokens(t: SemanticTokens) {
  return {
    dot: {
      active: { bg: t.color.brand.default, width: 20 },
      inactive: { bg: t.color.brand.default, width: 8, opacity: 0.3 },
      height: 8,
      borderRadius: 4,
    },
    pagination: {
      marginTop: t.spacing[4],
      gap: 6,
    },
  } as const;
}
