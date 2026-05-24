import type { SemanticTokens } from '../semantic';

export function paperTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.lg,
      borderWidth: 0,
      borderColor: t.color.border.subtle,
    },
    elevation: {
      none: { ...t.shadow.none },
      sm: { ...t.shadow.sm },
      md: { ...t.shadow.md },
      lg: { ...t.shadow.lg },
    },
    variant: {
      outlined: { borderWidth: 1 },
      flat: { borderWidth: 0, ...t.shadow.none },
    },
  } as const;
}
