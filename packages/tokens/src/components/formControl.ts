import type { SemanticTokens } from '../semantic';

export function formControlTokens(t: SemanticTokens) {
  return {
    container: {
      width: '100%',
      gap: t.spacing[1.5],
    },
    label: {
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
    },
    helperText: {
      fontSize: t.fontSize.xs,
      color: t.color.text.tertiary,
    },
    errorText: {
      fontSize: t.fontSize.xs,
      color: t.color.error.text,
    },
  } as const;
}
