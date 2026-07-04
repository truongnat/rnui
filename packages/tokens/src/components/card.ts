import type { SemanticTokens } from '../semantic';

export function cardTokens(t: SemanticTokens) {
  return {
    container: {
      // Astryx surface hierarchy: cards sit on the `card` surface (above `surface`).
      backgroundColor: t.color.surface.card ?? t.color.surface.default,
      borderRadius: t.radius.xl,
      borderWidth: 1,
      borderColor: t.color.border.default,
      ...t.shadow.sm,
    },
    padding: {
      sm: t.spacing[3],
      md: t.spacing[4],
      lg: t.spacing[6],
    },
    pressed: {
      opacity: t.opacity[80],
    },
  };
}
