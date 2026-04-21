import type { SemanticTokens } from '../semantic';

export function tableTokens(t: SemanticTokens) {
  return {
    container: {
      width: '100%',
      borderWidth: 1,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      overflow: 'hidden' as const,
    },
    header: {
      backgroundColor: t.color.bg.subtle,
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.default,
    },
    row: {
      flexDirection: 'row' as const,
      borderBottomWidth: 1,
      borderBottomColor: t.color.border.subtle,
      hover: { backgroundColor: t.color.bg.hover },
    },
    cell: {
      padding: t.spacing[3],
      fontSize: t.fontSize.sm,
      color: t.color.text.primary,
    },
  } as const;
}
