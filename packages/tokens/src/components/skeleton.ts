import type { SemanticTokens } from '../semantic';

export function skeletonTokens(t: SemanticTokens) {
  return {
    backgroundColor: t.color.bg.emphasis,
    borderRadius: t.radius.sm,
    opacity: {
      start: 0.3,
      end: 0.6,
    },
  } as const;
}
