import type { SemanticTokens } from '../semantic';

export function sliderTokens(t: SemanticTokens) {
  return {
    track: {
      height: 4,
      borderRadius: t.radius.full,
      bgOff: t.color.bg.muted,
      bgOn: t.color.brand.default,
    },
    thumb: {
      width: 20,
      height: 20,
      borderRadius: 10,
      bg: t.color.surface.raised,
      borderColor: t.color.border.default,
      borderWidth: 1,
      ...t.shadow.sm,
    },
    disabledOpacity: t.opacity[40],
  };
}
