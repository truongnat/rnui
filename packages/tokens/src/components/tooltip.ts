import type { SemanticTokens } from '../semantic';

export function tooltipTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.bg.inverse,
      paddingHorizontal: t.spacing[2],
      paddingVertical: t.spacing[1],
      borderRadius: t.radius.xs,
      ...t.shadow.sm,
    },
    text: {
      color: t.color.text.inverse,
      fontSize: t.fontSize.xs,
    },
  } as const;
}
