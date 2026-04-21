import type { SemanticTokens } from '../semantic';

export function imageTokens(t: SemanticTokens) {
  return {
    borderRadius: t.radius.md,
    placeholder: {
      backgroundColor: t.color.bg.muted,
    },
  } as const;
}
