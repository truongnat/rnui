import type { SemanticTokens } from '../semantic';

export function otpInputTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: 'row' as const,
      gap: t.spacing[2],
      justifyContent: 'center' as const,
    },
    cell: {
      width: 48,
      height: 56,
      borderWidth: 1.5,
      borderColor: t.color.border.input,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      focused: { borderColor: t.color.brand.default },
      /** Filled digit — distinct from empty default border */
      filled: {
        borderColor: t.color.brand.default,
        backgroundColor: t.color.brand.subtle,
      },
      error: { borderColor: t.color.error.border },
    },
  } as const;
}
