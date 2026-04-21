import type { SemanticTokens } from '../semantic';

export function inputTokens(t: SemanticTokens) {
  return {
    container: {
      borderWidth: 1,
      borderColor: t.color.border.input,
      borderRadius: t.radius.lg,
      backgroundColor: t.color.surface.default,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: t.spacing[3],
      gap: t.spacing[2],
    },
    hover: {
      borderColor: t.color.border.strong,
    },
    disabled: {
      backgroundColor: t.color.bg.disabled,
      borderColor: t.color.border.default,
      opacity: t.opacity[50],
    },
    size: {
      sm: {
        height: 32,
        fontSize: t.fontSize.sm,
        paddingVertical: t.spacing[1.5],
      },
      /** Issue #1: spacing[3] vertical padding inside ~48dp target */
      md: {
        height: 48,
        fontSize: t.fontSize.md,
        paddingVertical: t.spacing[3],
      },
      lg: {
        height: 56,
        fontSize: t.fontSize.lg,
        paddingVertical: t.spacing[3],
      },
    },
    focusRing: {
      borderColor: t.color.border.focus,
      borderWidth: 2,
      outlineOffset: t.focusRing.offset,
    },
    state: {
      default: { borderColor: t.color.border.default },
      /** Match default borderWidth — avoids layout shift on focus */
      focused: { borderColor: t.color.border.focus, borderWidth: 1 },
      error: { borderColor: t.color.border.error },
      disabled: { backgroundColor: t.color.bg.muted, opacity: t.opacity[60] },
    },
    floatingLabel: {
      fontSize: { active: t.fontSize.xs, inactive: t.fontSize.md },
      color: { active: t.color.border.focus, inactive: t.color.text.tertiary },
      translateY: { active: -14, inactive: 0 },
    },
    text: {
      color: t.color.text.primary,
      placeholderColor: t.color.text.tertiary,
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      marginBottom: t.spacing[1.5],
    },
    helperText: {
      fontSize: t.fontSize.xs,
      color: t.color.text.tertiary,
      marginTop: t.spacing[1],
    },
    errorText: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text,
      marginTop: t.spacing[1],
    },
  };
}
