import type { SemanticTokens } from '../semantic';

export function appBarTokens(t: SemanticTokens) {
  return {
    container: {
      height: 64,
      backgroundColor: t.color.surface.default,
      paddingHorizontal: t.spacing[4],
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      ...t.shadow.md,
      zIndex: t.zIndex.sticky,
    },
    title: {
      fontSize: t.fontSize.lg,
      fontWeight: t.fontWeight.semibold,
      color: t.color.text.primary,
    },
  } as const;
}
