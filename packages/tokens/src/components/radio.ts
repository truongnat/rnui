import type { SemanticTokens } from '../semantic';

export function radioTokens(t: SemanticTokens) {
  return {
    container: {
      sm: { width: 16, height: 16, borderRadius: 8, borderWidth: 2 },
      md: { width: 20, height: 20, borderRadius: 10, borderWidth: 2 },
      lg: { width: 24, height: 24, borderRadius: 12, borderWidth: 2 },
    },
    dot: {
      sm: { width: 8, height: 8, borderRadius: 4 },
      md: { width: 10, height: 10, borderRadius: 5 },
      lg: { width: 12, height: 12, borderRadius: 6 },
    },
    colors: {
      borderOff: t.color.border.strong,
      borderOn: t.color.brand.default,
      bgOff: 'transparent',
      bgOn: 'transparent',
      dot: t.color.brand.default,
      disabledOpacity: t.opacity[40],
    },
  };
}
