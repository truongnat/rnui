import type { SemanticTokens } from '../semantic';

export function badgeTokens(t: SemanticTokens) {
  const { color: c } = t;

  return {
    base: {
      borderRadius: t.radius.full,
      alignSelf: 'flex-start' as const,
      borderWidth: 1,
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
      default: {
        bg: c.surface.sunken,
        text: c.text.secondary,
        border: c.border.default,
      },
      brand: {
        bg: c.brand.subtle,
        text: c.brand.text,
        border: c.brand.muted,
      },
      accent: {
        bg: c.accent.subtle,
        text: c.accent.text,
        border: c.accent.muted,
      },
      success: {
        bg: c.success.bg,
        text: c.success.text,
        border: c.success.border,
      },
      warning: {
        bg: c.warning.bg,
        text: c.warning.text,
        border: c.warning.border,
      },
      error: {
        bg: c.error.bg,
        text: c.error.text,
        border: c.error.border,
      },
      info: {
        bg: c.info.bg,
        text: c.info.text,
        border: c.info.border,
      },
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
