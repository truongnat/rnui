import type { SemanticTokens } from '../semantic';

export function buttonTokens(t: SemanticTokens) {
  const base = {
    borderRadius: t.brandStyle?.buttonRadius ?? t.radius.full,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: t.spacing[2],
  };

  return {
    variant: {
      solid: {
        container: {
          ...base,
          backgroundColor: t.color.brand.default,
          borderWidth: 0,
          ...t.shadow.md,
        },
        text: {
          color: t.color.text.onBrand,
          fontWeight: t.fontWeight.semibold,
        },
        pressed: { backgroundColor: t.color.brand.active, ...t.shadow.none },
      },
      outline: {
        container: {
          ...base,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: t.color.border.default,
        },
        text: {
          color: t.color.text.primary,
          fontWeight: t.fontWeight.semibold,
        },
        pressed: { backgroundColor: t.color.bg.muted },
      },
      ghost: {
        container: { ...base, backgroundColor: 'transparent', borderWidth: 0 },
        text: {
          color: t.color.brand.default,
          fontWeight: t.fontWeight.semibold,
        },
        pressed: { backgroundColor: t.color.brand.subtle },
      },
      destructive: {
        container: {
          ...base,
          backgroundColor: t.color.error.bg,
          borderWidth: 1,
          borderColor: t.color.error.border,
        },
        text: { color: t.color.error.text, fontWeight: t.fontWeight.semibold },
        pressed: { backgroundColor: t.color.error.border },
      },
      // Accent/CTA — Amber, stands out from brand violet
      accent: {
        container: {
          ...base,
          backgroundColor: t.color.accent.default,
          borderWidth: 0,
          ...t.shadow.md,
        },
        text: {
          color: t.color.accent.onAccent,
          fontWeight: t.fontWeight.semibold,
        },
        pressed: { backgroundColor: t.color.accent.active, ...t.shadow.none },
      },
    },
    size: {
      sm: {
        container: { height: 36, paddingHorizontal: t.spacing[4] },
        text: { fontSize: t.fontSize.sm },
      },
      md: {
        container: { height: 44, paddingHorizontal: t.spacing[6] },
        text: { fontSize: t.fontSize.md },
      },
      lg: {
        container: { height: 54, paddingHorizontal: t.spacing[8] },
        text: { fontSize: t.fontSize.lg },
      },
    },
    disabled: {
      container: { opacity: t.opacity[40], ...t.shadow.none },
    },
  };
}
