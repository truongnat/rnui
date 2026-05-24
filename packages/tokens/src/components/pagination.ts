import type { SemanticTokens } from '../semantic';

export function paginationTokens(t: SemanticTokens) {
  return {
    item: {
      active: {
        bg: t.color.brand.default,
        color: t.color.text.inverse,
        borderColor: t.color.brand.default,
      },
      default: {
        bg: t.color.surface.default,
        color: t.color.text.primary,
        borderColor: t.color.border.default,
        borderWidth: 1,
      },
      hover: { bg: t.color.bg.hover },
      disabled: {
        color: t.color.text.disabled,
        borderColor: t.color.border.default,
      },
    },
    size: { sm: 28, md: 36, lg: 44 },
    gap: t.spacing[1],
  } as const;
}
