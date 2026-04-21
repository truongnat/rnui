import type { SemanticTokens } from '../semantic';

export function toastTokens(t: SemanticTokens) {
  return {
    container: {
      borderRadius: t.radius.lg,
      paddingHorizontal: t.spacing[6],
      paddingVertical: t.spacing[5],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[4],
      ...t.shadow.lg,
    },
    variant: {
      default: { backgroundColor: t.color.bg.inverse, borderWidth: 0 },
      success: {
        backgroundColor: t.color.bg.inverse,
        borderLeftWidth: 4,
        borderLeftColor: t.color.success.icon,
      },
      warning: {
        backgroundColor: t.color.bg.inverse,
        borderLeftWidth: 4,
        borderLeftColor: t.color.warning.icon,
      },
      error: {
        backgroundColor: t.color.bg.inverse,
        borderLeftWidth: 4,
        borderLeftColor: t.color.error.icon,
      },
      info: {
        backgroundColor: t.color.bg.inverse,
        borderLeftWidth: 4,
        borderLeftColor: t.color.info.icon,
      },
    },
    text: {
      fontSize: t.fontSize.sm,
      color: t.color.text.inverse,
      flex: 1,
    },
  };
}
