import type { SemanticTokens } from '../semantic';

export function toastTokens(t: SemanticTokens) {
  return {
    container: {
      borderRadius: t.radius.xl,
      paddingHorizontal: t.spacing[5],
      paddingVertical: t.spacing[4],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[3],
      borderWidth: 1,
      borderColor: t.color.border.default,
      ...t.shadow.md,
    },
    variant: {
      default: {
        backgroundColor: t.color.surface.raised,
        borderWidth: 1,
      },
      success: {
        backgroundColor: t.color.success.bg,
        borderColor: t.color.success.border,
        borderLeftWidth: 3,
        borderLeftColor: t.color.success.icon,
      },
      warning: {
        backgroundColor: t.color.warning.bg,
        borderColor: t.color.warning.border,
        borderLeftWidth: 3,
        borderLeftColor: t.color.warning.icon,
      },
      error: {
        backgroundColor: t.color.error.bg,
        borderColor: t.color.error.border,
        borderLeftWidth: 3,
        borderLeftColor: t.color.error.icon,
      },
      info: {
        backgroundColor: t.color.info.bg,
        borderColor: t.color.info.border,
        borderLeftWidth: 3,
        borderLeftColor: t.color.info.icon,
      },
    },
    text: {
      fontSize: t.fontSize.sm,
      color: t.color.text.primary,
      flex: 1,
    },
    action: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.bold,
      color: t.color.brand.text,
    },
  };
}
