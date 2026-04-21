import type { SemanticTokens } from '../semantic';

export function linearProgressTokens(t: SemanticTokens) {
  return {
    track: {
      height: 4,
      backgroundColor: t.color.bg.muted,
      borderRadius: t.radius.full,
      overflow: 'hidden' as const,
    },
    indicator: {
      height: '100%',
      backgroundColor: t.color.brand.default,
    },
    variant: {
      brand: { indicator: { backgroundColor: t.color.brand.default } },
      accent: { indicator: { backgroundColor: t.color.accent.default } },
      success: { indicator: { backgroundColor: t.color.success.icon } },
      error: { indicator: { backgroundColor: t.color.error.icon } },
    },
  } as const;
}
