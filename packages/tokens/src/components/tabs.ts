import type { SemanticTokens } from '../semantic';

export function tabsTokens(t: SemanticTokens) {
  return {
    indicator: { bg: t.color.brand.default, height: 2 },
    tab: {
      active: { color: t.color.brand.default, fontWeight: '600' },
      inactive: { color: t.color.text.secondary },
      hover: { bg: t.color.bg.hover },
    },
    container: { borderBottomColor: t.color.border.default },
  } as const;
}
