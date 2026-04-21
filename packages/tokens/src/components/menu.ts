import type { SemanticTokens } from '../semantic';

export function menuTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.overlay,
      borderRadius: t.radius.md,
      padding: t.spacing[1],
      minWidth: 160,
      ...t.shadow.lg,
      borderWidth: 1,
      borderColor: t.color.border.subtle,
    },
    item: {
      paddingHorizontal: t.spacing[3],
      paddingVertical: t.spacing[2],
      borderRadius: t.radius.sm,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: t.spacing[2],
      pressed: { backgroundColor: t.color.bg.hover },
    },
    itemText: {
      fontSize: t.fontSize.sm,
      color: t.color.text.primary,
    },
  } as const;
}
