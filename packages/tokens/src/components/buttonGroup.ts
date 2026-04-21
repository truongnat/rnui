import type { SemanticTokens } from '../semantic';

export function buttonGroupTokens(t: SemanticTokens) {
  return {
    container: {
      flexDirection: 'row' as const,
      borderRadius: t.radius.md,
      overflow: 'hidden' as const,
      borderWidth: 1,
      borderColor: t.color.border.default,
    },
    divider: {
      width: 1,
      backgroundColor: t.color.border.default,
    },
  } as const;
}
