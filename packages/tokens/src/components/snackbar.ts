import type { SemanticTokens } from '../semantic';

export function snackbarTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.raised,
      borderRadius: t.radius.md,
      borderWidth: 1,
      borderColor: t.color.border.subtle,
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      ...t.shadow.lg,
      minWidth: 280,
    },
    text: {
      color: t.color.text.primary,
      fontSize: t.fontSize.sm,
    },
    action: {
      color: t.color.brand.text,
      fontWeight: t.fontWeight.bold,
      marginLeft: t.spacing[4],
    },
  } as const;
}
