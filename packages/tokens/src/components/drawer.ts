import type { SemanticTokens } from '../semantic';

export function drawerTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      width: 280,
      height: '100%',
      ...t.shadow.xl,
    },
    overlay: {
      backgroundColor: t.color.bg.overlay,
    },
  } as const;
}
