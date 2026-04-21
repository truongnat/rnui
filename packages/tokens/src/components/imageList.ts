import type { SemanticTokens } from '../semantic';

export function imageListTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: t.spacing[1],
    },
    item: {
      borderRadius: t.radius.sm,
      overflow: 'hidden' as const,
    },
    bar: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: t.spacing[2],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      title: {
        color: '#FFFFFF',
        fontSize: t.fontSize.sm,
        fontWeight: t.fontWeight.semibold,
      },
      subtitle: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: t.fontSize.xs,
      },
    },
  } as const;
}
