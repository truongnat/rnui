import type { SemanticTokens } from '../semantic';

export function formGroupTokens(t: SemanticTokens) {
  return {
    grouped: {
      card: {
        backgroundColor: t.color.surface.default,
        borderRadius: t.radius.xl,
        overflow: 'hidden' as const,
      },
    },
    footer: {
      fontSize: t.fontSize.xs,
      color: t.color.text.tertiary,
      marginTop: t.spacing[2],
      paddingHorizontal: t.spacing[1],
    },
    errorBelowCard: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text,
      marginTop: t.spacing[2],
      paddingHorizontal: t.spacing[1],
    },
  } as const;
}
