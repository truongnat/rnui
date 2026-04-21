import type { SemanticTokens } from '../semantic';

export function fabTokens(t: SemanticTokens) {
  return {
    container: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...t.shadow.lg,
    },
    size: {
      sm: { width: 40, height: 40, borderRadius: 20 },
      md: { width: 56, height: 56, borderRadius: 28 },
      lg: { width: 72, height: 72, borderRadius: 36 },
    },
    color: {
      primary: { bg: t.color.brand.default, text: t.color.text.inverse },
      secondary: { bg: t.color.surface.raised, text: t.color.brand.default },
    },
  };
}
