import type { SemanticTokens } from '../semantic';

export function boxTokens(t: SemanticTokens) {
  return {
    // Box is a layout primitive, usually just provides access to spacing/theme
    defaults: {
      backgroundColor: 'transparent',
    },
  } as const;
}
