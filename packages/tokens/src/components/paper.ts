import type { SemanticTokens } from '../semantic';

export function paperTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.xl,
      borderWidth: 1,
      borderColor: t.color.border.default,
      ...t.shadow.sm,
    },
    elevation: {
      none: { ...t.shadow.none },
      sm: { ...t.shadow.sm },
      md: { ...t.shadow.md },
      lg: { ...t.shadow.lg },
    },
    variant: {
      outlined: {
        borderWidth: 1,
        borderColor: t.color.border.default,
      },
      flat: {
        borderWidth: 1,
        borderColor: t.color.border.default,
        backgroundColor: t.color.surface.sunken,
        ...t.shadow.none,
      },
    },
  } as const;
}
