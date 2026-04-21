import type { SemanticTokens } from '../semantic';

export function avatarTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.bg.muted,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    size: {
      xs: { width: 24, height: 24, borderRadius: 12, fontSize: t.fontSize.xs },
      sm: { width: 32, height: 32, borderRadius: 16, fontSize: t.fontSize.sm },
      md: { width: 40, height: 40, borderRadius: 20, fontSize: t.fontSize.md },
      lg: { width: 48, height: 48, borderRadius: 24, fontSize: t.fontSize.lg },
      xl: { width: 64, height: 64, borderRadius: 32, fontSize: t.fontSize.xl },
      '2xl': {
        width: 80,
        height: 80,
        borderRadius: 40,
        fontSize: t.fontSize['2xl'],
      },
    },
    text: {
      color: t.color.brand.default,
      fontWeight: t.fontWeight.semibold,
    },
    // Text on brand background (e.g. avatar with brand bg)
    onBrand: {
      color: t.color.text.onBrand,
      fontWeight: t.fontWeight.semibold,
    },
    presence: {
      borderWidth: 2,
      borderColor: t.color.surface.default,
    },
  };
}
