import type { SemanticTokens } from '../semantic';

export function segmentedControlTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: 'row' as const,
      backgroundColor: t.color.bg.muted,
      borderRadius: t.radius.lg,
      padding: 2,
    },
    item: {
      flex: 1,
      paddingVertical: t.spacing[1.5],
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderRadius: t.radius.md,
      active: { backgroundColor: t.color.surface.default, ...t.shadow.sm },
      text: {
        fontSize: t.fontSize.sm,
        fontWeight: t.fontWeight.medium,
        color: t.color.text.primary,
      },
      activeText: { color: t.color.brand.default },
    },
  } as const;
}
