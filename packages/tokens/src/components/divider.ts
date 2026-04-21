import type { SemanticTokens } from '../semantic';

export function dividerTokens(t: SemanticTokens) {
  return {
    color: t.color.border.subtle,
    thickness: 1,
    margin: t.spacing[4],
  } as const;
}
