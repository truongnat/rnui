import type { SemanticTokens } from '../semantic';

export function chipTokens(t: SemanticTokens) {
  return {
    container: {
      borderRadius: t.radius.full,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      gap: t.spacing[1],
    },
    size: {
      sm: {
        height: 24,
        paddingHorizontal: t.spacing[2],
        fontSize: t.fontSize.xs,
      },
      md: {
        height: 32,
        paddingHorizontal: t.spacing[3],
        fontSize: t.fontSize.sm,
      },
      lg: {
        height: 40,
        paddingHorizontal: t.spacing[4],
        fontSize: t.fontSize.md,
      },
    },
    variant: {
      solid: {
        bg: t.color.surface.raised,
        text: t.color.text.primary,
        border: t.color.border.subtle,
      },
      outlined: {
        bg: 'transparent',
        text: t.color.text.primary,
        border: t.color.border.default,
      },
      subtle: {
        bg: t.color.brand.subtle,
        text: t.color.brand.text,
        border: t.color.brand.muted,
      },
      accent: {
        bg: t.color.accent.subtle,
        text: t.color.accent.text,
        border: t.color.accent.muted,
      },
    },
    deleteIcon: { color: t.color.text.tertiary, size: 16 },
  };
}
