import type { SemanticTokens } from '../semantic';

export function pressableTokens(t: SemanticTokens) {
  return {
    container: {
      opacity: t.opacity[70],
      backgroundColor: 'transparent' as const,
    },
    opacity: t.opacity[70],
    backgroundColor: 'transparent',
    hover: { backgroundColor: t.color.bg.hover },
  } as const;
}
