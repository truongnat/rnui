import type { SemanticTokens } from '../semantic';

export function toggleButtonTokens(t: SemanticTokens) {
  return {
    container: {
      borderRadius: t.radius.md,
      borderWidth: 1,
      borderColor: t.color.border.default,
      backgroundColor: t.color.surface.default,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      selected: {
        backgroundColor: t.color.brand.subtle,
        borderColor: t.color.brand.default,
      },
    },
    size: {
      sm: { height: 32, paddingHorizontal: 12, fontSize: t.fontSize.sm },
      md: { height: 40, paddingHorizontal: 16, fontSize: t.fontSize.md },
      lg: { height: 48, paddingHorizontal: 20, fontSize: t.fontSize.lg },
    },
    icon: {
      color: t.color.text.secondary,
      selected: { color: t.color.brand.default },
    },
  } as const;
}
