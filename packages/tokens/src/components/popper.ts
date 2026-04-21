import type { SemanticTokens } from '../semantic';

export function popperTokens(t: SemanticTokens) {
  return {
    // Popper is mostly positioning logic, but can have some basic tokens
    container: {
      zIndex: t.zIndex.dropdown,
    },
  } as const;
}
