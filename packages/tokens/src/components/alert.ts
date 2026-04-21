import type { SemanticTokens } from '../semantic';

export function alertTokens(t: SemanticTokens) {
  return {
    container: {
      padding: t.spacing[4],
      borderRadius: t.radius.md,
      borderWidth: 1,
      flexDirection: 'row' as const,
      gap: t.spacing[3],
      alignSelf: 'stretch' as const,
      flexShrink: 1,
    },
    variant: {
      info: {
        bg: t.color.info.bg,
        border: t.color.info.border,
        text: t.color.info.text,
        icon: t.color.info.icon,
      },
      success: {
        bg: t.color.success.bg,
        border: t.color.success.border,
        text: t.color.success.text,
        icon: t.color.success.icon,
      },
      warning: {
        bg: t.color.warning.bg,
        border: t.color.warning.border,
        text: t.color.warning.text,
        icon: t.color.warning.icon,
      },
      error: {
        bg: t.color.error.bg,
        border: t.color.error.border,
        text: t.color.error.text,
        icon: t.color.error.icon,
      },
    },
    title: {
      fontSize: t.fontSize.md,
      fontWeight: t.fontWeight.semibold,
      marginBottom: t.spacing[0.5],
    },
    message: {
      fontSize: t.fontSize.sm,
      lineHeight: t.fontSize.sm * 1.4,
    },
  } as const;
}
