import type { SemanticTokens } from '../semantic';

export function modalTokens(t: SemanticTokens) {
  return {
    overlay: {
      backgroundColor: t.color.bg.overlay,
      flex: 1,
      width: '100%' as const,
      height: '100%' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      padding: t.spacing[4],
    },
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.xl,
      width: '100%',
      maxWidth: 500,
      ...t.shadow.xl,
      overflow: 'hidden' as const,
    },
  } as const;
}
