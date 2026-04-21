import type { SemanticTokens } from '../semantic';

export function dialogTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.xl,
      padding: t.spacing[6],
      maxWidth: '100%' as const,
      flexShrink: 1,
      ...t.shadow.xl,
    },
    title: {
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      marginBottom: t.spacing[2],
      flexShrink: 1,
    },
    content: {
      fontSize: t.fontSize.md,
      color: t.color.text.secondary,
      lineHeight: t.fontSize.md * 1.5,
      flexShrink: 1,
    },
    actions: {
      marginTop: t.spacing[6],
      flexDirection: 'row-reverse' as const, // Optimal for mobile (Confirm on Right / Top)
      justifyContent: 'center' as const,
      gap: t.spacing[3],
      flexWrap: 'wrap' as const,
    },
  };
}
