import type { SemanticTokens } from '../semantic';

export function speedDialTokens(t: SemanticTokens) {
  return {
    container: {
      alignItems: 'center' as const,
      gap: t.spacing[3],
    },
    action: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: t.color.surface.raised,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...t.shadow.md,
      iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: t.color.surface.default,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        ...t.shadow.sm,
      },
      tooltip: {
        fontSize: t.fontSize.xs,
        color: t.color.text.secondary,
        marginTop: t.spacing[1],
      },
    },
  } as const;
}
