import type { SemanticTokens } from '../semantic';

export function dialogTokens(t: SemanticTokens) {
  return {
    /** Screen-edge inset — same rhythm as modal.hostInset (applied in Dialog.tsx host wrapper) */
    hostInset: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[4],
    },
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.xl,
      padding: t.spacing[6],
      width: '100%' as const,
      maxWidth: 400,
      flexShrink: 1,
      ...t.shadow.lg,
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
