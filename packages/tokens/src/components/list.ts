import type { SemanticTokens } from '../semantic';

export function listTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.bg.default,
    },
    item: {
      padding: t.spacing[4],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[3],
      backgroundColor: t.color.surface.default,
      pressed: { backgroundColor: t.color.bg.hover },
    },
    separator: {
      color: t.color.border.subtle,
      insetLeft: t.spacing[4],
    },
    itemText: {
      fontSize: t.fontSize.md,
      color: t.color.text.primary,
    },
    subheader: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[2],
      fontSize: t.fontSize.sm,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.tertiary,
    },
  } as const;
}
