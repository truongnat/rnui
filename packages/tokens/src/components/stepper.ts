import type { SemanticTokens } from '../semantic';

export function stepperTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[4],
    },
    step: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[2],
      active: { color: t.color.brand.default },
      completed: { color: t.color.success.icon },
      pending: { color: t.color.text.tertiary },
    },
    line: {
      flex: 1,
      height: 2,
      backgroundColor: t.color.border.default,
      active: { backgroundColor: t.color.brand.default },
    },
  } as const;
}
