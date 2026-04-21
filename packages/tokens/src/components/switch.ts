import type { SemanticTokens } from '../semantic';

export function switchTokens(t: SemanticTokens) {
  return {
    track: {
      sm: { width: 36, height: 20, borderRadius: 10, padding: 2 },
      md: { width: 46, height: 26, borderRadius: 13, padding: 2 },
      lg: { width: 56, height: 30, borderRadius: 15, padding: 2 },
    },
    thumb: {
      sm: { width: 16, height: 16, borderRadius: 8 },
      md: { width: 22, height: 22, borderRadius: 11 },
      lg: { width: 26, height: 26, borderRadius: 13 },
    },
    colors: {
      trackOff: t.color.border.default,
      trackOn: t.color.brand.default,
      thumb: t.color.surface.raised,
      disabledOpacity: t.opacity[40],
    },
  };
}
