import type { SemanticTokens } from '../semantic';

export function buttonGroupTokens(t: SemanticTokens) {
  return {
    container: {
      alignSelf: 'flex-start' as const,
      alignItems: 'stretch' as const,
    },
    radius: t.radius.element,
    divider: {
      width: 1,
      color: t.color.border.default,
      solidColor: t.color.text.onBrand,
      destructiveColor: t.color.text.inverse,
    },
  } as const;
}
