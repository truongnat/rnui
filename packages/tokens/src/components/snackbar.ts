import type { SemanticTokens } from '../semantic';

export function snackbarTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.bg.inverse,
      borderRadius: t.radius.md,
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      ...t.shadow.lg,
      minWidth: 280,
    },
    text: {
      color: t.color.text.inverse,
      fontSize: t.fontSize.sm,
    },
    action: {
      color: t.color.brand.default,
      fontWeight: t.fontWeight.bold,
      marginLeft: t.spacing[4],
    },
  } as const;
}
