import type { SemanticTokens } from '../semantic';

export function datePickerTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.default,
      borderRadius: t.radius.lg,
      padding: t.spacing[4],
      ...t.shadow.lg,
    },
    header: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
      marginBottom: t.spacing[4],
    },
    day: {
      width: 40,
      height: 40,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderRadius: t.radius.full,
      selected: {
        backgroundColor: t.color.brand.default,
        color: t.color.text.onBrand,
      },
      today: { borderColor: t.color.brand.default, borderWidth: 1 },
      outside: { color: t.color.text.disabled },
    },
  } as const;
}
