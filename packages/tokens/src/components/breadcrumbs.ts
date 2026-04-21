import type { SemanticTokens } from '../semantic';

export function breadcrumbsTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[1],
    },
    separator: {
      color: t.color.text.tertiary,
      fontSize: t.fontSize.sm,
    },
    item: {
      fontSize: t.fontSize.sm,
      color: t.color.text.secondary,
      active: { color: t.color.text.primary, fontWeight: t.fontWeight.medium },
    },
  } as const;
}
