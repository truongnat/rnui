import type { SemanticTokens } from '../semantic';

export function accordionTokens(t: SemanticTokens) {
  return {
    container: {
      borderWidth: 1,
      borderColor: t.color.border.default,
      borderRadius: t.radius.md,
      backgroundColor: t.color.surface.default,
    },
    summary: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      backgroundColor: t.color.surface.default,
      gap: t.spacing[2],
    },
    details: {
      paddingHorizontal: t.spacing[4],
      paddingVertical: t.spacing[3],
      backgroundColor: t.color.bg.subtle,
    },
    title: {
      fontSize: t.fontSize.md,
      fontWeight: t.fontWeight.medium,
      color: t.color.text.primary,
    },
    icon: {
      color: t.color.text.tertiary,
      size: 16,
    },
  } as const;
}
