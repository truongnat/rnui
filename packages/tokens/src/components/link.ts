import type { SemanticTokens } from '../semantic';

export function linkTokens(t: SemanticTokens) {
  return {
    text: {
      color: t.color.text.link,
      fontSize: t.fontSize.md,
      textDecorationLine: 'none' as const,
    },
    hover: {
      textDecorationLine: 'underline' as const,
    },
    pressed: {
      opacity: t.opacity[70],
    },
  } as const;
}
