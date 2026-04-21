import type { SemanticTokens } from '../semantic';

export function popoverTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      padding: t.spacing[4],
      ...t.shadow.lg,
      borderWidth: 1,
      borderColor: t.color.border.subtle,
    },
    arrow: {
      backgroundColor: t.color.surface.overlay,
    },
  } as const;
}
