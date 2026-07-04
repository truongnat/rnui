import type { SemanticTokens } from '../semantic';

export function inputTokens(t: SemanticTokens) {
  const disabledState = {
    backgroundColor: t.color.surface.sunken,
    borderColor: t.color.border.subtle,
    opacity: t.opacity[60],
  };

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
    disabled: disabledState,
    size: {
      sm: {
        height: 36,
        fontSize: t.fontSize.sm,
        paddingVertical: t.spacing[1.5],
      },
      md: {
        height: 44,
        fontSize: t.fontSize.md,
        paddingVertical: t.spacing[2],
      },
      lg: {
        height: 52,
        fontSize: t.fontSize.lg,
        paddingVertical: t.spacing[2.5],
      },
    },
    focusRing: {
      borderColor: t.color.border.focus,
      borderWidth: 1,
      outlineOffset: t.focusRing.offset,
    },
    state: {
      default: { borderColor: t.color.border.input },
      focused: { borderColor: t.color.border.focus, borderWidth: 1 },
      error: { borderColor: t.color.border.error },
      warning: { borderColor: t.color.border.warning },
      success: { borderColor: t.color.border.success },
      disabled: disabledState,
    },
    floatingLabel: {
      fontSize: { active: t.fontSize.xs, inactive: t.fontSize.md },
      color: { active: t.color.border.focus, inactive: t.color.text.tertiary },
    },
    text: {
      color: t.color.text.primary,
      placeholderColor: t.color.text.tertiary,
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.primary,
      marginBottom: t.spacing[2],
    },
    helperText: {
      fontSize: t.fontSize.xs,
      color: t.color.text.secondary,
      marginTop: t.spacing[2],
    },
    errorText: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text,
      marginTop: t.spacing[2],
    },
    warningText: {
      fontSize: t.fontSize.xs,
      color: t.color.warning.text,
      marginTop: t.spacing[2],
    },
    successText: {
      fontSize: t.fontSize.xs,
      color: t.color.success.text,
      marginTop: t.spacing[2],
    },
  };
}
