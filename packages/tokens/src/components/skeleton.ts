import type { SemanticTokens } from '../semantic';

export function skeletonTokens(t: SemanticTokens) {
  return {
    backgroundColor: t.color.skeleton ?? t.color.surface.sunken,
    borderRadius: t.radius.sm,
    opacity: {
      start: 0.3,
      end: 0.6,
    },
  } as const;
}
