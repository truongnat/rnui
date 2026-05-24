import type { SemanticTokens } from '../semantic';

export function drawerTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      flex: 1,
      flexDirection: 'column' as const,
      ...t.shadow.xl,
    },
    header: {
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.subtle,
    },
    overlay: {
      backgroundColor: t.color.bg.overlay,
    },
  } as const;
}
