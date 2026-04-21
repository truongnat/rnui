import type { SemanticTokens } from '../semantic';

export function cardTokens(t: SemanticTokens) {
  return {
    container: {
      backgroundColor: t.color.surface.raised,
      borderRadius: t.radius.lg,
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
