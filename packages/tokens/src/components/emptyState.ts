import type { SemanticTokens } from '../semantic';

export function emptyStateTokens(t: SemanticTokens) {
  return {
    container: {
      padding: t.spacing[8],
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      gap: t.spacing[4],
    },
    containerSize: {
      sm: { padding: t.spacing[6], gap: t.spacing[3] },
      md: { padding: t.spacing[8], gap: t.spacing[4] },
      lg: { padding: t.spacing[10], gap: t.spacing[5] },
    },
    iconWrap: {
      width: 64,
      height: 64,
      borderRadius: t.radius.full,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      backgroundColor: t.color.brand.subtle,
    },
    icon: {
      size: 64,
      color: t.color.text.tertiary,
    },
    title: {
      fontSize: t.fontSize.xl,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
      textAlign: 'center' as const,
    },
    titleSize: {
      sm: { fontSize: t.fontSize.lg },
      md: { fontSize: t.fontSize.xl },
      lg: { fontSize: t.fontSize['2xl'] },
    },
    description: {
      fontSize: t.fontSize.md,
      color: t.color.text.secondary,
      textAlign: 'center' as const,
    },
    descriptionSize: {
      sm: { fontSize: t.fontSize.sm },
      md: { fontSize: t.fontSize.md },
      lg: { fontSize: t.fontSize.lg },
    },
  } as const;
}
