import type { SemanticTokens } from '../semantic';

export function badgeTokens(t: SemanticTokens) {
  return {
    base: {
      borderRadius: t.radius.full,
      alignSelf: 'flex-start' as const,
    },
    size: {
      sm: {
        paddingHorizontal: t.spacing[2],
        paddingVertical: t.spacing[0.5],
        fontSize: t.fontSize.xs,
      },
      md: {
        paddingHorizontal: t.spacing[2.5],
        paddingVertical: t.spacing[1],
        fontSize: t.fontSize.xs,
      },
      lg: {
        paddingHorizontal: t.spacing[3],
        paddingVertical: t.spacing[1.5],
        fontSize: t.fontSize.sm,
      },
    },
    variant: {
      default: { bg: t.color.bg.emphasis, text: t.color.text.secondary },
      /** `brand.subtle` often matches `bg.subtle` (e.g. Forest/Love) — muted stays visible on the page. */
      brand: { bg: t.color.brand.muted, text: t.color.brand.text },
      accent: { bg: t.color.accent.muted, text: t.color.accent.text },
      success: { bg: t.color.success.bg, text: t.color.success.text },
      warning: { bg: t.color.warning.bg, text: t.color.warning.text },
      error: { bg: t.color.error.bg, text: t.color.error.text },
      info: { bg: t.color.info.bg, text: t.color.info.text },
    },
    text: {
      fontWeight: t.fontWeight.semibold,
    },
    dot: {
      size: 8,
      offset: -2,
    },
  };
}
