import type { SemanticTokens } from '../semantic';

export function bottomNavigationTokens(t: SemanticTokens) {
  return {
    container: {
      height: 56,
      backgroundColor: t.color.surface.default,
      flexDirection: 'row' as const,
      borderTopWidth: 1,
      borderTopColor: t.color.border.subtle,
      paddingBottom: t.spacing[2],
    },
    item: {
      flex: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      active: { color: t.color.brand.default },
      inactive: { color: t.color.text.tertiary },
    },
    label: {
      fontSize: t.fontSize.xs,
      marginTop: 4,
    },
  } as const;
}
